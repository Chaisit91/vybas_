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

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadImageToCloudinary(file);
    if (url) setImageUrl(url);
    else alert("❌ อัปโหลดรูปไม่สำเร็จ");
  };

  const handleAdd = () => {
    if (!carId || !optionName || !imageUrl) {
      alert("⚠️ กรุณากรอกข้อมูลให้ครบ");
      return;
    }
    addOptionToCar(carId, category, { name: optionName, image: imageUrl });
    alert(`✅ เพิ่ม "${optionName}" สำเร็จ`);
    setOptionName("");
    setImageUrl("");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-900">
        เพิ่มของแต่งให้รถ
      </h1>

      <div className="bg-white rounded-3xl shadow-lg p-10 w-full max-w-5xl">
        {/* Input section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            placeholder="Car publicId (เช่น temerario)"
            value={carId}
            onChange={(e) => setCarId(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-500"
          />
          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value as "colors" | "wheels" | "spoilers")
            }
            className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            <option value="colors">Color</option>
            <option value="wheels">Wheels</option>
            <option value="spoilers">Spoilers</option>
          </select>

          <input
            placeholder="ชื่อของแต่ง (เช่น Red Matte)"
            value={optionName}
            onChange={(e) => setOptionName(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 md:col-span-2"
          />
        </div>

        {/* Upload Section */}
        <div className="border border-gray-300 rounded-xl bg-gray-50 p-4 mb-5">
          <p className="text-sm text-gray-600 mb-2 font-medium">
            📸 อัปโหลดภาพของแต่ง:
          </p>
          <input
            type="file"
            onChange={handleUpload}
            className="block w-full text-sm text-gray-700 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleAdd}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-xl transition-all duration-300 w-full"
        >
          เพิ่มของแต่ง
        </button>

        {/* Preview section */}
        {imageUrl && (
          <div className="mt-10 text-center">
            <h2 className="text-lg font-bold text-gray-700 mb-4">
              พรีวิวของแต่ง
            </h2>
            <div className="bg-gray-100 rounded-2xl shadow-inner flex justify-center p-6">
              <img
                src={imageUrl}
                alt="preview"
                className="max-w-full h-auto object-contain rounded-lg shadow-lg"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
