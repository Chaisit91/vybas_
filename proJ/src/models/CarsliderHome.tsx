import { useEffect, useState } from "react";
import CarSlider from "../models/CarSlider";
import type { Car } from "../types/carall";
import defaultCarsData from "../assets/data.json";
const defaultCars = defaultCarsData as Car[]; 

export default function CarSliderHome() {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("car_list_data");
    if (saved) {
      try {
        const parsed: Car[] = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setCars(parsed);
        } else {
          setCars(defaultCars);
        }
      } catch {
        setCars(defaultCars);
      }
    } else {
      setCars(defaultCars);
    }
  }, []);

  return <CarSlider cars={cars} />;
}
