/* eslint-disable import/no-unresolved */
import React, { useEffect } from "react";

import Swipercore, { Navigation, Pagination, Autoplay } from "swiper";

// swiper bundle styles
import "swiper/swiper-bundle.min.css";

// swiper core styles
import "swiper/swiper.min.css";

// eslint-disable-next-line import/extensions
import "swiper/css/navigation";

// eslint-disable-next-line import/extensions
import "swiper/css/pagination";



// css
import "./banner.scss";

// imgs

import MediaSection from "components/media/MediaSection";
import AlliesSection from "components/allies/AlliesSection";

// import DiscountSection from "components/discountSection/DiscountSection";
import { HubsSection } from "components/hubs/HubsSection";

import { useDispatch } from "react-redux";
import HeroSection from "./heroSection/HeroSection";
import { RecommendedSection } from "./recommendedSection/RecommendedSection";
import { BrandSection } from "./brandSection/BrandSection";
import { OneThousandSecction } from "./oneThousandSecction/OneThousandSecction";
import PreCatalogSection from "../../preCatalog/PreCatalogSection";
import { SectionBoost } from "./sectionBoost/SectionBoost";
import { fetchVehiclesThunk } from "../../../store/actions/vehicles";
import useCurrentCity from "../../../hooks/useCurrentCity";

export const Bannermx = () => {
  Swipercore.use([Navigation, Pagination, Autoplay]);
  const dispatch = useDispatch();
  const city = useCurrentCity();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(fetchVehiclesThunk({ filters: { city } }));
  }, [dispatch, city]);
  
  return (
    <>
      <BrandSection />
      <HeroSection />
      <RecommendedSection />
      {/* <DiscountSection /> */}
      <PreCatalogSection />
      <SectionBoost />
      <OneThousandSecction />
      <MediaSection />
      <HubsSection />
      <AlliesSection />
    </>
  );
};
