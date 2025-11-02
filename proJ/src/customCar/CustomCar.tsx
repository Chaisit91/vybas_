import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { getCarOptions } from "../services/carOptionsService";
import type { Car } from "../types/Car";
import type { OverlayOption, CarOptions } from "../services/carOptionsService"; // ✅ import มาจาก service

type Category = "colors" | "wheels" | "spoilers";

const CustomCar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const car: Car | undefined = location.state?.car;

  const [options, setOptions] = useState<CarOptions | null>(null);
  const [selected, setSelected] = useState<Record<Category, OverlayOption | null>>({
    colors: null,
    wheels: null,
    spoilers: null,
  });
  const [displayImage, setDisplayImage] = useState<string>(car?.image || "");
  const [fadeKey, setFadeKey] = useState(0);
  const [lastSelected, setLastSelected] = useState<OverlayOption | null>(null);

  useEffect(() => {
    if (car) {
      const data = getCarOptions(car.publicId);
      setOptions(data);
    }
  }, [car]);

  useEffect(() => {
    if (!options || !car) return;
    setSelected({ colors: null, wheels: null, spoilers: null });
    setDisplayImage(car.image);
  }, [options, car]);

  useEffect(() => {
    if (!car) return;
    const finalImage = lastSelected?.image || car.image;
    const img = new Image();
    img.src = finalImage;
    img.onload = () => {
      setDisplayImage(finalImage);
      setFadeKey((prev) => prev + 1);
    };
  }, [lastSelected, car]);

  const handleSelect = (category: Category, option: OverlayOption) => {
    setSelected((prev) => {
      const isSame = prev[category]?.name === option.name;
      const updated = { ...prev, [category]: isSame ? null : option };
      setLastSelected(isSame ? null : option);
      return updated;
    });
  };

  if (!car) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-10 text-center">
        <h1 className="text-2xl font-bold mb-4">Car not found</h1>
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg shadow-md transition"
          onClick={() => navigate("/models")}
        >
          Back to Models
        </button>
      </div>
    );
  }

  if (!options) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-10 text-center">
        <h1 className="text-2xl font-bold mb-4">No customization options found</h1>
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg shadow-md transition"
          onClick={() => navigate("/models")}
        >
          Back to Models
        </button>
      </div>
    );
  }

  const categories: Category[] = ["colors", "wheels", "spoilers"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 pt-20 font-sans">
      <div className="flex flex-col lg:flex-row p-8 gap-10 max-w-[1600px] mx-auto items-center justify-between">
        {/* Car Display Section */}
        <div className="flex-1 flex justify-center items-center w-full">
          <div className="relative w-full max-w-7xl bg-white/70 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.2)] overflow-hidden backdrop-blur-md">
            <img
              key={fadeKey}
              src={displayImage}
              alt={car.name}
              className="w-full h-[80vh] object-contain transition-transform duration-700 ease-in-out opacity-0 animate-fadeIn hover:scale-[1.03]"
              onLoad={(e) => {
                (e.currentTarget as HTMLImageElement).style.opacity = "1";
              }}
            />
          </div>
        </div>

        {/* Control Panel */}
        <div className="w-full lg:w-[32rem] bg-white/95 shadow-2xl border border-gray-100 p-8 rounded-3xl backdrop-blur-md lg:ml-auto">
          <h1 className="text-4xl font-extrabold mb-6 text-gray-800 border-b pb-3 tracking-tight">
            Customize <span className="text-indigo-600">{car.name}</span>
          </h1>

          {categories.map((category) => (
            <div key={category} className="mb-8">
              <h2 className="text-xl font-semibold mb-3 text-gray-700">
                Choose {category.charAt(0).toUpperCase() + category.slice(1)}
              </h2>
              <div className="flex gap-3 flex-wrap">
                {(options[category] || []).map((opt) => (
                  <Button
                    key={opt.name}
                    label={opt.name}
                    onClick={() => handleSelect(category, opt)}
                    variant={selected[category]?.name === opt.name ? "primary" : "outline"}
                  />
                ))}
              </div>
            </div>
          ))}

          <div className="mt-10 border-t pt-5">
            <p className="text-gray-500 text-sm">Selected:</p>
            <p className="font-semibold text-gray-800 text-lg mt-1">
              {Object.values(selected)
                .filter(Boolean)
                .map((item) => item!.name)
                .join(" · ") || "None"}
            </p>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={() => navigate("/cart", { state: { car, selected } })}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomCar;