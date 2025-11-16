// นำเข้าข้อมูลรถเริ่มต้นจากไฟล์ data.json
import carData from '../assets/data.json';

// ประกาศโครงสร้างข้อมูลรถ 1 คัน
export interface Car {
  id: number;         
  name: string;     
  tagline: string;    
  image: string;     
  sideLeft: string;    
  sideRight: string;  
  publicId: string; 
}

// ชื่อ key ที่ใช้เก็บข้อมูลรถใน localStorage
const STORAGE_KEY = 'cars_data';

// โหลดข้อมูลรถจาก localStorage ถ้าไม่มีให้ใช้ข้อมูลเริ่มต้นแทน
const loadCars = (): Car[] => {
  const saved = localStorage.getItem(STORAGE_KEY); // ดึงข้อมูลจาก localStorage
  return saved ? JSON.parse(saved) : [...carData]; // ถ้ามีให้แปลง JSON ถ้าไม่มีก็ใช้ข้อมูลพื้นฐาน
};

// บันทึกรถลง localStorage
const saveCars = (cars: Car[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cars)); // เซฟ array เป็น JSON
};

// ดึงรถทั้งหมด
export const getAllCars = (): Car[] => loadCars(); // คืนค่าผล loadCars()

// สร้างรถใหม่
export const createCar = (carData: Omit<Car, 'id'>): Car => {
  const cars = loadCars(); // โหลดรถทั้งหมดก่อน
  const newId = Math.max(...cars.map(c => c.id), 0) + 1; // หา id ใหม่ที่ใหญ่ที่สุด + 1
  const newCar: Car = { id: newId, ...carData }; // สร้าง object รถใหม่พร้อม id
  cars.push(newCar); // เพิ่มเข้า array
  saveCars(cars); // เซฟกลับลง localStorage
  return newCar; // คืนค่ารถใหม่
};

// ลบรถตาม id
export const deleteCar = (id: number): boolean => {
  const cars = loadCars(); // โหลดข้อมูลก่อน
  const index = cars.findIndex(c => c.id === id); // หาตำแหน่งรถใน array
  if (index === -1) return false; // ถ้าไม่เจอคืน false
  cars.splice(index, 1); // ลบออกจาก array
  saveCars(cars); // เซฟกลับ
  return true; // คืนค่า true ว่าลบสำเร็จ
};

// รีเซ็ตรถทั้งหมดกลับเป็นค่าจาก data.json
export const resetCars = (): void => {
  saveCars([...carData]); // เซฟข้อมูลพื้นฐานลงไปแทนทั้งหมด
};
