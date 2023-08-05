/* eslint-disable no-unused-vars */
import React, { FC } from "react";
import { ReactComponent as Clock } from "@ecommerce-ozon/design_system/dist/public/static/icons/time-sand.svg";
import { ReactComponent as PresentToAll } from "@ecommerce-ozon/design_system/dist/public/static/icons/present-to-all.svg";
import { ReactComponent as Eye } from "@ecommerce-ozon/design_system/dist/public/static/icons/eye.svg";
import { ReactComponent as Checkmark } from "@ecommerce-ozon/design_system/dist/public/static/icons/checkmark.svg";
import { useHistory } from "react-router-dom";
import { Typography, Button } from "@ecommerce-ozon/design_system";
import Gallery from "views/DetailsView/Gallery/Gallery";
import { formatPrice } from "helpers/formatPrice";
import { prices } from "helpers/prices";
import { ReactComponent as Moto } from "@ecommerce-ozon/design_system/dist/public/static/icons/motorcycle.svg";
import { useSelector } from "react-redux";
import { RootState, store } from "store";
import {
  useCreditVerificationSelectedCreditTime,
  useCreditVerificationSelectedVehicle,
} from "hooks/useCreditVerificationSelectedVehicle";
import { IweeksOptions } from "views/DetailsView/AdvancedSection/AdvancedView";
import { weeksOptions } from "../../components/hocs/cardDetails/CardAvailable";

import porcent from "./porcent.svg";

interface Props {}

const StepOptions = [
  { icon: PresentToAll, title: "Enviada", active: true },
  { icon: Eye, title: "Revisada", active: false },
  { icon: Checkmark, title: "Enviada", active: false },
];

const ValidateIdentityCompleted: FC<Props> = () => {
  const { country } = useSelector((state: RootState) => state.countryReducer);
  const { user } = store.getState().userReducer;
  const selectedCreditTime = useCreditVerificationSelectedCreditTime();
  const vehicle = useCreditVerificationSelectedVehicle();
  const history = useHistory();
  return (
    <div className="m_y_xl display_flex w_100_per flex_col_mobile">
      <div
        className={`${
          vehicle ? "w_70_per_desktop" : "w_100_per_desktop"
        } w_100_per_mobile p_r_xs_desktop m_b_md_mobile`}
      >
        <div className="dso_card w_100_per h_100_per bg_neutral_0">
          <div className="display_flex flex_col bg_neutral_0  br_xs">
            <div className="p_x_xxl p_t_xxl p_b_xl">
              <Typography
                scale="heading3"
                weight="600"
                className="m_b_lg text_neutral_800 text_center"
              >
                ¡Muy bien {user.name}, vamos a{" "}
                <span className="text_primary_300">
                  validar tu identidad y a revisar la documentación!
                </span>
              </Typography>
              <div
                style={{ borderTop: "1px solid #DEDEDE", width: "100%" }}
                className="m_b_lg"
              />
              <div className="w_100_per display_flex flex_center">
                <Clock
                  width={50}
                  height={63}
                  className="text_primary_300 m_r_xs"
                />
                <Typography
                  scale="heading4"
                  weight="600"
                  className="text_neutral_800"
                >
                  Esto podría tardar de 24 a 48 horas
                </Typography>
              </div>
            </div>
            <div className="p_xxl bg_neutral_200 display_flex flex_center flex_col">
              <div className="display_flex">
                {StepOptions.map(({ active, title, icon: Icon }, index) => (
                  <div className="display_flex flex_align_center">
                    <div className="display_flex flex_col flex_align_center m_t_lg m_x_md">
                      <div
                        className={`${
                          active
                            ? "bg_primary_300 text_neutral_0 border_primary_300"
                            : "bg_neutral_0 text_neutral_800 border_neutral_800"
                        } display_flex flex_justify_center flex_align_center`}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          border: "2px solid",
                        }}
                      >
                        <Icon style={{ stroke: "none" }} />
                      </div>
                      <Typography
                        scale="small"
                        weight="600"
                        className="text_neutral_800 m_t_xs"
                      >
                        {title}
                      </Typography>
                    </div>
                    {index < StepOptions.length - 1 && (
                      <>
                        <span
                          className={`${
                            index === 0 ? "text_primary_300" : ""
                          } display_none_mobile`}
                        >
                          ------
                        </span>
                        <span
                          className={`${
                            index === 0 ? "text_primary_300" : ""
                          } display_none_desktop`}
                        >
                          -
                        </span>
                      </>
                    )}
                  </div>
                ))}
              </div>
              <img
                src={porcent}
                alt="porcent"
                className="w_100_per_mobile m_y_md_mobile"
              />
              <Typography
                weight="400"
                scale="medium"
                className="text_center m_y_md p_x_xxxl"
              >
                Te notificaremos en el momento que se{" "}
                <span style={{ fontWeight: "bold" }}>
                  termine la solicitud para que agendes tu cita
                </span>
              </Typography>
            </div>

            <div className="bg_neutral_0 p_xxl display_flex flex_col_mobile">
              <div className="w_50_per_desktop">
                <Typography
                  scale="large"
                  weight="400"
                  className="text_neutral_800 m_t_lg  "
                >
                  <span className="text_primary_300">Toda la información</span>{" "}
                  y futuras actualizaciones serán enviadas a tu correo
                  electrónico
                </Typography>
              </div>

              <div className="w_50_per_desktop display_flex flex_center">
                <Button
                  variant="principal"
                  scale="small"
                  onClick={() => history.push("/")}
                  className="m_t_lg w_90_per_desktop w_100_per_mobile display_none_desktop"
                >
                  Enterado, regresar al inicio
                </Button>
                <Button
                  variant="principal"
                  scale="large"
                  onClick={() => history.push("/")}
                  className="m_t_lg w_90_per_desktop w_100_per_mobile display_none_mobile"
                >
                  Enterado, regresar al inicio
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {vehicle && (
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
                    Solo validaremos tus datos y ya será toda tuya tú:
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
                          vehicle.getWeeklyPriceWithoutDiscount(
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
                        vehicle.getWeeklyPriceWithoutDiscount(
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
        </div>
      )}
    </div>
  );
};

export default ValidateIdentityCompleted;
