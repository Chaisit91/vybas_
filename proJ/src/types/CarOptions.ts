// src/types/CarOptions.ts
export interface OverlayOption {
  name: string;
  image: string;
}

export interface Combo {
  selected: Record<string, string>;
  image: string;
}

export interface CarOptions {
  colors: OverlayOption[];
  wheels: OverlayOption[];
  exhausts: OverlayOption[];
  windows: OverlayOption[];
  spoilers: OverlayOption[];
  combos: Combo[];
}
