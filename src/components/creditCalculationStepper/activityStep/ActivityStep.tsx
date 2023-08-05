import React, { FC, useEffect } from "react";
import ReactGA from "react-ga4";
import "./styles.scss";
import { useFormikContext } from "formik";
import _ from "lodash";
import { Input } from "@ecommerce-ozon/design_system";
import { ReactComponent as Building } from "@ecommerce-ozon/design_system/dist/public/static/icons/building.svg";
import { ReactComponent as Couple } from "@ecommerce-ozon/design_system/dist/public/static/icons/couple-love.svg";
import { ReactComponent as WorkingBag } from "@ecommerce-ozon/design_system/dist/public/static/icons/working-bag-2.svg";
import NextStepButton from "components/creditCalculationStepper/NextStepButton/NextStepButton";
import useValidateStep from "components/creditCalculationStepper/useValidateStep";
import { CalculationStepperFormValues } from "../../../views/creditCalculation/CreditCalculationStepperView";

interface Props {}

const ActivityStep: FC<Props> = () => {
  useEffect(() => {
    ReactGA.event("CTA_Financial_form3", {
      category: "Financial Form",
      label: "click continue in the third step of the form",
    });
  }, []);

  const { handleChange, handleBlur, values, errors, touched } =
    useFormikContext<CalculationStepperFormValues>();
  const isValid = useValidateStep("activityStep");

  return (
    <div className="activityStep-container">
      <div className="m_b_sm">
        <Input
          name="activityStep.group"
          onBlur={handleBlur}
          onChange={handleChange}
          value={_.get(values, "activityStep.group")}
          options={[
            "Empleado",
            "Independiente",
            "Estudiante",
            "Pensionado",
            "Ama de casa",
            "No tengo empleo",
          ]}
          title="¿A cuál grupo de estos perteneces? "
          icon={<Couple />}
          type="select"
        />
      </div>
      <div className="m_b_sm">
        <Input
          name="activityStep.companyName"
          onBlur={handleBlur}
          error={
            !!_.get(errors, "activityStep.companyName") &&
            !!_.get(touched, "activityStep.companyName")
          }
          subtitle={
            !!_.get(touched, "activityStep.companyName") &&
            _.get(errors, "activityStep.companyName")
          }
          onChange={handleChange}
          value={_.get(values, "activityStep.companyName")}
          type="text"
          title="Nombre de la empresa"
          icon={<Building className="primary_300" />}
        />
      </div>
      <div className="m_b_sm">
        <Input
          name="activityStep.economicActivity"
          onBlur={handleBlur}
          error={
            !!_.get(errors, "activityStep.economicActivity") &&
            !!_.get(touched, "activityStep.economicActivity")
          }
          subtitle={
            !!_.get(touched, "activityStep.economicActivity") &&
            _.get(errors, "activityStep.economicActivity")
          }
          onChange={handleChange}
          value={_.get(values, "activityStep.economicActivity")}
          type="text"
          title="¿Cuál es tu cargo?"
          icon={<WorkingBag className="primary_300" />}
        />
      </div>
      <div className="m_b_sm">
        <Input
          name="activityStep.educationalLevel"
          onBlur={handleBlur}
          onChange={handleChange}
          value={_.get(values, "activityStep.educationalLevel")}
          options={[
            "Primaria",
            "Secundaria",
            "Preparatoria",
            "Tecnicatura",
            "Licenciatura",
            "Maestria",
          ]}
          title="Nivel de estudios"
          icon={<Building />}
          type="select"
        />
      </div>
      <NextStepButton isValid={isValid} />
    </div>
  );
};

export default ActivityStep;
