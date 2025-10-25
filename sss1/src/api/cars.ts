import axios from "axios";
import type { Car } from "../types/Car";

export const fetchCars = async (): Promise<Car[]> => {
  const response = await axios.get("/src/assets/data.json");
  return response.data;
};
