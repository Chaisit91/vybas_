import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin") === "true");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const checkAdmin = () => setIsAdmin(localStorage.getItem("isAdmin") === "true");
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
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-sm transition-all duration-500">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">
        {/* LOGO */}
        <Link to="/" className="text-3xl font-black text-white tracking-tight">
          CUSTOM CAR<span className="text-red-500">.</span>
        </Link>

        {/* LINKS */}
        <div className="flex items-center gap-8 text-gray-300 text-sm font-medium">
          <Link to="/" className="hover:text-white transition-all">
            HOME
          </Link>
          <Link to="/models" className="hover:text-white transition-all">
            MODELS
          </Link>
          <Link to="/about" className="hover:text-white transition-all">
            ABOUT
          </Link>

          {/* LOGIN / ADMIN */}
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
                className="flex items-center gap-1 px-4 py-1 text-white font-semibold hover:bg-white hover:text-black rounded-full transition-all"
              >
                👑 ADMIN <ChevronDown size={16} />
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
