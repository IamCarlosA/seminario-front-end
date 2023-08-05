import { TBrand } from "models/brand.interface";
import { PandaboardApiInstance } from "./api";

export const getBrands = (): Promise<string[]> =>
  PandaboardApiInstance
    .get("brands")
    .then((response) => response.data as string[])
    .catch(() => [] as string[]);

export const getSimulatorBrands = (): Promise<TBrand[]> =>
  PandaboardApiInstance
    .get("simulator/brands")
    .then((response) => response.data as TBrand[])
    .catch(() => [] as TBrand[]);
