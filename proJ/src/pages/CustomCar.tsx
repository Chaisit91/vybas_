import { useState } from "react";
import { useLocation } from "react-router-dom";
import type { Car } from "../types/Car";
import Button from "../components/Button";

interface OverlayOption {
  name: string;
  publicId: string;
}

const CustomCar = () => {
  const location = useLocation();
  const car: Car = location.state?.car;

  if (!car) return <div className="p-10 text-center">Car not found</div>;

  // 🎨 ตัวเลือกเหมือนกันทุกคัน
  const colors: OverlayOption[] = [
    { name: "Red", publicId: `${car.publicId}-color-red` },
    { name: "Blue", publicId: `${car.publicId}-color-blue` },
    { name: "Black", publicId: `${car.publicId}-color-black` },
  ];

  const wheels: OverlayOption[] = [
    { name: "Standard", publicId: `${car.publicId}-wheel-standard` },
    { name: "Sport", publicId: `${car.publicId}-wheel-sport` },
  ];

  const exhausts: OverlayOption[] = [
    { name: "Standard", publicId: `${car.publicId}-exhaust-standard` },
    { name: "Performance", publicId: `${car.publicId}-exhaust-performance` },
  ];

  const windows: OverlayOption[] = [
    { name: "Tinted", publicId: `${car.publicId}-window-tinted` },
    { name: "Clear", publicId: `${car.publicId}-window-clear` },
  ];

  const spoilers: OverlayOption[] = [
    { name: "None", publicId: "" },
    { name: "Sport", publicId: `${car.publicId}-spoiler-sport` },
    { name: "GT", publicId: `${car.publicId}-spoiler-gt` },
  ];

  // ✅ state สำหรับคันนี้โดยเฉพาะ
  const [selectedColor, setSelectedColor] = useState<OverlayOption | null>(null);
  const [selectedWheel, setSelectedWheel] = useState<OverlayOption | null>(null);
  const [selectedExhaust, setSelectedExhaust] = useState<OverlayOption | null>(null);
  const [selectedWindow, setSelectedWindow] = useState<OverlayOption | null>(null);
  const [selectedSpoiler, setSelectedSpoiler] = useState<OverlayOption | null>(null);

  // ✅ รวม overlay ที่เลือก
  const overlayParts = [
    selectedColor?.publicId,
    selectedWheel?.publicId,
    selectedExhaust?.publicId,
    selectedWindow?.publicId,
    selectedSpoiler?.publicId,
  ].filter(Boolean);

  // ✅ สร้าง URL ภาพ Cloudinary สำหรับคันนั้น
  const finalImageUrl =
    overlayParts.length > 0
      ? `https://res.cloudinary.com/dlp0q39ua/image/upload/${overlayParts
          .map((id) => `l_${id}`)
          .join(",")}/${car.publicId}.png`
      : car.image;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="flex flex-col md:flex-row p-6">
        {/* 🔹 รูปรถ */}
        <div className="flex-1 flex justify-center items-center">
          <img
            src={finalImageUrl}
            alt={car.name}
            className="w-[80vw] md:w-[40vw] rounded-xl shadow-lg transition-all duration-500"
          />
        </div>

        {/* 🔹 ตัวเลือกแต่ง */}
        <div className="w-full md:w-[35%] bg-white shadow-md p-6 rounded-t-2xl md:rounded-none md:rounded-l-2xl">
          <h1 className="text-2xl font-bold mb-6">Customize {car.name}</h1>

          {/* Choose Color */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Choose Color</h2>
            <div className="flex gap-3 flex-wrap">
              {colors.map((c) => (
                <Button
                  key={c.name}
                  label={c.name}
                  onClick={() =>
                    setSelectedColor(selectedColor?.name === c.name ? null : c)
                  }
                  variant={selectedColor?.name === c.name ? "primary" : "outline"}
                />
              ))}
            </div>
          </div>

          {/* Choose Wheels */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Choose Wheels</h2>
            <div className="flex gap-3 flex-wrap">
              {wheels.map((w) => (
                <Button
                  key={w.name}
                  label={w.name}
                  onClick={() =>
                    setSelectedWheel(selectedWheel?.name === w.name ? null : w)
                  }
                  variant={selectedWheel?.name === w.name ? "primary" : "outline"}
                />
              ))}
            </div>
          </div>

          {/* Choose Exhaust */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Choose Exhaust</h2>
            <div className="flex gap-3 flex-wrap">
              {exhausts.map((e) => (
                <Button
                  key={e.name}
                  label={e.name}
                  onClick={() =>
                    setSelectedExhaust(selectedExhaust?.name === e.name ? null : e)
                  }
                  variant={selectedExhaust?.name === e.name ? "primary" : "outline"}
                />
              ))}
            </div>
          </div>

          {/* Choose Windows */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Choose Windows</h2>
            <div className="flex gap-3 flex-wrap">
              {windows.map((w) => (
                <Button
                  key={w.name}
                  label={w.name}
                  onClick={() =>
                    setSelectedWindow(selectedWindow?.name === w.name ? null : w)
                  }
                  variant={selectedWindow?.name === w.name ? "primary" : "outline"}
                />
              ))}
            </div>
          </div>

          {/* Choose Spoiler */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Choose Spoiler</h2>
            <div className="flex gap-3 flex-wrap">
              {spoilers.map((s) => (
                <Button
                  key={s.name}
                  label={s.name}
                  onClick={() =>
                    setSelectedSpoiler(selectedSpoiler?.name === s.name ? null : s)
                  }
                  variant={selectedSpoiler?.name === s.name ? "primary" : "outline"}
                />
              ))}
            </div>
          </div>

          {/* Selected Summary */}
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
