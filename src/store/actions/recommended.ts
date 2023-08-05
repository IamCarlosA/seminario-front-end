/* eslint-disable no-unused-vars */
import { CACHE_TIME } from "helpers/fetchVehicles";
import { getVehiclesRecommended } from "helpers/fetchRecommended";
import { TVehicle } from "models/vehicle.interface";
import { RootState } from "../index";
import { types } from "../types/types";
import { Cities } from "../reducers/cityReducer";

const fetchVehiclesSuccess = (vehicles: TVehicle[]) => ({
  type: types.recommendedFetchSuccess,
  payload: vehicles,
});

const fetchVehiclesUpdateTimestamp = () => ({
  type: types.recommendedFetchUpdateTimestamp,
});

const fetchVehiclesCity = (city?: Cities | null) => ({
  type: types.recommendedFetchUpdateTimestamp,
  payload: city
});

const fetchRecommendedStart = () => ({
  type: types.recommendedFetch,
});

const fetchVehiclesFail = (message: string) => ({
  type: types.recommendedFetchFail,
  payload: message,
});

const needToCallApi = (timestamp: number) =>
  Math.abs((Date.now() - timestamp) / 1000) > CACHE_TIME;

export interface RecommendedFilters {
  country?: string;
  city?: Cities;
}

const fetchRecommendedThunk =
  ( filters : RecommendedFilters) =>
  async (dispatch: any, getState: () => RootState) => {
    try {
      const { timestamp, data, city } = getState().recommendedReducer;
      dispatch(fetchRecommendedStart());

      let result: TVehicle[] | null = data;

      if (!timestamp || needToCallApi(timestamp) || city !== filters.city) {
        result = await getVehiclesRecommended("MX", filters.city);
        dispatch(fetchVehiclesUpdateTimestamp());
        dispatch(fetchVehiclesCity(filters.city));
      }

      if (result) {
        dispatch(fetchVehiclesSuccess(result));
      }
    } catch (e) {
      dispatch(fetchVehiclesFail("error"));
    }
  };

export { fetchRecommendedThunk };
