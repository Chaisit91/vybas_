import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

function Navbar() {
  // ใช้สำหรับเปลี่ยนหน้าแบบ programmatically
  const navigate = useNavigate();

  // State เก็บสถานะว่าเป็นแอดมินไหม
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // เก็บชื่อแอดมิน (adminId)
  const [adminId, setAdminId] = useState<string>("");

  // ใช้เปิด/ปิดเมนู Dropdown ของแอดมิน (เฉพาะ Desktop)
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  // ใช้เปิด/ปิดเมนู Mobile (Hamburger menu)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // โหลดสถานะแอดมินจาก localStorage ทุกครั้งที่เปิดเว็บ
  useEffect(() => {
    const checkAdmin = () => {
      // เช็คว่ามี isAdmin=true ใน localStorage หรือไม่
      const adminStatus = localStorage.getItem("isAdmin") === "true";

      // ดึงชื่อแอดมิน
      const adminName = localStorage.getItem("adminId") || "";

      // อัปเดตเข้า state
      setIsAdmin(adminStatus);
      setAdminId(adminName);
    };

    // เรียกครั้งแรกตอนโหลดหน้า
    checkAdmin();

    // ฟัง event "admin-login" และ "admin-logout" จากหน้าอื่น
    window.addEventListener("admin-login", checkAdmin);
    window.addEventListener("admin-logout", checkAdmin);

    // Cleanup เมื่อ component ถูกถอดออก
    return () => {
      window.removeEventListener("admin-login", checkAdmin);
      window.removeEventListener("admin-logout", checkAdmin);
    };
  }, []);

  // ฟังก์ชันออกจากระบบ
  const handleLogout = () => {
    try {
      // ลบเฉพาะข้อมูลของแอดมินจาก localStorage
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("adminId");

      // ส่ง event ให้ component อื่นรู้ว่า logout แล้ว
      window.dispatchEvent(new Event("admin-logout"));

      // รีเซ็ตสถานะภายใน Navbar
      setIsAdmin(false);
      setAdminId("");
      setMenuOpen(false);
      setIsMobileMenuOpen(false);

      // เปลี่ยนหน้าไปหน้าแรก
      navigate("/", { replace: true });

      // รีเฟรชหน้าเพื่อให้รีเซ็ตข้อมูลทั้งหมด 100%
      setTimeout(() => {
        window.location.href = "/";
      }, 50);

    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    // Navbar ลอยด้านบน ใช้ backdrop blur ให้โปร่งใส
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-sm transition-all duration-500">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        {/* Logo */}
        <Link to="/" className="text-3xl font-black text-white tracking-tight">
          CUSTOM CAR
        </Link>

        {/* ปุ่มเปิดเมนูมือถือ (Hamburger) */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {/* ถ้าเมนูเปิดให้แสดง X ถ้ายังไม่เปิดให้โชว์ ≡ */}
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* เมนู Desktop */}
        <div className="hidden md:flex items-center gap-8 text-gray-300 text-sm font-medium">

          {/* ลิงก์ไปหน้า HOME */}
          <Link to="/" className="hover:text-white transition-all">HOME</Link>

          {/* ลิงก์ไปหน้า MODELS */}
          <Link to="/models" className="hover:text-white transition-all">MODELS</Link>

          {/* ลิงก์ไปหน้า ABOUT */}
          <Link to="/about" className="hover:text-white transition-all">ABOUT</Link>

          {/* ถ้ายังไม่ login จะโชว์ปุ่ม LOGIN */}
          {!isAdmin ? (
            <Link
              to="/login"
              className="text-white font-semibold px-4 py-1 hover:bg-white hover:text-black rounded-full transition-all"
            >
              LOGIN
            </Link>
          ) : (
            // ถ้า login แล้วให้โชว์ Dropdown Admin
            <div className="relative">

              {/* ปุ่มชื่อ Admin + กดเปิด dropdown */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 px-4 py-1 text-white font-semibold hover:bg-white hover:text-black rounded-full transition-all"
              >
                {adminId.toUpperCase()} <ChevronDown size={16} />
              </button>

              {/* เมนู Dropdown */}
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-black/90 border border-white/10 rounded-lg overflow-hidden backdrop-blur-md">

                  {/* ลิงก์ไปหน้า Dashboard */}
                  <Link
                    to="/admin"
                    className="block px-4 py-2 text-gray-200 hover:bg-white/10"
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </Link>

                  {/* ปุ่ม Logout */}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-400 hover:bg-white/10"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* เมนูสำหรับมือถือ */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md border-t border-white/10 px-6 py-4 flex flex-col space-y-4 text-gray-200 text-base font-medium">

          {/* ลิงก์ต่างๆ */}
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white">HOME</Link>

          <Link to="/models" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white">MODELS</Link>

          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white">ABOUT</Link>

          {/* ถ้าไม่ใช่แอดมิน แสดงปุ่ม LOGIN */}
          {!isAdmin ? (
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white font-semibold px-4 py-2 bg-red-600 rounded-full text-center hover:bg-red-700"
            >
              LOGIN
            </Link>
          ) : (
            <>
              {/* ไป Dashboard */}
              <Link
                to="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 text-center"
              >
                Dashboard
              </Link>

              {/* ปุ่ม Logout */}
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-700 rounded-lg hover:bg-red-600 text-white"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
