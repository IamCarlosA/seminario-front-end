import React from "react";
import { ReactComponent as Moto } from "@ecommerce-ozon/design_system/dist/public/static/icons/motorcycle.svg";
import { Typography, Button } from "@ecommerce-ozon/design_system";
import { ReactComponent as MailIcon } from "@ecommerce-ozon/design_system/dist/public/static/icons/mail.svg";
import { ReactComponent as PhoneIcon } from "@ecommerce-ozon/design_system/dist/public/static/icons/phone.svg";

import Call from "./call_reject.png";

import Mail from "./email_reject.png";

import left from "./left-ozon.png";
import right from "./rigth-ozon.png";

export const RejectedView = () => {
  const handleLink = () => {
    console.log("entro");
    const whatsappLink =
      "https://api.whatsapp.com/send?phone=525515730670&text=Hola%20me%20interesa%20saber%20sobre%20Ozon%20";

    window.open(whatsappLink, "_blank");
  };
  return (
    <>
      <div className="w_100_per dso_container">
        <div className="dso_card bg_neutral_0 p_xs display_flex flex_col_mobile">
          <div className="br_xs bg_red_200 p_xs display_flex flex_center">
            <Moto className="text_red_300 dim_70_px" />
          </div>
          <div className="p_xs display_flex flex_align_center">
            <Typography weight="400" scale="large" scaleMobile="medium">
              <span style={{ fontWeight: "bold" }}>
                En Ozon nos preocupamos por tu salud financiera,
              </span>{" "}
              lastimosamente en este momento no podemos ofrecerte ninguna moto
              que se ajuste al resultado de tu solicitud de crédito.
            </Typography>
          </div>
        </div>
      </div>
      <div className="m_t_xl w_100_per bg_neutral_0 pos_relative display_flex p_xl flex_center flex_col">
        <img src={left} alt="" className="pos_absolute h_60_per_desktop display_none_mobile" style={{left: "0"}}/>
        <img src={right} alt=""  className="pos_absolute h_60_per_desktop display_none_mobile" style={{right: "0"}}/>
        <div className="w_60_per_desktop w_100_per_mobile">
          <Typography
            weight="600"
            scale="heading4"
            className="text_center text_neutral_800"
          >
            Sin embargo, podemos buscar otras soluciones, por favor contáctanos
            para obtener más información.
          </Typography>
        </div>
        <div className="w_50_per_desktop w_100_per_mobile display_flex flex_col_mobile flex_gap_md m_t_xl">
          <div className="dso_card bg_neutral_0 w_50_per_desktop p_md">
            <img src={Mail} alt="mail" className="w_100_per" />
            <Button
              scale="small"
              onClick={() => {
                window.location.href = "mailto:soporte@ozon.mobi";
              }}
              icon={<MailIcon />}
              className="w_100_per m_t_md"
            >
              Envíanos un correo
            </Button>
          </div>
          <div className="dso_card bg_neutral_0 w_50_per_desktop p_md">
            <img src={Call} alt="callme" className="w_100_per" />
            <Button
              scale="small"
              icon={<PhoneIcon />}
              className="w_100_per m_t_md"
              onClick={()=>handleLink()}
            >
              Contáctame con un agente
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
