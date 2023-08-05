import { useFormikContext } from "formik";
import {
  SeparateStepperFormValues,
  StepsKeys,
  validateStep,
} from "../Separate";

const useValidateStep = (step: StepsKeys) => {
  const { values } = useFormikContext<SeparateStepperFormValues>();
  return validateStep(step, values);
};

export default useValidateStep;
