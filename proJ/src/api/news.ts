import type { News } from "../types/News"; 
import mockData from "../assets/news.json";

const STORAGE_KEY = "newsData";
//  ชื่อ key สำหรับเก็บข้อมูลข่าวทั้งหมดใน localStorage

/**  โหลดข่าวจาก LocalStorage (หรือ mock data ถ้ายังไม่มี) */
export async function fetchNews(): Promise<News[]> {
  const stored = localStorage.getItem(STORAGE_KEY);
  //  ดึงข้อมูลข่าวจาก localStorage (เป็น string หรือ null)

  const localNews = stored ? JSON.parse(stored) : [];
  //  ถ้ามีข้อมูล  แปลงเป็น array
  //  ถ้าไม่มี  ให้เป็น array ว่าง []

  //  รวม mockData เฉพาะข่าวที่ยังไม่มีใน localNews (กันซ้ำ)
  const merged = [
    ...localNews, // ข่าวที่ผู้ใช้เคยเพิ่มหรือแก้ไข
    ...mockData.filter(
      (mock) =>
        !localNews.some((local: News) => local.id === mock.id)
      //  เอาเฉพาะ mockData ที่ id ไม่ซ้ำกับข่าวใน localStorage
    ),
  ];

  return merged; 
  //  ส่ง array ข่าวทั้งหมดกลับไป
}

/**  เพิ่มข่าวใหม่ */
export async function addNews(news: News) {
  const list = await fetchNews();
  //  โหลดข่าวทั้งหมดก่อน (เพื่อจะเพิ่มต่อท้าย)

  list.push(news);
  //  เพิ่มข่าวใหม่ลง array

  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  // บันทึก array ข่าวกลับลง localStorage
}

/*  อัปเดตข่าว */
export async function updateNews(updated: News) {
  const list = await fetchNews();
  //  โหลดข่าวทั้งหมดก่อน

  const newList = list.map((item) =>
    item.id === updated.id ? updated : item
    //  ถ้า id ตรงกัน  แทนที่ด้วยข้อมูลใหม่
    //  ถ้าไม่ตรงคงไว้
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
  //  บันทึกข้อมูลที่ถูกอัปเดตกลับไป
}

/* ลบข่าว */
export async function deleteNews(id: number) {
  const list = await fetchNews();

  const newList = list.filter((item) => item.id !== id);
  //  เอาข่าวที่ id ไม่ตรงออกมาเท่านั้น → เท่ากับลบข่าวที่เลือก

  localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
}

/**  รีเซ็ตข้อมูลข่าว (ลบเฉพาะที่เพิ่มมาใหม่, เก็บ mock data ไว้) */
export async function resetLocalNews() {
  // ลบข้อมูล LOCAL ทั้งหมด (mockData จะถูกโหลดใหม่ตอน fetchNews)
  localStorage.removeItem(STORAGE_KEY);
}

/**  ล้างข่าวทั้งหมด (รวม mock data ด้วย) */
export async function clearAllNews() {
  //  ลบทุกอย่าง เหมือน reset แต่ตั้งใจให้ลบ mock ด้วย
  //  แต่ mock จะกลับคืนเมื่อ refresh หน้าเว็บ
  localStorage.removeItem(STORAGE_KEY);
}
