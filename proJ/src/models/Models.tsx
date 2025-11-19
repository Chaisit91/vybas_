import CarSlider from "./CarSlider";
import carsData from "../assets/data.json";
import type { Car } from "../types/carall";
// import ชนิดข้อมูล Car เพื่อใช้กำหนด type ให้ชัดเจน

const Models = () => {
  // ประกาศ component Models

  const cars = carsData as Car[];
  // แปลง JSON ที่ import มาให้เป็น array ของ Car อย่างปลอดภัย

  return <CarSlider cars={cars} />;
  // ส่งข้อมูลรถทั้งหมดเข้าไปให้ CarSlider แสดงผล
};

export default Models;
