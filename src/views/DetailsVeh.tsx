/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable consistent-return */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import Swal from "sweetalert2";
import SwiperClass from "swiper/types/swiper-class";
import Swipercore, { Navigation, Pagination, Autoplay } from "swiper";
import _ from "lodash";
import { TImages, TVehicle } from "models/vehicle.interface";
import { RootState } from "store/index";

import { ReactComponent as Back } from "@ecommerce-ozon/design_system/dist/public/static/icons/back.svg";

import { getVehicle } from "helpers/fetchVehicles";

// import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as Warning } from "@ecommerce-ozon/design_system/dist/public/static/icons/warning-circle.svg";

// swiper bundle styles
import "swiper/swiper-bundle.min.css";

// swiper core styles
import "swiper/swiper.min.css";

// modules styles
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import "./DetailsVeh.scss";
import CardAvailable from "components/hocs/cardDetails/CardAvailable";
import CardUnavailable from "components/hocs/cardDetails/CardUnavailable";
import { CardViewMX } from "components/hocs/card/CardViewMX";
import { fetchRecommendedThunk } from "store/actions/recommended";
import VehicleCardPlaceHolder from "components/placeholders/vehicleCardPlaceHolder/VehicleCardPlaceHolder";
import { Typography, Button } from "@ecommerce-ozon/design_system";
import useCurrentCity from "../hooks/useCurrentCity";

type paramDetail = {
  id: string;
};

const detailsData = [
  {
    title: "Año",
    name: "year",
    sub: "details",
  },
  {
    title: "Color",
    name: "color",
    map: {
      yellow: "Amarillo",
      pink: "Rosa",
      purple: "Morado",
      blue: "Azul",
      orange: "Naranja",
      green: "Verde",
      white: "Blanco",
      gray: "Gris",
      red: "Rojo",
      black: "Negro",
    },
  },
  {
    title: "Frenos",
    name: "brakesCondition",
    map: { excellent: "Excelente", ok: "Buena", bad: "Mala" },
  },
  {
    title: "Condición",
    name: "condition",
    map: { excellent: "Excelente", ok: "Buena", bad: "Mala" },
  },
  {
    title: "Litros",
    name: "tankSize",
  },
  {
    title: "Serie vehicular",
    name: "vehicleSN",
  },

  {
    title: "Tarjeta de Circulacion",
    name: "registrationCard",
  },
  {
    title: "Motor",
    name: "engineSN",
  },
  {
    title: "Placa",
    name: "plate",
  },
];

const useStyles = makeStyles((theme) => ({
  carousel: {
    order: 3,
    overflowY: "scroll",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      order: 1,
      overflowY: "unset",
      overflowX: "scroll",
    },
  },
  info: {
    order: 1,
  },
  images: {
    order: 2,
  },
  marco: {
    height: "50vh",
    [theme.breakpoints.only("xs")]: {
      height: "40vh",
    },
    [theme.breakpoints.only("sm")]: {
      height: "50vh",
    },
  },
  img: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.up("md")]: {
      height: "80%",
    },
    [theme.breakpoints.only("sm")]: {
      height: "75%",
    },
    [theme.breakpoints.only("xs")]: {
      height: "65%",
      marginTop: "3rem",
    },
  },
}));

export const DetailsVeh = () => {
  const classes = useStyles();
  Swipercore.use([Navigation, Pagination, Autoplay]);
  const dispatch = useDispatch();
  const history = useHistory();
  const city = useCurrentCity();

  const { country } = useSelector((state: RootState) => state.countryReducer);
  const {
    data: vehicles,
    loading: recommendedLoading,
    error: recommendedError,
  } = useSelector((state: RootState) => state.recommendedReducer);
  const { id }: paramDetail = useParams(); // id

  const [loading, setloading] = useState(true);
  const [photos, setPhotos] = useState<TImages[]>([]);
  const [slider, setSlider] = useState({ current: 0 });
  const [swiperRef, setSwiperRef] = useState<SwiperClass>();
  const [vehicle, setvehicle] = useState<TVehicle>();

  Swipercore.use([Navigation, Pagination, Autoplay]);

  const detailsList = () => {
    if (vehicle) {
      const left: any[] = [];
      const right: any[] = [];
      detailsData.forEach((field, i) => {
        if (i % 2) {
          right.push(field);
        } else {
          left.push(field);
        }
      });
      return (
        <>
          <Grid item sm={12} md={6}>
            <div className="dso_card h_100_per p_lg p_b_xxs">
              {left.map((field: any) => (
                <div className="flex_center m_b_sm" key={`left${field.name}`}>
                  <Typography
                    scale="small"
                    weight="600"
                    className="text_primary_400 flex_1"
                  >
                    {field.title}
                  </Typography>
                  <Typography
                    scale="xsmall"
                    weight="400"
                    className="text_neutral_800 text_right flex_1"
                  >
                    {field.map
                      ? field.map[
                      field.sub
                        ? (vehicle as any)[field.sub][field.name]
                        : (vehicle as any)[field.name]
                      ]
                      : field.sub
                        ? (vehicle as any)[field.sub][field.name]
                        : (vehicle as any)[field.name]}
                  </Typography>
                </div>
              ))}
              <div className="flex_center m_b_sm">
                <Typography
                  scale="small"
                  weight="600"
                  className="text_primary_400 flex_1"
                >
                  Kilometraje
                </Typography>
                <Typography
                  scale="xsmall"
                  weight="400"
                  className="text_neutral_800 text_right flex_1"
                >
                  {vehicle?.confirmationKM ? "Por confirmar" : `${vehicle?.details?.milage} Km`}
                </Typography>
              </div>
            </div>
          </Grid>
          <Grid item sm={12} md={6}>
            <div className="dso_card h_100_per  p_lg p_b_xxs">
              {right.map((field: any) => (
                <div className="flex_center m_b_sm" key={`right${field.name}`}>
                  <Typography
                    scale="small"
                    weight="600"
                    className="text_primary_400 flex_1"
                  >
                    {field.title}
                  </Typography>
                  <Typography
                    scale="xsmall"
                    weight="400"
                    className="text_neutral_800 text_right flex_1"
                  >
                    {field.map
                      ? field.map[
                      field.sub
                        ? (vehicle as any)[field.sub][field.name]
                        : (vehicle as any)[field.name]
                      ]
                      : field.sub
                        ? (vehicle as any)[field.sub][field.name]
                        : (vehicle as any)[field.name]}
                  </Typography>
                </div>
              ))}
            </div>
          </Grid>
        </>
      );
    }
    return null;
  };

  const slideTo = (index: any) => {
    console.log("sliding to", index, swiperRef);
    if (swiperRef) swiperRef.slideTo(index, 0);
  };

  const handleBack = () => {
    history.goBack();
  };
  const scrollTop = () => {
    window.focus();
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    scrollTop();
    document.title = "Detalles vehiculo en Ozon";
    //  ReactGA.send({ hitType: "pageview", page: history.location.pathname });
    dispatch(fetchRecommendedThunk({ city }));
  }, [city]);

  useEffect(() => {
    if (vehicle !== undefined) {
      vehicle.country?.iso !== country &&
        Swal.fire({
          text: "El vehículo no pertenece a la ubicación selecionada",
          icon: "warning",
          confirmButtonText: "Aceptar",
        });
    }
  }, [vehicle, country]);

  useEffect(() => {
    (async () => {
      const res = await getVehicle(id);
      if (res) {
        setvehicle(res);
        if (res.images) {
          setPhotos(res.images);
        }
        setloading(false);
      } else {
        Swal.fire({
          title: "Error",
          text: "El vehículo no existe",
          icon: "error",
          confirmButtonText: "Aceptar",
        }).then(() => {
          history.push("/");
        });
      }
    })();
  }, [id, history]);

  return (
    <Container className="main-cont-detail">
      <div className="display_flex flex_align_center m_b_lg">
        <Button
          variant="icon"
          icon={<Back />}
          subvariant="edit"
          scale="small"
          onClick={handleBack}
        />
        <Typography
          scale="xsmall"
          weight="400"
          className="text_neutral_800 m_l_md"
        >
          Catálogo
        </Typography>
        <Typography
          scale="xsmall"
          weight="400"
          className="text_neutral_800 m_x_xs"
        >
          {" < "}
        </Typography>
        <Typography scale="xsmall" weight="400" className="text_primary_300">
          Vehículo {vehicle?.internalId}
        </Typography>
      </div>
      {!loading && vehicle && (
        <>
          <Grid container direction="row" spacing={3}>
            <Grid item xs={12} sm={12} md={4} className={classes.info}>
              {vehicle.status === "available" ? (
                <CardAvailable vehicle={vehicle} />
              ) : (
                <CardUnavailable vehicle={vehicle} />
              )}
            </Grid>
            <Grid
              item
              container
              xs={12}
              sm={12}
              md={6}
              spacing={3}
              className={classes.images}
            >
              <Grid item xs={12}>
                <div
                  className="pos_relative dso_card w_100_per_desktop h_100_per_desktop bg_neutral_0"
                  style={{ overflow: "hidden" }}
                >
                  <div className="disclaimer bg_neutral_700 p_y_sm p_x_xxxl">
                    <div className="text text_xxsmall_400 center_x p_l_xxl">
                      <Warning className="icon text_neutral_0 center_y m_l_xs" />
                      Las imágenes presentadas son referenciales y pueden variar
                      en el producto final.
                    </div>
                  </div>

                  <Swiper
                    navigation
                    className={classes.marco}
                    onSwiper={setSwiperRef}
                    onSlideChange={() => {
                      setSlider({
                        current: swiperRef ? swiperRef.activeIndex : 0,
                      });
                    }}
                  >
                    {photos.map((value) => (
                      <SwiperSlide key={uuidv4()}>
                        <img
                          src={value.url}
                          alt="moto"
                          className={classes.img}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </Grid>
              {vehicle && vehicle.details && detailsList()}
            </Grid>
            <Grid item xs={12} sm={12} md={2} className={classes.carousel}>
              <div className="images-cont">
                {photos.map((value, index) => (
                  <div
                    key={uuidv4()}
                    className={`image-cont dso_card bg_neutral_0 ${slider.current === index ? "active" : ""
                      }`}
                    onClick={() => slideTo(index)}
                  >
                    <img src={value.url} alt="moto" className="image" />
                  </div>
                ))}
              </div>
            </Grid>
          </Grid>
          <div
            className="div-title"
            style={{ marginTop: "4rem", marginBottom: "3rem" }}
          >
            <span className="first">Motocicletas</span> similares
          </div>
          <Grid container direction="row" spacing={3}>
            {!recommendedLoading && !recommendedError && vehicles ? (
              vehicles.slice(0, 4).map((vehicle) => (
                <Grid key={uuidv4()} item xs={12} md={3}>
                  {vehicle.images[0] && (
                    <CardViewMX key={uuidv4()} vehicle={vehicle} />
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
        </>
      )}
    </Container>
  );
};
