/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Typography } from "@ecommerce-ozon/design_system";
import { Grid, makeStyles } from "@material-ui/core";
import { TImages, TVehicle } from "models/vehicle.interface";
import SwiperClass from "swiper/types/swiper-class";
import Swipercore, { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { ReactComponent as Warning } from "@ecommerce-ozon/design_system/dist/public/static/icons/warning-circle.svg";
import { ReactComponent as GPS } from "@ecommerce-ozon/design_system/dist/public/static/icons/gps.svg";
// swiper bundle styles
import "swiper/swiper-bundle.min.css";

// swiper core styles
import "swiper/swiper.min.css";

// eslint-disable-next-line import/extensions
import "swiper/css/navigation";

// eslint-disable-next-line import/extensions
import "swiper/css/pagination";

import Logo from "./logo-ozon.png";

type Props = {
  vehicle: TVehicle;
};

export const VehiclePayment = ({ vehicle }: Props) => {
  const [photos, setPhotos] = useState<TImages[]>([]);

  useEffect(() => {
    if (vehicle && vehicle.images) {
      setPhotos(vehicle.images);
    }
  }, [vehicle]);

  return (
    <Grid item xs={12} sm={12} md={8}>
      <div className="h_100_per_desktop display_flex flex_col">
        <div className="display_flex flex_align_center">
          <img src={Logo} alt="Logo-Ozon" className="dim_30_px_desktop dim_20_px_mobile m_r_xxs"/>
          <Typography weight="600" scale="heading2">
            {`${vehicle.brand.name} ${vehicle.model.name} ${vehicle.cylindersCapacity.value}`}
          </Typography>
        </div>

        <div className="display_flex flex_gap_md m_t_xxs">
          <div className="display_flex flex_center_mobile">
            <Typography weight="600" scale="large" scaleMobile="small">
              {`${vehicle.details.year}`}
            </Typography>
          </div>
          <div style={{ borderRight: "1px solid #DEDEDE" }} />
          <div className="display_flex flex_center_mobile">
            <Typography weight="600" scale="large" scaleMobile="small">
              {`${vehicle.cylindersCapacity.value} CC`}
            </Typography>
          </div>
          <div style={{ borderRight: "1px solid #DEDEDE" }} />
          <div className="display_flex flex_center_mobile">
            <Typography weight="600" scale="large" scaleMobile="small">
              {vehicle?.confirmationKM ? "KM por confirmar" : `${vehicle?.details?.milage} Km`}
            </Typography>
          </div>
          <div style={{ borderRight: "1px solid #DEDEDE" }} />
          <div className="display_flex flex_center">
            <GPS className="text_primary_300 m_r_xxs" />
            <Typography weight="600" scale="large" scaleMobile="small">
              {`${vehicle.city?.name}`}
            </Typography>
          </div>
        </div>
        {/* <Typography weight="400" scale="medium" scaleMobile="xsmall">
          {`La ${vehicle.brand.name} ${vehicle.model.name} ${vehicle.cylindersCapacity.value} es una moto de estilo deportivo, con un diseño elegante y aerodinámico.`}
        </Typography> */}
        {photos.length > 0 && (
          <div className="m_t_xs w_100_per h_100_per_desktop h_300_px_mobile dso_card_small bg_neutral_0 p_xl display_flex flex_gap_md">
            <div
              className="w_50_per_desktop w_100_per_mobile h_100_per br_xs pos_relative"
              style={{ overflow: "hidden" }}
            >
              <img
                src={photos[0].url}
                style={{
                  top: "0",
                  left: "0",
                  objectFit: "cover",
                  position: "absolute",
                }}
                className="w_100_per h_100_per br_xs"
                alt=""
              />
            </div>
            <div className="w_50_per_desktop display_none_mobile h_100_per bg_neutral_0 display_flex flex_gap_md flex_col">
              <div className="display_flex w_100_per h_50_per flex_gap_md">
                <div
                  className="w_50_per pos_relative br_xs"
                  style={{ overflow: "hidden" }}
                >
                  <img
                    src={photos[0].url}
                    style={{
                      top: "0",
                      left: "0",
                      objectFit: "cover",
                      position: "absolute",
                    }}
                    className="w_100_per h_100_per br_xs"
                    alt=""
                  />
                </div>
                <div
                  className="w_50_per pos_relative br_xs"
                  style={{ overflow: "hidden" }}
                >
                  {photos[1]?.url !== undefined && (
                    <img
                      src={photos[1].url}
                      style={{
                        top: "0",
                        left: "0",
                        objectFit: "cover",
                        position: "absolute",
                      }}
                      className="w_100_per h_100_per br_xs"
                      alt=""
                    />
                  )}
                </div>
              </div>
              <div className="display_flex w_100_per h_50_per flex_gap_md">
                <div
                  className="w_50_per pos_relative br_xs"
                  style={{ overflow: "hidden" }}
                >
                  {photos[2]?.url !== undefined && (
                    <img
                      src={photos[2].url}
                      style={{
                        top: "0",
                        left: "0",
                        objectFit: "cover",
                        position: "absolute",
                      }}
                      className="w_100_per h_100_per br_xs"
                      alt=""
                    />
                  )}
                </div>
                <div
                  className="w_50_per pos_relative br_xs"
                  style={{ overflow: "hidden" }}
                >
                  {photos[3]?.url !== undefined && (
                    <img
                      src={photos[3].url}
                      style={{
                        top: "0",
                        left: "0",
                        objectFit: "cover",
                        position: "absolute",
                      }}
                      className="w_100_per h_100_per br_xs"
                      alt=""
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Grid>
  );
};
