/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable consistent-return */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React from "react";
import { Grid } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import _ from "lodash";
import {Typography} from "@ecommerce-ozon/design_system";

import VehicleCardPlaceHolder from "../../../components/placeholders/vehicleCardPlaceHolder/VehicleCardPlaceHolder";
import { RootState } from "../../../store";
import OzonCardVehicle from "../../../components/cards/OzonCardVehicle";

const RecommendedDetails = () => {
  const {
    data: vehicles,
    loading: recommendedLoading,
    error: recommendedError,
  } = useSelector((state: RootState) => state.recommendedReducer);

  return (
    <div className="dso_container m_y_xl">
      <div
        className="div-title"
        style={{ marginTop: "4rem", marginBottom: "3rem" }}
      >
        <Typography scale="large" weight="600" className="p_b_lg ">
          Motocicletas
          <span className="text_primary_300">
                {" "}
            similares
              </span>
        </Typography>
      </div>
      <Grid container direction="row" spacing={3}>
        {!recommendedLoading && !recommendedError && vehicles ? (
          vehicles.slice(0, 4).map((vehicle,idx) => (
            <Grid key={uuidv4()} item xs={12} md={3}>
              {vehicle.images[0] && (
                <OzonCardVehicle key={idx} vehicle={vehicle} isHelperCard={false} />
              )}
            </Grid>
          ))
        ) : recommendedLoading ? (
          <>
            {_.range(24).map((_, index) => (
              <Grid
                key={uuidv4()}
                xs={6}
                md={3}
                container
                justifyContent="center"
                item
              >
                <VehicleCardPlaceHolder />
              </Grid>
            ))}
          </>
        ) : (
          "Se produjo un error vuelva a cargar la pagina"
        )}
        {!recommendedLoading &&
          !recommendedError &&
          vehicles &&
          vehicles?.length < 1 &&
          "No se encontraron recomendaciones"}
      </Grid>
    </div>
  );
};

export default RecommendedDetails;
