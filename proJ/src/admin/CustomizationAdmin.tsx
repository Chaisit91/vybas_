import { useState } from "react";
import { addOptionToCar } from "../services/carOptionsService";
import { uploadImageToCloudinary } from "../services/cloudinary";

export default function CustomizationAdmin() {
  const [carId, setCarId] = useState("");
  const [category, setCategory] = useState<"colors" | "wheels" | "spoilers">("colors");
  const [optionName, setOptionName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = await uploadImageToCloudinary(file);
      if (url) setImageUrl(url);
    }
  };

  const handleAdd = () => {
    if (!carId || !optionName || !imageUrl)
      return alert("⚠️ กรุณากรอกข้อมูลให้ครบ");

    addOptionToCar(carId, category, { name: optionName, image: imageUrl });
    alert(`✅ เพิ่ม "${optionName}" ให้รถ ${carId} สำเร็จ`);

    setOptionName("");
    setImageUrl("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 py-10">
      <div className="p-8 max-w-2xl mx-auto bg-white/80 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] backdrop-blur-md">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800 border-b pb-4 tracking-tight">
          เพิ่มของแต่งให้รถ
        </h1>

        {/* Input Fields */}
        <input
          placeholder="Car publicId (เช่น temerario)"
          value={carId}
          onChange={(e) => setCarId(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg mb-4 block w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value as "colors" | "wheels" | "spoilers")
          }
          className="border border-gray-300 p-3 rounded-lg mb-4 block w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm bg-white"
        >
          <option value="colors">Color</option>
          <option value="wheels">Wheels</option>
          <option value="spoilers">Spoilers</option>
        </select>

        <input
          placeholder="ชื่อของแต่ง (เช่น Red Matte)"
          value={optionName}
          onChange={(e) => setOptionName(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg mb-4 block w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
        />

        {/* Upload */}
        <div className="border border-gray-300 rounded-xl bg-gray-50 p-4 mb-5">
          <p className="text-sm text-gray-600 mb-2 font-medium">📸 อัปโหลดภาพของแต่ง:</p>
          <input
            type="file"
            onChange={handleUpload}
            className="block w-full text-sm text-gray-700 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>

        {/* ✅ พรีวิวภาพของแต่ง */}
        {imageUrl && (
          <div className="my-6 border rounded-2xl bg-gray-100 shadow-inner overflow-hidden">
            <p className="text-sm text-gray-600 p-3 text-center font-medium bg-white/60 border-b">
              พรีวิวของแต่ง
            </p>
            <div className="bg-white rounded-b-2xl">
              <img
                src={imageUrl}
                alt="preview"
                className="w-full h-[60vh] object-contain mx-auto transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        )}

        {/* Button */}
        <button
          onClick={handleAdd}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 w-full"
        >
          เพิ่มของแต่ง
        </button>
      </div>
    </div>
  );
}
