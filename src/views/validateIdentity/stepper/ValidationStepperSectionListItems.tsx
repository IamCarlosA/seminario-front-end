import React, { FC } from "react";
import {useStepper, SectionListItem } from "@ecommerce-ozon/design_system";


interface Props {

}

const ValidationStepperSectionListItems: FC<Props> = () => {
  const { currentStep } = useStepper();
  return <div className="display_flex">
    <SectionListItem label="Verification de identidad" number={1} separator completed />
    <SectionListItem label="Certificados Bancarios" number={2} separator completed={currentStep > 1} />
    <SectionListItem label="Referencias personales" number={3} separator completed={currentStep > 2} />
  </div>;
};

export default ValidationStepperSectionListItems;
