/* eslint-disable no-restricted-globals */
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import {
  Button,
  Container,
  Grid,
  Skeleton,
  TextField,
  useMediaQuery,
  Slider,
} from "@mui/material";
import {
  Modal,
  Typography,
  Button as Btn,
  Input,
} from "@ecommerce-ozon/design_system";
import { ReactComponent as Location } from "@ecommerce-ozon/design_system/dist/public/static/icons/map.svg";
import { ReactComponent as AddCircle } from "@ecommerce-ozon/design_system/dist/public/static/icons/add-circle.svg";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { ChevronRight } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import VehicleCarousel from "../../components/vehicleCarousel/VehicleCarousel";
import { TImages, TVehicle } from "../../models/vehicle.interface";
import { getVehicle } from "../../helpers/fetchVehicles";

import LogoMini from "../../static/icons/logoMini.png";
import PlanSelectionBox from "../../components/planSelectionBox/PlanSelectionBox";
import TextContainer from "../../components/textContainer/TextContainer";
import { OneThousandSecction } from "../../components/hocs/bannerMX/oneThousandSecction/OneThousandSecction";
import { HubsSection } from "../../components/hubs/HubsSection";
import RecommendedDetails from "./RecommendedDetails/RecommendedDetails";
import PaymentButtons from "../../components/paymentButtons/PaymentButtons";
import { ModalFormFinanciero } from "../../components/hocs/modal/ModalFormFinanciero";
import { getColorLabelEs } from "../../helpers/translateColor";
import { formatPrice } from "../../helpers/formatPrice";
import { priceFormatFinancial, prices } from "../../helpers/prices";
import {
  setCreditVerificationCreditTimeAction,
  setCreditVerificationVehicleAction,
} from "../../store/actions/creditVerification";
import { ContactHelper } from "../../components/hocs/ContactHelper/ContactHelper";

export const Divider = () => {
  return (
    <div
      style={{
        borderLeft: "1px solid #D7D7D7",
        height: "15px",
        paddingLeft: "10px",
        marginLeft: "10px",
      }}
    />
  );
};

type DescriptionRowProps = {
  label: string;
  description: string | undefined;
};

export const DescriptionRow: React.FC<DescriptionRowProps> = ({
  label,
  description,
}) => {
  // let truncatedText = description;
  // if(description && description.length > 15){
  //    truncatedText = description!.slice(0, 15);
  //   truncatedText = `${truncatedText}...`;
  // }0.81852px solid #ECEEEF

  return (
    <Grid
      container
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      flexWrap="wrap"
      style={{
        border: "0.33px solid #ECEEEF",
        borderRadius: 3,
      }}
    >
      <Grid item xs={5} style={{ backgroundColor: "#F4F5F6", padding: 6 }}>
        <Typography
          weight="600"
          scale="small"
          className=" m_l_md"
          textColor="neutral_700"
        >
          {label}
        </Typography>
      </Grid>
      <Grid item xs={7}>
        <Typography weight="400" scale="small" className=" m_l_lg">
          {description || "No aplica"}
        </Typography>
      </Grid>
    </Grid>
  );
};

type paramDetail = {
  id: string;
};

const NewDetailsView = () => {
  // MODAL ADVANCED MONEY
  const [initialPaymentAmount, setInitialPaymentAmount] = useState<number>(0);
  const [OpenAM, setOpenAM] = useState<boolean>(false);
  const [Opened, setOpened] = useState<boolean>(false);
  const min = 0;
  const max = 20000;
  const step = 500;

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setInitialPaymentAmount(newValue as number);
  };

  const handleButtonSum = () => {
    if (initialPaymentAmount >= min && initialPaymentAmount < max) {
      setInitialPaymentAmount(initialPaymentAmount + 500);
    }
  };

  const handleButtonRest = () => {
    if (initialPaymentAmount > min && initialPaymentAmount <= max) {
      setInitialPaymentAmount(initialPaymentAmount - 500);
    }
  };

  const handleInputAMChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valuetosaved = Number(event.target.value);
    if (valuetosaved < min || valuetosaved > max) {
      return;
    }
    setInitialPaymentAmount(valuetosaved);
  };

  const BoxShadow =
    "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";

  const handleModalAM = () => {
    setOpenAM(!OpenAM);
  };

  const handleButtonAM = () => {
    if (!Opened) {
      setOpenAM(!OpenAM);
    }
    setOpened(true);
  };

  const matchesXS = useMediaQuery("(min-width:600px)");

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const { id }: paramDetail = useParams();

  const [vehicle, setvehicle] = useState<TVehicle>();
  const [loading, setloading] = useState(true);
  const [photos, setPhotos] = useState<TImages[]>([]);

  const [selectedWeeks, setSelectedWeeks] = useState(52);
  const [selectedPlanIndex, setSelectedPlanIndex] = useState<number | null>(0);

  const [currentPayingAmount, setCurrentPayingAmount] = useState(0);

  const [formValue, setFormValue] = useState(0);
  const [hasError, setHasError] = useState(false);

  const [selectedButton, setSelectedButton] = useState<string>("0");

  const maxVehiclePercentage = 0.8;

  // @ts-ignore
  const { weeks: selectedWeeksProps } = location?.state || {};

  const planSwitch = (weeks: number) => {
    switch (weeks) {
      case 52:
        return 0;
      case 78:
        return 1;
      case 104:
        return 2;
      default:
        return 0;
    }
  };
  useEffect(() => {
    if (selectedWeeksProps) {
      setSelectedWeeks(selectedWeeksProps);
    }
  }, []);

  useEffect(() => {
    const currentWeeks = planSwitch(selectedWeeks);
    setSelectedPlanIndex(currentWeeks);
  }, [selectedWeeks]);

  const handleInputChange = (event: any) => {
    setFormValue(event.target.value);
  };

  const handleInputSubmit = (event: any) => {
    event.preventDefault();

    if (
      formValue >
      (vehicle?.getWeeklyPrice(selectedWeeks) || 1) * selectedWeeks
    ) {
      setHasError(true);
      return;
    }

    setHasError(false);
    setInitialPaymentAmount(formValue);
  };

  const [open, setopen] = useState<boolean>(false);

  const handleModal = () => {
    setopen(!open);
  };

  const calculateCurrentAmount = (week: number) => {
    const currentWeeks = week; //default =52
    const currentPrice =
      (vehicle?.getWeeklyPrice(currentWeeks) || 1) * currentWeeks;
    const amountDifference = currentPrice - initialPaymentAmount;
    return Math.floor(amountDifference / currentWeeks);
  };

  useEffect(() => {
    if (vehicle) {
      vehicle.setAdvancedMoney(Number(initialPaymentAmount));
      dispatch(setCreditVerificationVehicleAction(vehicle));
      dispatch(setCreditVerificationCreditTimeAction(selectedWeeks));
      const newAmount = calculateCurrentAmount(selectedWeeks);
      setCurrentPayingAmount(newAmount);
    }
  }, [initialPaymentAmount]);

  useEffect(() => {
    if (formValue !== 0) {
      setSelectedButton("");
    }
  }, [formValue]);

  // 801, 659

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

  useEffect(() => {
    if (vehicle && vehicle.visible !== true) {
      history.push({
        pathname: "/vehiculo-no-disponible",
        state: { model: vehicle.internalId },
      });
    }
  }, [vehicle]);

  const handleNavigationBack = () => {
    history.push("/catalogo");
  };

  const handlePlanClick = (index: number, weeks: number = 52) => {
    setSelectedPlanIndex(index);
    setSelectedWeeks(weeks);
  };

  interface ISelectPlanArr {
    title: string;
    weeks: number;
    weeklyAmount: string;
    noDiscountAmount?: string;
  }

  const currentPlans = vehicle?.creditTime;

  const selectPlanArr = currentPlans?.map((week, idx): ISelectPlanArr => {
    let title = "Comodidad";
    const weeks = week;
    let duration = 104;

    if (idx === 0) {
      title = "Facilidad";
      duration = 52;
    } else if (idx === 1) {
      title = "Oportunidad";
      duration = 78;
    }

    return {
      title,
      weeks,
      weeklyAmount: calculateCurrentAmount(duration).toString(),
      noDiscountAmount: vehicle?.hasDiscount()
        ? vehicle?.getWeeklyPriceWithoutDescount(duration).toString()
        : undefined,
    };
  });

  const handleSeparate = useCallback(() => {
    history.push("/separate", vehicle);
  }, [history, vehicle]);

  return (
    <>
      <Container
        maxWidth="xl"
        style={{ padding: !matchesXS ? "0" : "inherit" }}
      >
        <Grid
          sx={{ paddingTop: !matchesXS ? "0px" : "3vh" }}
          container
          justifyContent="center"
          columnSpacing={{ xs: 0, sm: 2, md: 3, lg: 3, xl: 3 }}
          rowSpacing={2}
        >
          <Grid item xs={12} sm={12} md={6}>
            <div className="display_flex display_none_mobile">
              <Typography
                scale="small"
                weight="400"
                className="m_b_xl m_l_sm "
                style={{ cursor: "pointer" }}
                onClick={handleNavigationBack}
              >
                Catálogo
              </Typography>
              <Typography scale="small" weight="400" className="m_b_xl m_l_xxs">
                /
              </Typography>
              {vehicle && (
                <Typography
                  scale="small"
                  weight="600"
                  className="m_b_lg m_l_xxs"
                >
                  {`${vehicle?.brand.name} ${vehicle?.model.name} ${
                    vehicle?.cylindersCapacity.value
                  }${vehicle?.suffix ? vehicle.suffix : ""}`}
                </Typography>
              )}
            </div>
            <div
              className={!matchesXS ? "" : ""}
              style={{
                borderRadius: !matchesXS ? "" : "10px",
                padding: !matchesXS ? "" : "15px",
              }}
            >
              <VehicleCarousel photos={photos} />
            </div>
            <br />
            <br />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={5}
            className=""
            style={{ padding: !matchesXS ? "0px 0px" : "inherit" }}
          >
            <div
              id="portal"
              className="display_none_mobile"
              style={{
                zIndex: 5,
                position: "absolute",
                backgroundColor: "white",
                marginTop: "10vh",
              }}
            />

            <div
              className="p_x_md "
              style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
              }}
            >
              <img height="26" src={LogoMini} alt="mini" />
              <Typography scale="large" weight="600" className="m_l_md">
                {`${vehicle?.brand.name || "Cargando..."} ${
                  vehicle?.model.name || ""
                } ${vehicle?.cylindersCapacity.value || ""}${
                  vehicle?.suffix ? vehicle.suffix : ""
                }`}
              </Typography>
            </div>

            <div
              className="m_t_sm p_x_md"
              style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
              }}
            >
              <Typography scale="medium" weight="600" className="">
                {vehicle?.details.year || ""}
              </Typography>
              <Divider />
              <Typography scale="medium" weight="600" className="">
                {`${vehicle?.cylindersCapacity.value || ""} CC`}
              </Typography>
              <Divider />
              <Typography scale="medium" weight="600" className="">
                {vehicle?.confirmationKM ? "KM por confirmar" : `${vehicle?.details?.milage} Km`}
              </Typography>
              <Divider />
              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                <div style={{ paddingTop: "3px" }}>
                  <Location style={{ height: "15px" }} />
                </div>
                <Typography scale="medium" weight="600" className="">
                  {vehicle?.hub.name}
                </Typography>
              </div>
            </div>
            <div className="p_x_md m_b_xl">
              <Typography scale="small" weight="400" className="m_t_sm">
                {vehicle?.description || ""}
              </Typography>
            </div>

            <div className="dso_card m_x_md m_y_xxl p_xl">
              {!Opened ? (
                <Typography
                  scale="small"
                  weight="600"
                  className={`m_y_xs ${!matchesXS && "txt-center"}`}
                >
                  Selecciona tu forma de pago:
                </Typography>
              ) : (
                <div className="display_flex flex_col flex_gap_xs">
                  <div className="display_flex flex_align_center flex_justify_between_desktop flex_gap_xs_mobile flex_col_mobile">
                    <Typography
                      scale="small"
                      weight="400"
                      className="m_y_xs text_center_mobile"
                    >
                      ¿Quieres dar{" "}
                      <span style={{ fontWeight: "bold" }}>
                        un pago inicial?
                      </span>{" "}
                      <span className="text_neutral_500">(opcional)</span>
                    </Typography>
                    <div className="w_100_per_mobile w">
                      <Input
                        type="number"
                        style={{ textAlign: "center" }}
                        title=""
                        placeholder=""
                        name="input-slider"
                        onChange={handleInputAMChange}
                        // onChange={handleChange}
                        // onBlur={handleBlur}
                        // value={ _.get(values, name) === 0 ? "" : _.get(values, name)}
                        value={
                          initialPaymentAmount === 0 ? "" : initialPaymentAmount
                        }
                      />
                    </div>
                  </div>
                  <div className="bg_neutral_200 br_xxs p_md display_flex flex_gap_md_desktop flex_gap_xl_mobile flex_center m_b_md_mobile">
                    <div
                      className="display_flex flex_center bg_neutral_0 text_primary_300 br_xxs  cursor_pointer dim_25_px"
                      onClick={handleButtonRest}
                      style={{
                        WebkitUserSelect: "none",
                        MozUserSelect: "none",
                        msUserSelect: "none",
                        userSelect: "none",
                      }}
                    >
                      -
                    </div>
                    <div className="w_70_per_desktop w_60_per_mobile">
                      <Slider
                        valueLabelDisplay="auto"
                        value={initialPaymentAmount}
                        onChange={handleSliderChange}
                        aria-labelledby="slider"
                        min={min}
                        max={max}
                        step={step}
                        sx={{
                          color: "rgb(248,157,62) !important",
                          height: "10",
                          padding: "15px 0",
                          "& .MuiSlider-thumb": {
                            height: 18,
                            width: 18,
                            backgroundColor: "rgb(245,118,10) ",
                            boxShadow: BoxShadow,
                            "&:focus, &:hover, &.Mui-active": {
                              boxShadow:
                                "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
                              // Reset on touch devices, it doesn't add specificity
                              "@media (hover: none)": {
                                boxShadow: BoxShadow,
                              },
                            },
                          },

                          "& .MuiSlider-track": {
                            border: "none",
                            height: 8,
                          },
                          "& .MuiSlider-rail": {
                            opacity: 0.5,
                            height: 8,
                            backgroundColor: "white",
                            border: "1px solid #C7CCD1",
                            borderRadius: 8,
                          },
                          "& .MuiSlider-markLabel": {
                            marginTop: 7,
                            "&.MuiSlider-markLabelActive": {
                              opacity: 1,
                              color: "rgba(245,118,10,0.9)",
                            },
                          },
                          "& .MuiSlider-mark": {
                            backgroundColor: "#bfbfbf",
                            height: 8,
                            width: 2,
                            marginTop: 12,
                            "&.MuiSlider-markActive": {
                              opacity: 1,
                              backgroundColor: "rgb(245,118,10)",
                            },
                          },
                        }}
                      />
                    </div>
                    <div
                      className="display_flex flex_center bg_neutral_0 text_primary_300 br_xxs  cursor_pointer dim_25_px"
                      onClick={handleButtonSum}
                      style={{
                        WebkitUserSelect: "none",
                        MozUserSelect: "none",
                        msUserSelect: "none",
                        userSelect: "none",
                      }}
                    >
                      +
                    </div>
                  </div>
                </div>
              )}

              {selectPlanArr?.map((item, idx) => (
                <PlanSelectionBox
                  title={item.title}
                  key={uuidv4()}
                  weeks={item.weeks}
                  weeklyAmount={item.weeklyAmount}
                  handlePlanClick={handlePlanClick}
                  index={idx}
                  selectedPlanIndex={selectedPlanIndex}
                  noDiscountAmount={item.noDiscountAmount}
                />
              ))}

              {!Opened && (
                <div
                  style={{
                    WebkitUserSelect: "none",
                    MozUserSelect: "none",
                    msUserSelect: "none",
                    userSelect: "none",
                  }}
                >
                  <Typography
                    scale="small"
                    weight="600"
                    className="m_t_xl m_b_xs"
                  >
                    Haz que tu plan sea más barato
                  </Typography>
                  <div
                    className="bg_neutral_200 display_flex flex_gap_xs p_md br_xs cursor_pointer"
                    onClick={handleButtonAM}
                  >
                    <AddCircle className="text_neutral_1000" />
                    <Typography scale="small" weight="600" className="">
                      Agregar pago inicial
                    </Typography>
                    <Typography
                      scale="small"
                      weight="600"
                      className="text_neutral_600"
                    >
                      (Opcional)
                    </Typography>
                  </div>
                </div>
              )}

              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: !matchesXS ? "" : "flex-end",
                  }}
                >
                  <Button
                    disableElevation
                    className="m_y_md"
                    variant="contained"
                    endIcon={<ChevronRight />}
                    style={{
                      backgroundColor: "#FE8A02",
                      color: "white",
                      fontSize: "14px",
                    }}
                    onClick={handleModal}
                  >
                    Seleccionar y continuar
                  </Button>
                </div>
              </div>
              <Modal open={OpenAM} setOpen={handleModalAM} className="modalAM">
                <div className="display_flex flex_col flex_gap_xs">
                  <div className="display_flex flex_align_center flex_justify_between_desktop flex_gap_xs_mobile flex_col_mobile">
                    <Typography
                      scale="small"
                      weight="400"
                      className="m_y_xs text_center_mobile"
                    >
                      ¿Quieres dar{" "}
                      <span style={{ fontWeight: "bold" }}>
                        un pago inicial?
                      </span>{" "}
                      <span className="text_neutral_500">(opcional)</span>
                    </Typography>
                    <div className="w_100_per_mobile w">
                      <Input
                        type="number"
                        style={{ textAlign: "center" }}
                        title=""
                        placeholder=""
                        name="input-slider"
                        onChange={handleInputAMChange}
                        // onChange={handleChange}
                        // onBlur={handleBlur}
                        // value={ _.get(values, name) === 0 ? "" : _.get(values, name)}
                        value={
                          initialPaymentAmount === 0 ? "" : initialPaymentAmount
                        }
                      />
                    </div>
                  </div>
                  <div className="bg_neutral_200 br_xxs p_md display_flex flex_gap_md_desktop flex_gap_xl_mobile flex_center">
                    <div
                      className="display_flex flex_center bg_neutral_0 text_primary_300 br_xxs  cursor_pointer dim_25_px"
                      onClick={handleButtonRest}
                      style={{
                        WebkitUserSelect: "none",
                        MozUserSelect: "none",
                        msUserSelect: "none",
                        userSelect: "none",
                      }}
                    >
                      -
                    </div>
                    <div className="w_70_per_desktop w_60_per_mobile">
                      <Slider
                        valueLabelDisplay="auto"
                        value={initialPaymentAmount}
                        onChange={handleSliderChange}
                        aria-labelledby="slider"
                        min={min}
                        max={max}
                        step={step}
                        sx={{
                          color: "rgb(248,157,62) !important",
                          height: "10",
                          padding: "15px 0",
                          "& .MuiSlider-thumb": {
                            height: 18,
                            width: 18,
                            backgroundColor: "rgb(245,118,10) ",
                            boxShadow: BoxShadow,
                            "&:focus, &:hover, &.Mui-active": {
                              boxShadow:
                                "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
                              // Reset on touch devices, it doesn't add specificity
                              "@media (hover: none)": {
                                boxShadow: BoxShadow,
                              },
                            },
                          },

                          "& .MuiSlider-track": {
                            border: "none",
                            height: 8,
                          },
                          "& .MuiSlider-rail": {
                            opacity: 0.5,
                            height: 8,
                            backgroundColor: "white",
                            border: "1px solid #C7CCD1",
                            borderRadius: 8,
                          },
                          "& .MuiSlider-markLabel": {
                            marginTop: 7,
                            "&.MuiSlider-markLabelActive": {
                              opacity: 1,
                              color: "rgba(245,118,10,0.9)",
                            },
                          },
                          "& .MuiSlider-mark": {
                            backgroundColor: "#bfbfbf",
                            height: 8,
                            width: 2,
                            marginTop: 12,
                            "&.MuiSlider-markActive": {
                              opacity: 1,
                              backgroundColor: "rgb(245,118,10)",
                            },
                          },
                        }}
                      />
                    </div>
                    <div
                      className="display_flex flex_center bg_neutral_0 text_primary_300 br_xxs  cursor_pointer dim_25_px"
                      onClick={handleButtonSum}
                      style={{
                        WebkitUserSelect: "none",
                        MozUserSelect: "none",
                        msUserSelect: "none",
                        userSelect: "none",
                      }}
                    >
                      +
                    </div>
                  </div>
                </div>

                <Typography scale="small" weight="600" className="m_y_xs">
                  Visualiza tus descuento{" "}
                  <span className="text_primary_300">en tiempo real</span>
                </Typography>
                {selectPlanArr?.map((item, idx) => (
                  <PlanSelectionBox
                    title={item.title}
                    key={uuidv4()}
                    weeks={item.weeks}
                    weeklyAmount={item.weeklyAmount}
                    handlePlanClick={handlePlanClick}
                    index={idx}
                    selectedPlanIndex={selectedPlanIndex}
                    noDiscountAmount={item.noDiscountAmount}
                  />
                ))}
                <div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: !matchesXS ? "" : "flex-end",
                    }}
                  >
                    <Button
                      disableElevation
                      className="m_y_md"
                      variant="contained"
                      endIcon={<ChevronRight />}
                      style={{
                        backgroundColor: "#FE8A02",
                        color: "white",
                        fontSize: "14px",
                      }}
                      onClick={handleModal}
                    >
                      Seleccionar y continuar
                    </Button>
                  </div>
                </div>
              </Modal>
            </div>
          </Grid>
        </Grid>
        <Grid
          sx={{
            flexGrow: 1,
            padding: !matchesXS ? "0 10px" : "3vh 5vw",
          }}
          container
          justifyContent="start"
          alignItems="start"
          columnSpacing={0}
          rowSpacing={0}
        >
          <Grid item xs={12} sm={12} className="m_t_lg p_x_md">
            <img
              height="48"
              src={LogoMini}
              alt="mini"
              className="display_none_mobile"
            />
            <br />
            <Typography scale="large" weight="600" className="p_b_lg ">
              Conoce todo sobre esta
              <span className="text_primary_300">
                {" "}
                {vehicle?.brand.name} {vehicle?.model.name}{" "}
                {vehicle?.cylindersCapacity.value}
                {vehicle?.suffix ? vehicle.suffix : ""}
              </span>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={6} className="p_x_md">
            <div style={{ width: "100%" }}>
              <DescriptionRow label="Marca" description={vehicle?.brand.name} />
              <DescriptionRow
                label="Modelo"
                description={vehicle?.model.name}
              />
              <DescriptionRow label="Año" description={vehicle?.details.year} />
              <DescriptionRow
                label="Cilindraje"
                description={vehicle?.cylindersCapacity.value}
              />
              <DescriptionRow
                label="Color Principal"
                description={getColorLabelEs(vehicle?.color || "")}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6} className="p_x_md">
            <div style={{ width: "100%", paddingTop: 0, marginBottom: "5vh" }}>
              <DescriptionRow
                label="Color Secundario"
                description={getColorLabelEs(vehicle?.secondaryColor || "")}
              />
              <DescriptionRow
                label="Tipo de frenos"
                description={vehicle?.brakeType}
              />
              <DescriptionRow
                label="Num. de motor"
                description={vehicle?.engineSN}
              />
            </div>
          </Grid>
        </Grid>

        <Grid
          sx={{
            flexGrow: 1,
            padding: !matchesXS ? "0 10px" : "3vh 5vw",
            marginBottom: "5vh",
          }}
          container
          justifyContent="center"
          columnSpacing={0}
          rowSpacing={2}
        >
          <Grid item xs={12} sm={12} md={6} className="p_md">
            <Typography scale="small" weight="600" className="">
              Detalles
            </Typography>
            <div
              style={{
                borderBottom: "1px solid #C9C9C9",
                padding: 6,
                marginRight: "10px",
                height: "auto",
              }}
            />
            <TextContainer
              text={vehicle?.detail || "Sin Información"}
              maxLength={300}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} className="p_md">
            <Typography scale="small" weight="600" className="">
              Garantía y asistencia 24/7
            </Typography>
            <div
              style={{
                borderBottom: "1px solid #C9C9C9",
                padding: 6,
                marginRight: "10px",
              }}
            />
            <TextContainer
              text={vehicle?.warranty || "Sin Información"}
              maxLength={300}
            />
          </Grid>
        </Grid>
        <div
          className="dso_card display_flex"
          style={{ margin: !matchesXS ? "15px" : "0 30px" }}
        >
          <Container
            maxWidth="xl"
            style={{
              backgroundColor: "#FFFFFF",
              height: "auto",
              padding: "2.5px",
            }}
          >
            <Grid container sx={{}}>
              <Grid item xs={12} sm={12} md={6}>
                <div
                  className="display_flex"
                  style={{
                    alignItems: "center",
                    height: !matchesXS ? "70px" : "100px",
                    padding: !matchesXS ? "5px 10px" : "0",
                  }}
                >
                  <img
                    className=" m_r_xl"
                    style={{
                      width: "auto",
                      height: "100%",
                      borderRadius: "5px",
                    }}
                    src={photos[0]?.url}
                    alt="vehiculo"
                  />
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                      }}
                    >
                      <Typography scale="large" weight="600" className="">
                        {`${vehicle?.brand.name} ${vehicle?.model.name} ${
                          vehicle?.cylindersCapacity.value
                        }${vehicle?.suffix ? vehicle.suffix : ""}`}
                      </Typography>
                    </div>
                    <div
                      className=" "
                      style={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <Typography scale="small" weight="600" className="">
                        {vehicle?.details.year}
                      </Typography>
                      <Divider />
                      <Typography scale="small" weight="600" className="">
                        {`${vehicle?.cylindersCapacity.value} CC`}
                      </Typography>
                      <Divider />
                      <Typography scale="small" weight="600" className="">
                        {vehicle?.confirmationKM ? "Por confirmar" : `${vehicle?.details?.milage} Km`}
                      </Typography>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item sm={12} md={6} style={{ backgroundColor: "#FCF2E7" }}>
                <div
                  className="display_flex p_lg"
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <div
                    className="display_flex"
                    style={{
                      width: "60%",
                      flexDirection: "column",
                      padding: !matchesXS ? "0 5px" : 0,
                      marginRight: !matchesXS ? "5vw" : 0,
                      alignItems: "start",
                      justifyContent: "center",
                    }}
                  >
                    <Typography scale="xsmall" weight="600">
                      Reserva esta moto por solo
                    </Typography>

                    <h1 style={{ padding: 0, margin: 0, color: "#FF8B00" }}>
                      {/*${calculateCurrentAmount(selectedWeeks)} MXN */}
                      $150<small>MXN</small>
                    </h1>
                  </div>

                  <div
                    className="display_none_desktop"
                    style={{ borderLeft: "1px solid orange", height: "70px" }}
                  />
                  <div
                    className="display_flex"
                    style={{
                      flexDirection: "column",

                      padding: !matchesXS ? "0 25px" : 0,
                      justifyContent: "center",
                    }}
                  >
                    <Typography scale="xsmall" weight="600" className="p_b_sm">
                      Estará fuera de la página por 72 horas
                    </Typography>
                    <Button
                      disableElevation
                      variant="contained"
                      style={{
                        backgroundColor: "#FE8A02",
                        color: "white",
                      }}
                      onClick={handleSeparate}
                    >
                      Reserva ahora
                    </Button>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Container>
        </div>
      </Container>
      <OneThousandSecction />
      <RecommendedDetails />
      {/* <ContactHelper /> */}
      <ModalFormFinanciero
        open={open}
        setOpen={handleModal}
        vehicleSelected={vehicle}
        selectedCreditTime={selectedWeeks}
        orientation="vertical"
      />
    </>
  );
};

export default NewDetailsView;
