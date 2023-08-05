import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Grid } from "@material-ui/core";
import { useFormikContext } from "formik";
import { Typography, Button } from "@ecommerce-ozon/design_system";
import { OzocioStepperFormValues } from "views/ozocio/Ozocio";
import NextStepButton from "../NextStepButton/NextStepButton";
import useValidateStep from "../useValidateStep";

export const OzocioStep1 = () => {
  const years = ["2023", "2022", "2021", "2020"];

  const { values, setFieldValue } = useFormikContext<OzocioStepperFormValues>();
  const isValid = useValidateStep("step1");
  return (
    <div className="flex_center_col w_90_per">
      <Typography weight="600" scale="heading3" className="text_center">
        <span className="text_primary_300">Cuéntanos sobre </span>tu vehículo
      </Typography>
      <Typography weight="400" scale="small" className="text_center m_t_lg">
        ¿De qué año es el modelo de tu vehículo?
      </Typography>

      <div className="m_t_lg">
        <Grid container spacing={3}>
          {years.map((year: string) => (
            <Grid item xs={4} sm className="flex_center" key={uuidv4()}>
              <Button
                variant="selector"
                onClick={() => setFieldValue("step1.year", year)}
                className={`${values.step1.year === year ? "active" : ""}`}
              >
                {year}
              </Button>
            </Grid>
          ))}
        </Grid>
      </div>

      <div className="m_t_xxxl w_300_px_desktop flex_center_col">
        <NextStepButton isValid={isValid} />
        {/* <BackStepButton isValid={true} /> */}
      </div>
    </div>
  );
};
