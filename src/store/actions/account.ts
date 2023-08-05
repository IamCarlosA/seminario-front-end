import { TVehicle } from "models/vehicle.interface";
import { TDataozoner } from "models/ozoner.interface";
import { TCredit, TCreditTotals } from "models/credit.interface";
import { TCreditPayment } from "models/credit-payment.interface";
import { types } from "../types/types";

export const AddAllDataAccount = (
  creditTotals: TCreditTotals,
  lastPayment: TCreditPayment,
  credit: TCredit,
  ozoner: TDataozoner,
  vehicle: TVehicle
) => ({
  type: types.AddAllDataAccount,
  payload: {
    creditTotals,
    lastPayment,
    credit,
    ozoner,
    vehicle,
  },
});
