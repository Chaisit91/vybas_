import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// นำเข้า Navbar ที่แสดงบนทุกหน้า
import Navbar from "./components/Navbar";

// นำเข้าแต่ละหน้า (Pages)
import Home from "./pages/Home";
import CarSlider from "./models/CarSlider";
import CustomCar from "./customCar/CustomCar";
import About from "./pages/About";
import Login from "./pages/Login";

// นำเข้าส่วนของแอดมิน
import Admin from "./admin/Admin";
import CarAdmin from "./admin/CarAdmin";
import CustomizationAdmin from "./admin/CustomizationAdmin";
import NewsAdmin from "./admin/NewsAdmin";
import HomeAdmin from "./admin/HomeAdmin";

// นำเข้า ProtectedRoute เพื่อป้องกันหน้าแอดมินไม่ให้คนทั่วไปเข้าได้
import ProtectedRoute from "./pages/ProtectedRoute";

export default function App() {
  return (
    // BrowserRouter ใช้ครอบทั้งระบบ routing
    <BrowserRouter>
      {/* Navbar แสดงทุกหน้า */}
      <Navbar />
      <Routes>
        {/*  เส้นทางสำหรับผู้ใช้ทั่วไป */}
        {/* หน้าแรก */}
        <Route path="/" element={<Home />} />
        {/* หน้าเลือกดูรุ่นรถ */}
        <Route path="/models" element={<CarSlider />} />
        {/* หน้าแต่งรถ */}
        <Route path="/custom-car" element={<CustomCar />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />


        {/*  เส้นทางเฉพาะแอดมิน — ต้องผ่าน ProtectedRoute */}

        {/* หน้า Dashboard ของ Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }/>

        {/* หน้าแผงจัดการรถ */}
        <Route
          path="/admin/cars"
          element={
            <ProtectedRoute>
              <CarAdmin />
            </ProtectedRoute>
          }/>

        {/* หน้าแผงจัดการของแต่งรถ */}
        <Route
          path="/admin/customizations"
          element={
            <ProtectedRoute>
              <CustomizationAdmin />
            </ProtectedRoute>
          }/>

        {/* หน้าแผงจัดการข่าว */}
        <Route
          path="/admin/news"
          element={
            <ProtectedRoute>
              <NewsAdmin />
            </ProtectedRoute>
          }/>

        {/* หน้าแอดมินจัดการหน้า Home */}
        <Route
          path="/admin/home"
          element={
            <ProtectedRoute>
              <HomeAdmin />
            </ProtectedRoute>
          }/>


        {/* ถ้าไม่มีหน้าอยู่จริง  redirect กลับหน้าแรก */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
