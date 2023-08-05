import { WebApiInstance } from "./api";

export const fetchWaitlist = (vehicleId: string) => WebApiInstance
    .post("waitlists", {
      vehicleId,
    }, {requireAuth: true})
    .then((res) => res.data)
    .catch(() => null);
