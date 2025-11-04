// src/pages/Admin.tsx
import { Link } from "react-router-dom";

export default function Admin() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0F1C] via-[#0F1628] to-[#0A0F1C] text-white flex flex-col items-center justify-center px-6 py-16">
      <h1 className="text-5xl font-extrabold mb-12 tracking-wide drop-shadow-[0_3px_10px_rgba(0,0,0,0.6)] text-center">
        ⚙️ Admin Dashboard
      </h1>

      <div className="grid gap-6 w-full max-w-2xl">
        {/* 🏠 แก้ไขหน้า Home */}
        <Link
          to="/admin/home"
          className="bg-gradient-to-r from-[#1E3A8A] to-[#0F172A] hover:from-[#2563EB] hover:to-[#1E40AF]
               border border-blue-600/50 text-white px-6 py-5 rounded-2xl text-lg font-semibold 
               shadow-lg hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] transition-all duration-300 
               flex justify-center items-center gap-3"
        >
          🏠 แก้ไขหน้า Home
        </Link>

        {/* 🚗 จัดการรถ */}
        <Link
          to="/admin/cars"
          className="bg-gradient-to-r from-[#1E3A8A] to-[#0F172A] hover:from-[#2563EB] hover:to-[#1E40AF]
               border border-blue-600/50 text-white px-6 py-5 rounded-2xl text-lg font-semibold 
               shadow-lg hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] transition-all duration-300 
               flex justify-center items-center gap-3"
        >
          🚗 จัดการรถ (CarAdmin)
        </Link>

        {/* 🛠️ ของแต่ง */}
        <Link
          to="/admin/customizations"
          className="bg-gradient-to-r from-[#1E3A8A] to-[#0F172A] hover:from-[#2563EB] hover:to-[#1E40AF]
               border border-blue-600/50 text-white px-6 py-5 rounded-2xl text-lg font-semibold 
               shadow-lg hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] transition-all duration-300 
               flex justify-center items-center gap-3"
        >
          🛠️ จัดการของแต่ง (CustomizationAdmin)
        </Link>

        {/* 📰 ข่าว */}
        <Link
          to="/admin/news"
          className="bg-gradient-to-r from-[#1E3A8A] to-[#0F172A] hover:from-[#2563EB] hover:to-[#1E40AF]
               border border-blue-600/50 text-white px-6 py-5 rounded-2xl text-lg font-semibold 
               shadow-lg hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] transition-all duration-300 
               flex justify-center items-center gap-3"
        >
          📰 จัดการข่าว (NewsAdmin)
        </Link>
      </div>

    </div>
  );
}
