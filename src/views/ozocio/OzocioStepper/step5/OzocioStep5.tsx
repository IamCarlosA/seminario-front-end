/* eslint-disable jsx-a11y/label-has-associated-control */
import { Grid } from "@material-ui/core";
import React from "react";
import { useFormikContext } from "formik";
import { Typography } from "@ecommerce-ozon/design_system";
import { ReactComponent as Image } from "@ecommerce-ozon/design_system/dist/public/static/icons/image.svg";
import { OzocioStepperFormValues } from "views/ozocio/Ozocio";
import useValidateStep from "../useValidateStep";
import BackStepButton from "../BackStepButton/BackStepButton";
import NextStepButton from "../NextStepButton/NextStepButton";
import "./stylesstep5.scss";

export const OzocioStep5 = () => {
  const { values, setFieldValue } = useFormikContext<OzocioStepperFormValues>();
  const isValid = useValidateStep("step5");

  const handleFile = (e: any) => {
    const file = e.target.files[0];
    // if (file.size > 1000000) {
    //   Swal.fire({
    //     text: "La imagen no debe ser superior a 1mb",
    //     icon: "warning",
    //     confirmButtonText: "Aceptar",
    //   });
    // } else {
    //   setFieldValue("step5.img.file", file);
    //   setFieldValue("step5.img.view", URL.createObjectURL(file));
    // }

    setFieldValue("step5.img.file", file);
    setFieldValue("step5.img.view", URL.createObjectURL(file));
  };

  return (
    <div className="flex_center_col w_90_per">
      <Typography weight="600" scale="heading3" className="text_center">
        <span className="text_primary_300">Cuéntanos sobre </span>tu vehículo
      </Typography>
      <Typography weight="400" scale="small" className="text_center m_t_lg">
        Toma una fotografía de tu moto
      </Typography>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={3}
        className="m_t_lg"
      >
        <Grid
          item
          sm={12}
          md={4}
          className="w_100_per h_100_per dso_card flex_center"
        >
          <div className="w_80_per h_80_per flex_center p_xl">
            <div className="flex_center">
              {values.step5.img.view?.length ? (
                <div className="bg_neutral_200 dim_60_per dso_card_img overflow_hidden">
                  <img
                    src={values.step5.img?.view}
                    alt="foto"
                    className="dim_100_per"
                  />
                </div>
              ) : (
                <div className="bg_neutral_200 dso_card_img flex_center">
                  <Image className="dim_xl_desktop dim_xxxl_mobile text_neutral_700 m_xl" />
                </div>
              )}
            </div>
          </div>
        </Grid>
        <Grid
          item
          sm={12}
          md={3}
          style={{ position: "relative" }}
          className="m_t_lg_mobile"
        >
          <input
            type="file"
            accept="image/*"
            id="file"
            onChange={handleFile}
            className="display_none"
          />
          <label
            htmlFor="file"
            className="dso_btn_outline dso_btn_small test text_xsmall_600 p_xs"
          >
            <Image className="dim_lg m_r_md" />
            Adjuntar imagen
          </label>
        </Grid>
      </Grid>
      <div className="m_t_xxxl w_300_px_desktop flex_center_col">
        <NextStepButton isValid={isValid} />
        <BackStepButton isValid />
      </div>
    </div>
  );
};
