import { PandaboardApiInstance } from "./api";

export const fetchConekta = (internalId?: string) => PandaboardApiInstance
    .post("conekta", {
      internalId,
    }, { requireAuth: true })
    .then((res) => res.data)
    .catch((err: any) => {
      throw err.response.data;
    });

export const fetchSeparate = (
  response: any,
  internalId: string = ""
) => PandaboardApiInstance
    .post("separate", {
      internalId,
      response,
    }, { requireAuth: true })
    .then((res) => res.data)
    .catch((err: any) => {
      throw err.response.data;
    });
