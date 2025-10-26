import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="fixed top-0 w-full bg-white shadow z-50">
    <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
      <Link to="/" className="font-bold text-xl text-black">Custom CAR</Link>
      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:text-yellow-600">Home</Link>
        <Link to="/models" className="hover:text-yellow-600">Models</Link>
        <Link to="/about" className="hover:text-yellow-600">About</Link>
        {/* เพิ่มปุ่ม Login */}
        <Link
          to="/login"
          className="bg-yellow-500 text-black px-4 py-1 rounded font-semibold hover:bg-yellow-600 transition"
        >
          Login
        </Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
