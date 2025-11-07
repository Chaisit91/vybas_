import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import type { Car } from "../types/carall";
import {
  getCarOptions,
  findComboImage,
  type CarOptions,
  type OverlayOption,
} from "../services/carOptionsService";

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

  // โหลดข้อมูล + ฟัง Event จากหน้า Admin
  useEffect(() => {
    if (car) {
      const loaded = getCarOptions(car.publicId);
      setOptions(loaded);
    }

    const handleUpdate = () => {
      if (car) {
        console.log("🔁 carOptionsUpdated received! Reloading options...");
        const updated = getCarOptions(car.publicId);
        setOptions(updated);
      }
    };

    window.addEventListener("carOptionsUpdated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("carOptionsUpdated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [car, location.key]);

  useEffect(() => {
    if (!car) return;

    const selectedNames: Partial<Record<Category, string>> = {};
    for (const key in selected) {
      const opt = selected[key as Category];
      if (opt) selectedNames[key as Category] = opt.name;
    }

    // ✅ ถ้าไม่มีของแต่งเลย → กลับไปใช้รูป default ทันที
    const nothingSelected = !selected.colors && !selected.wheels && !selected.spoilers;

    let finalImage = car.image;
    if (!nothingSelected) {
      const comboImage = findComboImage(car.publicId, selectedNames);
      finalImage =
        comboImage ||
        selected.spoilers?.image ||
        selected.wheels?.image ||
        selected.colors?.image ||
        car.image;
    }

    const img = new Image();
    img.src = finalImage;
    img.onload = () => {
      setDisplayImage(finalImage);
      setFadeKey((prev) => prev + 1);
    };
  }, [selected, car]);


  const handleSelect = (category: Category, option: OverlayOption) => {
    setSelected((prev) => {
      const isSame = prev[category]?.name === option.name;
      return { ...prev, [category]: isSame ? null : option };
    });
  };

  if (!car)
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-10 text-center bg-black text-white">
        <h1 className="text-2xl font-bold mb-4">Car not found</h1>
        <button
          className="bg-[#0a1444] hover:bg-[#13235f] text-white px-6 py-3 rounded-lg shadow-[0_0_20px_rgba(10,20,68,0.6)] transition"
          onClick={() => navigate("/models")}
        >
          Back to Models
        </button>
      </div>
    );

  if (!options)
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-10 text-center bg-black text-white">
        <h1 className="text-2xl font-bold mb-4">Loading customization options...</h1>
        <button
          className="bg-[#0a1444] hover:bg-[#13235f] text-white px-6 py-3 rounded-lg shadow-[0_0_20px_rgba(10,20,68,0.6)] transition"
          onClick={() => navigate("/models")}
        >
          Back to Models
        </button>
      </div>
    );

  const categories: Category[] = ["colors", "wheels", "spoilers"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a0f1a] to-[#0b1330] text-white pt-24 font-sans">
      <div className="flex flex-col lg:flex-row p-8 gap-10 max-w-[1600px] mx-auto items-center justify-between">

        {/* Car Display */}
        <div className="flex-1 flex justify-center items-center w-full">
          <div className="relative w-full max-w-7xl bg-[#0a0f1a]/70 rounded-3xl border border-[#1e3a8a]/30 shadow-[0_0_40px_rgba(30,58,138,0.4)] overflow-hidden backdrop-blur-lg">
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
        <div className="w-full lg:w-[32rem] bg-[#0a0f1a]/90 border border-[#1e3a8a]/30 shadow-[0_0_30px_rgba(30,58,138,0.5)] p-8 rounded-3xl backdrop-blur-md lg:ml-auto">
          <h1 className="text-4xl font-extrabold mb-6 text-white border-b border-[#1e3a8a]/40 pb-3 tracking-tight">
            Customize <span className="text-[#00eaff]">{car.name}</span>
          </h1>

          {categories.map((category) => (
            <div key={category} className="mb-8">
              <h2 className="text-lg font-semibold mb-3 text-gray-300">
                Choose {category.charAt(0).toUpperCase() + category.slice(1)}
              </h2>
              <div className="flex gap-3 flex-wrap">
                {(options[category] as OverlayOption[]).map((opt) => (
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

          <div className="mt-10 border-t border-[#1e3a8a]/30 pt-5">
            <p className="text-gray-400 text-sm">Selected:</p>
            <p className="font-semibold text-white text-lg mt-1">
              {Object.values(selected)
                .filter(Boolean)
                .map((item) => item!.name)
                .join(" · ") || "None"}
            </p>
          </div>

          <div className="mt-8 flex justify-between items-center">
            <button
              onClick={() => {
                if (car) setOptions(getCarOptions(car.publicId));
              }}
              className="px-5 py-2 bg-[#111827] hover:bg-[#1e293b] text-gray-200 font-semibold rounded-lg transition border border-[#1e3a8a]/30"
            >
              🔄 โหลดของแต่งใหม่
            </button>

            <button
              onClick={() => navigate("/cart", { state: { car, selected } })}
              className="px-8 py-3 bg-[#0a1444] hover:bg-[#13235f] text-white font-semibold rounded-xl shadow-[0_0_25px_rgba(10,20,68,0.6)] transition-all duration-300 transform hover:-translate-y-0.5"
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
