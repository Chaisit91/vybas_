import defaultOptions from "../assets/carOptions.json";

const STORAGE_KEY = "car_options_data";

export const loadCarOptions = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : { ...defaultOptions };
};

export const saveCarOptions = (data: any) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

/** เพิ่ม car ใหม่เข้าไปใน car_options_data */
export const addCarToOptions = (publicId: string) => {
  const all = loadCarOptions();
  if (!all[publicId]) {
    all[publicId] = {
      colors: [],
      wheels: [],
      spoilers: [],
      combos: [],
    };
    saveCarOptions(all);
  }
};
