import { useState, useEffect } from "react";
import defaultCars from "../assets/data.json";
import { uploadImageToCloudinary } from "../services/cloudinary";
import { addCarToOptions } from "../services/carStorage"; // ✅ เพิ่มบรรทัดนี้

interface Car {
  name: string;
  tagline: string;
  image: string;
  sideLeft: string;
  sideRight: string;
  publicId: string;
}

export default function CarAdmin() {
  const [cars, setCars] = useState<Car[]>([]);
  const [newCar, setNewCar] = useState<Car>({
    name: "",
    tagline: "",
    image: "",
    sideLeft: "",
    sideRight: "",
    publicId: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("car_list_data");
    if (saved) setCars(JSON.parse(saved));
    else setCars(defaultCars);
  }, []);

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Car
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadImageToCloudinary(file);
    if (url) setNewCar((prev) => ({ ...prev, [field]: url }));
  };

  const handleAddCar = () => {
    if (!newCar.name || !newCar.image || !newCar.publicId) {
      alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    const updatedCars = [...cars, newCar];
    setCars(updatedCars);
    localStorage.setItem("car_list_data", JSON.stringify(updatedCars));

    // ✅ เพิ่ม car นี้เข้าไปใน car_options_data
    addCarToOptions(newCar.publicId);

    alert("เพิ่มรถใหม่สำเร็จ ✅");

    setNewCar({
      name: "",
      tagline: "",
      image: "",
      sideLeft: "",
      sideRight: "",
      publicId: "",
    });
  };

  const handleDelete = (publicId: string) => {
    const updatedCars = cars.filter((c) => c.publicId !== publicId);
    setCars(updatedCars);
    localStorage.setItem("car_list_data", JSON.stringify(updatedCars));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">จัดการข้อมูลรถยนต์</h1>

      {/* ฟอร์มเพิ่มรถใหม่ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          placeholder="ชื่อรถ (เช่น TEMERARIO)"
          value={newCar.name}
          onChange={(e) => setNewCar({ ...newCar, name: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          placeholder="แท็กไลน์ (Tagline)"
          value={newCar.tagline}
          onChange={(e) => setNewCar({ ...newCar, tagline: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          placeholder="Public ID (ใช้สำหรับ carOptions)"
          value={newCar.publicId}
          onChange={(e) => setNewCar({ ...newCar, publicId: e.target.value })}
          className="border p-2 rounded"
        />
        <div>
          <p className="text-sm mb-1">อัปโหลดภาพหลัก:</p>
          <input type="file" onChange={(e) => handleUpload(e, "image")} />
        </div>
        <div>
          <p className="text-sm mb-1">อัปโหลดภาพด้านซ้าย:</p>
          <input type="file" onChange={(e) => handleUpload(e, "sideLeft")} />
        </div>
        <div>
          <p className="text-sm mb-1">อัปโหลดภาพด้านขวา:</p>
          <input type="file" onChange={(e) => handleUpload(e, "sideRight")} />
        </div>
      </div>

      <button
        onClick={handleAddCar}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        เพิ่มรถใหม่
      </button>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-3">รายการรถทั้งหมด</h2>
        <ul className="space-y-2">
          {cars.map((c) => (
            <li
              key={c.publicId}
              className="flex justify-between items-center border p-3 rounded"
            >
              <span>{c.name}</span>
              <button
                onClick={() => handleDelete(c.publicId)}
                className="text-red-600 hover:underline"
              >
                ลบ
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
