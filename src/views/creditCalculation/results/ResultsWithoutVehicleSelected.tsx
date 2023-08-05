/* eslint-disable no-unused-vars */
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import { useHistory } from "react-router-dom";
import { Typography, Button } from "@ecommerce-ozon/design_system";
import { ReactComponent as Right } from "@ecommerce-ozon/design_system/dist/public/static/icons/Rigth.svg";
import { RejectedView } from "components/creditVerification/CreditVerificationFail/RejectedView";
import { TVehicle } from "../../../models/vehicle.interface";
import { CardViewMX } from "../../../components/hocs/card/CardViewMX";
import useVehicles from "../../../hooks/useVehicles";
import "./styles.scss";
import { SuccessWithoutVehicleSelected } from "./resultWihoutVehicleSelected/SuccessWithoutVehicleSelected";

interface Props {
  vehicles: TVehicle[];
}

const ResultsWithoutVehicleSelected: React.FC<Props> = ({ vehicles }) => {
  const history = useHistory();
  const goCatalogo = () => history.push("/catalogo");

  const { loading: vehiclesLoading, error: vehiclesError } = useVehicles();

  return (
    <div className="credit-calculation-results">
      <div className="credit-calculation-container m_y_xl m_x_md">
        <div className="card-container">
          {/* eslint-disable-next-line no-nested-ternary */}
          {vehiclesLoading ? (
            <>
              <CircularProgress className="loading" />
              <div className="m_y_xxl">Cargando...</div>
            </>
          ) : // eslint-disable-next-line no-nested-ternary
          vehiclesError ? (
            <span>
              Error Cargando los vehiculos, porfavor intente nuevamente
            </span>
          ) : (
            <SuccessWithoutVehicleSelected vehicles={vehicles} />
          )}
          {/* // ) : vehicles.length > 0 ? (
        //   <SuccessWithoutVehicleSelected vehicles={vehicles}/>
        // ) : (
        //   <RejectedView/>
        // )} */}
        </div>
      </div>
    </div>
  );
};

export default ResultsWithoutVehicleSelected;
