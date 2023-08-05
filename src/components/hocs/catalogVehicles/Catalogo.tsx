/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-nested-ternary */
import Grid from "@material-ui/core/Grid";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect, useCallback, ChangeEvent } from "react";
import ReactGA from "react-ga4";
import { useHistory } from "react-router-dom";

import _ from "lodash";
import { RootState } from "store/index";
import { Typography, Button } from "@ecommerce-ozon/design_system";
import { CardViewMX } from "components/hocs/card/CardViewMX";
import yellow from "static/images/banner/yellow.png";
import { fetchVehiclesThunk, updateSelectedFilters } from "store/actions/vehicles";
import useVehicles from "hooks/useVehicles";
import VehicleCardPlaceHolder from "../../placeholders/vehicleCardPlaceHolder/VehicleCardPlaceHolder";
import IdealVehicleBanner from "./IdealVehicleBanner";
import VehiclesFilters from "./vehiclesFilters/VehiclesFilters";
import useCurrentCity from "../../../hooks/useCurrentCity";
import useTrackPixelOnMount from "../../../hooks/FacebookPixel/useTrackPixelOnMount";

export interface FilterFormValues {
  year: string;
  cylinder: string;
  kmFrom?: number;
  kmTo?: number;
  brand: string;
  text: string;
}

const INIT_FILTER_VALUES: FilterFormValues = {
  year: "",
  cylinder: "",
  kmFrom: undefined,
  kmTo: undefined,
  brand: "",
  text: ""
};

export const Catalogo = () => {
  const history = useHistory();

  const [vehiclesFiltered, setvehiclesFiltered] = useState<any>();
  const [filterEnabled, setFilterEnabled] = useState<boolean>(false);
  const { country } = useSelector((state: RootState) => state.countryReducer);
  const dispatch = useDispatch();
  const {
    loading: vehiclesLoading,
    error: vehiclesError,
    data: { vehicles, filters: selectFilters }
  } = useVehicles();
  const city = useCurrentCity();

  const [filterForm, updateForm] = useState(INIT_FILTER_VALUES);

  useTrackPixelOnMount("ViewContent");

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Catálogo en Ozon";
    //   ReactGA.send({ hitType: "pageview", page: history.location.pathname });
  }, []);

  const ozocio = () => {
    // Event analyctics
    ReactGA.event("CTA_ozocio_catalog", {
      category: "Ozocio",
      label: "click cards's button from catalog view to ozocio landing view"
    });
    history.push("/vende-tu-moto");
  };
  const finan = () => {
    // Event analyctics
    ReactGA.event("CTA_Financial_catalog", {
      category: "Financial Form",
      label: "click cards's button from catalog view to financial search view"
    });
    history.push("/financia-tu-moto");
  };
  const scrollTop = () => {
    window.focus();
    window.scrollTo(0, 0);
  };

  const filterByCountry = useCallback(
    (veh: any[]) => veh?.filter((vehi) => vehi.country.iso === country),
    [country]
  );
  const getBaseVehicles = useCallback(
    () => filterByCountry(vehicles),
    [filterByCountry, vehicles]
  );

  const filterVehicles = useCallback(() => {
    setvehiclesFiltered(
      getBaseVehicles().filter(
        (elem: any) =>
          (filterForm.year.length > 2
            ? elem.details.year === parseInt(filterForm.year, 10)
            : true) &&
          (filterForm.cylinder.length > 2
            ? elem.cylindersCapacity.value === filterForm.cylinder
            : true) &&
          (filterForm.brand.length > 2
            ? elem.brand.name === filterForm.brand
            : true) &&
          (filterForm.kmTo
            ? Number(elem.details.milage) <= filterForm.kmTo
            : true) &&
          (filterForm.text
            ? (elem.brand?.name &&
              elem.brand?.name
                ?.toLowerCase()
                .includes(filterForm.text.toLowerCase())) ||
            (elem.cylindersCapacity?.value &&
              elem.cylindersCapacity?.value
                  ?.toLowerCase()
                .includes(filterForm.text.toLowerCase()
              ))
            : true)
      )
    );
    // event analytics
    ReactGA.event("CTA_catalog_filter", {
      category: "Marketplace",
      label: "Params ( brand, year and cylinder) click button filter ",
      brand: filterForm.brand,
      year: filterForm.year,
      cylinder: filterForm.cylinder
    });
  }, [
    filterForm.brand,
    filterForm.cylinder,
    filterForm.kmTo,
    filterForm.text,
    filterForm.year,
    getBaseVehicles
  ]);

  const resetVehicles = useCallback(() => {
    setvehiclesFiltered(getBaseVehicles());
  }, [getBaseVehicles, setvehiclesFiltered]);

  const clearFilters = useCallback(() => {
    updateForm({ ...INIT_FILTER_VALUES });
    resetVehicles();
  }, [updateForm, resetVehicles]);

  useEffect(() => {
    dispatch(fetchVehiclesThunk({ filters: { city } }));
  }, [dispatch, city]);

  useEffect(() => {
    scrollTop();
  }, []);

  useEffect(() => {
    if (!vehiclesLoading && !vehiclesError) {
      if (country === "CO") {
        setvehiclesFiltered([]);
      } else {
        setvehiclesFiltered(getBaseVehicles());
      }
    }
  }, [country, getBaseVehicles, vehicles, vehiclesError, vehiclesLoading]);

  useEffect(() => {
    setFilterEnabled(!!Object.values(filterForm).some((elem) => !!elem));
  }, [filterForm]);

  function fillForm(
    prop: string,
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) {
    updateForm({
      ...filterForm,
      [prop]: event.target.value
    });
  }

  return (
    <div className="dso_container">
      <Typography
        scale="heading4"
        weight="600"
        className="text_center p_y_xxl "
      >
        <span className="text_primary_300">Busquemos</span> tu motocicleta ideal
      </Typography>
      {selectFilters && (
        <VehiclesFilters
          filterForm={filterForm}
          selectFilters={selectFilters}
          filterVehicles={filterVehicles}
          resetVehicles={resetVehicles}
          clearFilters={clearFilters}
          fillForm={fillForm}
          filterEnabled={filterEnabled}
        />
      )}
      <Grid
        container
        direction="row"
        alignItems="center"
        spacing={2}
        className="vehicle-grid"
      >
        {!vehiclesLoading && !vehiclesError && vehiclesFiltered ? (
          vehiclesFiltered.map((vehicle: any, index: any) => (
            <React.Fragment key={uuidv4()}>
              <Grid item xs={6} md={3}>
                <CardViewMX vehicle={vehicle} />
              </Grid>
              {(index === 7 || index === vehiclesFiltered.length - 1) && (
                <IdealVehicleBanner
                  key={uuidv4()}
                  country={country}
                  finan={finan}
                  className="display_none_desktop"
                />
              )}
            </React.Fragment>
          ))
        ) : vehiclesLoading ? (
          <>
            {
              // eslint-disable-next-line no-shadow
              _.range(24).map((_) => (
                <Grid key={uuidv4()} item xs={6} md={3}>
                  <VehicleCardPlaceHolder />
                </Grid>
              ))
            }
          </>
        ) : (
          "Se produjo un error vuelva a cargar la pagina"
        )}
        {!vehiclesLoading &&
          !vehiclesError &&
          vehiclesFiltered &&
          vehiclesFiltered?.length < 1 && (
            <>
              <Typography
                className="m_b_xl text_center"
                scale="heading4"
                weight="600"
              >
                No se encontraron vehículos
              </Typography>
              <IdealVehicleBanner
                key="idealVehicleBanner"
                country={country}
                finan={finan}
                className="display_none_desktop"
              />
            </>
          )}
      </Grid>
      <Grid
        container
        direction="row"
        className="m_y_xxxl display_none_mobile"
        justifyContent="center"
        spacing={3}
      >
        {country === "MX" ? (
          <>
            <IdealVehicleBanner
              country={country}
              finan={finan}
              className="display_none_mobile"
            />
            <Grid item xs={12} md={6} className="p_l_lg">
              <Grid
                container
                direction="row"
                className="dso_card bg_neutral_900 p_y_none p_x_md display_none_mobile m_b_xxxl"
                justifyContent="center"
                spacing={3}
              >
                <Grid item xs={12} md={6}>
                  <img src={yellow} alt="" className="w_100_per" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <div className="center_y">
                    <Typography scale="large" weight="600" className="m_b_lg">
                      {" "}
                      En Ozon también compramos tu moto
                    </Typography>
                    <Typography scale="small" weight="600" className="m_b_lg">
                      {" "}
                      Al mejor precio y en 1 día
                    </Typography>
                    <Typography scale="small" weight="400" className="m_b_xxl">
                      {" "}
                      Conoce el precio en el que te compramos tu motocicleta
                      haciendo clic aquí
                    </Typography>
                    <Button scale="small" className="w_80_per" onClick={ozocio}>
                      Vende tu moto
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            <Grid
              container
              direction="row"
              className="dso_card bg_neutral_900 p_y_none p_x_xxl display_none_mobile m_b_xxxl"
              justifyContent="center"
              spacing={3}
            >
              <Grid item xs={12} md={6}>
                <img src={yellow} alt="" className="w_100_per" />
              </Grid>
              <Grid item xs={12} md={6}>
                <div className="center_y">
                  <Typography scale="heading2" weight="600" className="m_b_lg">
                    {" "}
                    En Ozon también compramos tu moto
                  </Typography>
                  <Typography scale="heading4" weight="600" className="m_b_lg">
                    {" "}
                    Al mejor precio y en 1 día
                  </Typography>
                  <Typography scale="large" weight="400" className="m_b_xxl">
                    {" "}
                    Conoce el precio en el que te compramos tu motocicleta
                    haciendo clic aquí
                  </Typography>
                  <Button className="w_80_per" onClick={ozocio}>
                    Vende tu moto
                  </Button>
                </div>
              </Grid>
            </Grid>

            <Grid
              container
              direction="row"
              className="dso_card bg_neutral_900 p_y_none display_none_desktop m_b_xxxl"
              justifyContent="center"
              spacing={3}
            >
              <Grid item xs={12} md={6}>
                <Typography scale="large" weight="600" className="m_b_lg">
                  {" "}
                  En Ozon también compramos tu moto
                </Typography>
                <Typography scale="small" weight="600" className="m_b_lg">
                  {" "}
                  Al mejor precio y en 1 día
                </Typography>
                <Typography scale="small" weight="400" className="m_b_xxl">
                  {" "}
                  Conoce el precio en el que te compramos tu motocicleta
                  haciendo clic aquí
                </Typography>
                <Button scale="small" className="w_100_per" onClick={ozocio}>
                  Vende tu moto
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <img src={yellow} alt="" className="w_100_per" />
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
};
