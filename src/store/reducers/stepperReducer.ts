/* eslint-disable default-param-last */
import { types } from "../types/types";

const ini = {
  stepper: 0,
  button: 0,
};

type acti = {
  payload: {
    stepper: number;
    button: number;
  };
  type: string;
};

export const stepperReducer = (state = ini, action: acti) => {
  switch (action.type) {
    case types.stepper:
      return {
        ...state,
        stepper: action.payload.stepper,
      };
    case types.btnStepper:
      return {
        ...state,
        button: action.payload.button,
      };
    case types.restStep:
      return {
        ...ini,
      };

    default:
      return state;
  }
};
