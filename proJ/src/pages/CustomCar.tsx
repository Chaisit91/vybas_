import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import type { Car } from "../types/Car";
import { loadCarOptions } from "../services/carStorage"; // ✅ โหลด carOptions จาก localStorage

// ประเภทของ overlay
interface OverlayOption {
  name: string;
  image: string;
}

// ประเภทหมวดของการแต่ง
type Category = "colors" | "wheels" | "spoilers";

// ประเภทข้อมูลรถแต่ละคัน
interface CarOptions {
  colors: OverlayOption[];
  wheels: OverlayOption[];
  spoilers: OverlayOption[];
  combos: { selected: Record<Category, string>; image: string }[];
}

const CustomCar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const car: Car | undefined = location.state?.car;

  // ✅ โหลด carOptions จาก localStorage (หรือจาก default ถ้าไม่มี)
  const optionsData = loadCarOptions();
  const options: CarOptions | undefined = car ? optionsData[car.publicId] : undefined;

  const [selected, setSelected] = useState<Record<Category, OverlayOption | null>>({
    colors: null,
    wheels: null,
    spoilers: null,
  });

  const [displayImage, setDisplayImage] = useState<string>(car?.image || "");
  const [fadeKey, setFadeKey] = useState(0);
  const [lastSelected, setLastSelected] = useState<OverlayOption | null>(null);

  // ✅ เมื่อ options เปลี่ยน (เช่น เปลี่ยนรถ)
  useEffect(() => {
    if (!options) return;
    setSelected({
      colors: null,
      wheels: null,
      spoilers: null,
    });
    setDisplayImage(car?.image || "");
  }, [options, car]);

  // ✅ เมื่อเลือกแต่งใหม่ → อัปเดตรูป
  useEffect(() => {
    if (!car) return;
    const finalImage: string = lastSelected?.image || car.image || "";
    const img = new Image();
    img.src = finalImage;
    img.onload = () => {
      setDisplayImage(finalImage);
      setFadeKey((prev) => prev + 1);
    };
  }, [lastSelected, car]);

  // ✅ ฟังก์ชันเลือกตัวเลือกแต่ง
  const handleSelect = (category: Category, option: OverlayOption) => {
    setSelected((prev) => {
      const isSame = prev[category]?.name === option.name;
      const updated = { ...prev, [category]: isSame ? null : option };
      setLastSelected(isSame ? null : option);
      return updated;
    });
  };

  // ✅ กรณีไม่เจอรถ
  if (!car) {
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
  }

  // ✅ กรณีไม่มีตัวเลือกการแต่ง (เพิ่งเพิ่มจากหน้า admin)
  if (!options) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-10 text-center">
        <h1 className="text-2xl font-bold mb-4">No customization options found</h1>
        <p className="text-gray-600 mb-6">
          รถคันนี้ยังไม่มีตัวเลือกการแต่งในระบบ admin
        </p>
        <button
          className="bg-yellow-500 text-black px-6 py-3 rounded"
          onClick={() => navigate("/models")}
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
        {/* รูปรถ */}
        <div className="flex-1 flex justify-center items-center">
          <div className="relative w-[80vw] md:w-[40vw] mx-auto">
            <img
              key={fadeKey}
              src={displayImage}
              alt={car.name}
              className="w-full rounded-xl shadow-lg transition-opacity duration-700 opacity-0 animate-fadeIn"
              onLoad={(e) => {
                (e.currentTarget as HTMLImageElement).style.opacity = "1";
              }}
            />
          </div>
        </div>

        {/* ตัวเลือกการแต่ง */}
        <div className="w-full md:w-[35%] bg-white shadow-md p-6 rounded-t-2xl md:rounded-none md:rounded-l-2xl">
          <h1 className="text-2xl font-bold mb-6">Customize {car.name}</h1>

          {categories.map((category) => (
            <div key={category} className="mb-8">
              <h2 className="text-lg font-semibold mb-3">
                Choose {category.charAt(0).toUpperCase() + category.slice(1)}
              </h2>
              <div className="flex gap-3 flex-wrap">
                {(options[category] as OverlayOption[]).length > 0 ? (
                  options[category].map((opt: OverlayOption) => (
                    <Button
                      key={opt.name}
                      label={opt.name}
                      onClick={() => handleSelect(category, opt)}
                      variant={selected[category]?.name === opt.name ? "primary" : "outline"}
                    />
                  ))
                ) : (
                  <p className="text-sm text-gray-400">No {category} options available</p>
                )}
              </div>
            </div>
          ))}

          {/* แสดงผลการเลือก */}
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
