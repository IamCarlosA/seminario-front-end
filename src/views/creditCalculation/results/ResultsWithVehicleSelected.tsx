/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-unused-vars */
import React from "react";
import { useHistory } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography, Button } from "@ecommerce-ozon/design_system";
import { ReactComponent as Back } from "@ecommerce-ozon/design_system/dist/public/static/icons/back.svg";
import { ReactComponent as WA } from "@ecommerce-ozon/design_system/dist/public/static/icons/whatsapp.svg";
import { TVehicle } from "../../../models/vehicle.interface";
import "./styles.scss";
import CreditVerificationSuccess from "../../../components/creditVerification/CreditVerificationSuccess/CreditVerificationSuccess";
import CreditVerificationFail from "../../../components/creditVerification/CreditVerificationFail/CreditVerificationFail";
import CreditVerification from "../../../components/creditVerification/CreditVerification/CreditVerification";

import maskWhite from "./mask-white.svg";
import maskOrange from "./mask-orange.svg";
import person from "./person.svg";

interface Props {
  vehicle: TVehicle;
  vehiclesSuggested: TVehicle[];
  approved: boolean;
  loading: boolean;
  user?: {
    name: string;
    firstLastName: string;
    secondLastName: string;
    email: string;
    phone: string;
    curp: string;
  };
}

const ResultsWithVehicleSelected: React.FC<Props> = ({
  loading,
  approved,
  vehicle,
  vehiclesSuggested,
  user,
}) => {
  const history = useHistory();

  const handleBack = () => {
    history.goBack();
  };

  const goWA = () =>
    window.open(
      "https://api.whatsapp.com/send?phone=525636630355&text=Hola%20buen%20día,%20quiero%20continuar%20con%20mi%20proceso%20de%20solicitud%20de%20crédito%20pre-Aprobada...",
      "_blank"
    );
  return (
    <div className="credit-calculation-results">
      <div className="credit-calculation-container m_y_xl m_x_md">
        <div className="display_flex flex_align_center m_b_xs dso_container w_100_per">
          <Button
            variant="icon"
            icon={<Back />}
            subvariant="edit"
            scale="small"
            onClick={handleBack}
          />
          <Typography
            scale="xsmall"
            weight="400"
            className="text_neutral_800 m_l_md"
          >
            Catálogo
          </Typography>
          <Typography
            scale="xsmall"
            weight="400"
            className="text_neutral_800 m_x_xs"
          >
            {" < "}
          </Typography>
          <Typography scale="xsmall" weight="400">
            Vehículo {vehicle?.internalId}
          </Typography>
          <Typography
            scale="xsmall"
            weight="400"
            className="text_neutral_800 m_x_xs"
          >
            {" < "}
          </Typography>
          <Typography scale="xsmall" weight="400" className="text_primary_300">
            Solicitud de compra
          </Typography>
        </div>
        <div className="m_b_xl_desktop">
          {loading ? (
            <div className="display_flex flex_justify_center h_500_px_desktop">
              <CircularProgress className="loading" />
              <div className="m_y_xxl">Cargando...</div>
            </div>
          ) : (
            <CreditVerification
              vehicle={vehicle}
              vehiclesSuggested={vehiclesSuggested}
              approved={true}
              user={user}
            />
          )}
          {/* TODO: approved={true} por requerimiento  */}
        </div>
      </div>
    </div>
  );
};

export default ResultsWithVehicleSelected;
