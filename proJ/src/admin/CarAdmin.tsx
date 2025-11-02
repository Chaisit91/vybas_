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

  // ✅ Upload และแสดงภาพเต็มแบบไม่ครอป
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // แสดงภาพจากเครื่องก่อน upload
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setNewCar((prev) => ({ ...prev, image: base64 }));
    };
    reader.readAsDataURL(file);

    try {
      const url = await uploadImageToCloudinary(file);
      if (url) {
        // ✅ บังคับ Cloudinary ให้ไม่ครอปเลย (fit ภาพเต็ม)
        const safeUrl = url.replace("/upload/", "/upload/c_fit,f_auto,q_auto/");
        setNewCar((prev) => ({ ...prev, image: safeUrl }));

        setTimeout(() => {
          imageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 300);

        alert("✅ อัปโหลดรูปภาพสำเร็จ!");
      }
    } catch (err) {
      console.error("Upload failed", err);
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
    <section className="min-h-screen flex flex-col items-center justify-center bg-white text-center pt-24 relative overflow-hidden">
      <div className="animate-fadeIn w-full max-w-6xl px-4">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">จัดการข้อมูลรถยนต์</h1>

        {/* ฟอร์มข้อมูล */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <input
            placeholder="ชื่อรถ (เช่น TEMERARIO)"
            value={newCar.name}
            onChange={(e) => setNewCar({ ...newCar, name: e.target.value })}
            className="border p-3 rounded-lg w-full text-lg"
          />
          <input
            placeholder="แท็กไลน์ (Tagline)"
            value={newCar.tagline}
            onChange={(e) => setNewCar({ ...newCar, tagline: e.target.value })}
            className="border p-3 rounded-lg w-full text-lg"
          />
          <input
            placeholder="Public ID (ไม่ซ้ำ)"
            value={newCar.publicId}
            onChange={(e) => setNewCar({ ...newCar, publicId: e.target.value })}
            className="border p-3 rounded-lg w-full text-lg"
          />
        </div>

        {/* แสดงภาพ Preview */}
        {newCar.image && (
          <div
            ref={imageRef}
            className="bg-white text-center rounded-lg shadow-inner pt-16 pb-12 overflow-hidden mt-6"
          >
            <h2 className="text-3xl font-bold text-gray-900 mt-6">
              {newCar.name || "CAR NAME"}
            </h2>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 mt-4 mb-8">
              {newCar.tagline || "TAGLINE"}
            </h1>

            {/* ✅ กรอบใหญ่เท่ากับ CarSlider และไม่ครอปภาพ */}
            <div
              className="mx-auto drop-shadow-xl transition-transform duration-700 hover:scale-105 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center"
              style={{
                width: "1077.59px",
                height: "311.3px",
              }}
            >
              <img
                src={newCar.image}
                alt="Preview"
                className="w-full h-full object-contain"
                style={{ display: "block" }}
              />
            </div>
          </div>
        )}

        {/* ✅ ปุ่ม Choose File อยู่ด้านล่างสุด */}
        <div className="mt-6">
          <p className="text-sm mb-1 text-gray-600">
            อัปโหลดภาพหลัก (แสดงภาพเต็มในกรอบ 1077.59×311.3)
          </p>
          <input type="file" onChange={handleUpload} accept="image/*" />
        </div>

        {/* ปุ่มเพิ่มรถ */}
        <div className="mt-8">
          <button
            onClick={handleAddCar}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
          >
            เพิ่มรถใหม่
          </button>
        </div>

        {/* รายการรถ */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            รายการรถทั้งหมด
          </h2>
          <ul className="space-y-3">
            {cars.map((c) => (
              <li
                key={c.publicId}
                className="flex justify-between items-center border p-4 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-20 h-12 object-cover rounded"
                  />
                  <span className="text-lg font-medium">{c.name}</span>
                </div>
                <button
                  onClick={() => handleDelete(c.publicId)}
                  className="text-red-600 hover:underline text-sm"
                >
                  ลบ
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}