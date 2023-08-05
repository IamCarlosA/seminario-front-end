import { Grid } from "@material-ui/core";
import React from "react";
import _ from "lodash";
import { useFormikContext } from "formik";
import { Typography, Input } from "@ecommerce-ozon/design_system";
import { ReactComponent as Boy } from "@ecommerce-ozon/design_system/dist/public/static/icons/boy.svg";
import { ReactComponent as Phone } from "@ecommerce-ozon/design_system/dist/public/static/icons/phone.svg";
import { ReactComponent as Email } from "@ecommerce-ozon/design_system/dist/public/static/icons/email.svg";
import { ReactComponent as City } from "@ecommerce-ozon/design_system/dist/public/static/icons/city.svg";
import { ReactComponent as GPS } from "@ecommerce-ozon/design_system/dist/public/static/icons/gps.svg";
import { ReactComponent as CardBoy } from "@ecommerce-ozon/design_system/dist/public/static/icons/user-card-2.svg";
import { SeparateStepperFormValues } from "views/separate/Separate";
import NextStepButton from "../NextStepButton/NextStepButton";
import useValidateStep from "../useValidateStep";

export const SeparateStep1 = () => {
  const { values, handleChange, errors, handleBlur, getFieldMeta, submitForm } =
    useFormikContext<SeparateStepperFormValues>();
  const isValid = useValidateStep("step1");

  return (
    <div className="p_x_xl">
      <Typography
        weight="600"
        scale="heading3"
        className="text_center m_t_lg"
        style={{ color: "#232323" }}
      >
        Información financiera
      </Typography>
      <Typography
        weight="400"
        scale="small"
        className="m_t_xs text_center"
        style={{ color: "#373737" }}
      >
        INGRESA TU INFORMACIÓN PARA APARTAR TU VEHÍCULO
      </Typography>
      <Grid
        container
        justifyContent="center"
        alignContent="center"
        className="m_t_lg"
      >
        <Grid item xs={9}>
          <Input
            onBlur={handleBlur}
            name="step1.name"
            title="Nombre"
            icon={<Boy />}
            error={
              !!_.get(errors, "step1.name") &&
              getFieldMeta("step1.name").touched
            }
            subtitle={
              getFieldMeta("step1.name").touched
                ? (_.get(errors, "step1.name") as string)
                : undefined
            }
            onChange={handleChange}
            type="text"
            placeholder="Escribe tu nombre aquí"
            value={_.get(values, "step1.name")}
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          <Input
            onBlur={handleBlur}
            name="step1.email"
            title="Email"
            icon={<Email />}
            error={
              !!_.get(errors, "step1.email") &&
              getFieldMeta("step1.email").touched
            }
            subtitle={
              getFieldMeta("step1.email").touched
                ? (_.get(errors, "step1.email") as string)
                : undefined
            }
            onChange={handleChange}
            type="text"
            placeholder="Escribe tu apellido aquí"
            value={_.get(values, "step1.email")}
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          <Input
            name="step1.curp"
            placeholder="Escribe tu curp aquí"
            onBlur={handleBlur}
            onChange={handleChange}
            value={_.get(values, "step1.curp")}
            title="Curp"
            icon={<CardBoy />}
            type="text"
            error={
              !!_.get(errors, "step1.curp") &&
              getFieldMeta("step1.curp").touched
            }
            subtitle={
              getFieldMeta("step1.curp").touched
                ? (_.get(errors, "step1.curp") as string)
                : undefined
            }
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          <Input
            onBlur={handleBlur}
            name="step1.cellPhone"
            title="Celular"
            icon={<Phone />}
            error={
              !!_.get(errors, "step1.cellPhone") &&
              getFieldMeta("step1.cellPhone").touched
            }
            subtitle={
              getFieldMeta("step1.cellPhone").touched
                ? (_.get(errors, "step1.cellPhone") as string)
                : undefined
            }
            onChange={handleChange}
            type="text"
            placeholder="+52"
            value={_.get(values, "step1.cellPhone")}
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          <Input
            // className="m_r_xxxl_desktop w_100_per_mobile flex_grow_1"
            title="Ciudad"
            type="select"
            icon={<City />}
            name="step1.city"
            value={_.get(values, "step1.city")}
            onBlur={handleBlur}
            onChange={handleChange}
            subtitle={
              getFieldMeta("step1.city").touched
                ? (_.get(errors, "step1.city") as string)
                : undefined
            }
            error={
              !!_.get(errors, "step1.city") &&
              getFieldMeta("step1.city").touched
            }
            options={[
              {
                label: "Selecciona ciudad",
                value: "",
              },
              {
                label: "Ciudad de méxico",
                value: "CDMX",
              },
              {
                label: "Guadalajara",
                value: "GDL",
              },
            ]}
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          <Input
            onBlur={handleBlur}
            name="step1.address"
            title="Dirección"
            icon={<GPS />}
            error={
              !!_.get(errors, "step1.address") &&
              getFieldMeta("step1.address").touched
            }
            subtitle={
              getFieldMeta("step1.address").touched
                ? (_.get(errors, "step1.address") as string)
                : undefined
            }
            onChange={handleChange}
            type="text"
            placeholder="Escribe tu Dirección"
            value={_.get(values, "step1.address")}
          />
        </Grid>
        <Grid item xs={10}>
          <Input
            name="step1.termsAgreed"
            onChange={handleChange}
            options={[
              {
                label: "Authorizo el tratamiento de mis datos",
                value: true,
              },
            ]}
            // icon={<Group />}
            title=""
            inputClassName="text_primary_300"
            type="checkbox"
            value={[values.step1.termsAgreed]}
          />
        </Grid>
        <Grid item xs={12} sm={10} className="flex_center">
          <NextStepButton onClick={submitForm} isValid={isValid} />
        </Grid>
      </Grid>
    </div>
  );
};
