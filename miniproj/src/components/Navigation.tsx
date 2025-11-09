import { Link, useLocation } from "react-router-dom";
import { Home, User } from "react-feather";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";

export default function Navigation() {
  const location = useLocation();

  const linkClass = (path: string) =>
    `flex items-center gap-2 px-3 py-2 rounded-md transition ${
      location.pathname === path
        ? "bg-blue-600 text-white"
        : "hover:bg-blue-100 text-gray-700"
    }`;

  return (
    <NavigationMenu.Root className="fixed top-0 w-full bg-blue-50 border-b border-blue-200 shadow-sm flex justify-center py-2">
      <NavigationMenu.List className="flex gap-4">
        <NavigationMenu.Item>
          <Link to="/" className={linkClass("/")}>
            <Home size={16} /> หน้าหลัก
          </Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <Link to="/profile" className={linkClass("/profile")}>
            <User size={16} /> งานอดิเรก
          </Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
