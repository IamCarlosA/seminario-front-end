import { useSelector } from "react-redux";
import { RootState } from "../store";
import { VehiclesReducerState } from "../store/reducers/vehiclesReducer";

const useVehicles = (): VehiclesReducerState =>
  useSelector((state: RootState) => state.vehiclesReducer);

export default useVehicles;
