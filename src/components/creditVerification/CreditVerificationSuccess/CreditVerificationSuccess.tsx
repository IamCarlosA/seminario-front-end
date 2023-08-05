/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-curly-brace-presence */
import React, { FC, useCallback, useEffect, useState } from "react";
import "./CreditVerificationSuccess.scss";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useUserVerificationDetails from "hooks/useUserVerificationDetails";
import { ReactComponent as Whatsapp } from "@ecommerce-ozon/design_system/dist/public/static/icons/whatsapp.svg";
import { ReactComponent as Right } from "@ecommerce-ozon/design_system/dist/public/static/icons/Rigth.svg";
import { ReactComponent as Boy } from "@ecommerce-ozon/design_system/dist/public/static/icons/boy.svg";
import { ReactComponent as INE } from "@ecommerce-ozon/design_system/dist/public/static/icons/user-card-2.svg";
import { ReactComponent as Invoice } from "@ecommerce-ozon/design_system/dist/public/static/icons/invoice.svg";
import { ReactComponent as Trophy } from "@ecommerce-ozon/design_system/dist/public/static/icons/trophy.svg";
import { ReactComponent as Home } from "@ecommerce-ozon/design_system/dist/public/static/icons/home-2.svg";
import Gallery from "views/DetailsView/Gallery/Gallery";
import { formatPrice } from "helpers/formatPrice";
import { IweeksOptions } from "views/DetailsView/AdvancedSection/AdvancedView";
import { registerSalesforceLeads } from "helpers/salesforce";
import { ReactComponent as Moto } from "@ecommerce-ozon/design_system/dist/public/static/icons/motorcycle.svg";
import { Typography, Button } from "@ecommerce-ozon/design_system";
import globosD from "./globos_desktop.png";
import confettiD from "./confetti_desktop.png";
import globoNM from "./globo_naranja_mobile.png";
import globoBM from "./globo_negro_mobile.png";
import confettiM from "./confetti_mobile.png";
import CreditVerificationResultCard from "../CreditVerificationResultCard/CreditVerificationResultCard";
import { TVehicle } from "../../../models/vehicle.interface";
import { getPriceFinan, prices } from "../../../helpers/prices";
import { RootState, store } from "../../../store";
import fetchZendesk from "../../../helpers/fetchZendesk";
import useTrackPixelOnMount from "../../../hooks/FacebookPixel/useTrackPixelOnMount";
import { useCreditVerificationSelectedCreditTime } from "../../../hooks/useCreditVerificationSelectedVehicle";
import {
  WeekOptionsKeys,
  weeksOptions,
} from "../../hocs/cardDetails/CardAvailable";

interface Props {
  vehicle: TVehicle;
  user?: {
    name: string;
    firstLastName: string;
    secondLastName: string;
    email: string;
    phone: string;
    curp: string;
  };
}

export interface IbenefitsSection {
  icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  tittle: string;
  subtittle?: string;
}

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

const CreditVerificationSuccess: FC<Props> = ({ vehicle, user }) => {
  const { country } = useSelector((state: RootState) => state.countryReducer);
  const [loading, setLoading] = React.useState(false);
  const userSelected = store.getState().userReducer.user;
  const history = useHistory();
  const selectedCreditTime = useCreditVerificationSelectedCreditTime();
  useTrackPixelOnMount("CompleteRegistration");
  const [data, setData] = useUserVerificationDetails();
  const isDelivery = data.digitalPlatforms.workInDigitalPlatforms;

  const onContinueProcess = async () => {
    try {
      setLoading(true);
      // await fetchZendesk({
      //   name: userName,
      //   email,
      //   phone,
      //   vehicleId: vehicle.internalId,
      //   creditTime: selectedCreditTime
      // });
      setLoading(false);
      if (isDelivery) {
        history.push("/palenca");
      } else {
        history.push("/validateIdentity");
      }
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      registerSalesforceLeads({
        email: user.email,
        name: `${user.name} ${user.firstLastName} ${user.secondLastName}`,
        phone: user.phone,
        description: `Nombre: ${user.name} apellidos: ${user.firstLastName} ${user.secondLastName}, CURP: ${user.curp}, correo: ${user.email}, Telefono: ${user.phone}, Vehículo selecionado: ${vehicle.internalId}`,
      });
    }
  }, [vehicle]);

  return (
    <div className="m_t_xl display_flex w_100_per flex_col_mobile dso_container">
      <div className="w_70_per_desktop w_100_per_mobile p_r_xs_desktop m_b_md_mobile">
        <div className="dso_card w_100_per h_100_per bg_neutral_0">
          <div className="w_100_per h_25_per_desktop bg_neutral_0 br_t_md p_x_xxxl_desktop p_y_xxl_desktop p_x_xs_mobile p_y_xl_mobile">
            <Typography
              scale="heading3"
              weight="600"
              className="text_center textApproved display_flex flex_center"
            >
              <div className="bg_primary_100 display_flex flex_center p_xl_desktop p_xs_mobile br_xs">
                <Trophy className="text_primary_300 dim_50_px_desktop dim_40_px_mobile" />
              </div>

              <div>
                ¡Felicidades {user?.name}, tu solicitud de crédito ha sido{" "}
                <span className="text_primary_300">pre-aprobada</span>!
              </div>
            </Typography>
          </div>
          <div className="w_100_per bg_neutral_200 h_70_per_desktop br_b_md">
            <div className="text_center p_y_xl_mobile p_x_xxl_desktop p_x_xl_mobile">
              <Typography weight="400" scale="large" className="p_t_md">
                Se ha enviado un correo a:{" "}
                <span className="text_primary_300">{userSelected.email}</span>{" "}
                con los detalles de tu solicitud.{" "}
                <span style={{ fontWeight: "bold" }}>
                  Ahora solo falta validar tu identidad,{" "}
                </span>
                te vamos a pedir que subas los siguientes documentos:
              </Typography>
            </div>
            <div className="p_x_xl_mobile p_y_xl w_100_per display_flex flex_justify_center_desktop p_t_lg_desktop">
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
            <div className="bg_neutral_0 br_b_md ">
              <div className="display_flex w_100_per flex_center p_y_xl p_x_md_mobile flex_col_mobile">
                <Typography
                  scale="heading4"
                  weight="600"
                  className="text_center m_y_md_mobile"
                >
                  Continúa tu proceso
                </Typography>
                <Right className="text_primary_300 m_x_md_desktop display_none_mobile" />
                <Button
                  className="w_100_per_mobile w_40_per_desktop"
                  onClick={() => onContinueProcess()}
                >
                  Validar tu identidad
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w_30_per_desktop w_100_per_mobile p_l_xs_desktop">
        <div className="dso_card w_100_per h_100_per bg_neutral_0">
          <div className="w_100_per h_25_per_desktop shadow_hard br_t_md display_flex w_100_per">
            <div className="w_65_per_desktop w_100_per_mobile p_l_md_desktop p_xxl_mobile display_flex flex_center ">
              <div className="w_100_per separador ">
                <Typography
                  weight="600"
                  scale="medium"
                  className="text_neutral_1000 text_center_mobile"
                >
                  Estás a <span className="text_primary_300">un solo paso</span>{" "}
                  de conseguir tú:
                </Typography>
                <div className="display_flex flex_center m_t_md">
                  <Moto className="text_primary_300 m_r_xs" />
                  <Typography
                    weight="600"
                    scale="heading4"
                    className="text_neutral_1000 text_center"
                  >
                    {`${vehicle.brand.name} ${vehicle.model.name} ${vehicle.cylindersCapacity.value}`}
                  </Typography>
                </div>
              </div>
            </div>
            <div className="display_flex flex_col bg_neutral_0 p_x_md br_t_md p_y_md flex_center w_35_per_desktop display_none_mobile">
              <Typography
                weight="600"
                scale="heading3"
                className="text_primary_300 text_center"
              >
                $
                {formatPrice(
                  prices(vehicle.getWeeklyPrice(selectedCreditTime)),
                  country
                )}
              </Typography>
              {vehicle.hasDiscount() && (
                <div className="display_flex flex_center flex_gap_xs">
                  <Typography
                    scale="medium"
                    weight="600"
                    className="text_red_300 text_center"
                    style={{ textDecoration: "line-through" }}
                  >
                    $
                    {formatPrice(
                      prices(
                        vehicle.getWeeklyPriceWithoutDescount(
                          selectedCreditTime
                        )
                      ),
                      country
                    )}
                  </Typography>
                </div>
              )}
              <Typography
                weight="600"
                scale="medium"
                className="text_neutral_1000 text_center "
              >
                semanales
              </Typography>
              <div className="dso_chip_small bg_neutral_800 text_neutral_0 text_center">{`X ${
                weeksOptions[
                  selectedCreditTime.toString() as unknown as keyof IweeksOptions
                ]
              }`}</div>
            </div>
          </div>
          <div className="w_100_per h_70_per_desktop p_lg_desktop p_xl_mobile p_t_xxl_mobile">
            {vehicle.images && (
              <Gallery photos={vehicle.images} card={false} spacing={false} />
            )}
          </div>
          <div className="display_flex flex_col bg_neutral_0 p_x_md br_t_md p_y_xl flex_center w_100_per_mobile display_none_desktop">
            <Typography
              weight="600"
              scale="heading3"
              className="text_primary_300 text_center"
            >
              $
              {formatPrice(
                prices(vehicle.getWeeklyPrice(selectedCreditTime)),
                country
              )}
            </Typography>
            {vehicle.hasDiscount() && (
              <div className="display_flex flex_center flex_gap_xs">
                <Typography
                  scale="medium"
                  weight="600"
                  className="text_red_300 text_center"
                  style={{ textDecoration: "line-through" }}
                >
                  $
                  {formatPrice(
                    prices(
                      vehicle.getWeeklyPriceWithoutDiscount(selectedCreditTime)
                    ),
                    country
                  )}
                </Typography>
              </div>
            )}
            <Typography
              weight="600"
              scale="medium"
              className="text_neutral_1000 text_center "
            >
              semanales
            </Typography>
            <div className="dso_chip_small bg_neutral_800 text_neutral_0 text_center">{`X ${
              weeksOptions[
                selectedCreditTime.toString() as unknown as keyof IweeksOptions
              ]
            }`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditVerificationSuccess;
