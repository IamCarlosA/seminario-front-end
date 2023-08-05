import { types } from "../types/types";

export const insertCoupon = (coupon: any) => ({
  type: types.coupon,
  payload: {
    coupon,
  },
});
