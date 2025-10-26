// src/pages/CustomCar.tsx
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Car } from "../types/Car";
import Button from "../components/Button";
import carOptions from "../assets/carOptions.json";

interface OverlayOption {
  name: string;
  image: string;
}

const CLOUDINARY_BASE = "https://res.cloudinary.com/dzhxwdlwb/image/upload/";

const CustomCar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const car: Car = location.state?.car;

  if (!car)
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-10 text-center">
        <h1 className="text-2xl font-bold mb-4">Car not found</h1>
        <button
          className="bg-yellow-500 text-black px-6 py-3 rounded"
          onClick={() => navigate("/models")}
        >
          Back to Models
        </button>
      </div>
    );

  const options: Record<string, OverlayOption[]> = (carOptions as any)[car.publicId];

  if (!options)
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-10 text-center">
        <h1 className="text-2xl font-bold mb-4">No customization options found</h1>
        <button
          className="bg-yellow-500 text-black px-6 py-3 rounded"
          onClick={() => navigate("/models")}
        >
          Back to Models
        </button>
      </div>
    );

  // state สำหรับตัวเลือกแต่ละหมวด
  const initialSelected: Record<string, OverlayOption | null> = {};
  Object.keys(options).forEach((key) => (initialSelected[key] = null));
  const [selected, setSelected] = useState(initialSelected);

  // state สำหรับรูปที่จับคู่กัน
  const [comboImage, setComboImage] = useState<string | null>(null);

  // เมื่อเลือก option ใด ๆ ให้ลองตรวจสอบรูป combo
  useEffect(() => {
    const chosenNames = Object.values(selected)
      .filter(Boolean)
      .map((opt) => opt!.name.toLowerCase().replace(/\s+/g, ""));

    if (chosenNames.length >= 2) {
      const comboUrl = `${CLOUDINARY_BASE}${car.publicId}-${chosenNames.join("-")}.png`;

      const img = new Image();
      img.src = comboUrl;
      img.onload = () => setComboImage(comboUrl);
      img.onerror = () => setComboImage(null);
    } else {
      setComboImage(null);
    }
  }, [selected, car.publicId]);

  const handleSelect = (category: string, option: OverlayOption) => {
    setSelected((prev) => ({
      ...prev,
      [category]: prev[category]?.name === option.name ? null : option,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="flex flex-col md:flex-row p-6 gap-6">
        {/* 🚗 รูปรถ + overlay */}
        <div className="flex-1 flex justify-center items-center">
          <div className="relative w-[80vw] md:w-[40vw] mx-auto">
            <img
              src={car.image}
              alt={car.name}
              className="w-full rounded-xl shadow-lg"
            />

            {comboImage ? (
              <img
                src={comboImage}
                alt="Combined customization"
                className="absolute top-0 left-0 w-full h-full rounded-xl"
              />
            ) : (
              Object.entries(selected).map(([category, opt]) =>
                opt?.image ? (
                  <img
                    key={category}
                    src={opt.image}
                    alt={category}
                    className="absolute top-0 left-0 w-full h-full rounded-xl"
                  />
                ) : null
              )
            )}
          </div>
        </div>

        {/* 🛠 ตัวเลือกแต่ง */}
        <div className="w-full md:w-[35%] bg-white shadow-md p-6 rounded-t-2xl md:rounded-none md:rounded-l-2xl">
          <h1 className="text-2xl font-bold mb-6">Customize {car.name}</h1>

          {Object.entries(options).map(([category, opts]) => {
            const label = category.charAt(0).toUpperCase() + category.slice(1);
            return (
              <div key={category} className="mb-8">
                <h2 className="text-lg font-semibold mb-3">Choose {label}</h2>
                <div className="flex gap-3 flex-wrap">
                  {(opts as OverlayOption[]).map((opt) => (
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
            );
          })}

          {/* 🧾 สรุป */}
          <div className="mt-10 border-t pt-4">
            <p className="text-gray-500 text-sm">Selected:</p>
            <p className="font-semibold text-gray-800">
              {Object.values(selected)
                .filter(Boolean)
                .map((item) => item!.name)
                .join(" · ") || "None"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomCar;
