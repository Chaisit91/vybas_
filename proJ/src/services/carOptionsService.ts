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

/** ✅ Cast carOptionsData ให้ TypeScript เข้าใจว่า key เป็น string */
const baseData: Record<string, CarOptions> = carOptionsData as Record<string, CarOptions>;

/** ✅ โหลดข้อมูลโดยรวมระหว่าง JSON เดิมกับ localStorage */
const loadOptions = (): Record<string, CarOptions> => {
  const saved = localStorage.getItem(STORAGE_KEY);
  const storedData: Record<string, CarOptions> = saved ? JSON.parse(saved) : {};

  // รวมข้อมูลจาก JSON เดิม + LocalStorage
  const mergedData: Record<string, CarOptions> = { ...baseData };

  for (const carId in storedData) {
    if (!mergedData[carId]) {
      mergedData[carId] = storedData[carId];
    } else {
      // รวม options ของแต่ละ category
      (["colors", "wheels", "spoilers"] as Category[]).forEach((cat) => {
        const existing = mergedData[carId][cat].map((o) => o.name);
        const newItems = storedData[carId][cat].filter(
          (o: OverlayOption) => !existing.includes(o.name)
        );
        mergedData[carId][cat] = [...mergedData[carId][cat], ...newItems];
      });

      // รวม combos
      mergedData[carId].combos = [
        ...(mergedData[carId].combos || []),
        ...(storedData[carId].combos || []),
      ];
    }
  }

  return mergedData;
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

  const alreadyExists = all[publicId][category].some(
    (o) => o.name === option.name
  );
  if (!alreadyExists) {
    all[publicId][category].push(option);
  }

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

/** ✅ ส่งออกฟังก์ชัน load สำหรับหน้า CustomCar */
export const loadCarOptions = loadOptions;
