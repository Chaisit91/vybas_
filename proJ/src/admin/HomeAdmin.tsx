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

function HomeAdmin() {
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
      const updated = { ...content, background: url };
      setContent(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      alert("✅ Background updated successfully!");
    } else {
      alert("❌ Upload failed.");
    }
  };

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    alert("Home content saved successfully!");
  };

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 pt-28 pb-10 px-4 flex flex-col items-center text-gray-100">

      <h1 className="text-5xl font-extrabold mb-12 text-white uppercase">
        🏠 HOME PAGE CONTROL PANEL
      </h1>

      <div className="bg-[#111111] border border-gray-800 rounded-3xl p-10 w-full max-w-4xl space-y-6">

        <div>
          <label className="font-semibold block mb-2">Title</label>
          <input
            value={content.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="bg-[#1A1A1A] border border-gray-700 w-full p-3 rounded-lg"
          />
        </div>

        <div>
          <label className="font-semibold block mb-2">Subtitle</label>
          <textarea
            value={content.subtitle}
            onChange={(e) => handleChange("subtitle", e.target.value)}
            className="bg-[#1A1A1A] border border-gray-700 w-full p-3 rounded-lg"
          />
        </div>

        <div>
          <label className="font-semibold block mb-2">Button Text</label>
          <input
            value={content.buttonText}
            onChange={(e) => handleChange("buttonText", e.target.value)}
            className="bg-[#1A1A1A] border border-gray-700 w-full p-3 rounded-lg"
          />
        </div>

        <div>
          <label className="font-semibold block mb-2">Background Image</label>

          {content.background && (
            <div className="relative group">
              <img
                src={content.background}
                className="w-full h-64 object-cover rounded-xl mb-3 border border-gray-700"
              />
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="block w-full text-sm text-gray-300 file:py-2 file:px-4 file:bg-gray-800"
          />
        </div>

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

export default HomeAdmin;
