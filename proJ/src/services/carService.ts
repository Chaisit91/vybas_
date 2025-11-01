import carData from '../assets/data.json';

export interface Car {
  id: number;
  name: string;
  tagline: string;
  image: string;
  sideLeft: string;
  sideRight: string;
  publicId: string;
}

const STORAGE_KEY = 'cars_data';

const loadCars = (): Car[] => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [...carData];
};

const saveCars = (cars: Car[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
};

export const getAllCars = (): Car[] => loadCars();

export const createCar = (carData: Omit<Car, 'id'>): Car => {
  const cars = loadCars();
  const newId = Math.max(...cars.map(c => c.id), 0) + 1;
  const newCar: Car = { id: newId, ...carData };
  cars.push(newCar);
  saveCars(cars);
  return newCar;
};

export const deleteCar = (id: number): boolean => {
  const cars = loadCars();
  const index = cars.findIndex(c => c.id === id);
  if (index === -1) return false;
  cars.splice(index, 1);
  saveCars(cars);
  return true;
};

export const resetCars = (): void => {
  saveCars([...carData]);
};
