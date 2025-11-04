import type { News } from "../types/News";
import mockData from "../assets/news.json";

const STORAGE_KEY = "newsData";

/  โหลดข่าวจาก LocalStorage (หรือ mock data ถ้ายังไม่มี) */
export async function fetchNews(): Promise<News[]> {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockData));
    return mockData;
  }
}

/  เพิ่มข่าวใหม่ /
export async function addNews(news: News) {
  const list = await fetchNews();
  list.push(news);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

/**  อัปเดตข่าว/
export async function updateNews(updated: News) {
  const list = await fetchNews();
  const newList = list.map((item) =>
    item.id === updated.id ? updated : item
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
}

/  ลบข่าว */
export async function deleteNews(id: number) {
  const list = await fetchNews();
  const newList = list.filter((item) => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
}

/  รีเซ็ตข้อมูลข่าว (ลบเฉพาะที่เพิ่มมาใหม่, เก็บ mock data ไว้) /
export async function resetLocalNews() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(mockData));
}

/**  ล้างข่าวทั้งหมด (รวม mock data ด้วย)/
export async function clearAllNews() {
  localStorage.removeItem(STORAGE_KEY);
}

<<<<<<< HEAD
=======
/**  ลบทั้งหมด (รวม mock ออกด้วย — จะกลับมาเมื่อ reload app) */
export async function clearAllNews(): Promise<void> {
  localStorage.removeItem(STORAGE_KEY);
}