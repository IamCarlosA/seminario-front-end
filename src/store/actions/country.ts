import { types } from "../types/types";

export const changeCountry = (country: string) => {
  localStorage.setItem("country-ozon", country);
  return {
    type: types.country,
    payload: {
      country,
    },
  };
};
