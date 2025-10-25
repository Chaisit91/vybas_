import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Models from "./pages/Models";
import CustomCar from "./pages/CustomCar"; // ถ้ามีหน้าปรับแต่งรถ
import Navbar from "./components/Navbar"; // สมมติว่ามี Navbar

function App() {
  return (
    <Router>
      <Navbar /> {/* ✅ ให้ Navbar แสดงในทุกหน้า */}
      <Routes>
        <Route path="/" element={<Home />} />           {/* หน้า Welcome */}
        <Route path="/models" element={<Models />} />   {/* หน้า CarSlider */}
        <Route path="/custom-car" element={<CustomCar />} /> {/* หน้า Explore */}
      </Routes>
    </Router>
  );
}

export default App;
