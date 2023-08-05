import React, { FC, useState } from "react";
// eslint-disable-next-line import/extensions,import/no-unresolved

import "./CityModalOption.scss";
import {Typography} from "@ecommerce-ozon/design_system";
import { Cities } from "../../store/reducers/cityReducer";

interface Props {
  logo: string;
  cityName: string;
  cityCode: string;
  value: Cities;
  ml?: number;
  // eslint-disable-next-line no-unused-vars
  onClick?: (city: Cities) => void;
}

const CityModalOption: FC<Props> = ({ cityCode, cityName, value, logo, onClick, ml = 132 }) => {
  const [imgLeft, setImgLeft] = useState<number>();

  const onImgLoad = (event : any) => {
    const { offsetWidth } = event.target;
    setImgLeft(153 - (offsetWidth));
  };

  return <div onClick={() => onClick ? onClick(value) : null}
              className="city-modal-option flex_1_desktop dso_card  display_flex">
    <img onLoad={onImgLoad} style={{ left: imgLeft }} alt="city logo" src={logo} />
    <div className="display_flex flex_col flex_justify_center" style={{position:"absolute", left:10, top:"30%" }}>
      <Typography scale="heading4" weight="600" style={{}}>
        {cityName}
      </Typography>
      <Typography scale="large" weight="400"  >
        {cityCode}
      </Typography>
    </div>
  </div>;
};

export default CityModalOption;
