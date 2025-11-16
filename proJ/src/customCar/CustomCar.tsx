import { useState, useEffect } from "react"; // นำเข้า hook useState และ useEffect จาก React
import { useLocation, useNavigate } from "react-router-dom"; // ดึงข้อมูล state ที่ส่งมาทาง route และใช้เปลี่ยนหน้า
import Button from "../components/Button"; // นำเข้าปุ่ม Button component
import type { Car } from "../types/carall"; // กำหนด type ของข้อมูลรถ Car
import {
  getCarOptions, // ฟังก์ชันโหลดตัวเลือกของแต่งจาก localStorage
  findComboImage, // ฟังก์ชันหาภาพรวมเมื่อเลือกหลายส่วน
  type CarOptions, // type ของตัวเลือกทั้งหมด (colors / wheels / spoilers)
  type OverlayOption, // type ของ option รายการย่อย เช่น สีแดง, ล้อดำ ฯลฯ
} from "../services/carOptionsService"; // นำเข้า service จัดการข้อมูล options ของรถ

// กำหนดหมวดหมู่ของแต่ง 3 แบบ
type Category = "colors" | "wheels" | "spoilers";

const CustomCar = () => {
  // สร้าง component ชื่อ CustomCar
  const location = useLocation(); // ดึงข้อมูล state ที่ส่งมาจากหน้า Models
  const navigate = useNavigate(); // ใช้เปลี่ยนหน้าแบบ programmatic

  const car: Car | undefined = location.state?.car; // ถ้ามีการส่ง car จากหน้าอื่น ให้รับไว้

  const [options, setOptions] = useState<CarOptions | null>(null); // เก็บข้อมูล options ของรถคันนี้
  const [selected, setSelected] = useState<
    Record<Category, OverlayOption | null>
  >({
    colors: null, // ยังไม่เลือกสี
    wheels: null, // ยังไม่เลือกล้อ
    spoilers: null, // ยังไม่เลือกสปอยเลอร์
  });
  const [displayImage, setDisplayImage] = useState<string>(car?.image || ""); // รูปที่จะนำมาแสดง
  const [fadeKey, setFadeKey] = useState(0); // เปลี่ยน key เพื่อบังคับให้ img render ใหม่เพื่อเล่น animation

  //  โหลด options เมื่อเปิดหน้า หรือเมื่อ admin อัปเดตข้อมูล
  useEffect(() => {
    if (car) {
      // ถ้ามีข้อมูลรถ
      const loaded = getCarOptions(car.publicId); // โหลด options จาก localStorage
      setOptions(loaded); // อัปเดต state
    }

    // ฟังก์ชันสำหรับ event listener
    const handleUpdate = () => {
      if (car) {
        console.log("🔁 carOptionsUpdated received! Reloading options...");
        const updated = getCarOptions(car.publicId); // โหลด options ใหม่
        setOptions(updated); // อัปเดต state
      }
    };

    window.addEventListener("carOptionsUpdated", handleUpdate); // ฟังการอัปเดตจากหน้า admin
    window.addEventListener("storage", handleUpdate); // ฟังการเปลี่ยนของ localStorage

    return () => {
      window.removeEventListener("carOptionsUpdated", handleUpdate); // ลบ event ตอนออกจากหน้า
      window.removeEventListener("storage", handleUpdate); // ลบ event ตอนออกจากหน้า
    };
  }, [car, location.key]); // ทำงานใหม่เมื่อ car หรือ key เปลี่ยน (เช่น refresh หน้า)

  //  คำนวณรูปภาพเมื่อเลือกของแต่ง
  useEffect(() => {
    if (!car) return; // ถ้าไม่เจอรถให้หยุด

    const selectedNames: Partial<Record<Category, string>> = {}; // เก็บชื่อ option ที่เลือกแต่ละหมวด
    for (const key in selected) {
      // วนหมวดหมู่ทั้งหมด
      const opt = selected[key as Category]; // value ของหมวด
      if (opt) selectedNames[key as Category] = opt.name; // ถ้ามีให้เก็บชื่อ
    }

    const nothingSelected =
      !selected.colors && !selected.wheels && !selected.spoilers; // true ถ้ายังไม่ได้เลือกอะไรเลย

    let finalImage = car.image; // default เป็นภาพรถปกติ

    if (!nothingSelected) {
      // ถ้ามีการเลือกของแต่ง
      const comboImage = findComboImage(car.publicId, selectedNames); // หาภาพรวม (ถ้ามี)
      finalImage =
        comboImage || // ใช้ภาพรวมถ้ามี
        selected.spoilers?.image || // ถ้าไม่มี ใช้ภาพสปอยเลอร์ก่อน
        selected.wheels?.image || // ต่อด้วยภาพล้อ
        selected.colors?.image || // ต่อด้วยภาพสี
        car.image; // ถ้ายังไม่มีเลย ใช้ภาพ default
    }

    const img = new Image(); // preload เพื่อรอให้โหลดก่อนแสดง
    img.src = finalImage;
    img.onload = () => {
      setDisplayImage(finalImage); // เซ็ตภาพโชว์
      setFadeKey((prev) => prev + 1); // เพิ่ม key เพื่อให้ภาพ animate ใหม่อีกครั้ง
    };
  }, [selected, car]); // ใช้ effect เมื่อมีการเปลี่ยน selected

  //  ฟังก์ชันเลือก option
  const handleSelect = (category: Category, option: OverlayOption) => {
    setSelected((prev) => {
      const isSame = prev[category]?.name === option.name; // ถ้ากดซ้ำรายการเดิม = จะลบออก
      return { ...prev, [category]: isSame ? null : option }; // ถ้าซ้ำ → null, ถ้าใหม่ → เลือกอันใหม่
    });
  };

  //  ถ้าไม่มี car ส่งมาจากหน้าอื่น ให้แจ้ง error
  if (!car)
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-10 text-center bg-black text-white">
        <h1 className="text-2xl font-bold mb-4">Car not found</h1>
        <button
          className="bg-[#0a1444] hover:bg-[#13235f] text-white px-6 py-3 rounded-lg shadow-[0_0_20px_rgba(10,20,68,0.6)] transition"
          onClick={() => navigate("/models")} // กลับหน้า models
        >
          Back to Models
        </button>
      </div>
    );

  //  โหลด options อยู่ (ก่อนโหลดเสร็จ)
  if (!options)
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-10 text-center bg-black text-white">
        <h1 className="text-2xl font-bold mb-4">
          Loading customization options...
        </h1>
        <button
          className="bg-[#0a1444] hover:bg-[#13235f] text-white px-6 py-3 rounded-lg shadow-[0_0_20px_rgba(10,20,68,0.6)] transition"
          onClick={() => navigate("/models")}
        >
          Back to Models
        </button>
      </div>
    );

  // หมวดหมู่ของแต่ง 3 แบบ
  const categories: Category[] = ["colors", "wheels", "spoilers"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a0f1a] to-[#0b1330] text-white pt-24 font-sans">
      <div className="flex flex-col lg:flex-row p-8 gap-10 max-w-[1600px] mx-auto items-center justify-between">
        {/* ============================
             ส่วนแสดงภาพรถหลัก
        ============================= */}
        <div className="flex-1 flex justify-center items-center w-full">
          {" "}
          {/* กล่องใหญ่จัดกึ่งกลางภาพรถ */}
          <div className="relative w-full max-w-7xl bg-[#0a0f1a]/70 rounded-3xl border border-[#1e3a8a]/30 shadow-[0_0_40px_rgba(30,58,138,0.4)] overflow-hidden backdrop-blur-lg">
            {" "}
            {/* กรอบแสดงรถ ไล่สี ใสขอบเบา */}
            <img
              key={fadeKey} // ให้ React re-render เพื่อเล่น animation fade-in ทุกครั้งที่รูปเปลี่ยน
              src={displayImage} // ใช้รูปที่คำนวณแล้วจาก selected
              alt={car.name} // ชื่อรถสำหรับ screen reader
              className="w-full h-[80vh] object-contain transition-transform duration-700 ease-in-out opacity-0 animate-fadeIn hover:scale-[1.03]" // ทำให้รูป fade-in + hover ขยายเล็กน้อย
              onLoad={(e) => {
                (e.currentTarget as HTMLImageElement).style.opacity = "1"; // ทำให้รูปค่อย ๆ โผล่เมื่อโหลดเสร็จ
              }}
            />
          </div>
        </div>

        {/* ===============================
            🎛️ แผงควบคุมเลือกของแต่ง
        ================================= */}
        <div className="w-full lg:w-[32rem] bg-[#0a0f1a]/90 border border-[#1e3a8a]/30 shadow-[0_0_30px_rgba(30,58,138,0.5)] p-8 rounded-3xl backdrop-blur-md lg:ml-auto">
          {" "}
          {/* กล่อง Control Panel ด้านขวา */}
          <h1 className="text-4xl font-extrabold mb-6 text-white border-b border-[#1e3a8a]/40 pb-3 tracking-tight">
            {" "}
            {/* หัวข้อใหญ่ */}
            Customize <span className="text-[#00eaff]">{car.name}</span>{" "}
            {/* ชื่อรถมีสีฟ้าเน้น */}
          </h1>
          {/* วนลูปแสดงปุ่มเลือกของแต่งแต่ละหมวด (สี / ล้อ / สปอยเลอร์) */}
          {categories.map((category) => (
            <div key={category} className="mb-8">
              {" "}
              {/* กล่องของแต่ละหมวด */}
              <h2 className="text-lg font-semibold mb-3 text-gray-300">
                {" "}
                {/* หัวข้อหมวด */}
                Choose {category.charAt(0).toUpperCase() +
                  category.slice(1)}{" "}
                {/* แปลงชื่อเป็นตัวใหญ่ */}
              </h2>
              <div className="flex gap-3 flex-wrap">
                {" "}
                {/* วางปุ่มแบบ wrap บรรทัด */}
                {(options[category] as OverlayOption[]).map(
                  (
                    opt // วนรายการ option ในหมวด
                  ) => (
                    <Button
                      key={opt.name} // key ของปุ่ม
                      label={opt.name} // ชื่อปุ่ม
                      onClick={() => handleSelect(category, opt)} // เมื่อเลือก ให้เรียก handleSelect
                      variant={
                        selected[category]?.name === opt.name
                          ? "primary"
                          : "outline"
                      } // ถ้าเลือกอยู่ให้เปลี่ยนเป็น primary
                    />
                  )
                )}
              </div>
            </div>
          ))}
          {/* แสดงว่าตอนนี้เลือกอะไรอยู่ */}
          <div className="mt-10 border-t border-[#1e3a8a]/30 pt-5">
            {" "}
            {/* เส้นคั่น */}
            <p className="text-gray-400 text-sm">Selected:</p> {/* หัวข้อ */}
            <p className="font-semibold text-white text-lg mt-1">
              {" "}
              {/* รายการตัวเลือก */}
              {Object.values(selected)
                .filter(Boolean) // เอาเฉพาะที่ไม่ใช่ null
                .map((item) => item!.name) // แปลงเป็นชื่อ
                .join(" · ") || // คั่นด้วยจุดกลาง
                "None"}{" "}
              
            </p>
          </div>
          {/* ปุ่ม reload และ add to cart */}
          
            {" "}
          </div>
        </div>
      </div>
  );
};

export default CustomCar; 
