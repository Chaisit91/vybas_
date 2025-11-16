// import Link ใช้สำหรับลิงก์ไปหน้าอื่น
import { Link } from "react-router-dom";
// import hook useEffect และ useState จาก React
import { useEffect, useState } from "react";

// กำหนดรูปแบบข้อมูลสำหรับเนื้อหาในหน้า Home
interface HomeContent {
  title: string;       
  subtitle: string;    
  buttonText: string;  
  buttonLink: string;  
  background: string;  
}

// ข้อมูลเริ่มต้นของหน้า Home หากไม่มีข้อมูลใน localStorage
const defaultContent: HomeContent = {
  title: "Welcome to Lamborghini", 
  subtitle: "Discover the future of performance and design.", 
  buttonText: "View Models ", 
  buttonLink: "/models", 
  background: "", 
};

// ชื่อ key สำหรับเก็บข้อมูลใน localStorage
const STORAGE_KEY = "home_content";

// สร้าง component หลักของหน้า Home
const Home: React.FC = () => {
  // state เก็บข้อมูลเนื้อหาในหน้า Home
  const [content, setContent] = useState<HomeContent>(defaultContent);

  // โหลดข้อมูลจาก localStorage เมื่อเปิดหน้า
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY); // ดึงข้อมูลจาก localStorage
    if (saved) setContent(JSON.parse(saved)); // ถ้ามีให้ตั้งค่าลง state
  }, []); // [] หมายถึงทำงานแค่ครั้งเดียวตอน mount

  // เริ่มส่วนของ UI
  return (
    // section หลักของหน้า Home พร้อมพื้นหลังแบบ cover
    <section
      className="min-h-screen flex flex-col items-center justify-center text-white text-center bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url(${content.background})`, // ตั้งค่าพื้นหลังแบบ dynamic
      }}
    >
      {/* ชั้น overlay ดำโปร่งให้ตัวหนังสืออ่านง่าย */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* กล่องข้อความหลัก ชิดตรงกลางจอ */}
      <div className="relative z-10 px-6">
        {/* หัวข้อใหญ่ของหน้า */}
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-[0_4px_10px_rgba(0,0,0,0.7)]">
          {content.title}
        </h1>

        {/* ข้อความคำโปรย */}
        <p className="text-lg md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
          {content.subtitle}
        </p>

        {/* ปุ่มลิงก์ไปหน้าอื่น เช่น Models */}
        <Link
          to={content.buttonLink} // กดแล้วไปหน้าไหน
          className="inline-block bg-[#0a1444] text-white px-10 py-4 rounded-full font-semibold text-lg 
             hover:bg-[#13235f] transition-transform duration-300 hover:scale-105 
             shadow-[0_0_25px_rgba(10,20,68,0.7)]"
        >
          {content.buttonText}
        </Link>
      </div>
    </section>
  );
};

export default Home;
