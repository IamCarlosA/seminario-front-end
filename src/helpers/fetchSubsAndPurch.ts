import { WebApiInstance } from "./api";

export const fetchRent = (
  token: string,
  vehicleId: string,
  iso: string,
  gateway: string,
  method: string,
  insurance: boolean,
  delivery: boolean,
  couponCode: string
) => WebApiInstance
    .post("subscriptions/add", {
      token,
      vehicleId,
      iso,
      gateway,
      method,
      insurance,
      delivery,
      couponCode,
    }, {requireAuth: true})
    .then((res) => res.data)
    .catch(() => null);

export const fetchBuy = (
  token: string,
  vehicleId: string,
  iso: string,
  gateway: string,
  method: string,
  couponCode: string,
  financing: string = "1"
) => WebApiInstance
    .post("purchases/add", {
      token,
      vehicleId,
      iso,
      gateway,
      method,
      couponCode,
      financing,
    }, {requireAuth: true})
    .then((res) => res.data)
    .catch(() => null);
