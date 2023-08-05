import React from "react";
import { Button, Typography } from "@ecommerce-ozon/design_system";
import { ReactComponent as COMPANY } from "@ecommerce-ozon/design_system/dist/public/static/icons/company.svg";
import img12 from "./img12.png";
import img13 from "./img13.png";
import img13M from "./img13M.png";

export const Hub = () => (
  <div className="w_100_per">
    <div className="title-container text_center">
      <Typography scale="heading3" weight="600">
        <span>
          Vísitanos en nuestras
          <span className="text_primary_300"> sucursales 🏪</span>
        </span>
      </Typography>
    </div>

    <div className="overflow_x_scroll flex_center m_y_lg">
      <div className="dso_card flex_center_col_mobile flex_center_desktop flex_align_center_desktop flex_justify_start_desktop  m_y_sm bg_neutral_0 w_650_px_desktop w_250_px_mobile h_400_px_mobile h_200_px_desktop">
        <img
          src={img12}
          alt="ozon"
          className="m_l_md_desktop m_r_xs_desktop m_y_md_mobile"
        />
        <img
          src={img13}
          alt="ozon"
          className="m_x_xs_desktop display_none_mobile"
        />
        <img
          src={img13M}
          alt="ozon"
          className="m_x_xs_desktop display_none_desktop m_y_md_mobile"
        />
        <div className="dim_100_per bg_neutral_0 m_l_xs_desktop m_r_md_desktop p_y_md_desktop pos_relative_desktop p_md_mobile">
          <Typography scale="heading3" weight="600">
            <span className="text_primary_300"> Anáhuac </span>
          </Typography>
          <Typography scale="xsmall" weight="400" className="text_neutral_900">
            Laguna de Mayran 396, Anáhuac I Secc., Anáhuac I Secc, Miguel
            Hidalgo, 11320 Ciudad de México, CDMX, México
          </Typography>

          <Button
            scale="small"
            className="pos_absolute_desktop display_none_mobile bg_neutral_700"
            style={{ bottom: "10%", right: "0" }}
            icon={<COMPANY />}
          >
            CDMX
          </Button>
          <Button
            scale="small"
            className="pos_absolute_desktop display_none_desktop bg_neutral_700"
            style={{ top: "05%", left: "60%" }}
            icon={<COMPANY />}
          >
            CDMX
          </Button>
        </div>
      </div>
    </div>

    {/* <Grid
        container
        direction="row"
        className="m_y_xxxl"
        justifyContent="center"
        spacing={3}
      >
        <Grid item xs={6} md={6} className={"dso_card flex_center"}>
          <img src={img12} alt="" className="" />
          <img src={img13} />

          <div className="">
            <Typography scale={"heading3"} weight={"600"}>
              <span className={"text_primary_300"}> Anáhuac </span>
            </Typography>
            Laguna de Mayran 396, Anáhuac I Secc., Anáhuac I Secc, Miguel
            Hidalgo, 11320 Ciudad de México, CDMX, México
            <Button scale="small" className="w_100_per">
              CDMX
            </Button>
          </div>
        </Grid>

        <Grid item xs={6} md={6} className={"dso_card flex_center"}>
          <img src={img14} alt="" className="" />
          <img src={img15} />

          <div className="">
            <Typography scale={"heading3"} weight={"600"}>
              <span className={"text_primary_300"}> Anáhuac </span>
            </Typography>
            Laguna de Mayran 396, Anáhuac I Secc., Anáhuac I Secc, Miguel
            Hidalgo, 11320 Ciudad de México, CDMX, México
            <Button scale="small" className="w_100_per">
              CDMX
            </Button>
          </div>
        </Grid>
      </Grid> */}
  </div>
);
