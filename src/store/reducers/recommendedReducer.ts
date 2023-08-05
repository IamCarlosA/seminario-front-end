/* eslint-disable default-param-last */
import { TVehicle } from "models/vehicle.interface";
import { types } from "../types/types";
import { Cities } from "./cityReducer";

export interface RecommendedReducerState {
  data: TVehicle[];
  loading: boolean;
  timestamp: number | null;
  error: string | null;
  city?: Cities;
}

const INITIAL_STATE: RecommendedReducerState = {
  data: [],
  loading: false,
  timestamp: null,
  error: null,
};

export const recommendedReducer = (
  state: RecommendedReducerState = INITIAL_STATE,
  action: { type: Partial<typeof types>; payload: any }
) => {
  switch (action.type) {
    case types.recommendedFetch:
      return { ...state, loading: true, data: [] };
    case types.recommendedFetchSuccess:
      return { ...state, loading: false, data: [...action.payload] };
    case types.recommendedFetchFail:
      return { ...state, loading: false, error: action.payload };
    case types.recommendedFetchUpdateTimestamp:
      return { ...state, timestamp: Date.now() };
    case types.recommendedFetchUpdateCity:
      return { ...state, city: action.payload };
    default:
      return state;
  }
};
