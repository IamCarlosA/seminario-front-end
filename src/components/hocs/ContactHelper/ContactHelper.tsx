import React from "react";
import { Typography, Button } from "@ecommerce-ozon/design_system";
import { ReactComponent as WA } from "@ecommerce-ozon/design_system/dist/public/static/icons/whatsapp.svg";

import maskWhite from "./mask-white.svg";
import maskOrange from "./mask-orange.svg";
import person from "./person.svg";

import "./contactHelper.scss";

export const ContactHelper = () => {
  const goWA = () =>
    window.open(
      "https://api.whatsapp.com/send?phone=525636630355&text=Hola%20buen%20día,%20quiero%20continuar%20con%20mi%20proceso%20de%20solicitud%20de%20crédito%20pre-Aprobada...",
      "_blank"
    );
  return <div className="p_t_xl_desktop p_t_xxxl_mobile">
  <div className="w_100_per bg_neutral_0 display_flex display_none_mobile shadow_hard">
        <div className="w_20_per display_flex flex_align_center">
          <img src={maskWhite} alt="maskWhite" />
        </div>
        <div className="w_20_per  p_y_xxxl">
          <Typography weight="600" scale="heading4">
            ¿Prefieres un{" "}
            <span className="text_primary_300">contacto más directo?</span>
          </Typography>
        </div>
        <div className="w_40_per display_flex flex_align_center">
          <Button
            icon={<WA />}
            variant="outline"
            className="w_70_per"
            scale="large"
            onClick={() => goWA()}
          >
            Comunícate con un agente
          </Button>
        </div>
        <div className="w_20_per bg_primary_200 display_flex flex_align_center pos_relative p_x_xs">
          <img
            src={person}
            alt="person"
            className="pos_absolute display_none_mobile imgHelperDesktop"
          />
          <img src={maskOrange} alt="maskOrange" className="w_100_per"/>
        </div>
      </div>
      {/* Mobile */}
      <div className="w_100_per bg_neutral_0 display_flex display_none_desktop flex_col shadow_hard">
        <div className="w_100_per bg_primary_200 display_flex flex_align_center pos_relative p_y_xl">
          <img
            src={person}
            alt="person"
            style={{ zIndex: 1, bottom: "0", left: "50%" }}
            className="pos_absolute display_none_desktop w_40_per"
          />
          <img src={maskOrange} alt="maskOrange" className="w_60_per" />
        </div>
        <div className="w_100_per display_flex flex_col flex_align_center dso_container p_y_xl">
          <Typography weight="600" scale="heading4" className="p_y_md">
            ¿Prefieres un{" "}
            <span className="text_primary_300">contacto más directo?</span>
          </Typography>
          <Button
            icon={<WA />}
            variant="outline"
            className="w_100_per"
            scale="large"
            onClick={() => goWA()}
          >
            Comunícate con un agente
          </Button>
        </div>
      </div>
  </div>;
};
