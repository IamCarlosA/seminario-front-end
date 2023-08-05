import React, { FC, useCallback } from "react";
import { useFormikContext } from "formik";
import { ReactComponent as Right } from "@ecommerce-ozon/design_system/dist/public/static/icons/Rigth.svg";
import {useStepper, Button} from "@ecommerce-ozon/design_system";
// import { useFormikContext } from "formik";
// import { CalculationStepperFormValues } from "../../../views/creditCalculation/CreditCalculation";
import { OzonerStepperFormValues } from "views/ozoner/Ozoner";

interface Props {
  isValid?: boolean;
  onClick?: () => void;
}

const NextStepButton: FC<Props> = ({ isValid, onClick }) => {
  const { incrementCurrentStep } = useStepper();
  const { validateForm, values } = useFormikContext<OzonerStepperFormValues>();

  const handleClick = useCallback(() => {
    if (!onClick) {
      incrementCurrentStep();
    } else {
      incrementCurrentStep();
      onClick();
    }
  }, [incrementCurrentStep, onClick, validateForm, values]);

  return (
    <div>
      <Button
        disabled={!isValid}
        onClick={handleClick}
        orientation="right"
        icon={<Right />}
        className="w_300_px dso_btn_small"
      >
        <span className="text_xsmall_800">Siguiente</span>
      </Button>
    </div>
  );
};

export default NextStepButton;
