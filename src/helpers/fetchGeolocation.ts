import { PandaboardApiInstance } from "./api";
import { IOzonerGeolocation } from "./getOzonerLocation";

export const fetchOzonerGeolocation = async (coords: IOzonerGeolocation) =>
  PandaboardApiInstance.post("ozoner/geolocation", coords, { requireAuth: true })
    .then((res) => res.data)
    .catch((err: any) => {
      throw err.response.data;
    });
