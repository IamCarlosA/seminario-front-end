import { useFormikContext } from "formik";
import { OzonerStepperFormValues, StepsKeys, validateStep } from "../Ozoner";

const useValidateStep = (step: StepsKeys) => {
  const { values } = useFormikContext<OzonerStepperFormValues>();
  return validateStep(step, values);
};

export default useValidateStep;
