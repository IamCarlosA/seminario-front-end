import React, { FC } from "react";
import { ReactComponent as GPS } from "@ecommerce-ozon/design_system/dist/public/static/icons/gps.svg";
import { ReactComponent as Checkmark } from "@ecommerce-ozon/design_system/dist/public/static/icons/checkmark.svg";
import { ReactComponent as Close } from "@ecommerce-ozon/design_system/dist/public/static/icons/close-sm.svg";
import { ReactComponent as Calendar } from "@ecommerce-ozon/design_system/dist/public/static/icons/date.svg";
import { ReactComponent as Motorcycle } from "@ecommerce-ozon/design_system/dist/public/static/icons/motorcycle.svg";
import { ReactComponent as Tag } from "@ecommerce-ozon/design_system/dist/public/static/icons/price-tag-rotate.svg";
import { ReactComponent as Speedometer } from "@ecommerce-ozon/design_system/dist/public/static/icons/speedometer.svg";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Typography, Button } from "@ecommerce-ozon/design_system";
import { TVehicle } from "../../models/vehicle.interface";
import { formatPrice } from "../../helpers/formatPrice";
import { prices } from "../../helpers/prices";
import { RootState } from "../../store";


interface Props {
  vehicle: TVehicle;
}

const InfoBoxItem = ({ icon, label }: { icon: React.ReactElement<any, any>, label: string }) => <div
  style={{ whiteSpace: "nowrap" }}
  className="bg_neutral_400 display_flex flex_justify_center flex_align_center p_xs">
  <div className="m_r_xs display_flex flex_align_center">
    {icon}
  </div>
  <Typography scale="medium" scaleMobile="xxsmall" weight="600" textColor="neutral_800">
    <b>
      {label}
    </b>
  </Typography>
</div>;

const PreCatalogCarouselItem: FC<Props> = ({ vehicle }) => {
  const { country } = useSelector((state: RootState) => state.countryReducer);
  const history = useHistory();
  return <div style={{ whiteSpace: "nowrap" }} className="dso_card display_flex flex_col p_md m_y_md">
    <img alt="vehicle" className="" style={{ width: "auto", height: 169, objectFit: "cover" }}
         src={vehicle.images && vehicle.images[0]?.url} />
    <Typography className="m_y_md text_center" scale="heading3" weight="600" textColor="neutral_1000">
      {vehicle.brand?.name} {vehicle.model?.name}{" "}
      {vehicle.cylindersCapacity?.value}
    </Typography>
    <div className="display_flex flex_col_mobile flex_align_center_mobile flex_justify_center m_b_md">
      <div className="display_flex m_r_md">
        <GPS />
        <Typography scale="medium" weight="600" textColor="neutral_1000">
          {vehicle.city?.name === "Ciudad de México" ? "CDMX" : vehicle.city?.name}
        </Typography>
      </div>
      <div>
        {
          vehicle.status === "available" ? <div className="display_flex">
            <Checkmark className="text_green_300" />
            <Typography scale="medium" weight="600" textColor="green_300">
              DISPONIBLE
            </Typography>
          </div> : <div className="display_flex">
            <Close className="text_red_300" />
            <Typography scale="medium" weight="600" textColor="red_300">
              NO DISPONIBLE
            </Typography>
          </div>
        }
      </div>
    </div>
    <div className="p_y_md m_b_md" style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "8px",
      borderTop: "1px solid #DEDEDE",
      borderBottom: "1px solid #DEDEDE"
    }}>
      <InfoBoxItem icon={<Calendar />} label={vehicle?.details?.year} />
      <InfoBoxItem icon={<Motorcycle />} label={`${vehicle?.cylindersCapacity?.value} CC`} />
      <InfoBoxItem icon={<Tag />} label={`${vehicle.brand?.name}`} />
      <InfoBoxItem icon={<Speedometer />} label={vehicle?.confirmationKM ? "KM por confirmar" : `${vehicle?.details?.milage} Km`} />
    </div>
    <Typography className="text_center" scale="heading3" weight="600" textColor="primary_300">
      ${formatPrice(prices(vehicle.getWeeklyPrice()), country)}{" "}
    </Typography>
    <Typography className="text_center" scale="large" weight="400" textColor="neutral_800">
      Cuota Semanal
    </Typography>
    <Button onClick={() => {
      history.push(`/vehicle/${vehicle.internalId}`);
    }
    } className="m_t_md w_100_per" scale="small">
      Compra AHORA
    </Button>
  </div>;
};

export default PreCatalogCarouselItem;
