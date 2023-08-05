/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-curly-brace-presence */
import React, { useEffect, useState } from "react";
import { Typography, Button } from "@ecommerce-ozon/design_system";
import { IbenefitsSection } from "components/creditVerification/CreditVerificationSuccess/CreditVerificationSuccess";
import { useHistory } from "react-router-dom";
import { ReactComponent as Boy } from "@ecommerce-ozon/design_system/dist/public/static/icons/boy.svg";
import { ReactComponent as INE } from "@ecommerce-ozon/design_system/dist/public/static/icons/user-card-2.svg";
import { ReactComponent as MONEY } from "@ecommerce-ozon/design_system/dist/public/static/icons/money.svg";
import { ReactComponent as Invoice } from "@ecommerce-ozon/design_system/dist/public/static/icons/invoice.svg";
import { ReactComponent as Moto } from "@ecommerce-ozon/design_system/dist/public/static/icons/motorcycle.svg";
import { ReactComponent as Home } from "@ecommerce-ozon/design_system/dist/public/static/icons/home-2.svg";
import { ReactComponent as Rigth } from "@ecommerce-ozon/design_system/dist/public/static/icons/Rigth.svg";
import useUserVerificationDetails from "hooks/useUserVerificationDetails";

import { TVehicle } from "models/vehicle.interface";
import OzonCardVehicle from "components/cards/OzonCardVehicle";
import { Grid } from "@mui/material";
import { ContactHelper } from "components/hocs/ContactHelper/ContactHelper";
import Options from "./options.png";

const benefits: IbenefitsSection[] = [
  {
    icon: INE,
    tittle: "INE",
  },
  {
    icon: Invoice,
    tittle: "3 Certificados bancarios",
    subtittle: "3 últimos meses",
  },
  {
    icon: Home,
    tittle: "Comprobante de domicilio",
  },
  {
    icon: Moto,
    tittle: "Licencia de conducir",
  },
  {
    icon: Boy,
    tittle: "Autofoto (Selfie)",
  },
];

interface Props {
  vehicles: TVehicle[];
}

export const SuccessWithoutVehicleSelected: React.FC<Props> = ({
  vehicles,
}) => {
  const [results, setResults] = useUserVerificationDetails();
  const history = useHistory();
  const isDelivery = results.digitalPlatforms.workInDigitalPlatforms;
  const onContinueProcess = async () => {
    try {
      if (isDelivery) {
        history.push("/palenca");
      } else {
        history.push("/validateIdentity");
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="w_100_per m_t_xl">
      <div className="dso_container display_flex flex_col_mobile flex_gap_xl p_y_md">
        <div className="w_30_per_desktop dso_card bg_neutral_0 p_xs display_flex flex_col flex_gap_md pos_relative">
          <div
            className="dso_card_small bg_neutral_0 p_xs pos_absolute display_flex flex_center"
            style={{ top: "-7%", left: "5%" }}
          >
            <MONEY className="text_primary_300" />
          </div>
          <div className="h_50_per w_100_per p_xs display_flex flex_align_center">
            <Typography weight="400" scale="large">
              <span className="text_primary_300">
                En Ozon nos preocupa tu salud financiera{" "}
              </span>
              y al evaluar tus ingresos te pre aprobamos un crédito de:
            </Typography>
          </div>
          <div className="h_50_per w_100_per bg_primary_100 br_b_xs display_flex flex_center p_xl">
            <Typography
              weight="600"
              scale="heading3"
              className="text_primary_300"
            >
              ${Math.ceil(results.creditCalculation.score)} semanales
            </Typography>
          </div>
        </div>
        <div className="w_70_per_desktop">
          <Typography weight="600" scale="large" className="p_r_xxl_desktop">
            Ahora solo falta validar tu identidad, te vamos a pedir que subas
            los siguientes documentos:
          </Typography>
          <div className="p_x_xl_mobile p_t_xl w_100_per display_flex p_t_lg_desktop">
            <div className=" w_100_per_mobile docsContainer display_flex_desktop">
              {benefits.map((item) => (
                <div className="docsItem p_xs">
                  <div className="w_150_px_desktop w_100_per_mobile h_200_px_desktop h_150_px_mobile dso_card bg_neutral_0 display_flex flex_center flex_col">
                    <div className="bg_neutral_0 h_60_per w_100_per display_flex flex_center br_t_md pos_relative">
                      {item.subtittle && (
                        <div
                          className="pos_absolute bg_neutral_1000 text_neutral_0 p_xxs p_x_xs br_b_md"
                          style={{ top: 0 }}
                        >
                          <Typography
                            className="text_center"
                            scale="small"
                            weight="400"
                          >
                            {item.subtittle}
                          </Typography>
                        </div>
                      )}
                      {<item.icon className="dim_50_px text_neutral_600" />}
                    </div>
                    <div className="bg_neutral_200 h_40_per w_100_per display_flex flex_center br_b_md p_md">
                      <Typography
                        className="text_neutral_1000 text_center"
                        scale="medium"
                        weight="600"
                      >
                        {item.tittle}
                      </Typography>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="m_y_xl w_100_per bg_neutral_0 p_xl display_flex flex_center flex_col_mobile shadow_medium">
        <Typography weight="400" scale="large" className="text_center_mobile">
          <span style={{ fontWeight: "bold" }}>Termina tu proceso,</span> escoge
          tu moto después
        </Typography>
        <Rigth className="text_primary_300 m_x_md_desktop display_none_mobile" />
        <Button
          variant="principal"
          className="p_x_xxl_desktop w_100_per_mobile m_y_md"
          onClick={() => onContinueProcess()}
        >
          Valida tu identidad
        </Button>
      </div>
      <div className="dso_container display_flex flex_col_mobile flex_gap_xl p_y_md">
        <div className="w_30_per_desktop dso_card bg_neutral_0 p_xl display_flex flex_col flex_gap_md display_none_mobile">
          <div className="h_50_per w_100_per p_xs display_flex flex_align_center">
            <Typography weight="400" scale="large">
              La moto que escogiste se sale un poco de este presupuesto,{" "}
              <span style={{ fontWeight: "bold" }}>pero no te desanimes,</span>{" "}
              estas también son grandes{" "}
              <span style={{ fontWeight: "bold" }}>opciones</span>{" "}
              <Rigth className="text_primary_300 m_x_md_desktop display_none_mobile" />
            </Typography>
          </div>
          <div className="h_50_per w_100_per  br_b_xs display_flex flex_center display_flex flex_center">
            <img src={Options} alt="options" className="w_100_per" />
          </div>
        </div>
        <div className="w_70_per_desktop w_100_per_mobile">
          <Typography scale="large" weight="600">
            Dales una oportunidad:
          </Typography>
          <Grid
            container
            justifyContent="center"
            rowSpacing={3}
            columnSpacing={2}
          >
            {vehicles.slice(0, 4).map((vehi, index) => (
              <Grid item key={`index_without_${index}`} xs={12} sm={3}>
                {/* <OzonCardVehicle vehicle={vehi} isHelperCard={false} /> */}
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
     {/* <ContactHelper />*/}
    </div>
  );
};
