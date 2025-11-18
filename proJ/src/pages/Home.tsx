import { Link } from "react-router-dom";
import { useState } from "react";

interface HomeContent {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  background: string;
}

const defaultContent: HomeContent = {
  title: "WELCOME TO REVIEW CUSTOMCAR",
  subtitle: "Discover the future of performance and design.",
  buttonText: "View Models",
  buttonLink: "/models",
  background: "",
};

const STORAGE_KEY = "home_content";

const Home: React.FC = () => {
  const [content, _setContent] = useState<HomeContent>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultContent;
  });

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center text-white text-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${content.background})` }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 px-6">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
          {content.title}
        </h1>

        <p className="text-lg md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto">
          {content.subtitle}
        </p>

        <Link
          to={content.buttonLink}
          className="inline-block bg-[#1c2a44] text-white px-10 py-4 rounded-full"
        >
          {content.buttonText}
        </Link>
      </div>
    </section>
  );
};

export default Home;
