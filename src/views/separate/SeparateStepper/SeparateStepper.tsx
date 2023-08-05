import React from "react";
import {Stepper, StepperBody, StepperSteps, Step} from "@ecommerce-ozon/design_system";
import { SeparateStep1 } from "./step1/SeparateStep1";
import { SeparateStep2 } from "./step2/SeparateStep2";



export const SeparateStepper = React.memo(() => (
  <Stepper startStep={0}>
    <StepperBody>
      <StepperSteps>
        <Step value="1" name="Step">
          <SeparateStep1 />
        </Step>
        <Step value="2" name="Step">
          <SeparateStep2  />
        </Step>
      </StepperSteps>
    </StepperBody>
  </Stepper>
));
