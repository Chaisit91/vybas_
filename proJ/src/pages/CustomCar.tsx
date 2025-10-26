import { useState } from "react";
import { useLocation } from "react-router-dom";
import type { Car } from "../types/Car";
import Button from "../components/Button";
import carOptions from "../assets/carOptions.json";

interface OverlayOption {
  name: string;
  image: string;
}

const CustomCar = () => {
  const location = useLocation();
  const car: Car = location.state?.car;

  if (!car) return <div className="p-10 text-center">Car not found</div>;

  const options: Record<string, OverlayOption[]> = (carOptions as any)[car.publicId];

  if (!options) return <div className="p-10 text-center">No customization options found</div>;

  // State สำหรับเลือกแต่ละชิ้น
  const [selectedColor, setSelectedColor] = useState<OverlayOption | null>(null);
  const [selectedWheel, setSelectedWheel] = useState<OverlayOption | null>(null);
  const [selectedExhaust, setSelectedExhaust] = useState<OverlayOption | null>(null);
  const [selectedWindow, setSelectedWindow] = useState<OverlayOption | null>(null);
  const [selectedSpoiler, setSelectedSpoiler] = useState<OverlayOption | null>(null);

  const overlayParts = [
    selectedColor?.image,
    selectedWheel?.image,
    selectedExhaust?.image,
    selectedWindow?.image,
    selectedSpoiler?.image
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="flex flex-col md:flex-row p-6">
        {/* 🚗 รูปรถ + overlay */}
        <div className="flex-1 flex justify-center items-center">
          <div className="relative w-[80vw] md:w-[40vw] mx-auto">
            <img
              src={car.image}
              alt={car.name}
              className="w-full rounded-xl shadow-lg"
            />
            {overlayParts.map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                className="absolute top-0 left-0 w-full h-full rounded-xl"
              />
            ))}
          </div>
        </div>

        {/* 🛠 ตัวเลือกแต่ง */}
        <div className="w-full md:w-[35%] bg-white shadow-md p-6 rounded-t-2xl md:rounded-none md:rounded-l-2xl">
          <h1 className="text-2xl font-bold mb-6">Customize {car.name}</h1>

          {Object.entries(options).map(([category, opts]) => {
            const label = category.charAt(0).toUpperCase() + category.slice(1);
            const [selected, setSelected] =
              category === "colors"
                ? [selectedColor, setSelectedColor]
                : category === "wheels"
                ? [selectedWheel, setSelectedWheel]
                : category === "exhausts"
                ? [selectedExhaust, setSelectedExhaust]
                : category === "windows"
                ? [selectedWindow, setSelectedWindow]
                : [selectedSpoiler, setSelectedSpoiler];

            return (
              <div key={category} className="mb-8">
                <h2 className="text-lg font-semibold mb-3">Choose {label}</h2>
                <div className="flex gap-3 flex-wrap">
                  {(opts as OverlayOption[]).map((opt) => (
                    <Button
                      key={opt.name}
                      label={opt.name}
                      onClick={() =>
                        setSelected(selected?.name === opt.name ? null : opt)
                      }
                      variant={selected?.name === opt.name ? "primary" : "outline"}
                    />
                  ))}
                </div>
              </div>
            );
          })}

          {/* สรุป */}
          <div className="mt-10 border-t pt-4">
            <p className="text-gray-500 text-sm">Selected:</p>
            <p className="font-semibold text-gray-800">
              {[selectedColor, selectedWheel, selectedExhaust, selectedWindow, selectedSpoiler]
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
