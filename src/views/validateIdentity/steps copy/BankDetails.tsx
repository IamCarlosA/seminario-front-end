/* eslint-disable no-unused-vars */
import React, { FC } from "react";
import { useFormikContext } from "formik";
import { ReactComponent as Invoice } from "@ecommerce-ozon/design_system/dist/public/static/icons/invoice-paper.svg";
import UploadInput, { OnUploadInputChangeProps } from "../uploadInput/UploadInput";
import { ValidateIdentityStepperFormValues, validateStep } from "../ValidateIdentity";

interface Props {

}

const BankDetails: FC<Props> = () => {
  const { setFieldValue, values } = useFormikContext<ValidateIdentityStepperFormValues>();
  const onInputChange = ({ name, imageFile }: OnUploadInputChangeProps) => {
    setFieldValue(name, imageFile);
  };
  const isStepValid = validateStep("bank_certificates", values);

  return <div>
    <div className="m_y_lg">
      <UploadInput accept="application/pdf" onChange={onInputChange} name="bank_certificates.bank_certificate_1" title="Sube los certificados de cuenta de los ultimos 3 meses" placeholderIcon={<Invoice />} />
    </div>
    <div className="m_y_lg">
      <UploadInput accept="application/pdf" onChange={onInputChange} name="bank_certificates.bank_certificate_2" title="" placeholderIcon={<Invoice />} />
    </div>
    <div className="m_y_lg">
      <UploadInput accept="application/pdf" onChange={onInputChange} name="bank_certificates.bank_certificate_3" title="" placeholderIcon={<Invoice />} />
    </div>
  </div>;
};

export default BankDetails;
