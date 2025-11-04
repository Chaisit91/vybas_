import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react"; // ใช้ icon สวยๆ จาก lucide-react

export default function Navbar() {
  const navigate = useNavigate();

  // ✅ ตรวจสอบสถานะจาก localStorage ทันทีตอนโหลด
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") === "true"
  );

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const checkAdmin = () => {
      const loggedIn = localStorage.getItem("isAdmin") === "true";
      setIsAdmin(loggedIn);
    };

    // ✅ ตรวจสอบทันทีตอน mount
    checkAdmin();

    // ✅ ฟัง event login/logout เพื่ออัปเดต Navbar ทันที
    window.addEventListener("admin-login", checkAdmin);
    window.addEventListener("admin-logout", checkAdmin);

    return () => {
      window.removeEventListener("admin-login", checkAdmin);
      window.removeEventListener("admin-logout", checkAdmin);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
    setMenuOpen(false);
    window.dispatchEvent(new Event("admin-logout")); // แจ้งให้ component อื่นรู้ว่าล็อกเอาท์แล้ว
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white text-black shadow-md z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold flex items-center gap-1">
          🚗 <span className="text-yellow-500">CustomCAR</span>
        </Link>

        {/* NAV LINKS */}
        <div className="flex gap-6 items-center font-medium">
          <Link to="/" className="hover:text-yellow-600 transition">
            Home
          </Link>
          <Link to="/models" className="hover:text-yellow-600 transition">
            Models
          </Link>
          <Link to="/about" className="hover:text-yellow-600 transition">
            About
          </Link>

          {/* ✅ ถ้ายังไม่ login → แสดงปุ่ม Login */}
          {!isAdmin ? (
            <Link
              to="/login"
              className="bg-yellow-500 text-black px-4 py-1 rounded font-semibold hover:bg-yellow-600 transition"
            >
              Login
            </Link>
          ) : (
            // ✅ ถ้า login แล้ว → แสดง dropdown
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-1 rounded font-semibold hover:bg-yellow-200 transition"
              >
                👋 สวัสดี Admin <ChevronDown size={18} />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-48 text-left z-50">
                  <Link
                    to="/admin"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    ⚙️ Admin Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
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