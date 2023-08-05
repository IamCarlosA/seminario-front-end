import { Grid } from "@material-ui/core";
import React from "react";
import _ from "lodash";
import { useFormikContext } from "formik";
import { Typography, Input } from "@ecommerce-ozon/design_system";
import { ReactComponent as Boy } from "@ecommerce-ozon/design_system/dist/public/static/icons/boy.svg";
import { ReactComponent as Phone } from "@ecommerce-ozon/design_system/dist/public/static/icons/smartphone-2.svg";
import { ReactComponent as Email } from "@ecommerce-ozon/design_system/dist/public/static/icons/email.svg";
import NextStepButton from "../NextStepButton/NextStepButton";
import useValidateStep from "../useValidateStep";
import { OzonerStepperFormValues } from "../../Ozoner";
// import BackStepButton from "../BackStepButton/BackStepButton";
export const OzonerStep1 = () => {
  const { handleChange, values, errors, getFieldMeta, handleBlur } =
    useFormikContext<OzonerStepperFormValues>();
  const isValid = useValidateStep("step1");

  return (
    <div className="flex_center_col w_90_per">
      <Typography weight="600" scale="heading3" className="text_center">
        Tus datos son importantes para{" "}
        <span className="text_primary_300">Ozon</span>
      </Typography>
      <Typography weight="400" scale="small" className="text_center m_t_lg">
        INGRESA AQUÍ TU INFORMACIÓN
      </Typography>
      <Grid container spacing={3} className="m_t_lg">
        <Grid item xs={12} sm={12} md={4}>
          <Input
            name="step1.name"
            title="nombre"
            icon={<Boy />}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            placeholder="Escribe tu nombre aquí"
            value={_.get(values, "step1.name")}
            error={
              !!_.get(errors, "step1.name") &&
              getFieldMeta("step1.name").touched
            }
            subtitle={
              getFieldMeta("step1.name").touched
                ? (_.get(errors, "step1.name") as string)
                : undefined
            }
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Input
            onBlur={handleBlur}
            name="step1.phone"
            title="Celular"
            error={
              !!_.get(errors, "step1.phone") &&
              getFieldMeta("step1.phone").touched
            }
            subtitle={
              getFieldMeta("step1.phone").touched
                ? (_.get(errors, "step1.phone") as string)
                : "Nos contáctaremos contigo por whatsapp"
            }
            icon={<Phone />}
            type="text"
            placeholder="Escribe tu celular aquí"
            value={_.get(values, "step1.phone")}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Input
            name="step1.email"
            onBlur={handleBlur}
            title="Correo"
            icon={<Email />}
            type="text"
            error={
              !!_.get(errors, "step1.email") &&
              getFieldMeta("step1.email").touched
            }
            subtitle={
              getFieldMeta("step1.email").touched
                ? (_.get(errors, "step1.email") as string)
                : undefined
            }
            placeholder="Escribe tu correo aquí"
            value={_.get(values, "step1.email")}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Typography weight="400" scale="small" className="text_center m_t_lg">
        TE DAMOS LA OPCIÓN DE REALIZAR UNA VISITA A NUESTRO TALLER PARA QUE VEAS
        EL VEHÍCULO.
      </Typography>
      <div className="m_t_xxxl w_300_px_desktop flex_center_col">
        <NextStepButton isValid={isValid} />
        {/* <BackStepButton isValid={true} /> */}
      </div>
    </div>
  );
};
