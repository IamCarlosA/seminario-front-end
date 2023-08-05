/* eslint-disable no-underscore-dangle */
import React, { FC } from "react";
import "./styles.scss";
import { Grid } from "@material-ui/core";
import VehicleCardPlaceHolder from "components/placeholders/vehicleCardPlaceHolder/VehicleCardPlaceHolder";
import { Carousel } from "@ecommerce-ozon/design_system";

interface Props {
  renderedVehicles: React.ReactElement[]
  loading: boolean
  error: boolean
}

const DiscountCarousel: FC<Props> = ({ renderedVehicles, loading, error}) => (
    <div>
      {!loading && !error && renderedVehicles?.length ? (
        <Carousel>{renderedVehicles}</Carousel>
      ) : (
        <Grid
          container
          direction="row"
          alignItems="center"
          spacing={2}
          className="vehicle-grid"
        >
          <Grid item xs={6} md={3}>
            <VehicleCardPlaceHolder />
          </Grid>
          <Grid item xs={6} md={3}>
            <VehicleCardPlaceHolder />
          </Grid>
          <Grid item xs={6} md={3}>
            <VehicleCardPlaceHolder />
          </Grid>
          <Grid item xs={6} md={3}>
            <VehicleCardPlaceHolder />
          </Grid>
        </Grid>
      )}
    </div>
  );

export default DiscountCarousel;
