import { types } from "../types/types";
import { TVehicle } from "../../models/vehicle.interface";

export const setVehicleDate = (vehicle: TVehicle = {} as TVehicle) => ({
  type: types.date,
  payload: {
    vehicle,
  },
});
