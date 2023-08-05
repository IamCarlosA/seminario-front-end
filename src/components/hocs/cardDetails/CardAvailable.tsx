/* eslint-disable no-shadow */

import React, { useCallback, useMemo } from "react";
// import ReactGA from "react-ga4";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import { useDiscount } from "hooks/useDiscount";
import { ReactComponent as Moto } from "@ecommerce-ozon/design_system/dist/public/static/icons/motorcycle.svg";
import { ReactComponent as Right } from "@ecommerce-ozon/design_system/dist/public/static/icons/Rigth.svg";
import { formatPrice } from "helpers/formatPrice";
import { RootState } from "store/index";
// import { setVehicleDate } from "store/actions/datev";
import { prices } from "helpers/prices";
import { TVehicle } from "models/vehicle.interface";
import { Typography, Button, ChipPercentage, Input } from "@ecommerce-ozon/design_system";
import {
  setCreditVerificationCreditTimeAction,
  setCreditVerificationVehicleAction
} from "../../../store/actions/creditVerification";

type Props = {
  vehicle: TVehicle;
};

export const weeksOptions = {
  52: "12 meses",
  78: "18 meses",
  104: "24 meses",
};
export type WeekOptionsKeys = keyof typeof weeksOptions;
export const getWeekOptionLabel = (weeks: number) => `${weeks} semanas`;

const CardAvailable = ({ vehicle }: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { country } = useSelector((state: RootState) => state.countryReducer);
  const [selectedCreditTime, setSelectedCreditTime] = React.useState<WeekOptionsKeys>(52);
  const typeDiscount = 1;
  // eslint-disable-next-line no-shadow
  const handleIWantThisVehicle = useCallback(
    (vehicle: TVehicle) => {
      dispatch(setCreditVerificationVehicleAction(vehicle));
      dispatch(setCreditVerificationCreditTimeAction(selectedCreditTime));
      history.push("/financia-tu-moto/results");
    },
    [dispatch, history, selectedCreditTime]
  );

  const handleCreditTimeChange = useCallback(
    (event: any) => {
      const weekOption = vehicle.creditTime.filter(ct => ct === parseInt(event.target.value, 10)).shift();
      if (weekOption) {
        setSelectedCreditTime(weekOption as WeekOptionsKeys);
      }
    }, []
  );

  const selectOptions = useMemo(() => vehicle.creditTime.map(ct => getWeekOptionLabel(ct)), [vehicle]);

  return (
    <div className="dso_card display_flex flex_col h_100_per_desktop p_y_md bg_neutral_0">
      <div className="flex_center">
        <div className="p_y_none flex_center dso_chip_rounded dso_chip_small bg_neutral_800">
          <Moto className="w_md m_r_xxs" />
          MOTO DISPONIBLE
        </div>
      </div>
      <div style={{ width: "fit-content", alignSelf: "center" }} className="flex_col display_flex flex_justify_center">
        <Typography
          scale="small"
          weight="600"
          className="text_primary_300 m_t_xl text_center"
        >
          {`Ubicación: ${vehicle.city?.name}`}
        </Typography>
        <Typography
          scale="heading3"
          weight="600"
          className="text_neutral_900 m_t_xs text_center"
        >
          {vehicle.brand?.name} {vehicle.model.name}
        </Typography>
        <div className="display_flex">
          <Typography
            scale="small"
            weight="600"
            className="text_neutral_900 m_t_xs flex_1"
          >
            {`ID ${vehicle.internalId}`}
          </Typography>
          <Typography
            scale="small"
            weight="600"
            className="text_neutral_900 m_t_xs flex_1 text_right"
          >
            {vehicle.cylindersCapacity.value} CC
          </Typography>
        </div>
      </div>
      <div style={{ justifyContent: "space-around" }}
           className="flex_grow_1 display_flex p_y_xxl flex_col m_t_md bg_neutral_200 w_100_per">

        <Typography
          scale="medium"
          weight="400"
          className="text_neutral_800 text_center m_t_xl"
        >
          Pagos semanales
        </Typography>
        <div>
          {
            vehicle.hasDiscount() && (
              <div className="display_flex flex_center flex_gap_xs">
                <Typography
                  scale="medium"
                  weight="600"
                  className="text_red_300 text_center"
                  style={{ textDecoration: "line-through" }}
                >
                  ${formatPrice(prices(vehicle.getWeeklyPriceWithoutDiscount(selectedCreditTime)), country)}
                </Typography>
                <ChipPercentage total={vehicle.getWeeklyPriceWithoutDiscount(selectedCreditTime)}
                                value={vehicle.getWeeklyPrice(selectedCreditTime)} />
              </div>
            )
          }
          <Typography
            scale="heading1"
            weight="600"
            className="text_primary_300 text_center m_t_md"
          >
            ${formatPrice(prices(vehicle.getWeeklyPrice(selectedCreditTime)), country)}
          </Typography>
        </div>


        {!typeDiscount ||
          (typeDiscount === 1 && (
            <div className="flex_center_col m_t_md">
              <div className="display_flex flex_col flex_align_center m_b_lg">
                <div className="bg_neutral_600 p_x_md p_xs br_xs">
                  <Typography
                    scale="medium"
                    weight="600"
                    className="text_neutral_0"
                  >
                    x {weeksOptions[selectedCreditTime]}
                  </Typography>
                </div>
                <Typography
                  scale="xsmall"
                  weight="400"
                  className="text_neutral_800 m_t_xs"
                >
                  {selectedCreditTime} semanas
                </Typography>
              </div>
            </div>
          ))}

        <div className="display_flex flex_col flex_align_center">
          <Typography
            scale="medium"
            weight="400"
            className="text_neutral_800 text_center m_t_xl"
          >
            Selecciona el tiempo a pagar:
          </Typography>
          <div style={{ maxWidth: 216 }} className="w_100_per">
            <Input
              name="creditTime"
              options={selectOptions}
              title=""
              onChange={handleCreditTimeChange}
              value={getWeekOptionLabel(selectedCreditTime)}
              type="select"
            />
          </div>
        </div>

      </div>

      <Button
        scale="small"
        className="w_70_per m_b_md m_t_xl"
        style={{ alignSelf: "center" }}
        onClick={() => handleIWantThisVehicle(vehicle)}
        orientation="right"
        icon={<Right />}
      >
        ¡QUIERO ESTA MOTO!
      </Button>

    </div>
  );
};

export default CardAvailable;
