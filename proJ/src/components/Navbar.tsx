import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-white shadow z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <Link to="/" className="font-bold text-xl text-black">
          Lamborghini
        </Link>
        <div className="flex gap-6">
          <Link to="/" className="hover:text-yellow-600">
            Home
          </Link>
          <Link to="/models" className="hover:text-yellow-600">
            Models
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
