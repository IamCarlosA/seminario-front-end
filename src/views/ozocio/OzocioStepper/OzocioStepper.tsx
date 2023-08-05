import React, { useEffect, useState } from "react";
import { useFormikContext } from "formik";
import {
  Stepper,
  StepperBody,
  StepperSteps,
  StepperCountList,
  StepperFooter,
  Step,
} from "@ecommerce-ozon/design_system";
import { getSimulatorBrands } from "helpers/fetchBrands";

import { TBrand } from "models/brand.interface";
import { OzocioStep1 } from "./step1/OzocioStep1";
import { OzocioStep2 } from "./step2/OzocioStep2";
import { OzocioStep3 } from "./step3/OzocioStep3";
import { OzocioStep4 } from "./step4/OzocioStep4";
// import { OzocioStep5 } from "./step5/OzocioStep5";
import { OzocioStep6 } from "./step6/OzocioStep6";
import { OzocioStep7 } from "./step7/OzocioStep7";
import { OzocioStepperFormValues } from "../Ozocio";

export const OzocioStepper = () => {
  const [brands, setBrands] = useState<TBrand[] | []>([]);
  const { values } = useFormikContext<OzocioStepperFormValues>();
  const otro = values.step2.mileage === 999999999;

  const initBrands = async () => getSimulatorBrands();

  useEffect(() => {
    initBrands().then((res) => setBrands(res));
  }, []);

  return (
    <Stepper startStep={0}>
      <StepperBody>
        <StepperSteps>
          <Step value="1" name="Step">
            <OzocioStep1 />
          </Step>
          <Step value="2" name="Step">
            <OzocioStep2 />
          </Step>
          {otro && (
            <Step value="3" name="Step">
              <OzocioStep3 />
            </Step>
          )}
          <Step value={otro ? "4" : "3"} name="Step">
            <OzocioStep4 brands={brands} />
          </Step>
          {/* <Step value={otro ? "5" : "4"} name="Step">
            <OzocioStep5 />
          </Step> */}
          <Step value={otro ? "5" : "4"} name="Step">
            <OzocioStep6 />
          </Step>
          <Step value={otro ? "6" : "5"} name="Step">
            <OzocioStep7 />
          </Step>
        </StepperSteps>
      </StepperBody>
      <StepperFooter>
        <StepperCountList />
      </StepperFooter>
    </Stepper>
  );
};
