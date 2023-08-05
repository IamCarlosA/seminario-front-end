/* eslint-disable arrow-body-style */
import React from "react";
import { Typography } from "@ecommerce-ozon/design_system";
import { TVehicle } from "models/vehicle.interface";
import Pay from "static/images/payment/pay.png";

type Props = {
  vehicle: TVehicle;
};

export const Summary = ({ vehicle }: Props) => {
  return (
    <div className="w_100_per h_100_per">
      <Typography
        scale="heading3"
        weight="600"
        className="text_neutral_800 text_center"
      >
        Resumen de pago
      </Typography>
      <Typography
        scale="large"
        weight="400"
        className="text_neutral_600 text_center p_t_xl"
      >
        Al apartar tu vehículo este no se ofrecera por 48 horas en el sitio web
      </Typography>
      <Typography
        scale="heading4"
        weight="600"
        className="text_neutral_800 text_center p_t_lg"
      >
        {`${vehicle.internalId} - ${vehicle.brand.name} ${vehicle.model.name} ${vehicle.cylindersCapacity.value}`}
      </Typography>

      <div className="display_flex flex_center p_t_xxl">
        <div className="dso_card display_flex flex_center w_60_per_desktop w_80_per_mobile">
          <img
            className="w_70_per_desktop w_50_per_mobile"
            alt="vehicle-ozon"
            src={vehicle.images ? vehicle.images[0].url : ""}
          />
        </div>
      </div>
      <div className="display_flex flex_center">
        <div className=" w_60_per_desktop w_80_per_mobile">
          <div className="display_flex flex_justify_between p_t_xxl border_b_dashed p_b_lg">
            <Typography scale="small" weight="600" className="text_neutral_600">
              Apartamiento de vehículo
            </Typography>
            <Typography scale="small" weight="600" className="text_neutral_900">
              $ 150 MXN
            </Typography>
          </div>
        </div>
      </div>
      <div className="display_flex flex_center">
        <div className=" w_60_per_desktop w_80_per_mobile">
          <div className="display_flex flex_justify_between p_t_lg">
            <Typography
              scale="medium"
              weight="600"
              className="text_neutral_900"
            >
              Total a pagar
            </Typography>
            <Typography scale="small" weight="600" className="text_neutral_900">
              $ 150 MXN
            </Typography>
          </div>
        </div>
      </div>
      <div className="display_flex flex_center p_t_xl">
        <div className="display_flex flex_center w_60_per_desktop w_80_per_mobile">
          <img
            className="w_70_per_desktop w_80_per_mobile"
            alt="metodospago-ozon"
            src={Pay}
          />
        </div>
      </div>
    </div>
  );
};
