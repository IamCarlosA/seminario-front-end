/* eslint-disable arrow-body-style */
import { Button, Typography } from "@ecommerce-ozon/design_system";
import React from "react";
import back from "./back.png";

import "./SectionsStepsOzocio.scss";

interface ILettersSection {
  colorCard: string;
  colorNumber: string;
  number: string;
  subtitle: string;
  description: string;
}

const letters: ILettersSection[] = [
  {
    colorCard: "bg_primary_300",
    colorNumber: "text_primary_400",
    number: "01",
    subtitle: "Cotiza",
    description: "Registra tu moto en línea en pocos pasos.",
  },
  {
    colorCard: "bg_neutral_700",
    colorNumber: "text_neutral_800",
    number: "02",
    subtitle: "Agenda",
    description: "Agenda una inspección del vehículo en nuestros talleres.",
  },
  {
    colorCard: "bg_neutral_700",
    colorNumber: "text_neutral_800",
    number: "03",
    subtitle: "Disfruta",
    description: "Te daremos una oferta final y firmaremos la documentación.",
  },
];

export const SectionStepsOzocio = () => {
  const scrollTop = () => {
    window.focus();
    window.scrollTo(0, 0);
  };
  return (
    <section className="p_y_xxxl w_100_per bg_neutral_900 pos_relative">
      <img src={back} alt="back-ozon" className="z_index_0 pos_absolute display_none_mobile" />
      <div className="dso_container backOzocio z_index_2">
        <Typography
          weight="600"
          scale="heading2"
          className="text_neutral_0 text_center"
        >
          3 sencillos pasos <br /> para vender tu moto en ozon
        </Typography>
        <div className="w_100_per display_flex m_t_xl flex_justify_center_desktop flex_col_mobile">
          {letters.map((item, index) => (
            <div
              key={`${item.subtitle}+${index}`}
              className={`${item.colorCard} dso_card_small w_250_px_desktop w_100_per_mobile flex_col_desktop flex_row_mobile h_215_px_desktop p_xl display_flex flex_center m_md_desktop m_t_xl_mobile`}
            >
              <div
                className={`${item.colorNumber} lettersNumers text_center_desktop `}
              >
                {item.number}
                <Typography
                  weight="600"
                  scale="heading2"
                  className="text_neutral_0 w_100_px_mobile"
                >
                  {item.subtitle}
                </Typography>
              </div>

              <Typography
                weight="600"
                scale="small"
                className="text_neutral_0 text_center_desktop p_l_md_mobile"
              >
                {item.description}
              </Typography>
            </div>
          ))}
        </div>
        <div className="w_100_per display_flex_desktop flex_center_desktop">
          <Button
            variant="principal"
            className="m_y_xl w_100_per_mobile bg_primary_300"
            onClick={scrollTop}
          >
            Comenzar venta de mi moto
          </Button>
        </div>
      </div>
    </section>
  );
};
