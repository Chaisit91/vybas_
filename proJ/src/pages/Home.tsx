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
      className="min-h-screen flex items-center justify-center text-white text-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${content.background})`,
      }}
    >
      <div className="bg-black/60 backdrop-blur-sm px-10 py-12 rounded-3xl shadow-2xl max-w-2xl mx-4">
        {/* ✅ ใช้สไตล์ Title เดิม */}
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          {content.title}
        </h1>

        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl mx-auto">
          {content.subtitle}
        </p>

        <Link
          to={content.buttonLink}
          className="inline-block bg-yellow-500 text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-600 transition-transform duration-300 hover:scale-105 shadow-md"
        >
          {content.buttonText}
        </Link>
      </div>
    </section>
  );
};

export default Home;
