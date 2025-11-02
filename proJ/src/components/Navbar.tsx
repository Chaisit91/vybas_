import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/login"); // ✅ เด้งไปหน้า login หลัง logout
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white text-black shadow-md z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        <Link to="/" className="text-2xl font-bold">
          🚗 <span className="text-yellow-500">CustomCAR</span>
        </Link>

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

          {isAdmin ? (
            <>
              <Link
                to="/admin"
                className="hover:text-yellow-600 transition"
              >
                Admin
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-1 rounded font-semibold hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-yellow-500 text-black px-4 py-1 rounded font-semibold hover:bg-yellow-600 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
