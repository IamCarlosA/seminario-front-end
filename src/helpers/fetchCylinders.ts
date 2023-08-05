import { WebApiInstance } from "./api";

export const getCylinders = (): Promise<string[]> =>
  WebApiInstance
    .get("cylinder-capacities")
    .then((response) => response.data as string[])
    .catch(() => [] as string[]);
