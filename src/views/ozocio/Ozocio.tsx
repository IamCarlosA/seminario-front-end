/* eslint-disable no-unused-vars */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable camelcase */
import React from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { FormikProvider, useFormik } from "formik";
import {
  StepperProvider,
  Button,
  Typography,
  SectionList,
} from "@ecommerce-ozon/design_system";
import { ReactComponent as Back } from "@ecommerce-ozon/design_system/dist/public/static/icons/back.svg";
import { useOzocioOtherBrand } from "helpers/useOzocioOtherBrand";
import { fetchCheckIn } from "helpers/fetchCheckIn";
import { fetchSimulator } from "helpers/fetchSimulator";
import {
  fetchCreateOzocio,
  fetchCreateOzocioVehicle,
} from "helpers/fetchCreateOzocio";
import { DtoCreateOzocio, DtoOzocioVehicle } from "models/ozocio.interface";
import { ContactHelper } from "components/hocs/ContactHelper/ContactHelper";
import { OzocioStepper } from "./OzocioStepper/OzocioStepper";
import useTrackPixelOnMount from "../../hooks/FacebookPixel/useTrackPixelOnMount";
import { registerSalesforceLeads } from "../../helpers/salesforce";

export interface OzocioStepperFormValues {
  step1: {
    year: string;
  };
  step2: {
    mileage: number;
  };
  step3: {
    mileageOther: number;
  };
  step4: {
    brand: string;
    brandOther: string;
    model: string;
    cylinder: string;
  };
  step5: {
    img: {
      file?: string;
      view?: string;
    };
  };
  step6: {
    name: string;
    lastName: string;
    phone: string;
    email: string;
  };
  step7: {
    simulator: string;
  };
}

const validationSchema = yup.object().shape({
  step1: yup.object().shape({
    year: yup.string().required("Campo requerido"),
  }),
  step2: yup.object().shape({
    mileage: yup.number().required("Campo requerido"),
  }),
  step3: yup.object().shape({
    mileageOther: yup.number(),
  }),
  step4: yup.object().shape({
    brand: yup.string().required("Campo requerido"),
    brandOther: yup.string(),
    model: yup.string().required("Campo requerido"),
    cylinder: yup.string().required("Campo requerido"),
  }),
  step5: yup.object().shape({
    img: yup.object().shape({
      file: yup.string(),
      view: yup.string(),
    }),
  }),
  step6: yup.object().shape({
    name: yup.string().required("Campo requerido"),
    lastName: yup.string().required("Campo requerido"),
    phone: yup
      .string()
      .matches(/^\d+$/, "Numero invalido")
      .min(10, "Digite al menos 10 numeros")
      .required("Campo requerido"),
    email: yup.string().email("Email invalido").required("Campo requerido"),
  }),
  step7: yup.object().shape({
    simulator: yup.string(),
  }),
});

export type StepsKeys = keyof typeof validationSchema.fields;

export const validateStep = (
  step: StepsKeys,
  values: OzocioStepperFormValues
) =>
  // @ts-ignore
  yup.reach(validationSchema, step).isValidSync(values[step]);

export const Ozocio = () => {
  useTrackPixelOnMount("CompleteRegistration");

  const onSubmitForm = (values: OzocioStepperFormValues) =>
    new Promise((resolve, reject) => {
      const {
        step6: { name, lastName, email, phone },
        step4: { brand, brandOther, cylinder: cylinderCapacity, model },
        step2: { mileage: km },
        step3: { mileageOther },
        step1: { year },
        step5: { img },
      } = values;
      console.log(values);
      const address = "offert";
      const status = "webLeadPurchase";
      const statusHistoric = [
        {
          status: "webLeadPurchase",
          updatedAt: new Date(),
        },
      ];

      registerSalesforceLeads({
        email,
        name,
        phone,
        description: "Quiero vender mi moto.",
      });

      const ozocioToCreate: DtoCreateOzocio = {
        name: `${name} ${lastName}`,
        email,
        phone: `+52${phone}`
      };

      fetchCreateOzocio(ozocioToCreate)
        .then((ozocio) => {
          const ozocioId: string = ozocio._id;
          const ozocioVehicle: DtoOzocioVehicle = {
            brand: brand === "other" ? brandOther : brand,
            model,
            cylinderCapacity,
            km: km === 999999999 ? mileageOther : km,
            year: Number(year),
          };
          fetchCreateOzocioVehicle(ozocioVehicle, ozocioId)
            .then((res) => {
              resolve(res.simulator);
            })
            .catch((e) => {
              reject("error");
            });
        })
        .catch((e) => {
          reject("error");
        });
    });

  const form = useFormik<OzocioStepperFormValues>({
    initialValues: {
      step1: {
        year: "",
      },
      step2: {
        mileage: 1000,
      },
      step3: {
        mileageOther: 0,
      },
      step4: {
        brand: "",
        brandOther: "",
        model: "",
        cylinder: "",
      },
      step5: {
        img: {
          file: "",
          view: "",
        },
      },
      step6: {
        name: "",
        lastName: "",
        email: "",
        phone: "",
      },
      step7: {
        simulator: "",
      },
    },
    validationSchema,
    onSubmit: onSubmitForm,
  });
  const otro = !!form.values.step3.mileageOther;
  const sections = [
    { label: "Información general del vehículo", point: 0 },
    { label: "Información de contacto", point: otro ? 5 : 4 },
    { label: "Oferta de compra", point: otro ? 6 : 5 },
  ];
  const history = useHistory();

  return (
    <FormikProvider value={form}>
      <StepperProvider>
        <div className="dso_container p_t_xl">
          <div className="display_flex flex_align_center m_b_lg">
            <Button
              variant="icon"
              icon={<Back />}
              subvariant="edit"
              scale="small"
              onClick={() => history.goBack()}
            />
            <Typography
              scale="xsmall"
              weight="400"
              className="text_neutral_800 m_l_md"
            >
              Catálogo
            </Typography>
            <Typography
              scale="xsmall"
              weight="400"
              className="text_neutral_800 m_x_xs"
            >
              {" < "}
            </Typography>
            <Typography
              scale="xsmall"
              weight="400"
              className="text_primary_300"
            >
              Vende tu moto
            </Typography>
          </div>
          <SectionList labels={sections} />
          <div className="flex_center">
            <div className="w_80_per_desktop h_auto w_100_per_mobile m_y_xl dso_card p_y_xxl bg_neutral_0">
              <OzocioStepper />
            </div>
          </div>
        </div>
        {/* <ContactHelper/> */}
      </StepperProvider>
    </FormikProvider>
  );
};
