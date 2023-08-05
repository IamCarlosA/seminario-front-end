// components
import ReactGA from "react-ga4";
import React, { useEffect } from "react";
import { Bannermx } from "../components/hocs/bannerMX/Bannermx";
import useFacebookPixel from "../hooks/FacebookPixel/useFacebookPixel";

export const HomeScreen = () => {
  const pixelLib = useFacebookPixel();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/" });
    document.title = "Ozoner en Ozon";
    pixelLib.pageView();
  }, []);

  return <Bannermx />;
};
