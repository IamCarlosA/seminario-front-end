/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */

import axios, { AxiosResponse, CancelTokenSource } from "axios";
import { ITVehicle, ListVehicles, TVehicle} from "models/vehicle.interface";
import {Cities} from "../store/reducers/cityReducer";
import {serialize} from "./serialize";
import {PandaboardApiInstance} from "./api";
import {cleanBrand, cleanCylindersFilters, cleanModels, cleanYears} from "./formatFilters";
import {colorOptions} from "./typesVehicles";
import {shuffleArray} from "./ common";

interface IColorOptions {
  value: string;
  label: string;
}

export interface VehiclesFilters {
  brands: string[];
  cylinder_Capacities: string[];
  years: number[];
  city: Cities;
  milages?: number[]
  page?: string;
  sort?: string;
  colors?: IColorOptions[];
  ranges?: number[];
  models?: string[];
}

export interface GetVehiclesResponse {
  vehicles: TVehicle[];
  filters: Omit<VehiclesFilters, "city">;
}

export const CACHE_TIME =  10 * 1000; // 10 Minutes

let source: CancelTokenSource;
export const getVehicles = async (filters?: Partial<VehiclesFilters>): Promise<ListVehicles | null> => {

  /*
    Pagination is being made on the FE
    for better filter performance and CACHE stragtegy
  * */
  const customFilters = {
    limit: 1000,
    visible: true,
    status: "available"
  };

  try {
    if (source) {
      source.cancel();
    }
    const {CancelToken} = axios;
    source = CancelToken.source();
    const filtersString = serialize({...customFilters, ...filters});
    const url = `/vehicle${filtersString ? `?${filtersString}` : ""}`;
    // const filtersString = serialize(filters);
    // const url = `strapi/vehicles${filtersString ? `?${filtersString}&` : ""}`;

    const result: AxiosResponse<any> = await PandaboardApiInstance.get(url, {
        cancelToken: source.token
      }
    );
    const cylinderCapacities = cleanCylindersFilters(result.data.filters.cylinder_Capacities, result.data.data);
    const models:string[] = cleanModels(result.data.data);
    const brands:string[] = cleanBrand(result.data.data);
    const years:string[] = cleanYears(result.data.data);
    const colors:IColorOptions[] = colorOptions;

    const vehicleInstace = result.data.data.map((item: ITVehicle) => new TVehicle(item));

    const fetchVehicleResponse = {
      vehicles: shuffleArray(vehicleInstace),
      filters: {...(result.data.filters),brands, cylinder_Capacities: cylinderCapacities, range:[], models,years, colors},
      // filters: result.data.filters
    } as ListVehicles;


    return fetchVehicleResponse;
  } catch (e:any) {
    if (axios.isCancel(e)) {
      console.log("Request canceled", e.message);
    }
    return null;
  }
};

export const getVehicle = (id: string): Promise<TVehicle | null> =>
  PandaboardApiInstance
    .get(`vehicle/${id}`)
    .then((response) => new TVehicle(response.data))
    .catch(() => null);
