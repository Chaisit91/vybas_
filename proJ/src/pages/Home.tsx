// src/pages/Home.tsx
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

interface HomeContent {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  background: string; // ✅ เพิ่ม background
}

const defaultContent: HomeContent = {
  title: "Welcome to Lamborghini",
  subtitle: "Discover the future of performance and design.",
  buttonText: "View Models →",
  buttonLink: "/models",
  background: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1690000000/lamborghini-bg.jpg",
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
      className="min-h-screen flex flex-col justify-center items-center text-white text-center px-4 md:px-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${content.background})`,
      }}
    >
      <div className="bg-black/50 p-8 rounded-2xl">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">{content.title}</h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl">
          {content.subtitle}
        </p>

        <Link
          to={content.buttonLink}
          className="bg-yellow-500 text-black px-6 py-3 rounded font-semibold hover:bg-yellow-600 transition"
        >
          {content.buttonText}
        </Link>
      </div>
    </section>
  );
};

export default Home;
