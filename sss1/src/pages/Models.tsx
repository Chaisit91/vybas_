import { useEffect, useState } from "react";
import { fetchCars } from "../api/cars";
import type { Car } from "../types/Car";
import CarSlider from "../components/CarSlider";

const Models = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCars()
      .then((data) => setCars(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-40">Loading cars...</p>;
  if (!cars.length) return <p className="text-center mt-40">No car data found.</p>;

  return <CarSlider cars={cars} />;
};

export default Models;
