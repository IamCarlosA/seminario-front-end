import { TStepperozocio } from "models/stepperOzocio.interface";
import { types } from "../types/types";

export const changeStepperOzocio = (stepper: TStepperozocio) => ({
  type: types.ozocioVehi,
  payload: {
    stepper,
  },
});

export const changeValueBrand = (brand: string) => ({
  type: types.ozocioVehiBrand,
  payload: {
    brand,
  },
});

export const changeValueModel = (model: string) => ({
  type: types.ozocioVehiModel,
  payload: {
    model,
  },
});

export const changeValueCylinder = (cylinder: string) => ({
  type: types.ozocioVehiCyl,
  payload: {
    cylinder,
  },
});

export const changeValuePhoto = (photo: File) => ({
  type: types.ozocioVehiPhoto,
  payload: {
    photo,
  },
});
