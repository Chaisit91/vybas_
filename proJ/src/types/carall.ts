// โครงสร้างข้อมูลรถที่ใช้งานในระบบ
export interface Car {
  id: number;
  name: string;
  tagline: string;
  image: string;
  sideLeft: string;
  sideRight: string;
  specs: string;
  publicId: string;
}

// ใช้เก็บตัวเลือก overlay เช่น สี ล้อ สปอยเลอร์
export interface OverlayOption {
  name: string;
  image: string;
}

// หมวดหมู่ของแต่งรถ
export type Category = "colors" | "wheels" | "spoilers";

// โครงสร้างของ combo (ต้องเลือกครบถึงจะใช้รูป combo)
export interface Combo {
  selected: Partial<Record<Category, string>>;
  image: string;
}

// ออปชันทั้งหมดของรถ 1 คัน
export interface CarOptions {
  colors: OverlayOption[];
  wheels: OverlayOption[];
  spoilers: OverlayOption[];
  combos: Combo[];
}

// ใช้เก็บออปชันของรถทั้งหมดแบบ key = publicId
export type AllCarOptions = Record<string, CarOptions>;

// ใช้เก็บออปชันที่ผู้ใช้เลือกอยู่ปัจจุบัน
export type SelectedOptions = Record<Category, OverlayOption | null>;

// ใช้เก็บเฉพาะชื่อออปชันที่เลือก (สำหรับค้นหา combo)
export type SelectedOptionNames = Partial<Record<Category, string>>;
