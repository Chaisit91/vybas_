export interface Car {
  id: number;
  name: string;
  tagline: string;
  image: string;
  sideLeft: string;
  sideRight: string;
  specs?: string;
  publicId: string;
}

export interface OverlayOption {
  name: string;
  image: string;
}

export interface CarOptions {
  [key: string]: {
    colors: OverlayOption[];
    wheels: OverlayOption[];
    exhausts: OverlayOption[];
    windows: OverlayOption[];
    spoilers: OverlayOption[];
  };
}
