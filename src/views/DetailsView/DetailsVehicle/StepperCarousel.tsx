/* eslint-disable no-unused-vars */
import React, { FC, memo, useCallback, useMemo, useState } from "react";
import {
  Step,
  Stepper,
  StepperBody,
  StepperSteps,
  useStepper,
  Button,
  Typography,
  Carousel,
  CarouselItem,
} from "@ecommerce-ozon/design_system";
import { formatPrice } from "helpers/formatPrice";
import { prices } from "helpers/prices";
import {
  IweeksOptions,
  weeksOptions,
} from "views/DetailsView/AdvancedSection/AdvancedView";
import { TVehicle } from "models/vehicle.interface";
import {
  setCreditVerificationCreditTimeAction,
  setCreditVerificationVehicleAction,
} from "store/actions/creditVerification";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/index";
import { ReactComponent as RightArrow } from "@ecommerce-ozon/design_system/dist/public/static/icons/right-lg.svg";
import { ReactComponent as LeftArrow } from "@ecommerce-ozon/design_system/dist/public/static/icons/left-lg.svg";
import { ModalFormFinanciero } from "components/hocs/modal/ModalFormFinanciero";

interface Props {
  vehicle: TVehicle;
  handleModal: Function;
}

const StepperCarousel: FC<Props> = ({ vehicle, handleModal }) => {
  const history = useHistory();
  const { incrementCurrentStep, decrementCurrentStep } = useStepper();
  const { country } = useSelector((state: RootState) => state.countryReducer);
  const dispatch = useDispatch();


  // const handleIWantThisVehicle = useCallback(
  //   (veh: TVehicle, selectedCreditTime: number) => {
  //     dispatch(setCreditVerificationVehicleAction(veh));
  //     dispatch(setCreditVerificationCreditTimeAction(selectedCreditTime));
  //     // TODO: poner el abono en el redux
  //     history.push("/financia-tu-moto/results");
  //   },
  //   [dispatch, history]
  // );

  const plans = useMemo(
    () =>
      vehicle.creditTime.map((quota, index) => (
        <CarouselItem
          value={`${index}`}
          name={`step ${index}`}
          key={`key-${quota}+${index}`}
        >
          <div className="w_100_per display_flex flex_center pos_relative p_t_md_desktop p_x_xl_mobile">
            <div
              key={`${quota}-${index}`}
              className="display_flex flex_row shadow_medium m_t_md_mobile w_300_px_mobile h_150_px_mobile"
            >
              <div
                className="display_flex flex_col bg_neutral_0 flex_justify_center p_x_md p_t_md w_50_per_mobile"
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
                  {`${vehicle.cylindersCapacity.value} CC | ID: ${vehicle.internalId}`}
                </Typography>
                <Button
                  variant="principal"
                  scale="small"
                  className="w_100_per"
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
                        prices(vehicle.getWeeklyPriceWithoutDiscount(quota)),
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
          </div>
        </CarouselItem>
      )),
    []
  );

  return <Carousel autoplaySpeed={3}>{plans}</Carousel>;
};

export default memo(StepperCarousel);
