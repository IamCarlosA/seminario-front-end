/* eslint-disable no-shadow */
import { invoice } from "models/enums/typeInvoice";
import { types } from "../types/types";

export const changeInvoice = (invoice: invoice) => ({
  type: types.invoice,
  payload: {
    invoice,
  },
});
