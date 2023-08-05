/* eslint-disable default-param-last */
import { types } from "../types/types";

const ini = {
  city: "Todas",
  typev: "Todos",
  forSell: false,
};

type acti = {
  payload: {
    city: string;
    typev: string;
    forsell: boolean;
  };
  type: string;
};

export const selectReducer = (state = ini, action: acti) => {
  switch (action.type) {
    case types.select:
      return {
        ...state,
        city: action.payload.city,
        typev: action.payload.typev,
      };
    case types.city:
      return {
        ...state,
        city: action.payload.city,
      };
    case types.forSellS:
      return {
        ...state,
        forSell: action.payload.forsell,
      };
    default:
      return state;
  }
};
