import React from "react";
import _ from "lodash";
import { Grid } from "@material-ui/core";
import { useFormikContext } from "formik";
import { Typography, Input } from "@ecommerce-ozon/design_system";
import { ReactComponent as Speedometer } from "@ecommerce-ozon/design_system/dist/public/static/icons/speedometer.svg";
import { OzocioStepperFormValues } from "views/ozocio/Ozocio";
import useValidateStep from "../useValidateStep";
import BackStepButton from "../BackStepButton/BackStepButton";
import NextStepButton from "../NextStepButton/NextStepButton";

export const OzocioStep3 = () => {
  const { values, handleChange, errors, handleBlur, getFieldMeta } =
    useFormikContext<OzocioStepperFormValues>();
  const isValid = useValidateStep("step3");
  return (
    <div className="flex_center_col w_90_per">
      <Typography weight="600" scale="heading3" className="text_center">
        <span className="text_primary_300">Cuéntanos sobre </span>tu vehículo
      </Typography>
      <Typography weight="400" scale="small" className="text_center m_t_lg">
        ¿Qué kilometraje tiene tu vehículo? (otro)
      </Typography>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        className="m_t_lg"
      >
        <Grid item sm={12} md={4}>
          <Input
            onBlur={handleBlur}
            name="step3.mileageOther"
            title="kilometraje"
            icon={<Speedometer />}
            error={
              !!_.get(errors, "step3.mileageOther") &&
              getFieldMeta("step3.mileageOther").touched
            }
            subtitle={
              getFieldMeta("step3.mileageOther").touched
                ? (_.get(errors, "step3.mileageOther") as string)
                : undefined
            }
            onChange={handleChange}
            className="w_100_per"
            type="number"
            placeholder="Escribe el kilometraje aquí"
            value={_.get(values, "step3.mileageOther")}
          />
        </Grid>
      </Grid>

      <div className="m_t_xxxl w_300_px_desktop flex_center_col">
        <NextStepButton isValid={isValid} />
        <BackStepButton isValid />
      </div>
    </div>
  );
};
