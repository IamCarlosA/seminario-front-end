import { useFormikContext } from "formik";
import { OzocioStepperFormValues, StepsKeys, validateStep } from "../Ozocio";

const useValidateStep = (step: StepsKeys) => {
  const { values } = useFormikContext<OzocioStepperFormValues>();
  return validateStep(step, values);
};

export default useValidateStep;
