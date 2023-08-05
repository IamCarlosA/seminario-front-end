/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import Swal from "sweetalert2";
import ReactGA from "react-ga4";
import { photoVehicle, fetchEmailOzocio } from "./fetchOzocio";
import { fetchUserDate } from "./fetchPayment";

interface Props {
  name: string;
  email: string;
  mobile_phone: string;
  brandOther?: string;
  cylinder_capacity: string;
  model: string;
  mileage: number;
  mileageOther?: number;
  year: string;
  img: {
    file?: string;
    view?: string;
  };
  city: string;
  address: string;
  termsAgreed: boolean;
}

export const useOzocioOtherBrand = ({
  name,
  email,
  mobile_phone,
  brandOther,
  cylinder_capacity,
  model,
  mileage,
  mileageOther,
  year,
  img,
  city,
  address,
  termsAgreed,
}: Props) =>
  new Promise((resolve, reject) => {
    let urlPhoto = "";
    let user: any;
    let dataSimulator: any;
    let EmailOzocio: any;

    let mile: number = 0;
    if (mileage !== 999999999) {
      mile = mileage;
    } else if (mileageOther) {
      mile = mileageOther;
    }

    const mileag: string = String(mile);
    fetchUserDate({
      name,
      mobile_phone,
      email,
      city,
      address,
      termsAgreed,
    })
      .then((res: any) => {
        user = res.user;
        return photoVehicle(img.file);
      })

      .then((res: any) => {
        if (res) {
          urlPhoto = res[0].url;
        }
        const simul = "No aplica";
        EmailOzocio = {
          img: urlPhoto,
          brand: brandOther,
          model,
          cylinder_capacity,
          mileage,
          mileageOther,
          year,
          valueSimulator: simul,
        };
        return fetchEmailOzocio(EmailOzocio);
      })
      .then((res: any) => {
        ReactGA.event("CTA_ozocio_formfinal", {
          category: "Ozocio",
          label:
            "finished ozocio flow (params brand, model, year, mileage (mileageOther is optional))",
          brand: brandOther,
          model: EmailOzocio.model,
          year: EmailOzocio.year,
          mileage: EmailOzocio.mileage,
          mileageOther: EmailOzocio.mileageOther,
        });
        return resolve("No aplica");
      })
      .catch((e: any) => {
        Swal.fire({
          text: e.message,
          icon: "error",
          confirmButtonText: "Acceptar",
        });
        return reject();
      });
  });
