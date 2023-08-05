import React, { FC } from "react";
import { v4 as uuidv4 } from "uuid";
import { Typography } from "@ecommerce-ozon/design_system";
import { Hub, HubsItem } from "./HubsItem";
import useCurrentCity from "../../hooks/useCurrentCity";
import "./hub.scss";

interface Props {
  hubs: Hub[];
}

export const HubsList: FC<Props> = ({ hubs }) => {
  const city = useCurrentCity();
  return (
    <div className="overflow_auto display_flex flex_nowrap flex_justify_start hub">
      <div className="display_flex_desktop flex_center_desktop">
        <div className="w_350_px_desktop display_none_mobile m_r_xxxl">
          <Typography
            scale="heading3"
            weight="600"
            className="text_neutral_900"
          >
            Prefieres un{" "}
            <span className="text_primary_300">contacto más directo</span>
          </Typography>

            <Typography scale="small" weight="600" className="text_neutral_900">
            Encuéntranos en ciudad de México en los siguientes puntos de
            atención.
            </Typography>


        </div>
      </div>

      {hubs
        .filter((hub) => Boolean(!city) || city === hub.city)
        .map((hub) => (
          <HubsItem key={uuidv4()} hub={hub} />
        ))}
    </div>
  );
};
