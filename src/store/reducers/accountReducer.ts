/* eslint-disable default-param-last */
import { TCreditPayment } from "models/credit-payment.interface";
import { TCredit, TCreditTotals } from "models/credit.interface";
import { TDataozoner } from "models/ozoner.interface";
import { TVehicle } from "models/vehicle.interface";
import { types } from "../types/types";


export interface TMyAccount {
  creditTotals?: TCreditTotals;
  lastPayment?: TCreditPayment;
  credit?: TCredit;
  ozoner?: TDataozoner;
  vehicle?: TVehicle;
}

export const accountReducer = (state: TMyAccount = {}, action: any) => {
  switch (action.type) {
    case types.AddAllDataAccount:
      return {
        creditTotals: action.payload.creditTotals,
        lastPayment: action.payload.lastPayment,
        credit: action.payload.credit,
        ozoner: action.payload.ozoner,
        vehicle: action.payload.vehicle,
      };
    default:
      return state;
  }
};
