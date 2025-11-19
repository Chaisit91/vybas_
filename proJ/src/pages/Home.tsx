import { Link } from "react-router-dom";
// นำเข้า useState สำหรับเก็บ state ของ content
import { useState } from "react";

// interface ของข้อมูล content หน้า Home
interface HomeContent {
  title: string;       // หัวข้อใหญ่
  subtitle: string;    // ข้อความใต้หัวข้อ
  buttonText: string;  // ข้อความบนปุ่ม
  buttonLink: string;  // ลิงก์ของปุ่ม
  background: string;  // URL รูปพื้นหลัง
}

// ค่า default ของหน้า Home
const defaultContent: HomeContent = {
  title: "WELCOME TO REVIEW CUSTOMCAR",
  subtitle: "Discover the future of performance and design.",
  buttonText: "View Models",
  buttonLink: "/models",
  background: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763561507/ebbijjqfxrb8pknoxy71.jpg", // ไม่มีภาพพื้นหลังเริ่มต้น
};

// key สำหรับ localStorage
const STORAGE_KEY = "home_content";

const Home: React.FC = () => {
  // state content: โหลดจาก localStorage ถ้ามี ถ้าไม่มีก็ใช้ defaultContent
  const [content, _setContent] = useState<HomeContent>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultContent;
  });

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center text-white text-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${content.background})` }} // กำหนด background image จาก state
    >
      {/* overlay ด้านบนภาพพื้นหลัง ทำให้ข้อความอ่านง่ายขึ้น */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* container ของข้อความและปุ่ม */}
      <div className="relative z-10 px-6">
        {/* หัวข้อใหญ่ */}
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
          {content.title}
        </h1>

        {/* subtitle */}
        <p className="text-lg md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto">
          {content.subtitle}
        </p>

        {/* ปุ่มลิงก์ไปหน้าอื่น */}
        <Link
          to={content.buttonLink} // link ไป URL จาก content
          className="bg-gradient-to-r from-[#1c2a44] to-[#223355] hover:from-[#223355] hover:to-[#2C3E60] text-white px-10 py-3 rounded-full font-semibold tracking-wide transition-all duration-300 shadow-lg hover:shadow-blue-900/40"
        >
          {content.buttonText}
        </Link>
      </div>
    </section>
  );
};

export default Home;
