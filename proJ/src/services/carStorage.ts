import type { Car } from "../types/carall";

// ฟังก์ชันดึงข้อมูลรถจาก localStorage
export function getStoredCars(): Car[] {
  // ดึงข้อมูลดิบจาก localStorage
  const saved = localStorage.getItem("car_list_data");

  // ถ้าไม่มีข้อมูลเลย  คืน array ว่าง
  if (!saved) return [];

  try {
    // แปลง JSON  object unknown ก่อน
    const parsed = JSON.parse(saved) as unknown;

    // ตรวจสอบว่าเป็น array จริงไหม
    if (Array.isArray(parsed)) {
      return parsed as Car[]; // แปลงเป็น Car[] และคืนค่า
    }

    // ถ้าไม่ใช่ array  คืน array ว่าง
    return [];
  } catch (err) {
    // ถ้าแปลง JSON fail  แจ้ง error ใน console
    console.error("Failed to parse car_list_data:", err);
    return []; // คืน array ว่างเพื่อกันโปรแกรมพัง
  }
}

// ฟังก์ชันบันทึกรถทั้งหมดลง localStorage
export function saveCars(cars: Car[]): void {
  // แปลง array  JSON แล้วเก็บลง localStorage
  localStorage.setItem("car_list_data", JSON.stringify(cars));
}

// ฟังก์ชันเพิ่มรถใหม่
export function addCar(newCar: Car): void {
  // ดึงรายการรถทั้งหมดก่อน
  const cars = getStoredCars();

  // รวมรายการรถเดิม + รถใหม่
  const updatedCars = [...cars, newCar];

  // เซฟกลับลง localStorage
  saveCars(updatedCars);
}

// ฟังก์ชันลบรถออกตาม publicId
export function deleteCar(publicId: string): void {
  // โหลดรถทั้งหมดก่อน
  const cars = getStoredCars();

  // กรองเอารถที่ไม่ตรง publicId (หมายถึงลบรถที่ตรง publicId)
  const updatedCars = cars.filter((c) => c.publicId !== publicId);

  // เซฟรายการรถใหม่ลง localStorage
  saveCars(updatedCars);
}
