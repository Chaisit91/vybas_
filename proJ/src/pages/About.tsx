import { useEffect, useState } from "react";
import { fetchNews } from "../api/news";
// import ฟังก์ชโหลดข่าวจาก API
import type { News } from "../types/News";
// import type News เพื่อกำหนดโครงสร้างข้อมูลให้ชัดเจน

const About = () => {
  // ประกาศ component About

  const [newsList, setNewsList] = useState<News[]>([]);
  // สร้าง state newsList เพื่อเก็บรายการข่าว

  const [loading, setLoading] = useState(true);
  // state loading เพื่อใช้แสดงข้อความ Loading ขณะดึงข้อมูล

  useEffect(() => {
    // useEffect ทำงานตอน component โหลดครั้งแรก

    fetchNews()
      // เรียกฟังก์ชันโหลดข้อมูลข่าว

      .then((data) => setNewsList(data))
      // เมื่อโหลดสำเร็จ ให้นำข้อมูลไปเก็บใน state newsList

      .finally(() => setLoading(false));
      // เมื่อโหลดเสร็จ (สำเร็จหรือผิดพลาด) ให้ปิดสถานะ loading
  }, []);
  // [] หมายถึงรันครั้งเดียวตอนเริ่มต้น

  return (
    // เริ่มต้น JSX ที่จะแสดงผลหน้า About

    <div className="min-h-screen bg-gradient-to-b from-[#0A0F1C] via-[#0F1628] to-[#0A0F1C] text-white pt-20 pb-20 font-serif">

      <div className="max-w-4xl mx-auto text-center px-4">


        <h1 className="text-5xl font-extrabold mb-6 tracking-wide text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.5)]">
          About Us
        </h1>

        <p className="mb-10 text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
          Welcome to <span className="font-semibold text-white-300">Custom CAR</span> 
          We are passionate about bringing you the most innovative and customizable car experiences — 
          crafted with technology, precision, and design.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {loading ? (
          // ถ้ากำลังโหลด ให้แสดงข้อความ Loading

          <p className="text-center text-gray-400 mt-8">Loading news...</p>
          // ข้อความ Loading ขณะข้อมูลยังไม่มา

        ) : (
          // ถ้าโหลดข้อมูลเสร็จแล้ว ให้แสดงรายการข่าว

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-6">

            {newsList.map((news) => (
              // วนลูปแสดงข่าวแต่ละรายการ

              <div
                key={news.id}
                // ใส่ key เพื่อป้องกัน warning ของ React

                className="bg-[#111827]/70 backdrop-blur-md border border-[#fdfeff] hover:border-blue-400/50 transition-all duration-300 shadow-lg hover:shadow-blue-900/40 rounded-2xl overflow-hidden">
                {/* การ์ดข่าว พร้อม effect hover และขอบโค้ง */}


                <img
                  src={news.image}
                  // แสดงรูปภาพข่าว

                  alt={news.title}
                  // alt สำหรับ SEO และ accessibility

                  className="w-full h-52 object-cover opacity-90 hover:opacity-100 transition duration-300"/>
                  {/* ปรับขนาดรูปและ effect hover ให้สว่างขึ้น */}

                <div className="p-5 bg-[##fdfeff]">

                  <h3 className="font-bold text-xl mb-2 text-white leading-snug">
                    {news.title}
                  </h3>

                  <p className="text-gray-300 text-sm leading-relaxed line-clamp-4">
                    {news.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default About;

