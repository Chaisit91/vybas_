// src/pages/Admin.tsx
import { Link } from "react-router-dom";

export default function Admin() {
  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">
        ⚙️ Admin Dashboard
      </h1>

      <div className="grid gap-6 max-w-2xl mx-auto">
        {/* 🏠 แก้ไขหน้า Home */}
        <Link
          to="/admin/home"
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-4 rounded-xl text-lg font-semibold shadow-md hover:shadow-xl transition flex justify-center items-center gap-2"
        >
          🏠 แก้ไขหน้า Home
        </Link>

        {/* 🚗 จัดการรถ */}
        <Link
          to="/admin/cars"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-4 rounded-xl text-lg font-semibold shadow-md hover:shadow-xl transition flex justify-center items-center gap-2"
        >
          🚗 จัดการรถ (CarAdmin)
        </Link>

        {/* 🛠️ ของแต่ง */}
        <Link
          to="/admin/customizations"
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-xl text-lg font-semibold shadow-md hover:shadow-xl transition flex justify-center items-center gap-2"
        >
          🛠️ จัดการของแต่ง (CustomizationAdmin)
        </Link>

        {/* 📰 ข่าว */}
        <Link
          to="/admin/news"
          className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-4 rounded-xl text-lg font-semibold shadow-md hover:shadow-xl transition flex justify-center items-center gap-2"
        >
          📰 จัดการข่าว (NewsAdmin)
        </Link>
      </div>
    </div>
  );
}

