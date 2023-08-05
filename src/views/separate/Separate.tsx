/* eslint-disable camelcase */
/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useLayoutEffect, useState } from "react";
import Swal from "sweetalert2";
import { useHistory, useLocation } from "react-router-dom";
import * as yup from "yup";
import { fetchConekta } from "helpers/fetchConekta";
import { fetchUserDate } from "helpers/fetchPayment";
import { FormikProvider, useFormik } from "formik";
import { TVehicle } from "models/vehicle.interface";
import { setUserAuthTokens } from "store/actions/user";
import { useDispatch } from "react-redux";
import { StepperProvider } from "@ecommerce-ozon/design_system";
import { fetchCheckIn } from "helpers/fetchCheckIn";
import { SeparateResult } from "./SeparateResult";
import useTrackPixelOnMount from "../../hooks/FacebookPixel/useTrackPixelOnMount";
import useFacebookPixel from "../../hooks/FacebookPixel/useFacebookPixel";

export interface SeparateStepperFormValues {
  step1: {
    name: string;
    email: string;
    curp: string;
    cellPhone: string;
    city: string;
    address: string;
    termsAgreed: string;
  };
  step2: {
    checkoutRequestId?: string;
  };
  step3: {
    vehicle?: string;
  };
}

const curpRegex =
  /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/;

const validationSchema = yup.object().shape({
  step1: yup.object().shape({
    name: yup.string().required("Campo requerido"),
    cellPhone: yup
      .string()
      .min(10, "Debe tener al menos 10 números (contando el 52)")
      .matches(/^\d+$/, "Numero invalido")
      .required("Campo requerido"),
    email: yup.string().email("Email invalido").required("Campo requerido"),
    curp: yup
      .string()
      .required("Campo requerido")
      .matches(curpRegex, "CURP inválido"),
    city: yup.string().required("Campo requerido"),
    address: yup.string().required("Campo requerido"),
    termsAgreed: yup.bool().oneOf([true], "This field must be checked"),
  }),
  step2: yup.object().shape({
    checkoutRequestId: yup.string(),
  }),
  step3: yup.object().shape({
    vehicle: yup.string(),
  }),
});

export type StepsKeys = keyof typeof validationSchema.fields;

export const validateStep = (
  step: StepsKeys,
  values: SeparateStepperFormValues
) =>
  // @ts-ignore
  yup.reach(validationSchema, step).isValidSync(values[step]);

export const Separate = () => {
  const dispatch = useDispatch();
  const { state } = useLocation<TVehicle>();
  const history = useHistory();
  const pixelLib = useFacebookPixel();
  useTrackPixelOnMount("AddToWishlist");

  const onSubmitForm = (values: SeparateStepperFormValues) => {
    return new Promise((resolve, reject) => {
      const {
        step1: {
          name,
          email,
          curp,
          address,
          cellPhone: phone,
          city,
          termsAgreed: terms,
        },
      } = values;
      const termsAgreed = terms === "true";

      fetchCheckIn({ email, name, curp, phone, address })
        .then((res) => {
          if (res.token) {
            fetchConekta(state.internalId).then((checkout) => {
              pixelLib.track("InitiateCheckout");
              resolve(checkout);
            });
          } else {
            Swal.fire({
              text: "No se pudo guardar la información",
              icon: "error",
              confirmButtonText: "Ok",
            });
          }
        })
        .catch((e) => reject(e));
    });
  };

  const form = useFormik<SeparateStepperFormValues>({
    initialValues: {
      step1: {
        name: "",
        email: "",
        curp: "",
        cellPhone: "52",
        city: "",
        address: "",
        termsAgreed: "",
      },
      step2: {
        checkoutRequestId: "",
      },
      step3: {
        vehicle: state.internalId,
      },
    },
    validationSchema,
    onSubmit: onSubmitForm,
  });

  useLayoutEffect(() => {
    if (!state) {
      history.push("/");
    }
  }, [state, history]);

  if (state) {
    return (
      <div className="dso_container">
        <FormikProvider value={form}>
          <StepperProvider>
            <SeparateResult vehicle={state} />
          </StepperProvider>
        </FormikProvider>
      </div>
    );
  }

  return null;
};
