import carOptionsData from "../assets/carOptions.json";

type Category = "colors" | "wheels" | "spoilers";

export interface OverlayOption {
  name: string;
  image: string;
}

export interface CarOptions {
  colors: OverlayOption[];
  wheels: OverlayOption[];
  spoilers: OverlayOption[];
  combos: { selected: Partial<Record<Category, string>>; image: string }[];
}

const STORAGE_KEY = "car_options_data";

// ✅ ข้อมูลพื้นฐาน (จากไฟล์ JSON)
const baseData: Record<string, CarOptions> =
  carOptionsData as Record<string, CarOptions>;

/**
 * โหลดข้อมูลจาก localStorage และรวมกับ baseData
 */
const loadOptions = (): Record<string, CarOptions> => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    // แจ้งให้หน้า CustomCar โหลดใหม่เมื่อไม่มีข้อมูลใน localStorage
    window.dispatchEvent(new Event("carOptionsUpdated"));
  }
  const stored = saved ? JSON.parse(saved) : {};
  return { ...baseData, ...stored };
};

/**
 * บันทึกข้อมูลกลับลง localStorage
 */
const saveOptions = (data: Record<string, CarOptions>) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

/**
 * เพิ่มออปชันใหม่ให้รถแต่ละคัน (เช่น สี, ล้อ, สปอยเลอร์)
 */
export const addOptionToCar = (
  publicId: string,
  category: Category,
  option: OverlayOption
) => {
  const all = loadOptions();
  if (!all[publicId])
    all[publicId] = { colors: [], wheels: [], spoilers: [], combos: [] };

  // ป้องกันซ้ำ
  if (!all[publicId][category].some((o) => o.name === option.name)) {
    all[publicId][category].push(option);
  }

  saveOptions(all);
  // แจ้งทุกหน้าให้โหลดใหม่
  window.dispatchEvent(new Event("carOptionsUpdated"));
};

/**
 * ดึงข้อมูลของแต่งของรถตาม publicId
 */
export const getCarOptions = (publicId: string): CarOptions | null => {
  const all = loadOptions();
  return all[publicId] || null;
};

/**
 * หา image ของ combo (เมื่อเลือกของแต่งหลายอย่างพร้อมกัน)
 */
export const findComboImage = (
  publicId: string,
  selected: Partial<Record<Category, string>>
): string | null => {
  const all = loadOptions();
  const car = all[publicId];
  if (!car) return null;
  const match = car.combos.find((c) =>
    Object.entries(selected).every(([k, v]) => c.selected[k as Category] === v)
  );
  return match ? match.image : null;
};

/**
 * ✅ รีเซ็ตข้อมูลของแต่ง (เฉพาะคัน หรือทั้งหมด)
 * - ถ้าส่ง publicId → รีเซ็ตเฉพาะคัน
 * - ถ้าไม่ส่ง → ลบทั้งหมด
 */

/**
 * 🗑️ ลบของแต่งเฉพาะอันออกจากรถ
 */
export const deleteOptionFromCar = (
  publicId: string,
  category: Category,
  optionName: string
) => {
  const all = loadOptions();
  if (!all[publicId]) return;

  all[publicId][category] = all[publicId][category].filter(
    (opt) => opt.name !== optionName
  );

  saveOptions(all);
  window.dispatchEvent(new Event("carOptionsUpdated"));
};


export const resetCarOptions = (publicId?: string) => {
  if (publicId) {
    // รีเซ็ตเฉพาะคันที่ระบุ
    const saved = localStorage.getItem(STORAGE_KEY);
    const all = saved ? JSON.parse(saved) : {};
    delete all[publicId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } else {
    // รีเซ็ตทั้งหมด
    localStorage.removeItem(STORAGE_KEY);
  }

  // แจ้งให้ทุกหน้าที่ฟัง event โหลดข้อมูลใหม่
  window.dispatchEvent(new Event("carOptionsUpdated"));
};
