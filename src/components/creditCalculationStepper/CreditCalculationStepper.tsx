import React, { useEffect } from "react";
import { useFormikContext } from "formik";
import {
  Typography,
  Step,
  StepperSteps,
  Stepper,
  StepperCountList,
  StepperFooter,
  StepperHeader,
  StepperBody,
} from "@ecommerce-ozon/design_system";
import "./styles.scss";
import IncomeStep from "./incomeStep/IncomeStep";
import DependantsStep from "./dependantsStep/DependantsStep";
import UserInfoStep from "./userInfoStep/UserInfoStep";
import ActivityStep from "./activityStep/ActivityStep";
import UserStatusStep from "./userStatusStep/UserStatusStep";
import AssetsStep from "./assetsStep/AssetsStep";

interface Props {
  loading?: boolean;
}

const CreditCalculationStepper: React.FC<Props> = ({ loading }) => {
  // Grab values and submitForm from context
  const { values, validateForm } = useFormikContext();

  useEffect(() => {
    if (values && validateForm) {
      validateForm(values);
    }
  }, [validateForm]);

  return (
    <div className="credit-calculation-stepper-container p_y_xxl">
      <Stepper startStep={0}>
        <StepperHeader>
          <Typography scale="heading3" weight="600">
            Financia tu moto con <span className="text_primary_300">Ozon</span>
          </Typography>
          <Typography
            scale="xsmall"
            weight="400"
            className="p_y_md p_x_xs_mobile text_center_mobile"
          >
            INGRESA TU INFORMACION Y TE MOSTRAREMOS LAS MOTOS QUE TENEMOS PARA
            TI
          </Typography>
        </StepperHeader>
        <StepperBody>
          <StepperSteps>
            <Step value="1" name="Step 1">
              <UserInfoStep />
            </Step>
            <Step value="2" name="Step 2">
              <IncomeStep />
            </Step>
            <Step value="3" name="Step 3">
              <DependantsStep />
            </Step>
            <Step value="4" name="Step 4">
              <ActivityStep />
            </Step>
            <Step value="5" name="Step 5">
              <UserStatusStep />
            </Step>
            <Step value="6" name="Step 6">
              <AssetsStep loading={loading} />
            </Step>
          </StepperSteps>
        </StepperBody>
        <StepperFooter>
          <StepperCountList />
        </StepperFooter>
      </Stepper>
    </div>
  );
};

export default CreditCalculationStepper;
