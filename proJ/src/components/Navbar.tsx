import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [adminId, setAdminId] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  // ✅ ตรวจค่าใน localStorage ทุกครั้งที่ component โหลด
  useEffect(() => {
    const checkAdmin = () => {
      const adminStatus = localStorage.getItem("isAdmin") === "true";
      const adminName = localStorage.getItem("adminId") || "";
      setIsAdmin(adminStatus);
      setAdminId(adminName);
    };

    checkAdmin();
    window.addEventListener("admin-login", checkAdmin);
    window.addEventListener("admin-logout", checkAdmin);

    return () => {
      window.removeEventListener("admin-login", checkAdmin);
      window.removeEventListener("admin-logout", checkAdmin);
    };
  }, []);

  // ✅ ฟังก์ชัน Logout แบบ “ล้างทุกอย่างแน่นอน”
  const handleLogout = () => {
    try {
      // ล้างข้อมูลใน localStorage ทั้งหมด
      localStorage.clear();

      // แจ้ง event logout ให้ component อื่นอัปเดต
      window.dispatchEvent(new Event("admin-logout"));

      // เคลียร์ state ภายใน React
      setIsAdmin(false);
      setAdminId("");
      setMenuOpen(false);

      // นำทางไปหน้า login
      navigate("/login", { replace: true });

      // ✅ รีเฟรชหน้าใหม่ หลัง navigate เสร็จ (หน่วงเล็กน้อยให้ router ทัน)
      setTimeout(() => {
        window.location.href = "/login"; // ใช้ href เพื่อเคลียร์ cache React ทั้งหมด
      }, 100);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-sm transition-all duration-500">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">
        <Link to="/" className="text-3xl font-black text-white tracking-tight">
          CUSTOM CAR<span className="text-red-500">.</span>
        </Link>

        <div className="flex items-center gap-8 text-gray-300 text-sm font-medium">
          <Link to="/" className="hover:text-white transition-all">HOME</Link>
          <Link to="/models" className="hover:text-white transition-all">MODELS</Link>
          <Link to="/about" className="hover:text-white transition-all">ABOUT</Link>

          {!isAdmin ? (
            <Link
              to="/login"
              className="text-white font-semibold px-4 py-1 hover:bg-white hover:text-black rounded-full transition-all"
            >
              LOGIN
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 px-4 py-1 text-white font-semibold hover:bg-white hover:text-black rounded-full transition-all"
              >
                👑 {adminId.toUpperCase()} <ChevronDown size={16} />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-black/90 border border-white/10 rounded-lg overflow-hidden backdrop-blur-md">
                  <Link
                    to="/admin"
                    className="block px-4 py-2 text-gray-200 hover:bg-white/10"
                    onClick={() => setMenuOpen(false)}
                  >
                    ⚙️ Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-400 hover:bg-white/10"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
