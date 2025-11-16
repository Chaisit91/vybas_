import axios from "axios";
import type { Car } from "../types/carall"; //  นำเข้า type Car เพื่อกำหนดรูปแบบข้อมูลรถ (ช่วยให้ TypeScript เช็กข้อมูลให้ถูกต้อง)

//  ฟังก์ชันโหลดข้อมูลรถทั้งหมดจากไฟล์ data.json
export const fetchCars = async (): Promise<Car[]> => {
  //  axios.get() = ดึงข้อมูลจากไฟล์ JSON แบบ async (ไม่บล็อกหน้าเว็บ)
  const response = await axios.get("/src/assets/data.json"); 
  //  response.data = ข้อมูลจริงที่อยู่ในไฟล์ JSON (array ของรถ)
  return response.data;
};
