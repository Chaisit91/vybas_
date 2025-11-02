import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import type { Car } from "../types/Car";
import defaultCarsData from "../assets/data.json";

const defaultCars = defaultCarsData as Car[];

interface CarSliderProps {
  cars?: Car[];
}

const CarSlider: React.FC<CarSliderProps> = ({ cars }) => {
  const navigate = useNavigate();
  const [carList, setCarList] = useState<Car[]>(cars || []);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("car_list_data");
    if (saved) {
      try {
        const parsed: Car[] = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const merged = [
            ...defaultCars,
            ...parsed.filter(
              (newCar: Car) =>
                !defaultCars.some((oldCar: Car) => oldCar.id === newCar.id)
            ),
          ];
          setCarList(merged);
        } else {
          setCarList(defaultCars);
        }
      } catch {
        setCarList(defaultCars);
      }
    } else {
      setCarList(defaultCars);
    }
  }, []);

  const car = carList[index];
  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
        No cars available.
      </div>
    );
  }

  const next = () => setIndex((i) => (i + 1) % carList.length);
  const prev = () => setIndex((i) => (i - 1 + carList.length) % carList.length);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-white text-center pt-24 relative overflow-hidden">
      <div className="animate-fadeIn">
        <h2 className="text-3xl font-bold text-gray-900 mt-6">{car.name}</h2>
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 mt-4 mb-8">
          {car.tagline}
        </h1>

        <img
          src={car.image}
          alt={car.name}
          className="w-[80vw] mx-auto drop-shadow-xl transition-transform duration-700 hover:scale-105 rounded-lg"
        />

        <div className="flex gap-4 mt-10 justify-center">
          <Button
            label="EXPLORE THE MODEL →"
            variant="primary"
            onClick={() => navigate("/custom-car", { state: { car } })}
          />
        </div>
      </div>

      {carList.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 border border-black rounded-full p-3 hover:bg-black hover:text-white transition"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 border border-black rounded-full p-3 hover:bg-black hover:text-white transition"
          >
            ›
          </button>
        </>
      )}
    </section>
  );
};

export default CarSlider;