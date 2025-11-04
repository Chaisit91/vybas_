import mockNews from "../assets/news.json";
import type { News } from "../types/News";

const STORAGE_KEY = "news_data";

/** ✅ โหลดข้อมูลทั้งหมด (mock + localStorage) */
export async function fetchNews(): Promise<News[]> {
  const saved = localStorage.getItem(STORAGE_KEY);
  const localNews: News[] = saved ? JSON.parse(saved) : [];

  // รวม mock data + localStorage (local อยู่ก่อนเพื่อให้ mock ไม่ซ้ำ id)
  const merged = [
    ...localNews.filter(
      (ln) => !mockNews.some((mn) => mn.id === ln.id)
    ),
    ...mockNews,
  ];

  return merged;
}

/** ✅ เพิ่มข่าวใหม่ (บันทึกลง localStorage) */
export async function addNews(news: News): Promise<void> {
  const saved = localStorage.getItem(STORAGE_KEY);
  const localNews: News[] = saved ? JSON.parse(saved) : [];
  localNews.push(news);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(localNews));
}

/** ✅ แก้ไขข่าว */
export async function updateNews(news: News): Promise<void> {
  const saved = localStorage.getItem(STORAGE_KEY);
  const localNews: News[] = saved ? JSON.parse(saved) : [];
  const updated = localNews.map((n) => (n.id === news.id ? news : n));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

/** ✅ ลบข่าว */
export async function deleteNews(id: number): Promise<void> {
  const saved = localStorage.getItem(STORAGE_KEY);
  const localNews: News[] = saved ? JSON.parse(saved) : [];
  const filtered = localNews.filter((n) => n.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

/** ✅ ล้างเฉพาะข่าวที่เพิ่มจาก localStorage (mock เดิมยังอยู่) */
export async function resetLocalNews(): Promise<void> {
  localStorage.removeItem(STORAGE_KEY);
}

/** ✅ ลบทั้งหมด (รวม mock ออกด้วย — จะกลับมาเมื่อ reload app) */
export async function clearAllNews(): Promise<void> {
  localStorage.removeItem(STORAGE_KEY);
}