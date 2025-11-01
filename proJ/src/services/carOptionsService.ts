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

const loadOptions = (): Record<string, CarOptions> => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : { ...carOptionsData };
};

const saveOptions = (data: Record<string, CarOptions>): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

/** ✅ เพิ่มของแต่งใหม่เข้าไปใน category ที่กำหนด */
export const addOptionToCar = (
  publicId: string,
  category: Category,
  option: OverlayOption
): void => {
  const all = loadOptions();
  if (!all[publicId]) {
    all[publicId] = { colors: [], wheels: [], spoilers: [], combos: [] };
  }
  all[publicId][category].push(option);
  saveOptions(all);
};

/** ✅ ค้นหารูปภาพ combo ที่ตรงกับการเลือกของผู้ใช้ */
export const findComboImage = (
  publicId: string,
  selected: Partial<Record<Category, string>>
): string | null => {
  const all = loadOptions();
  const carData = all[publicId];
  if (!carData) return null;

  // หาค่า combo ที่ตรงกับทุก key ที่มีใน selected
  const match = carData.combos.find((combo) =>
    Object.entries(selected).every(
      ([key, value]) => combo.selected[key as Category] === value
    )
  );

  return match ? match.image : null;
};

/** ✅ ดึงข้อมูลของรถแต่ละคัน */
export const getCarOptions = (publicId: string): CarOptions | null => {
  const all = loadOptions();
  return all[publicId] || null;
};
