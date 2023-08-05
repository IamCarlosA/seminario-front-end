/* eslint-disable default-param-last */
import { types } from "../types/types";

const ini = {
  jwt: "",
  refreshToken: "",
  user: {
    email: "",
    name: "",
    mobile_phone: "",
    city: "",
    address: "",
    termsAgreed: false,
    deliveryCity: "",
    deliveryAddress: "",
    deliveryDistrict: "",
    deliveryNotes: "",
    deliveryTime: "AM",
  },
};

export const userReducer = (state = ini, action: any) => {
  switch (action.type) {
    case types.user:
      return {
        ...state,
        jwt: action.payload.jwt,
        refreshToken: action.payload.refreshToken
      };
    case types.userDt:
      return {
        ...state,
        user: action.payload.user,
      };
    default:
      return state;
  }
};
