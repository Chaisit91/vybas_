import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

interface Admin {
  id: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const from = (location.state as any)?.from?.pathname || "/admin";

  const admins: Admin[] = [
    { id: "admin", password: "123" },
    { id: "superadmin", password: "999" },
    { id: "manager", password: "555" },
  ];

  const handleLogin = () => {
    const found = admins.find((a) => a.id === userId && a.password === password);

    if (found) {
      localStorage.setItem("isAdmin", "true");
      localStorage.setItem("adminId", found.id);
      window.dispatchEvent(new Event("admin-login"));
      navigate(from, { replace: true });
    } else {
      alert("❌ รหัสผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white font-sans">
      <div className="bg-gray-950/70 backdrop-blur-md border border-gray-700 shadow-2xl rounded-3xl p-10 w-[90%] max-w-md transition-all duration-300">
        <h1 className="text-3xl font-extrabold text-center mb-6 tracking-wide text-white">
          🔐 Admin Login
        </h1>

        <input
          type="text"
          placeholder="กรอกรหัสผู้ใช้ (ID)"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full px-4 py-3 mb-4 rounded-xl bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <input
          type="password"
          placeholder="กรอกรหัสผ่าน"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 mb-6 rounded-xl bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <button
          onClick={handleLogin}
          className="w-full py-3 bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 hover:from-blue-700 hover:to-blue-500 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
        >
          เข้าสู่ระบบ
        </button>

        <div className="mt-6 border-t border-gray-700 opacity-50"></div>
        <p className="text-center text-gray-400 text-sm mt-4">
          *สำหรับผู้ดูแลระบบเท่านั้น*
        </p>
      </div>
    </div>
  );
}
