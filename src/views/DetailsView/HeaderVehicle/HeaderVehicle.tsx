/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { Typography } from "@ecommerce-ozon/design_system";
import { statusVehicles, TVehicle } from "../../../models/vehicle.interface";

import "./HeaderVehicle.scss";

interface Props {
  vehicle: TVehicle;
}

export const HeaderVehicle: FC<Props> = ({ vehicle }) => {
  const [isSticky, setIsSticky] = useState(false);

  const prevScroll = useRef(window.pageYOffset);
  const checkSticky = useCallback((e) => {
    const scrollTop = window.scrollY;
    setIsSticky(scrollTop >= 10);

    prevScroll.current = scrollTop;
  }, []);
  // Sticky Menu Area
  useEffect(() => {
    window.addEventListener("scroll", checkSticky);
    return () => {
      window.removeEventListener("scroll", checkSticky);
    };
  });
  return (
    <div className="w_100_per">
      <div
        className={`dso_container_desktop vehicles-view ${
          isSticky ? "sticky" : ""
        }`}
      >
        <div className="dso_card bg_neutral_100">
          <div className="display_flex flex_row_desktop flex_col_mobile flex_align_center flex_justify_between_desktop flex_justify_center_mobile  w_100_per_desktop h_100_per_desktop p_y_md_desktop p_x_lg_desktop">
            <div className="display_flex m_md_mobile">
              <div className="p_r_md_desktop p_r_md_mobile">
                <Typography
                  weight="400"
                  scale="small"
                  className="text_primary_300"
                >
                  {`Ubicación: ${vehicle.hub.name}`}
                </Typography>
                <Typography
                  weight="600"
                  scale="large"
                  className="text_neutral_1000"
                >
                  {`${vehicle.brand.name} ${vehicle.model.name}`}
                </Typography>
              </div>
              <div
                className="p_x_md_desktop p_x_md_mobile"
                style={{
                  borderLeft: "1px solid #D1D1D1",
                  borderRight: "1px solid #D1D1D1",
                }}
              >
                <Typography
                  weight="400"
                  scale="small"
                  className="text_primary_1000"
                >
                  Cilindraje:
                </Typography>
                <Typography
                  weight="600"
                  scale="large"
                  className="text_neutral_1000"
                >
                  {`${vehicle.cylindersCapacity.value} CC`}
                </Typography>
              </div>
              <div className="p_l_md_desktop p_l_md_mobile">
                <Typography
                  weight="400"
                  scale="small"
                  className="text_primary_1000"
                >
                  Identificación:
                </Typography>
                <Typography
                  weight="600"
                  scale="large"
                  className="text_neutral_1000"
                >
                  {`${vehicle.internalId}`}
                </Typography>
              </div>
            </div>

            <div className="w_100_per_mobile">
              <div
                className={`
                      dso_chip_large
                      pos_relative
                      w_100_per_mobile
                      text_neutral_0 
                      display_flex_mobile
                      flex_center_mobile
                      br_none_mobile
                      bg_${
                        statusVehicles[
                          vehicle.status as keyof typeof statusVehicles
                        ]?.color
                      }_nocontrast`}
              >
                {`Moto ${
                  statusVehicles[vehicle.status as keyof typeof statusVehicles]
                    ?.title
                }`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
