/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */

import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import "./Catalog.scss";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";
import {
  Button,
  Input,
  Typography,
  Tag,
  useDevice,
  OzonSelect,
} from "@ecommerce-ozon/design_system";

import { ReactComponent as Motocycle } from "@ecommerce-ozon/design_system/dist/public/static/icons/motorcycle.svg";
import { ReactComponent as Filter } from "@ecommerce-ozon/design_system/dist/public/static/icons/filter-descending.svg";
import { Grid, Pagination } from "@mui/material";

import { useMediaQuery, makeStyles } from "@material-ui/core";
import { ReactComponent as Quad } from "../../static/icons/cuadricula.svg";
// import { ReactComponent as List } from "../../static/icons/listado.svg";
import {
  clearSelectedFilters,
  fetchVehiclesThunk,
  updateSelectedFilters,
} from "../../store/actions/vehicles";
import useCurrentCity from "../../hooks/useCurrentCity";
import useVehicles from "../../hooks/useVehicles";
import VehicleListItem from "./vehicleListItem/VehicleListItem";
import { TVehicle } from "../../models/vehicle.interface";
// import VehicleCardItem from "./vehicleCard/VehicleCardItem";
import Sidebar from "./Sidebar";
import { SelectedFilters } from "../../store/reducers/vehiclesReducer";
import FiltersModal from "./FiltersModal";
import InputSearchTextFilter from "./InputSearchTextFilter";
import SkeletonCard from "../skeletonCard/SkeletonCard";
import CatalogBanner from "../catalogBanner/CatalogBanner";
// import {Card} from "../../views/separate/views/paymentMethods/card/Card";
// import OzonCardVehicle from "../cards/OzonCardVehicle";
import OzonCardVehiclesPagination from "../ozonCardVehiclesPagination/OzoneCardVehiclesPagination";
import { translateColorValues } from "../../helpers/translateColorValues";

interface Props {}

type OrderType =
  | "mas_populares"
  | "en_promocion"
  | "menor_cc"
  | "mayor_cc"
  | "menor_a_mayor"
  | "mayor_a_menor"
  | "menor_km"
  | "mayor_km";
type ItemType = "list" | "card";

const scrollTop = () => {
  window.focus();
  window.scrollTo(0, 0);
};

const VehicleListContainer = ({ vehicles }: { vehicles: TVehicle[] }) => {
  const history = useHistory();
  return (
    <div className="display_flex flex_col" style={{ gap: 32 }}>
      {vehicles.map((vehicle, idx) => (
        <VehicleListItem
          key={`VehicleListContainer-${idx}`}
          vehicle={vehicle}
          onClick={() => {
            history.push(`/vehicle/${vehicle.internalId}`);
          }}
        />
      ))}
    </div>
  );
};

const Catalog: FC<Props> = () => {
  const { search } = useLocation();
  const { creditScore } = queryString.parse(search);

  const matchesXS = useMediaQuery("(min-width:600px)");

  const itemsPerPage = 30;

  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(true);
  const [order, setOrder] = useState<OrderType>("mas_populares");
  const [itemType, setItemType] = useState<ItemType>("card");
  const { isMobile } = useDevice();
  const dispatch = useDispatch();
  const city = useCurrentCity();
  const {
    loading: vehiclesLoading,
    selectedFilters,
    error: vehiclesError,
    data: { vehicles, filters },
  } = useVehicles();
  const showCardItems = itemType === "card" || isMobile;
  const [modalOpen, setModalOpen] = useState(false);

  const getDiscountValue = (vehicle: TVehicle) => {
    if (vehicle.discounts?.length === 0) {
      return 0;
    }
    const vehicleDiscounts = vehicle.discounts![0];
    return (
      (vehicleDiscounts.percentageValue || vehicleDiscounts.netValue) * 100
    );
  };

  const getWeeksVehicles = (selectedWeeks: any[], availableWeks: any[]) => {
    return selectedWeeks.some((item: any) => availableWeks.includes(item));
  };

  const filterVehicles = useMemo(
    () =>
      vehicles
        ? _.sortBy(
            _.filter(vehicles, (vehicle) => {
              if (!selectedFilters) return true;
              const keys = Object.keys(selectedFilters);
              if (keys.length === 0) return true;
              return keys.every((key) => {
                switch (key) {
                  case "brand":
                    return vehicle.brand.name === selectedFilters.brand;
                  case "weeks":
                    // return   getWeeksVehicles(selectedFilters.weeks, vehicle.creditTime); //todo: arreglar
                    // return  selectedFilters.weeks.some(item => vehicle.creditTime.includes(item));
                    return vehicle.creditTime.some((item) =>
                      selectedFilters.weeks.includes(item)
                    );
                  case "color":
                    return vehicle.color === selectedFilters.color;
                  case "range":
                    return (
                      vehicle.getWeeklyPrice(52) > selectedFilters.range[0] &&
                      vehicle.getWeeklyPrice(52) < selectedFilters.range[1]
                    );
                  case "cylinder":
                    return (
                      Number(vehicle.cylindersCapacity.value) ===
                      Number(selectedFilters.cylinder)
                    );
                  case "year":
                    return (
                      Number(vehicle.details.year) ===
                      Number(selectedFilters.year)
                    );
                  case "kmTo":
                    return (
                      Number(vehicle.details.milage) <=
                      Number(selectedFilters.kmTo)
                    );
                  case "searchText":
                    return (
                      vehicle.brand.name
                        .toLowerCase()
                        .includes(selectedFilters.searchText.toLowerCase()) ||
                      vehicle.cylindersCapacity.value
                        .toLowerCase()
                        .includes(selectedFilters.searchText.toLowerCase()) ||
                      vehicle.model.name
                        .toLowerCase()
                        .includes(selectedFilters.searchText.toLowerCase()) ||
                      vehicle.internalId
                        .toLowerCase()
                        .includes(selectedFilters.searchText.toLowerCase()) ||
                      selectedFilters.searchText
                        .toLowerCase()
                        .includes(
                          `${vehicle.brand.name.toLowerCase()} ${vehicle.model.name.toLowerCase()}`
                        )
                    );
                  default:
                    return true;
                }
              });
            }),
            (vehicle) => {
              switch (order) {
                case "mas_populares":
                  return (vehicle.score || 0) * -1;
                case "en_promocion":
                  return getDiscountValue(vehicle) * -1;
                case "menor_km":
                  return Number(vehicle.details?.milage);
                case "mayor_km":
                  return Number(vehicle.details?.milage) * -1;
                case "menor_cc":
                  return Number(vehicle.cylindersCapacity?.value);
                case "mayor_cc":
                  return Number(vehicle.cylindersCapacity?.value) * -1;
                case "menor_a_mayor":
                  return vehicle.getWeeklyPrice();
                case "mayor_a_menor":
                  return vehicle.getWeeklyPrice() * -1;
                default:
                  return 0;
              }
            }
          )
        : [],
    [vehicles, filters, order, selectedFilters]
  );

  // const matchesMD = useMediaQuery("(max-width: 1570px)");
  // const matchesLG = useMediaQuery("(max-width: 1970px)");
  const matchesXL = useMediaQuery("(max-width: 1500px)");
  const matchesXXL = useMediaQuery("(max-width: 1900px)");
  const matchesUW = useMediaQuery("(min-width: 1900px)");

  const seCardWrapperPadding = () => {
    if (matchesXL) {
      return {
        left: "1%",
        right: "1%",
      };
    }
    if (matchesXXL) {
      return {
        left: "10%",
        right: "10%",
      };
    }

    if (matchesUW) {
      return {
        left: "20%",
        right: "20%",
      };
    }
    return {
      left: "0%",
      right: "0%",
    };
  };

  const onChangeItemType = (type: ItemType) => {
    setItemType(type);
    scrollTop();
  };

  useEffect(() => {
    scrollTop();
  }, []);

  useEffect(() => {
    dispatch(fetchVehiclesThunk({ filters: { city } }));
  }, [city, dispatch]);

  const orderOptions = [
    { label: "Más Populares", value: "mas_populares" },
    { label: "En Promoción", value: "en_promocion" },
    { label: "Menor Precio", value: "menor_a_mayor" },
    { label: "Mayor Precio", value: "mayor_a_menor" },
    { label: "Menos CC", value: "menor_cc" },
    { label: "Más CC", value: "mayor_cc" },
    { label: "Menos KM", value: "menor_km" },
    { label: "Más KM", value: "mayor_km" },
  ];

  const listStartRef = useRef<null | HTMLDivElement>(null);

  const handleChange = (event: any, value: any) => {
    setCurrentPage(value);
    listStartRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    if (creditScore) {
      const number = +creditScore;
      dispatch(updateSelectedFilters("range", [0, number]));
    }
  }, [creditScore]);

  return (
    <div className="catalog-container">
      <Sidebar
        onSidebarExpanded={(value) => {
          setOpen(value);
        }}
        open={open}
        setCurrentPage={setCurrentPage}
      />
      <article>
        <section className="display_none_desktop display_flex flex_col ">
          <div
            style={{
              position: "fixed",
              width: "100%",
              backgroundColor: "white",
              zIndex: 5,
            }}
          >
            <Typography
              scale="medium"
              weight="600"
              className="text_center p_t_lg "
            >
              <span className="text_primary_300">Busquemos</span> tu motocicleta
              ideal 👍
            </Typography>
            <div className="p_x_lg">
              <InputSearchTextFilter withButton />
            </div>
            <div
              className="display_flex p_x_lg"
              style={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <Button onClick={() => setModalOpen(true)} icon={<Filter />}>
                Filtros ({_.filter(selectedFilters, (e) => !!e).length})
              </Button>
              <div className="display_flex flex_align_center">
                <Typography
                  scale="xsmall"
                  weight="400"
                  className="text_neutral_600 m_r_sm"
                >
                  Ordenar por:
                </Typography>
                {/* mobile  */}
                {/* <Input */}
                {/*  name="creditTime" */}
                {/*  options={orderOptions} */}
                {/*  title="" */}
                {/*  onChange={(e) => { */}
                {/*    setOrder(e.target.value as OrderType); */}
                {/*  }} */}
                {/*  value={order} */}
                {/*  type="select" */}
                {/* />   */}
                <OzonSelect
                  fieldName="order"
                  itemsLabel="Ordenar Por"
                  options={orderOptions}
                  values={order}
                  handleChange={(e: React.ChangeEvent<{ value: unknown }>) => {
                    setOrder(e.target.value as OrderType);
                    setCurrentPage(1);
                  }}
                  isFormikForm={false}
                />
              </div>
            </div>
            <div
              className="display_none_desktop"
              style={{
                display: "flex",
                marginTop: 20,
                paddingBottom: 10,
                justifyContent: "center",
                boxShadow: " 0px 15px 10px -15px #111",
              }}
            >
              <Pagination
                count={Math.ceil((filterVehicles?.length || 1) / itemsPerPage)}
                page={currentPage}
                onChange={handleChange}
                variant="outlined"
                shape="rounded"
              />
            </div>
          </div>
        </section>
        {/*todo: Change on new layout */}
        <div ref={listStartRef} />
        <section className="order-panel display_none_mobile">
          <div className="display_flex flex_align_center flex_justify_end m_t_xl m_r_xl">
            <div className="cursor_pointer display_flex flex_align_center m_r_xxl">
              <Quad
                className={`m_r_md  ${
                  itemType === "card" ? "text_neutral_800" : "text_neutral_500"
                }`}
                onClick={() => onChangeItemType("card")}
              />
              {/* <List */}
              {/*  className={`m_r_md ${ */}
              {/*    itemType === "list" ? "text_neutral_800" : "text_neutral_500" */}
              {/*  }`} */}
              {/*  onClick={() => onChangeItemType("list")} */}
              {/* /> */}
            </div>
            <div className="display_flex flex_align_center">
              <Typography
                scale="xsmall"
                weight="400"
                className="text_neutral_600 m_r_sm"
              >
                Ordenar por:
              </Typography>

              <div className="shadow_hard" style={{ width: "10%" }}>
                <OzonSelect
                  fieldName="order"
                  itemsLabel="Ordenar Por"
                  options={orderOptions}
                  values={order}
                  handleChange={(e: React.ChangeEvent<{ value: unknown }>) => {
                    setOrder(e.target.value as OrderType);
                    setCurrentPage(1);
                  }}
                  isFormikForm={false}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="filter-panel display_none_mobile">
          {vehicles && vehicles.length > 0 && !vehiclesLoading && (
            <div className="display_flex m_l_xl flex_align_center">
              <Typography scale="medium" className="display_flex" weight="400">
                <b className="m_r_xs">{filterVehicles.length} </b> moto
                {filterVehicles.length !== 1 ? "s" : ""}
              </Typography>

              {selectedFilters && Object.keys(selectedFilters).length
                ? Object.keys(selectedFilters).map((key, idx) => {
                    if (
                      !selectedFilters ||
                      !selectedFilters[key as keyof SelectedFilters]
                    )
                      return <div key={idx} />;

                    let tagValue: string = `${
                      selectedFilters[key as keyof SelectedFilters]
                    }`;
                    if (
                      Object.prototype.hasOwnProperty.call(
                        selectedFilters,
                        "color"
                      )
                    ) {
                      const nextFilters = translateColorValues(selectedFilters);
                      tagValue = `${nextFilters[key as keyof SelectedFilters]}`;
                    }
                    if (key === "range") {
                      // tagValue = `${selectedFilters[key as keyof SelectedFilters]}`;
                      const fromRange = selectedFilters.range[0];
                      const toRange = selectedFilters.range[1];
                      tagValue = `Desde: $${fromRange}-Hasta: $${toRange}`;
                    }

                    return (
                      <div
                        key={idx}
                        className="m_l_sm"
                        style={{ backgroundColor: "white" }}
                      >
                        {/* eslint-disable-next-line no-nested-ternary */}
                        <Tag
                          value={`${tagValue.toUpperCase()} ${
                            key === "cylinder"
                              ? "CC"
                              : key === "kmTo"
                              ? "KM"
                              : ""
                          }`}
                          icon={<Motocycle />}
                          onDelete={() => {
                            dispatch(
                              updateSelectedFilters(
                                key as keyof SelectedFilters,
                                undefined
                              )
                            );
                          }}
                        />
                      </div>
                    );
                  })
                : null}
              <Button
                onClick={() => {
                  dispatch(clearSelectedFilters());
                }}
                variant="link"
                scale="small"
              >
                <Typography
                  weight="400"
                  className="text_secondary_600"
                  scale="small"
                >
                  Borrar todos
                </Typography>
              </Button>
            </div>
          )}
        </section>
        <section
          style={{
            // height: !matchesXS ?   "80vh" : "74vh",
            marginTop: !matchesXS ? "25vh" : "0",
          }}
          key={`${order} ${JSON.stringify(selectedFilters)}`}
          className="main  "
        >
          <div
            style={{
              paddingLeft: seCardWrapperPadding().left,
              paddingRight: seCardWrapperPadding().right,
            }}
          >
            {/* eslint-disable-next-line no-nested-ternary */}
            {vehiclesLoading ? (
              <div className="m_t_md">
                <SkeletonCard
                  showItems={6}
                  columnsPerCard={!matchesXS ? 12 : 4}
                />
              </div>
            ) : (
              <div>Error</div>
            )}
          </div>
        </section>
        <div
          className="display_none_mobile"
          style={{ display: "flex", padding: 20, justifyContent: "center" }}
        >
          <Pagination
            count={Math.ceil((filterVehicles?.length || 1) / itemsPerPage)}
            page={currentPage}
            onChange={handleChange}
            variant="outlined"
            shape="rounded"
          />
        </div>
        <CatalogBanner />
      </article>
      <FiltersModal
        open={modalOpen}
        setOpen={setModalOpen}
        filterVehicles={filterVehicles}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Catalog;
