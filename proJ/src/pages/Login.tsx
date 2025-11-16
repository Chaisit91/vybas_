import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

// สร้าง interface สำหรับข้อมูลผู้ดูแลระบบ
interface Admin {
  id: string; 
  password: string; 
}

// component หลักของหน้า Login
export default function Login() {
  // hook ใช้เปลี่ยนเส้นทางไปหน้าอื่น
  const navigate = useNavigate();
  // hook ใช้ดึงข้อมูล state ที่ส่งมาจากหน้าอื่น
  const location = useLocation();

  // state เก็บค่าที่กรอกในช่อง ID
  const [userId, setUserId] = useState<string>("");
  // state เก็บค่าที่กรอกในช่อง Password
  const [password, setPassword] = useState<string>("");

  // ถ้าก่อนหน้านี้ถูก redirect จากหน้า admin ให้กลับไปหน้านั้นหลัง login สำเร็จ
  const from = (location.state as any)?.from?.pathname || "/admin";

  // รายชื่อ admin ทั้งหมด ที่ใช้ตรวจสอบล็อกอิน
  const admins: Admin[] = [
    { id: "admin", password: "123" },
    { id: "superadmin", password: "999" },
    { id: "manager", password: "555" },
  ];

  // ฟังก์ชันกดปุ่มเข้าสู่ระบบ
  const handleLogin = () => {
    // ตรวจสอบว่ามีผู้ใช้ที่กรอก ID และ Password ตรงกันไหม
    const found = admins.find((a) => a.id === userId && a.password === password);

    if (found) {
      // ถ้าพบ → บันทึกสถานะว่าเป็น admin ไว้ใน localStorage
      localStorage.setItem("isAdmin", "true");
      localStorage.setItem("adminId", found.id);

      // ส่ง event แจ้งว่ามีการ login
      window.dispatchEvent(new Event("admin-login"));

      // ส่งไปหน้าเดิมที่ต้องการเข้าก่อนหน้านี้
      navigate(from, { replace: true });
    } else {
      // ถ้าไม่พบ  แจ้งเตือนว่าข้อมูลผิด
      alert("❌ รหัสผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  // ส่วน UI
  return (
    // กล่องใหญ่พื้นหลัง gradient
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white font-sans">

      {/* กล่องฟอร์ม login */}
      <div className="bg-gray-950/70 backdrop-blur-md border border-gray-700 shadow-2xl rounded-3xl p-10 w-[90%] max-w-md transition-all duration-300">

        {/* หัวข้อ login */}
        <h1 className="text-3xl font-extrabold text-center mb-6 tracking-wide text-white">
          🔐 Admin Login
        </h1>

        {/* ช่องกรอก ID */}
        <input
          type="text"
          placeholder="กรอกรหัสผู้ใช้ (ID)"
          value={userId}                     // ค่าใน input
          onChange={(e) => setUserId(e.target.value)} // เปลี่ยนค่าเมื่อพิมพ์
          className="w-full px-4 py-3 mb-4 rounded-xl bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        {/* ช่องกรอกรหัสผ่าน */}
        <input
          type="password"
          placeholder="กรอกรหัสผ่าน"
          value={password}                         // ค่าใน input
          onChange={(e) => setPassword(e.target.value)} // เปลี่ยนค่าเมื่อพิมพ์
          className="w-full px-4 py-3 mb-6 rounded-xl bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        {/* ปุ่มเข้าสู่ระบบ */}
        <button
          onClick={handleLogin} // เมื่อคลิกให้เช็คข้อมูล
          className="w-full py-3 bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 hover:from-blue-700 hover:to-blue-500 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
        >
          เข้าสู่ระบบ
        </button>

        {/* ส่วนข้อความด้านล่าง */}
        <div className="mt-6 border-t border-gray-700 opacity-50"></div>
        <p className="text-center text-gray-400 text-sm mt-4">
          *สำหรับผู้ดูแลระบบเท่านั้น*
        </p>
      </div>
    </div>
  );
}
