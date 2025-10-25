import { useEffect, useState } from "react";
import { fetchNews } from "../api/news";
import type { News } from "../types/News";

const About = () => {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews()
      .then(data => setNewsList(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="pt-20 max-w-6xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">About Us</h1>
      <p className="mb-4 text-gray-700">
        Welcome to Custom CAR! We are passionate about bringing you the best and most customizable car experiences.
      </p>

      <h2 className="mt-10 text-2xl font-semibold mb-4">Latest News</h2>
      {loading ? (
        <p>Loading news...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {newsList.map(news => (
            <div key={news.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src={news.image} alt={news.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{news.title}</h3>
                <p className="text-gray-600 text-sm">{news.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default About;
