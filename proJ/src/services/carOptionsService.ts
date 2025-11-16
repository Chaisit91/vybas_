// นำเข้า base options ของรถจากไฟล์ constants
import { CAR_OPTIONS } from "../assets/constants";

// ระบุประเภทของ category ที่ใช้ในระบบ
export type Category = "colors" | "wheels" | "spoilers";

// โครงสร้างของตัวเลือก overlay เช่น สี ล้อ สปอยเลอร์
export interface OverlayOption {
  name: string; 
  image: string; 
}

// รูปแบบข้อมูลตัวเลือกของรถแต่ละคัน
export interface CarOptions {
  colors: OverlayOption[]; // ตัวเลือกสี
  wheels: OverlayOption[]; // ตัวเลือกล้อ
  spoilers: OverlayOption[]; // ตัวเลือกสปอยเลอร์
  combos?: { selected: Partial<Record<Category, string>>; image: string }[]; // ตัวเลือกแบบเซตคอมโบ
}

// key ที่ใช้เก็บใน localStorage
const STORAGE_KEY = "car_options_data";

//  โหลดข้อมูลจาก localStorage + รวมกับ base data
const loadOptions = (): Record<string, CarOptions> => {
  const saved = localStorage.getItem(STORAGE_KEY); // โหลดข้อมูลเก่า
  const stored = saved ? JSON.parse(saved) : {}; // ถ้าไม่มี ให้ใช้ object ว่าง
  return { ...CAR_OPTIONS, ...stored }; // รวมข้อมูล base + ที่เพิ่มเอง
};

//  บันทึกข้อมูลลง localStorage
const saveOptions = (data: Record<string, CarOptions>) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); // แปลงเป็น JSON แล้วเก็บ
};

//  เพิ่มออปชันใหม่ให้รถแต่ละคัน
export const addOptionToCar = (
  publicId: string, // id รถ
  category: Category, // หมวดหมู่ เช่น wheels / colors
  option: OverlayOption // ชื่อ + รูปของออปชัน
) => {
  const all = loadOptions(); // โหลดข้อมูลทั้งหมด

  // ถ้ายังไม่มี key ของรถนั้น → สร้างใหม่
  if (!all[publicId])
    all[publicId] = { colors: [], wheels: [], spoilers: [], combos: [] };

  // ตรวจสอบว่าออปชันนี้ยังไม่ถูกเพิ่มก่อนหน้า
  if (!all[publicId][category].some((o) => o.name === option.name)) {
    all[publicId][category].push(option); // เพิ่มลง array
  }

  saveOptions(all); // บันทึกลง localStorage
  window.dispatchEvent(new Event("carOptionsUpdated")); // ยิง event ให้ UI รีเฟรช
};

//  ดึงออปชันของรถตาม publicId
export const getCarOptions = (publicId: string): CarOptions | null => {
  const all = loadOptions(); // โหลดข้อมูลทั้งหมด
  return all[publicId] || null; // ถ้าไม่มี ให้ส่ง null
};

// 🔹 หา combo image ที่ตรงกับการเลือกของผู้ใช้
export const findComboImage = (
  publicId: string, // รถที่เลือก
  selected: Partial<Record<Category, string>> // ตัวเลือกปัจจุบัน
): string | null => {
  const all = loadOptions(); // โหลดข้อมูล
  const car = all[publicId]; // ตัวเลือกของรถคันนั้น
  if (!car || !car.combos) return null; // ถ้าไม่มี combo ให้ return null

  for (const combo of car.combos) {
    const comboKeys = Object.keys(combo.selected) as Category[]; // คีย์ที่ combo ต้องการ

    // ต้องเลือกครบทุกอย่างตาม combo
    const hasAllRequired = comboKeys.every((key) => !!selected[key]);
    if (!hasAllRequired) continue;

    // ต้องเลือกตรงกันเป๊ะทุกค่า
    const isExactMatch = comboKeys.every(
      (key) => selected[key] === combo.selected[key]
    );

    // ห้ามเลือกเกินกว่าที่ combo ต้องการ
    const selectedKeys = Object.keys(selected).filter(
      (key) => selected[key as Category]
    );
    const noExtraKeys = selectedKeys.length === comboKeys.length;

    if (isExactMatch && noExtraKeys) {
      return combo.image; // ส่งภาพคอมโบกลับไป
    }
  }

  return null; // ถ้าไม่มี combo ที่ตรงทั้งหมด
};

// 🔹 ลบของแต่งของรถ
export const deleteOptionFromCar = (
  publicId: string, // รถ
  category: Category, // หมวด
  optionName: string // ชื่อออปชันที่ลบ
) => {
  const all = loadOptions(); // โหลดข้อมูล
  if (!all[publicId]) return; // ถ้าไม่มีรถนี้ ให้จบเลย

  // กรองเพื่อเอาอันที่ไม่ใช่ชื่อที่ต้องการลบ
  all[publicId][category] = all[publicId][category].filter(
    (opt) => opt.name !== optionName
  );

  saveOptions(all); // เซฟกลับ
  window.dispatchEvent(new Event("carOptionsUpdated")); // แจ้งระบบให้รีเฟรช
};

//  รีเซ็ตข้อมูลทั้งหมด หรือเฉพาะรถคันเดียว
export const resetCarOptions = (publicId?: string) => {
  if (publicId) {
    const saved = localStorage.getItem(STORAGE_KEY); // โหลดข้อมูลเก่า
    const all = saved ? JSON.parse(saved) : {}; // ถ้าไม่มี ให้ใช้ object ว่าง
    delete all[publicId]; // ลบคันนั้นออกจาก object
    saveOptions(all); // เซฟกลับ
  } else {
    localStorage.removeItem(STORAGE_KEY); // ลบทั้งระบบ
  }

  window.dispatchEvent(new Event("carOptionsUpdated")); // ยิง event ให้ UI รู้
};
