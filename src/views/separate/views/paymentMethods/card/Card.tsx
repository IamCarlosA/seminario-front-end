/* eslint-disable arrow-body-style */
import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import Cards from "react-credit-cards";
import { Typography, Button, Input } from "@ecommerce-ozon/design_system";
import { ReactComponent as Boy } from "@ecommerce-ozon/design_system/dist/public/static/icons/boy.svg";
import { ReactComponent as Date } from "@ecommerce-ozon/design_system/dist/public/static/icons/date.svg";
import { ReactComponent as Lock } from "@ecommerce-ozon/design_system/dist/public/static/icons/lock-circle.svg";
import { ReactComponent as Credit } from "@ecommerce-ozon/design_system/dist/public/static/icons/credit-card.svg";
import Kushki from "static/images/kushki.svg";
import "react-credit-cards/es/styles-compiled.css";
import { Grid } from "@material-ui/core";

const validationSchema = yup.object({
  number: yup
    .string()
    .min(16, "Debe tener 16 digitos")
    .required("Campo requerido"),

  name: yup
    .string()
    .min(3, "Minimo 3 letras")
    .max(30, "maximo 30 letras")
    .required("Campo requerido"),
  expiry: yup.string().min(4, "Minimo 4 numeros").required("Campo requerido"),
  cvc: yup.string().min(3, "Minimo 3 numeros").required("Campo requerido"),
});

export const Card = () => {
  const formik = useFormik({
    initialValues: {
      number: "",
      name: "",
      expiry: "",
      cvc: "",
    },
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
  });

  return (
    <div className="w_100_per h_100_per">
      <Typography
        scale="heading3"
        weight="600"
        className="text_neutral_800 text_center display_flex flex_center"
      >
        <Credit className="dim_xxl" />
        &nbsp;Tarjeta de crédito
      </Typography>
      <div className="display_flex flex_center">
        <div className="display_flex flex_center w_60_per_desktop w_80_per_mobile">
          <img
            className="w_40_per_desktop w_60_per_mobile"
            alt="kushki-ozon"
            src={Kushki}
          />
        </div>
      </div>
      <Cards
        cvc={123}
        expiry={formik.values.expiry}
        name={formik.values.name}
        number={formik.values.number}
      />
      <form onSubmit={formik.handleSubmit}>
        <div className="display_flex flex_center m_t_xl">
          <div className="w_60_per_desktop w_80_per_mobile">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Input
                  onBlur={formik.handleBlur}
                  name="name"
                  title="Nombre en la tarjeta"
                  icon={<Boy />}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  subtitle={
                    formik.touched.name
                      ? (formik.errors.name as string)
                      : undefined
                  }
                  onChange={formik.handleChange}
                  type="text"
                  placeholder="Como aparece en la tarjeta"
                  value={formik.values.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  maxLength={4}
                  onBlur={formik.handleBlur}
                  name="expiry"
                  title="Fecha de expiración"
                  icon={<Date />}
                  error={formik.touched.expiry && Boolean(formik.errors.expiry)}
                  subtitle={
                    formik.touched.expiry
                      ? (formik.errors.expiry as string)
                      : undefined
                  }
                  onChange={formik.handleChange}
                  type="text"
                  placeholder="Mes/Año"
                  value={formik.values.expiry}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  maxLength={16}
                  onBlur={formik.handleBlur}
                  name="number"
                  title="Número en la tarjeta"
                  icon={<Credit />}
                  error={formik.touched.number && Boolean(formik.errors.number)}
                  subtitle={
                    formik.touched.number
                      ? (formik.errors.number as string)
                      : undefined
                  }
                  onChange={formik.handleChange}
                  type="text"
                  placeholder="Como aparece en la tarjeta"
                  value={formik.values.number}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  maxLength={4}
                  onBlur={formik.handleBlur}
                  name="cvc"
                  title="cvc"
                  icon={<Lock />}
                  error={formik.touched.cvc && Boolean(formik.errors.cvc)}
                  subtitle={
                    formik.touched.cvc
                      ? (formik.errors.cvc as string)
                      : undefined
                  }
                  onChange={formik.handleChange}
                  type="text"
                  placeholder="3 dígitos"
                  value={formik.values.cvc}
                />
              </Grid>
            </Grid>
          </div>
        </div>
        <div className="display_flex flex_center">
          <div className=" w_60_per_desktop w_80_per_mobile">
            <div className="display_flex flex_justify_between p_t_lg">
              <Typography
                scale="medium"
                weight="600"
                className="text_neutral_900"
              >
                Total a pagar
              </Typography>
              <Typography
                scale="large"
                weight="600"
                className="text_neutral_900"
              >
                $ 150 MXN
              </Typography>
            </div>
          </div>
        </div>
        <div className="display_flex flex_center m_t_md">
          <div className=" w_60_per_desktop w_80_per_mobile">
            <Button
              // disabled={!isValid}
              type="submit"
              variant="principal"
              className="dso_btn_small w_100_per"
            >
              APARTAR VEHÍCULO
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
