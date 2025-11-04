import { useEffect, useState } from "react";
import { uploadImageToCloudinary } from "../services/cloudinary";

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
    buttonLink: "/models",
    background: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setContent(JSON.parse(saved));
  }, []);

  const handleChange = (field: keyof HomeContent, value: string) => {
    setContent((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadImageToCloudinary(file);
    if (url) {
      setContent((prev) => ({ ...prev, background: url }));
      alert("✅ Background updated successfully!");
    } else {
      alert("❌ Upload failed.");
    }
  };

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    alert("✅ Home content saved successfully!");
  };

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 pt-28 pb-10 px-4 flex flex-col items-center text-gray-100">
      <h1 className="text-5xl font-extrabold mb-12 text-white tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.25)] uppercase">
        🏠 HOME PAGE CONTROL PANEL
      </h1>

      <div className="bg-[#111111] border border-gray-800 rounded-3xl shadow-[0_0_40px_rgba(255,255,255,0.05)] 
                      p-10 w-full max-w-4xl space-y-6 backdrop-blur-sm">
        {/* Title */}
        <div>
          <label className="font-semibold block mb-2 text-gray-300 tracking-wide uppercase">
            Title
          </label>
          <input
            value={content.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="bg-[#1A1A1A] border border-gray-700 w-full p-3 rounded-lg text-gray-100 
                       placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
            placeholder="Enter title"
          />
        </div>

        {/* Subtitle */}
        <div>
          <label className="font-semibold block mb-2 text-gray-300 tracking-wide uppercase">
            Subtitle
          </label>
          <textarea
            value={content.subtitle}
            onChange={(e) => handleChange("subtitle", e.target.value)}
            className="bg-[#1A1A1A] border border-gray-700 w-full p-3 rounded-lg text-gray-100 
                       placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
            placeholder="Enter subtitle"
          />
        </div>

        {/* Button Text */}
        <div>
          <label className="font-semibold block mb-2 text-gray-300 tracking-wide uppercase">
            Button Text
          </label>
          <input
            value={content.buttonText}
            onChange={(e) => handleChange("buttonText", e.target.value)}
            className="bg-[#1A1A1A] border border-gray-700 w-full p-3 rounded-lg text-gray-100 
                       placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
            placeholder="Enter button text"
          />
        </div>

        {/* Background Image */}
        <div>
          <label className="font-semibold block mb-2 text-gray-300 tracking-wide uppercase">
            Background Image
          </label>
          {content.background && (
            <div className="relative group">
              <img
                src={content.background}
                alt="Preview"
                className="w-full h-64 object-cover rounded-xl mb-3 border border-gray-700/50 shadow-[0_0_25px_rgba(255,255,255,0.08)] group-hover:scale-[1.02] transition-all"
              />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="block w-full text-sm text-gray-300 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 
                       file:font-semibold file:bg-gray-800 file:text-gray-300 hover:file:bg-gray-700 transition-all cursor-pointer"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={handleSave}
            className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-semibold 
                       shadow-[0_0_25px_rgba(255,255,255,0.1)] w-full transition-all hover:scale-[1.03]"
          >
            💾 SAVE CHANGES
          </button>
          <button
            onClick={handleReset}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold 
                       shadow-[0_0_20px_rgba(239,68,68,0.4)] w-full transition-all hover:scale-[1.03]"
          >
            🔄 RESET
          </button>
        </div>
      </div>
    </div>
  );
}
