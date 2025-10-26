import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import Models from "../pages/Models";
import CustomCar from "../pages/CustomCar";
import About from "../pages/About";

const AppRouter = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/models" element={<Models />} />
      <Route path="/about" element={<About />} />
      <Route path="/custom" element={<CustomCar/>} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;

