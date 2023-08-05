/* eslint-disable no-unused-vars */
import React from "react";
import _ from "lodash";
import CustomInputTitle from "components/customInputTitle/CustomInputTitle";
import { useFormikContext } from "formik";
import { Typography, Input } from "@ecommerce-ozon/design_system";
import { ReactComponent as Boy } from "@ecommerce-ozon/design_system/dist/public/static/icons/boy.svg";
import { ReactComponent as Phone } from "@ecommerce-ozon/design_system/dist/public/static/icons/smartphone-2.svg";
import { ReactComponent as Email } from "@ecommerce-ozon/design_system/dist/public/static/icons/email.svg";
import { OzocioStepperFormValues } from "views/ozocio/Ozocio";
import { Box, Grid } from "@mui/material";
import useValidateStep from "../useValidateStep";
import BackStepButton from "../BackStepButton/BackStepButton";
import NextStepButton from "../NextStepButton/NextStepButton";

export const OzocioStep6 = () => {
  const { values, handleChange, errors, submitForm, handleBlur, getFieldMeta } =
    useFormikContext<OzocioStepperFormValues>();
  const isValid = useValidateStep("step6");
  return (
    <div className="flex_center_col w_90_per">
      <Typography weight="600" scale="heading3" className="text_center">
        <span className="text_primary_300">Cuéntanos sobre </span>tu vehículo
      </Typography>
      <Typography weight="400" scale="small" className="text_center m_t_lg">
        Ingresa tu información aquí
      </Typography>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className="m_t_md">
        <Grid item sm={6} xs={12}>
          <div style={{ marginTop: 10 }}>
            <Input
              type="text"
              title="Nombres"
              name="step6.name"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Escribe tus nombres aquí"
              value={_.get(values, "step6.name")}
              icon={<Boy />}
              error={
                !!_.get(errors, "step6.name") &&
                getFieldMeta("step6.name").touched
              }
              subtitle={
                getFieldMeta("step6.name").touched
                  ? (_.get(errors, "step6.name") as string)
                  : undefined
              }
            />
          </div>
        </Grid>

        <Grid item sm={6} xs={12}>
          <div style={{ marginTop: 10 }}>
          <Input
              type="text"
              title="Apellidos"
              name="step6.lastName"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Escribe tus apellidos aquí"
              value={_.get(values, "step6.lastName")}
              icon={<Boy />}
              error={
                !!_.get(errors, "step6.lastName") &&
                getFieldMeta("step6.lastName").touched
              }
              subtitle={
                getFieldMeta("step6.lastName").touched
                  ? (_.get(errors, "step6.lastName") as string)
                  : undefined
              }
            />
          </div>
        </Grid>

        <Grid item sm={6} xs={12}>
          <CustomInputTitle
            text="Celular"
            icon={<Phone className="custom-input-color" />}
          />
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 10, sm: 1, md: 1 }}
          >
            <Grid item xs={2} sm={3}>
              <Box
                sx={{
                  width: 85,
                  height: 40,
                  borderRadius: 0.5,
                  backgroundColor: "rgb(217,219,223)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 17,
                    paddingTop: 10,
                  }}
                >
                  <img
                    src="https://flagcdn.com/w80/mx.png"
                    alt="mx"
                    width="36"
                    height="20"
                  />
                  <Typography scale="xsmall" weight="600" className="m_l_xxs">
                    +52
                  </Typography>
                </div>
              </Box>
            </Grid>

            <Grid item xs={9} sm={9}>
              <Input
                title=""
                type="number"
                name="step6.phone"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="1234567890"
                subtitle={
                  getFieldMeta("step6.phone").touched
                    ? (_.get(errors, "step6.phone") as string)
                    : "Nos contáctaremos contigo por whatsapp"
                }
                error={
                  !!_.get(errors, "step6.phone") &&
                  getFieldMeta("step6.phone").touched
                }
                value={_.get(values, "step6.phone")}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={6} xs={12}>
          <div style={{ marginTop: 10 }}>
            <Input
              onBlur={handleBlur}
              name="step6.email"
              title="Correo"
              icon={<Email />}
              subtitle={
                getFieldMeta("step6.email").touched
                  ? (_.get(errors, "step6.email") as string)
                  : undefined
              }
              type="text"
              error={
                !!_.get(errors, "step6.email") &&
                getFieldMeta("step6.email").touched
              }
              placeholder="Escribe tu correo aquí"
              value={_.get(values, "step6.email")}
              onChange={handleChange}
  
            />
          </div>
        </Grid>
      </Grid>
      {/* <Grid container spacing={3} className="m_t_lg">
        <Grid item xs={12} sm={12} md={4}>
          <Input
            onBlur={handleBlur}
            name="step6.name"
            title="Nombres"
            icon={<Boy />}
            error={
              !!_.get(errors, "step6.name") &&
              getFieldMeta("step6.name").touched
            }
            subtitle={
              getFieldMeta("step6.name").touched
                ? (_.get(errors, "step6.name") as string)
                : undefined
            }
            onChange={handleChange}
            type="text"
            placeholder="Escribe tu nombre aquí"
            value={_.get(values, "step6.name")}
          />
        </Grid>
        <Grid item sm={6} xs={12}> */}
      {/* <CustomInputTitle
            text="Celular"
            icon={<Phone className="text_primary_300" />}
          /> */}
      {/* <div className="w_100_per display_flex flex_gap_xs">
            <div className="display_flex flex_col m_t_xxxl">
              <div className="bg_neutral_300 br_xxs display_flex p_xs flex_gap_xs">
                <img
                  src="https://flagcdn.com/w80/mx.png"
                  alt="mx"
                  width="36"
                  height="20"
                />
                <Typography scale="xsmall" weight="600" className="">
                  +52
                </Typography>
              </div>
            </div>

            <Input
              onBlur={handleBlur}
              icon={<Phone/>}
              name="step6.phone"
              title="telefono"
              error={
                !!_.get(errors, "step6.phone") &&
                getFieldMeta("step6.phone").touched
              }
              type="text"
              placeholder="Escribe tu celular aquí"
              value={_.get(values, "step6.phone")}
              onChange={handleChange}
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Input
            onBlur={handleBlur}
            name="step6.email"
            title="Correo"
            icon={<Email />}
            subtitle={
              getFieldMeta("step6.email").touched
                ? (_.get(errors, "step6.email") as string)
                : undefined
            }
            type="text"
            error={
              !!_.get(errors, "step6.email") &&
              getFieldMeta("step6.email").touched
            }
            placeholder="Escribe tu correo aquí"
            value={_.get(values, "step6.email")}
            onChange={handleChange}
          />
        </Grid>
      </Grid> */}
      <div className="m_t_xxxl w_300_px_desktop flex_center_col">
        <NextStepButton onClick={submitForm} isValid={isValid} />
        <BackStepButton isValid />
      </div>
    </div>
  );
};
