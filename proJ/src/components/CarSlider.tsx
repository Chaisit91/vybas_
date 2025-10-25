// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import type { Car } from "../types/Car";
// import Button from "./Button";
// import Navbar from "./Navbar";

// interface CarSliderProps {
//   cars: Car[];
// }

// const CarSlider: React.FC<CarSliderProps> = ({ cars }) => {
//   const [index, setIndex] = useState<number>(0);
//   const car = cars[index];
//   const navigate = useNavigate();

//   const next = () => setIndex((i: number) => (i + 1) % cars.length);
//   const prev = () => setIndex((i: number) => (i - 1 + cars.length) % cars.length);

//   useEffect(() => {
//     const interval = setInterval(next, 12000);
//     return () => clearInterval(interval);
//   }, [cars]);

//   return (
//     <>
//       <Navbar />

//       <section className="min-h-screen flex flex-col items-center justify-center bg-white text-center pt-24 relative overflow-hidden">
//         <img
//           src={car.sideLeft}
//           className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 opacity-20 hidden md:block"
//         />
//         <img
//           src={car.sideRight}
//           className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 opacity-20 hidden md:block"
//         />

//         <div className="animate-fadeIn">
//           <h2 className="text-3xl font-bold text-gray-900 mt-6">{car.name}</h2>
//           <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 mt-4 mb-8">
//             {car.tagline}
//           </h1>

//           <img
//             src={car.image}
//             alt={car.name}
//             className="w-[80vw] md:w-[60vw] mx-auto drop-shadow-xl transition-transform duration-700 hover:scale-105"
//           />

//           <div className="flex gap-4 mt-10 justify-center">
//             <Button
//               label="EXPLORE THE MODEL →"
//               variant="primary"
//               onClick={() => navigate("/custom-car", { state: { car } })}
//             />
//             <Button label="DOWNLOAD BROCHURE ↓" variant="outline" />
//           </div>

//           <p className="text-xs text-gray-700 mt-10 max-w-4xl mx-auto px-4">
//             {car.specs}
//           </p>
//         </div>

//         <button
//           onClick={prev}
//           className="absolute left-4 top-1/2 transform -translate-y-1/2 border border-black rounded-full p-3 hover:bg-black hover:text-white"
//         >
//           ‹
//         </button>
//         <button
//           onClick={next}
//           className="absolute right-4 top-1/2 transform -translate-y-1/2 border border-black rounded-full p-3 hover:bg-black hover:text-white"
//         >
//           ›
//         </button>
//       </section>
//     </>
//   );
// };

// export default CarSlider;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Car } from "../types/Car";
import Button from "./Button";
import Navbar from "./Navbar";

interface CarSliderProps {
  cars: Car[];
}

const CarSlider: React.FC<CarSliderProps> = ({ cars }) => {
  const [index, setIndex] = useState<number>(0);
  const car = cars[index];
  const navigate = useNavigate();

  const next = () => setIndex((i) => (i + 1) % cars.length);
  const prev = () => setIndex((i) => (i - 1 + cars.length) % cars.length);

  useEffect(() => {
    const interval = setInterval(next, 12000);
    return () => clearInterval(interval);
  }, [cars]);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-white text-center pt-24 relative overflow-hidden">
      <img
        src={car.sideLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 opacity-20 hidden md:block"
      />
      <img
        src={car.sideRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 opacity-20 hidden md:block"
      />

      <div className="animate-fadeIn">
        <h2 className="text-3xl font-bold text-gray-900 mt-6">{car.name}</h2>
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 mt-4 mb-8">
          {car.tagline}
        </h1>

        <img
          src={car.image}
          alt={car.name}
          className="w-[80vw] md:w-[60vw] mx-auto drop-shadow-xl transition-transform duration-700 hover:scale-105"
        />

        <div className="flex gap-4 mt-10 justify-center">
          <Button
            label="EXPLORE THE MODEL →"
            variant="primary"
            onClick={() => navigate("/custom-car", { state: { car } })}
          />
          <Button label="DOWNLOAD BROCHURE ↓" variant="outline" />
        </div>

        <p className="text-xs text-gray-700 mt-10 max-w-4xl mx-auto px-4">
          {car.specs}
        </p>
      </div>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 border border-black rounded-full p-3 hover:bg-black hover:text-white"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 border border-black rounded-full p-3 hover:bg-black hover:text-white"
      >
        ›
      </button>
    </section>
  );
};

export default CarSlider;
