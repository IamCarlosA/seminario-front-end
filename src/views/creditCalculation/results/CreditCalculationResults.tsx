import React, { useEffect, useLayoutEffect, useState } from "react";
import "./styles.scss";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import ReactGA from "react-ga4";
import moment from "moment";
import { fetchVehiclesThunk } from "../../../store/actions/vehicles";
import useVehicles from "../../../hooks/useVehicles";
import { TVehicle } from "../../../models/vehicle.interface";
import {
  filterByCreditCalculation,
  getMaximumCreditNumber,
} from "./filterByCreditCalculation";
import useUserVerificationDetails from "../../../hooks/useUserVerificationDetails";
import { CalculationStepperFormValues } from "../CreditCalculationStepperView";
import ResultsWithoutVehicleSelected from "./ResultsWithoutVehicleSelected";
import ResultsWithVehicleSelected from "./ResultsWithVehicleSelected";
import { useCreditVerificationSelectedVehicle } from "../../../hooks/useCreditVerificationSelectedVehicle";
import useCurrentCity from "../../../hooks/useCurrentCity";
import useTrackPixelOnMount from "../../../hooks/FacebookPixel/useTrackPixelOnMount";

type LocationState = CalculationStepperFormValues;

const CreditCalculationResults = () => {
  const { state } = useLocation<LocationState>();
  const dispatch = useDispatch();
  const history = useHistory();
  const [results, setResults] = useUserVerificationDetails();
  const selectedVehicle = useCreditVerificationSelectedVehicle();

  const city = useCurrentCity();
  const {
    fetched: vehicleFetched,
    loading: vehiclesLoading,
    data: { vehicles },
  } = useVehicles();
  const [vehiclesFiltered, setvehiclesFiltered] = useState<TVehicle[]>([]);
  const [isSelectedVehicleApproved, setIsSelectedVehicleApproved] =
    useState(false);

  useTrackPixelOnMount("SubmitApplication");

  useLayoutEffect(() => {
    if (results && results.creditCalculation.state.completed && !state) {
      if (moment().unix() < results.timestamp) {
        setvehiclesFiltered(
          results.creditCalculation?.vehicles.map((v) => new TVehicle(v))
        );
      } else {
        setResults((oldResults) => ({
          ...oldResults,
          creditCalculation: {
            state: {
              completed: false,
            },
            score: 0,
            vehicles: [],
          },
          timestamp: Date.now(),
        }));
        history.push("/financia-tu-moto");
      }
    } else if (state) {
      dispatch(fetchVehiclesThunk({ filters: { city } }));
      // delete history to avoid refresh persistence
      window.history.replaceState({}, document.title);
    } else {
      history.push("/financia-tu-moto");
    }
  }, [dispatch, state, history, city]);

  useLayoutEffect(() => {
    if (state && vehicleFetched) {
      // eslint-disable-next-line no-shadow
      const vehiclesFiltered = vehicles
        .filter(filterByCreditCalculation(getMaximumCreditNumber(state)))
        .sort((a, b) => a.getWeeklyPrice() - b.getWeeklyPrice());
      setvehiclesFiltered(vehiclesFiltered);
      setResults((oldResults) => ({
        ...oldResults,
        creditCalculation: {
          state: { ...state, completed: true },
          score:
            getMaximumCreditNumber(state) >= 0
              ? getMaximumCreditNumber(state)
              : 0,
          vehicles: vehiclesFiltered,
        },
        timestamp: moment().add("15", "minutes").unix(),
      }));
    }
  }, [vehicles, state, setResults, vehicleFetched]);

  useEffect(() => {
    // event analytics
    document.title = "Resultado estudio financiero en Ozon";
    ReactGA.event("CTA_Financial_result", {
      category: "Financial Form",
      label:
        "finished Financial Form flow (params result) result: ozoner budget",
      result: getMaximumCreditNumber(state),
    });
  }, []);

  useLayoutEffect(() => {
    if (selectedVehicle && results?.creditCalculation?.state?.completed) {
      setIsSelectedVehicleApproved(
        filterByCreditCalculation(
          getMaximumCreditNumber(
            results.creditCalculation.state as CalculationStepperFormValues
          )
        )(selectedVehicle)
      );
    }
  }, [results, selectedVehicle]);

  return !selectedVehicle ? (
    <ResultsWithoutVehicleSelected vehicles={vehiclesFiltered} />
  ) : (
    <ResultsWithVehicleSelected
      vehicle={selectedVehicle}
      approved={isSelectedVehicleApproved}
      vehiclesSuggested={vehiclesFiltered}
      loading={vehiclesLoading}
      user={results?.creditCalculation?.state?.userInfoStep}
    />
  );
};

export default CreditCalculationResults;
