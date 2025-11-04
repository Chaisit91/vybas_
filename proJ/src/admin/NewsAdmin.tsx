// src/pages/NewsAdmin.tsx
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
  const [newsList, setNewsList] = useState<News[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    const data = await fetchNews();
    setNewsList(data);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadImageToCloudinary(file);
    if (url) setImageUrl(url);
    else alert("❌ Upload failed");
  };

  const handleSave = async () => {
    if (!title || !content || !imageUrl) {
      alert("⚠️ Please fill all fields");
      return;
    }

    if (editingId) {
      await updateNews({ id: editingId, title, content, image: imageUrl });
      alert("✅ Updated news successfully");
    } else {
      const newNews: News = {
        id: Date.now(),
        title,
        content,
        image: imageUrl,
      };
      await addNews(newNews);
      alert("✅ Added news successfully");
    }

    setTitle("");
    setContent("");
    setImageUrl("");
    setEditingId(null);
    await loadNews();
  };

  const handleEdit = (item: News) => {
    setTitle(item.title);
    setContent(item.content);
    setImageUrl(item.image);
    setEditingId(item.id);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Delete this news?")) {
      await deleteNews(id);
      await loadNews();
    }
  };

  const handleReset = async () => {
    if (confirm("Reset all added news (keep mock data)?")) {
      await resetLocalNews();
      await loadNews();
    }
  };

  const handleClearAll = async () => {
    if (confirm("⚠️ Delete ALL news (mock + local)?")) {
      await clearAllNews();
      alert("All data cleared (mock will reload next refresh)");
      await loadNews();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 py-10 px-4 flex flex-col items-center text-gray-100">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-white tracking-wide drop-shadow-lg">
        📰 NEWS ADMIN PANEL
      </h1>

      {/* === FORM === */}
      <div className="bg-[#111111] border border-gray-700 rounded-3xl shadow-[0_0_30px_rgba(255,255,255,0.1)] p-8 w-full max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            placeholder="📝 News Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-[#1a1a1a] border border-gray-600 p-3 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          />
          <textarea
            placeholder="🗒️ Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="bg-[#1a1a1a] border border-gray-600 p-3 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition md:col-span-2"
          />
          <input
            type="file"
            onChange={handleUpload}
            className="block w-full text-sm text-gray-200 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:font-semibold file:bg-red-600/20 file:text-red-400 hover:file:bg-red-600/30 transition md:col-span-2"
          />
        </div>

        <button
          onClick={handleSave}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-red-700/40 transition-all duration-300 w-full"
        >
          {editingId ? "💾 SAVE CHANGES" : "➕ ADD NEWS"}
        </button>

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

      {/* === NEWS LIST === */}
      <div className="mt-10 w-full max-w-6xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-100 border-b border-gray-700 pb-2">
          🗞️ All News ({newsList.length})
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {newsList.map((item) => (
            <div
              key={item.id}
              className="bg-[#181818] border border-gray-700 rounded-2xl overflow-hidden shadow-md hover:shadow-red-700/30 transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-48 w-full object-cover opacity-90 hover:opacity-100 transition"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg text-white">{item.title}</h3>
                <p className="text-gray-400 text-sm mt-2 line-clamp-3">
                  {item.content}
                </p>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-400 font-semibold hover:text-blue-300 transition"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 font-semibold hover:text-red-400 transition"
                  >
                    🗑️ Delete
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
