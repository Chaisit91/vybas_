import { useEffect, useState } from "react";
import {
  fetchNews,
  addNews,
  deleteNews,
  updateNews,
  resetLocalNews,
  clearAllNews,
} from "../api/news";
import { uploadImageToCloudinary } from "../services/cloudinary";
import type { News } from "../types/News";

export default function NewsAdmin() {

  //  state เก็บรายการข่าวทั้งหมด
  const [newsList, setNewsList] = useState<News[]>([]);

  //  state ฟอร์ม
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  //  state preview รูปก่อนอัปโหลด (สำหรับแสดงก่อนส่งขึ้น Cloudinary)
  const [preview, setPreview] = useState<string | null>(null);

  //  state สำหรับโหมดแก้ไขข่าว (ใช้ id เพื่อรู้ว่ากำลังแก้อันไหน)
  const [editingId, setEditingId] = useState<number | null>(null);

  // โหลดข่าวตอน component เปิดครั้งแรก
  useEffect(() => {
    loadNews();
  }, []);

  //  โหลดข่าวทั้งหมด (ทั้ง mock + local)
  const loadNews = async () => {
    const data = await fetchNews();
    setNewsList(data);
  };

  //  อัปโหลดรูปขึ้น Cloudinary + preview
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // แสดงรูป preview ทันที ไม่ต้องรออัปโหลด
    setPreview(URL.createObjectURL(file));

    // อัปโหลดขึ้น Cloudinary
    const url = await uploadImageToCloudinary(file);

    if (url) setImageUrl(url);
    else alert("❌ Upload failed");
  };

  //  บันทึกข่าวใหม่ หรืออัปเดตข่าวที่แก้ไขอยู่
  const handleSave = async () => {
    if (!title || !content || !imageUrl) {
      alert("⚠️ Please fill all fields");
      return;
    }

    // ถ้า editingId มีค่า  แปลว่ากำลังแก้ไขข่าว
    if (editingId) {
      await updateNews({ id: editingId, title, content, image: imageUrl });
      alert("✅ Updated news successfully");
    } else {
      // กรณีเพิ่มข่าวใหม่
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

    await loadNews();
  };

  //  ใส่ข้อมูลลงฟอร์มเพื่อแก้ไข (Edit Mode)
  const handleEdit = (item: News) => {
    setTitle(item.title); //  ใส่หัวข้อข่าวลงใน input (เพื่อให้ผู้ใช้แก้ไข)
    setContent(item.content); // ใส่เนื้อหาข่าวลงใน textarea
    setImageUrl(item.image); //  เก็บ URL รูปข่าวเดิม (เผื่อผู้ใช้ไม่เปลี่ยนภาพ)
    setPreview(item.image); //  แสดงภาพของข่าวที่กำลังแก้ไขในส่วน Preview ทันที
    setEditingId(item.id); //ตั้งว่าเราอยู่ในโหมด "แก้ไข" โดยใช้ id ของข่าวที่เลือก
// เมื่อกด save จะไม่สร้างข่าวใหม่ แต่จะ update ข่าวอันนี้แทน
  };

  //  ลบข่าวตาม id
  const handleDelete = async (id: number) => {
    if (confirm("Delete this news?")) {
      await deleteNews(id);
      await loadNews();
    }
  };

  // รีเซ็ตเฉพาะข่าวที่ผู้ใช้เพิ่ม (ข่าว mock ยังอยู่)
  const handleReset = async () => {
    if (confirm("Reset all added news (keep mock data)?")) {
      await resetLocalNews();
      await loadNews();
    }
  };

  //  ลบข่าวทั้งหมด (mock + local)
  const handleClearAll = async () => {
    if (confirm("⚠️ Delete ALL news (mock + local)?")) {
      await clearAllNews();
      alert("All data cleared (mock will reload next refresh)");
      await loadNews();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 pt-28 pb-10 px-4 flex flex-col items-center text-gray-100">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-white tracking-wide drop-shadow-lg">
         NEWS ADMIN PANEL
      </h1>

      {/* ============================
           FORM สำหรับเพิ่ม/แก้ไขข่าว
         ============================ */}
      <div className="bg-[#111111] border border-gray-700 rounded-3xl shadow-[0_0_30px_rgba(255,255,255,0.1)] p-8 w-full max-w-5xl">

        {/* ฟอร์มแบบ Grid 2 คอลัมน์ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

          {/* ชื่อข่าว */}
          <input
            placeholder=" News Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-[#1a1a1a] border border-gray-600 p-3 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          />

          {/* เนื้อหา */}
          <textarea
            placeholder=" Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="bg-[#1a1a1a] border border-gray-600 p-3 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition md:col-span-2"
          />

          {/* อัปโหลดภาพ */}
          <input
            type="file"
            onChange={handleUpload}
            className="block w-full text-sm text-gray-200 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:font-semibold file:bg-red-600/20 file:text-red-400 hover:file:bg-red-600/30 transition md:col-span-2"
          />

          {/* รูป Preview */}
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

        {/* ปุ่ม Add / Save */}
        <button
          onClick={handleSave}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-red-700/40 transition-all duration-300 w-full"
        >
          {editingId ? "💾 SAVE CHANGES" : "➕ ADD NEWS"}
        </button>

        {/* ปุ่ม Reset + Clear All */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={handleReset}
            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition-all duration-300 w-full"
          >
            🔄 Reset Local
          </button>

          <button
            onClick={handleClearAll}
            className="bg-red-800 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition-all duration-300 w-full"
          >
            🗑️ Clear All
          </button>
        </div>

      </div>

      {/* ============================
           รายการข่าวทั้งหมด
         ============================ */}
      <div className="mt-10 w-full max-w-6xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-100 border-b border-gray-700 pb-2">
           All News ({newsList.length})
        </h2>

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
