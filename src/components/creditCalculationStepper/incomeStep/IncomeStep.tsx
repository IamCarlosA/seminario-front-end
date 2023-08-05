import React, { FC, useEffect } from "react";
import ReactGA from "react-ga4";
import "./styles.scss";
import { ReactComponent as Money } from "@ecommerce-ozon/design_system/dist/public/static/icons/money.svg";
import NextStepButton from "components/creditCalculationStepper/NextStepButton/NextStepButton";
import useValidateStep from "components/creditCalculationStepper/useValidateStep";
import IncomeCard from "./incomeCard/IncomeCard";

interface Props {}

const IncomeStep: FC<Props> = () => {
  useEffect(() => {
    ReactGA.event("CTA_Financial_start", {
      category: "Financial Form",
      label: "click continue in the first step of the form",
    });
  }, []);

  const isValid = useValidateStep("incomeStep");
  return (
    <div className="incomeStep-container">
      <IncomeCard
        icon={<Money className="text_primary_300" />}
        label="¿Cuales son tus ingresos promedio mensual?"
        name="incomeStep.monthlyIncome"
      />
      <IncomeCard
        icon={<Money className="text_primary_300" />}
        label="¿Cuales son tus gastos promedio mensual?"
        name="incomeStep.monthlySpending"
      />
      <NextStepButton isValid={isValid} />
    </div>
  );
};

export default IncomeStep;
