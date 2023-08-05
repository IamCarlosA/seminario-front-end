/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import _ from "lodash";
import { fetchRecommendedThunk } from "store/actions/recommended";
import { RootState } from "store";
import "./card.scss";
import { Typography, ChipPercentage } from "@ecommerce-ozon/design_system";
import { TVehicle } from "models/vehicle.interface";
import VehicleCardPlaceHolder, {
  VehicleCardPlaceHolderVariant,
} from "../../placeholders/vehicleCardPlaceHolder/VehicleCardPlaceHolder";
import useCurrentCity from "../../../hooks/useCurrentCity";

export const Recommended = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const city = useCurrentCity();

  const {
    data: vehicles,
    loading: recommendedLoading,
    // eslint-disable-next-line no-unused-vars
    error: recommendedError,
  } = useSelector((state: RootState) => state.recommendedReducer);

  useEffect(() => {
    dispatch(fetchRecommendedThunk({ city }));
  }, [city]);

  const handleClick = (id: any) => {
    history.push(`/vehicle/${id}`);
  };
  return (
    <div className="cards-recommended m_t_md  p_x_xxl_mobile">
      {!recommendedLoading ? (
        vehicles?.map((vehicle: TVehicle) => (
          <div key={uuidv4()} className="">
            <div
              className="dso_card_small display_flex_desktop display_flex_col_mobile p_md m_x_md card pos_relative h_250_px_mobile w_150_px_mobile"
              onClick={() => handleClick(vehicle.internalId)}
            >
              <div className="w_50_per_desktop flex_center p_xs">
                <img src={vehicle.images && vehicle.images[0]?.url} alt="" />
              </div>
              <div className="display_flex_col flex_align_center w_50_per_desktop">
                <Typography
                  scale="heading4"
                  weight="600"
                  className="text_neutral_1000 textCard text_center_mobile"
                >
                  {`${vehicle.brand.name} ${vehicle.model.name}`}
                </Typography>
                <Typography
                  scale="xsmall"
                  weight="400"
                  className="text_neutral_1000 text_center_mobile"
                >
                  {`${vehicle.cylindersCapacity.value} CC`}
                </Typography>

                <div className="text_primary_300 text_heading3_600 m_t_xs text_center_mobile">
                  <span style={{ fontSize: "14px" }}>$</span>
                  {`${Math.ceil(vehicle.getWeeklyPrice())}`}
                </div>
                <div className="text_neutral_1000 text_xsmall_400 text_center_mobile">
                  Por semana
                </div>
              </div>
              {vehicle.hasDiscount() && (
                <ChipPercentage
                  className="pos_absolute"
                  style={{ top: "0", right: "0" }}
                  total={vehicle.getWeeklyPriceWithoutDiscount()}
                  value={vehicle.getWeeklyPrice()}
                />
              )}
            </div>
          </div>
        ))
      ) : (
        <>
          {_.range(5).map((_) => (
            <div className="m_x_xs" key={uuidv4()}>
              <VehicleCardPlaceHolder
                variant={VehicleCardPlaceHolderVariant.SMALL}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
};
