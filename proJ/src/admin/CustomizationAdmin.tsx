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

    // แสดง preview ทันที
    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);

    setIsUploading(true);
    try {
      const url = await uploadImageToCloudinary(file);
      if (url) {
        setImageUrl(url);
      } else {
        setImageUrl("");
        alert("❌ อัปโหลดรูปไม่สำเร็จ — โปรดตรวจสอบการตั้งค่า Cloudinary และเครือข่าย");
        console.error("Cloudinary returned no URL");
      }
    } catch (err) {
      setImageUrl("");
      console.error("Upload error:", err);
      alert("❌ เกิดข้อผิดพลาดตอนอัปโหลดรูป");
    } finally {
      setIsUploading(false);
      // ปลด URL.createObjectURL หลังใช้ (optional)
      // URL.revokeObjectURL(localUrl); // ถ้าจะ revoke ให้แน่ใจว่าไม่ได้ใช้งาน preview ต่อ
    }
  };

  const handleAdd = () => {
    // Trim เพื่อตรวจ whitespace-only
    if (!carId.trim()) {
      alert("⚠️ กรุณากรอก Car publicId");
      return;
    }
    if (!optionName.trim()) {
      alert("⚠️ กรุณากรอกชื่อของแต่ง");
      return;
    }
    if (isUploading) {
      alert("⏳ รอการอัปโหลดรูปให้เสร็จก่อน");
      return;
    }
    if (!imageUrl) {
      alert("⚠️ ยังไม่มีรูปของแต่ง (อัปโหลดไม่เสร็จหรือไม่สำเร็จ)");
      return;
    }

    addOptionToCar(carId.trim(), category, {
      name: optionName.trim(),
      image: imageUrl,
    });

    // เพื่อให้แท็บอื่น ๆ (CustomCar) รีโหลดอัตโนมัติ
    localStorage.setItem("lastOptionAdded", `${carId.trim()}-${Date.now()}`);

    alert(`✅ เพิ่ม "${optionName}" ให้รถ "${carId}" สำเร็จ`);
    setOptionName("");
    setImageUrl("");
    setPreviewUrl(null);
  };

  const canSubmit =
    !!carId.trim() && !!optionName.trim() && !!imageUrl && !isUploading;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 py-10 px-4 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-900">
        🚗 เพิ่มของแต่งให้รถ
      </h1>

      <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            placeholder="Car publicId (เช่น temerario)"
            value={carId}
            onChange={(e) => setCarId(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value as "colors" | "wheels" | "spoilers")
            }
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            <option value="colors">Colors</option>
            <option value="wheels">Wheels</option>
            <option value="spoilers">Spoilers</option>
          </select>

          <input
            placeholder="ชื่อของแต่ง (เช่น Red Matte)"
            value={optionName}
            onChange={(e) => setOptionName(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 md:col-span-2"
          />
        </div>

        <div className="border border-gray-300 rounded-xl bg-gray-50 p-4 mb-5">
          <p className="text-sm text-gray-600 mb-2 font-medium">📸 Upload รูปของแต่ง:</p>
          <input
            accept="image/*"
            type="file"
            onChange={handleUpload}
            className="block w-full text-sm text-gray-700 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />

          {/* สถานะการอัปโหลด / preview */}
          <div className="mt-3">
            {isUploading && (
              <p className="text-sm text-yellow-600">⏳ กำลังอัปโหลดรูป...</p>
            )}
            {!isUploading && imageUrl && (
              <p className="text-sm text-green-600">✅ อัปโหลดสำเร็จ</p>
            )}
            {!isUploading && !imageUrl && previewUrl && (
              <p className="text-sm text-gray-600">⚠️ ยังไม่ได้อัปโหลดขึ้น Cloudinary</p>
            )}
            {previewUrl && (
              <div className="mt-3">
                <img
                  src={previewUrl}
                  alt="preview"
                  className="max-w-xs max-h-48 rounded-md shadow-sm"
                />
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleAdd}
          disabled={!canSubmit}
          className={`w-full px-6 py-3 rounded-xl font-semibold shadow-md transition-all duration-300 ${
            canSubmit
              ? "bg-indigo-600 hover:bg-indigo-700 text-white"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          เพิ่มของแต่ง
        </button>
      </div>
    </div>
  );
}
