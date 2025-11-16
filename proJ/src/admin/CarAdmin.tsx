// React hooks: useState (เก็บข้อมูล), useEffect (รันตอนโหลดหน้า), useRef (ใช้เลื่อน scroll)
import { useState, useEffect, useRef } from "react";

// นำเข้ารถ default จากไฟล์ JSON ภายในโปรเจกต์
import defaultCars from "../assets/data.json";

// ฟังก์ชันอัปโหลดภาพไป Cloudinary
import { uploadImageToCloudinary } from "../services/cloudinary";

// กำหนดรูปแบบข้อมูลของรถ 1 คัน
interface Car {
  name: string;
  tagline: string;
  image: string;
  publicId: string;
}

export default function CarAdmin() {
  // รายการรถทั้งหมด (รวม default + รถที่เพิ่มภายหลัง)
  const [cars, setCars] = useState<Car[]>([]);

  // เก็บค่าจากฟอร์มเวลาจะเพิ่มรถใหม่
  const [newCar, setNewCar] = useState<Car>({
    name: "",
    tagline: "",
    image: "",
    publicId: "",
  });

  // ใช้ reference ไว้เลื่อนไปตำแหน่งรูป preview หลังอัปโหลด
  const imageRef = useRef<HTMLDivElement | null>(null);

  // โหลดข้อมูลตอนเริ่มต้นหน้า
  useEffect(() => {
    // ดึงข้อมูลรถที่เพิ่มใหม่จาก localStorage (ถ้ามี)
    const saved = localStorage.getItem("car_list_data");

    // รถที่เคยถูกลบ → จะไม่ดึงกลับมาอีก
    const deleted = JSON.parse(localStorage.getItem("deleted_cars") || "[]");

    // ถ้ามีข้อมูลใน localStorage → ใช้ค่านั้น
    const base = saved ? JSON.parse(saved) : [];

    // ตัด defaultCars ที่ถูกลบออก
    const filteredDefaults = defaultCars.filter(
      (c: Car) => !deleted.includes(c.publicId)
    );

    // รวมรถทั้งหมด
    setCars([...filteredDefaults, ...base]);
  }, []);

  // อัปโหลดรูปภาพขึ้น Cloudinary
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const url = await uploadImageToCloudinary(file);

      if (url) {
        // อัปเดตรูปใน newCar
        setNewCar((prev) => ({ ...prev, image: url }));

        // เลื่อนลงไปโชว์ preview
        setTimeout(() => {
          imageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 300);

        alert("✅ อัปโหลดรูปภาพสำเร็จ!");
      }
    } catch {
      alert("❌ อัปโหลดรูปภาพไม่สำเร็จ");
    }
  };

  // เพิ่มรถใหม่เข้า list
  const handleAddCar = () => {
    // ตรวจว่าข้อมูลครบหรือไม่
    if (!newCar.name || !newCar.image || !newCar.publicId) {
      alert("⚠️ กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    const updatedCars = [...cars, newCar];
    setCars(updatedCars);

    // เก็บเฉพาะรถที่ไม่ใช่ defaultCars → ป้องกันซ้ำซ้อน
    localStorage.setItem(
      "car_list_data",// แปลงข้อมูลรถให้เป็นสตริง JSON ก่อนเก็บลง localStorage
      JSON.stringify(     // filter = คัดกรองรายการรถ
        updatedCars.filter( 
          (c) => !defaultCars.some((d) => d.publicId === c.publicId) 
      // เงื่อนไข: เลือกเฉพาะรถที่ "ไม่ซ้ำ" กับ defaultCars
      // defaultCars.some(...) = ตรวจว่ามีรถใน defaultCars ที่ publicId ตรงกับ c.publicId หรือไม่
      // ถ้า some() คืนค่า true แปลว่ารถซ้ำ  เราไม่เอา
      // ใส่ ! (not) เพื่อให้เอาเฉพาะรายการที่ไม่ซ้ำเท่านั้น

        )
      )
    );

    alert("✅ เพิ่มรถใหม่สำเร็จ!");

    // เคลียร์ฟอร์ม
    setNewCar({ name: "", tagline: "", image: "", publicId: "" });
  };

  // ลบรถ
  const handleDelete = (publicId: string) => {
    const updatedCars = cars.filter((c) => c.publicId !== publicId);
    setCars(updatedCars);

    // เก็บรถที่ถูกลบไว้ → ป้องกันให้ defaultCars กลับมาอีก
    const deleted = JSON.parse(localStorage.getItem("deleted_cars") || "[]");

    if (!deleted.includes(publicId)) {
      deleted.push(publicId);
      localStorage.setItem("deleted_cars", JSON.stringify(deleted));
    }

    // เก็บข้อมูลเฉพาะรถที่เพิ่มใหม่
    localStorage.setItem(
      "car_list_data",
      JSON.stringify(
        updatedCars.filter(
          (c) => !defaultCars.some((d) => d.publicId === c.publicId)
        )
      )
    );
  };

  // รีเซ็ตกลับเป็นค่าเริ่มต้น
  const handleReset = () => {
    if (
      confirm("⚠️ ต้องการรีเซ็ตกลับเป็นค่าเริ่มต้นหรือไม่? (ข้อมูลทั้งหมดจะหาย)")
    ) {
      localStorage.removeItem("car_list_data");
      localStorage.removeItem("deleted_cars");
      setCars(defaultCars);
      alert("✅ รีเซ็ตข้อมูลเรียบร้อยแล้ว!");
    }
  };

  return (
    // พื้นหลังแบบ gradient + padding + layout
    <section className="
        min-h-screen                      // ความสูงเต็มหน้าจอ
        bg-gradient-to-b                 // ไล่สีบน→ล่าง
        from-black via-neutral-900 to-gray-900
        text-white                       // ตัวอักษรสีขาว
        py-20 px-6                       // padding รอบด้าน
        relative overflow-hidden         // รองรับ element ซ้อน
      "
    >
      <div className="max-w-6xl mx-auto text-center">
        {/* หัวข้อหน้า */}
        <h1 className="
            text-5xl md:text-6xl            // ขนาดฟอนต์ responsive
            font-extrabold                  // หนามาก
            mb-10                           // เว้นด้านล่าง
            text-white                      // สีขาว
            drop-shadow-lg                  // เงาชัด
            tracking-wide                   // เพิ่มระยะตัวอักษร
        ">
           Car Management System
        </h1>

        {/* ฟอร์มเพิ่มรถ */}
        <div className="
            grid grid-cols-1 md:grid-cols-3 // layout 1 คอลัมน์บนมือถือ / 3 คอลัมน์บนจอใหญ่
            gap-4                           // ระยะห่าง
            mb-10                           // เว้นด้านล่าง
            bg-neutral-800/70               // กล่องโปร่ง 70%
            p-6                             // padding
            rounded-2xl                     // มุมมน
            shadow-xl                       // เงาใหญ่
            border border-neutral-700       // เส้นขอบเทาเข้ม
        ">
          {/* ช่องกรอกชื่อรถ */}
          <input
            placeholder="ชื่อรถ (เช่น TEMERARIO)"
            value={newCar.name}
            onChange={(e) => setNewCar({ ...newCar, name: e.target.value })}
            className="
              p-3 rounded-lg
              bg-neutral-900
              border border-neutral-700
              text-white
              focus:ring-2 focus:ring-gray-400
            "
          />

          {/* ช่อง tagline */}
          <input
            placeholder="แท็กไลน์ (Tagline)"
            value={newCar.tagline}
            onChange={(e) => setNewCar({ ...newCar, tagline: e.target.value })}
            className="
              p-3 rounded-lg bg-neutral-900
              border border-neutral-700 text-white
              focus:ring-2 focus:ring-gray-400
            "
          />

          {/* public ID */}
          <input
            placeholder="Public ID (ไม่ซ้ำ)"
            value={newCar.publicId}
            onChange={(e) => setNewCar({ ...newCar, publicId: e.target.value })} // เมื่อมีการพิมพ์ในช่อง input อัปเดตเฉพาะค่า publicId ให้เป็นค่าที่พิมพ์ในช่อง input
            className="
              p-3 rounded-lg bg-neutral-900
              border border-neutral-700 text-white
              focus:ring-2 focus:ring-gray-400
            "
          />
        </div>

        {/* อัปโหลดรูป */}
        <div className="mt-8">
          <p className="text-gray-400 text-sm mb-2">
            อัปโหลดภาพหลัก (1077×311 — ภาพเต็ม ไม่ครอป)
          </p>

          <input
            type="file"
            onChange={handleUpload}
            accept="image/*"
            className="
              block mx-auto w-72
              text-sm text-gray-200
              file:mr-3 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:font-semibold
              file:bg-white/10 file:text-white
              hover:file:bg-white/20
              transition
            "
          />

          {/* Preview ภาพ */}
          {newCar.image && (
            <div className="mt-6 flex justify-center" ref={imageRef}>
              <img
                src={newCar.image}
                alt="Car Preview"
                className="
                  w-full max-w-3xl
                  rounded-xl
                  border border-neutral-700
                  shadow-lg
                "
              />
            </div>
          )}
        </div>

        {/* ปุ่มเพิ่ม / รีเซ็ต */}
        <div className="mt-10 flex flex-col md:flex-row justify-center gap-6">

          {/* ปุ่มเพิ่มรถ */}
          <button
            onClick={handleAddCar}
            className="
              bg-white hover:bg-gray-200
              text-black
              px-10 py-4
              rounded-xl
              text-xl font-bold
              tracking-wider
              shadow-lg shadow-gray-700/40
              transition
            "
          >
            ➕ เพิ่มรถใหม่
          </button>

          {/* ปุ่มรีเซ็ต */}
          <button
            onClick={handleReset}
            className="
              bg-red-600 hover:bg-red-700
              text-white
              px-10 py-4
              rounded-xl
              text-xl font-bold
              tracking-wider
              shadow-lg shadow-red-800/40
              transition
            "
          >
            🔄 รีเซ็ตเป็นค่าเริ่มต้น
          </button>
        </div>

        {/* รายการรถทั้งหมด */}
        <div className="mt-16 text-left">
          <h2 className="
              text-3xl font-bold
              mb-6 text-gray-200
              border-l-4 border-gray-400 pl-3
          ">
            รายการรถทั้งหมด
          </h2>

          <ul className="space-y-3">
            {cars.map((c) => (
              <li
                key={c.publicId}
                className="
                  flex justify-between items-center
                  bg-neutral-900
                  border border-neutral-700
                  p-4 rounded-xl
                  hover:border-white
                  transition
                "
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

                {/* ปุ่มลบ */}
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
