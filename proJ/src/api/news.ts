import axios from "axios";
import type { News } from "../types/News";

export const fetchNews = async (): Promise<News[]> => {
  const response = await axios.get("/src/assets/news.json");
  return response.data;
};
