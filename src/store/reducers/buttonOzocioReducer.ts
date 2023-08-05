/* eslint-disable default-param-last */
import { types } from "../types/types";

const ini = {
  loading: false,
};

export const buttonOzocioReducer = (state = ini, action: any) => {
  switch (action.type) {
    case types.ozocioLoading:
      return {
        ...state,
        loading: action.payload.loading,
      };
    default:
      return state;
  }
};
