import React, { FC, useCallback } from "react";
import "./styles.scss";
import { useFormikContext } from "formik";
import { ReactComponent as Right } from "@ecommerce-ozon/design_system/dist/public/static/icons/Rigth.svg";
import { ReactComponent as Back } from "@ecommerce-ozon/design_system/dist/public/static/icons/back.svg";
import {Button, Typography, useStepper} from "@ecommerce-ozon/design_system";
import { CalculationStepperFormValues } from "../../../views/creditCalculation/CreditCalculationStepperView";

interface Props {
  isValid?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

const NextStepButton: FC<Props> = ({ isValid, onClick, disabled }) => {
  const { incrementCurrentStep, decrementCurrentStep, currentStep } =
    useStepper();
  const { validateForm, values } =
    useFormikContext<CalculationStepperFormValues>();

  const handleClick = useCallback(() => {
    if (!onClick) {
      incrementCurrentStep();
    } else {
      onClick();
    }
  }, [incrementCurrentStep, onClick, validateForm, values]);


  return (
    <div className="display_flex flex_col ">
      <div className="w_100_per_desktop flex_center">
        <Button
          disabled={!isValid || disabled}
          onClick={handleClick}
          orientation="right"
          icon={<Right />}
          className="stepper-next-button dso_btn_small w_100_per_desktop"
        >
          <span className="text_xsmall_800">Siguiente</span>
        </Button>
      </div>
      {currentStep !== 0 && (
        <div className="display_flex m_y_md">
          <Button
            onClick={decrementCurrentStep}
            orientation="left"
            icon={<Back />}
            variant="ghost"
            className="dso_btn_small p_l_none"
          >
            <Typography scale="xsmall" weight="600">
              <span className="text_primary_300">Anterior</span>
            </Typography>
          </Button>
        </div>
      )}
    </div>
  );
};

export default NextStepButton;
