import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Models from "./models/Models";
import CustomCar from "./customCar/CustomCar";
import About from "./pages/About";
import Login from "./pages/Login";
import Admin from "./admin/Admin";
import CarAdmin from "./admin/CarAdmin";
import CustomizationAdmin from "./admin/CustomizationAdmin";
import NewsAdmin from "./admin/NewsAdmin"; // ✅ เพิ่ม import ใหม่
import ProtectedRoute from "./pages/ProtectedRoute";
import HomeAdmin from "./admin/HomeAdmin";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* 🌐 Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/models" element={<Models />} />
        <Route path="/custom-car" element={<CustomCar />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/home" element={<HomeAdmin />} />

        {/* 🔒 เส้นทางสำหรับผู้ดูแลระบบ (Protected) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/cars"
          element={
            <ProtectedRoute>
              <CarAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/customizations"
          element={
            <ProtectedRoute>
              <CustomizationAdmin />
            </ProtectedRoute>
          }
        />

        {/* ✅ เพิ่มหน้า “จัดการข่าว” */}
        <Route
          path="/admin/news"
          element={
            <ProtectedRoute>
              <NewsAdmin />
            </ProtectedRoute>
          }
        />

        {/* 🚫 หาก path ไม่ตรง → กลับหน้า Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
