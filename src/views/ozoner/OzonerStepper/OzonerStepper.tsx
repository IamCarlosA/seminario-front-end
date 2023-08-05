import React, { useEffect } from "react";
import { useFormikContext } from "formik";
import {Stepper, StepperBody, StepperSteps, Step} from "@ecommerce-ozon/design_system";
import { OzonerStep1 } from "./step1/OzonerStep1";
import { OzonerStep2 } from "./step2/OzonerStep2";
import { OzonerStep3 } from "./step3/OzonerStep3";

export const OzonerStepper = () => {
  const { values, validateForm } = useFormikContext();

  useEffect(() => {
    if (values && validateForm) {
      validateForm(values);
    }
  }, [validateForm, values]);
  return (
    <Stepper startStep={0}>
      <StepperBody>
        <StepperSteps>
          <Step value="1" name="Step 1">
            <OzonerStep1 />
          </Step>
          <Step value="2" name="Step 2">
            <OzonerStep2 />
          </Step>
          <Step value="3" name="Step 3">
            <OzonerStep3 />
          </Step>
        </StepperSteps>
      </StepperBody>
    </Stepper>
  );
};
