import React, { ReactElement } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ReactGA from "react-ga4";
import Chip from "@material-ui/core/Chip";
import { useHistory } from "react-router-dom";

import { useSelector } from "react-redux";
import { TVehicle } from "models/vehicle.interface";
import { RootState } from "store/index";
import { prices } from "helpers/prices";
import { formatPrice } from "helpers/formatPrice";

import { ReactComponent as Speedometer } from "@ecommerce-ozon/design_system/dist/public/static/icons/speedometer.svg";
import { ReactComponent as GPS } from "@ecommerce-ozon/design_system/dist/public/static/icons/gps.svg";
import { ReactComponent as Moto } from "@ecommerce-ozon/design_system/dist/public/static/icons/motorcycle.svg";

import "./CardView.scss";
import { Button, Typography } from "@ecommerce-ozon/design_system";
// import { useDiscount } from "hooks/useDiscount";
// import { vehicles } from "models/constants/vehicles.constants";
type Props = {
  vehicle: TVehicle;
  CustomButton?: ReactElement;
};

function mapKM(km: number) {
  let newKm = `${km}`;
  newKm = `${
    newKm.length > 3 ? `${newKm.substring(0, newKm.length - 3)}.` : ""
  }${newKm.substring(newKm.length - 3)}`;
  return `${newKm} Km`;
}

export const CardViewMX = ({ vehicle, CustomButton }: Props) => {
  const { country } = useSelector((state: RootState) => state.countryReducer);
  const history = useHistory();

  const handleClick = () => {
    if (CustomButton) return;
    ReactGA.event("CTA_catalog_details", {
      category: "Marketplace",
      label: "click on vehicle cards (param vehicle id)",
      vehicleId: vehicle.internalId,
    });
    history.push(`/vehicle/${vehicle.internalId}`);
  };

  return (
    <Card onClick={handleClick} className="card vehicle-card">
      <Chip
        className="chip text_neutral_0"
        size="small"
        label={vehicle.city?.name}
        avatar={<GPS style={{ color: "white" }} />}
      />

      <img
        className="card-img"
        src={vehicle.images && vehicle.images[0]?.url}
        alt=""
      />
      {vehicle.status === "available" && (
        <Chip
          size="small"
          className="chip primary right text_neutral_0"
          label={vehicle?.confirmationKM ? "KM por confirmar" : mapKM(vehicle.details.milage)}
          avatar={<Speedometer style={{ color: "white" }} />}
        />
      )}
      {vehicle.status !== "available" && (
        <Chip
          size="small"
          className="chip danger right text_neutral_0"
          label="No disponible"
        />
      )}

      <CardContent style={{ paddingTop: "1.5rem" }}>
        <Typography
          scale="large"
          weight="600"
          className="m_b_lg text_neutral_800 text_center"
        >
          {vehicle.brand?.name} {vehicle.model?.name}{" "}
          {vehicle.cylindersCapacity?.value}
        </Typography>
        <Typography
          scale="xxsmall"
          weight="600"
          className={`m_b_${
            vehicle.hasDiscount() ? "xs" : "xl"
          } text_neutral_800 text_center`}
        >
          Cuota semanal
        </Typography>
        {vehicle.hasDiscount() && (
          <Typography
            scale="medium"
            weight="600"
            className="text_red_300 text_center"
            style={{ textDecoration: "line-through" }}
          >
            Antes $
            {formatPrice(
              prices(vehicle.getWeeklyPriceWithoutDiscount()),
              country
            )}
          </Typography>
        )}
        <Typography
          scale="heading3"
          weight="600"
          className="m_b_lg text_neutral_800 text_center"
        >
          <div className="flex_center">
            ${formatPrice(prices(vehicle.getWeeklyPrice()), country)}{" "}
          </div>
        </Typography>

        {CustomButton || (
          <Button className="w_100_per" scale="small" icon={<Moto />}>
            Ver Detalles
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
