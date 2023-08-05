/* eslint-disable arrow-body-style */
import { Button } from "@ecommerce-ozon/design_system";
import React from "react";
import { useHistory } from "react-router-dom";
import photo1 from "static/brandSection/bajaj-01.svg";
import photo2 from "static/brandSection/benelli-01.svg";
import photo3 from "static/brandSection/dinamo-01.svg";
import photo4 from "static/brandSection/hero-01.svg";
import photo5 from "static/brandSection/italika-01.svg";
import photo6 from "static/brandSection/izuka-01.svg";
import photo7 from "static/brandSection/keeway-01.svg";
import photo8 from "static/brandSection/ktm-01.svg";
import photo9 from "static/brandSection/kurazai.png";
import photo11 from "static/brandSection/logo-dinamo-blanco-100px.png";
import photo12 from "static/brandSection/Logo-Motomel-1.png";
import photo13 from "static/brandSection/logo-torino.png";
import photo14 from "static/brandSection/MB-01.svg";
import photo15 from "static/brandSection/motomel-01.svg";
import photo16 from "static/brandSection/suzuki-01.svg";
import photo17 from "static/brandSection/tvs-01.svg";
import photo18 from "static/brandSection/veloci-01.svg";
import photo20 from "static/brandSection/yamaha-01.svg";

import { ReactComponent as ChevronRight } from "@ecommerce-ozon/design_system/dist/public/static/icons/chevron-right.svg";

// eslint-disable-next-line import/no-unresolved
import "./brandSection.scss";

export const BrandSection = () => {
  const history = useHistory();
  const brands = [
    photo1,
    photo2,
    photo3,
    photo4,
    photo5,
    photo6,
    photo7,
    photo8,
    photo9,
    photo11,
    photo12,
    photo13,
    photo14,
    photo15,
    photo16,
    photo17,
    photo18,
    photo20,
  ];
  return (
    <>
      <style>
        {`@keyframes slide {
      0% {
        transform: translate3d(0, 0, 0);
      }
      100% {
        transform: translate3d(-${
          brands.length * 30
        }px, 0, 0); /* The image width */
      }`}
      </style>
      <section
        className="w_100_per_desktop h_90_px_desktop bg_neutral_100 h_60_px_mobile display_flex flex_center_desktop brandSection "
        style={{ border: "1px solid #EAEAEA" }}
      >
        {brands.map((brand, index) => {
          return (
            <div className="display_flex flex_align_center flex_center_mobile" key={`brands-${index}`}>
              <img
                src={brand}
                alt="brand"
                className="w_45_px_desktop h_30_px_mobile m_x_md"
              />
            </div>
          );
        })}
        <div
          style={{ borderLeft: "1px solid #EAEAEA" }}
          className="display_flex_desktop flex_align_center display_none_mobile"
        >
          <Button
            type="button"
            variant="ghost"
            scale="small"
            icon={<ChevronRight />}
            orientation="right"
            className="display_flex flex_center"
            onClick={() => history.push("/catalogo")}
          >
            ver todas las marcas
          </Button>
        </div>
      </section>
    </>
  );
};
