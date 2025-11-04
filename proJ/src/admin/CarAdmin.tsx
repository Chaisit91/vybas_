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

  // ✅ โหลดข้อมูลตอนเริ่มต้น
  useEffect(() => {
    const saved = localStorage.getItem("car_list_data");
    const deleted = JSON.parse(localStorage.getItem("deleted_cars") || "[]");

    // รวม defaultCars + localStorage แต่ไม่เอารถที่ถูกลบ
    const base = saved ? JSON.parse(saved) : [];
    const filteredDefaults = defaultCars.filter(
      (c: Car) => !deleted.includes(c.publicId)
    );

    setCars([...filteredDefaults, ...base]);
  }, []);

  // ✅ อัปโหลดภาพไป Cloudinary
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const url = await uploadImageToCloudinary(file);
      if (url) {
        setNewCar((prev) => ({ ...prev, image: url }));

        // Scroll ไปยัง preview หลังอัปโหลดเสร็จ
        setTimeout(() => {
          imageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 300);

        alert("✅ อัปโหลดรูปภาพสำเร็จ!");
      }
    } catch {
      alert("❌ อัปโหลดรูปภาพไม่สำเร็จ");
    }
  };

  // ✅ เพิ่มรถใหม่
  const handleAddCar = () => {
    if (!newCar.name || !newCar.image || !newCar.publicId) {
      alert("⚠️ กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    const updatedCars = [...cars, newCar];
    setCars(updatedCars);

    // เก็บเฉพาะรถที่ไม่ซ้ำกับ defaultCars
    localStorage.setItem(
      "car_list_data",
      JSON.stringify(
        updatedCars.filter(
          (c) => !defaultCars.some((d) => d.publicId === c.publicId)
        )
      )
    );

    alert("✅ เพิ่มรถใหม่สำเร็จ!");
    setNewCar({ name: "", tagline: "", image: "", publicId: "" });
  };

  // ✅ ลบรถ
  const handleDelete = (publicId: string) => {
    const updatedCars = cars.filter((c) => c.publicId !== publicId);
    setCars(updatedCars);

    // เก็บ publicId ของรถที่ถูกลบไว้
    const deleted = JSON.parse(localStorage.getItem("deleted_cars") || "[]");
    if (!deleted.includes(publicId)) {
      deleted.push(publicId);
      localStorage.setItem("deleted_cars", JSON.stringify(deleted));
    }

    // อัปเดตเฉพาะรถที่เพิ่มใหม่
    localStorage.setItem(
      "car_list_data",
      JSON.stringify(
        updatedCars.filter(
          (c) => !defaultCars.some((d) => d.publicId === c.publicId)
        )
      )
    );
  };

  // ✅ รีเซ็ตข้อมูลเป็นค่าเริ่มต้น
  const handleReset = () => {
    if (
      confirm(
        "⚠️ ต้องการรีเซ็ตกลับเป็นค่าเริ่มต้นหรือไม่? (ข้อมูลทั้งหมดจะหาย)"
      )
    ) {
      localStorage.removeItem("car_list_data");
      localStorage.removeItem("deleted_cars");
      setCars(defaultCars);
      alert("✅ รีเซ็ตข้อมูลเรียบร้อยแล้ว!");
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-gray-900 text-white py-20 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-10 text-white drop-shadow-lg tracking-wide">
          🏎️ Car Management System
        </h1>

        {/* ฟอร์มเพิ่มรถ */}
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

        {/* อัปโหลดภาพ */}
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

          {/* ✅ Preview ภาพหลังอัปโหลด */}
          {newCar.image && (
            <div className="mt-6 flex justify-center" ref={imageRef}>
              <img
                src={newCar.image}
                alt="Car Preview"
                className="w-full max-w-3xl rounded-xl border border-neutral-700 shadow-lg"
              />
            </div>
          )}
        </div>

        {/* ปุ่มเพิ่ม / รีเซ็ต */}
        <div className="mt-10 flex flex-col md:flex-row justify-center gap-6">
          <button
            onClick={handleAddCar}
            className="bg-white hover:bg-gray-200 text-black px-10 py-4 rounded-xl text-xl font-bold tracking-wider shadow-lg shadow-gray-700/40 transition"
          >
            ➕ เพิ่มรถใหม่
          </button>

          <button
            onClick={handleReset}
            className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-xl text-xl font-bold tracking-wider shadow-lg shadow-red-800/40 transition"
          >
            🔄 รีเซ็ตเป็นค่าเริ่มต้น
          </button>
        </div>

        {/* รายการรถทั้งหมด */}
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
