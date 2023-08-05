import { types } from "../types/types";

export const changeStepper = (stepper: number) => ({
  type: types.stepper,
  payload: {
    stepper,
  },
});
export const changeBtnStepper = (button: number) => ({
  type: types.btnStepper,
  payload: {
    button,
  },
});

export const resetStepper = () => ({
  type: types.restStep,
});
