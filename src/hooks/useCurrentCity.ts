import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Cities } from "../store/reducers/cityReducer";

const useCurrentCity = () => useSelector((state: RootState) => state.cityReducer.city as Cities);

export default useCurrentCity;
