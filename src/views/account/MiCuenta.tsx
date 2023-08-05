/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
import { fetchGetCreditTotals } from "helpers/fetchMiCuenta";
import { TCreditPayment } from "models/credit-payment.interface";
import { useDispatch } from "react-redux";
import { TCredit, TCreditTotals } from "models/credit.interface";
import { TDataozoner } from "models/ozoner.interface";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AddAllDataAccount } from "store/actions/account";
import { TVehicle } from "models/vehicle.interface";
import { Typography } from "@ecommerce-ozon/design_system";
import { Container, Grid } from "@material-ui/core";
import { fetchOzonerGeolocation } from "helpers/fetchGeolocation";
import { store } from "store";
import { getOzonerLocation } from "helpers/getOzonerLocation";
import { ContactHelper } from "components/hocs/ContactHelper/ContactHelper";
import CreditPaymentsTable from "./creditPaymentsTable/CreditPaymentsTable";
import { VehiclePayment } from "./vehicle/VehiclePayment";
import { CardAccount } from "./cardAccount/CardAccount";
import "./AccountPayment.scss";



type paramDetail = {
  id: string;
};

export const MiCuenta = () => {
  const history = useHistory();
  const credit: TCredit = store.getState().accountReducer.credit;
  const creditTotals: TCreditTotals =
    store.getState().accountReducer.creditTotals;
  const lastPayment: TCreditPayment =
    store.getState().accountReducer.lastPayment;
  const vehicle: TVehicle = store.getState().accountReducer.vehicle;
  const ozoner: TDataozoner = store.getState().accountReducer.ozoner;
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);

  useEffect(() => {
    getOzonerLocation()
    .then((coords)=>{
      fetchOzonerGeolocation(coords)
      .then(res=>console.log("coords saved!"));
    });
  }, []);

  useEffect(() => {
    if (credit === undefined) {
      history.push("/");
    }
  }, [credit]);

  return (
    <div className="p_t_xl">
      <div className="main-cont-detail dso_container">
        <Grid container direction="row" spacing={3}>
          <Grid item xs={12} sm={12} md={4}>
            {credit && creditTotals && lastPayment && (
              <CardAccount
                credit={credit}
                creditTotals={creditTotals}
                lastPayment={lastPayment}
              />
            )}
          </Grid>
          {vehicle && <VehiclePayment vehicle={vehicle} />}
        </Grid>
      </div>
      <div className="dso_container m_y_xl">
        <Typography weight="600" scale="large" className="m_b_md">
          Tus <span className="text_primary_300">transacciones</span>{" "}
        </Typography>
        <div className="tablepayment">
          <CreditPaymentsTable
            loading={loading}
            credit={credit}
          />
        </div>
      </div>
      {/*<ContactHelper />*/}
    </div>
  );
};
