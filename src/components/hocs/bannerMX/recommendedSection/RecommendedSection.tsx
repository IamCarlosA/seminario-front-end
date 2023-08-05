/* eslint-disable arrow-body-style */
import { Recommended } from "components/hocs/recommended/Recommended";
import { Typography } from "@ecommerce-ozon/design_system";
import React from "react";

export const RecommendedSection = () => {
  return (
    <section
      className="display_flex_col  bg_neutral_100 m_y_xl"
      style={{ border: "1px solid #EAEAEA" }}
    >
      <div className="dso_container">
        <Typography
          scale="heading4"
          weight="600"
          className="text_center p_t_xxl p_x_md"
        >
          Motos Seminuevas, en{" "}
          <span className="text_primary_300">excelente estado</span> y con los{" "}
          <span className="text_primary_300">mejores precios.</span>
        </Typography>
        <Recommended />
      </div>
    </section>
  );
};
