/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */

import React, { useEffect, useMemo, useRef, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import Select, { Theme, components } from "react-select";

import {
  Container,
  Grid,
  Pagination,
  PaginationItem,
  PaginationRenderItemParams,
  useMediaQuery,
} from "@mui/material";
import {
  Button,
  OzonSelect,
  Tag,
  Typography,
  useDevice,
} from "@ecommerce-ozon/design_system";
import { ReactComponent as Motocycle } from "@ecommerce-ozon/design_system/dist/public/static/icons/motorcycle.svg";
import { ReactComponent as Filter } from "@ecommerce-ozon/design_system/dist/public/static/icons/filter-descending.svg";
import { ReactComponent as ChevronDown } from "@ecommerce-ozon/design_system/dist/public/static/icons/chevron-down.svg";
import {
  VehicleData,
  VehiclesQueryData,
} from "models/graphql/fecthVehicle.graphql";
import { useHistory, useLocation } from "react-router-dom";

import { styled } from "@mui/material/styles";

import queryString from "query-string";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import CatalogBanner from "../catalogBanner/CatalogBanner";
import SkeletonCard from "../skeletonCard/SkeletonCard";
import OzonCardVehiclesPagination from "../ozonCardVehiclesPagination/OzoneCardVehiclesPagination";
import useCurrentCity from "../../hooks/useCurrentCity";
import useVehicles from "../../hooks/useVehicles";
import { TVehicle } from "../../models/vehicle.interface";
import {
  clearSelectedFilters,
  fetchVehiclesThunk,
  fetchVehiclesUpdateCity,
  updateSelectedFilters,
} from "../../store/actions/vehicles";
// import VehicleListItem from "./vehicleListItem/VehicleListItem";
import NewSideBar from "./NewSideBar";

import InputSearchTextFilter from "./InputSearchTextFilter";
import FiltersModal from "./FiltersModal";
import { SelectedFilters } from "../../store/reducers/vehiclesReducer";
import { translateColorValues } from "../../helpers/translateColorValues";
import useScrollDirection from "../../hooks/useScrollDirection";

import "./NewCatalog.css";
import { Cities } from "../../store/reducers/cityReducer";
import { RootState } from "../../store";
import { shuffleArray } from "../../helpers/ common";

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

const StyledPaginationItem = styled(PaginationItem)(({ theme }) => ({
  borderRadius: "10px",
  minWidth: 36,
  fontSize: "14px",
  "&:hover": {
    borderRadius: "10px",
    backgroundColor: "#FDE9D3",
    color: "#FE8A02",
  },
  "&.Mui-selected": {
    borderRadius: "10px",
  },
}));

const CustomPaginationItem = (props: PaginationRenderItemParams) => {
  return <StyledPaginationItem shape="rounded" variant="outlined" {...props} />;
};

const ChevronDownIcon = () => {
  return <ChevronDown />;
};

const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <ChevronDownIcon />
    </components.DropdownIndicator>
  );
};

const NewCatalog = () => {
  const VEHICLES_QUERY = gql`
    query getAllVehicles(
      $search: String
      $visible: Boolean
      $status: String
      $page: Int
      $brand: String
      $model: String
      $cylindersCapacity: String
    ) {
      getAll(
        search: $search
        visible: $visible
        status: $status
        page: $page
        brand: $brand
        model: $model
        cylindersCapacity: $cylindersCapacity
      ) {
        pages
        page
        count
        data {
          internalId
          details {
            year
            milage
          }
          brand {
            name
          }
          model {
            name
          }
          cylindersCapacity {
            value
          }
          city {
            name
          }
          images {
            url
          }
          discounts {
            status
            type
            netValue
            percentageValue
          }
          salePrices {
            weeks52 {
              paymentWeek
            }
            weeks78 {
              paymentWeek
            }
            weeks78 {
              paymentWeek
            }
          }
          suffix
          creditTime
        }
      }
    }
  `;

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
  const [vehiclesGQL, setvehiclesGQL] = useState<VehicleData[]>([]);
  const {
    loading: vehiclesLoading,
    selectedFilters,
    error: vehiclesError,
    data: { filters },
  } = useVehicles();
  const showCardItems = itemType === "card" || isMobile;
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    document.title = "OZON | Catálogo";
  }, []);

  const { data, loading, error } = useQuery<VehiclesQueryData>(VEHICLES_QUERY, {
    variables: {
      search: selectedFilters?.searchText || "",
      visible: true,
      status: "available",
      page: currentPage,
      brand: selectedFilters?.brand || "",
      model: selectedFilters?.model || "",
      cylindersCapacity:
        (selectedFilters?.cylinder !== undefined &&
          String(selectedFilters?.cylinder)) ||
        "",
    },
  });

  useEffect(() => {
    if (data) {
      setvehiclesGQL(data.getAll.data);
      setCurrentPage(data.getAll.page);
    }
  }, [data]);

  useEffect(() => {
    scrollTop();
  }, []);

  useEffect(() => {
    dispatch(fetchVehiclesThunk({ filters: { city } }));
  }, [city, dispatch]);

  interface IOrderoptions {
    value: string;
    label: string;
  }

  const orderOptions: IOrderoptions[] = [
    { label: "Más Populares", value: "mas_populares" },
    { label: "En Promoción", value: "en_promocion" },
    { label: "Menor Precio", value: "menor_a_mayor" },
    { label: "Mayor Precio", value: "mayor_a_menor" },
    { label: "Menos CC", value: "menor_cc" },
    { label: "Más CC", value: "mayor_cc" },
    { label: "Menos KM", value: "menor_km" },
    { label: "Más KM", value: "mayor_km" },
  ];

  const [selectedOption, setSelectedOption] = useState<any>(orderOptions[0]);

  // eslint-disable-next-line no-shadow
  const handleSelectChange = (selectedOption: any) => {
    setOrder(selectedOption.value);
    setCurrentPage(1);
    setSelectedOption(selectedOption);
  };

  const listStartRef = useRef<null | HTMLDivElement>(null);

  const handleChange = (event: any, value: any) => {
    setCurrentPage(value);
    // listStartRef.current?.scrollIntoView({behavior:"smooth", block:"start", inline:"nearest"});
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  useEffect(() => {
    if (creditScore) {
      const number = +creditScore;
      dispatch(updateSelectedFilters("range", [0, number]));
    }
  }, [creditScore]);

  const [navBg, setNavBg] = useState(false);

  const changeNavBg = () => {
    // eslint-disable-next-line no-unused-expressions
    window.scrollY >= 20 ? setNavBg(true) : setNavBg(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNavBg);
    return () => {
      window.removeEventListener("scroll", changeNavBg);
    };
  }, []);

  const customTheme = (theme: Theme) => ({
    ...theme,
    borderRadius: 4,
    backgroundColor: "black",
    colors: {
      ...theme.colors,
      primary25: "#FFD8AB",
      primary: "#FE8A02",
      neutral0: "white",
      neutral80: "#FE8A02",
    },
  });

  const scrollDirection = useScrollDirection();
  const [selectedTotalFilters, setSelectedTotalFilters] = useState<number>(0);

  useEffect(() => {
    const totalfiltros = _.filter(selectedFilters, (e) => !!e).length;

    if (
      selectedFilters &&
      "weeks" in selectedFilters &&
      selectedFilters.weeks.length === 3
    ) {
      setSelectedTotalFilters(totalfiltros - 1);
    } else {
      setSelectedTotalFilters(totalfiltros);
    }
  }, [selectedFilters]);

  return (
    <div ref={listStartRef} style={{ backgroundColor: "rgb(231,232,235)" }}>
      {/*mobile section filters start*/}
      <section className="display_none_desktop display_flex flex_col">
        <div
          className={`mobile_header_sitcky  animate__animated ${
            scrollDirection === "down"
              ? "animate__slideOutUp"
              : "animate__slideInDown"
          }`}
        >
          <div className="p_x_lg">
            <InputSearchTextFilter withButton />
          </div>
          <div
            className="display_flex p_x_lg"
            style={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Button
              scale="small"
              className="m_r_md"
              onClick={() => setModalOpen(true)}
              icon={<Filter />}
            >
              Filtros ({selectedTotalFilters})
            </Button>
            <div className="display_flex flex_align_center">
              <Typography
                scale="xsmall"
                weight="400"
                className="text_neutral_600 m_r_sm"
              >
                Ordenar por:
              </Typography>
              <Select
                isClearable={false}
                isSearchable={false}
                options={orderOptions}
                value={selectedOption}
                onChange={handleSelectChange}
                placeholder="Seleccionar opción"
                theme={customTheme}
                components={{ DropdownIndicator }}
              />
            </div>
          </div>
        </div>
      </section>
      {/*mobile section filters ends*/}
      <Container maxWidth="xl" style={{ padding: 0 }}>
        <Grid container spacing={0} style={{ padding: "0 3vw" }}>
          {/*sidebar start*/}
          <Grid
            item
            xs={12}
            sm={12}
            md={3}
            lg={3}
            style={{
              display: !matchesXS ? "none" : "",
            }}
          >
            <NewSideBar open setCurrentPage={setCurrentPage} />
          </Grid>
          {/*sidebar ends*/}

          {/*content start*/}
          <Grid
            item
            xs={12}
            sm={12}
            md={9}
            lg={9}
            style={{
              marginTop: !matchesXS ? "110px" : "0",
            }}
          >
            <div
              onScroll={changeNavBg}
              className={`hero display_none_mobile ${navBg ? "dso_card" : ""}`}
              style={{
                backgroundColor: navBg ? "white" : "transparent",
                marginLeft: "0",
                marginRight: "1.5%",
              }}
            >
              {/*Toolbar start*/}
              <div className=" display_none_mobile">
                {vehiclesGQL && vehiclesGQL.length > 0 && !loading && (
                  <div className="display_flex  flex_align_center">
                    <Typography
                      scale="medium"
                      className="display_flex"
                      weight="400"
                    >
                      <b className="m_r_xs">{data?.getAll.count} </b> moto
                      {data?.getAll.count !== 1 ? "s" : ""}
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
                            const nextFilters =
                              translateColorValues(selectedFilters);
                            tagValue = `Color:${
                              nextFilters[key as keyof SelectedFilters]
                            }`;
                          }
                          if (key === "range") {
                            const fromRange = selectedFilters.range[0];
                            const toRange = selectedFilters.range[1];
                            tagValue = `De: $${fromRange} HASTA: $${toRange}`;
                          }
                          if (key === "year") {
                            const fromRange = selectedFilters.year[0];
                            const toRange = selectedFilters.year[1];
                            tagValue = `De:${fromRange} HASTA:${toRange}`;
                          }

                          if (key === "brand") {
                            tagValue = `Marca:${selectedFilters.brand}`;
                          }

                          if (key === "cylinder") {
                            tagValue = `Cilindraje:${selectedFilters.cylinder} CC`;
                          }

                          if (key === "kmTo") {
                            const fromRange = selectedFilters.kmTo[0];
                            const toRange = selectedFilters.kmTo[1];
                            tagValue = `De:${fromRange} HASTA:${toRange} KM`;
                          }

                          if (key === "weeks") {
                            tagValue = `Semanas:${selectedFilters.weeks}`;
                          }

                          return (
                            <div
                              key={idx}
                              className="m_l_sm"
                              style={{
                                display:
                                  (key === "weeks" &&
                                    selectedFilters.weeks.length === 3) ||
                                  (key === "range" &&
                                    selectedFilters.range.toString() ===
                                      "0,2500") ||
                                  (key === "kmTo" &&
                                    selectedFilters.kmTo.toString() ===
                                      "0,20000") ||
                                  (key === "year" &&
                                    selectedFilters.year.toString() ===
                                      "2019,2023")
                                    ? "none"
                                    : "block",
                              }}
                            >
                              {/* eslint-disable-next-line no-nested-ternary */}
                              {/*className={selectedFilters.weeks.length === 3 ? "display_none" : ""} */}
                              <Tag
                                value={`${tagValue.toUpperCase()}`}
                                icon={<Motocycle />}
                                className="bg-white"
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
              </div>
              {/*Toolbar ends*/}

              <div className=" flex_align_center" style={{ display: "flex" }}>
                <Typography
                  scale="xsmall"
                  weight="400"
                  className="text_neutral_600 m_r_sm"
                >
                  Ordenar por:
                </Typography>
                <div>
                  <Select
                    isClearable={false}
                    isSearchable={false}
                    options={orderOptions}
                    value={selectedOption}
                    onChange={handleSelectChange}
                    placeholder="Seleccionar opción"
                    theme={customTheme}
                    components={{ DropdownIndicator }}
                  />
                </div>
              </div>
            </div>
            {loading ? (
              <div className="m_t_md m_b_lg">
                <SkeletonCard
                  showItems={6}
                  columnsPerCard={!matchesXS ? 12 : 4}
                />
              </div>
            ) : (
              <OzonCardVehiclesPagination
                vehicles={vehiclesGQL}
                currentPage={data?.getAll.page}
                itemsPerPage={30}
              />
            )}
            <div
              className="m_b_xl"
              style={{ display: "flex", padding: 20, justifyContent: "center" }}
            >
              <Pagination
                count={data?.getAll.pages}
                page={currentPage}
                onChange={handleChange}
                hideNextButton
                hidePrevButton
                renderItem={(props) => <CustomPaginationItem {...props} />}
              />
              <br />
            </div>
          </Grid>
          {/*content ends*/}
        </Grid>
      </Container>
      <br />
      <CatalogBanner />
      {/* <FiltersModal
        open={modalOpen}
        setOpen={setModalOpen}
        filterVehicles={filterVehicles}
        setCurrentPage={setCurrentPage}
      /> */}
    </div>
  );
};

export default NewCatalog;
