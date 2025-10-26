import CarSlider from "../components/CarSlider";
import carsData from "../assets/data.json";
import type { Car } from "../types/Car";

const Models = () => {
  const cars = carsData as Car[];
  return <CarSlider cars={cars} />;
};

export default Models;
