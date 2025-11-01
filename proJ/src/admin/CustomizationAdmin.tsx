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
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">เพิ่มของแต่งให้รถ</h1>

      <input
        placeholder="Car publicId (เช่น temerario)"
        value={carId}
        onChange={(e) => setCarId(e.target.value)}
        className="border p-2 rounded mb-3 block w-full"
      />

      <select
        value={category}
        onChange={(e) =>
          setCategory(e.target.value as "colors" | "wheels" | "spoilers")
        }
        className="border p-2 rounded mb-3 block w-full"
      >
        <option value="colors">Color</option>
        <option value="wheels">Wheels</option>
        <option value="spoilers">Spoilers</option>
      </select>

      <input
        placeholder="ชื่อของแต่ง (เช่น Red Matte)"
        value={optionName}
        onChange={(e) => setOptionName(e.target.value)}
        className="border p-2 rounded mb-3 block w-full"
      />

      <input type="file" onChange={handleUpload} className="mb-3" />

      {imageUrl && (
        <img
          src={imageUrl}
          alt="preview"
          className="w-32 my-2 rounded shadow-md border"
        />
      )}

      <button
        onClick={handleAdd}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full transition"
      >
        เพิ่มของแต่ง
      </button>
    </div>
  );
}
