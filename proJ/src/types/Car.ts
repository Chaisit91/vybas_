export interface Car {
  id: number;
  publicId?: string; // <-- ทำให้ optional
  name: string;
  tagline: string;
  image: string;
  sideLeft: string;
  sideRight: string;
  specs: string;
}
