import { useState, useEffect } from "react";
// นำเข้า useLocation สำหรับดึง state ที่ส่งมาจากหน้าอื่น, useNavigate สำหรับเปลี่ยนหน้า
import { useLocation, useNavigate } from "react-router-dom";
// ปุ่ม UI ที่สร้างเอง
import Button from "../components/Button";
import type { Car } from "../types/carall";
// นำเข้า service สำหรับโหลด options และ combo images
import { getCarOptions, findComboImage, type CarOptions, type OverlayOption } from "../services/carOptionsService";

// กำหนดประเภทของตัวเลือก
type Category = "colors" | "wheels" | "spoilers";

const CustomCar = () => {
  // ดึงข้อมูลรถจาก state ที่ส่งมาจากหน้าอื่น
  const location = useLocation();
  const navigate = useNavigate();
  const car: Car | undefined = location.state?.car;

  // state เก็บ options ที่โหลดมา
  const [options, setOptions] = useState<CarOptions | null>(null);
  // state เก็บตัวเลือกที่ผู้ใช้เลือก
  const [selected, setSelected] = useState<Record<Category, OverlayOption | null>>({
    colors: null,
    wheels: null,
    spoilers: null,
  });
  // state สำหรับภาพรถที่แสดง
  const [displayImage, setDisplayImage] = useState<string>(car?.image || "");
  // key สำหรับ trigger animation fade-in เมื่อเปลี่ยนภาพ
  const [fadeKey, setFadeKey] = useState(0);

  // state popup และ message
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // โหลด options ตอน component mount
  useEffect(() => {
    if (car) {
      // โหลด options จาก service
      const loaded = getCarOptions(car.publicId);
      setOptions(loaded);
    }

    // ฟังก์ชันสำหรับอัปเดต options เมื่อมี event หรือ storage change
    const handleUpdate = () => {
      if (car) {
        const updated = getCarOptions(car.publicId);
        setOptions(updated);
      }
    };

    // ฟัง event สำหรับอัปเดต options
    window.addEventListener("carOptionsUpdated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    // Cleanup เมื่อ component unmount
    return () => {
      window.removeEventListener("carOptionsUpdated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [car, location.key]);

  // อัปเดต displayImage เมื่อผู้ใช้เลือก option
  useEffect(() => {
    if (!car) return;

    // แปลง selected state เป็น object ของชื่อที่เลือก
    const selectedNames: Partial<Record<Category, string>> = {};
    for (const key in selected) {
      const opt = selected[key as Category];
      if (opt) selectedNames[key as Category] = opt.name;
    }

    // ตรวจสอบว่าไม่ได้เลือกอะไรเลย
    const nothingSelected = !selected.colors && !selected.wheels && !selected.spoilers;
    let finalImage = car.image;

    if (!nothingSelected) {
      // ตรวจสอบว่ามี combo image สำหรับตัวเลือกทั้งหมดหรือไม่
      const comboImage = findComboImage(car.publicId, selectedNames);
      // fallback ตามลำดับ: combo > spoilers > wheels > colors > default
      finalImage =
        comboImage ||
        selected.spoilers?.image ||
        selected.wheels?.image ||
        selected.colors?.image ||
        car.image;
    }

    // preload ภาพและเปลี่ยน displayImage หลังโหลดเสร็จ
    const img = new Image();
    img.src = finalImage;
    img.onload = () => {
      setDisplayImage(finalImage);
      setFadeKey((prev) => prev + 1); // trigger fade animation
    };
  }, [selected, car]);

  // ฟังก์ชันเลือก option
  const handleSelect = (category: Category, option: OverlayOption) => {
    setSelected((prev) => {
      const isSame = prev[category]?.name === option.name; // ถ้ากดซ้ำ = ยกเลิก
      return { ...prev, [category]: isSame ? null : option };
    });
  };

  // ฟังก์ชัน confirm
  const handleConfirm = () => {
    const hasSelection = selected.colors || selected.wheels || selected.spoilers;
    if (!hasSelection) {
      setMessage({ text: "กรุณาแต่งรถก่อน", type: "error" }); // error message
      return;
    }
    setMessage({ text: "คุณแต่งรถเรียบร้อยแล้ว!", type: "success" }); // success message
    setShowPopup(true); // แสดง popup
  };

  // ฟังก์ชันดาวน์โหลดภาพ
  const handleDownload = async () => {
    if (!displayImage) return;
    const fileName = `${car?.name || "custom-car"}.jpg`;

    try {
      // fetch ภาพ
      const response = await fetch(displayImage, { mode: "cors" });
      if (!response.ok) throw new Error("Failed to fetch image");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      // สร้าง link และ trigger download
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

  // กรณีไม่พบรถ  กลับหน้า models
  if (!car)
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-10 text-center bg-black text-white">
        <h1 className="text-2xl font-bold mb-4">Car not found</h1>
        <button
          className="bg-[#0a1444] hover:bg-[#13235f] text-white px-6 py-3 rounded-lg"
          onClick={() => navigate("/models")}>
          Back to Models
        </button>
      </div>
    );

  // กรณียังโหลด options ไม่เสร็จ
  if (!options)
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-10 text-center bg-black text-white">
        <h1 className="text-2xl font-bold mb-4">Loading customization options...</h1>
        <button
          className="bg-[#0a1444] hover:bg-[#13235f] text-white px-6 py-3 rounded-lg"
          onClick={() => navigate("/models")}>
          Back to Models
        </button>
      </div>
    );

  // categories ที่มีให้เลือก
  const categories: Category[] = ["colors", "wheels", "spoilers"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a0f1a] to-[#0b1330] text-white pt-24 font-sans">
      <div className="flex flex-col lg:flex-row p-8 gap-10 max-w-[1600px] mx-auto items-center justify-between">

        {/* Car Image */}
        <div className="flex-1 flex justify-center items-center w-full">
          <div className="relative w-full max-w-7xl bg-[#0a0f1a]/70 rounded-3xl border border-[#1e3a8a]/30 shadow-[0_0_40px_rgba(30,58,138,0.4)] overflow-hidden backdrop-blur-lg">
            <img
              key={fadeKey} // trigger animation fade-in
              src={displayImage} // แสดงภาพล่าสุด
              alt={car.name}
              className="w-full h-[80vh] object-contain transition-transform duration-700 ease-in-out opacity-0 animate-fadeIn hover:scale-[1.03]"
              onLoad={(e) => {
                (e.currentTarget as HTMLImageElement).style.opacity = "1"; // fade in
              }}/>
          </div>
        </div>

        {/* Panel */}
        <div className="w-full lg:w-[32rem] bg-[#0a0f1a]/90 border border-[#1e3a8a]/30 shadow-[0_0_30px_rgba(30,58,138,0.5)] p-8 rounded-3xl backdrop-blur-md lg:ml-auto">
          <h1 className="text-4xl font-extrabold mb-6 text-white border-b border-[#1e3a8a]/40 pb-3 tracking-tight">
            Customize <span className="text-[#00eaff]">{car.name}</span>
          </h1>

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
                    onClick={() => handleSelect(category, opt)} // เลือก option
                    variant={selected[category]?.name === opt.name ? "primary" : "outline"}/>
                ))}
              </div>
            </div>
          ))}

          {/* แสดงตัวเลือกที่เลือก */}
          <div className="mt-10 border-t border-[#1e3a8a]/30 pt-5">
            <p className="text-gray-400 text-sm">Selected:</p>
            <p className="font-semibold text-white text-lg mt-1">
              {Object.values(selected).filter(Boolean).map((item) => item!.name).join(" · ") || "None"}
            </p>
          </div>

          {/* ปุ่ม confirm และแสดง message */}
          <div className="mt-8 flex flex-col gap-4">
            <Button label="Confirm" variant="primary" onClick={handleConfirm} />
            {message && (
              <div
                className={`p-3 rounded-lg text-center text-sm ${
                  message.type === "error"
                    ? "bg-red-500/20 text-red-400 border border-red-500/40"
                    : "bg-green-500/20 text-green-400 border border-green-500/40"}`}>
                {message.text}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-[#0a0f1a] p-6 rounded-2xl w-[90%] max-w-sm text-center border border-[#1e3a8a] shadow-lg">
            <p className="text-white font-semibold mb-4">Your car is ready!</p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-blue-800 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                onClick={handleDownload}> {/* ดาวน์โหลดรูป */}
                Download
              </button>
              <button
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
                onClick={() => setShowPopup(false)}> {/* ปิด popup */}
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
