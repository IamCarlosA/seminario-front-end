import React, { FC, useEffect } from "react";
import ReactGA from "react-ga4";
import "./styles.scss";
import { ReactComponent as Chat } from "@ecommerce-ozon/design_system/dist/public/static/icons/group-chat.svg";
import { ReactComponent as Baby } from "@ecommerce-ozon/design_system/dist/public/static/icons/baby.svg";
import NextStepButton from "components/creditCalculationStepper/NextStepButton/NextStepButton";
import useValidateStep from "components/creditCalculationStepper/useValidateStep";
import FamilyCard from "components/creditCalculationStepper/dependantsStep/familyCard/FamilyCard";

interface Props {}

const DependantsStep: FC<Props> = () => {
  useEffect(() => {
    ReactGA.event("CTA_Financial_form2", {
      category: "Financial Form",
      label: "click continue in the second step of the form",
    });
  }, []);

  const isValid = useValidateStep("dependantsStep");
  return (
    <div className="dependantsStep-container">
      <FamilyCard
        name="dependantsStep.childrenCount"
        icon={<Baby className="text_primary_300" />}
        label="¿Cuantos hijos tienes?"
      />
      <FamilyCard
        name="dependantsStep.dependantsCount"
        icon={<Chat className="text_primary_300" />}
        label="¿Cuantas personas dependen de ti económicamente?"
      />
      <NextStepButton isValid={isValid} />
    </div>
  );
};

export default DependantsStep;
