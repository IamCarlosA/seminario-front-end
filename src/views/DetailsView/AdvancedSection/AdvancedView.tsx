/* eslint-disable no-unused-vars */
import React, { FC, useCallback, useState } from "react";
import { TVehicle } from "models/vehicle.interface";
import { Typography, Input, Button, ChipPercentage } from "@ecommerce-ozon/design_system";
import { ReactComponent as Money } from "@ecommerce-ozon/design_system/dist/public/static/icons/money.svg";
import { useFormik } from "formik";
import * as yup from "yup";
import { formatPrice } from "helpers/formatPrice";
import { prices } from "helpers/prices";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { useHistory } from "react-router-dom";
import {
  setCreditVerificationCreditTimeAction,
  setCreditVerificationVehicleAction,
} from "store/actions/creditVerification";

const validationSchema = yup.object({
  advancedMoney: yup
    .number()
    .min(1, "minimo $1")
    .required("Pago inicial es requerido"),
});

interface Props {
  vehicle: TVehicle;
  handleModal: Function;
}

export interface IweeksOptions {
  52: string;
  78: string;
  104: string;
}

export const weeksOptions: IweeksOptions = {
  52: "12 meses",
  78: "18 meses",
  104: "24 meses",
};

export const AdvancedView: FC<Props> = ({ vehicle, handleModal }) => {
  const [Refresh, setRefresh] = useState({});
  const { country } = useSelector((state: RootState) => state.countryReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleIWantThisVehicle = useCallback(
    (veh: TVehicle, selectedCreditTime: number) => {
      dispatch(setCreditVerificationVehicleAction(veh));
      dispatch(setCreditVerificationCreditTimeAction(selectedCreditTime));
      // TODO: poner el abono en el redux
      history.push("/financia-tu-moto/results");
    },
    [dispatch, history]
  );
  const formik = useFormik({
    initialValues: {
      advancedMoney: 0,
    },
    validationSchema,
    onSubmit: (values) => {
      vehicle.setAdvancedMoney(values.advancedMoney);
      setRefresh({});
    },
  });
  return (
    <div className="dso_container p_y_xs">
      <Typography
        scale="heading4"
        weight="600"
        className="text_primary_300 p_y_md"
      >
        <span className="text_neutral_1000">Calcula</span> tu plan de pagos
        ideal
      </Typography>
      <div
        style={{ backgroundColor: "#FED7AB", borderRadius: "5px" }}
        className="p_md"
      >
        <div className="display_flex flex_row_desktop flex_col_mobile">
          <div className="dso_card_small h_100_per_desktop bg_neutral_0 display_flex flex_col p_y_md p_x_xl">
            <form onSubmit={formik.handleSubmit}>
              <Input
                name="advancedMoney"
                title="Adelanto inicial"
                type="number"
                icon={<Money />}
                placeholder="Escribe tu Pago inicial"
                value={formik.values.advancedMoney}
                onChange={formik.handleChange}
              />
              <Button
                variant="principal"
                scale="small"
                className="w_100_per"
                type="submit"
              >
                Volver a calcular tu pago inicial
              </Button>
            </form>
          </div>
          {vehicle.creditTime.map((quota, index) => (
            <div
              key={`${quota}-${index}`}
              className="m_l_md_desktop display_flex flex_row shadow_medium m_t_md_mobile w_100_per_mobile"
            >
              <div
                className="display_flex flex_col bg_neutral_0 flex_justify_center p_x_md p_y_md w_50_per_mobile"
                style={{
                  borderTopLeftRadius: "0.5rem",
                  borderBottomLeftRadius: "0.5rem",
                  borderTopRightRadius: "0.2rem",
                  borderBottomRightRadius: "0.2rem",
                }}
              >
                <Typography weight="600" scale="heading4">
                  {vehicle.brand.name}
                </Typography>
                <Typography weight="600" scale="heading4">
                  {vehicle.model.name}
                </Typography>
                <Typography
                  weight="400"
                  scale="xsmall"
                  className="text_neutral_600 m_b_xs"
                >
                  {`${vehicle.cylindersCapacity.value} CC  ID ${vehicle.internalId}`}
                </Typography>
                <Button
                  variant="principal"
                  scale="small"
                  className="w_100_per"
                  // onClick={() => handleIWantThisVehicle(vehicle, quota)}
                  onClick={() => handleModal(quota)}
                >
                  ¡Quiero este plan!
                </Button>
              </div>
              <div
                className="display_flex flex_col bg_neutral_0 p_x_md p_y_md flex_justify_center w_50_per_mobile"
                style={{
                  borderTopLeftRadius: "0.2rem",
                  borderBottomLeftRadius: "0.2rem",
                  borderTopRightRadius: "0.5rem",
                  borderBottomRightRadius: "0.5rem",
                  borderLeft: "1px dotted #FDD6AA",
                }}
              >
                <Typography
                  weight="600"
                  scale="heading3"
                  className="text_primary_300 text_center"
                >
                  ${formatPrice(prices(vehicle.getWeeklyPrice(quota)), country)}
                </Typography>
                {vehicle.hasDiscount() && (
                  <div className="display_flex flex_center flex_gap_xs">
                    <Typography
                      scale="medium"
                      weight="600"
                      className="text_red_300 text_center"
                      style={{ textDecoration: "line-through" }}
                    >
                      $
                      {formatPrice(
                        prices(vehicle.getWeeklyPriceWithoutDescount(quota)),
                        country
                      )}
                    </Typography>
                  </div>
                )}
                <Typography
                  weight="400"
                  scale="xxsmall"
                  className="text_neutral_600 text_center m_b_xs"
                >
                  Pagos semanales
                </Typography>
                <div className="dso_chip_small bg_neutral_800 text_neutral_0 text_center">{`X ${
                  weeksOptions[
                    quota.toString() as unknown as keyof IweeksOptions
                  ]
                }`}</div>
                <Typography
                  weight="400"
                  scale="xxsmall"
                  className="text_neutral_600 text_center m_t_xs"
                >
                  {`${quota} semanas`}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
