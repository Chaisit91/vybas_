import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Car } from "../types/Car";
import defaultCarsData from "../assets/data.json";

const defaultCars = defaultCarsData as Car[];

interface CarSliderProps {
  cars?: Car[];
}

const CarSlider: React.FC<CarSliderProps> = ({ cars }) => {
  const navigate = useNavigate();
  const [carList, setCarList] = useState<Car[]>(cars || []);
  const [index, setIndex] = useState(0);

  // ✅ โหลดข้อมูลรถทั้งหมด (รวมค่าเริ่มต้น + รถใหม่ที่เพิ่ม + ข้ามรถที่ถูกลบ)
  useEffect(() => {
    const saved = localStorage.getItem("car_list_data");
    const deleted = JSON.parse(localStorage.getItem("deleted_cars") || "[]");

    let parsed: Car[] = [];
    if (saved) {
      try {
        parsed = JSON.parse(saved);
      } catch {
        parsed = [];
      }
    }

    // รวม defaultCars + localStorage (ข้ามรถที่ถูกลบ)
    const merged = [
      ...defaultCars.filter((car) => !deleted.includes(car.publicId)),
      ...parsed.filter((newCar) => !deleted.includes(newCar.publicId)),
    ];

    setCarList(merged);
  }, []);

  const car = carList[index];
  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 text-lg bg-gradient-to-b from-gray-900 to-gray-800">
        No cars available.
      </div>
    );
  }

  const next = () => setIndex((i) => (i + 1) % carList.length);
  const prev = () => setIndex((i) => (i - 1 + carList.length) % carList.length);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-[#0A0F1C] via-[#0F1628] to-[#0A0F1C] text-white">
      {/* Layer background */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-0" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 animate-fadeIn">
        {/* Model Name */}
        <h2 className="text-xl md:text-2xl tracking-widest text-blue-200 font-semibold mb-2 uppercase">
          {car.name}
        </h2>

        {/* Tagline */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-10 drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
          {car.tagline}
        </h1>

        {/* Car Image */}
        <div className="relative mx-auto w-[85vw] md:w-[70vw]">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-transparent via-[#0A0F1C]/60 to-[#0A0F1C] blur-2xl opacity-70" />
          <img
            src={car.image}
            alt={car.name}
            className="relative z-10 w-full rounded-3xl transition-transform duration-700 hover:scale-105"
          />
        </div>

        {/* Explore Button */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => navigate("/custom-car", { state: { car } })}
            className="bg-gradient-to-r from-[#1C2A44] to-[#223355] hover:from-[#223355] hover:to-[#2C3E60] text-white px-10 py-3 rounded-full font-semibold tracking-wide transition-all duration-300 shadow-lg hover:shadow-blue-900/40"
          >
            EXPLORE THE MODEL →
          </button>
        </div>
      </div>

      {/* Navigation arrows */}
      {carList.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white text-4xl transition-all duration-300"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white text-4xl transition-all duration-300"
          >
            ›
          </button>
        </>
      )}
    </section>
  );
};

export default CarSlider;
