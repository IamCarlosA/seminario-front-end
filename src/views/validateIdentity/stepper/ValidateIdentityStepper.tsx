import React, { FC } from "react";
import {
  StepperSteps,
  StepperHeader,
  StepperCountList,
  StepperFooter,
  StepperBody,
  Stepper,
  Step,
} from "@ecommerce-ozon/design_system";

import IdentityDetails from "../steps copy/IdentityDetails";
import BankDetails from "../steps copy/BankDetails";
import ValidateStepperHeader from "./ValidateStepperHeader";
import PersonalReferences from "../steps copy/PersonalReferences";
import ValidationStepperSectionListItems from "./ValidationStepperSectionListItems";
import ProofOfAddress from "../steps copy/ProofOfAddress";

interface Props {
  loading?: boolean;
}

const ValidateIdentityStepper: FC<Props> = ({ loading }) => (
  <>
    <ValidationStepperSectionListItems />
    <div className="display_flex w_100_per flex_justify_center">
      <div className="dso_card m_t_xl validate-identity-container m_b_xxxl bg_neutral_0">
        <Stepper startStep={0}>
          <StepperHeader>
            <ValidateStepperHeader />
          </StepperHeader>
          <StepperBody>
            <StepperSteps>
              <Step value="1" name="Step 1">
                <IdentityDetails />
              </Step>
              <Step value="2" name="Step 2">
                <BankDetails />
              </Step>
              <Step value="3" name="Step 3">
                <ProofOfAddress />
              </Step>
              <Step value="4" name="Step 4">
                <PersonalReferences
                  baseName="personal_references"
                  title="Escribé los datos de tu referencia personal número 1"
                  name="personal_reference_1"
                />
              </Step>
              <Step value="5" name="Step 5">
                <PersonalReferences
                  finishForm
                  baseName="personal_references"
                  loading={loading}
                  title="Escribé los datos de tu referencia personal número 2"
                  name="personal_reference_2"
                />
              </Step>
            </StepperSteps>
          </StepperBody>
          <StepperFooter>
            <StepperCountList />
          </StepperFooter>
        </Stepper>
      </div>
    </div>
  </>
);

export default ValidateIdentityStepper;
