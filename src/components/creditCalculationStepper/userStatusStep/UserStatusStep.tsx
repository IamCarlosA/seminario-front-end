import React, { FC, useEffect } from "react";
import ReactGA from "react-ga4";
import "./styles.scss";
import _ from "lodash";
import { useFormikContext } from "formik";
import { ReactComponent as Couple } from "@ecommerce-ozon/design_system/dist/public/static/icons/couple-love.svg";
import { ReactComponent as Group } from "@ecommerce-ozon/design_system/dist/public/static/icons/groups.svg";
import { Input } from "@ecommerce-ozon/design_system";
import NextStepButton from "components/creditCalculationStepper/NextStepButton/NextStepButton";
import useValidateStep from "components/creditCalculationStepper/useValidateStep";
import { CalculationStepperFormValues } from "../../../views/creditCalculation/CreditCalculationStepperView";

interface Props {
}

const UserStatusStep: FC<Props> = () => {
  useEffect(() => {
    ReactGA.event("CTA_Financial_form4", {
      category: "Financial Form",
      label: "click continue in the forth step of the form",
    });
  }, []);

  const { handleChange, values } =
    useFormikContext<CalculationStepperFormValues>();
  const isValid = useValidateStep("userStatusStep");

  return (
    <div className="userStatusStep-container">
      <div className="m_b_sm">
        <Input
          name="userStatusStep.civilStatus"
          value={_.get(values, "userStatusStep.civilStatus")}
          onChange={handleChange}
          options={["Solter@", "Casad@", "Union Libre", "Devorciad@", "Viud@"]}
          title="Estado civil"
          icon={<Couple />}
          type="select"
        />
      </div>
      <div className="subtitleInformationContainer" />
      <Input
        name="userStatusStep.livesWith"
        onChange={handleChange}
        options={[
          "Solo (a)",
          "Esposo (a)",
          "Amigos ",
          "Padres ",
          "Pareja estable",
          "Hermanos ",
          "Hijos",
        ]}
        icon={<Group />}
        title="Con quien vives?"
        type="checkbox"
      />
      <NextStepButton isValid={isValid} />
    </div>
  );
};

export default UserStatusStep;
