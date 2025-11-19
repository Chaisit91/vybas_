import { useEffect, useState } from "react"; 
import CarSlider from "../models/CarSlider";
import type { Car } from "../types/carall";
// import type Car เพื่อใช้กำหนดชนิดข้อมูล
import defaultCarsData from "../assets/data.json";

const defaultCars = defaultCarsData as Car[];
// แปลงข้อมูลใน JSON ให้เป็นชนิด Car[] อย่างปลอดภัย

export default function CarSliderHome() {
  // สร้าง component หลักสำหรับหน้า Home ของสไลด์รถ

  const [cars, setCars] = useState<Car[]>([]);
  // state cars เอาไว้เก็บรายชื่อรถที่จะส่งไปให้ CarSlider

  useEffect(() => {
    // ดึงข้อมูลจาก localStorage ตอน component โหลดครั้งแรก

    const saved = localStorage.getItem("car_list_data");
    // อ่านข้อมูลจาก localStorage (ถ้าเคยเพิ่มรถใหม่)

    if (saved) {
      // ถ้ามีข้อมูลใน localStorage

      try {
        const parsed: Car[] = JSON.parse(saved);
        // แปลงข้อความ JSON ให้เป็น array ของรถ

        if (Array.isArray(parsed)) {
          setCars(parsed);
          // ถ้าข้อมูลถูกต้อง  ใช้รถจาก localStorage
        } else {
          setCars(defaultCars);
          // ถ้าไม่ใช่ array  ใช้ข้อมูล default
        }
      } catch {
        setCars(defaultCars);
        // ถ้า JSON พัง (parse error) fallback ไป default
      }
    } else {
      setCars(defaultCars);
      // ถ้าไม่เจอข้อมูลใน localStorage  ใช้ defaultCars
    }
  }, []);
  // [] = ทำงานแค่ครั้งเดียวตอนโหลด component

  return <CarSlider cars={cars} />;
  // ส่งรายชื่อรถทั้งหมดไปให้ CarSlider แสดงผล
}
