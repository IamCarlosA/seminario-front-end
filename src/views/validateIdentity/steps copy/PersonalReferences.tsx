/* eslint-disable no-unused-vars */
import React, { FC, useEffect } from "react";
import { useFormikContext } from "formik";
import { ReactComponent as Boy } from "@ecommerce-ozon/design_system/dist/public/static/icons/boy.svg";
import { ReactComponent as UserCard } from "@ecommerce-ozon/design_system/dist/public/static/icons/user-card-2.svg";
import { ReactComponent as Phone } from "@ecommerce-ozon/design_system/dist/public/static/icons/phone.svg";
import _ from "lodash";
import { Typography, Input, useStepper } from "@ecommerce-ozon/design_system";
import { ValidateIdentityStepperFormValues, validateStep } from "../ValidateIdentity";

interface Props {
  name: string;
  baseName: string;
  title: string;
  finishForm?: boolean;
  loading?: boolean;
}

const PersonalReferences: FC<Props> = ({ name, title, baseName, finishForm, loading }) => {
  const {
    values,
    handleBlur,
    handleChange,
    errors,
    touched,
    submitForm
  } = useFormikContext<ValidateIdentityStepperFormValues>();
  const isStepValid = validateStep(`${baseName}.${name}`, values);
  const { incrementCurrentStep } = useStepper();

  useEffect(() => {
    console.log(values);
  }, [values]);

  const handleFinishForm = () => {
    if (finishForm) {
      submitForm();
    } else {
      incrementCurrentStep();
    }
  };

  return <div className="display_flex flex_col p_y_lg">
    <Typography weight="400" scale="small">
      {title}
    </Typography>
    <Input
      onBlur={handleBlur}
      error={
        !!_.get(errors, `${baseName}.${name}.name`) &&
        !!_.get(touched, `${baseName}.${name}.name`)
      }
      subtitle={
        !!_.get(touched, `${baseName}.${name}.name`) &&
        _.get(errors, `${baseName}.${name}.name`)
      }
      onChange={handleChange}
      value={_.get(values, `${baseName}.${name}.name`)}
      className="m_t_lg" title="Nombres" icon={<Boy />} type="text" name={`${baseName}.${name}.name`} />
    <Input
      onBlur={handleBlur}
      error={
        !!_.get(errors, `${baseName}.${name}.phone`) &&
        !!_.get(touched, `${baseName}.${name}.phone`)
      }
      subtitle={
        !!_.get(touched, `${baseName}.${name}.phone`) &&
        _.get(errors, `${baseName}.${name}.phone`)
      }
      onChange={handleChange}
      value={_.get(values, `${baseName}.${name}.phone`)}
      className="m_t_lg" title="Celular" icon={<Phone />} type="text" name={`${baseName}.${name}.phone`} />
    <Input
      onBlur={handleBlur}
      error={
        !!_.get(errors, `${baseName}.${name}.curp`) &&
        !!_.get(touched, `${baseName}.${name}.curp`)
      }
      subtitle={
        !!_.get(touched, `${baseName}.${name}.curp`) &&
        _.get(errors, `${baseName}.${name}.curp`)
      }
      onChange={handleChange}
      value={_.get(values, `${baseName}.${name}.curp`)}
      className="m_y_lg" title="CURP" icon={<UserCard />} type="text" name={`${baseName}.${name}.curp`} />
    {/* {!loading ? <NextStepButton disabled={loading} onClick={handleFinishForm} isValid={isStepValid} /> :
      <Typography weight="400" scale="small">Estamos validando tu identidad… Esto puede demorar unos minutos <br/> Gracias por tu paciencia.</Typography>} */}
  </div>;
};

export default PersonalReferences;
