/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import React from "react";
import { Grid } from "@material-ui/core";
import { useFormikContext } from "formik";
import { Typography, Input } from "@ecommerce-ozon/design_system";
import { SeparateStepperFormValues } from "views/separate/Separate";
import { ConektaComponent } from "views/separate/views/summary/ConektaComponent";
import { Summary } from "views/separate/views/summary/Summary";
import useValidateStep from "../useValidateStep";

export const SeparateStep2 = () => {
  const { values } = useFormikContext<SeparateStepperFormValues>();
  if (values.step2.checkoutRequestId) {
    if (values.step2.checkoutRequestId?.length > 1) {
      return <ConektaComponent />;
    }
  }
  return null;
};
