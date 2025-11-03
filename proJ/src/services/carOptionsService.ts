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

const baseData: Record<string, CarOptions> = carOptionsData as Record<string, CarOptions>;

const loadOptions = (): Record<string, CarOptions> => {
  const saved = localStorage.getItem(STORAGE_KEY);
  const stored = saved ? JSON.parse(saved) : {};
  return { ...baseData, ...stored };
};

const saveOptions = (data: Record<string, CarOptions>) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

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

export const getCarOptions = (publicId: string): CarOptions | null => {
  const all = loadOptions();
  return all[publicId] || null;
};

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
