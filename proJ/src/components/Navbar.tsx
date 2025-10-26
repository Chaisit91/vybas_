import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="fixed top-0 w-full bg-white shadow z-50">
    <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
      <Link to="/" className="font-bold text-xl text-black">Custom CAR</Link>
      <div className="flex gap-6">
        <Link to="/" className="hover:text-yellow-600">Home</Link>
        <Link to="/models" className="hover:text-yellow-600">Models</Link>
        {/* <Link to="/custom-car" className="hover:text-yellow-600">Custom Car</Link> */}
        <Link to="/about" className="hover:text-yellow-600">About</Link>
      </div>
    </div>
  </nav>
);

export default Navbar;