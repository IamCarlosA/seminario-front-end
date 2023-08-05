/* eslint-disable default-param-last */
import _ from "lodash";
import { ListVehicles } from "models/vehicle.interface";
import { types } from "../types/types";
import { Cities } from "./cityReducer";

export type SelectedFilters = {
  year: number[],
  cylinder: number,
  brand: string,
  kmTo: number[],
  searchText: string,
  color: string;
  range: number[];
  weeks: number[];
  model: string,
};

export interface VehiclesReducerState {
  data: ListVehicles;
  loading: boolean;
  fetched: boolean,
  timestamp: number | null;
  error: string | null;
  city?: Cities;
  selectedFilters?: SelectedFilters
}

const INITIAL_STATE: VehiclesReducerState = {
  data: { filters: {}, vehicles: [] },
  loading: false,
  fetched: false,
  timestamp: null,
  error: null
};

export const vehiclesReducer = (
  state: VehiclesReducerState = INITIAL_STATE,
  action: { type: Partial<typeof types>; payload: any }
) => {
  switch (action.type) {
    case types.vehiclesFetch:
      return { ...state, loading: true, fetched: false, data: [] };
    case types.vehiclesFetchSuccess:
      return { ...state, loading: false, fetched: true, data: { ...state.data, ...action.payload } };
    case types.vehiclesFetchFail:
      return { ...state, loading: false, error: action.payload };
    case types.vehiclesFetchUpdateTimestamp:
      return { ...state, timestamp: Date.now() };
    case types.vehiclesFetchUpdateCity:
      console.log(action.payload);
      return { ...state, city: action.payload };
    case types.vehiclesUpdateSelectedFilter:
      return {
        ...state,
        selectedFilters: _.omitBy({
          ...state.selectedFilters,
          [action.payload.key]: action.payload.value
        }, _.isUndefined)
      };
    case types.vehiclesClearSelectedFilter:
      return { ...state, selectedFilters: "" };
    default:
      return state;
  }
};
