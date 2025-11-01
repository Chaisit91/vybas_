import { Link } from "react-router-dom";

export default function Admin() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid gap-4">
        <Link
          to="/admin/cars"
          className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition"
        >
          🚗 จัดการรถ (CarAdmin)
        </Link>

        <Link
          to="/admin/customizations"
          className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition"
        >
          🎨 จัดการของแต่ง (CustomizationAdmin)
        </Link>
      </div>
    </div>
  );
}
