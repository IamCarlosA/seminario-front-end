import { WebApiInstance } from "./api";

export const photoVehicle = (imagen: string = "") => {
  const formData = new FormData();
  formData.append("files", imagen);

  if (imagen.length < 1) {
    return null;
  } 
    return WebApiInstance({
      method: "post",
      url: "upload",
      data: formData,
      requireAuth: true
    })
      .then((res) => res.data)
      .catch((err: any) => {
        throw err.response.data;
      });
  
};

export const fetchVehicleOffer = (
  owner: string,
  brand: string,
  model: string,
  // eslint-disable-next-line camelcase
  cylinder_capacity: string,
  country = "60247963b88ce81d7ea7a272",
  city = "602479bab88ce81d7ea7a275",
  type = "motorcycle",
  status = "offer"
) => WebApiInstance
    .post("vehicles", {
      owner,
      brand,
      model,
      country,
      city,
      // eslint-disable-next-line camelcase
      cylinder_capacity,
      type,
      status,
    }, {requireAuth: true})
    .then((res) => res.data)
    .catch((err: any) => {
      throw err.response.data;
    });

export const fetchVehicleSave = (
  vehicle: string,
  valueSimulator: string
) => WebApiInstance
    .post("ozocio-offers", {
      vehicle,
      valueSimulator,
    }, {requireAuth: true})
    .then((res) => res.data)
    .catch((err: any) => {
      throw err.response.data;
    });

export const fetchEmailOzocio = (email: any) => WebApiInstance
    .post("simulators/email", email, {requireAuth: true})
    .then((res) => res.data)
    .catch((err: any) => {
      throw err.response.data;
    });
