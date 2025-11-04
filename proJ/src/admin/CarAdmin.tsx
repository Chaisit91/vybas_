import { useState, useEffect, useRef } from "react";
import defaultCars from "../assets/data.json";
import { uploadImageToCloudinary } from "../services/cloudinary";

interface Car {
  name: string;
  tagline: string;
  image: string;
  publicId: string;
}

export default function CarAdmin() {
  const [cars, setCars] = useState<Car[]>([]);
  const [newCar, setNewCar] = useState<Car>({
    name: "",
    tagline: "",
    image: "",
    publicId: "",
  });

  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("car_list_data");
    if (saved) setCars(JSON.parse(saved));
    else setCars(defaultCars);
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setNewCar((prev) => ({ ...prev, image: base64 }));
    };
    reader.readAsDataURL(file);

    try {
      const url = await uploadImageToCloudinary(file);
      if (url) {
        const safeUrl = url.replace("/upload/", "/upload/c_fit,f_auto,q_auto/");
        setNewCar((prev) => ({ ...prev, image: safeUrl }));
        setTimeout(() => {
          imageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 300);
        alert("✅ อัปโหลดรูปภาพสำเร็จ!");
      }
    } catch {
      alert("❌ อัปโหลดรูปภาพไม่สำเร็จ");
    }
  };

  const handleAddCar = () => {
    if (!newCar.name || !newCar.image || !newCar.publicId) {
      alert("⚠️ กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    const updatedCars = [...cars, newCar];
    setCars(updatedCars);
    localStorage.setItem("car_list_data", JSON.stringify(updatedCars));
    alert("✅ เพิ่มรถใหม่สำเร็จ!");
    setNewCar({ name: "", tagline: "", image: "", publicId: "" });
  };

  const handleDelete = (publicId: string) => {
    const updatedCars = cars.filter((c) => c.publicId !== publicId);
    setCars(updatedCars);
    localStorage.setItem("car_list_data", JSON.stringify(updatedCars));
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-gray-900 text-white py-20 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-10 text-white drop-shadow-lg tracking-wide">
          🏎️ Car Management System
        </h1>

        {/* ฟอร์มข้อมูล */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 bg-neutral-800/70 p-6 rounded-2xl shadow-xl border border-neutral-700">
          <input
            placeholder="ชื่อรถ (เช่น TEMERARIO)"
            value={newCar.name}
            onChange={(e) => setNewCar({ ...newCar, name: e.target.value })}
            className="p-3 rounded-lg bg-neutral-900 border border-neutral-700 text-white focus:ring-2 focus:ring-gray-400"
          />
          <input
            placeholder="แท็กไลน์ (Tagline)"
            value={newCar.tagline}
            onChange={(e) => setNewCar({ ...newCar, tagline: e.target.value })}
            className="p-3 rounded-lg bg-neutral-900 border border-neutral-700 text-white focus:ring-2 focus:ring-gray-400"
          />
          <input
            placeholder="Public ID (ไม่ซ้ำ)"
            value={newCar.publicId}
            onChange={(e) => setNewCar({ ...newCar, publicId: e.target.value })}
            className="p-3 rounded-lg bg-neutral-900 border border-neutral-700 text-white focus:ring-2 focus:ring-gray-400"
          />
        </div>

        {/* แสดงภาพ Preview */}
        {newCar.image && (
          <div
            ref={imageRef}
            className="bg-neutral-950/90 text-center rounded-2xl shadow-2xl border border-neutral-700 pt-10 pb-16 mt-6 transition-transform hover:scale-[1.01]"
          >
            <h2 className="text-4xl font-bold text-gray-300 mt-4">
              {newCar.name || "CAR NAME"}
            </h2>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mt-3 mb-6 tracking-tight uppercase">
              {newCar.tagline || "TAGLINE"}
            </h1>
            <div
              className="mx-auto rounded-lg overflow-hidden flex items-center justify-center bg-black border border-neutral-700"
              style={{ width: "1077.59px", height: "311.3px" }}
            >
              <img
                src={newCar.image}
                alt="Preview"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )}

        {/* Upload Section */}
        <div className="mt-8">
          <p className="text-gray-400 text-sm mb-2">
            อัปโหลดภาพหลัก (1077×311 — ภาพเต็ม ไม่ครอป)
          </p>
          <input
            type="file"
            onChange={handleUpload}
            accept="image/*"
            className="block mx-auto w-72 text-sm text-gray-200 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 transition"
          />
        </div>

        {/* ปุ่มเพิ่มรถ */}
        <div className="mt-10">
          <button
            onClick={handleAddCar}
            className="bg-white hover:bg-gray-200 text-black px-10 py-4 rounded-xl text-xl font-bold tracking-wider shadow-lg shadow-gray-700/40 transition"
          >
            ➕ เพิ่มรถใหม่
          </button>
        </div>

        {/* รายการรถ */}
        <div className="mt-16 text-left">
          <h2 className="text-3xl font-bold mb-6 text-gray-200 border-l-4 border-gray-400 pl-3">
            รายการรถทั้งหมด
          </h2>
          <ul className="space-y-3">
            {cars.map((c) => (
              <li
                key={c.publicId}
                className="flex justify-between items-center bg-neutral-900 border border-neutral-700 p-4 rounded-xl hover:border-white transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-24 h-14 object-cover rounded"
                  />
                  <span className="text-lg font-semibold text-white">
                    {c.name}
                  </span>
                </div>
                <button
                  onClick={() => handleDelete(c.publicId)}
                  className="text-gray-400 hover:text-white text-sm font-semibold transition"
                >
                  🗑️ ลบ
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
