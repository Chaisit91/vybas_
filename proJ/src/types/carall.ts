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

export interface OverlayOption {
  name: string;
  image: string;
}

export type Category = "colors" | "wheels" | "spoilers";

export interface Combo {
  selected: Partial<Record<Category, string>>;
  image: string;
}

export interface CarOptions {
  colors: OverlayOption[];
  wheels: OverlayOption[];
  spoilers: OverlayOption[];
  combos: Combo[];
}

export type AllCarOptions = Record<string, CarOptions>;

export type SelectedOptions = Record<Category, OverlayOption | null>;

export type SelectedOptionNames = Partial<Record<Category, string>>;