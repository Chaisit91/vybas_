import { useEffect, useState } from "react"; // นำเข้า Hook ของ React สำหรับใช้ state และ lifecycle
import { uploadImageToCloudinary } from "../services/cloudinary"; // ฟังก์ชันอัปโหลดรูปไป Cloudinary

// รูปแบบข้อมูลที่ใช้เก็บข้อมูลของหน้า Home
interface HomeContent {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  background: string; // URL รูป
}

const STORAGE_KEY = "home_content"; // key ที่ใช้สำหรับบันทึกข้อมูลใน localStorage

function HomeAdmin() {
  // state เก็บข้อมูลหน้า Home
  const [content, setContent] = useState<HomeContent>({
    title: "",
    subtitle: "",
    buttonText: "",
    buttonLink: "/models", // ให้ค่า default เป็นลิงก์ไปหน้า models
    background: "",        // เริ่มต้นยังไม่มีรูป
  });

  // โหลดข้อมูลจาก localStorage เมื่อเปิดหน้า admin ครั้งแรก
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY); // ดึงค่าที่เคยบันทึก
    if (saved) setContent(JSON.parse(saved)); // ถ้ามี ให้ใส่ค่าเข้า state
  }, []);

  // อัปเดตค่าใน state เมื่อมีการพิมพ์ input
  const handleChange = (field: keyof HomeContent, value: string) => {
    setContent((prev) => ({ ...prev, [field]: value })); // กระจายค่าเดิมแล้วอัปเดตเฉพาะ field ที่แก้
  };

  // อัปโหลดรูปไป Cloudinary
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // เลือกไฟล์แรก
    if (!file) return; // ถ้าไม่มีไฟล์ ให้หยุด

    const url = await uploadImageToCloudinary(file); // อัปโหลดไป cloudinary แล้วรอ URL กลับมา

    if (url) {
      const updated = { ...content, background: url }; // อัปเดต state ด้วย URL รูปใหม่
      setContent(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); // บันทึกลง localStorage
      alert("✅ Background updated successfully!"); // แจ้งเตือน
    } else {
      alert("❌ Upload failed."); // ถ้าอัปโหลดไม่สำเร็จ
    }
  };

  // บันทึกข้อมูลทั้งหมดลง localStorage
  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    alert("Home content saved successfully!");
  };

  // เริ่มต้นใหม่ (ลบข้อมูลทั้งหมด)
  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY); // ลบค่า
    window.location.reload(); // รีเฟรชหน้าเพื่อกลับค่า default
  };

  return (
    // พื้นหลังของหน้า admin
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 pt-28 pb-10 px-4 flex flex-col items-center text-gray-100">

      <h1 className="text-5xl font-extrabold mb-12 text-white uppercase">
        🏠 HOME PAGE CONTROL PANEL
      </h1>

      {/* กล่อง UI หลัก */}
      <div className="bg-[#111111] border border-gray-800 rounded-3xl p-10 w-full max-w-4xl space-y-6">

        {/* แก้ไข Title */}
        <div>
          <label className="font-semibold block mb-2">Title</label>
          <input
            value={content.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="bg-[#1A1A1A] border border-gray-700 w-full p-3 rounded-lg"
          />
        </div>

        {/* แก้ไข Subtitle */}
        <div>
          <label className="font-semibold block mb-2">Subtitle</label>
          <textarea
            value={content.subtitle}
            onChange={(e) => handleChange("subtitle", e.target.value)}
            className="bg-[#1A1A1A] border border-gray-700 w-full p-3 rounded-lg"
          />
        </div>

        {/* ปุ่มบนหน้า Home */}
        <div>
          <label className="font-semibold block mb-2">Button Text</label>
          <input
            value={content.buttonText}
            onChange={(e) => handleChange("buttonText", e.target.value)}
            className="bg-[#1A1A1A] border border-gray-700 w-full p-3 rounded-lg"
          />
        </div>

        {/* รูปพื้นหลัง */}
        <div>
          <label className="font-semibold block mb-2">Background Image</label>

          {/* แสดงตัวอย่างรูปเมื่อมีรูปอยู่แล้ว */}
          {content.background && (
            <div className="relative group">
              <img
                src={content.background}
                className="w-full h-64 object-cover rounded-xl mb-3 border border-gray-700"
              />
            </div>
          )}

          {/* ปุ่มเลือกไฟล์ */}
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="block w-full text-sm text-gray-300 file:py-2 file:px-4 file:bg-gray-800"
          />
        </div>

        {/* ปุ่ม Save และ Reset */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={handleSave}
            className="bg-blue-950 hover:bg-blue-800 px-6 py-3 rounded-xl w-full"
          >
            SAVE CHANGES
          </button>

          <button
            onClick={handleReset}
            className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-xl w-full"
          >
            RESET
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeAdmin; // ส่งออก component นี้
