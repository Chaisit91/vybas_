// นำเข้า hook ที่ใช้จัดการ state และ lifecycle
import { useState, useEffect } from "react";
// นำใช้สำหรับดึงข้อมูล state สถานะปัจจุบันของหน้า และเปลี่ยนหน้า
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
// ประเภทข้อมูล Car
import type { Car } from "../types/carall";
// ฟังก์ชันและประเภทที่ใช้จัดการตัวเลือกของรถ
import {
  getCarOptions,
  findComboImage,
  type CarOptions,
  type OverlayOption,
} from "../services/carOptionsService";

// ประเภทของหมวดหมู่ที่เลือกได้
type Category = "colors" | "wheels" | "spoilers";

const CustomCar = () => {
  // ดึงข้อมูลรถจากหน้าที่ก่อนหน้า
  const location = useLocation();
  const navigate = useNavigate();
  const car: Car | undefined = location.state?.car;

  // state เก็บชุดตัวเลือกทั้งหมดของรถ
  const [options, setOptions] = useState<CarOptions | null>(null);

  // state เก็บตัวเลือกที่เลือกไว้สี ล้อ สปอยเลอร์
  const [selected, setSelected] = useState<
    Record<Category, OverlayOption | null>
  >({
    colors: null,
    wheels: null,
    spoilers: null,
  });

  // state รูปภาพที่จะแสดง
  const [displayImage, setDisplayImage] = useState<string>(car?.image || "");

  // ใช้สำหรับ trigger animation key
  const [fadeKey, setFadeKey] = useState(0);

  // ใช้แสดงโหลดดิ้งตอนภาพเปลี่ยน
  const [isLoading, setIsLoading] = useState(false);

  // state popup หลัง confirm
  const [showPopup, setShowPopup] = useState(false);

  // state ข้อความ alert success/error
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  // โหลดตัวเลือก (colors, wheels, spoilers) ตามรถที่เลือก
  useEffect(() => {
    if (car) setOptions(getCarOptions(car.publicId));

    // ฟังก์ชันอัปเดตเมื่อ carOptionsService ถูกอัปเดตจากหน้าอื่น
    const handleUpdate = () => {
      if (car) setOptions(getCarOptions(car.publicId));
    };

    // ฟัง event จาก window (เช่น localStorage เปลี่ยน)
    window.addEventListener("carOptionsUpdated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("carOptionsUpdated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [car, location.key]); // ทำงานใหม่ทุกครั้งที่ car เปลี่ยนหรือ location เปลี่ยน

  // อัพเดตรูปเมื่อมีการเลือกตัวเลือกใหม่
  useEffect(() => {
    if (!car) return;

    // รวบรวมชื่อ option ที่เลือกไว้
    const selectedNames: Partial<Record<Category, string>> = {};
    for (const key in selected) {
      const opt = selected[key as Category];
      if (opt) selectedNames[key as Category] = opt.name;
    }

    // ถ้าไม่ได้เลือกอะไรเลย ให้กลับเป็นรูปเดิม
    const nothingSelected =
      !selected.colors && !selected.wheels && !selected.spoilers;

    let finalImage = car.image;

    // ถ้ามีเลือก ให้ค้นหาภาพรวมแบบ combo ก่อน
    if (!nothingSelected) {
      const comboImage = findComboImage(car.publicId, selectedNames);

      // ถ้ามีภาพรวม ให้ใช้เลย
      finalImage =
        comboImage ||
        selected.spoilers?.image ||
        selected.wheels?.image ||
        selected.colors?.image ||
        car.image;
    }

    setIsLoading(true); // เปิดโหลดดิ้ง

    const img = new Image();
    img.src = finalImage;
    img.onload = () => {
      setDisplayImage(finalImage); // อัพเดตภาพที่จะแสดง
      setFadeKey((prev) => prev + 1); // เปลี่ยน key เพื่อให้เกิด transition
      setIsLoading(false); // ปิดโหลดดิ้ง
    };
  }, [selected, car]); // ทำงานใหม่เมื่อเลือกตัวเลือกหรือรถเปลี่ยน

  // ฟังก์ชันเลือก option เช่น เลือกสี ล้อ สปอยเลอร์
  const handleSelect = (category: Category, option: OverlayOption) => {
    setSelected((prev) => {
      const isSame = prev[category]?.name === option.name;

      // เลือกซ้ำ → ยกเลิก
      return { ...prev, [category]: isSame ? null : option };
    });
  };

  // เมื่อ confirm ตรวจสอบว่ามีการแต่งจริงไหม
  const handleConfirm = () => {
    const hasSelection =
      selected.colors || selected.wheels || selected.spoilers;

    if (!hasSelection) {
      setMessage({ text: "กรุณาแต่งรถก่อน", type: "error" });
      return;
    }

    setMessage({ text: "คุณแต่งรถเรียบร้อยแล้ว!", type: "success" });
    setShowPopup(true); // เปิด popup
  };

  // ดาวน์โหลดภาพรถที่แต่งแล้ว
  const handleDownload = async () => {
    if (!displayImage) return;

    const fileName = `${car?.name || "custom-car"}.jpg`;

    try {
      const response = await fetch(displayImage, { mode: "cors" });
      if (!response.ok) throw new Error("Failed to fetch image");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
      alert("ดาวน์โหลดไม่สำเร็จ โปรดลองอีกครั้ง");
    }
  };

  // ถ้าไม่มีรถ → แสดงหน้า error
  if (!car)
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-10 text-center bg-black text-white">
        <h1 className="text-2xl font-bold mb-4">Car not found</h1>
        <button
          className="bg-[#0a1444] hover:bg-[#13235f] text-white px-6 py-3 rounded-lg"
          onClick={() => navigate("/models")}
        >
          Back to Models
        </button>
      </div>
    );

  // ถ้าตัวเลือกยังโหลดไม่เสร็จ → แสดง loading
  if (!options)
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-10 text-center bg-black text-white">
        <h1 className="text-2xl font-bold mb-4">
          Loading customization options...
        </h1>
        <button
          className="bg-[#0a1444] hover:bg-[#13235f] text-white px-6 py-3 rounded-lg"
          onClick={() => navigate("/models")}
        >
          Back to Models
        </button>
      </div>
    );

  // หมวดหมู่ทั้งหมด
  const categories: Category[] = ["colors", "wheels", "spoilers"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a0f1a] to-[#0b1330] text-white pt-24 font-sans">
      <div className="flex flex-col lg:flex-row p-8 gap-10 max-w-[1600px] mx-auto items-center justify-between">

        {/* ส่วนแสดงภาพรถ */}
        <div className="flex-1 flex justify-center items-center w-full">
          <div className="relative w-full max-w-7xl bg-[#0a0f1a]/70 rounded-3xl border border-[#1e3a8a]/30 shadow-[0_0_40px_rgba(30,58,138,0.4)] overflow-hidden backdrop-blur-lg">
            <img
              key={fadeKey} // ให้ภาพ re-render เพื่อเกิด animation
              src={displayImage}
              alt={car.name}
              className={`w-full h-[80vh] object-contain transition-transform duration-700 ease-in-out ${
                isLoading
                  ? "opacity-50 blur-sm scale-105" // ขณะโหลด effect blur + zoom
                  : "opacity-100 scale-100 hover:scale-[1.03]" // เสร็จแล้ว hover zoom เล็กน้อย
              }`}
            />
            {/* วงกลมโหลดตอนเปลี่ยนภาพ */}
            {isLoading && (
              <div className="absolute inset-0 flex justify-center items-center bg-black/40">
                <div className="w-12 h-12 border-4 border-t-blue-400 border-white rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </div>

        {/* แผงควบคุมตัวเลือก */}
        <div className="w-full lg:w-[32rem] bg-[#0a0f1a]/90 border border-[#1e3a8a]/30 shadow-[0_0_30px_rgba(30,58,138,0.5)] p-8 rounded-3xl backdrop-blur-md lg:ml-auto">
          <h1 className="text-4xl font-extrabold mb-6 text-white border-b border-[#1e3a8a]/40 pb-3 tracking-tight">
            Customize <span className="text-[#00eaff]">{car.name}</span>
          </h1>

          {/* แสดงปุ่มเลือกแต่ละหมวดหมู่ */}
          {categories.map((category) => (
            <div key={category} className="mb-8">
              <h2 className="text-lg font-semibold mb-3 text-gray-300">
                Choose {category.charAt(0).toUpperCase() + category.slice(1)}
              </h2>
              <div className="flex gap-3 flex-wrap">
                {(options[category] as OverlayOption[]).map((opt) => (
                  <Button
                    key={opt.name}
                    label={opt.name}
                    onClick={() => handleSelect(category, opt)}
                    variant={
                      selected[category]?.name === opt.name
                        ? "primary"
                        : "outline"
                    }
                  />
                ))}
              </div>
            </div>
          ))}

          {/* แสดงรายการตัวเลือกที่เลือกอยู่ */}
          <div className="mt-10 border-t border-[#1e3a8a]/30 pt-5">
            <p className="text-gray-400 text-sm">Selected:</p>
            <p className="font-semibold text-white text-lg mt-1">
              {Object.values(selected)
                .filter(Boolean)
                .map((item) => item!.name)
                .join(" · ") || "None"}
            </p>
          </div>

          {/* ปุ่ม confirm */}
          <div className="mt-8 flex flex-col gap-4">
            <Button label="Confirm" variant="primary" onClick={handleConfirm} />

            {/* ข้อความแจ้งเตือน */}
            {message && (
              <div
                className={`p-3 rounded-lg text-center text-sm ${
                  message.type === "error"
                    ? "bg-red-500/20 text-red-400 border border-red-500/40"
                    : "bg-green-500/20 text-green-400 border border-green-500/40"
                }`}
              >
                {message.text}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Popup Download */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-[#0a0f1a] p-6 rounded-2xl w-[90%] max-w-sm text-center border border-[#1e3a8a] shadow-lg">
            <p className="text-white font-semibold mb-4">Your car is ready!</p>

            <div className="flex justify-center gap-4">
              <button
                className="bg-blue-800 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                onClick={handleDownload}
              >
                Download
              </button>

              <button
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomCar;
