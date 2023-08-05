/* eslint-disable default-param-last */
import { TVehicle } from "models/vehicle.interface";
import { types } from "../types/types";

const ini = {
  vehicle: {} as TVehicle,
};

export const datevReducer = (state = ini, action: any) => {
  switch (action.type) {
    case types.date:
      return {
        ...state,
        vehicle: action.payload.vehicle,
      };
    default:
      return state;
  }
};
