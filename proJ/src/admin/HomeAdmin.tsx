import { useEffect, useState } from "react";
import { uploadImageToCloudinary } from "../services/cloudinary";

// กำหนดรูปแบบข้อมูลสำหรับหน้า Home Page
interface HomeContent {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  background: string;
}

// คีย์ที่ใช้เก็บข้อมูลใน LocalStorage
const STORAGE_KEY = "home_content";

export default function HomeAdmin() {

  // state หลักที่เก็บข้อมูลของหน้า Home
  const [content, setContent] = useState<HomeContent>({
    title: "",
    subtitle: "",
    buttonText: "",
    buttonLink: "/models", // default เปิดหน้า models
    background: "",
  });

  // โหลดข้อมูลจาก localStorage ตอนเปิดหน้า admin
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setContent(JSON.parse(saved)); // มีข้อมูลเก่า → โหลดมาใช้
  }, []);

  // ฟังก์ชันเปลี่ยนค่าใน content แบบ Dynamic (ระบุ field ได้)
  const handleChange = (field: keyof HomeContent, value: string) => {
    setContent((prev) => ({ ...prev, [field]: value }));
  };

  // อัปโหลดภาพพื้นหลังขึ้น Cloudinary
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // ดึงไฟล์แรก
    if (!file) return;

    const url = await uploadImageToCloudinary(file); // ส่งไฟล์ไป cloudinary

    if (url) {
      // อัปเดต state ด้วย URL ใหม่
      setContent((prev) => ({ ...prev, background: url }));
      alert("✅ Background updated successfully!");
    } else {
      alert("Upload failed.");
    }
  };

  // บันทึกข้อมูลลง localStorage
  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    alert("Home content saved successfully!");
  };

  // รีเซ็ตข้อมูลให้กลับค่าเริ่มต้น
  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload(); // refresh เพื่อกลับค่าดั้งเดิม
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 pt-28 pb-10 px-4 flex flex-col items-center text-gray-100">

      {/* Title ของหน้า Admin */}
      <h1 className="text-5xl font-extrabold mb-12 text-white tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.25)] uppercase">
        🏠 HOME PAGE CONTROL PANEL
      </h1>

      {/* กล่องล้อมฟอร์ม */}
      <div className="bg-[#111111] border border-gray-800 rounded-3xl shadow-[0_0_40px_rgba(255,255,255,0.05)] p-10 w-full max-w-4xl space-y-6 backdrop-blur-sm">

        {/* Title Field */}
        <div>
          <label className="font-semibold block mb-2 text-gray-300 tracking-wide uppercase">
            Title
          </label>
          <input
            value={content.title}
            onChange={(e) => handleChange("title", e.target.value)} // เปลี่ยน title
            className="bg-[#1A1A1A] border border-gray-700 w-full p-3 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
            placeholder="Enter title"/>
        </div>

        {/* Subtitle Field */}
        <div>
          <label className="font-semibold block mb-2 text-gray-300 tracking-wide uppercase">
            Subtitle
          </label>
          <textarea
            value={content.subtitle}
            onChange={(e) => handleChange("subtitle", e.target.value)} // เปลี่ยน subtitle
            className="bg-[#1A1A1A] border border-gray-700 w-full p-3 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
            placeholder="Enter subtitle"/>
        </div>

        {/* Button Text Field */}
        <div>
          <label className="font-semibold block mb-2 text-gray-300 tracking-wide uppercase">
            Button Text
          </label>
          <input
            value={content.buttonText}
            onChange={(e) => handleChange("buttonText", e.target.value)} // เปลี่ยน button text
            className="bg-[#1A1A1A] border border-gray-700 w-full p-3 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
            placeholder="Enter button text"/>
        </div>

        {/* Background Image Upload */}
        <div>
          <label className="font-semibold block mb-2 text-gray-300 tracking-wide uppercase">
            Background Image
          </label>

          {/* Preview ภาพที่เลือกไว้แล้ว */}
          {content.background && (
            <div className="relative group">
              <img
                src={content.background}
                alt="Preview"
                className="w-full h-64 object-cover rounded-xl mb-3 border border-gray-700/50 shadow-[0_0_25px_rgba(255,255,255,0.08)] group-hover:scale-[1.02] transition-all"/>
            </div>
          )}

          {/* Input สำหรับอัปโหลดภาพ */}
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload} // เรียกอัปโหลดรูป
            className="block w-full text-sm text-gray-300 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:font-semibold file:bg-gray-800 file:text-gray-300 hover:file:bg-gray-700 transition-all cursor-pointer"/>
        </div>

        {/* ปุ่ม Save + Reset */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={handleSave} // บันทึกข้อมูล
            className="bg-blue-950 hover:bg-blue-800 text-white px-6 py-3 rounded-xl font-semibold shadow-[0_0_25px_rgba(255,255,255,0.1)] w-full transition-all hover:scale-[1.03]">
            SAVE CHANGES
          </button>

          <button
            onClick={handleReset} // รีเซ็ตข้อมูล
            className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-semibold shadow-[0_0_20px_rgba(15, 39, 76, 0.8)] w-full transition-all hover:scale-[1.03]">
            RESET
          </button>
        </div>
      </div>
    </div>
  );
}
