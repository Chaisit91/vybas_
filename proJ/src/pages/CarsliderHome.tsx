import { useEffect, useState } from "react";
import CarSlider from "../components/CarSlider";
import defaultCars from "../assets/data.json";
import type { Car } from "../types/Car";

export default function Home() {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("car_list_data");
    if (saved) {
      setCars(JSON.parse(saved));
    } else {
      setCars(defaultCars);
    }
  }, []);

  return <CarSlider cars={cars} />;
}
