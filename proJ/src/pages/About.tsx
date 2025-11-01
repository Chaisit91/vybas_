import { useEffect, useState } from "react";
import { fetchNews } from "../api/news";
import type { News } from "../types/News";

const About = () => {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews()
      .then((data) => setNewsList(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="pt-20 max-w-6xl mx-auto px-4 font-serif text-gray-800">
      <h1 className="text-4xl font-extrabold mb-6 text-center tracking-wide text-gray-900">
        About Us
      </h1>
      <p className="mb-4 text-lg text-gray-700 text-center max-w-3xl mx-auto leading-relaxed">
        Welcome to <span className="font-semibold ">Custom CAR</span>! 
        We are passionate about bringing you the best and most customizable car experiences.
      </p>

      <h2 className="mt-12 text-2xl font-semibold mb-6 text-gray-900 border-b-2  inline-block">
        Latest News
      </h2>

      {loading ? (
        <p className="text-center text-gray-500 mt-8">Loading news...</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-6">
          {newsList.map((news) => (
            <div
              key={news.id}
              className="bg-white shadow-2xl hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] 
                         rounded-2xl overflow-hidden transition-all duration-300"
            >
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-52 object-cover"
              />
              <div className="p-5">
                <h3 className="font-bold text-xl mb-2 text-gray-900 leading-snug">
                  {news.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {news.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default About;

