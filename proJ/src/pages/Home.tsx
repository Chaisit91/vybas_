import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

interface HomeContent {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  background: string;
}

const defaultContent: HomeContent = {
  title: "Welcome to Lamborghini",
  subtitle: "Discover the future of performance and design.",
  buttonText: "View Models →",
  buttonLink: "/models",
  background:
    "https://res.cloudinary.com/dlp0q39ua/image/upload/v1690000000/lamborghini-bg.jpg",
};

const STORAGE_KEY = "home_content";

const Home: React.FC = () => {
  const [content, setContent] = useState<HomeContent>(defaultContent);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setContent(JSON.parse(saved));
  }, []);

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center text-white text-center bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url(${content.background})`,
      }}
    >
      {/* ชั้น Overlay เบา ๆ ช่วยให้อ่านข้อความได้ชัด */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* เนื้อหากลางจอ */}
      <div className="relative z-10 px-6">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-[0_4px_10px_rgba(0,0,0,0.7)]">
          {content.title}
        </h1>

        <p className="text-lg md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
          {content.subtitle}
        </p>
        <Link
          to={content.buttonLink}
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
