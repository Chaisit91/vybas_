import { useState } from "react"; 
import { uploadImageToCloudinary } from "../services/cloudinary"; 
import { addOptionToCar, deleteOptionFromCar } from "../services/carOptionsService"; 
// ฟังก์ชันเพิ่มและลบของแต่งสำหรับรถแต่ละคัน

export default function CustomizationAdmin() {
  const [carId, setCarId] = useState(""); 
  // เก็บ Car ID ของรถที่จะเพิ่ม/ลบของแต่ง

  const [category, setCategory] = useState<"colors" | "wheels" | "spoilers">("colors"); 
  // เก็บหมวดหมู่ของแต่ง พร้อมกำหนดประเภทให้เป็นหนึ่งในสามตัวเลือก

  const [optionName, setOptionName] = useState(""); 
  // ชื่อของตัวเลือกของแต่งที่กำลังเพิ่มหรือลบ

  const [image, setImage] = useState<string | null>(null); 
  // เก็บ URL รูปภาพหลังอัปโหลดเสร็จ (หรือ null หากยังไม่มี)


  //  ฟังก์ชันอัปโหลดภาพขึ้น Cloudinary
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; 
    // หยิบไฟล์แรกที่ผู้ใช้เลือก (ถ้ามี)

    if (!file) return; 
    // ถ้าไม่ได้เลือกไฟล์อะไร  หยุดทำงาน

    const url = await uploadImageToCloudinary(file); 
    // อัปโหลดไฟล์ขึ้น Cloudinary และรับ URL กลับมา

    if (url) setImage(url); 
    // ถ้าอัปโหลดสำเร็จ  เก็บ URL ไว้ใน state เพื่อนำไปใช้งาน
  };

  //  ฟังก์ชันเพิ่มของแต่งเข้ารถ
  const handleAdd = () => {
    if (!carId || !optionName || !image) {
      // ตรวจสอบว่ามีข้อมูลจำเป็นครบหรือไม่
      alert("⚠️ กรุณากรอกข้อมูลให้ครบก่อนเพิ่ม");
      return;
    }

    addOptionToCar(carId, category, { name: optionName, image });
    // เพิ่มข้อมูลของแต่งไปยังรถด้วย service

    alert(`✅ เพิ่ม ${category} '${optionName}' ให้รถ ${carId} สำเร็จ!`);
    // แจ้งเตือนสำเร็จ

    window.dispatchEvent(new Event("carOptionsUpdated"));
    // ส่ง event ให้ component อื่นรับรู้ว่า database เปลี่ยน (ใช้เหมือนกระตุกให้ reload)

    setOptionName(""); 
    // เคลียร์ชื่อของแต่ง

    setImage(null);
    // เคลียร์รูปภาพหลังเพิ่มสำเร็จ
  };


  //  ฟังก์ชันลบของแต่งออกจากรถ
  const handleDeleteOption = () => {
    if (!carId || !optionName) {
      // ต้องมี Car ID + ชื่อของแต่ง
      alert("⚠️ กรุณากรอกรหัสรถและชื่อของแต่งที่ต้องการลบ");
      return;
    }

    if (!confirm(`แน่ใจหรือไม่ว่าต้องการลบ "${optionName}" จากหมวด ${category}?`)) return;
    // กล่องยืนยันความต้องการลบ

    deleteOptionFromCar(carId, category, optionName);
    // ลบตัวเลือกจากข้อมูลรถ

    window.dispatchEvent(new Event("carOptionsUpdated"));
    // แจ้ง component อื่นให้รีเฟรชข้อมูล

    alert(`🗑️ ลบของแต่ง '${optionName}' ออกจาก ${category} ของรถ ${carId} แล้ว`);
    // แจ้งเตือนสำเร็จ

    setOptionName(""); 
    // เคลียร์ค่า input

    setImage(null);
    // ล้างรูปภาพ
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10">
      {/* ตัว container หลัก */}
      <div className="bg-[#0a0f1a] border border-rgba(255, 255, 255, 0.8) rounded-3xl p-10 shadow-[0_0_40px_rgba(30,58,138,0.4)] w-full max-w-xl">
        
        <h1 className="text-3xl font-bold mb-8 text-center text-[#f0f1f1]">
          จัดการของแต่งรถ
        </h1>

        <div className="space-y-6">
          
          {/* Input Car ID */}
          <div>
            <label className="block mb-2 text-gray-300">Car ID:</label>

            <input
              type="text"
              value={carId} 
              onChange={(e) => setCarId(e.target.value)} 
              className="w-full bg-[#111827] border border-[#1e3a8a]/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#eaecec]"/>
              {/* เมื่อผู้ใช้พิมพ์ → อัปเดต carId */}
          </div>

          {/* เลือกหมวดหมู่ของแต่ง */}
          <div>
            <label className="block mb-2 text-gray-300">Category:</label>

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as "colors" | "wheels" | "spoilers")
                // แปลงค่า string เป็น union type ที่กำหนดไว้
              }
              className="w-full bg-[#111827] border border-[#1e3a8a]/30 rounded-lg px-4 py-2">
              <option value="colors">Colors</option>
              <option value="wheels">Wheels</option>
              <option value="spoilers">Spoilers</option>
            </select>
          </div>

          {/* Input option name */}
          <div>
            <label className="block mb-2 text-gray-300">Option Name:</label>
            <input
              type="text"
              value={optionName}
              onChange={(e) => setOptionName(e.target.value)}
              className="w-full bg-[#111827] border border-[#1e3a8a]/30 rounded-lg px-4 py-2"/>
          </div>

          {/* Upload Image */}
          <div>
            <label className="block mb-2 text-gray-300">Upload Image:</label>

            <input type="file" onChange={handleUpload} className="w-full" />
            {/* เมื่อเลือกไฟล์  handleUpload จะทำงาน */}

            {image && (
              <img
                src={image}
                alt="preview"
                className="w-full h-60 object-contain mt-4 rounded-xl border border-[#1e3a8a]/30"/>
            )}
          </div>

          {/* ปุ่มเพิ่มหรือลบ */}
          <div className="flex justify-between pt-6 border-t border-[#1e3a8a]/30">
            <button
              onClick={handleAdd}
              className="px-6 py-3 bg-[#0a1444] hover:bg-[#13235f] rounded-lg font-semibold shadow-[0_0_25px_rgba(10,20,68,0.6)] transition">
              เพิ่มของแต่ง
            </button>

            <button
              onClick={handleDeleteOption}
              className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition">
              ลบของแต่งนี้
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
