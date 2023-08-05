import { types } from "../types/types";
import { Cities } from "../reducers/cityReducer";

export const changeRootCity = (city: Cities) => ({
    type: types.changeCity,
    payload: {
      city,
    },
  });
