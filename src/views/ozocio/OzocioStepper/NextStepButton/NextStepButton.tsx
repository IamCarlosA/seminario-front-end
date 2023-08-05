import React, { FC, useCallback, useState } from "react";
import { useFormikContext } from "formik";
import { ReactComponent as Right } from "@ecommerce-ozon/design_system/dist/public/static/icons/Rigth.svg";
import {useStepper, Button} from "@ecommerce-ozon/design_system";
// import { useFormikContext } from "formik";
// import { CalculationStepperFormValues } from "../../../views/creditCalculation/CreditCalculation";

import { OzonerStepperFormValues } from "views/ozoner/Ozoner";

interface Props {
  isValid?: boolean;
  onClick?: () => Promise<any>;
}

const NextStepButton: FC<Props> = ({ isValid, onClick }) => {
  const { incrementCurrentStep } = useStepper();
  const [loading, setloading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const { validateForm, values, setFieldValue } =
    useFormikContext<OzonerStepperFormValues>();

  const handleClick = useCallback(() => {
    if (!onClick) {
      incrementCurrentStep();
    } else {
      setloading(true);
      onClick()
        .then((res) => {
          setFieldValue("step7.simulator", res);
          setloading(false);
          incrementCurrentStep();
        })
        .catch(() => {
          setloading(false);
        });
    }
  }, [incrementCurrentStep, onClick]);

  return (
    <div>
      <Button
        disabled={!isValid || loading}
        onClick={handleClick}
        orientation="right"
        icon={<Right />}
        className="w_300_px dso_btn_small"
      >
        <span className="text_xsmall_800">
          {loading ? "Cargando..." : "Siguiente"}
        </span>
      </Button>
    </div>
  );
};

export default NextStepButton;
