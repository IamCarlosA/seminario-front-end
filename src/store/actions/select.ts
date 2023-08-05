import { types } from "../types/types";

export const changeSelect = (city: string, typev: string) => ({
  type: types.select,
  payload: {
    city,
    typev,
  },
});
export const changeCity = (city: string) => ({
  type: types.city,
  payload: {
    city,
  },
});

export const changeForsell = (forsell: boolean) => ({
  type: types.forSellS,
  payload: {
    forsell,
  },
});
