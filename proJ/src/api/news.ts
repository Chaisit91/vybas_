import axios from "axios";
import type { News } from "../types/News";

export const fetchNews = async (): Promise<News[]> => {
  const res = await axios.get<News[]>("/news/news.json"); // ชี้ไป public/news/news.json
  return res.data;
};
