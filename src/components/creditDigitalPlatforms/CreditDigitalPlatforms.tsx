import React, { useCallback, useContext } from "react";
import { FormikProvider, useFormik } from "formik";
import * as yup from "yup";
import CreditDigitalPlatformsForm from "./CreditDigitalPlatformsForm";
import { CreditContext, CreditPhases } from "../../views/creditCalculation/context/context";
import useUserVerificationDetails from "../../hooks/useUserVerificationDetails";

export interface DigitalPlatformsFormValues {
  workInDigitalPlatforms: boolean;
  platforms: (number | string) [];
  authDataTreatment: boolean;
}

const validationSchema = yup.object().shape({
  authDataTreatment: yup.bool().oneOf([true], "Debes aprobar este campo")
});

const CreditDigitalPlatforms: React.FC = () => {

  const { setPhase } = useContext(CreditContext);
  const [data, setData] = useUserVerificationDetails();

  const onSubmitForm = useCallback(
    (values) => {
      setData({
        ...data,
        digitalPlatforms: values,
        timestamp: Date.now()
      });
      setPhase(CreditPhases.CreditForm);
    },
    [data, setData, setPhase]
  );

  const form = useFormik<DigitalPlatformsFormValues>({
    initialValues: {
      workInDigitalPlatforms: false,
      platforms: [],
      authDataTreatment: false
    },
    validationSchema,
    validateOnMount: true,
    onSubmit: onSubmitForm
  });

  return <FormikProvider value={form}>
      <CreditDigitalPlatformsForm />
    </FormikProvider>;
};

export default CreditDigitalPlatforms;
