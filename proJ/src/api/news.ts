import type { News } from "../types/News";
import newsData from "../news/news.json"; // ✅ import JSON ตรงจาก src/news/news.json

export const fetchNews = async (): Promise<News[]> => {
  return Promise.resolve(newsData as News[]);
};
