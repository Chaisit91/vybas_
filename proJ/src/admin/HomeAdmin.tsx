// src/admin/HomeAdmin.tsx
import { useEffect, useState } from "react";
import { uploadImageToCloudinary } from "../services/cloudinary"; // ✅ ใช้บริการอัปโหลด

interface HomeContent {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  background: string;
}

const STORAGE_KEY = "home_content";

export default function HomeAdmin() {
  const [content, setContent] = useState<HomeContent>({
    title: "",
    subtitle: "",
    buttonText: "",
    buttonLink: "",
    background: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setContent(JSON.parse(saved));
    }
  }, []);

  const handleChange = (key: keyof HomeContent, value: string) => {
    setContent((prev) => ({ ...prev, [key]: value }));
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadImageToCloudinary(file);
    if (url) {
      setContent((prev) => ({ ...prev, background: url }));
      alert("✅ อัปโหลดพื้นหลังสำเร็จ!");
    } else {
      alert("❌ Upload failed");
    }
  };

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    alert("✅ บันทึกข้อมูลหน้า Home แล้ว!");
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">🏠 แก้ไขหน้า Home</h1>

      <div className="grid gap-4 max-w-xl">
        {/* ===== ฟิลด์เนื้อหา ===== */}
        <div>
          <label className="block font-semibold mb-1">หัวข้อหลัก (Title)</label>
          <input
            type="text"
            value={content.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">คำอธิบาย (Subtitle)</label>
          <textarea
            value={content.subtitle}
            onChange={(e) => handleChange("subtitle", e.target.value)}
            className="border p-2 rounded w-full h-24"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">ข้อความบนปุ่ม (Button Text)</label>
          <input
            type="text"
            value={content.buttonText}
            onChange={(e) => handleChange("buttonText", e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">ลิงก์ของปุ่ม (Button Link)</label>
          <input
            type="text"
            value={content.buttonLink}
            onChange={(e) => handleChange("buttonLink", e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* ===== แก้ไขภาพพื้นหลัง ===== */}
        <div>
          <label className="block font-semibold mb-1">พื้นหลัง (Background URL)</label>
          <input
            type="text"
            value={content.background}
            onChange={(e) => handleChange("background", e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />
          <input
            type="file"
            onChange={handleUpload}
            className="block w-full text-sm text-gray-700 file:mr-3 file:py-2 file:px-4 file:rounded-lg 
                       file:border-0 file:font-semibold file:bg-yellow-50 file:text-yellow-700 
                       hover:file:bg-yellow-100"
          />
          {content.background && (
            <img
              src={content.background}
              alt="background preview"
              className="mt-3 rounded-lg shadow-md"
            />
          )}
        </div>

        <button
          onClick={handleSave}
          className="bg-yellow-500 text-black px-6 py-2 rounded font-semibold hover:bg-yellow-600 transition"
        >
          💾 บันทึก
        </button>
      </div>

      {/* ===== PREVIEW ===== */}
      <div className="mt-10 border-t pt-6">
        <h2 className="text-2xl font-semibold mb-4">🔍 ตัวอย่างหน้า Home (Live Preview)</h2>
        <div
          className="rounded-2xl overflow-hidden shadow-xl min-h-[400px] flex flex-col justify-center items-center text-center text-white bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${content.background})` }}
        >
          <div className="bg-black/50 p-6 rounded-xl">
            <h1 className="text-4xl font-bold mb-4">{content.title}</h1>
            <p className="text-gray-200 mb-6">{content.subtitle}</p>
            <button className="bg-yellow-500 text-black px-4 py-2 rounded font-semibold">
              {content.buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
