import { useLocation } from "react-router-dom";
import { useState } from "react";
import type { Car } from "../types/Car";
import Navbar from "../components/Navbar";

const CustomCar = () => {
  const location = useLocation();
  const car = location.state?.car as Car | undefined;

  // Mock parts ที่แต่งได้
  const colors = [
    { name: "Red", image: "https://res.cloudinary.com/demo/image/upload/v1723456789/car-red.png" },
    { name: "Blue", image: "https://res.cloudinary.com/demo/image/upload/v1723456789/car-blue.png" },
    { name: "Black", image: "https://res.cloudinary.com/demo/image/upload/v1723456789/car-black.png" },
  ];
  

  const wheels = [
    { name: "Standard", image: "https://res.cloudinary.com/demo/image/upload/v1723456789/wheels-standard.png" },
    { name: "Sport", image: "https://res.cloudinary.com/demo/image/upload/v1723456789/wheels-sport.png" },
  ];

  // เก็บ state ของของแต่ง
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedWheel, setSelectedWheel] = useState(wheels[0]);

  // สมมติรูปสุดท้าย = base รถ + ของแต่ง
  const finalImage = selectedColor.image;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar ด้านบน */}
      <Navbar />

      <div className="flex flex-col md:flex-row pt-20 md:pt-24">
        {/* 🔹 ด้านซ้าย: รูปรถ */}
        <div className="flex-1 flex justify-center items-center p-6">
          <div className="relative">
            {/* base car image */}
            {car && (
              <img
                src={car.image}
                alt={car.name}
                className="w-[80vw] md:w-[40vw] transition-opacity duration-500 opacity-70"
              />
            )}
            {/* overlay สีรถ */}
            <img
              src={finalImage}
              alt="custom car"
              className="absolute top-0 left-0 w-[80vw] md:w-[40vw] transition-opacity duration-500"
            />
          </div>
        </div>

        {/* 🔹 ด้านขวา: เมนูเลือกของแต่ง */}
        <div className="w-full md:w-[35%] bg-white shadow-md p-6 rounded-t-2xl md:rounded-none md:rounded-l-2xl">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Customize {car ? car.name : "Your Car"}
          </h1>

          {/* สีรถ */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3 text-gray-700">Choose Color</h2>
            <div className="flex gap-3 flex-wrap">
              {colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c)}
                  className={`px-4 py-2 rounded-full border transition ${
                    selectedColor.name === c.name
                      ? "bg-black text-white"
                      : "border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* ล้อรถ */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3 text-gray-700">Choose Wheels</h2>
            <div className="flex gap-3 flex-wrap">
              {wheels.map((w) => (
                <button
                  key={w.name}
                  onClick={() => setSelectedWheel(w)}
                  className={`px-4 py-2 rounded-full border transition ${
                    selectedWheel.name === w.name
                      ? "bg-black text-white"
                      : "border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {w.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 border-t pt-4">
            <p className="text-gray-500 text-sm">Selected:</p>
            <p className="font-semibold text-gray-800">
              {selectedColor.name} · {selectedWheel.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomCar;
