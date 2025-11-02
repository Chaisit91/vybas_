import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import type { Car } from "../types/Car";
import { loadCarOptions } from "../services/carStorage";

interface OverlayOption {
  name: string;
  image: string;
}

type Category = "colors" | "wheels" | "spoilers";

interface CarOptions {
  colors: OverlayOption[];
  wheels: OverlayOption[];
  spoilers: OverlayOption[];
}

const CustomCar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const car: Car | undefined = location.state?.car;

  const optionsData = loadCarOptions();
  const options: CarOptions | undefined = car ? optionsData[car.publicId] : undefined;

  const [selected, setSelected] = useState<Record<Category, OverlayOption | null>>({
    colors: null,
    wheels: null,
    spoilers: null,
  });

  const [displayImage, setDisplayImage] = useState<string>(car?.image || "");

  useEffect(() => {
    if (car) setDisplayImage(car.image);
  }, [car]);

  const handleSelect = (category: Category, option: OverlayOption) => {
    setSelected((prev) => {
      const isSame = prev[category]?.name === option.name;
      const updated = { ...prev, [category]: isSame ? null : option };

      // ✅ อัปเดตรูปจาก option ล่าสุดที่เลือก
      const newImage = updated[category]?.image || car?.image || "";
      console.log("🔹 Selected image:", newImage);
      setDisplayImage(newImage);

      return updated;
    });
  };

  if (!car) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-xl font-bold">Car not found</h1>
        <button
          onClick={() => navigate("/models")}
          className="bg-yellow-500 px-4 py-2 rounded mt-4"
        >
          Back
        </button>
      </div>
    );
  }

  if (!options) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center">
        <h1 className="text-2xl font-bold mb-2">No customization options</h1>
        <p className="text-gray-500 mb-4">
          รถคันนี้ยังไม่มีตัวเลือกของแต่งในระบบ admin
        </p>
        <button
          onClick={() => navigate("/models")}
          className="bg-yellow-500 text-black px-6 py-3 rounded"
        >
          Back to Models
        </button>
      </div>
    );
  }

  const categories: Category[] = ["colors", "wheels", "spoilers"];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="flex flex-col md:flex-row p-6 gap-6">
        {/* ✅ รูปรถที่โชว์ */}
        <div className="flex-1 flex justify-center items-center">
          <div className="relative w-[80vw] md:w-[40vw] mx-auto aspect-video rounded-xl bg-gray-100 shadow-md overflow-hidden">
            {displayImage ? (
              <img
                src={displayImage}
                alt="car display"
                className="absolute inset-0 w-full h-full object-contain transition-opacity duration-700"
              />
            ) : (
              <p className="text-gray-400 text-center">No image available</p>
            )}
          </div>
        </div>

        {/* ✅ ตัวเลือกแต่ง */}
        <div className="w-full md:w-[35%] bg-white shadow-md p-6 rounded-t-2xl md:rounded-none md:rounded-l-2xl">
          <h1 className="text-2xl font-bold mb-6">Customize {car.name}</h1>

          {categories.map((category) => (
            <div key={category} className="mb-8">
              <h2 className="text-lg font-semibold mb-3 capitalize">
                {category}
              </h2>
              <div className="flex flex-wrap gap-3">
                {options[category]?.length ? (
                  options[category].map((opt) => (
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
                  ))
                ) : (
                  <p className="text-sm text-gray-400">
                    No {category} options available
                  </p>
                )}
              </div>
            </div>
          ))}

          {/* ✅ Reset */}
          <div className="mt-8">
            <Button
              label="Reset to Default"
              variant="outline"
              onClick={() => {
                setSelected({ colors: null, wheels: null, spoilers: null });
                setDisplayImage(car.image);
              }}
            />
          </div>

          {/* ✅ แสดงผลการเลือก */}
          <div className="mt-10 border-t pt-4">
            <p className="text-gray-500 text-sm">Selected:</p>
            <p className="font-semibold text-gray-800">
              {Object.values(selected)
                .filter(Boolean)
                .map((i) => i!.name)
                .join(" · ") || "None"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomCar;
