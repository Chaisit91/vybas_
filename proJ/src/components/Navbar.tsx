import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react"; // 👈 เพิ่มไอคอน hamburger และ close

export default function Navbar() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [adminId, setAdminId] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false); // 👈 สำหรับ mobile menu

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

  const handleLogout = () => {
    try {
      localStorage.clear();
      window.dispatchEvent(new Event("admin-logout"));
      setIsAdmin(false);
      setAdminId("");
      setMenuOpen(false);
      setIsMobileMenuOpen(false);
      navigate("/login", { replace: true });
      setTimeout(() => {
        window.location.href = "/login";
      }, 100);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-sm transition-all duration-500">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* LOGO */}
        <Link to="/" className="text-3xl font-black text-white tracking-tight">
          CUSTOM CAR<span className="text-red-500">.</span>
        </Link>

        {/* ปุ่ม Hamburger (แสดงเฉพาะมือถือ) */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* เมนูหลัก (ซ่อนใน mobile) */}
        <div className="hidden md:flex items-center gap-8 text-gray-300 text-sm font-medium">
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

      {/* เมนูมือถือ (แสดงเมื่อกด hamburger) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md border-t border-white/10 px-6 py-4 flex flex-col space-y-4 text-gray-200 text-base font-medium">
          <Link to="/" className="hover:text-white transition-all" onClick={() => setIsMobileMenuOpen(false)}>HOME</Link>
          <Link to="/models" className="hover:text-white transition-all" onClick={() => setIsMobileMenuOpen(false)}>MODELS</Link>
          <Link to="/about" className="hover:text-white transition-all" onClick={() => setIsMobileMenuOpen(false)}>ABOUT</Link>

          {!isAdmin ? (
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white font-semibold px-4 py-2 bg-red-600 rounded-full text-center hover:bg-red-700 transition-all"
            >
              LOGIN
            </Link>
          ) : (
            <>
              <Link
                to="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 text-center"
              >
                ⚙️ Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-700 rounded-lg hover:bg-red-600 text-white"
              >
                🚪 Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
