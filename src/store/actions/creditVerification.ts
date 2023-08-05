import { TVehicle } from "../../models/vehicle.interface";
import { types } from "../types/types";

export const setCreditVerificationVehicleAction = (vehicle: TVehicle) => ({
  type: types.creditVerificationSetVehicle,
  payload: vehicle,
});

export const clearCreditVerificationVehicleAction = () => ({
  type: types.creditVerificationSetVehicle,
  payload: null,
});

export const setCreditVerificationCreditTimeAction = (weeks: number) => ({
  type: types.creditVerificationSetCreditTime,
  payload: weeks,
});

export const clearCreditVerificationCreditTimeAction = () => ({
  type: types.creditVerificationSetCreditTime,
  payload: null,
});
