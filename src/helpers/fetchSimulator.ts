/* eslint-disable camelcase */

import { PandaboardApiInstance } from "./api";

export const fetchSimulator = (
  brand: string,
  model: string,
  cylinderCapacity: string,
  mileag: number,
  year: number,
  mileageOther?: number,
  brandOther?: string
) => {
  const mileage = mileag;
  return PandaboardApiInstance.post(
    "simulator/generate",
    {
      brand,
      model,
      cylinderCapacity,
      mileage,
      year,
      mileageOther,
      brandOther,
    },
    { requireAuth: true }
  )
    .then((res) => res.data)
    .catch((err: any) => {
      throw err.response.data;
    });
};
