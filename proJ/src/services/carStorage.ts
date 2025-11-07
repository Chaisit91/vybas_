import type { Car } from "../types/carall";

/**
 * ดึงข้อมูลรถจาก localStorage
 */
export function getStoredCars(): Car[] {
  const saved = localStorage.getItem("car_list_data");
  if (!saved) return [];

  try {
    const parsed = JSON.parse(saved) as unknown;
    if (Array.isArray(parsed)) {
      return parsed as Car[];
    }
    return [];
  } catch (err) {
    console.error("Failed to parse car_list_data:", err);
    return [];
  }
}

/**
 * บันทึกรถทั้งหมดลง localStorage
 */
export function saveCars(cars: Car[]): void {
  localStorage.setItem("car_list_data", JSON.stringify(cars));
}

/**
 * เพิ่มรถใหม่
 */
export function addCar(newCar: Car): void {
  const cars = getStoredCars();
  const updatedCars = [...cars, newCar];
  saveCars(updatedCars);
}

/**
 * ลบรถออกจาก localStorage
 */
export function deleteCar(publicId: string): void {
  const cars = getStoredCars();
  const updatedCars = cars.filter((c) => c.publicId !== publicId);
  saveCars(updatedCars);
}
