import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Models from "./pages/Models";
import CustomCar from "./pages/CustomCar";
import About from "./pages/About";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import CarAdmin from "./admin/CarAdmin";
import CustomizationAdmin from "./admin/CustomizationAdmin";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/models" element={<Models />} />
        <Route path="/custom-car" element={<CustomCar />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />

        {/* ✅ เส้นทางสำหรับ admin */}
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

        {/* ✅ ถ้าเจอ path ที่ไม่มีอยู่ → กลับไปหน้า Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
