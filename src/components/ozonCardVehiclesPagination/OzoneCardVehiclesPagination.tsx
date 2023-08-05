/* eslint-disable no-unused-vars */

import React, { useState } from "react";

import { Grid, useMediaQuery } from "@mui/material";
import { Typography } from "@ecommerce-ozon/design_system";
import { VehicleData } from "models/graphql/fecthVehicle.graphql";
import { TVehicle } from "../../models/vehicle.interface";
import OzonCardVehicle from "../cards/OzonCardVehicle";

import NoResultImage from "../../static/images/noResult.png";
import { ModalFormFinanciero } from "../hocs/modal/ModalFormFinanciero";

type OzonPaginationProps = {
  vehicles: VehicleData[];
  currentPage: any;
  itemsPerPage: any;
};

const NoResult = () => {
  return (
    <div
      style={{
        height: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginRight: "20%",
        padding: "10%",
        textAlign: "center",
      }}
    >
      <img height="100" src={NoResultImage} alt="noResult" />
      <Typography weight="400" scale="medium">
        No hay resultados con los citerios de búsqueda
      </Typography>
    </div>
  );
};

const OzonCardVehiclesPagination: React.FC<OzonPaginationProps> = ({
  vehicles,
  currentPage,
  itemsPerPage,
}) => {
  const matchesXS = useMediaQuery("(min-width:600px)");

  const [open, setOpen] = useState<boolean>(false);

  // console.log(vehicles);
  return vehicles.length === 0 ? (
    <NoResult />
  ) : (
    <>
      <Typography
        scale="medium"
        className="display_flex display_none_desktop p_b_lg p_l_sm"
        weight="400"
      >
        <b className="m_r_xs">{vehicles.length} </b> moto
        {vehicles.length !== 1 ? "s" : ""}
      </Typography>
      <Grid container rowSpacing={3} columnSpacing={!matchesXS ? 0 : 2}>
        {vehicles
          .map((vehicle, idx) => {
          
            return (
              <Grid
                key={`VehicleCardContainer-${idx}`}
                item
                xs={12}
                sm={12}
                md={6}
                lg={4}
                xl={4}
                style={{ minHeight: "100%" }}
              >
                <OzonCardVehicle
                  isHelperCard={false}
                  vehicle={vehicle}
                  setOpen={setOpen}
                />
              </Grid>
            );
          })}
      </Grid>
      <ModalFormFinanciero
        title={
          <Typography weight="600" scale="large" className="txt-center">
            Vamos a<span className="text_primary_300"> iniciar </span>
            la busqueda de tu moto ideal:
          </Typography>
        }
        subtitle={
          <Typography weight="600" scale="heading3" textColor="primary_300">
            ¿Quieres saber cual es tu moto ideal?
          </Typography>
        }
        open={open}
        setOpen={() => setOpen(!open)}
        orientation="vertical"
      />
    </>
  );
};

export default OzonCardVehiclesPagination;
