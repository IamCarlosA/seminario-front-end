import { TCoupon } from "models/coupon.interface";
import { WebApiInstance } from "./api";

export const getCoupon = (code: string): Promise<TCoupon | null> => {
  return WebApiInstance
    .get(`coupons?code=${code}`)
    .then((response) => response.data[0] as TCoupon)
    .catch(() => null);
};
