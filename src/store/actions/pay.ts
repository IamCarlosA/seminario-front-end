import { Dispatch } from "redux";
import { TVehicle } from "models/vehicle.interface";
import { types } from "../types/types";

export const setVehiclePay = (vehicle: TVehicle = {} as TVehicle) => ({
  type: types.payV,
  payload: {
    vehicle,
  },
});

export const setTypeTrans = (trans: string, finan: string) => ({
  type: types.payT,
  payload: {
    trans,
    finan,
  },
});

export const startSub =
  (
    vehicle: TVehicle = {} as TVehicle,
    trans: string = "",
    finan: string = ""
  ) =>
  (dispatch: Dispatch) => {
    dispatch(setVehiclePay(vehicle));
    dispatch(setTypeTrans(trans, finan));
  };

export const changeSure = (sure: boolean) => ({
  type: types.payS,
  payload: {
    sure,
  },
});

export const changeDelivery = (delivery: boolean) => ({
  type: types.payD,
  payload: {
    delivery,
  },
});
