import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import { Layout } from "components/layouts/Layout";
import { HomeScreen } from "views/HomeScreen";
// import { DetailsVeh } from "views/DetailsVeh";

// actions
import { changeCountry } from "store/actions/country";

// views
import { NotFound } from "views/NotFound";

import { Terms } from "views/Terms";
import { Privacy } from "views/Privacy";
import Faqs from "views/faqs/Faqs";

import { Homeozo } from "views/HomeOzocio/Homeozo";
import CreditCalculation from "views/creditCalculation/CreditCalculation";
import CreditCalculationResults from "views/creditCalculation/results/CreditCalculationResults";
import { Ozoner } from "views/ozoner/Ozoner";
import { Ozocio } from "views/ozocio/Ozocio";
import { Separate } from "views/separate/Separate";
import { MiCuenta } from "views/account/MiCuenta";
import { DetailsView } from "views/DetailsView/DetailsView";
import { Palenca } from "components/palenca/Palenca";
// import { OzocioLanding } from "views/ozocioLanding/OzocioLanding";
import ValidateIdentityView from "../views/validateIdentity/ValidateIdentityView";
import Catalog from "../components/catalog/Catalog";
import NewCatalog from "../components/catalog/NewCatalog";
import NewDetailsView from "../views/DetailsView/NewDetailsView";
import ScrollToTop from "../components/scrollToTop/ScrollToTop";
import NoAvailableVehicle from "../views/noAvailableVehicle/NoAvailableVehicle";

export const RootRouter = () => {
  const dispatch = useDispatch();
  const getGeoInfo = () => {
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        const { data } = response;

        let isoCountry = "";
        if (data.country === "MX" || data.country === "CO") {
          isoCountry = data.country === "MX" ? "MX" : "CO";
        } else {
          isoCountry = "MX";
        }

        localStorage.setItem("country-ozon", `${isoCountry}`);
        dispatch(changeCountry(isoCountry));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getGeoInfo();
  }, [dispatch]);

  return (
    <Router>
      <ScrollToTop />
      <Layout>

          <Switch>
            <Route exact path="/" component={HomeScreen} />
            <Route exact path="/vehicle/:id" component={NewDetailsView} />
             {/*<Route exact path="/vehicle-new/:id" component={DetailsView} />*/}
            <Route exact path="/micuenta" component={MiCuenta} />
            <Route exact path="/micuenta/:id" component={MiCuenta} />
            {/* <Route exact path='/subscription' component={Subscription}/>
                    <Route exact path='/subscription/state/approved' component={Approved}/>
                    <Route exact path='/subscription/state/rejected' component={rejected}/>
                    <Route exact path='/subscription/state/pending' component={Pending}/> */}

            <Route exact path="/separate" component={Separate} />
            <Route exact path="/faqs" component={Faqs} />
            <Route exact path="/terminos-y-condiciones" component={Terms} />
            <Route exact path="/privacy" component={Privacy} />
            <Route exact path="/offererdate" component={Ozoner} />
            <Route exact path="/vende-tu-moto" component={Homeozo} />
            <Route exact path="/catalogo" component={NewCatalog} />
            <Route exact path="/formulario-vende-tu-moto" component={Ozocio} />
            <Route exact path="/palenca" component={Palenca} />
            <Route exact path="/vehiculo-no-disponible" component={NoAvailableVehicle} />

            <Route
              exact
              path="/financia-tu-moto"
              component={CreditCalculation}
            />
            <Route
              exact
              path="/financia-tu-moto/results/:selectedVehicleId?"
              component={CreditCalculationResults}
            />
            <Route
              exact
              path="/validateIdentity/:id?"
              component={ValidateIdentityView}
            />

            {/* <Route exact path='/vende-tu-moto' component={OzocioLanding}/>
                    <Route exact path='/formulario-vende-tu-moto' component={OffererRegister}/> */}
            <Route component={NotFound} />
          </Switch>
      </Layout>
    </Router>
  );
};
