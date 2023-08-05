import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Grid } from "@material-ui/core";
import { useFormikContext } from "formik";
import { Typography, Button } from "@ecommerce-ozon/design_system";
import { OzocioStepperFormValues } from "views/ozocio/Ozocio";
import useValidateStep from "../useValidateStep";
import BackStepButton from "../BackStepButton/BackStepButton";
import NextStepButton from "../NextStepButton/NextStepButton";

export const OzocioStep2 = () => {
  const milleage = [
    { l: "1.000 KM", v: 1000 },
    { l: "2.000 KM", v: 2000 },
    { l: "3.000 KM", v: 3000 },
    { l: "4.000 KM", v: 4000 },
    { l: "5.000 KM", v: 5000 },
    { l: "Otro", v: 999999999 },
  ];
  const { values, setFieldValue } = useFormikContext<OzocioStepperFormValues>();
  const isValid = useValidateStep("step2");
  return (
    <div className="flex_center_col w_90_per">
      <Typography weight="600" scale="heading3" className="text_center">
        <span className="text_primary_300">Cuéntanos sobre </span>tu vehículo
      </Typography>
      <Typography weight="400" scale="small" className="text_center m_t_lg">
        ¿Qué kilometraje tiene tu vehículo?
      </Typography>

      <div className="m_t_lg">
        <Grid container spacing={3}>
          {milleage.map((km: any) => (
            <Grid item xs={4} sm className="flex_center" key={uuidv4()}>
              <Button
                variant="selector"
                onClick={() => setFieldValue("step2.mileage", km.v)}
                className={`${values.step2.mileage === km.v ? "active" : ""}`}
              >
                {km.l}
              </Button>
            </Grid>
          ))}
        </Grid>
      </div>

      <div className="m_t_xxxl w_300_px_desktop flex_center_col">
        <NextStepButton isValid={isValid} />
        <BackStepButton isValid />
      </div>
    </div>
  );
};
