import { Grid } from "@material-ui/core";
import ReactGA from "react-ga4";
import { useHistory } from "react-router-dom";
import React, { useEffect } from "react";
import ozon from "static/logos/ozon.svg";
import yellow from "static/images/banner/yellow.png";
import photo1 from "static/logos/photo1.svg";
import photo2 from "static/logos/photo2.svg";
import photo3 from "static/logos/photo3.svg";
import one from "static/logos/one.svg";
import two from "static/logos/two.svg";
import three from "static/logos/three.svg";
import mano from "static/logos/mano.png";

import { ReactComponent as Invoice } from "@ecommerce-ozon/design_system/dist/public/static/icons/invoice-paper.svg";
import { ReactComponent as Money } from "@ecommerce-ozon/design_system/dist/public/static/icons/money.svg";
import { ReactComponent as Motorcycle } from "@ecommerce-ozon/design_system/dist/public/static/icons/motorcycle.svg";

import "./homeozocio.scss";
import { Typography, Button } from "@ecommerce-ozon/design_system";
import useTrackPixelOnMount from "../../hooks/FacebookPixel/useTrackPixelOnMount";

export const Homeozo = () => {
  const history = useHistory();
  useTrackPixelOnMount("Lead");

  const offer = () => {
    ReactGA.event("CTA_ozocio_carrousel", {
      category: "Ozocio",
      label: "Sell vehicle from banner (button click carrousel)",
    });
    history.push("/formulario-vende-tu-moto");
  };

  const offerCard = () => {
    ReactGA.event("CTA_ozocio_card", {
      category: "Ozocio",
      label: "Sell vehicle from cards (button click cards)",
    });
    history.push("/formulario-vende-tu-moto");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Ozocio en Ozon";
    //  ReactGA.send({ hitType: "pageview", page: history.location.pathname });
  }, []);

  return (
    <div className="homeozocio">
      <div className="cover bg_neutral_900 center_x m_b_xxxl br_b_xxxl">
        <div className="cover-container">
          <Grid
            container
            direction="row"
            className="dso_card bg_neutral_900 p_y_none p_x_xxl display_none_mobile"
            justifyContent="center"
            spacing={3}
          >
            <Grid item xs={12} md={7}>
              <img src={yellow} alt="" className="w_100_per" />
            </Grid>
            <Grid item xs={12} md={5}>
              <div className="center_y">
                <img src={ozon} alt="" className="w_40_per m_y_xl" />
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
                  Conoce el precio en el que te compramos tu motocicleta
                  haciendo clic aquí
                </Typography>
                <Button className="w_80_per" onClick={offer}>
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
              <img src={ozon} alt="" className="w_100_per m_y_xl" />
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
                Conoce el precio en el que te compramos tu motocicleta haciendo
                clic aquí
              </Typography>
              <Button scale="small" className="w_100_per" onClick={offer}>
                Vende tu moto
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <img src={yellow} alt="" className="w_100_per" />
            </Grid>
          </Grid>
        </div>
      </div>
      <div className="dso_container">
      <Typography
        scale="heading3"
        weight="600"
        className="m_y_xxxl text_center display_none_mobile"
      >
        Beneficios de <span className="text_primary_300">vender con Ozon</span>
      </Typography>

      <Grid
        container
        direction="row"
        className="dso_card bg_neutral_200 p_x_xxl m_b_xxxl"
        justifyContent="center"
        spacing={3}
      >
        <Grid item xs={12} md={4} className="m_y_xxl">
          <img src={photo1} alt="" className="display_none_mobile w_100_per" />
          <div className="display_flex flex_align_center">
            <div className="m_r_xxxl br_circle bg_primary_300 p_md display_flex">
              <Invoice className="dim_xxxl" />
            </div>
            <div>
              <Typography
                scale="medium"
                weight="600"
                className="text_primary_300"
              >
                Cero trámites
              </Typography>
              <Typography
                scale="small"
                weight="400"
                className="text_neutral_800"
              >
                Ozon se encarga de los <br />
                trámites necesarios.
              </Typography>
            </div>
          </div>
        </Grid>

        <Grid item xs={12} md={4} className="m_y_xxl">
          <div className="display_flex flex_align_center">
            <div className="m_r_xxxl br_circle bg_primary_300 p_md display_flex">
              <Money className="dim_xxxl" />
            </div>
            <div>
              <Typography
                scale="medium"
                weight="600"
                className="text_primary_300"
              >
                Precio preliminar
              </Typography>
              <Typography
                scale="small"
                weight="400"
                className="text_neutral_800"
              >
                Te daremos un precio preliminar en línea y al instante.
              </Typography>
            </div>
          </div>
          <img src={photo2} alt="" className="display_none_mobile w_100_per" />
        </Grid>
        <Grid item xs={12} md={4} className="m_y_xxl">
          <img src={photo3} alt="" className="display_none_mobile w_100_per" />
          <div className="display_flex flex_align_center">
            <div className="m_r_xxxl br_circle bg_primary_300 p_md display_flex">
              <Motorcycle className="dim_xxxl" />
            </div>
            <div>
              <Typography
                scale="medium"
                weight="600"
                className="text_primary_300"
              >
                Revisión
              </Typography>
              <Typography
                scale="small"
                weight="400"
                className="text_neutral_800"
              >
                Realizamos la revisión <br /> rápida del vehículo y te <br />{" "}
                aseguramos el precio <br />
                final.
              </Typography>
            </div>
          </div>
        </Grid>
      </Grid>

      <Typography
        scale="heading3"
        weight="600"
        className="m_y_xxxl text_center display_none_mobile"
      >
        ¿Cómo vender mi moto{" "}
        <span className="text_primary_300">en 3 pasos?</span>
      </Typography>

      <Grid
        container
        direction="row"
        className="dso_card bg_neutral_200 p_x_xxl m_b_xxxl"
        justifyContent="center"
        spacing={3}
      >
        <Grid item xs={12} md={6} className="m_y_xxl">
          <div className="display_flex flex_align_center m_b_xxxl">
            <img src={one} alt="" className="m_r_md number" />
            <div>
              <Typography
                scale="heading3"
                weight="600"
                className="text_primary_300 m_b_md"
              >
                Cotiza
              </Typography>
              <Typography
                scale="large"
                weight="400"
                className="text_neutral_800"
              >
                Registra tu moto en línea <br /> en pocos pasos.
              </Typography>
            </div>
          </div>
          <div className="display_flex flex_align_center m_b_xxxl">
            <img src={two} alt="" className="m_r_md number" />
            <div>
              <Typography
                scale="heading3"
                weight="600"
                className="text_primary_300 m_b_md"
              >
                Agenda
              </Typography>
              <Typography
                scale="large"
                weight="400"
                className="text_neutral_800"
              >
                Agenda una inspección del vehículo en <br /> nuestros talleres.
              </Typography>
            </div>
          </div>
          <div className="display_flex flex_align_center m_b_xxxl">
            <img src={three} alt="" className="m_r_md number" />
            <div>
              <Typography
                scale="heading3"
                weight="600"
                className="text_primary_300 m_b_md"
              >
                Disfruta
              </Typography>
              <Typography
                scale="large"
                weight="400"
                className="text_neutral_800"
              >
                Después de la revisión te <br /> daremos una oferta final y{" "}
                <br />
                firmaremos la documentación <br />
                correspondiente.
              </Typography>
            </div>
          </div>
        </Grid>

        <Grid item xs={12} md={6} className="m_y_xxl">
          <img src={mano} alt="" className="manito w_100_per" />
          <Button onClick={offerCard} className="w_80_per center_x">
            Vende tu moto
          </Button>
        </Grid>
      </Grid>
      </div>
      
    </div>
  );
};
