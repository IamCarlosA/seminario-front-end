/* eslint-disable default-param-last */
import { types } from "../types/types";

// eslint-disable-next-line no-shadow,no-unused-vars
export enum Cities {
  // eslint-disable-next-line no-unused-vars
  CDMX = "602479bab88ce81d7ea7a275",
  // eslint-disable-next-line no-unused-vars
  GUADALAJARA = "62c2f56d235e93fe7cf3bd5c",
  NO_CITY = ""
}

export interface CityState {
  city?: Cities;
}

export const cityReducer = (state: CityState = {}, action: any) => {
  switch (action.type) {
    case types.changeCity:
      return {
        city: action.payload.city
      };
    default:
      return state;
  }
};
