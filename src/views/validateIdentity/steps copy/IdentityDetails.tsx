/* eslint-disable no-unused-vars */
import React, { FC, useEffect } from "react";
import { useFormikContext } from "formik";
import { ReactComponent as UserCard2 } from "@ecommerce-ozon/design_system/dist/public/static/icons/user-card-2.svg";
import { ReactComponent as CreditCard2 } from "@ecommerce-ozon/design_system/dist/public/static/icons/credit-card-2.svg";
import { ReactComponent as Scanner } from "@ecommerce-ozon/design_system/dist/public/static/icons/scanner-profile.svg";
import UploadInput, { OnUploadInputChangeProps } from "../uploadInput/UploadInput";
import { ValidateIdentityStepperFormValues, validateStep } from "../ValidateIdentity";

interface Props {

}

const IdentityDetails: FC<Props> = () => {
  const { setFieldValue, values } = useFormikContext<ValidateIdentityStepperFormValues>();
  const onInputChange = ({ name, imageFile }: OnUploadInputChangeProps) => {
    setFieldValue(name, imageFile);
  };
  const isStepValid = validateStep("identity", values);

  useEffect(() => {
    console.log(values);
  }, [values]);

  return <div>
    <div className="m_y_lg">
      <UploadInput onChange={onInputChange} name="identity.ine_front"
                   title="Sube la foto de tu INE por la parte frontal" placeholderIcon={<UserCard2 />} />
    </div>
    <div className="m_y_lg">
      <UploadInput onChange={onInputChange} name="identity.ine_back"
                   title="Sube la foto de tu INE por la parte posterior" placeholderIcon={<CreditCard2 />} />
    </div>
    <div className="m_y_lg">
      <UploadInput onChange={onInputChange} name="identity.selfie"
                   title="¡Genial! ahora Tomate una selfie" placeholderIcon={<Scanner />} />
    </div>
    {/* <NextStepButton isValid={isStepValid} /> */}
  </div>;
};

export default IdentityDetails;
