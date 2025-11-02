import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState("");

  // ถ้ามีเส้นทางที่ถูกกันไว้ก่อนหน้า → จะกลับไปที่นั่นหลังล็อกอิน
  const from = location.state?.from?.pathname || "/admin";

  const handleLogin = () => {
    if (password === "123") {
      localStorage.setItem("isAdmin", "true");
      navigate(from, { replace: true });
    } else {
      alert("รหัสผ่านไม่ถูกต้อง ❌");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-80">
        <h1 className="text-xl font-bold mb-4 text-center">🔐 Admin Login</h1>
        <input
          type="password"
          placeholder="กรอกรหัสผ่าน"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border w-full p-2 mb-4 rounded"
        />
        <button
          onClick={handleLogin}
          className="bg-yellow-500 w-full py-2 rounded font-semibold hover:bg-yellow-600 transition"
        >
          เข้าสู่ระบบ
        </button>
      </div>
    </div>
  );
}
