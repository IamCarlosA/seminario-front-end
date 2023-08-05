import React, { FC } from "react";
import "./styles.scss";
import { useFormikContext } from "formik";
import { ReactComponent as Home } from "@ecommerce-ozon/design_system/dist/public/static/icons/home-4.svg";
import { Input } from "@ecommerce-ozon/design_system";
import NextStepButton from "components/creditCalculationStepper/NextStepButton/NextStepButton";
import useValidateStep from "components/creditCalculationStepper/useValidateStep";
import _ from "lodash";
import { CalculationStepperFormValues } from "../../../views/creditCalculation/CreditCalculationStepperView";

interface Props {
  loading?: boolean;
}

const AssetsStep: FC<Props> = ({ loading }) => {
  const { submitForm, handleBlur, errors, touched, values, handleChange, setFieldValue } =
    useFormikContext<CalculationStepperFormValues>();
  const isValid = useValidateStep("assetsStep");

  const onFinishForm = () => {
    submitForm();
  };

  return (
    <div className="assetsStep-container">
      <Input
        name="assetsStep.assets"
        onChange={
          (e) => {
            if (e.target.value === "Otros" && e.target.checked) {
              setFieldValue("assetsStep.otherSelected", true);
            } else {
              setFieldValue("assetsStep.otherSelected", false);
            }
            handleChange(e);
          }
        }
        options={[
          "Casa",
          "Carro",
          "Moto",
          "Otros"
        ]}
        icon={<Home />}
        title="¿Con que activo cuentas?"
        type="checkbox"
      />
      {
        values.userStatusStep.otherAsset && <Input
          title=""
          onBlur={handleBlur}
          error={
            !!_.get(errors, "assetsStep.other") &&
            !!_.get(touched, "assetsStep.other")
          }
          subtitle={
            !!_.get(touched, "assetsStep.other") &&
            _.get(errors, "assetsStep.other")
          }
          onChange={handleChange}
          value={_.get(values, "assetsStep.other")}
          name="assetsStep.other"
          placeholder="Con que otro activo cuentas?"
          type="text"/>
      }
      <NextStepButton disabled={loading} onClick={onFinishForm} isValid={isValid} />
    </div>
  );
};

export default AssetsStep;
