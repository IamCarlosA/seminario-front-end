import React, { FC, useEffect, useState } from "react";

import { ReactComponent as Moto } from "@ecommerce-ozon/design_system/dist/public/static/icons/motorcycle.svg";
import { Typography } from "@ecommerce-ozon/design_system";
import { TImages, TVehicle } from "models/vehicle.interface";
import { formatPrice } from "helpers/formatPrice";
import { prices } from "helpers/prices";
import { RootState } from "store";
import { useSelector } from "react-redux";
import {
  IweeksOptions,
  weeksOptions,
} from "views/DetailsView/AdvancedSection/AdvancedView";
import Gallery from "views/DetailsView/Gallery/Gallery";

interface Props {
  vehicle: TVehicle;
}

const AlertMessageWithvehicle: FC<Props> = ({ vehicle }) => {
  const { selectedCreditTime } = useSelector(
    (state: RootState) => state.creditVerificationReducer
  );
  const [photos, setPhotos] = useState<TImages[] | undefined>([]);
  useEffect(() => {
    if (vehicle) {
      setPhotos(vehicle.images);
    }
  }, [vehicle]);

  return (
    <div className="p_t_md">
      <div
        className="dso_card_small"
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "white",
        }}
      >
        <div
          className="display_flex"
          style={{
            flexDirection: "column",
            padding: "10px 10px",
          }}
        >
          <Typography weight="600" scale="small">
            Te marcaremos para validar tus datos para que te lleves tu:{" "}
          </Typography>
          <div
            style={{
              display: "flex",
              alignItems: "start",
            }}
          >
            <Moto
              style={{ transform: "scale(1.5)" }}
              className="text_primary_300 m_r_md  m_t_md m_l_md"
            />
            <Typography weight="600" scale="large" className="m_t_sm">
              {vehicle?.brand.name} {vehicle?.model.name}{" "}
              {vehicle?.cylindersCapacity.value}{" "}
            </Typography>
          </div>
        </div>
        <div style={{ borderLeft: "1px solid #F4F5F6", margin: "10px 0" }} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "start",
            padding: "10px 40px",
          }}
        >
          <Typography
            weight="600"
            scale="heading3"
            className="text_primary_300 text_center"
          >
            $
            {formatPrice(
              prices(vehicle?.getWeeklyPrice(selectedCreditTime)),
              "MX"
            )}
          </Typography>
          {vehicle?.hasDiscount() && (
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
                    vehicle?.getWeeklyPriceWithoutDiscount(selectedCreditTime)
                  ),
                  "MX"
                )}
              </Typography>
            </div>
          )}
          {/*<Typography weight="600" scale="large" className="text_primary_300">*/}
          {/*  $850<span style={{fontSize:10}}>mxn</span>*/}
          {/*</Typography>*/}
          <Typography weight="400" scale="small" className="text_primary_300">
            semanales
          </Typography>
          <div
            style={{ padding: "2px 10px", fontSize: 10, borderRadius: 6 }}
            className=" bg_neutral_800 text_neutral_0 text_center"
          >{`X ${
            weeksOptions[
              selectedCreditTime?.toString() as unknown as keyof IweeksOptions
            ]
          }`}</div>
        </div>
      </div>
      <div
        style={{ backgroundColor: "white" }}
        className="dso_card w_100_per h_70_per_desktop p_lg_desktop p_xl_mobile m_t_xxl"
      >
        {photos && photos.length > 0 && (
          <Gallery photos={photos} card={false} spacing={false} />
        )}
      </div>
    </div>
  );
};

export default AlertMessageWithvehicle;
