import { TCylinder } from "./cylinder.interface";

export interface TModel {
  id: string;
  Name: string;
}

export interface TModelByBrand {
  cylinder_capacities: TCylinder[];
  id: string;
  Name: string;
}

export interface TSimulatorModelByBrand {
  _id: string;
  cylinder_capacities: TCylinder[];
}
