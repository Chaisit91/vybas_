import { useState } from "react";
import { uploadImageToCloudinary } from "../services/cloudinary";
import { addOptionToCar, deleteOptionFromCar } from "../services/carOptionsService";

export default function CustomizationAdmin() {
  const [carId, setCarId] = useState("");
  const [category, setCategory] = useState<"colors" | "wheels" | "spoilers">("colors");
  const [optionName, setOptionName] = useState("");
  const [image, setImage] = useState<string | null>(null);

  // ✅ อัปโหลดภาพขึ้น Cloudinary
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadImageToCloudinary(file);
    if (url) setImage(url);
  };

  // ✅ เพิ่มของแต่งใหม่
  const handleAdd = () => {
    if (!carId || !optionName || !image) {
      alert("⚠️ กรุณากรอกข้อมูลให้ครบก่อนเพิ่ม");
      return;
    }

    addOptionToCar(carId, category, { name: optionName, image });
    alert(`✅ เพิ่ม ${category} '${optionName}' ให้รถ ${carId} สำเร็จ!`);

    window.dispatchEvent(new Event("carOptionsUpdated"));

    setOptionName("");
    setImage(null);
  };

  // ✅ ลบของแต่งเฉพาะอัน
  const handleDeleteOption = () => {
    if (!carId || !optionName) {
      alert("⚠️ กรุณากรอกรหัสรถและชื่อของแต่งที่ต้องการลบ");
      return;
    }

    if (!confirm(`แน่ใจหรือไม่ว่าต้องการลบ "${optionName}" จากหมวด ${category}?`)) return;

    deleteOptionFromCar(carId, category, optionName);
    window.dispatchEvent(new Event("carOptionsUpdated"));
    alert(`🗑️ ลบของแต่ง '${optionName}' ออกจาก ${category} ของรถ ${carId} แล้ว`);

    setOptionName("");
    setImage(null);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10">
      <div className="bg-[#0a0f1a] border border-[#1e3a8a]/40 rounded-3xl p-10 shadow-[0_0_40px_rgba(30,58,138,0.4)] w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-8 text-center text-[#00eaff]">
          🧩 จัดการของแต่งรถ
        </h1>

        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-gray-300">Car ID:</label>
            <input
              type="text"
              value={carId}
              onChange={(e) => setCarId(e.target.value)}
              className="w-full bg-[#111827] border border-[#1e3a8a]/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00eaff]"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-300">Category:</label>
            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as "colors" | "wheels" | "spoilers")
              }
              className="w-full bg-[#111827] border border-[#1e3a8a]/30 rounded-lg px-4 py-2"
            >
              <option value="colors">Colors</option>
              <option value="wheels">Wheels</option>
              <option value="spoilers">Spoilers</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-gray-300">Option Name:</label>
            <input
              type="text"
              value={optionName}
              onChange={(e) => setOptionName(e.target.value)}
              className="w-full bg-[#111827] border border-[#1e3a8a]/30 rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-300">Upload Image:</label>
            <input type="file" onChange={handleUpload} className="w-full" />
            {image && (
              <img
                src={image}
                alt="preview"
                className="w-full h-60 object-contain mt-4 rounded-xl border border-[#1e3a8a]/30"
              />
            )}
          </div>

          <div className="flex justify-between pt-6 border-t border-[#1e3a8a]/30">
            <button
              onClick={handleAdd}
              className="px-6 py-3 bg-[#0a1444] hover:bg-[#13235f] rounded-lg font-semibold shadow-[0_0_25px_rgba(10,20,68,0.6)] transition"
            >
              ➕ เพิ่มของแต่ง
            </button>

            <button
              onClick={handleDeleteOption}
              className="px-6 py-3 bg-red-700 hover:bg-red-800 rounded-lg font-semibold transition"
            >
              🗑️ ลบของแต่งนี้
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
