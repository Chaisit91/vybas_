import { useState } from "react";
import carsData from "../assets/data.json"; // import JSON
import type { Car } from "../types/Car";
import Button from "../components/Button";

interface OverlayOption {
  name: string;
  publicId: string;
}

const CustomCar = () => {
  const car: Car = carsData[0]; // สมมติเลือก car ตัวแรก
  const colors: OverlayOption[] = [
    { name: "Red", publicId: "car-red" },
    { name: "Blue", publicId: "car-blue" },
    { name: "Black", publicId: "car-black" },
  ];
  const wheels: OverlayOption[] = [
    { name: "Standard", publicId: "wheels-standard" },
    { name: "Sport", publicId: "wheels-sport" },
  ];

  const [selectedColor, setSelectedColor] = useState<OverlayOption>(colors[0]);
  const [selectedWheel, setSelectedWheel] = useState<OverlayOption>(wheels[0]);

  const finalImageUrl = `https://res.cloudinary.com/dlp0q39ua/image/upload/l_${selectedColor.publicId},l_${selectedWheel.publicId}/${car.publicId}.png`;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="flex flex-col md:flex-row p-6">
        <div className="flex-1 flex justify-center items-center">
          <img src={finalImageUrl} alt={car.name} className="w-[80vw] md:w-[40vw]" />
        </div>

        <div className="w-full md:w-[35%] bg-white shadow-md p-6 rounded-t-2xl md:rounded-none md:rounded-l-2xl">
          <h1 className="text-2xl font-bold mb-6">Customize {car.name}</h1>

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Choose Color</h2>
            <div className="flex gap-3 flex-wrap">
              {colors.map((c) => (
                <Button
                  key={c.name}
                  label={c.name}
                  onClick={() => setSelectedColor(c)}
                  variant={selectedColor.name === c.name ? "primary" : "outline"}
                />
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Choose Wheels</h2>
            <div className="flex gap-3 flex-wrap">
              {wheels.map((w) => (
                <Button
                  key={w.name}
                  label={w.name}
                  onClick={() => setSelectedWheel(w)}
                  variant={selectedWheel.name === w.name ? "primary" : "outline"}
                />
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
