import { useFormikContext } from "formik";
import {
  CalculationStepperFormValues,
  StepsKeys,
  validateStep,
} from "views/creditCalculation/CreditCalculationStepperView";

const useValidateStep = (step: StepsKeys) => {
  const { values } = useFormikContext<CalculationStepperFormValues>();
  return validateStep(step, values);
};

export default useValidateStep;
