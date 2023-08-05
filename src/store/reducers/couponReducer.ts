/* eslint-disable default-param-last */
import { types } from "../types/types";

export const couponReducer = (state = {}, action: any) => {
  switch (action.type) {
    case types.coupon:
      return {
        ...action.payload.coupon,
      };
    default:
      return state;
  }
};
