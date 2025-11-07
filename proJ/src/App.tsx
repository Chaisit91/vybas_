import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CarSlider from "./models/CarSlider";
import CustomCar from "./customCar/CustomCar";
import About from "./pages/About";
import Login from "./pages/Login";
import Admin from "./admin/Admin";
import CarAdmin from "./admin/CarAdmin";
import CustomizationAdmin from "./admin/CustomizationAdmin";
import NewsAdmin from "./admin/NewsAdmin";
import ProtectedRoute from "./pages/ProtectedRoute";
import HomeAdmin from "./admin/HomeAdmin";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* 🌐 Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/models" element={<CarSlider />} />
        <Route path="/custom-car" element={<CustomCar />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />

        {/* 🔒 Admin protected routes */}
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
        <Route
          path="/admin/news"
          element={
            <ProtectedRoute>
              <NewsAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/home"
          element={
            <ProtectedRoute>
              <HomeAdmin />
            </ProtectedRoute>
          }
        />

        {/* 🚫 หาก path ไม่ตรง → กลับหน้า Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
