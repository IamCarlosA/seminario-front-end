import { WebApiInstance } from "./api";

export const fetchDate = (vehicleId: string, date: string) => WebApiInstance
    .post("dates/add", {
      vehicleId,
      date,
    }, {
      headers: {
        contentType: "application/json",
      }
    })
    .then((res) => res.data)
    .catch(() => null);
