import { CAR_OPTIONS } from "../assets/constants";

export type Category = "colors" | "wheels" | "spoilers";

export interface OverlayOption {
  name: string;
  image: string;
}

export interface CarOptions {
  colors: OverlayOption[];
  wheels: OverlayOption[];
  spoilers: OverlayOption[];
  combos?: { selected: Partial<Record<Category, string>>; image: string }[];
}

const STORAGE_KEY = "car_options_data";

/** ✅ โหลดข้อมูลจาก localStorage + รวมกับ base data */
const loadOptions = (): Record<string, CarOptions> => {
  const saved = localStorage.getItem(STORAGE_KEY);
  const stored = saved ? JSON.parse(saved) : {};
  return { ...CAR_OPTIONS, ...stored };
};

/** ✅ เซฟข้อมูลลง localStorage */
const saveOptions = (data: Record<string, CarOptions>) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

/** ✅ เพิ่มออปชันใหม่ให้รถ */
export const addOptionToCar = (
  publicId: string,
  category: Category,
  option: OverlayOption
) => {
  const all = loadOptions();
  if (!all[publicId])
    all[publicId] = { colors: [], wheels: [], spoilers: [], combos: [] };

  if (!all[publicId][category].some((o) => o.name === option.name)) {
    all[publicId][category].push(option);
  }

  saveOptions(all);
  window.dispatchEvent(new Event("carOptionsUpdated"));
};

/** ✅ ดึงข้อมูลของแต่งของรถตาม publicId */
export const getCarOptions = (publicId: string): CarOptions | null => {
  const all = loadOptions();
  return all[publicId] || null;
};

/** ✅ หา image combo — ต้องเลือกครบทุกอย่างตาม combo ถึงจะแสดง */
export const findComboImage = (
  publicId: string,
  selected: Partial<Record<Category, string>>
): string | null => {
  const all = loadOptions();
  const car = all[publicId];
  if (!car || !car.combos) return null;

  for (const combo of car.combos) {
    const comboKeys = Object.keys(combo.selected) as Category[];

    // ✅ ต้องเลือกครบทุก key ที่ combo ต้องการ (ห้ามขาด)
    const hasAllRequired = comboKeys.every((key) => !!selected[key]);
    if (!hasAllRequired) continue;

    // ✅ ต้องตรงกันทุกค่า
    const isExactMatch = comboKeys.every(
      (key) => selected[key] === combo.selected[key]
    );

    // ✅ และห้ามเลือกเกิน (เช่น combo ต้องการ 2 อย่าง แต่เลือก 3 ไม่ถือว่า match)
    const selectedKeys = Object.keys(selected).filter(
      (key) => selected[key as Category]
    );
    const noExtraKeys = selectedKeys.length === comboKeys.length;

    if (isExactMatch && noExtraKeys) {
      return combo.image;
    }
  }

  return null;
};

/** ✅ ลบของแต่ง */
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

/** ✅ รีเซ็ตข้อมูล (ลบเฉพาะคันหรือทั้งหมด) */
export const resetCarOptions = (publicId?: string) => {
  if (publicId) {
    const saved = localStorage.getItem(STORAGE_KEY);
    const all = saved ? JSON.parse(saved) : {};
    delete all[publicId];
    saveOptions(all);
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
  window.dispatchEvent(new Event("carOptionsUpdated"));
};
