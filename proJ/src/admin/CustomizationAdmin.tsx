// src/pages/CustomizationAdmin.tsx
import { useState } from "react";
import { uploadImageToCloudinary } from "../services/cloudinary";
import { addOptionToCar } from "../services/carOptionsService";

export default function CustomizationAdmin() {
  const [carId, setCarId] = useState("");
  const [category, setCategory] = useState<"colors" | "wheels" | "spoilers">(
    "colors"
  );
  const [optionName, setOptionName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);

    setIsUploading(true);
    try {
      const url = await uploadImageToCloudinary(file);
      if (url) {
        setImageUrl(url);
      } else {
        setImageUrl("");
        alert("❌ Upload ล้มเหลว — ตรวจการตั้งค่า Cloudinary");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("❌ เกิดข้อผิดพลาดในการอัปโหลดรูป");
    } finally {
      setIsUploading(false);
    }
  };

  const handleAdd = () => {
    if (!carId.trim()) {
      alert("⚠️ กรุณากรอก Car publicId");
      return;
    }
    if (!optionName.trim()) {
      alert("⚠️ กรุณากรอกชื่อของแต่ง");
      return;
    }
    if (isUploading) {
      alert("⏳ โปรดรอให้อัปโหลดรูปเสร็จก่อน");
      return;
    }
    if (!imageUrl) {
      alert("⚠️ ยังไม่มีรูปของแต่ง");
      return;
    }

    addOptionToCar(carId.trim(), category, {
      name: optionName.trim(),
      image: imageUrl,
    });

    localStorage.setItem("lastOptionAdded", `${carId.trim()}-${Date.now()}`);
    alert(`✅ เพิ่ม "${optionName}" ให้รถ "${carId}" สำเร็จ`);
    setOptionName("");
    setImageUrl("");
    setPreviewUrl(null);
  };

  const canSubmit =
    !!carId.trim() && !!optionName.trim() && !!imageUrl && !isUploading;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-gray-900 text-white py-16 px-4 flex flex-col items-center">
      <h1 className="text-5xl font-extrabold text-center mb-12 tracking-wide text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]">
        ⚙️ Customization Admin
      </h1>

      <div className="bg-neutral-900/80 border border-neutral-700 rounded-3xl shadow-2xl p-8 w-full max-w-4xl backdrop-blur-sm">
        {/* ฟอร์มกรอกข้อมูล */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            placeholder="Car publicId (เช่น temerario)"
            value={carId}
            onChange={(e) => setCarId(e.target.value)}
            className="p-3 rounded-lg bg-neutral-950 border border-neutral-700 text-white focus:ring-2 focus:ring-gray-400"
          />
          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value as "colors" | "wheels" | "spoilers")
            }
            className="p-3 rounded-lg bg-neutral-950 border border-neutral-700 text-white focus:ring-2 focus:ring-gray-400"
          >
            <option value="colors">Colors</option>
            <option value="wheels">Wheels</option>
            <option value="spoilers">Spoilers</option>
          </select>
          <input
            placeholder="ชื่อของแต่ง (เช่น Matte Black)"
            value={optionName}
            onChange={(e) => setOptionName(e.target.value)}
            className="md:col-span-2 p-3 rounded-lg bg-neutral-950 border border-neutral-700 text-white focus:ring-2 focus:ring-gray-400"
          />
        </div>

        {/* Upload Section */}
        <div className="border border-neutral-700 rounded-xl bg-neutral-950/70 p-5 mb-6">
          <p className="text-sm text-gray-400 mb-3 font-medium">
            📸 Upload รูปของแต่ง:
          </p>
          <input
            accept="image/*"
            type="file"
            onChange={handleUpload}
            className="block w-full text-sm text-gray-200 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 transition"
          />

          <div className="mt-4">
            {isUploading && (
              <p className="text-sm text-gray-400">⏳ กำลังอัปโหลด...</p>
            )}
            {!isUploading && imageUrl && (
              <p className="text-sm text-gray-300">✅ อัปโหลดสำเร็จ</p>
            )}
            {previewUrl && (
              <div className="mt-3">
                <img
                  src={previewUrl}
                  alt="preview"
                  className="max-w-xs max-h-48 rounded-lg border border-neutral-700 shadow-md"
                />
              </div>
            )}
          </div>
        </div>

        {/* ปุ่มเพิ่ม */}
        <button
          onClick={handleAdd}
          disabled={!canSubmit}
          className={`w-full px-8 py-4 rounded-xl font-bold tracking-wider transition-all duration-300 shadow-lg ${
            canSubmit
              ? "bg-white text-black hover:bg-gray-200"
              : "bg-neutral-700 text-gray-500 cursor-not-allowed"
          }`}
        >
          ➕ เพิ่มของแต่ง
        </button>
      </div>
    </div>
  );
}
