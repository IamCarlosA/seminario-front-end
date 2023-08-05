import axios, { CancelTokenSource } from "axios";
import { TVehicle } from "models/vehicle.interface";
import { Cities } from "../store/reducers/cityReducer";
import { PandaboardApiInstance } from "./api";

let source: CancelTokenSource;
export const getVehiclesRecommended = (country: string, city?: Cities): Promise<TVehicle[]> => {
  if(source){
    source.cancel();
  }
  const {CancelToken} = axios;
  source = CancelToken.source();
  return PandaboardApiInstance.get(
    "vehicle/recommended",{params: {countryIso: country, cityId: city}, cancelToken: source.token }
  )
    .then((response) => response.data.map((vehicle: any) => new TVehicle(vehicle)))
    .catch((e) => {
      if (axios.isCancel(e)) {
        console.log("Request canceled", e.message);
      }
      return [] as TVehicle[];});
};
