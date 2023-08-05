/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-use-before-define */
import React, { useContext, useEffect } from "react";
import "./styles.scss";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import DigitalPlatformsView from "./DigitalPlatformsView";
import CreditCalculationStepperView from "./CreditCalculationStepperView";
import { CreditContext, CreditPhases, CreditProvider } from "./context/context";
import { RootState } from "../../store";
import useUserVerificationDetails from "../../hooks/useUserVerificationDetails";
import useTrackPixelOnMount from "../../hooks/FacebookPixel/useTrackPixelOnMount";

const CreditCalculationWithProvider = () => (
  <CreditProvider>
    <CreditCalculation />
  </CreditProvider>
);

const CreditCalculation = () => {
  const { phase } = useContext(CreditContext);
  const history = useHistory();
  const { country } = useSelector((state: RootState) => state.countryReducer);
  const [{ creditCalculation: results }] = useUserVerificationDetails();

  useTrackPixelOnMount("Subscribe");

  const scrollTop = () => {
    window.focus();
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    document.title = "Estudio financiero en Ozon";
    scrollTop();

    if (results && results.state?.completed) {
      history.push("/financia-tu-moto/results");
    }
  }, [history]);

  // useEffect(() => {
  //   if (country === "CO") {
  //     history.push("/");
  //   }
  // }, [country, history]);

  return (
    <div className="dso_container">
      {/* {
        // eslint-disable-next-line no-nested-ternary
        phase === CreditPhases.DigitalPlatformsForm ? <DigitalPlatformsView /> : <CreditCalculationStepperView />
      } */}
      <CreditCalculationStepperView />
    </div>
  );
};

export default CreditCalculationWithProvider;
