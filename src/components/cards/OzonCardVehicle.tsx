/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@ecommerce-ozon/design_system";

import { useMediaQuery } from "@material-ui/core";

import { ReactComponent as Date } from "@ecommerce-ozon/design_system/dist/public/static/icons/date.svg";
import { ReactComponent as GPS } from "@ecommerce-ozon/design_system/dist/public/static/icons/gps.svg";
import { ReactComponent as Checkmark } from "@ecommerce-ozon/design_system/dist/public/static/icons/checkmark.svg";
import { ReactComponent as Motorcycle } from "@ecommerce-ozon/design_system/dist/public/static/icons/motorcycle.svg";
import { ReactComponent as PriceTag } from "@ecommerce-ozon/design_system/dist/public/static/icons/price-tag-rotate.svg";
import { ReactComponent as Speedometer } from "@ecommerce-ozon/design_system/dist/public/static/icons/speedometer.svg";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { TDiscount, TVehicle } from "../../models/vehicle.interface";
import { formatPrice } from "../../helpers/formatPrice";
import { priceFormatFinancial, prices } from "../../helpers/prices";
import { RootState } from "../../store";

import "./OzonCardVehicle.scss";
import HelperCardImg from "../../static/helperCard/helperCardImg.png";
import useVehicles from "../../hooks/useVehicles";
import { Divider } from "../../views/DetailsView/NewDetailsView";
// eslint-disable-next-line import/order
import { VehicleData } from "models/graphql/fecthVehicle.graphql";

type TextBoxProps = {
  credit: any;
  creditTime: any;
  changeCredit?: any;
};

export const TextBox: React.FC<TextBoxProps> = ({
  credit,
  creditTime,
  changeCredit,
}) => {
  const boxStyle = {};

  return (
    <Box
      component="span"
      sx={{
        ...boxStyle,
      }}
    >
      <div
        className="display_flex "
        onKeyPress={changeCredit}
        onClick={changeCredit}
        style={{
          margin: "0 2.5px",
          backgroundColor:
            creditTime?.weeks === credit.weeks ? "#5CE529" : "#D9D9D9",
          padding: "2.5px 12px",
          borderRadius: "28px",
        }}
      >
        <Typography
          scale="xsmall"
          weight="600"
          textColor={
            creditTime?.weeks === credit.weeks ? "neutral_0" : "neutral_800"
          }
          className="text_center p_t_xxs p_b_xxs "
        >
          {credit.weeks}
        </Typography>
      </div>
    </Box>
  );
};

interface DiscountLabelProps {
  total: number;
  value: number;
}

const DiscountLabel: React.FC<DiscountLabelProps> = ({ total, value }) => {
  const [percentage, setpercentage] = React.useState<number>();
  React.useEffect(() => {
    setpercentage(() => 100 - (value * 100) / total);
  }, [value, total]);

  return (
    <Typography
      scale="xxsmall"
      weight="600"
      style={{ display: "flex", justifyContent: "center", alignItems: "start" }}
    >
      {`-${percentage?.toFixed()}% Desc.`}
    </Typography>
  );
};

type CardProps = {
  vehicle: VehicleData;
  isHelperCard: boolean;
  setOpen?: any;
};

const OzonCardVehicle: React.FC<CardProps> = ({
  vehicle,
  isHelperCard,
  setOpen,
}) => {
 
  
  const history = useHistory();

  const matchesXS = useMediaQuery("(min-width:600px)");
  const matchesLG = useMediaQuery("(min-width:1097px)");
  const [isHovering, setIsHovering] = useState(false);

  const {
    loading: vehiclesLoading,
    selectedFilters,
    error: vehiclesError,
    data: { vehicles, filters },
  } = useVehicles();

  const [creditTime, setCreditTime] = useState<any>();

  const changeCredit = (e: any, credit: any) => {
    e.stopPropagation();
    setCreditTime(credit);
  };

  const lowestWeekValue =
    selectedFilters?.weeks === undefined
      ? [52, 72, 104]
      : selectedFilters?.weeks.reduce((acc, val) => {
          return Math.min(acc, val);
        });

  // useEffect(() => {
  //   const credit = vehicle?.salePrices?.[vehicle.salePrices.length - 1]?.weeks !== undefined
  //     ? vehicle.salePrices[vehicle.salePrices.length - 1]
  //     : vehicle.salePrices[0];
  //   setCreditTime(credit);
  // }, [vehicle, selectedFilters?.weeks]);

  const handleCardClick = () => {
    if (isHelperCard) {
      setOpen(true);
      return;
    }

    const creditSelection = {
      weeks: creditTime.weeks,
    };

    history.push(`/vehicle/${vehicle.internalId}`, creditSelection);
  };
  const { country } = useSelector((state: RootState) => state.countryReducer);

  // const isAvailable = vehicle.status === "available";

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  // const handleChip = (cuota: number): boolean => {
  //   const exist = vehicle.salePrices.find(
  //     (cuotaVehicle) => cuotaVehicle.weeks === cuota
  //   );
  //   return !!exist;
  // };

  const handleCity = (city: string): string => {
    switch (city) {
      case "Guadalajara":
        return "GDL";

      case "Ciudad de México":
        return "CDMX";

      default:
        return "CDMX";
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const renderCardHelperBody = () => {
    return !matchesXS ? (
      <div
        className="display_flex"
        style={{
          flexDirection: "column",
          justifyContent: "start",
          padding: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
          }}
        >
          <img
            src={HelperCardImg}
            alt="thumbnail"
            style={{
              maxHeight: "80px",
              minWidth: "124px",
              height: "auto",
              width: "35%",
              marginLeft: "10px",
              marginRight: "25px",
              borderRadius: 10,
              marginBottom: 20,
            }}
          />
          <div
            style={{
              marginTop: "-12.5px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "start",
            }}
          >
            <Typography
              scale="large"
              weight="400"
              className="text_neutral_800 "
            >
              <span className="text_primary_300">¿Te ayudamos</span> a encontrar{" "}
              <span className="text_neutral_900">tu moto personalizada?</span>
            </Typography>
          </div>
        </div>
        <div style={{ borderBottom: "0.529801px solid #DEDEDE" }} />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <div style={{ height: 80 }}>
            <div
              className="display_flex m_t_md"
              style={{ flexDirection: "column" }}
            >
              <div className="w_100_per bg_neutral_300 br_xs display_flex flex_center m_b_md">
                <Typography
                  scale="xsmall"
                  weight="600"
                  className="text_neutral_800 text_center "
                  style={{
                    width: "100%",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    padding: "5px 10px",
                  }}
                >
                  Sin checar buró
                </Typography>
              </div>
              <div className="w_100_per bg_neutral_300 br_xs display_flex flex_center">
                <Typography
                  scale="xsmall"
                  weight="600"
                  className="text_neutral_800 text_center "
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    padding: "5px 10px",
                  }}
                >
                  Sin dar enganche
                </Typography>
              </div>
            </div>
          </div>
          <div style={{ height: 80, width: "60%", padding: "10px 0px 0 15px" }}>
            <div
              className="
                  display_flex
                  "
              style={{
                borderRadius: "10px",
                padding: 10,
                backgroundColor: "#FDE9D3",
              }}
            >
              <div className="w_100_per">
                <Typography
                  scale="heading3"
                  weight="600"
                  scaleMobile="heading3"
                  className="text_primary_300 txt-center p_b_lg"
                >
                  ¡Haz la prueba!
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div style={{ padding: 10 }}>
        <div className="image-box">
          <CardMedia
            component="img"
            height="180"
            className=" br_xs "
            image={HelperCardImg}
            alt="helper"
            sx={{ borderRadius: 2 }}
          />
        </div>

        <div style={{ height: 120 }}>
          <Typography
            scale={!matchesXS ? "heading2" : "heading4"}
            weight="600"
            className="text_neutral_800 p_t_md"
          >
            <span className="text_primary_300">¿Te ayudamos</span>{" "}
            <span style={{ fontWeight: "normal" }}>a encontrar</span> tu moto
            ideal?
          </Typography>
        </div>

        <div style={{ height: 100 }}>
          <div className="display_flex flex_gap_xs w_100_per m_b_xs">
            <div className="w_50_per bg_neutral_300 br_xs display_flex flex_center">
              <Typography
                scale="xsmall"
                weight="600"
                className="text_neutral_800 text_center p_y_xs"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Sin checar buró
              </Typography>
            </div>
            <div className="w_50_per bg_neutral_300 br_xs display_flex flex_center">
              <Typography
                scale="xsmall"
                weight="600"
                className="text_neutral_800 text_center p_y_xs"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Sin dar enganche
              </Typography>
            </div>
          </div>
          <div className="display_flex flex_gap_xs w_100_per">
            <div className="w_100_per bg_neutral_300 br_xs display_flex flex_center">
              <Typography
                scale="xsmall"
                weight="600"
                className="text_neutral_800 text_center p_y_xs"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Que se ajuste a tu presupuesto
              </Typography>
            </div>
          </div>
        </div>

        <div
          className="br_b_xs m_t_xs w_100_per"
          style={{
            backgroundColor: isHovering ? "#FDE9D3" : "#ecedef",
            height: 100,
          }}
        >
          <Typography scale="medium" weight="400" className="text_center p_md">
            Si no estás seguro de{" "}
            <span style={{ fontWeight: "bold" }}>qué moto escoger,</span>{" "}
            <span style={{ fontWeight: "bold" }} className="text_primary_300">
              ¡te ayudamos!
            </span>
          </Typography>
        </div>
      </div>
    );
  };

  const renderCardVehicle = () =>
    !matchesXS ? (
      <div
        className="display_flex"
        style={{
          flexDirection: "column",
          justifyContent: "start",
          padding: "7.5px 10px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <img
            src={vehicle.images && vehicle.images[0]?.url}
            alt="thumbnail"
            style={{
              maxHeight: "80px",
              minWidth: "124px",
              height: "auto",
              width: "35%",
              marginLeft: "10px",
              marginRight: "25px",
              borderRadius: 10,
              marginBottom: 20,
            }}
          />
          <div
            style={{
              marginTop: "-30px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "start",
            }}
          >
            <Typography scale="small" weight="600" className="text_neutral_600">
              <span>
                <GPS className="text_neutral_800 dim_10_px m_r_xs" />
              </span>
              {handleCity(vehicle.city?.name || "Ciudad de México")}
            </Typography>
            <Typography
              scale="medium"
              weight="600"
              className=""
              style={{
                overflowWrap: "break-word",
                width: "40vw",
              }}
            >
              {`${vehicle.brand?.name} ${vehicle.model?.name} ${
                vehicle?.cylindersCapacity?.value
              }${vehicle?.suffix ? vehicle.suffix : ""}`}
            </Typography>
            <div
              className="display_flex"
              style={{
                flexDirection: "row",
                paddingRight: 5,
              }}
            >
              <Typography scale="xsmall" weight="600">
                {vehicle?.details?.year}
              </Typography>
              <Divider />
              <Typography scale="xsmall" weight="600">
                {`${vehicle?.cylindersCapacity?.value} CC`}
              </Typography>
              <Divider />
              <Typography scale="xsmall" weight="600">
                {`${vehicle?.details?.milage} Km`}
              </Typography>
            </div>
          </div>
        </div>
        <div style={{ borderBottom: "0.529801px solid #DEDEDE" }} />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          {/* <div
            style={{ height: 80 }}
            className=" display_flex flex_col flex_center flex_gap_xs  "
          >
            <Typography
              scale="xsmall"
              weight="600"
              className="text_neutral_800 text_center"
            >
              Durante:
            </Typography>
            {vehicle?.salePrices && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                {Object.entries(vehicle.salePrices).map(([key, value], idx) => (
                  <TextBox
                    key={idx}
                    credit={value}
                    creditTime={creditTime}
                    changeCredit={(e: any) => changeCredit(e, value)}
                  />
                ))}
              </div>
            )}
            <Typography
              scale="xsmall"
              weight="400"
              className="text_neutral_800 text_center"
            >
              Semanas para pagar
            </Typography>
          </div> */}
          {/* <div
            style={{
              height: 80,
              width: "60%",
              padding: "10px 0px 0 15px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              className="display_flex"
              style={{
                justifyContent: "center",
                borderRadius: "10px",
                padding: 10,
                width: "100%",
                backgroundColor: "#FDE9D3",
              }}
            >
              <div className={hasDiscount ? "" : "text_center"}>
                <Typography
                  scale="xsmall"
                  weight="400"
                  className="text_primary_300"
                  style={{
                    textDecoration: "line-through",
                    marginTop: hasDiscount ? "-5px" : "10px",
                  }}
                >
                  {hasDiscount && (
                    <>
                      <span>
                        $
                        {vehicle.getWeeklyPriceWithoutDescount(
                          creditTime?.weeks
                        )}
                      </span>{" "}
                    </>
                  )}
                </Typography>
                <Typography
                  scale="heading2"
                  weight="600"
                  scaleMobile="heading1"
                  className="text_primary_300 "
                >
                  $
                  {formatPrice(
                    prices(vehicle.getWeeklyPrice(creditTime?.weeks)),
                    ""
                  )}
                </Typography>
              </div>
              <div className=" display_flex flex_col flex_justify_end p_l_xs p_b_md">
                {hasDiscount && (
                  <div
                    className=""
                    style={{
                      backgroundColor: "rgb(26,186,89)",
                      color: "white",
                      borderBottomRightRadius: 10,
                      borderBottomLeftRadius: 10,
                      padding: 3,
                      marginBottom: 15,
                    }}
                  >
                    <DiscountLabel
                      total={vehicle.getWeeklyPriceWithoutDescount(
                        creditTime?.weeks
                      )}
                      value={vehicle.getWeeklyPrice(creditTime?.weeks)}
                    />
                  </div>
                )}
                <Typography
                  scale="xsmall"
                  weight="400"
                  className="text_primary_300"
                >
                  /Semanales
                </Typography>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    ) : (
      <div style={{ padding: 10 }}>
        <div className="image-box ">
          <CardMedia
            component="img"
            height="180"
            className="br_xs"
            image={vehicle.images && vehicle.images[0]?.url}
            alt="vehicle"
            sx={{ borderRadius: 2 }}
          />
        </div>
        <div
          style={{ height: 80, flexDirection: "column" }}
          className="display_flex flex_center  "
        >
          <Typography
            scale="heading4"
            scaleMobile="heading1"
            weight="600"
            className="text_center"
          >
            {`${vehicle.brand?.name} ${vehicle.model?.name} ${
              vehicle?.cylindersCapacity?.value
            }${vehicle?.suffix ? vehicle.suffix : ""}`}
          </Typography>

          <div className="display_flex flex_gap_xs w_100_per p_x_md m_b_xs">
            <div className="display_flex flex_center bg_neutral_0 w_50_per br_xxs p_y_xxxs flex_wrap">
              <GPS
                className="text_neutral_800 m_x_xxs"
                style={{ width: "12px" }}
              />
              <Typography
                scale="medium"
                weight="600"
                className="text_neutral_800"
              >
                {handleCity(vehicle.city?.name || "Ciudad de México")}
              </Typography>
            </div>
            <div className="display_flex flex_center bg_neutral_0 w_50_per br_xxs p_y_xxxs">
              <Checkmark
                className="text_green_300 m_x_xxs"
                style={{ width: "12px" }}
              />
              <Typography
                scale="medium"
                weight="600"
                className="text_green_300"
              >
                Disponible
              </Typography>
            </div>
          </div>
        </div>
        <div
          style={{ height: 85, padding: 10 }}
          className="bg_neutral_400  shadow_soft"
        >
          <div className="display_flex flex_gap_xs m_b_xs">
            <div className="display_flex flex_center bg_neutral_0 w_50_per br_xxs p_y_xxxs flex_wrap">
              <Date
                className="text_neutral_800 m_x_xxs"
                style={{ width: "12px" }}
              />
              <Typography scale="small" weight="600">
                {vehicle?.details?.year}
              </Typography>
            </div>
            <div className="display_flex flex_center bg_neutral_0 w_50_per br_xxs p_y_xxxs">
              <Motorcycle
                className="text_neutral_800 m_x_xxs"
                style={{ width: "12px" }}
              />
              <Typography scale="small" weight="600">
                {`${vehicle?.cylindersCapacity?.value} CC`}
              </Typography>
            </div>
          </div>
          <div className="display_flex flex_gap_xs ">
            <div className="display_flex flex_center bg_neutral_0 w_50_per br_xxs p_y_xxxs">
              <PriceTag
                className="text_neutral_800 m_x_xxs"
                style={{ width: "12px" }}
              />
              <Typography scale="small" weight="600">
                {vehicle?.brand?.name}
              </Typography>
            </div>
            <div className="display_flex flex_center bg_neutral_0 w_50_per br_xxs p_y_xxxs">
              <Speedometer
                className="text_neutral_800 m_x_xxs"
                style={{ width: "12px" }}
              />
              <Typography scale="small" weight="600">
                {`${vehicle?.details?.milage} Km`}
              </Typography>
            </div>
          </div>
        </div>

        {/* <div
          style={{
            height: 80,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <div
            style={{ height: 80 }}
            className=" display_flex flex_col flex_center flex_gap_xs  "
          >
            <Typography
              scale="xsmall"
              weight="600"
              className="text_neutral_800 text_center"
            >
              Durante:
            </Typography>
            {vehicle?.salePrices && (
              <div style={{ display: "flex", flexDirection: "row" }}>
                {Object.values(vehicle.salePrices)
                  .filter((price: any) =>
                    vehicle.creditTime.includes(price.weeks)
                  )
                  .map((credit: any, idx: number) => (
                    <TextBox
                      key={idx}
                      credit={credit}
                      creditTime={creditTime}
                      changeCredit={(e: any) => changeCredit(e, credit)}
                    />
                  ))}
              </div>
            )}
            <Typography
              scale="xsmall"
              weight="400"
              className="text_neutral_800 text_center"
            >
              Semanas para pagar
            </Typography>
          </div>
        </div> */}
        {/* <div style={{ height: 80 }} className=" ">
          <div
            className="br_xs p_x_md_desktop p_x_xl_mobile p_y_xs_desktop p_y_md_mobile   display_flex flex_gap_xs_desktop flex_gap_md_mobile"
            style={{ backgroundColor: isHovering ? "#FDE9D3" : "#ecedef" }}
          >
            <div className="w_50_per">
              <Typography
                scale="xsmall"
                weight="400"
                className="text_primary_300"
              >
                {hasDiscount ? (
                  <>
                    Antes:{" "}
                    <span style={{ textDecoration: "line-through" }}>
                      $
                      {vehicle.getWeeklyPriceWithoutDescount(creditTime?.weeks)}
                    </span>{" "}
                  </>
                ) : (
                  "Desde"
                )}
              </Typography>
              <Typography
                scale="heading2"
                weight="600"
                scaleMobile="heading1"
                className="text_primary_300"
              >
                $
                {formatPrice(
                  prices(vehicle.getWeeklyPrice(creditTime?.weeks)),
                  ""
                )}
              </Typography>
            </div>
            <div
              className="w_50_per display_flex flex_col p_b_xs"
              style={{ justifyContent: "space-between" }}
            >
              {hasDiscount && (
                <div
                  className="m_b_xs"
                  style={{
                    backgroundColor: "rgb(26,186,89)",
                    color: "white",
                    marginTop: "-7px",
                    borderBottomRightRadius: 10,
                    borderBottomLeftRadius: 10,
                    padding: 3,
                  }}
                >
                  <DiscountLabel
                    total={vehicle.getWeeklyPriceWithoutDescount(
                      creditTime?.weeks
                    )}
                    value={vehicle.getWeeklyPrice(creditTime?.weeks)}
                  />
                </div>
              )}
              <Typography
                scale="medium"
                weight="400"
                className="text_primary_300"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  marginTop: hasDiscount ? "10px" : "30px",
                }}
              >
                / Semanales
              </Typography>
            </div>
          </div>
        </div> */}
      </div>
    );

  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <div
      className="dso_card  bg_neutral_0  cursor_pointer"
      onClick={handleCardClick}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      {isHelperCard ? renderCardHelperBody() : renderCardVehicle()}
    </div>
  );
};

export default OzonCardVehicle;
