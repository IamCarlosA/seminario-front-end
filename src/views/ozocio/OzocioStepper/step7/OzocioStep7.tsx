/* eslint-disable no-unused-vars */
import { Grid } from "@material-ui/core";
import { useFormikContext } from "formik";
import { useHistory } from "react-router-dom";
import React, { useEffect } from "react";
import { ReactComponent as Star } from "@ecommerce-ozon/design_system/dist/public/static/icons/stars.svg";
import { Button, Typography, useStepper } from "@ecommerce-ozon/design_system";
import { formatPrice } from "helpers/formatPrice";
import { OzocioStepperFormValues } from "views/ozocio/Ozocio";
import useFacebookPixel from "../../../../hooks/FacebookPixel/useFacebookPixel";

export const OzocioStep7 = () => {
  const history = useHistory();
  const { values } = useFormikContext<OzocioStepperFormValues>();
  const { currentStep, steps } = useStepper();
  const pixelLib = useFacebookPixel();

  useEffect(() => {
    if (currentStep === steps.length - 1) {
      pixelLib.track("AddPaymentInfo");
    }
  }, [currentStep]);

  return (
    <div className="display_flex flex_col flex_center flex_gap_md p_x_xxxl_desktop p_x_xl_mobile p_y_xs_desktop p_y_xl_mobile">
      <div
        className="br_xs p_xl display_flex flex_center shadow_hard"
        style={{ backgroundColor: "#FDE9D3"}}
      >
        <Star className="text_primary_300"/>
      </div>
      <Typography scale="heading3" weight="600" className="text_center">
        En el momento no podemos hacerte una oferta para tu moto,{" "}
        <span className="text_primary_300">
          sin embargo nos comunicaremos contigo una vez tengamos lista una
          oferta
        </span>
      </Typography>
      <div className="w_100_per" style={{ borderTop: "1px solid #D3D3D3" }} />
      <Typography scale="large" weight="400" className="text_center p_t_xs">
        Gracias por confiar en nosotros
      </Typography>
      <Typography
        scale="large"
        weight="400"
        className="text_center text_neutral_600"
        style={{fontStyle: "italic"}}
      >
        -Equipo Ozon
      </Typography>
    </div>
  );
};
