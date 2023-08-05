/* eslint-disable default-param-last */
import { TVehicle } from "models/vehicle.interface";
import { types } from "../types/types";

const ini = {
  vehicle: {} as TVehicle,
  typeTrans: "",
  financing: "",
  sure: false,
  delivery: false,
};

export const payReducer = (state = ini, action: any) => {
  switch (action.type) {
    case types.payV:
      return {
        ...state,
        vehicle: action.payload.vehicle,
      };

    case types.payT:
      return {
        ...state,
        typeTrans: action.payload.trans,
        financing: action.payload.finan,
      };
    case types.payS:
      return {
        ...state,
        sure: action.payload.sure,
      };
    case types.payD:
      return {
        ...state,
        delivery: action.payload.delivery,
      };
    default:
      return state;
  }
};
