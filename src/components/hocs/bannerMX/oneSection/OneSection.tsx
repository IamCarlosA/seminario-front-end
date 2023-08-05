import { Grid } from "@material-ui/core";
import { Typography } from "@ecommerce-ozon/design_system";
import React from "react";
import { ReactComponent as H24 } from "@ecommerce-ozon/design_system/dist/public/static/icons/24h.svg";
import { ReactComponent as Customer } from "@ecommerce-ozon/design_system/dist/public/static/icons/customer-service.svg";
import photo1 from "static/images/banner/ozon-motos-renta-venta-oferta-de-valor-1.png";
import photo2 from "static/images/banner/ozon-motos-renta-venta-oferta-de-valor-6.png";
import photo3 from "static/images/banner/ozon-motos-renta-venta-oferta-de-valor-2.png";
import { ReactComponent as Invest } from "@ecommerce-ozon/design_system/dist/public/static/icons/invest.svg";

export const OneSection = () => (
  <div className="dso_container">
    <Typography
      scale="heading3"
      weight="600"
      className="m_y_xxxl text_center display_none_mobile"
    >
      {" "}
      ¿Por qué <span className="text_primary_300">comprar</span> en Ozon? 🐼
    </Typography>
    <Grid
      container
      direction="row"
      className="dso_card bg_neutral_200 p_x_xl m_b_xxxl"
      justifyContent="center"
      spacing={3}
    >
      <Grid item xs={12} md={4} className="m_y_xxl">
        <img src={photo1} alt="" className="display_none_mobile w_100_per" />

        <div className="display_flex flex_align_center">
          <div className="m_r_xxxl br_circle bg_primary_300 p_md display_flex">
            <H24 className="dim_xxxl" />
          </div>
          <div>
            <Typography
              scale="medium"
              weight="600"
              className="text_primary_300"
            >
              Fácil y Rápido
            </Typography>
            <Typography scale="small" weight="400" className="text_neutral_800">
              No checamos buró.
            </Typography>
          </div>
        </div>
      </Grid>

      <Grid item xs={12} md={4} className="m_y_xxl">
        <div className="display_flex flex_align_center">
          <div className="m_r_xxxl br_circle bg_primary_300 p_md display_flex">
            <Customer className="dim_xxxl" />
          </div>
          <div>
            <Typography
              scale="medium"
              weight="600"
              className="text_primary_300"
            >
              {" "}
              Soporte Personalizado
            </Typography>
            <Typography scale="small" weight="400" className="text_neutral_800">
              {" "}
              Compañía durante tu compra.
            </Typography>
          </div>
        </div>
        <img src={photo2} alt="" className="display_none_mobile w_100_per" />
      </Grid>
      <Grid item xs={12} md={4} className="m_y_xxl">
        <img src={photo3} alt="" className="display_none_mobile w_100_per" />

        <div className="display_flex flex_align_center">
          <div className="m_r_xxxl br_circle bg_primary_300 p_md display_flex">
            <Invest className="dim_xxxl" />
          </div>
          <div>
            <Typography
              scale="medium"
              weight="600"
              className="text_primary_300"
            >
              {" "}
              Compra Financiada
            </Typography>
            <Typography scale="small" weight="400" className="text_neutral_800">
              {" "}
              Ozon te da la posibilidad <br />
              de comprar tu ozoneta.
            </Typography>
          </div>
        </div>
      </Grid>
    </Grid>
  </div>
);
