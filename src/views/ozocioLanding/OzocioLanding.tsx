/* eslint-disable arrow-body-style */
import React from "react";
import { SectionsBenefits } from "./sectionsBenefits/SectionsBenefits";
import { SectionStepperOzocio } from "./sectionStepper/SectionStepperOzocio";
import { SectionStepsOzocio } from "./sectionSteps/SectionStepsOzocio";
import { SectionsThousandOzocio } from "./sectionThousand/SectionsThousandOzocio";

export const OzocioLanding = () => {
  return (
    <>
      <SectionStepperOzocio />
      <SectionsBenefits />
      <SectionStepsOzocio />
      <SectionsThousandOzocio />
    </>
  );
};
