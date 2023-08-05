import {TVehicle} from "../models/vehicle.interface";

export const cleanCylindersFilters = (cylinderArr:string[], vehicles:TVehicle[]) => {
  const cylinders = vehicles.map(item => item.cylindersCapacity.value);
  // @ts-ignore
  const unique = [...new Set(cylinders)];
  return unique.sort();

};
export const cleanModels = (vehicles:TVehicle[]) => Array.from(new Set(vehicles.map((item) => item.model.name))).sort();
export const cleanBrand =  (vehicles:TVehicle[]) => Array.from(new Set(vehicles.map((item) => item.brand.name))).sort();
export const cleanYears =  (vehicles:TVehicle[]) => Array.from(new Set(vehicles.map((item) => item.details.year))).sort();

