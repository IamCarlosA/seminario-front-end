/* eslint-disable no-unused-vars */
import React, { FC } from "react";
import { useFormikContext } from "formik";
import { ReactComponent as Invoice } from "@ecommerce-ozon/design_system/dist/public/static/icons/invoice-paper.svg";
import UploadInput, { OnUploadInputChangeProps } from "../uploadInput/UploadInput";
import { ValidateIdentityStepperFormValues, validateStep } from "../ValidateIdentity";

interface Props {

}

const ProofOfAddress: FC<Props> = () => {
  const { setFieldValue, values } = useFormikContext<ValidateIdentityStepperFormValues>();
  const onInputChange = ({ name, imageFile }: OnUploadInputChangeProps) => {
    setFieldValue(name, imageFile);
  };
  const isStepValid = validateStep("proof_of_address", values);

  return <div>
    <div className="m_y_lg">
      <UploadInput onChange={onInputChange} name="proof_of_address" title="Sube un recibo de agua, luz o gas de menos de 3 meses" placeholderIcon={<Invoice />} />
    </div>
    {/* <NextStepButton isValid={isStepValid} /> */}
  </div>;
};

export default ProofOfAddress;
