import React from "react";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";

import ReactGA from "react-ga4";
import { Button, Typography } from "@ecommerce-ozon/design_system";
import { useDispatch, useSelector } from "react-redux";
import yellow from "static/images/banner/yellow.png";


import { RootState } from "store/index";

import fianciado from "static/images/banner/financiada.png";
import {
  clearCreditVerificationCreditTimeAction,
  clearCreditVerificationVehicleAction,
} from "../../../../store/actions/creditVerification";

export const SecondSection = () => {
  const { country } = useSelector((state: RootState) => state.countryReducer);
  const history = useHistory();
  const dispatch = useDispatch();

  const ozocio = () => {
    history.push("/vende-tu-moto");
  };

  const finan = () => {
    // Event analyctics
    ReactGA.event("CTA_Financial_ButtonBanner", {
      category: "Financial Form",
      label: "click button from banner to financial search view",
    });
    dispatch(clearCreditVerificationVehicleAction());
    dispatch(clearCreditVerificationCreditTimeAction());
    history.push("/financia-tu-moto");
  };
  return (
    <div className="dso_container">
      {country === "MX" && (
        <Grid
          container
          direction="row"
          className="dso_card bg_neutral_200 p_y_none p_x_xxl display_none_mobile m_b_xxxl"
          justifyContent="center"
          spacing={3}
        >
          <Grid item xs={12} md={6}>
            <div className="center_y">
              <Typography scale="heading2" weight="600" className="m_b_lg">
                {" "}
                Encuentra la moto ideal para ti
              </Typography>
              <Typography scale="heading4" weight="600" className="m_b_lg">
                {" "}
                Calcula tu financiamiento con Ozon
              </Typography>
              <Typography scale="large" weight="400" className="m_b_xxl">
                {" "}
                Conoce el costo de tus cuotas semanales haciendo clic aquí
              </Typography>

              <Button className="w_80_per" onClick={finan}>
                Financia tu moto
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <img src={fianciado} alt="" className="w_100_per" />
          </Grid>
        </Grid>
      )}

      {country === "MX" && (
        <Grid
          container
          direction="row"
          className="dso_card bg_neutral_200 p_y_none display_none_desktop m_b_xxxl"
          justifyContent="center"
          spacing={3}
        >
          <Grid item xs={12} md={6}>
            <Typography scale="large" weight="600" className="m_b_lg">
              {" "}
              Encuentra la moto ideal para ti
            </Typography>
            <Typography scale="small" weight="600" className="m_b_lg">
              {" "}
              Calcula tu financiamiento con Ozon
            </Typography>
            <Typography scale="small" weight="400" className="m_b_xxl">
              {" "}
              Conoce el costo de tus cuotas semanales haciendo clic aquí
            </Typography>
            <Button scale="small" className="w_100_per" onClick={finan}>
              Financia tu moto
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <img src={fianciado} alt="" className="w_100_per" />
          </Grid>
        </Grid>
      )}

      <Grid
        container
        direction="row"
        className="dso_card bg_neutral_900 p_y_none p_x_xxl display_none_mobile m_b_xxxl"
        justifyContent="center"
        spacing={3}
      >
        <Grid item xs={12} md={6}>
          <img src={yellow} alt="" className="w_100_per" />
        </Grid>
        <Grid item xs={12} md={6}>
          <div className="center_y">
            <Typography scale="heading2" weight="600" className="m_b_lg">
              {" "}
              En Ozon también compramos tu moto
            </Typography>
            <Typography scale="heading4" weight="600" className="m_b_lg">
              {" "}
              Al mejor precio y en 1 día
            </Typography>
            <Typography scale="large" weight="400" className="m_b_xxl">
              {" "}
              Conoce el precio en el que te compramos tu motocicleta haciendo
              clic aquí
            </Typography>
            <Button className="w_80_per" onClick={ozocio}>
              Vende tu moto
            </Button>
          </div>
        </Grid>
      </Grid>

      <Grid
        container
        direction="row"
        className="dso_card bg_neutral_900 p_y_none display_none_desktop m_b_xxxl"
        justifyContent="center"
        spacing={3}
      >
        <Grid item xs={12} md={6}>
          <Typography scale="large" weight="600" className="m_b_lg">
            {" "}
            En Ozon también compramos tu moto
          </Typography>
          <Typography scale="small" weight="600" className="m_b_lg">
            {" "}
            Al mejor precio y en 1 día
          </Typography>
          <Typography scale="small" weight="400" className="m_b_xxl">
            {" "}
            Conoce el precio en el que te compramos tu motocicleta haciendo clic
            aquí
          </Typography>
          <Button scale="small" className="w_100_per" onClick={ozocio}>
            Vende tu moto
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <img src={yellow} alt="" className="w_100_per" />
        </Grid>
      </Grid>
    </div>
  );
};
