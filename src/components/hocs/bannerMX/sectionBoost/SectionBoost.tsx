/* eslint-disable arrow-body-style */
import React from "react";
import porqueComprarDesktop from "static/images/SecctionBoost/porquecomprar_desktop.png";
import porqueComprarMobile from "static/images/SecctionBoost/porquecomprar_mobile.png";
import logoozon from "static/images/SecctionBoost/logoozon.svg";
import { Typography } from "@ecommerce-ozon/design_system";
import { ReactComponent as Horas } from "@ecommerce-ozon/design_system/dist/public/static/icons/24h.svg";
import { ReactComponent as ServiceIcon } from "@ecommerce-ozon/design_system/dist/public/static/icons/customer-service.svg";
import { ReactComponent as Invest } from "@ecommerce-ozon/design_system/dist/public/static/icons/invest.svg";

import "./boost.scss";

export const SectionBoost = () => {
  return (
    <div
      className="w_100_per bg_neutral_100 p_xl"
      style={{ borderTop: "1px solid #EAEAEA" }}
    >
      <div className="dso_container dso_card  w_100_per p_xxl display_flex">
        <div className="w_50_per_desktop p_md display_flex_row">
          <div className="display_flex w_100_per">
            <div
              className="p_r_md display_flex flex_center"
              style={{ borderRight: "1px solid #EAEAEA" }}
            >
              <img src={logoozon} alt="logoozon" />
            </div>
            <div className="p_l_md">
              <Typography
                weight="600"
                scale="heading4"
                className="text_neutral_600"
              >
                ¿Por qué comprar con nosotros?
              </Typography>
            </div>
          </div>
          <div>
            <Typography
              weight="600"
              scale="heading2"
              className="text_neutral_1000 m_t_xxl"
            >
              Date un boost con OZON!
            </Typography>

              <Typography
                weight="400"
                scale="large"
                className="text_neutral_1000"
              >
                Conoce todos los{" "}
                <span
                  className="text_primary_300"
                  style={{ fontWeight: "bold" }}
                >
                  Beneficios OZON
                </span>{" "}
                que cuentas al comprar tu siguiente moto con nosotros:
              </Typography>

            <div className="display_flex flex_center display_none_desktop">
              <img
                src={porqueComprarMobile}
                alt="porqueComprarMobile"
                className="w_100_per_mobile"
              />
            </div>
            <div className="display_flex flex_center w_100_per m_t_xl  flex_col_mobile">
              <div className="display_flex flex_col flex_center m_x_md_desktop p_x_md_desktop m_y_md_mobile p_y_md_mobile">
                <Horas className="text_primary_300 dim_65_px" />
                <Typography
                  weight="600"
                  scale="medium"
                  className="text_neutral_1000 text_center"
                >
                  Fácil y Rápido
                </Typography>
                <Typography
                  weight="400"
                  scale="small"
                  className="text_neutral_800 text_center"
                >
                  En 24 horas.
                </Typography>
              </div>
              <div className="display_flex flex_col flex_center bcards m_x_md_desktop p_x_md_desktop m_y_md_mobile p_y_md_mobile">
                <ServiceIcon className="text_primary_300 dim_65_px" />
                <Typography
                  weight="600"
                  scale="medium"
                  className="text_neutral_1000 text_center"
                >
                  Soporte Personalizado
                </Typography>
                <Typography
                  weight="400"
                  scale="small"
                  className="text_neutral_800 text_center"
                >
                  Comunicación con agentes especializados.
                </Typography>
              </div>
              <div className="display_flex flex_col flex_center m_x_md_desktop p_x_md_desktop m_y_md_mobile p_y_md_mobile w_100_per_mobile">
                <Invest className="text_primary_300 dim_65_px" />
                <Typography
                  weight="600"
                  scale="medium"
                  className="text_neutral_1000 text_center"
                >
                  Compra Financiada
                </Typography>
                <Typography
                  weight="400"
                  scale="small"
                  className="text_neutral_800 text_center"
                >
                  No checamos buró.
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <div className="w_50_per_desktop p_md display_flex flex_center display_none_mobile">
          <img
            src={porqueComprarDesktop}
            alt="porqueComprarDesktop"
            className="w_100_per_desktop"
          />
        </div>
      </div>
    </div>
  );
};
