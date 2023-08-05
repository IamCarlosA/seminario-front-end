import { TSimulatorModelByBrand, TModelByBrand } from "models/model.interface";
import { PandaboardApiInstance } from "./api";

export const getModels = (): Promise<string[]> =>
  PandaboardApiInstance
    .get("models")
    .then((response) => response.data as string[])
    .catch(() => [] as string[]);

export const getSimulatorModelsByBrand = (
  brand: string
): Promise<TSimulatorModelByBrand[]> =>
  PandaboardApiInstance
    .get(`simulator/models/${brand}`)
    .then((response) => response.data as TSimulatorModelByBrand[])
    .catch(() => [] as TSimulatorModelByBrand[]);

export const getModelsByBrand = (brand: string): Promise<TModelByBrand[]> =>
  PandaboardApiInstance
    .get(`models/brand/${brand}`)
    .then((response) => response.data as TModelByBrand[])
    .catch(() => [] as TModelByBrand[]);
