/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React, {FC, useCallback, useEffect, useState} from "react";
import { Typography } from "@ecommerce-ozon/design_system";
import {
  detailsData,
  IDetailsData,
  TDetails,
  TVehicle,
} from "models/vehicle.interface";


interface Props {
  vehicle: TVehicle;
}
const propertiesOfDetails = ["year", "milage"];
const propertiesOfObject = ["color", "brakeType", "secondaryColor"];

const DetailsComponent : FC<Props> = ({ vehicle }) => {

  const [left, setLeft] = useState<any[]>([]);
  const [right, setRight] = useState<any[]>([]);
  const [properties, setproperties] = useState({});
  const addPropertiesObj = useCallback(() => {
    propertiesOfObject.forEach((element) => {
      if (vehicle[element as keyof TVehicle] !== undefined) {
        setproperties((prop) => ({
          ...prop,
          [detailsData[element as keyof IDetailsData]]:
            detailsData[
              vehicle[element as keyof TVehicle] as keyof IDetailsData
            ],
        }));
      }
    });
    setproperties((data) => ({
      ...data,
      Marca: vehicle.brand.name,
      Modelo: vehicle.model.name,
      Cilindraje: vehicle.cylindersCapacity.value,
    }));
  }, []);
  const addPropertiesDetails = useCallback(() => {
    propertiesOfDetails.forEach((element) => {
      if (vehicle.details[element as keyof TDetails] !== undefined) {
        setproperties((prop) => ({
          ...prop,
          [detailsData[element as keyof IDetailsData]]:
            vehicle.details[element as keyof TDetails],
        }));
      }
    });
  }, []);

  const reset = useCallback(() => {
    setproperties({});
    setRight([]);
    setLeft([]);
  }, []);

  useEffect(() => {
    reset();
    addPropertiesDetails();
    addPropertiesObj();
  }, []);

  useEffect(() => {
    Object.entries(properties).forEach(([key, v], index) => {
      if (index % 2) {
        setRight((r) => [
          ...r,
          {
            title: key,
            value: v,
          },
        ]);
      } else {
        setLeft((r) => [
          ...r,
          {
            title: key,
            value: v,
          },
        ]);
      }
    });
  }, [properties]);

  return (
    <div className="display_flex p_md w_100_per_desktop flex_col_mobile">
      <div className="w_50_per_desktop h_100_per_desktop w_100_per_mobile p_r_xs_desktop">
        <div className="w_100_per h_100_per_desktop dso_card_small bg_neutral_0 p_md">
          {left.map((item, index) => (
            <div key={item.title} className="display_flex flex_justify_between">
              <Typography
                weight="600"
                scale="small"
                className="text_primary_400"
              >
                {item.title}:
              </Typography>
              <Typography weight="400" scale="small">
                {item.value}
              </Typography>
            </div>
          ))}
        </div>
      </div>

      <div className="w_50_per_desktop h_100_per_desktop w_100_per_mobile p_l_xs_desktop m_t_md_mobile m_t_md_mobile">
        <div
          className="w_100_per h_100_per_desktop dso_card_small p_md"
          style={{ backgroundColor: "white" }}
        >
          {right.map((item, index) => (
            <div key={item.title} className="display_flex flex_justify_between">
              <Typography
                weight="600"
                scale="small"
                className="text_primary_400"
              >
                {item.title}:
              </Typography>
              <Typography weight="400" scale="small">
                {item.value}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailsComponent;
