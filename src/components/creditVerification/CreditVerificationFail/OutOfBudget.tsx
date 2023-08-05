/* eslint-disable no-unused-vars */
import { Grid } from "@mui/material";
import { Typography } from "@ecommerce-ozon/design_system";
import OzonCardVehicle from "components/cards/OzonCardVehicle";
import { TVehicle } from "models/vehicle.interface";
import React from "react";
import { store } from "store";
import useUserVerificationDetails from "hooks/useUserVerificationDetails";

interface Props {
  vehicles: TVehicle[];
}

export const OutOfBudget: React.FC<Props> = ({ vehicles }) => {
  const userSelected = store.getState().userReducer.user;
  const [results, setResults] = useUserVerificationDetails();
  return (
    <div className="w_100_per dso_container display_flex flex_gap_md">
      <div className="w_30_per_desktop">
        <div className="dso_card bg_neutral_0 p_md display_flex flex_col flex_gap_md display_none_mobile h_50_per_desktop">
          <div className="h_50_per w_100_per p_xs display_flex flex_align_center">
            <Typography weight="600" scale="large">
              <span className="text_primary_300">
                Felicidades {userSelected.name},
              </span>{" "}
              tienes un crédito pre aprobado de:
            </Typography>
          </div>
          <div className="h_50_per w_100_per  br_b_xs display_flex flex_center display_flex flex_center bg_primary_100">
            <Typography
              weight="600"
              scale="heading3"
              className="text_primary_300"
            >
              ${Math.ceil(results.creditCalculation.score)} semanales
            </Typography>
          </div>
        </div>
        <Typography weight="400" scale="medium" className="m_y_md">
          Estas son las motocicletas ideales para ti según{" "}
          <span className="text_primary_300">tu crédito aprobado</span>
        </Typography>
        <Typography
          weight="400"
          scale="small"
          className="text_primary_300 m_y_md"
        >
          Ver todas mis motos ideales
        </Typography>
      </div>
      <div className="w_70_per_desktop w_100_per_mobile">
        <Grid
          container
          justifyContent="center"
          rowSpacing={3}
          columnSpacing={2}
        >
          {vehicles.slice(0, 4).map((vehi, index) => (
            <Grid item key={`index_without_${index}`} xs={12} sm={3}>
              {/* <OzonCardVehicle vehicle={vehi} isHelperCard={false} /> */}
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};
