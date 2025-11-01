import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <nav className="fixed top-0 w-full bg-white shadow z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <Link to="/" className="font-bold text-xl text-black">
          Custom <span className="text-yellow-500">CAR</span>
        </Link>

        <div className="flex gap-6 items-center">
          <Link to="/" className="hover:text-yellow-600">
            Home
          </Link>
          <Link to="/models" className="hover:text-yellow-600">
            Models
          </Link>
          <Link to="/about" className="hover:text-yellow-600">
            About
          </Link>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-1 rounded font-semibold hover:bg-red-600 transition"
            >
              Logout
            </button>
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
};

export default Navbar;
