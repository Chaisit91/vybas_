import { useEffect, useState } from "react"; // ใช้ Hook ของ React: useState สำหรับ state, useEffect สำหรับโหลดข้อมูลตอนเริ่มต้น
import {
  fetchNews,      // ดึงข่าวทั้งหมด (รวม mock + localStorage)
  addNews,        // เพิ่มข่าวใหม่
  deleteNews,     // ลบข่าวตาม id
  updateNews,     // อัปเดตข่าวที่แก้ไข
  resetLocalNews, // ลบเฉพาะข่าวที่ user เพิ่ม (mock ยังอยู่)
  clearAllNews,   // ลบข่าวทั้งหมด รวม mock ด้วย
} from "../api/news";
import { uploadImageToCloudinary } from "../services/cloudinary"; // ฟังก์ชันอัปโหลดรูปไป Cloudinary
import type { News } from "../types/News"; // type ของข่าว

export default function NewsAdmin() {

  // state สำหรับเก็บรายการข่าวทั้งหมด (array ของ News)
  const [newsList, setNewsList] = useState<News[]>([]);

  // state สำหรับฟอร์มเพิ่มข่าว / แก้ไขข่าว
  const [title, setTitle] = useState("");      // หัวข้อข่าว
  const [content, setContent] = useState("");  // เนื้อข่าว
  const [imageUrl, setImageUrl] = useState(""); // URL รูปหลังอัปโหลด cloudinary

  // state preview สำหรับแสดงรูปทันทีหลังเลือกไฟล์ (ก่อนอัปโหลดจริง)
  const [preview, setPreview] = useState<string | null>(null);

  // state สำหรับโหมดแก้ไขข่าว (เก็บ id ของ item ที่กำลังแก้)
  const [editingId, setEditingId] = useState<number | null>(null);

  // โหลดข่าวทั้งหมดตอนเปิด component ครั้งแรก
  useEffect(() => {
    loadNews(); // เรียกฟังก์ชันโหลดข่าว
  }, []);

  // ดึงข่าวทั้งหมด (mock + localStorage)
  const loadNews = async () => {
    const data = await fetchNews(); // เรียก api/news.ts
    setNewsList(data);              // เซ็ต state
  };

  // อัปโหลดรูปขึ้น Cloudinary + แสดง preview ทันที
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // ดึงไฟล์แรกจาก input
    if (!file) return;

    setPreview(URL.createObjectURL(file)); // สร้างลิงก์ preview สำหรับรูปชั่วคราว

    const url = await uploadImageToCloudinary(file); // อัปโหลดจริงขึ้น Cloudinary

    if (url) setImageUrl(url); // ตั้ง URL ใน state ไว้บันทึกข่าว
    else alert("❌ Upload failed");
  };

  // ฟังก์ชันกดปุ่ม SAVE = เพิ่มข่าวใหม่ หรือ แก้ไขข่าวเดิม
  const handleSave = async () => {
    // ตรวจ empty fields
    if (!title || !content || !imageUrl) {
      alert("⚠️ Please fill all fields");
      return;
    }

    // ถ้ามี editingId = แก้ไขข่าว
    if (editingId) {
      await updateNews({ id: editingId, title, content, image: imageUrl });
      alert("✅ Updated news successfully");

    } else {
      // ไม่มี editingId = เพิ่มข่าวใหม่
      const newNews: News = {
        id: Date.now(), // ใช้ timestamp เป็น id
        title,
        content,
        image: imageUrl,
      };

      await addNews(newNews);
      alert("✅ Added news successfully");
    }

    // เคลียร์ฟอร์มกลับค่าเดิม
    setTitle("");
    setContent("");
    setImageUrl("");
    setPreview(null);
    setEditingId(null);

    await loadNews(); // โหลดข่าวใหม่หลังจาก save
  };

  // ฟังก์ชันกดปุ่ม Edit ใส่ข้อมูลของ item ลงฟอร์ม
  const handleEdit = (item: News) => {
    setTitle(item.title);     // ใส่ title ลง input
    setContent(item.content); // ใส่ content ลง textarea
    setImageUrl(item.image);  // ใส่ URL รูป (กรณีไม่เปลี่ยน)
    setPreview(item.image);   // แสดงรูป preview
    setEditingId(item.id);    // ระบุว่าอยู่ในโหมดแก้ไขข่าวนี้
  };

  // ฟังก์ชันลบข่าว
  const handleDelete = async (id: number) => {
    if (confirm("Delete this news?")) {
      await deleteNews(id);
      await loadNews();
    }
  };

  // รีเซ็ตเฉพาะข่าวที่ user เพิ่ม (ข่าว mock ยังไม่ลบ)
  const handleReset = async () => {
    if (confirm("Reset all added news (keep mock data)?")) {
      await resetLocalNews();
      await loadNews();
    }
  };

  // ลบข่าวทั้งหมด (mock + localStorage)
  const handleClearAll = async () => {
    if (confirm("⚠️ Delete ALL news (mock + local)?")) {
      await clearAllNews();
      alert("All data cleared (mock will reload next refresh)");
      await loadNews();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 pt-28 pb-10 px-4 flex flex-col items-center text-gray-100">
      
      {/* หัวหน้าแสดงบนสุด */}
      <h1 className="text-4xl font-extrabold text-center mb-10 text-white tracking-wide drop-shadow-lg">
         NEWS ADMIN PANEL
      </h1>

      {/* ================================
           FORM เพิ่มและแก้ไขข่าว
         ================================ */}
      <div className="bg-[#111111] border border-gray-700 rounded-3xl shadow-[0_0_30px_rgba(255,255,255,0.1)] p-8 w-full max-w-5xl">

        {/* Layout แบ่ง Grid 2 คอลัมน์ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

          {/* ช่องกรอก title */}
          <input
            placeholder=" News Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-[#1a1a1a] border border-gray-600 p-3 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white-500 transition"
          />

          {/* ช่องกรอก content */}
          <textarea
            placeholder=" Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="bg-[#1a1a1a] border border-gray-600 p-3 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white-500 transition md:col-span-2"
          />

          {/* อัปโหลดไฟล์รูป */}
          <input
            type="file"
            onChange={handleUpload}
            className="block w-full text-sm text-gray-200 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:font-semibold file:bg-blue-600/20 file:text-blue-400 hover:file:bg-blue-300/30 transition md:col-span-2"
          />

          {/* แสดงรูป preview ถ้ามี */}
          {preview && (
            <div className="md:col-span-2 flex justify-center mt-2">
              <img
                src={preview}
                alt="preview"
                className="h-48 rounded-lg border border-gray-600 object-cover"
              />
            </div>
          )}
        </div>

        {/* ปุ่ม SAVE / ADD */}
        <button
          onClick={handleSave}
          className="bg-blue-950 hover:bg-blue-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-red-700/40 transition-all duration-300 w-full"
        >
          {editingId ? "SAVE CHANGES" : "ADD NEWS"} {/* ถ้า editingId มี -> แสดง Save */}
        </button>

        {/* ปุ่ม Reset และ Clear All */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={handleReset}
            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition-all duration-300 w-full"
          >
            Reset Local
          </button>

          <button
            onClick={handleClearAll}
            className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition-all duration-300 w-full"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* ================================
           แสดงรายการข่าวทั้งหมด
         ================================ */}
      <div className="mt-10 w-full max-w-6xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-100 border-b border-gray-700 pb-2">
           All News ({newsList.length}) {/* จำนวนข่าว */}
        </h2>

        {/* Layout แสดงข่าวเป็น Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {newsList.map((item) => (
            <div
              key={item.id}
              className="bg-[#181818] border border-gray-700 rounded-2xl overflow-hidden shadow-md hover:shadow-red-700/30 transition-all duration-300"
            >
              {/* รูปข่าว */}
              <img
                src={item.image}
                alt={item.title}
                className="h-48 w-full object-cover opacity-90 hover:opacity-100 transition"
              />

              {/* เนื้อหาของข่าว */}
              <div className="p-4">
                <h3 className="font-bold text-lg text-white">{item.title}</h3>
                <p className="text-gray-400 text-sm mt-2 line-clamp-3">
                  {item.content}
                </p>

                {/* ปุ่ม Edit / Delete */}
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-400 font-semibold hover:text-blue-300 transition"
                  >
                     Edit
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 font-semibold hover:text-red-400 transition"
                  >
                     Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
