import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Models from "./pages/Models";
import CustomCar from "./pages/CustomCar";
import About from "./pages/About";
import Login from "./pages/Login";
import Admin from "./pages/Admin";

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
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
