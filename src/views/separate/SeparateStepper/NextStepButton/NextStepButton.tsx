/* eslint-disable no-unused-vars */
import React, { FC, useCallback, useState } from "react";
import {useStepper, Button} from "@ecommerce-ozon/design_system";
// import { useFormikContext } from "formik";
// import { CalculationStepperFormValues } from "../../../views/creditCalculation/CreditCalculation";
import { OzonerStepperFormValues } from "views/ozoner/Ozoner";
import { useFormikContext } from "formik";
import { SeparateStepperFormValues } from "views/separate/Separate";

// import { OzonerStepperFormValues } from "../../../ozoner/Ozoner";

interface Props {
  isValid?: boolean;
  onClick?: () => Promise<any>;
}

const NextStepButton: FC<Props> = ({ isValid, onClick }) => {
  const { incrementCurrentStep } = useStepper();
  const [loading, setloading] = useState(false);
  const { validateForm, values, setFieldValue } =
    useFormikContext<SeparateStepperFormValues>();

  const handleClick = useCallback(() => {
    if (!onClick) {
      incrementCurrentStep();
    } else {
      setloading(true);
      onClick().then((res) => {
        setFieldValue("step2.checkoutRequestId", res.checkout.id);
        setloading(false);
        incrementCurrentStep();
      }).catch((e)=>{
        setloading(false);
      });
    }
  }, [incrementCurrentStep, onClick]);

  return (
    <Button
      disabled={!isValid || loading}
      onClick={handleClick}
      orientation="right"
      className="w_100_per dso_btn_small"
    >
      <span className="text_xsmall_800">
        {loading ? "Cargando..." : "APARTAR VEHÍCULO"}
      </span>
    </Button>
  );
};

export default NextStepButton;
