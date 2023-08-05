import { PandaboardApiInstance } from "./api";

export const fetchLogin = async (email: string, password: string) =>
  PandaboardApiInstance
    .post("auth-client/login", { email, password })
    .then((res) => res.data)
    .catch((err: any) => {
      throw err.response.data;
    });

export const fetchGetIdCredit = async (idOzoner: string) =>
  PandaboardApiInstance
    .get(`credit/ozoner/${idOzoner}`)
    .then((res) => res.data)
    .catch((err: any) => {
      throw err.response.data;
    });



export const fetchGetCreditTotals = async (id: string) =>
  PandaboardApiInstance
    .get(`credit/${id}/totals`)
    .then((res) => res.data)
    .catch((err: any) => {
      throw err.response.data;
    });
