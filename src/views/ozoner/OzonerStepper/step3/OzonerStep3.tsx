import { Grid } from "@material-ui/core";
import React from "react";
import ReactGA from "react-ga4";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFormikContext } from "formik";
import { format } from "date-fns";
import { Button, Typography } from "@ecommerce-ozon/design_system";
import { ReactComponent as Whatsapp } from "@ecommerce-ozon/design_system/dist/public/static/icons/whatsapp.svg";
import { formatPrice } from "helpers/formatPrice";
import { prices } from "helpers/prices";
import { RootState } from "store/index";
import { OzonerStepperFormValues } from "views/ozoner/Ozoner";

export const OzonerStep3 = () => {
  const { country } = useSelector((state: RootState) => state.countryReducer);
  const history = useHistory();
  const { vehicle } = useSelector((state: RootState) => state.datevReducer);
  const { values } = useFormikContext<OzonerStepperFormValues>();
  const finish = (text: string) => {
    ReactGA.event("CTA_ozoner_confirm WA", {
      category: "Ozoner",
      label: "Param (Vehicle Id), button click, go to whatsapp to confirm date",
      vehicleId: vehicle.internalId,
    });
    window.open(
      `https://api.whatsapp.com/send?phone=525548436212&text=${text}`,
      "_blank"
    );
    history.push("/");
  };

  return (
    <div className="flex_center_col w_90_per">
      <Typography
        scale="heading3"
        scaleMobile="large"
        weight="600"
        className="m_b_lg text_center text_primary_300"
      >
        Resumen
      </Typography>
      <Grid container direction="row" spacing={3} className="m_b_xl">
        <Grid item xs={12} md={6}>
          <img
            src={vehicle.images ? vehicle.images[0].url : ""}
            alt="moto"
            className="w_60_per_desktop center w_60_per_mobile"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            scale="heading3"
            weight="600"
            className="m_b_xs_desktop m_b_md_mobile"
          >
            {vehicle.brand?.name} {vehicle.model?.Name}
          </Typography>
          <Typography
            scale="small"
            weight="600"
            className="m_b_xs_desktop m_b_md_mobile"
          >
            {vehicle?.cylindersCapacity?.value} CC
          </Typography>
          <Typography
            scale="heading2"
            weight="600"
            className="m_b_xs_desktop flex_center flex_justify_start flex_align_end m_b_md_mobile text_primary_300"
          >
            ${formatPrice(prices(vehicle.salePrice), country)}{" "}
            <Typography scale="small" weight="400" className="text_neutral_800">
              Cuota semanal
            </Typography>
          </Typography>
          <Typography
            scale="heading4"
            weight="600"
            className="m_b_xs_desktop m_b_md_mobile"
          >
            VISITA
          </Typography>
          <Typography
            scale="small"
            weight="600"
            className="m_b_xs_desktop m_b_md_mobile"
          >
            {/* {`${values.step2.date}`} */}
            {values.step2.date !== ""
              ? format(new Date(values.step2.date), "yyyy-MM-dd")
              : values.step2.date}
          </Typography>
          <Typography
            scale="small"
            weight="600"
            className="m_b_xs_desktop m_b_md_mobile"
          >
            {`${values.step2.time}`}
          </Typography>
          <Typography
            scale="small"
            weight="400"
            className="m_b_xs_desktop m_b_md_mobile"
          >
            Ubicación: Gutiérrez Nájera 85, Obrera, Cuauhtémoc, 06800 Ciudad de
            México, CDMX, México.
          </Typography>
        </Grid>
      </Grid>
      <Typography scale="small" weight="600" className="m_b_xl text_center">
        TODA ESTA INFORMACIÓN MÁS LOS PASOS A SEGUIR FUERON ENVIADOS A TU CORREO
        ELECTRÓNICO (REVISA LA CARPETA DE SPAM).
      </Typography>
      <Typography
        scale="small"
        weight="600"
        className="m_b_xl dim_fit flex_center_desktop flex_center_col_mobile m_x_xxxl pos_relative"
      >
        <div className="br_circle p_xs bg_primary_300 display_flex dim_fit wa_icon m_r_xs">
          <Whatsapp className="dim_lg " />
        </div>{" "}
        ¿Tienes dudas? Contacta al equipo de soporte{" "}
        <span className="text_primary_300 m_l_xs">+52 55 7405 0922</span>
      </Typography>
      <Button
        scale="small"
        onClick={() =>
          finish(
            `Hola%20agende %20una%20cita%20para%20la%20fecha%20${`${values.step2.date}-${values.step2.time}`.replaceAll(
              " ",
              "%20"
            )}%20para%20la%20moto%20${
              vehicle?.id_internal
            }%20y%20me%20gustaria%20continuar%20mi%20proceso`
          )
        }
        icon={<Whatsapp />}
      >
        CONTINUA TU PROCESO
      </Button>
    </div>
  );
};
