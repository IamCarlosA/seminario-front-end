import { useSelector } from "react-redux";
import { RootState } from "../store";
import { TVehicle } from "../models/vehicle.interface";

export const useCreditVerificationSelectedVehicle = () : TVehicle => useSelector( (state: RootState) => state.creditVerificationReducer.selectedVehicle);
export const useCreditVerificationSelectedCreditTime = () : number => useSelector( (state: RootState) => state.creditVerificationReducer.selectedCreditTime);
