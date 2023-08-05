/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable no-undef */
/* eslint-disable arrow-body-style */
import { Typography } from "@ecommerce-ozon/design_system";
import React from "react";
import { ReactComponent as Money } from "@ecommerce-ozon/design_system/dist/public/static/icons/money.svg";
import { ReactComponent as Box } from "@ecommerce-ozon/design_system/dist/public/static/icons/box.svg";
import { ReactComponent as InvoicePaper } from "@ecommerce-ozon/design_system/dist/public/static/icons/invoice-paper.svg";
import { ReactComponent as RocketLaunch } from "@ecommerce-ozon/design_system/dist/public/static/icons/rocket-launch.svg";
import left from "./ozon izquierdo.png";
import right from "./ozon derecho.png";

import "./SectionBenefits.scss";

interface IbenefitsSection {
  icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  tittle: string;
  description: string;
}

const benefits: IbenefitsSection[] = [
  {
    icon: Money,
    tittle: "Vendela el mismo dia",
    description: "Facil, seguro y rapido.",
  },
  {
    icon: Box,
    tittle: "En un lugar seguro",
    description: "+ De 2000 motos compradas.",
  },
  {
    icon: InvoicePaper,
    tittle: "Liquidez inmediata",
    description: "Recibe tu pago en cuestion de minutos.",
  },
  {
    icon: RocketLaunch,
    tittle: "Precios justos",
    description: "Sabemos el valor que tiene la moto para ti.",
  },
];

export const SectionsBenefits = () => {
  return (
    <section className="p_y_xxxl w_100_per bg_neutral_0 pos_relative">
      <img src={left} alt="ozon left" className="pos_absolute display_none_mobile h_60_per_desktop" style={{ top: "20%"}}/>
      <img src={right} alt="ozon right" className="pos_absolute display_none_mobile h_60_per_desktop" style={{ top: "20%", right: "0"}}/>
      <div className="dso_container">
        <Typography
          weight="600"
          scale="heading2"
          className="text_neutral_1000 text_center"
        >
          Al vender en OZON, <br/>
          disfrutaras de estos beneficios
        </Typography>
        <Typography
          weight="400"
          scale="small"
          className="text_neutral_700 text_center m_t_md"
        >
          Estamos comprometidos en darte la mejor experiencia <br /> posible al
          iniciar y al finalizar tu venta con OZON
        </Typography>
        <div className="w_100_per m_t_md display_flex flex_justify_center_desktop">
          <div className="bg_neutral_500 dso_card_small p_md w_100_per_mobile benefitsContainer">
            {benefits.map((item) => (
              <div className="benefitsItem p_xs">
                <div className="w_250_px_desktop w_100_per_mobile h_150_px_desktop dso_card_small bg_neutral_0 display_flex flex_center flex_col p_xs">
                  {<item.icon className="dim_50_px"/>}
                  <Typography className="text_neutral_1000 text_center" scale="large" weight="600">
                    {item.tittle}
                  </Typography>
                  <Typography className="text_neutral_1000 text_center display_none_mobile" scale="small" weight="400">
                    {item.description}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
