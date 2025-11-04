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
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-900">
        📰 News Management
      </h1>

      {/* === FORM === */}
      <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            placeholder="News Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 md:col-span-2"
          />
          <input
            type="file"
            onChange={handleUpload}
            className="block w-full text-sm text-gray-700 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 md:col-span-2"
          />
        </div>

        <button
          onClick={handleSave}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-xl transition-all duration-300 w-full"
        >
          {editingId ? "💾 Save Changes" : "➕ Add News"}
        </button>

        <div className="flex gap-4 mt-4">
          <button
            onClick={handleReset}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition-all duration-300 w-full"
          >
            🔄 Reset Local News
          </button>
          <button
            onClick={handleClearAll}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition-all duration-300 w-full"
          >
            🗑️ Clear All News
          </button>
        </div>
      </div>

      {/* === NEWS LIST === */}
      <div className="mt-10 w-full max-w-5xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          All News ({newsList.length})
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {newsList.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-2xl overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{item.content}</p>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 font-semibold hover:underline"
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