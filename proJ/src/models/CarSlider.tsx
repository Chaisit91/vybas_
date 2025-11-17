import { useState, useEffect } from "react"; // นำเข้า useState และ useEffect สำหรับจัดการ state และ lifecycle
import { useNavigate } from "react-router-dom"; // นำเข้า useNavigate เพื่อใช้เปลี่ยนหน้า
import type { Car } from "../types/carall"; // นำเข้า type Car เพื่อให้ TypeScript ตรวจสอบข้อมูล
import defaultCarsData from "../assets/data.json"; // นำเข้าข้อมูลรถเริ่มต้นจากไฟล์ JSON โดยตรง

const defaultCars = defaultCarsData as Car[]; // แปลงข้อมูล JSON เป็น array ของ Car

interface CarSliderProps {
  cars?: Car[]; // กำหนดให้ props cars สามารถส่งมาก็ได้หรือไม่ส่งมาก็ได้
}

const CarSlider: React.FC<CarSliderProps> = ({ cars }) => { // ประกาศ component CarSlider แบบ React.FC
  const navigate = useNavigate(); // สร้าง navigate สำหรับเปลี่ยนหน้า
  const [carList, setCarList] = useState<Car[]>(cars || []); // state สำหรับเก็บรายการรถทั้งหมด
  const [index, setIndex] = useState(0); // state สำหรับตำแหน่ง index รถที่กำลังแสดงผล

  useEffect(() => { // ใช้โหลดข้อมูลเมื่อ component ถูก render ครั้งแรก
    const saved = localStorage.getItem("car_list_data"); // อ่านข้อมูลรถที่ผู้ใช้สร้างจาก localStorage
    const deleted = JSON.parse(localStorage.getItem("deleted_cars") || "[]"); // อ่านรายการรถที่ถูกลบออกจากระบบ

    let parsed: Car[] = []; // ตัวแปรสำหรับเก็บข้อมูลรถที่โหลดจาก localStorage
    if (saved) { // ตรวจสอบว่ามีข้อมูลใน localStorage หรือไม่
      try {
        parsed = JSON.parse(saved); // แปลง JSON เป็น array
      } catch {
        parsed = []; // ถ้าเกิด error ให้ใช้ array ว่างแทน
      }
    }

    const merged = [ // รวมรถ default + รถที่ผู้ใช้เพิ่มเอง
      ...defaultCars.filter((car) => !deleted.includes(car.publicId)), // รวมรถเริ่มต้นเฉพาะคันที่ไม่ถูกลบ
      ...parsed.filter((newCar) => !deleted.includes(newCar.publicId)), // รวมรถใหม่เฉพาะที่ไม่ถูกลบ
    ];

    setCarList(merged); // อัปเดตรายการรถใน state
  }, []); // ทำงานครั้งเดียวเมื่อหน้าโหลด

  const car = carList[index]; // เลือกรถตาม index ปัจจุบัน

  if (!car) { // ถ้าไม่มีรถให้แสดงข้อความ
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 text-lg bg-gradient-to-b from-gray-900 to-gray-800">
        No cars available.
      </div>
    );
  }

  const next = () => setIndex((i) => (i + 1) % carList.length); // ฟังก์ชันเลื่อนไปคันถัดไป
  const prev = () => setIndex((i) => (i - 1 + carList.length) % carList.length); // ฟังก์ชันเลื่อนไปคันก่อนหน้า

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-[#0A0F1C] via-[#0F1628] to-[#0A0F1C] text-white">
      {/* ชั้น background ด้านหลัง */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-0" />

      {/* ส่วนของเนื้อหา */}
      <div className="relative z-10 text-center px-6 animate-fadeIn">

        {/* ชื่อรุ่นรถ */}
        <h2 className="text-xl md:text-2xl tracking-widest text-blue-200 font-semibold mb-2 uppercase">
          {car.name}
        </h2>

        {/* ข้อความ tagline */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-10 drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
          {car.tagline}
        </h1>

        {/* กล่องแสดงภาพรถ */}
        <div className="relative mx-auto w-[85vw] md:w-[70vw]">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-transparent via-[#0A0F1C]/60 to-[#0A0F1C] blur-2xl opacity-70" />
          <img
            src={car.image} // รูปภาพของรถ
            alt={car.name} // ชื่อรถสำหรับ SEO และ accessibility
            className="relative z-10 w-full rounded-3xl transition-transform duration-700 hover:scale-105"/>
        </div>

        {/* ปุ่ม Explore */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => navigate("/custom-car", { state: { car } })} // เมื่อคลิกให้ไปหน้า custom-car พร้อมส่งข้อมูลรถ
            className="bg-gradient-to-r from-[#1c2a44] to-[#223355] hover:from-[#223355] hover:to-[#2C3E60] text-white px-10 py-3 rounded-full font-semibold tracking-wide transition-all duration-300 shadow-lg hover:shadow-blue-900/40">
            EXPLORE THE MODEL
          </button>
        </div>
      </div>

      {/* ปุ่มเลื่อนซ้ายขวา เฉพาะเมื่อมีรถมากกว่า 1 คัน */}
      {carList.length > 1 && (
        <>
          <button
            onClick={prev} // ปุ่มเลื่อนไปคันก่อนหน้า
            className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white text-4xl transition-all duration-300">
            ‹
          </button>

          <button
            onClick={next} // ปุ่มเลื่อนไปคันถัดไป
            className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white text-4xl transition-all duration-300">
            ›
          </button>
        </>
      )}
    </section>
  );
};

export default CarSlider; 
