/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React, { FC, useState } from "react";
import { TImages } from "../../../models/vehicle.interface";

import "./Gallery.scss";

interface Props {
  photos: TImages[];
  card?: boolean;
  spacing?: boolean;
}

const Gallery: FC<Props> = ({ photos, card = true, spacing = true }) => {
  const [index, setIndex] = useState(0);
  return (
    <div
      className={`w_100_per h_100_per_desktop ${
        spacing && "p_l_sm_desktop"
      } m_b_md_mobile`}
      style={{ maxHeight: "100%" }}
    >
      <div
        className={`w_100_per display_flex flex_center ${
          card && "dso_card"
        }  bg_neutral_0 pos_relative h_100_per`}
      >
        <img
          alt={photos[index].name}
          src={photos[index].url}
          style={{maxHeight: "100%"}}
          className={`h_80_per_mobile w_80_per_mobile ${(!card)?"w_100_per_desktop":"h_70_per_desktop"} photoPrincipal`}
        />
        <div
          className="pos_absolute w_100_per display_flex_desktop display_none_mobile flex_center h_60_px_desktop"
          style={{ bottom: "5%", backgroundColor: "rgba(0, 0, 0, .5)" }}
        >
          {photos.map((photo, indexPhoto) => {
            return (
              <div
                key={photo._id}
                className="h_50_px_desktop m_x_sm_desktop display_flex flex_center"
              >
                <img
                  alt={photo.name}
                  src={photo.url}
                  onClick={() => setIndex(indexPhoto)}
                  className="br_xxs cursor_pointer photosVehicle"
                />
              </div>
            );
          })}
        </div>
        <div
          className="pos_absolute  display_flex_desktop display_none_desktop flex_center h_20_px p_x_lg"
          style={{
            bottom: "5%",
            backgroundColor: "rgba(0, 0, 0, .5)",
            borderRadius: "20px",
          }}
        >
          {photos.map((photo, indexPhoto) => {
            return (
              <div
                key={photo._id}
                className={`${
                  index === indexPhoto ? "bg_neutral_0" : "bg_neutral_1000"
                } m_xs dim_md display_flex flex_center`}
                onClick={() => setIndex(indexPhoto)}
                style={{ borderRadius: "50%" }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
