import React, { FC } from "react";
import "./CreditVerification.scss";
import { TVehicle } from "../../../models/vehicle.interface";
import CreditVerificationFail from "../CreditVerificationFail/CreditVerificationFail";
import CreditVerificationSuccess from "../CreditVerificationSuccess/CreditVerificationSuccess";

interface Props {
  vehicle: TVehicle;
  vehiclesSuggested: TVehicle[];
  approved: boolean;
  user?: {
    name: string;
    firstLastName: string;
    secondLastName: string;
    email: string;
    phone: string;
    curp: string;
  };
}

const CreditVerification: FC<Props> = ({
  vehicle,
  vehiclesSuggested,
  approved,
  user
}) => (
  <div className="w_100_per">
    {approved ? (
      <CreditVerificationSuccess 
        vehicle={vehicle}
        user={user}
      />
    ) : (
      <CreditVerificationFail vehicle={vehicle} vehicles={vehiclesSuggested} />
    )}
  </div>
);

export default CreditVerification;
