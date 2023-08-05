import { types } from "../types/types";
import { TVehicle } from "../../models/vehicle.interface";

export interface ICreditVerificationReducerState {
  selectedVehicle: TVehicle | null
  selectedCreditTime: number | null
}

const DEFAULT_STATE : ICreditVerificationReducerState = {
  selectedVehicle: null,
  selectedCreditTime: null
};

// eslint-disable-next-line default-param-last
export const creditVerificationReducer = (state = DEFAULT_STATE, action: any) => {
  switch (action.type) {
    case types.creditVerificationSetVehicle:
      return {
        ...state,
        selectedVehicle: action.payload
      };
    case types.creditVerificationSetCreditTime:
      return {
        ...state,
        selectedCreditTime: action.payload
      };
    default:
      return state;
  }
};
