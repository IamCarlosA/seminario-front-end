import {
  TUserDate,
  TUserWaitlist,
} from "models/userpayment.interface";
import { WebApiInstance } from "./api";


export const fetchUserDate = (fdata: TUserDate) =>
  WebApiInstance
    .post("users/checkin", fdata)
    .then((res) => res.data)
    .catch((err: any) => {
      throw err.response.data;
    });

export const fetchUserWaitlist = (fdata: TUserWaitlist) =>
  WebApiInstance
    .post("users/checkin", fdata)
    .then((res) => res.data)
    .catch((err: any) => {
      throw err.response.data;
    });
