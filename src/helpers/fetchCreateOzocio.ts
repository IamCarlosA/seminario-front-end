import {
  DtoCreateOzocio,
  DtoResponseOzocio,
  DtoOzocioVehicle,
  DtoResponseOzocioVehicleSucces,
} from "models/ozocio.interface";
import { PandaboardApiInstance } from "./api";

export const fetchCreateOzocio = async (
  ozocio: DtoCreateOzocio
): Promise<DtoResponseOzocio> =>
  PandaboardApiInstance.post("ozocio", ozocio)
    .then(({ data }) => data)
    .catch((err: any) => {
      throw err.response.data;
    });

export const fetchCreateOzocioVehicle = async (
  vehicle: DtoOzocioVehicle,
  oid: string
): Promise<DtoResponseOzocioVehicleSucces> =>
  PandaboardApiInstance.post(`ozocio/${oid}/vehicle`, vehicle)
    .then(({ data }) => data)
    .catch((err: any) => {
      throw err.response.data;
    });
