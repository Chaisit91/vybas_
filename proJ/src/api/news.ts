import type { News } from "../types/News";
import mockData from "../assets/news.json";

const STORAGE_KEY = "newsData";

/** 🔹 โหลดข่าวจาก LocalStorage (หรือ mock data ถ้ายังไม่มี) */
export async function fetchNews(): Promise<News[]> {
  const stored = localStorage.getItem(STORAGE_KEY);
  const localNews = stored ? JSON.parse(stored) : [];

  // ✅ รวม mockData เฉพาะข่าวที่ยังไม่มีใน localNews (กันซ้ำ)
  const merged = [
    ...localNews,
    ...mockData.filter(
      (mock) => !localNews.some((local: News) => local.id === mock.id)
    ),
  ];

  return merged;
}

/** 🔹 เพิ่มข่าวใหม่ */
export async function addNews(news: News) {
  const list = await fetchNews();
  list.push(news);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

/** 🔹 อัปเดตข่าว */
export async function updateNews(updated: News) {
  const list = await fetchNews();
  const newList = list.map((item) =>
    item.id === updated.id ? updated : item
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
}

/** 🔹 ลบข่าว */
export async function deleteNews(id: number) {
  const list = await fetchNews();
  const newList = list.filter((item) => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
}

/** 🔹 รีเซ็ตข้อมูลข่าว (ลบเฉพาะที่เพิ่มมาใหม่, เก็บ mock data ไว้) */
export async function resetLocalNews() {
  // ✅ ลบข้อมูลข่าวทั้งหมดใน localStorage
  localStorage.removeItem(STORAGE_KEY);
}

/** 🔹 ล้างข่าวทั้งหมด (รวม mock data ด้วย) */
export async function clearAllNews() {
  localStorage.removeItem(STORAGE_KEY);
}
