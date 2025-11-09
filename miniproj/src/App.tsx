import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Skill from "./pages/Skill";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { FaHome, FaUser, FaCode } from "react-icons/fa";

function Navigation() {
  const location = useLocation();
  const linkClass = (path: string) =>
    `flex items-center gap-2 px-3 py-2 rounded-md transition-all ${
      location.pathname === path
        ? "bg-purple-600 text-white shadow-md"
        : "text-gray-300 hover:text-white hover:bg-purple-800/40"
    }`;

  return (
    <NavigationMenu.Root className="fixed top-0 w-full bg-gradient-to-r from-gray-900 to-gray-800 border-b border-purple-700 shadow-lg flex justify-center py-3 z-50">
      <NavigationMenu.List className="flex gap-6">
        <NavigationMenu.Item>
          <Link to="/" className={linkClass("/")}>
            <FaHome /> หน้าหลัก
          </Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <Link to="/profile" className={linkClass("/profile")}>
            <FaUser /> งานอดิเรก
          </Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <Link to="/skills" className={linkClass("/skills")}>
            <FaCode /> ทักษะ
          </Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 text-gray-200">
        <Navigation />
        <div className="pt-20 px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/skills" element={<Skill />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
