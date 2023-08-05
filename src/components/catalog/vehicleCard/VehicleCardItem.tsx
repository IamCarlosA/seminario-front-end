import React, { FC } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Typography,
  ChipPercentage,
} from "@ecommerce-ozon/design_system";
import { ReactComponent as Date } from "@ecommerce-ozon/design_system/dist/public/static/icons/date.svg";
import { ReactComponent as GPS } from "@ecommerce-ozon/design_system/dist/public/static/icons/gps.svg";
import { ReactComponent as Checkmark } from "@ecommerce-ozon/design_system/dist/public/static/icons/checkmark.svg";
import { ReactComponent as Close } from "@ecommerce-ozon/design_system/dist/public/static/icons/close-lg.svg";
import { ReactComponent as Motorcycle } from "@ecommerce-ozon/design_system/dist/public/static/icons/motorcycle.svg";
import { ReactComponent as PriceTag } from "@ecommerce-ozon/design_system/dist/public/static/icons/price-tag-rotate.svg";
import { ReactComponent as Speedometer } from "@ecommerce-ozon/design_system/dist/public/static/icons/speedometer.svg";
import { TVehicle } from "../../../models/vehicle.interface";
import { RootState } from "../../../store";
import { InfoBoxItem } from "../vehicleListItem/VehicleListItem";
import { formatPrice } from "../../../helpers/formatPrice";
import { prices } from "../../../helpers/prices";
import "./VehicleCardItem.scss";

interface Props {
  vehicle: TVehicle;
  // eslint-disable-next-line no-unused-vars
  onClick?: (vehicle: TVehicle) => void;
}

const VehicleCardItem: FC<Props> = ({ vehicle, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(vehicle);
    }
  };

  const { country } = useSelector((state: RootState) => state.countryReducer);
  const isAvailable = vehicle.status === "available";

  return (
    <div>
      <div
        onClick={handleClick}
        className="vehicle-card-item-container dso_card display_flex p_md flex_col pos_relative"
      >
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
        <div className="display_flex flex_col">
          <Typography
            scale="heading3"
            weight="600"
            className="text_neutral_800 m_t_sm"
          >
            {vehicle.brand?.name} {vehicle.model?.name}{" "}
          </Typography>
          <div className="display_flex m_t_sm">
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
          <div
            className="display_flex m_y_xl"
            style={{ gap: 20, flexWrap: "wrap" }}
          >
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
          className="display_flex p_t_xl flex_col_mobile flex_align_center_mobile"
          style={{ borderTop: "1px solid #DEDEDE" }}
        >
          <div className="display_flex flex_col flex_align_center_mobile">
            <Typography
              scale="heading3"
              weight="600"
              className="text_primary_300"
            >
              ${formatPrice(prices(vehicle.getWeeklyPrice()), country)}
            </Typography>
            {vehicle.hasDiscount() && (
              <div className="display_flex flex_gap_xs w_100_per">
                <Typography
                  scale="medium"
                  weight="600"
                  className="text_red_300"
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
            <Typography scale="medium" weight="400" className="text_neutral_600">
              Cuota semanal
            </Typography>
          </div>
          <div className="display_flex flex_1 flex_justify_end flex_align_center">
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
      </div>


    </div>

  );
};

export default VehicleCardItem;
