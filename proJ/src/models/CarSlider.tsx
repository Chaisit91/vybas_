import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Car } from "../types/carall";
import defaultCarsData from "../assets/data.json";

// cast defaultCarsData เป็น Car[]
const defaultCars = defaultCarsData as Car[];

// Props ของ CarSlider: สามารถส่ง cars เข้ามาได้
interface CarSliderProps {
  cars?: Car[];
}

const CarSlider: React.FC<CarSliderProps> = ({ cars }) => {
  const navigate = useNavigate();

  // state เก็บรายการรถ (props || [])
  const [carList, setCarList] = useState<Car[]>(cars || []);
  // state เก็บ index รถปัจจุบัน
  const [index, setIndex] = useState(0);

  // โหลดรายการรถตอน component mount
  useEffect(() => {
    // ดึง car list จาก localStorage
    const saved = localStorage.getItem("car_list_data");
    // ดึง cars ที่ถูกลบไว้
    const deleted = JSON.parse(localStorage.getItem("deleted_cars") || "[]");

    let parsed: Car[] = [];

    // parse localStorage ถ้ามี
    if (saved) {
      try {
        parsed = JSON.parse(saved);
      } catch {
        parsed = [];
      }
    }

    // รวม defaultCars และ cars ที่มาจาก localStorage แต่ไม่รวม deleted
    const merged = [
      ...defaultCars.filter((car) => !deleted.includes(car.publicId)),
      ...parsed.filter((newCar) => !deleted.includes(newCar.publicId)),
    ];

    // update state carList
    setCarList(merged);
  }, []);

  // รถปัจจุบันตาม index
  const car = carList[index];

  // กรณีไม่มีรถ
  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 text-lg bg-gradient-to-b from-gray-900 to-gray-800">
        No cars available.
      </div>
    );
  }

  // ฟังก์ชันเลื่อนไปรถถัดไป
  const next = () => setIndex((i) => (i + 1) % carList.length);
  // ฟังก์ชันเลื่อนไปรถก่อนหน้า
  const prev = () => setIndex((i) => (i - 1 + carList.length) % carList.length);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-[#0A0F1C] via-[#0F1628] to-[#0A0F1C] text-white">

      {/* แสดง background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-0" />

      {/* ข้อความชื่อและ tagline รถ */}
      <div className="relative z-10 text-center px-6 animate-fadeIn mt-2 md:mt-4">

        {/* ชื่อรถ */}
        <h2 className="text-xl md:text-2xl tracking-widest text-blue-200 font-semibold mb-1 uppercase">
          {car.name}
        </h2>

        {/* Tagline รถ */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-0 drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
          {car.tagline}
        </h1>

        {/* Container รูปภาพรถ */}
        <div className="relative mx-auto w-[85vw] md:w-[70vw] -mt-6 md:-mt-10">
          {/* Gradient overlay ด้านหลังภาพรถ */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-transparent via-[#0A0F1C]/60 to-[#0A0F1C] blur-2xl opacity-70" />

          {/* ภาพรถ */}
          <img
            src={car.image}
            alt={car.name}
            className="
              relative z-10 w-full
              h-[420px] md:h-[580px]
              object-contain object-center
              rounded-3xl
              transition-transform duration-700 hover:scale-105
            "
          />
        </div>

        {/* ปุ่ม Explore the Model  ไปหน้า CustomCar */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate('/custom-car', { state: { car } })} // ส่ง state car ไปหน้า custom-car
            className="bg-gradient-to-r from-[#1c2a44] to-[#223355] hover:from-[#223355] hover:to-[#2C3E60] text-white px-10 py-3 rounded-full font-semibold tracking-wide transition-all duration-300 shadow-lg hover:shadow-blue-900/40"
          >
            EXPLORE THE MODEL
          </button>
        </div>
      </div>

      {/* Navigation Arrows  เลื่อนรถซ้าย/ขวา */}
      {carList.length > 1 && (
        <>
          {/* ปุ่มก่อนหน้า */}
          <button
            onClick={prev}
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white text-4xl z-20 p-4 transition-all duration-300"
          >
            ‹
          </button>

          {/* ปุ่มถัดไป */}
          <button
            onClick={next}
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white text-4xl z-20 p-4 transition-all duration-300"
          >
            ›
          </button>
        </>
      )}
    </section>
  );
};

export default CarSlider;
