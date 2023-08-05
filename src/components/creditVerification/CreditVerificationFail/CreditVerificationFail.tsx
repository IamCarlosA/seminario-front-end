/* eslint-disable no-unused-vars */
import React, { FC, useCallback } from "react";
import "./CreditVerificationFail.scss";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography, Button } from "@ecommerce-ozon/design_system";
import { ReactComponent as UserCircle } from "@ecommerce-ozon/design_system/dist/public/static/icons/user-circle.svg";
import { ReactComponent as Phone } from "@ecommerce-ozon/design_system/dist/public/static/icons/phone.svg";
import { ReactComponent as Mail } from "@ecommerce-ozon/design_system/dist/public/static/icons/mail.svg";
import { ReactComponent as GPS } from "@ecommerce-ozon/design_system/dist/public/static/icons/gps.svg";
import { ReactComponent as Checkmark } from "@ecommerce-ozon/design_system/dist/public/static/icons/checkmark.svg";
import { ReactComponent as Date } from "@ecommerce-ozon/design_system/dist/public/static/icons/date.svg";
import { ReactComponent as PriceTag } from "@ecommerce-ozon/design_system/dist/public/static/icons/price-tag-rotate.svg";
import { ReactComponent as Motorcycle } from "@ecommerce-ozon/design_system/dist/public/static/icons/motorcycle.svg";
import { ReactComponent as Speedometer } from "@ecommerce-ozon/design_system/dist/public/static/icons/speedometer.svg";
import { ReactComponent as Right } from "@ecommerce-ozon/design_system/dist/public/static/icons/right-md.svg";
import { CardViewMX } from "../../hocs/card/CardViewMX";
import { TVehicle } from "../../../models/vehicle.interface";
import CreditVerificationResultCard from "../CreditVerificationResultCard/CreditVerificationResultCard";
import { useCreditVerificationSelectedCreditTime } from "../../../hooks/useCreditVerificationSelectedVehicle";
import useUserVerificationDetails from "../../../hooks/useUserVerificationDetails";
import { formatPrice } from "../../../helpers/formatPrice";
import { prices } from "../../../helpers/prices";
import { RootState } from "../../../store";
import { getMaximumCreditNumber } from "../../../views/creditCalculation/results/filterByCreditCalculation";
import { CalculationStepperFormValues } from "../../../views/creditCalculation/CreditCalculationStepperView";
import { RejectedView } from "./RejectedView";
import { OutOfBudget } from "./OutOfBudget";

interface Props {
  vehicles: TVehicle[];
  vehicle: TVehicle;
}

const InfoBox = ({ icon, label }: { icon: React.ReactElement<any, any>, label: string }) => <div
  className="display_flex flex_align_center p_xxxs bg_neutral_400" style={{ overflow: "hidden" }}>
  <div className="m_x_xs">
    {icon}
  </div>
  <Typography scale="xsmall" scaleMobile="xxsmall" weight="600">
    <b>
      {label}
    </b>
  </Typography>
</div>;

const CreditVerificationFail: FC<Props> = ({ vehicles, vehicle }) => {
  const [results] = useUserVerificationDetails();
  const [loading, setLoading] = React.useState(false);
  const { country } = useSelector((state: RootState) => state.countryReducer);
  const history = useHistory();
  const selectedCreditTime = useCreditVerificationSelectedCreditTime();
  const creditNumber = getMaximumCreditNumber(results?.creditCalculation?.state as CalculationStepperFormValues);

  const handleAgendaTuCita = useCallback(async () => {
    try {
      setLoading(true);
      // await fetchZendesk({
      //   name: results?.creditCalculation?.state?.userInfoStep?.name ?? "",
      //   phone: results?.creditCalculation?.state?.userInfoStep?.phone ?? "",
      //   email: results?.creditCalculation?.state?.userInfoStep?.email ?? "",
      //   vehicleId: vehicle.internalId,
      //   creditTime: selectedCreditTime
      // });
      setLoading(false);
      history.push("/");
    } catch (e) {
      setLoading(false);
      console.error(e);
    }

  }, [vehicle, results]);

  return <div
    className="credit-verification-fail display_flex flex_justify_center w_100_per flex_col flex_align_center m_t_xxl p_t_xs">
    {
      vehicles.length ? <OutOfBudget vehicles={vehicles}/> : <RejectedView/>
    }


  </div>;

};

export default CreditVerificationFail;
