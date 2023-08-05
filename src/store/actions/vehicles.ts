/* eslint-disable no-unused-vars */
import { ListVehicles } from "models/vehicle.interface";
import { CACHE_TIME, getVehicles, VehiclesFilters } from "helpers/fetchVehicles";
import { RootState } from "../index";
import { types } from "../types/types";
import { Cities } from "../reducers/cityReducer";
import { SelectedFilters } from "../reducers/vehiclesReducer";
import {getCityName} from "../../components/hocs/navbar/Navbar";
import {shuffleArray} from "../../helpers/ common";

const fetchVehiclesSuccess = (vehicles: ListVehicles) => ({
  type: types.vehiclesFetchSuccess,
  payload: vehicles
});

export const updateSelectedFilters = (key: keyof SelectedFilters, value: any) => ({
  type: types.vehiclesUpdateSelectedFilter,
  payload: { key, value }
});

export const clearSelectedFilters = () => ({
  type: types.vehiclesClearSelectedFilter
});

const fetchVehiclesUpdateTimestamp = () => ({
  type: types.vehiclesFetchUpdateTimestamp
});

const fetchVehiclesCity = (city?: Cities | null) => ({
  type: types.recommendedFetchUpdateTimestamp,
  payload: city
});


export const fetchVehiclesUpdateCity = (city?: Cities | null) => ({
  type: types.vehiclesFetchUpdateCity,
  payload: city
});

const fetchVehiclesStart = () => ({
  type: types.vehiclesFetch
});

const fetchVehiclesFail = (message: string) => ({
  type: types.vehiclesFetchFail,
  payload: message
});

const needToCallApi = (timestamp: number) =>
  Math.abs((Date.now() - timestamp) / 1000) > CACHE_TIME;

const fetchVehiclesThunk =
  ({ filters }: { filters?: Partial<VehiclesFilters> }) =>
    async (dispatch: any, getState: () => RootState) => {
      try {
        const { timestamp, data, city } = getState().vehiclesReducer;
        dispatch(fetchVehiclesStart());


        let result: ListVehicles | null = data;
        if (!timestamp || needToCallApi(timestamp ) || city !== filters?.city ) {
          result = await getVehicles(filters);
          dispatch(fetchVehiclesUpdateTimestamp());
          dispatch(fetchVehiclesCity(filters?.city));
        }

        if (result) {
           dispatch(fetchVehiclesSuccess(result));
        }
      } catch (e) {
        dispatch(fetchVehiclesFail("error"));
      }
    };

export { fetchVehiclesThunk };
