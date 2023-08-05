/* eslint-disable default-param-last */
import { types } from "../types/types";

const ini = {
  country: "MX",
};

export const countryReducer = (state = ini, action: any) => {
  switch (action.type) {
    case types.country:
      return {
        country: action.payload.country,
      };
    default:
      return state;
  }
};
