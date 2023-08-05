import React, { CSSProperties, FC } from "react";
import {
  Button,
  Typography,
  ChipPercentage,
} from "@ecommerce-ozon/design_system";
import { ReactComponent as Motorcycle } from "@ecommerce-ozon/design_system/dist/public/static/icons/motorcycle.svg";
import { ReactComponent as Date } from "@ecommerce-ozon/design_system/dist/public/static/icons/date.svg";
import { ReactComponent as Speedometer } from "@ecommerce-ozon/design_system/dist/public/static/icons/speedometer.svg";
import { ReactComponent as PriceTag } from "@ecommerce-ozon/design_system/dist/public/static/icons/price-tag-rotate.svg";
import { ReactComponent as Checkmark } from "@ecommerce-ozon/design_system/dist/public/static/icons/checkmark.svg";
import { ReactComponent as Close } from "@ecommerce-ozon/design_system/dist/public/static/icons/close-lg.svg";
import { ReactComponent as GPS } from "@ecommerce-ozon/design_system/dist/public/static/icons/gps.svg";
import { useSelector } from "react-redux";
import { TVehicle } from "../../../models/vehicle.interface";
import "./VehicleListItem.scss";
import { formatPrice } from "../../../helpers/formatPrice";
import { prices } from "../../../helpers/prices";
import { RootState } from "../../../store";

interface Props {
  vehicle: TVehicle;
  // eslint-disable-next-line no-unused-vars
  onClick?: (vehicle: TVehicle) => void;
}

export const InfoBoxItem = ({
  icon,
  label,
  style,
  className,
}: {
  icon: React.ReactElement<any, any>;
  label: string;
  style?: CSSProperties;
  className?: string;
}) => (
  <div
    style={{ whiteSpace: "nowrap", ...style }}
    className={`bg_neutral_400 dso_chip_rounded display_flex flex_justify_center flex_align_center p_xs ${
      className || ""
    }`}
  >
    <div className="m_r_xs display_flex flex_align_center">{icon}</div>
    <Typography scale="xsmall" scaleMobile="xxsmall" weight="600">
      <b>{label}</b>
    </Typography>
  </div>
);

const VehicleListItem: FC<Props> = ({ vehicle, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(vehicle);
    }
  };

  const { country } = useSelector((state: RootState) => state.countryReducer);
  const isAvailable = vehicle.status === "available";

  return (
    <div className="vehicle-list-item-container dso_card p_md pos_relative">
      {vehicle.hasDiscount() && (
        <ChipPercentage
          total={vehicle.getWeeklyPriceWithoutDiscount(52)}
          value={vehicle.getWeeklyPrice(52)}
          className="pos_absolute"
          style={{ top: "0", right: "0", zIndex: 100 }}
        />
      )}
      <div>
        <img alt="vehicle" src={vehicle.images && vehicle.images[0]?.url} />
      </div>
      <div
        className="display_flex flex_col m_l_lg"
        style={{ justifyContent: "space-around" }}
      >
        <div className="display_flex">
          <InfoBoxItem
            icon={<GPS />}
            label={vehicle?.city?.name || ""}
            className="bg_neutral_800 p_x_lg m_r_lg"
          />
          <InfoBoxItem
            icon={isAvailable ? <Checkmark /> : <Close />}
            label={isAvailable ? "Disponible" : "No Disponible"}
            className={`${isAvailable ? "bg_green_300" : "bg_red_300"} p_x_lg`}
          />
        </div>
        <div>
          <Typography
            scale="heading2"
            weight="600"
            className="text_neutral_800"
          >
            {vehicle.brand?.name} {vehicle.model?.name}{" "}
          </Typography>
        </div>
        <div className="display_flex" style={{ gap: 24 }}>
          <InfoBoxItem icon={<Date />} label={vehicle?.details?.year} />
          <InfoBoxItem icon={<PriceTag />} label={vehicle?.brand?.name} />
          <InfoBoxItem
            icon={<Speedometer />}
            label={vehicle?.confirmationKM ? "KM por confirmar" : `${vehicle?.details?.milage} Km`}
          />
          <InfoBoxItem
            icon={<Motorcycle />}
            label={`${vehicle?.cylindersCapacity?.value} CC`}
          />
        </div>
      </div>
      <div
        className="display_flex flex_col flex_align_center flex_justify_center m_x_xxl p_l_xxxl"
        style={{ gap: 16, borderLeft: "1px solid #DEDEDE" }}
      >
        <Typography scale="heading4" weight="600" className="text_neutral_800">
          Cuota semanal
        </Typography>
        <Typography scale="heading2" weight="600" className="text_neutral_800">
          ${formatPrice(prices(vehicle.getWeeklyPrice()), country)}
        </Typography>
        {vehicle.hasDiscount() && (
          <div className="display_flex flex_center flex_gap_xs w_100_per">
            <Typography
              scale="medium"
              weight="600"
              className="text_red_300 text_center"
              style={{ textDecoration: "line-through" }}
            >
              $
              {formatPrice(
                prices(vehicle.getWeeklyPriceWithoutDiscount(52)),
                country
              )}
            </Typography>
          </div>
        )}
        <Button
          variant="principal"
          scale="small"
          icon={<Motorcycle />}
          onClick={handleClick}
        >
          {" "}
          Compra Financiada{" "}
        </Button>
      </div>
    </div>
  );
};

export default VehicleListItem;
