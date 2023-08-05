/* eslint-disable no-case-declarations */
/* eslint-disable default-param-last */
import { TStepperozocio } from "models/stepperOzocio.interface";
import { types } from "../types/types";

const ini = {} as TStepperozocio;

export const ozonerVehiReducer = (state = ini, action: any) => {
  switch (action.type) {
    case types.ozocioVehi:
      return {
        ...action.payload.stepper,
      };
    case types.ozocioVehiBrand:
      const { brand } = action.payload;
      return {
        ...state,
        brand,
      };
    case types.ozocioVehiModel:
      const { model } = action.payload;
      return {
        ...state,
        model,
      };
    case types.ozocioVehiCyl:
      const { cylinder } = action.payload;
      return {
        ...state,
        cylinder,
      };
    case types.ozocioVehiPhoto:
      const { photo } = action.payload;
      return {
        ...state,
        photo,
      };
    default:
      return state;
  }
};
