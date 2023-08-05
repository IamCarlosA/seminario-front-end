import React, { FC, useCallback } from "react";
import { ReactComponent as Left } from "@ecommerce-ozon/design_system/dist/public/static/icons/back.svg";
import {useStepper, Button} from "@ecommerce-ozon/design_system";
// import { useFormikContext } from "formik";
// import { CalculationStepperFormValues } from "../../../views/creditCalculation/CreditCalculation";

interface Props {
  isValid?: boolean;
  onClick?: () => void;
}

const BackStepButton: FC<Props> = ({ isValid, onClick }) => {
  const { decrementCurrentStep } = useStepper();
  // const { validateForm, values } = useFormikContext<CalculationStepperFormValues>();

  const handleClick = useCallback(() => {
    decrementCurrentStep();
  }, [decrementCurrentStep, onClick]);

  return (
    <div className="w_100_per flex_center_col m_t_xs flex_align_start">
      <Button
        disabled={!isValid}
        onClick={handleClick}
        orientation="left"
        icon={<Left />}
        variant="ghost"
        className="dso_btn_small p_l_none"
      >
        <span className="text_xsmall_800">Anterior</span>
      </Button>
    </div>
  );
};

export default BackStepButton;
