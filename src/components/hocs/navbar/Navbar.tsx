/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/tabindex-no-positive */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useHistory, useLocation } from "react-router-dom";
import ReactGA from "react-ga4";
import Swal from "sweetalert2";
import logoc from "static/logos/logoc.svg";
import { RootState, store } from "store/index";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";

// design
import "./navbar.scss";

// imgs
import { ReactComponent as HamMenu } from "@ecommerce-ozon/design_system/dist/public/static/icons/hamburger-menu.svg";
import { ReactComponent as Money } from "@ecommerce-ozon/design_system/dist/public/static/icons/money.svg";
import { ReactComponent as Curp } from "@ecommerce-ozon/design_system/dist/public/static/icons/user-card-2.svg";
import { ReactComponent as Motorcycle } from "@ecommerce-ozon/design_system/dist/public/static/icons/motorcycle.svg";
import { ReactComponent as Faq } from "@ecommerce-ozon/design_system/dist/public/static/icons/faq.svg";
import { ReactComponent as Email } from "@ecommerce-ozon/design_system/dist/public/static/icons/email.svg";
import { ReactComponent as Map } from "@ecommerce-ozon/design_system/dist/public/static/icons/map.svg";

import {
  Button,
  Input,
  Modal,
  Typography,
} from "@ecommerce-ozon/design_system";
import {
  fetchGetCreditTotals,
  fetchGetIdCredit,
  fetchLogin,
} from "helpers/fetchMiCuenta";
import { AddAllDataAccount } from "store/actions/account";
import useOnClickOutside from "hooks/useOnClickOutside";
import useUserVerificationDetails from "hooks/useUserVerificationDetails";
import moment from "moment";
import { TCredit, TCreditTotals } from "models/credit.interface";
import { TDataozoner } from "models/ozoner.interface";
import { TCreditPayment } from "models/credit-payment.interface";
import { TVehicle } from "models/vehicle.interface";
import { Cities } from "../../../store/reducers/cityReducer";
import { changeRootCity } from "../../../store/actions/city";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string().required("CURP is required"),
});

export const getCityName = (cityID: string | null) => {
  switch (cityID) {
    case Cities.CDMX:
      return "CDMX";
    case Cities.GUADALAJARA:
      return "Guadalajara";
    default:
      return "Escoger Ciudad";
  }
};

type NavbarProps = {
  setOpenCityModal: Function;
};
export const Navbar: React.FC<NavbarProps> = ({ setOpenCityModal }) => {
  const creditRedux: TCredit = store.getState().accountReducer.credit;
  const ModalDesktop = useRef(null);
  const dispatch = useDispatch();
  // const { creditId } = useSelector((state: RootState) => state.accountReducer);
  const history = useHistory();
  const isMobile = useMediaQuery({
    query: "(max-width: 600px)",
  });
  const location = useLocation();
  const [sideBar, setSideBar] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setshowModal] = useState<boolean>(false);
  const [url, setURL] = useState("");
  const [creditScore, setcreditScore] = useState<number>();
  const [results, setResults] = useUserVerificationDetails();

  const handleClickOutsideFn = () => setshowModal(false);
  useOnClickOutside(ModalDesktop, handleClickOutsideFn);

  const handleCitySelection = () => {
    setOpenCityModal(true);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: ({ email, password }) => {
      setLoading(true);
      fetchLogin(email, password)
        .then(async ({ user }) => {
          const ozoner: TDataozoner = user;
          const credits: TCredit[] = await fetchGetIdCredit(ozoner._id);
          const lastCredit: TCredit = credits[credits.length - 1];
          const creditTotals: TCreditTotals = await fetchGetCreditTotals(
            lastCredit._id
          );
          const lastPayment: TCreditPayment =
            lastCredit.payments[lastCredit.payments.length - 1];
          const vehicleOzoner: TVehicle = ozoner.vehicle;
          lastCredit?.payments.reverse();
          dispatch(
            AddAllDataAccount(
              creditTotals,
              lastPayment,
              lastCredit,
              ozoner,
              vehicleOzoner
            )
          );
          setLoading(false);
          setshowModal(false);
          history.push("/micuenta");
        })
        .catch((e) => {
          setLoading(false);
          Swal.fire({
            customClass: {
              container: "my-swal",
            },
            text: "Cuenta no esta habilitada",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
          console.log(e);
        });
    },
  });

  const paths = [
    {
      path: "/catalogo",
      icon: Motorcycle,
      label: "Catálogo",
    },
    {
      path: "/vende-tu-moto",
      icon: Money,
      label: "Vende tu moto",
    },
    {
      path: "/faqs",
      icon: Faq,
      label: "Ayuda",
    },
  ];

  useEffect(() => {
    setURL(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    if (
      results.creditCalculation.score > 0 &&
      results.timestamp > moment().unix()
    ) {
      setcreditScore(results.creditCalculation.score);
    } else {
      setcreditScore(0);
    }
  }, [results]);

  function toggleSideBar() {
    setSideBar(!sideBar);
  }
  function toggleModal() {
    if (showModal && creditRedux === undefined) {
      setshowModal(false);
    }
    if (!showModal && creditRedux === undefined) {
      setshowModal(true);
    }

    if (showModal === false && creditRedux !== undefined) {
      history.push("/micuenta");
    }
  }

  function handleSidebar(selectedSection: string) {
    if (selectedSection === "/vende-tu-moto") {
      // analytics event
      ReactGA.event("CTA_ozocio_navbar", {
        category: "Ozocio",
        label: "click ozocio from navbar",
      });
    } else if (selectedSection === "/faqs") {
      ReactGA.event("CTA_navbar_FAQS", {
        category: "Support",
        label: "click faqs from navbar to FAQS view",
      });
    } else if (selectedSection === "/catalogo") {
      ReactGA.event("CTA_catalog_navbar", {
        category: "Marketplace",
        label: "click catalog from navbar to catalog view",
      });
    } else {
      ReactGA.event("CTA_navbar_icon", {
        category: "Support",
        label: "click ozon´s icon button to home view (/)",
      });
    }
    history.push(selectedSection);
  }

  const { pathname } = useLocation();

  const { city: cityState } = useSelector(
    (state: RootState) => state.cityReducer
  );

  const city = localStorage.getItem("city");

  const renderCity = () => {
    return getCityName(city);
  };

  useEffect(() => {
    renderCity();
    if (city === Cities.CDMX || city === Cities.GUADALAJARA) {
      dispatch(changeRootCity(city));
    }
  }, [cityState]);

  return (
    <div
      className="pos_fixed display_block"
      style={{ zIndex: 999, width: "100%" }}
    >
      <header className="navbar shadow_medium ">
        <div className="main-container">
          <div
            className="display_flex"
            style={{ justifyContent: "start", alignItems: "center" }}
          >
            <img
              src={logoc}
              alt="Logo"
              onClick={() => handleSidebar("/")}
              className="h_xl  cursor_pointer"
            />
            <div
              className="m_x_md"
              style={{ borderLeft: "1px solid orange", height: "20px" }}
            />
            {localStorage.getItem("city") && (
              <Map
                className=" text_primary_300  "
                style={{ padding: "5px 0px" }}
              />
            )}
            <div onClick={handleCitySelection} style={{ cursor: "pointer" }}>
              <Typography weight="600" scale="small" textColor="primary_200">
                {renderCity()}
              </Typography>
            </div>
          </div>

          <Button
            className="display_none_desktop"
            variant="icon"
            scale="small"
            subvariant="edit"
            icon={<HamMenu />}
            onClick={toggleSideBar}
          />
          <div
            className={`backdrop display_none_desktop ${sideBar ? "open" : ""}`}
            onClick={toggleSideBar}
            tabIndex={0}
          >
            <div className="sidebar" tabIndex={1}>
              <img
                src={logoc}
                alt="Logo"
                onClick={() => handleSidebar("/")}
                className="m_y_xxxl center_x h_xl"
              />
              <div className="flex_center_col flex_align_start p_xxl ">
                <div
                  className="dim_100_per flex_center m_b_xs"
                  style={{ borderBottom: "1px solid #E0E3E5" }}
                >
                  <Button
                    variant="principal"
                    className="m_b_xl w_100_per"
                    scale="small"
                    icon={creditRedux !== undefined ? <Money /> : <Curp />}
                    onClick={toggleModal}
                  >
                    {creditRedux !== undefined
                      ? "Paga aquí tu moto"
                      : "Iniciar Sesión"}
                  </Button>
                </div>

                {paths.map((ele) => {
                  const Img = ele.icon;
                  return (
                    <Button
                      variant="link"
                      key={ele.path}
                      className={`${ele.path === url ? "active" : ""} m_b_md`}
                      icon={<Img />}
                      scale="small"
                      onClick={() => handleSidebar(ele.path)}
                    >
                      {ele.label}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex_center flex_justify_end flex_grow_1 display_none_mobile pos_relative">
            {paths.map((ele) => {
              const Img = ele.icon;
              return (
                <Button
                  variant="link"
                  key={ele.path}
                  className={`${
                    ele.path === url ? "m_r_xxxl active" : "m_r_xxxl"
                  }`}
                  icon={<Img />}
                  scale="small"
                  onClick={() => handleSidebar(ele.path)}
                >
                  {ele.label}
                </Button>
              );
            })}
            {creditScore ? (
              <Button
                variant="principal"
                icon={<Money />}
                onClick={() =>
                  history.push(
                    `/catalogo?creditScore=${Math.ceil(creditScore)}`
                  )
                }
                scale="small"
                className="buttonPre"
              >
                <Typography weight="400" scale="xsmall">
                  Tienes un pre-aprobado
                </Typography>
                <Typography weight="600" scale="medium">
                  ${Math.ceil(creditScore)} semanales
                </Typography>
              </Button>
            ) : (
              <Button
                variant="principal"
                icon={creditRedux !== undefined ? <Money /> : <Curp />}
                onClick={toggleModal}
                scale="small"
              >
                {creditRedux !== undefined
                  ? "Paga aquí tu moto"
                  : "Iniciar Sesión"}
              </Button>
            )}

            {showModal && (
              <div
                ref={!isMobile ? ModalDesktop : null}
                className="dso_card bg_neutral_0 display_none_mobile"
                style={{
                  backgroundColor: "white",
                  width: "392px",
                  position: "absolute",
                  top: "6rem",
                  transition: "all 0.5s ease-out",
                }}
              >
                <form onSubmit={formik.handleSubmit}>
                  <div className="shadow_hard display_flex flex_center p_y_md">
                    <Typography scale="large" weight="600" className="">
                      Ingresa a{" "}
                      <span className="text_primary_300">tu cuenta OZON</span>
                    </Typography>
                  </div>
                  <div className="p_x_xs p_b_xs">
                    <div className="bg_neutral_300 br_b_md h_100_per p_md">
                      <Input
                        className="w_100_per"
                        name="email"
                        title="Correo"
                        icon={<Email />}
                        type="text"
                        placeholder="Escribe tu correo aquí"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                      />
                      <Input
                        className="w_100_per"
                        name="password"
                        title="CURP"
                        icon={<Curp />}
                        type="text"
                        placeholder="Escribe tu CURP aquí"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                      />
                      <Button
                        variant="principal"
                        scale="small"
                        className="w_100_per"
                        type="submit"
                        disabled={!(formik.isValid && formik.dirty) || loading}
                      >
                        {loading ? "Cargando..." : "Ingresar"}
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </header>
      {!location.pathname.includes("/micuenta/") && (
        <header
          className={`navbar-micuenta shadow_medium display_none_desktop flex_center
         ${pathname === "/catalogo" ? "display_none_mobile" : ""}
         `}
        >
          <div className="m_y_md flex_center">
            <Money className="dim_15_px text_neutral_0" />
            <Typography
              scale="small"
              weight="600"
              className="text_neutral_0 m_x_xs"
            >
              ¿Quieres pagar tu moto?
            </Typography>
            <Button
              variant="principal"
              style={{
                backgroundColor: "white",
                color: "#fe8a02",
                padding: "4px 7px",
              }}
              onClick={toggleModal}
              scale="small"
            >
              {creditRedux !== undefined ? "Paga ahora" : "Iniciar Sesión"}
            </Button>
          </div>
        </header>
      )}

      {isMobile && (
        <Modal open={showModal} setOpen={setshowModal} className="">
          <form onSubmit={formik.handleSubmit}>
            <Typography scale="large" weight="600" className="m_b_lg">
              Ingresa a <span className="text_primary_300">tu cuenta OZON</span>
            </Typography>
            <Input
              className="w_100_per"
              name="email"
              title="Correo"
              icon={<Email />}
              type="text"
              placeholder="Escribe tu correo aquí"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <Input
              className="w_100_per"
              name="password"
              title="CURP"
              icon={<Curp />}
              type="text"
              placeholder="Escribe tu CURP aquí"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <Button
              variant="principal"
              scale="small"
              type="submit"
              className="w_100_per"
              disabled={!(formik.isValid && formik.dirty) || loading}
            >
              {loading ? "Cargando..." : "Ingresar"}
            </Button>
          </form>
        </Modal>
      )}
    </div>
  );
};
