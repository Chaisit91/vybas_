import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Models from "./pages/Models";
import CustomCar from "./pages/CustomCar";
import About from "./pages/About"; // หน้า About ใหม่
import Navbar from "./components/Navbar"; // Navbar แสดงทุกหน้า

function App() {
  return (
    <BrowserRouter>
      {/* Navbar แสดงในทุกหน้า */}
      <Navbar />

      {/* กำหนด Routes ของแต่ละหน้า */}
      <Routes>
        {/* หน้าแรก Welcome */}
        <Route path="/" element={<Home />} />

        {/* หน้าแสดง Models / CarSlider */}
        <Route path="/models" element={<Models />} />

        {/* หน้า CustomCar สำหรับปรับแต่งรถ */}
        <Route path="/custom-car" element={<CustomCar />} />

        {/* หน้า About */}
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
