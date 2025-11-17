import { Link, useNavigate } from "react-router-dom"; 
// ใช้ Link สำหรับลิงก์ภายในเว็บ และ useNavigate สำหรับเปลี่ยนหน้า

import { useEffect, useState } from "react";
// useState = สร้างตัวแปรเก็บสถานะ, useEffect = ทำงานตอนโหลด component

import { ChevronDown, Menu, X } from "lucide-react"; 
// นำเข้าไอคอนเมนู, ปิดเมนู, ลูกศรสำหรับ dropdown

export default function Navbar() {
  const navigate = useNavigate(); // ใช้เปลี่ยนหน้าเวลาทำ logout

  const [isAdmin, setIsAdmin] = useState<boolean>(false); 
  // เก็บสถานะว่าเป็น admin ไหม

  const [adminId, setAdminId] = useState<string>(""); 
  // เก็บชื่อหรือ ID ของ admin

  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  // เปิด/ปิด dropdown เมนูตอนเป็น admin

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  // เปิด/ปิดเมนูสำหรับมือถือ

  useEffect(() => {
    // ตรวจสอบว่ามีข้อมูล admin ใน localStorage ไหม
    const checkAdmin = () => {
      const adminStatus = localStorage.getItem("isAdmin") === "true";
      const adminName = localStorage.getItem("adminId") || "";
      setIsAdmin(adminStatus);
      setAdminId(adminName);
    };

    // ตรวจตอน component ถูกสร้าง
    checkAdmin();

    // ฟัง event login/logout จาก component อื่น
    window.addEventListener("admin-login", checkAdmin);
    window.addEventListener("admin-logout", checkAdmin);

    return () => {
      // ล้าง event listener ตอน component หายไป
      window.removeEventListener("admin-login", checkAdmin);
      window.removeEventListener("admin-logout", checkAdmin);
    };
  }, []);

  const handleLogout = () => {
    try {
      localStorage.clear(); // ล้างข้อมูลใน localStorage
      window.dispatchEvent(new Event("admin-logout")); // แจ้งเตือน component อื่นว่ามีการ logout

      setIsAdmin(false);
      setAdminId("");
      setMenuOpen(false);
      setIsMobileMenuOpen(false);

      navigate("/login", { replace: true }); // เปลี่ยนหน้าไป login
      setTimeout(() => {
        window.location.href = "/login"; // สำรองกัน router ไม่ทำงาน
      }, 100);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-sm transition-all duration-500">  {/* ลอยบนสุด กว้างเต็ม จัดเลเยอร์  ,  โปร่งใส , เบลอพื้นหลัง ,  ลื่นเวลามี effect */}
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4"> {/* กึ่งกลาง + กว้างสุด 7xl ,  จัด layout ชิดซ้าย-ขวา + ตรงกลางแนวตั้ง , ระยะห่างรอบตัว */}
        
        {/* โลโก้ */}
        <Link to="/" className="text-3xl font-black text-white tracking-tight">
          CUSTOM CAR
        </Link>

        {/* ปุ่มเมนูสำหรับมือถือ */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* เมนูสำหรับ Desktop */}
        <div className="hidden md:flex items-center gap-8 text-gray-300 text-sm font-medium">
          <Link to="/" className="hover:text-white transition-all">HOME</Link>
          <Link to="/models" className="hover:text-white transition-all">MODELS</Link>
          <Link to="/about" className="hover:text-white transition-all">ABOUT</Link>

          {/* ถ้ายังไม่ได้ login โชว์ปุ่ม Login */}
          {!isAdmin ? (
            <Link
              to="/login"
              className="text-white font-semibold px-4 py-1 hover:bg-white hover:text-black rounded-full transition-all">
              LOGIN
            </Link>
          ) : (
            <div className="relative">
              {/* ปุ่มเปิด dropdown admin */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 px-4 py-1 text-white font-semibold hover:bg-white hover:text-black rounded-full transition-all">
                {adminId.toUpperCase()} <ChevronDown size={16} />
              </button>

              {/* กล่องเมนู dropdown */}
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-black/90 border border-white/10 rounded-lg overflow-hidden backdrop-blur-md">
                  <Link
                    to="/admin"
                    className="block px-4 py-2 text-gray-200 hover:bg-white/10"
                    onClick={() => setMenuOpen(false)}>
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-400 hover:bg-white/10">
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* เมนูมือถือ */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md border-t border-white/10 px-6 py-4 flex flex-col space-y-4 text-gray-200 text-base font-medium">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white">HOME</Link>
          <Link to="/models" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white">MODELS</Link>
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white">ABOUT</Link>

          {/* เมนูตอนยังไม่ login */}
          {!isAdmin ? (
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white font-semibold px-4 py-2 bg-red-600 rounded-full text-center hover:bg-red-700">
              LOGIN
            </Link>
          ) : (
            <>
              <Link
                to="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 text-center">
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-700 rounded-lg hover:bg-red-600 text-white">
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
