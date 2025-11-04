import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") === "true"
  );
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const checkAdmin = () => {
      const loggedIn = localStorage.getItem("isAdmin") === "true";
      setIsAdmin(loggedIn);
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
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
    setMenuOpen(false);
    window.dispatchEvent(new Event("admin-logout"));
    navigate("/login");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-black via-[#0a0f1a] to-[#111827] border-b border-[#00eaff]/10 shadow-[0_0_25px_rgba(0,0,0,0.8)] backdrop-blur-md transition-all duration-500">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          {/* LOGO */}
          <Link
            to="/"
            className="text-2xl font-extrabold flex items-center gap-2 tracking-wider text-[#00eaff] drop-shadow-[0_0_6px_#00eaff] hover:drop-shadow-[0_0_12px_#00eaff] transition-all"
          >
            🚗 <span className="text-gray-200">Custom</span>
            <span className="text-[#00eaff]">CAR</span>
          </Link>

          {/* LINKS */}
          <div className="flex gap-8 items-center font-medium text-gray-300">
            <Link
              to="/"
              className="relative group hover:text-white transition"
            >
              Home
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#00eaff] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/models"
              className="relative group hover:text-white transition"
            >
              Models
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#00eaff] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/about"
              className="relative group hover:text-white transition"
            >
              About
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#00eaff] group-hover:w-full transition-all duration-300"></span>
            </Link>

            {/* LOGIN / ADMIN */}
            {!isAdmin ? (
              <Link
                to="/login"
                className="px-5 py-2 rounded-md font-semibold text-black bg-[#00eaff] hover:bg-[#00cfe6] shadow-[0_0_25px_rgba(0,234,255,0.4)] hover:shadow-[0_0_35px_rgba(0,234,255,0.6)] transition-all"
              >
                Login
              </Link>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-2 px-5 py-2 rounded-md font-semibold text-[#00eaff] bg-[#111827]/70 border border-[#00eaff]/20 hover:border-[#00eaff]/50 shadow-[inset_0_0_10px_rgba(0,234,255,0.15)] hover:shadow-[0_0_20px_rgba(0,234,255,0.4)] transition-all"
                >
                  👑 Admin <ChevronDown size={18} />
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 bg-[#0a0f1a] border border-[#00eaff]/20 rounded-lg shadow-[0_0_20px_rgba(0,234,255,0.15)] w-52 text-left z-50 backdrop-blur-md overflow-hidden">
                    <Link
                      to="/admin"
                      className="block px-4 py-2 text-gray-200 hover:bg-[#00eaff]/10 hover:text-[#00eaff] transition"
                      onClick={() => setMenuOpen(false)}
                    >
                      ⚙️ Admin Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-400 hover:bg-[#111827] hover:text-red-300 transition"
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

      {/* OFFSET — กันเนื้อหาทับ Navbar */}
      <div className="h-[72px]" />
    </>
  );
}
