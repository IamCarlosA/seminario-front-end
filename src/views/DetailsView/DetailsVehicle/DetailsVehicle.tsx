/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import ozon from "components/hocs/bannerMX/oneThousandSecction/mitadOzon.svg";
import { useHistory } from "react-router-dom";
import {ChipPercentage, Typography} from "@ecommerce-ozon/design_system";

import {
  TVehicle,
} from "models/vehicle.interface";

import "./DetailsVehicle.scss";

import DetailsComponent from "views/DetailsView/DetailsVehicle/DetailsComponent";
import PlanCarousel from "./PlanCarousel";

interface Props {
  vehicle: TVehicle;
  handleModal: Function;
}

const DetailsVehicle: FC<Props> = ({ vehicle, handleModal }) => {
  const history = useHistory();

  const scrollTop = () => {
    window.focus();
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    scrollTop();
  }, []);


  return (
    <div className="w_100_per display_flex flex_col h_100_per_desktop p_r_xs_desktop flex_justify_start_desktop">
      <div className="dso_card bg_neutral_0 w_100_per p_x_xxl_desktop p_y_xl_desktop p_xs_mobile display_flex flex_col pos_relative">
        {vehicle.hasDiscount() && (
          <ChipPercentage
            total={vehicle.getWeeklyPriceWithoutDiscount(52)}
            value={vehicle.getWeeklyPrice(52)}
            className="pos_absolute"
            style={{ top: "0", right: "0", zIndex: 100 }}
          />
        )}
        {/* <img
          src={ozon}
          alt="ozon"
          className="pos_absolute display_none_mobile h_60_per"
          style={{ right: "0", top: "20%", zIndex: 1 }}
        /> */}
        <div
          className="w_100_per display_flex flex_center"
          style={{
            borderBottom: "1px solid #D1D1D1",
          }}
        >
          <Typography weight="600" scale="heading3">
            {`${vehicle.brand.name} ${vehicle.model.name}`}
          </Typography>
        </div>
        <div className="w_100_per p_y_xl">
          <PlanCarousel vehicle={vehicle} handleModal={handleModal}/>
        </div>
      </div>
      <div className="dso_card bg_neutral_0 h_100_per m_t_md_desktop p_xs display_flex flex_col_mobile">

         <DetailsComponent vehicle={vehicle} />
      </div>
    </div>
  );
};

export default DetailsVehicle;
