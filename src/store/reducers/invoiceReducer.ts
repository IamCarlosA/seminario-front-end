/* eslint-disable default-param-last */
import { invoice } from "models/enums/typeInvoice";
import { types } from "../types/types";

export const invoiceReducer = (state = {} as invoice, action: any) => {
  switch (action.type) {
    case types.invoice:
      return {
        ...action.payload.invoice,
      };
    default:
      return state;
  }
};
