import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import type { Car, OverlayOption, CarOptions } from "../types/Car";
import Button from "../components/Button";

const CustomCar: React.FC = () => {
  const location = useLocation();
  const car: Car = location.state?.car;

  const [options, setOptions] = useState<CarOptions | null>(null);
  const [selectedColor, setSelectedColor] = useState<OverlayOption | null>(null);
  const [selectedWheel, setSelectedWheel] = useState<OverlayOption | null>(null);
  const [selectedExhaust, setSelectedExhaust] = useState<OverlayOption | null>(null);
  const [selectedWindow, setSelectedWindow] = useState<OverlayOption | null>(null);
  const [selectedSpoiler, setSelectedSpoiler] = useState<OverlayOption | null>(null);

  useEffect(() => {
    fetch("/assets/carOptions.json")
      .then((res) => res.json())
      .then((data: CarOptions) => setOptions(data))
      .catch((err) => console.error(err));
  }, []);

  if (!car) return <div className="p-10 text-center">Car not found</div>;
  if (!options) return <div className="p-10 text-center">Loading options...</div>;

  const carOptions = options[car.publicId];
  if (!carOptions) return <div className="p-10 text-center">No options for this car</div>;

  const overlayParts = [selectedColor, selectedWheel, selectedExhaust, selectedWindow, selectedSpoiler]
    .map((o) => o?.image)
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="flex flex-col md:flex-row p-6">
        <div className="flex-1 flex justify-center items-center">
          <div className="relative w-[80vw] md:w-[40vw] mx-auto">
            <img src={car.image} alt={car.name} className="w-full rounded-xl shadow-lg"/>
            {overlayParts.map((img, i) => (
              <img key={i} src={img} alt="" className="absolute top-0 left-0 w-full h-full rounded-xl"/>
            ))}
          </div>
        </div>

        <div className="w-full md:w-[35%] bg-white shadow-md p-6 rounded-t-2xl md:rounded-none md:rounded-l-2xl">
          <h1 className="text-2xl font-bold mb-6">Customize {car.name}</h1>

          {Object.entries(carOptions).map(([category, opts]) => {
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
                : category === "spoilers"
                ? [selectedSpoiler, setSelectedSpoiler]
                : [null, () => {}];

            return (
              <div key={category} className="mb-4">
                <h2 className="font-semibold mb-2">{label}</h2>
                <div className="flex gap-2 flex-wrap">
                  {(opts as OverlayOption[]).map((opt) => (
                    <button
                      key={opt.name}
                      className={`px-3 py-1 border rounded ${selected === opt ? "border-blue-600" : "border-gray-300"}`}
                      onClick={() => setSelected(opt)}
                    >
                      {opt.name}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}

          <Button label="Add to Cart" variant="primary" onClick={() => alert("Added to cart!")}/>
        </div>
      </div>
    </div>
  );
};

export default CustomCar;
