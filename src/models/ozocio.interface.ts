export interface TOzocio {
  name: string;
  email: string;
  mobile_phone: string;
  city: string;
  address: string;
  termsAgreed: boolean;
}

export interface TModels {
  name: string;
  cylinder: string[];
}

export interface DtoCreateOzocio {
  name: string;
  email: string;
  phone: string;
}

export interface DtoOzocioVehicle {
  brand: string;
  model: string;
  cylinderCapacity: string;
  km: number;
  year: number;
}

export interface DtoResponseOzocio {
  _id: string;
  name: string;
  email: string;
  phone: string;
  OfferVehicles:DtoOzocioVehicle[];
}

export interface DtoResponseOzocioVehicleSucces {
  simulator: number;
  brand: string;
  model: string;
  cylinderCapacity: string;
}

export interface DtoResponseOzocioVehicleWithoutSimulator {
  simulator: string;
  model: string;
  cylinderCapacity: string;
}

export interface ResponseAllOzocio {
  count: number;
  pages: number;
  page: number;
  data: DtoResponseOzocio[];
}
