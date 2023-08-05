/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React, { useCallback, useEffect } from "react";
import { format } from "date-fns";
import { useHistory } from "react-router-dom";
import { FormikProvider, useFormik } from "formik";
import { useSelector } from "react-redux";
import * as yup from "yup";
import Swal from "sweetalert2";
import { RootState } from "store/index";
import { ReactComponent as Back } from "@ecommerce-ozon/design_system/dist/public/static/icons/back.svg";
import { Typography, Button, StepperProvider, SectionList } from "@ecommerce-ozon/design_system";
import { fetchUserDate } from "helpers/fetchPayment";
import { fetchDate } from "helpers/fetchDate";
import { OzonerStepper } from "./OzonerStepper/OzonerStepper";

export interface OzonerStepperFormValues {
  step1: {
    name: string;
    phone: string;
    email: string;
  };
  step2: {
    date: string;
    time: string;
    // campus: string;
  };
}

const validationSchema = yup.object().shape({
  step1: yup.object().shape({
    name: yup.string().required("Campo requerido"),
    phone: yup
      .string()
      .matches(/^\d+$/, "Numero invalido")
      .required("Campo requerido"),
    email: yup.string().email("Email invalido").required("Campo requerido"),
  }),
  step2: yup.object().shape({
    date: yup.string().required("Campo requerido"),
    time: yup.string().required("Campo requerido"),
    // campus: yup.string().required("Campo requerido"),
  }),
});

export type StepsKeys = keyof typeof validationSchema.fields;

export const validateStep = (
  step: StepsKeys,
  values: OzonerStepperFormValues
) =>
  // @ts-ignore
  yup.reach(validationSchema, step).isValidSync(values[step]);

export const Ozoner = () => {
  const { vehicle } = useSelector((state: RootState) => state.datevReducer);
  const history = useHistory();
  const sections = [
    { label: "Información personal", point: 0 },
    { label: "Fecha de visital", point: 1 },
    { label: "Resumen", point: 2 },
  ];

  const onSubmitForm = useCallback(
    (values: OzonerStepperFormValues) => {
      const { step1, step2 } = values;
      const { name, email, phone: mobile_phone } = step1;
      const { date, time } = step2;
      const date2 = format(new Date(date), "yyyy-MM-dd");
      const city = "CDMX";
      const address = "visita";
      const termsAgreed = true;

      fetchUserDate({
        name,
        mobile_phone,
        email,
        city,
        address,
        termsAgreed,
      }).then((res: any) => {
        if (res) {
            const vehicleId = vehicle._id;
            const fechaCita = `${date2} ${time}`;
            fetchDate(vehicleId, fechaCita);
        } else {
          Swal.fire({
            text: "No se pudo guardar la información",
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      });
    },
    [history]
  );

  const form = useFormik<OzonerStepperFormValues>({
    initialValues: {
      step1: {
        name: "",
        phone: "",
        email: "",
      },
      step2: {
        date: "",
        time: "",
        // campus: "",
      },
    },
    validationSchema,
    onSubmit: onSubmitForm,
  });

  useEffect(() => {
    !vehicle.internalId && history.push("/");
  }, [vehicle]);

  return (
    <FormikProvider value={form}>
      <StepperProvider>
        <div>
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
              className="text_neutral_800"
            >
              Vehículo {vehicle?.id_internal}
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
             Catálogo
            </Typography>
          </div>
          <SectionList labels={sections} />
          <div className="flex_center">
            <div className="w_80_per_desktop h_auto w_100_per_mobile m_y_xl dso_card p_y_xxl bg_neutral_0">
              <OzonerStepper />
            </div>
          </div>
        </div>
      </StepperProvider>
    </FormikProvider>
  );
};
