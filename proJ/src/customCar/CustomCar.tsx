import { useState, useEffect } from "react"; // ใช้จัดการ state และ side effects
import { useLocation, useNavigate } from "react-router-dom"; // ใช้รับค่า state จาก navigation และสั่งเปลี่ยนหน้า
import Button from "../components/Button"; // ปุ่ม UI ที่สร้างเอง
import type { Car } from "../types/carall"; // ชนิดข้อมูลของรถ

// ดึงฟังก์ชันเกี่ยวกับการตั้งค่าตกแต่งรถ
import {
  getCarOptions, // โหลดตัวเลือกทั้งหมดของรถคันที่เลือก
  findComboImage, // หา image ที่ตรงกับ combo ที่เลือก
  type CarOptions, // ชนิดข้อมูลตัวเลือกทั้งหมด เช่น สี ล้อ สปอยเลอร์
  type OverlayOption, // ชนิดของตัวเลือกแต่ละอัน เช่น สีหนึ่งสี
} from "../services/carOptionsService";

// ประเภทของ category ที่เลือกได้
type Category = "colors" | "wheels" | "spoilers";

const CustomCar = () => {
  const location = useLocation(); // ใช้รับข้อมูลรถที่ถูกส่งมาจากหน้าอื่น
  const navigate = useNavigate(); // ใช้ย้อนกลับหน้า models

  const car: Car | undefined = location.state?.car; // ดึงข้อมูลรถจาก state

  // state ตัวเลือกทั้งหมดของรถ
  const [options, setOptions] = useState<CarOptions | null>(null);

  // state ตัวเลือกที่ผู้ใช้เลือก
  const [selected, setSelected] = useState<
    Record<Category, OverlayOption | null>
  >({
    colors: null,
    wheels: null,
    spoilers: null,
  });

  // เก็บรูปที่จะแสดงตอนนี้
  const [displayImage, setDisplayImage] = useState<string>(car?.image || "");

  // ใช้ trigger transition เวลาเปลี่ยนภาพ
  const [fadeKey, setFadeKey] = useState(0);

  // ⭐ state สำหรับข้อความ confirm
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  // โหลด options ของรถเมื่อเริ่ม component
  useEffect(() => {
    if (car) {
      const loaded = getCarOptions(car.publicId); // โหลดข้อมูลตัวเลือกจาก localStorage
      setOptions(loaded);
    }

    // ฟังก์ชันเมื่อข้อมูลใน localStorage มีการอัปเดต
    const handleUpdate = () => {
      if (car) {
        const updated = getCarOptions(car.publicId);
        setOptions(updated);
      }
    };

    window.addEventListener("carOptionsUpdated", handleUpdate); // event แบบ custom
    window.addEventListener("storage", handleUpdate); // event เมื่อ localStorage ถูกแก้ไข

    return () => {
      window.removeEventListener("carOptionsUpdated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [car, location.key]); // รันเมื่อรถเปลี่ยน หรือหน้า refresh

  // อัปเดตรูปตามตัวเลือก user
  useEffect(() => {
    if (!car) return;

    // เก็บชื่อตัวเลือกที่เลือก เพื่อค้นหา combo ที่ตรงกัน
    const selectedNames: Partial<Record<Category, string>> = {};
    for (const key in selected) {
      const opt = selected[key as Category];
      if (opt) selectedNames[key as Category] = opt.name;
    }

    const nothingSelected =
      !selected.colors && !selected.wheels && !selected.spoilers;

    let finalImage = car.image; // รูปพื้นฐานของรถ

    if (!nothingSelected) {
      const comboImage = findComboImage(car.publicId, selectedNames);

      // เลือกลำดับความสำคัญ: combo > spoiler > wheel > color > default
      finalImage =
        comboImage ||
        selected.spoilers?.image ||
        selected.wheels?.image ||
        selected.colors?.image ||
        car.image;
    }

    // โหลดรูปใหม่ก่อนค่อยแสดง เพื่อป้องกันภาพกระพริบ
    const img = new Image();
    img.src = finalImage;
    img.onload = () => {
      setDisplayImage(finalImage);
      setFadeKey((prev) => prev + 1); // trigger animation
    };
  }, [selected, car]); // รันเมื่อ user เลือกอะไรใหม่

  // ฟังก์ชันเลือก option
  const handleSelect = (category: Category, option: OverlayOption) => {
    setSelected((prev) => {
      const isSame = prev[category]?.name === option.name; // คลิกซ้ำคือ unselect
      return { ...prev, [category]: isSame ? null : option };
    });
  };

  // ถ้าไม่มีรถ ส่ง user กลับ models
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

  // ถ้ากำลังโหลด options
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

  const categories: Category[] = ["colors", "wheels", "spoilers"]; // หมวดหมู่ทั้งหมด

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a0f1a] to-[#0b1330] text-white pt-24 font-sans">
      <div className="flex flex-col lg:flex-row p-8 gap-10 max-w-[1600px] mx-auto items-center justify-between">
        {/* ============================ */}
        {/*      ภาพรถหลัก              */}
        {/* ============================ */}

        <div className="flex-1 flex justify-center items-center w-full">
          <div className="relative w-full max-w-7xl bg-[#0a0f1a]/70 rounded-3xl border border-[#1e3a8a]/30 shadow-[0_0_40px_rgba(30,58,138,0.4)] overflow-hidden backdrop-blur-lg">
            <img
              key={fadeKey} // เปลี่ยน key เพื่อทำ animation
              src={displayImage} // รูปที่จะแสดง
              alt={car.name}
              className="w-full h-[80vh] object-contain transition-transform duration-700 ease-in-out opacity-0 animate-fadeIn hover:scale-[1.03]"
              onLoad={(e) => {
                (e.currentTarget as HTMLImageElement).style.opacity = "1";
              }}
            />
          </div>
        </div>

        {/* ============================ */}
        {/*       Panel ตัวเลือก         */}
        {/* ============================ */}

        <div className="w-full lg:w-[32rem] bg-[#0a0f1a]/90 border border-[#1e3a8a]/30 shadow-[0_0_30px_rgba(30,58,138,0.5)] p-8 rounded-3xl backdrop-blur-md lg:ml-auto">
          <h1 className="text-4xl font-extrabold mb-6 text-white border-b border-[#1e3a8a]/40 pb-3 tracking-tight">
            Customize <span className="text-[#00eaff]">{car.name}</span>
          </h1>

          {/* แสดงปุ่มแต่ละประเภท เช่น สี ล้อ สปอยเลอร์ */}
          {categories.map((category) => (
            <div key={category} className="mb-8">
              <h2 className="text-lg font-semibold mb-3 text-gray-300">
                Choose {category.charAt(0).toUpperCase() + category.slice(1)}
              </h2>
              {/*  
      เมื่อกดปุ่มนี้:
      - เรียก handleSelect()
      - ส่ง category เช่น "colors"
      - ส่ง opt คือข้อมูล option ที่ถูกกด
       เอาไว้บันทึกว่าผู้ใช้เลือกของแต่งอะไร   
      และ  
      ถ้าตัวเลือกนี้ถูกเลือกอยู่ → ให้ปุ่มเป็น style "primary" (สีเน้น)
      ถ้าไม่ใช่  ให้ปุ่มเป็นแบบ "outline"  
       เพื่อบอกผู้ใช้ว่ากำลังเลือกตัวไหนอยู่
    */}
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

          {/* ============================ */}
          {/*     แสดงรายการที่เลือก      */}
          {/* ============================ */}

          <div className="mt-10 border-t border-[#1e3a8a]/30 pt-5">
            <p className="text-gray-400 text-sm">Selected:</p>
            <p className="font-semibold text-white text-lg mt-1">
              {Object.values(selected)
                .filter(Boolean)
                .map((item) => item!.name)
                .join(" · ") || "None"}{" "}
              {/*ดึงค่าทั้งหมดจาก object selected  ได้เป็น array ของตัวเลือกที่ผู้ใช้เลือก ,
                                              กรองเอาเฉพาะค่าที่ไม่เป็น null (คือผู้ใช้เลือกไว้จริง) ,
                                              แปลงแต่ละ item ให้เหลือแค่ชื่อ option เช่น "Red", "Sport Wheels" , 
                                              เอามาต่อกันด้วยสัญลักษณ์ · เช่น "Red · Sport Wheels" */}
            </p>
          </div>

          {/* ============================ */}
          {/*      ปุ่ม Confirm + แจ้งเตือน */}
          {/* ============================ */}

          <div className="mt-8 flex flex-col gap-4">
            <Button
              label="Confirm"
              variant="primary"
              onClick={() => {
                const hasSelection =
                  selected.colors || selected.wheels || selected.spoilers;

                if (!hasSelection) {
                  setMessage({
                    text: "กรุณาแต่งรถก่อน",
                    type: "error",
                  });
                } else {
                  setMessage({
                    text: "คุณแต่งรถเรียบร้อยแล้ว!",
                    type: "success",
                  });
                }
              }}
            />

            {/* กล่องแจ้งเตือน */}
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
    </div>
  );
};

export default CustomCar;
