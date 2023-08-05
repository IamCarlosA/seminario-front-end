/* eslint-disable no-unused-vars */
import { useFormikContext } from "formik";
import { fetchSeparate } from "helpers/fetchConekta";
import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { SeparateStepperFormValues } from "views/separate/Separate";

declare const window: any;

export const ConektaComponent = () => {
  const { values } = useFormikContext<SeparateStepperFormValues>();

  const submit = (event: any) => {
    fetchSeparate(event, values.step3.vehicle)
      .then((res) => {
        Swal.fire({
          text: "Pago guardado",
          icon: "success",
          confirmButtonText: "Ok",
        });
      })
      .catch((e) => {
        Swal.fire({
          text: "No se pudo guardar la información",
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  };

  useEffect(() => {
    if (values.step2.checkoutRequestId?.length) {
      window.ConektaCheckoutComponents.Integration({
        targetIFrame: "#conektaIframeContainer",
        checkoutRequestId: values.step2.checkoutRequestId, // checkout request id
        publicKey: process.env.REACT_APP_CONEKTA_PUBL,
        options: {},
        styles: {},
        onFinalizePayment: submit,
      });
    }
  }, [values.step2.checkoutRequestId]);

  return (
    <div
      id="conektaIframeContainer"
      style={{ height: "700px", width: "100%" }}
    />
  );
};
