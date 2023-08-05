/* eslint-disable no-unused-vars */
import React from "react";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import ReactGA from "react-ga4";

import {RootState} from "store/index";

// components
import "./footer.scss";
// imgs
import {ReactComponent as FA} from "@ecommerce-ozon/design_system/dist/public/static/icons/facebook.svg";
import {ReactComponent as INS} from "@ecommerce-ozon/design_system/dist/public/static/icons/instagram.svg";
import {ReactComponent as TW} from "@ecommerce-ozon/design_system/dist/public/static/icons/twitter.svg";
import ozon from "static/logos/ozon.svg";

import {ReactComponent as WA} from "@ecommerce-ozon/design_system/dist/public/static/icons/whatsapp.svg";
import {ReactComponent as EMAIL} from "@ecommerce-ozon/design_system/dist/public/static/icons/email.svg";

import {SOCIAL_MEDIA} from "models/constants/media.constants";
import {Typography} from "@ecommerce-ozon/design_system";
import {ReactComponent as TIKTOK} from "./tiktok.svg";
import {changeRootCity} from "../../../store/actions/city";
import {Cities} from "../../../store/reducers/cityReducer";

// import ssl from "../../../static/images/footer/webSecurity.png";

export const Footer = () => {
  const { country } = useSelector((state: RootState) => state.countryReducer);
  const history = useHistory();

  const handleEventOzocio = () => {
    ReactGA.event("CTA_ozocio_footer", {
      category: "Ozocio",
      label: "click ozocio from footer",
    });
    history.push("/vende-tu-moto");
  };

  const handleNet = (social: string) => {
    switch (social) {
      case "facebook":
        window.open(SOCIAL_MEDIA.MX.facebook, "_blank");
        break;
      case "twitter":
        window.open(SOCIAL_MEDIA.MX.twitter, "_blank");
        break;
      case "instagram":
        window.open(SOCIAL_MEDIA.MX.instagram, "_blank");
        break;
        case "tiktok":
        window.open(SOCIAL_MEDIA.MX.tiktok, "_blank");
        break;

      default:
        break;
    }
  };

  const handleLink = (type: string) => {
    const whatsappLink =
      "https://api.whatsapp.com/send?phone=525515730670&text=Hola%20me%20interesa%20saber%20sobre%20Ozon%20";
    if (type !== "mail") {
      window.open(whatsappLink, "_blank");
    }
  };

  const dispatch = useDispatch();

  return (
    <footer className=" bg_neutral_900">
      <div className="dso_container p_xl">
        <div className="display_flex flex_row_desktop flex_col_mobile">
          <div className="m_x_md p_x_md_desktop m_y_xs_mobile p_y_xs_mobile">
            <Typography
              scale="medium"
              weight="600"
              className="text_neutral_600 m_b_md"
            >
              Canales de soporte
            </Typography>
            <Typography
              scale="xsmall"
              weight="400"
              className="cursor_pointer display_flex flex_row flex_align_center text_neutral_0"
              style={{ wordWrap: "break-word" }}
              // onClick={ () => handleLink('mail') }
              onClick={() => {
                window.location.href = "mailto:soportemx@ozon.mobi";
              }}
            >
              <div className="display_flex flex_center p_y_xs p_r_xs">
                <EMAIL className="dim_lg text_neutral_0" />
              </div>
              <div>soportemx@ozon.mobi</div>
            </Typography>
            <Typography
              scale="xsmall"
              weight="600"
              className="cursor_pointer display_flex flex_row flex_align_center text_neutral_0"
              onClick={() => handleLink("wsp")}
            >
              <div className="display_flex flex_center p_y_xs p_r_xs">
                <WA className="dim_lg text_green_300" />
              </div>
              <div>+52 5515730670</div>
            </Typography>
          </div>
          <div className="m_x_md fcards p_x_xxl_desktop m_y_xs_mobile p_y_xs_mobile">
            <Typography
              scale="medium"
              weight="600"
              className="text_neutral_600 m_b_lg"
            >
              Ozoner
            </Typography>
            <Typography
              scale="xsmall"
              weight="600"
              className="cursor_pointer text_neutral_0 m_b_lg"
              onClick={handleEventOzocio}
            >
              Convertirme en Ozocio
            </Typography>
            <Typography
              scale="xsmall"
              weight="600"
              className="cursor_pointer text_neutral_0 "
              onClick={() => history.push("/catalogo")}
            >
              Catálogo
            </Typography>
          </div>

          <div className="m_x_md p_x_md_desktop m_y_xs_mobile p_y_xs_mobile">
            <Typography
              scale="medium"
              weight="600"
              className="text_neutral_600 m_b_md"
            >
              Cambiar Ciudad
            </Typography>
            <Typography
              scale="xsmall"
              weight="400"
              className="cursor_pointer display_flex flex_row flex_align_center text_neutral_0"
              style={{ wordWrap: "break-word" }}
              // onClick={ () => handleLink('mail') }
              onClick={() => {
                dispatch(changeRootCity(Cities.CDMX));
                localStorage.setItem("city", Cities.CDMX);
              }}
            >
              <div style={{paddingRight:"200px"}} >CDMX</div>
            </Typography>
            <br/>
            <Typography
              scale="xsmall"
              weight="400"
              className="cursor_pointer display_flex flex_row flex_align_center text_neutral_0"
              style={{ wordWrap: "break-word" }}
              // onClick={ () => handleLink('mail') }
              onClick={() => {
                dispatch(changeRootCity(Cities.GUADALAJARA));
                localStorage.setItem("city", Cities.GUADALAJARA);
              }}
            >
              <div>Guadalajara</div>
            </Typography>

          </div>
          <div className="display_flex flex_justify_end w_60_per display_none_mobile">
            <img src={ozon} alt="ozon" className="w_200_px" />
          </div>
        </div>
      </div>
      <div className="bg_neutral_1000 w_100_per p_y_md">
        <div className="dso_container display_flex flex_row_desktop flex_justify_between_desktop flex_col_mobile m_y_md_mobile">
          <div className="display_flex flex_center_mobile">
            <Typography
              scale="xsmall"
              weight="600"
              className="cursor_pointer text_neutral_0 p_x_md_desktop p_x_lg_mobile display_flex flex_center"
              onClick={() => history.push("/terminos-y-condiciones")}
            >
              Términos y Condiciones
            </Typography>
            <Typography
              scale="xsmall"
              weight="600"
              style={{ borderLeft: "1px solid #424242" }}
              className="cursor_pointer text_neutral_0 p_x_md_desktop p_x_lg_mobile display_flex flex_center"
              onClick={() => history.push("/privacy")}
            >
              Aviso de Privacidad
            </Typography>
          </div>
          <div className="display_flex flex_center m_y_md_mobile">
            <Typography
              scale="xsmall"
              weight="600"
              // className="bg_neutral_1000 p_y_xl text_center"
              className="text_neutral_600"
            >
              OZON® Todos los derechos reservados. {new Date().getFullYear()}
            </Typography>
          </div>
          <div className="display_flex flex_align_center_mobile flex_justify_between_mobile m_y_md_mobile">
            <div className="display_flex flex_row">
              <div
                className="flex_center br_md  dim_xl m_x_md cursor_pointer "
                onClick={() => handleNet("facebook")}
              >
                <FA className="dim_lg_mobile text_neutral_0" />
              </div>
              <div
                className="flex_center br_md  dim_xl m_x_md cursor_pointer "
                onClick={() => handleNet("twitter")}
              >
                <TW className="dim_lg_mobile text_neutral_0" />
              </div>
              <div
                className="flex_center br_md dim_xl m_x_md cursor_pointer"
                onClick={() => handleNet("instagram")}
              >
                <INS className="dim_lg_mobile text_neutral_0" />
              </div>
              <div
                className="flex_center br_md dim_xl m_x_md cursor_pointer"
                onClick={() => handleNet("tiktok")}
              >
                <TIKTOK className="dim_lg_mobile dim_20_px_desktop text_neutral_0" />
              </div>
            </div>
            <div className="display_none_desktop">
              <img src={ozon} alt="ozon" className="w_100_px" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
