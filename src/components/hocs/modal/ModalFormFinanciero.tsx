/* eslint-disable no-unneeded-ternary */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React, {
  FC,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import {
  Modal,
  Typography,
  Input,
  Button,
  SelectorGroup,
} from "@ecommerce-ozon/design_system";
import {
  setCreditVerificationCreditTimeAction,
  setCreditVerificationVehicleAction,
} from "store/actions/creditVerification";
import { useHistory } from "react-router-dom";
import { TVehicle } from "models/vehicle.interface";
import {
  CreditContext,
  CreditPhases,
} from "views/creditCalculation/context/context";
import { ReactComponent as Money } from "@ecommerce-ozon/design_system/dist/public/static/icons/money.svg";
import { ReactComponent as Moto } from "@ecommerce-ozon/design_system/dist/public/static/icons/motorcycle.svg";
import { ReactComponent as Email } from "@ecommerce-ozon/design_system/dist/public/static/icons/email.svg";
import { ReactComponent as CardBoy } from "@ecommerce-ozon/design_system/dist/public/static/icons/user-card-2.svg";
import { DigitalPlatformsFormValues } from "components/creditDigitalPlatforms/CreditDigitalPlatforms";
import { ReactComponent as Uber } from "@ecommerce-ozon/design_system/dist/public/static/icons/UBER.svg";
import { ReactComponent as Rappi } from "@ecommerce-ozon/design_system/dist/public/static/icons/Rppi.svg";
import { ReactComponent as Didi } from "@ecommerce-ozon/design_system/dist/public/static/icons/DIDI.svg";
import { ReactComponent as Jkr } from "@ecommerce-ozon/design_system/dist/public/static/icons/JKR.svg";
import { ReactComponent as Mensajeros } from "@ecommerce-ozon/design_system/dist/public/static/icons/mensajeros.svg";
import { ReactComponent as Meli } from "@ecommerce-ozon/design_system/dist/public/static/icons/mercadolibre.svg";
import { ReactComponent as Ivoy } from "@ecommerce-ozon/design_system/dist/public/static/icons/ivoy.svg";
import { ReactComponent as Zubale } from "@ecommerce-ozon/design_system/dist/public/static/icons/zubale.svg";
import { ReactComponent as ValIcon } from "@ecommerce-ozon/design_system/dist/public/static/icons/verified-user.svg";
import {
  CreditFormResponseData,
  fetchCheckIn,
  UserDocument,
} from "helpers/fetchCheckIn";
import { getVehicle } from "helpers/fetchVehicles";
import { CalculationStepperFormValues } from "views/creditCalculation/CreditCalculationStepperView";
import { ValidateIdentityStepperFormValues } from "views/validateIdentity/ValidateIdentity";
import useUserVerificationDetails from "hooks/useUserVerificationDetails";
import logo from "./logo-modal.png";
import { ReactComponent as EyeOff } from "./eye-off.svg";
import { ReactComponent as Two } from "./two.svg";
import { ReactComponent as Three } from "./three.svg";
import { ReactComponent as Four } from "./four.svg";

// css
import "./modalformfinanciero.scss";

const curpRegex =
  /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/;
const validationSchema = yup.object({
  email: yup.string().email("Debe ser email").required("Campo requerido"),
  curp: yup
    .string()
    .required("Campo requerido")
    .matches(curpRegex, "CURP inválido"), // Reference: https://vidadigital.com.mx/es/expresiones/regulares/curp/
  authDataTreatment: yup
    .bool()
    .required("Campo requerido")
    .test(
      "is-true",
      "El valor debe ser siempre true",
      (value) => value === true
    ),
});

interface Form {
  name: string;
  email: string;
  curp: string;
  workInDigitalPlatforms: boolean;
  platforms: (number | string)[];
  authDataTreatment: boolean;
}

type TypeOrientation = "horizontal" | "vertical";

interface Props {
  open: boolean;
  setOpen: Function;
  vehicleSelected?: TVehicle;
  selectedCreditTime?: number;
  orientation?: TypeOrientation;
  title?: ReactElement<any, any>;
  subtitle?: ReactElement<any, any>;
  description?: ReactElement<any, any>;
}

const getDocumentByType = ({
  documents,
  type,
}: {
  documents?: UserDocument[];
  type: string;
}) => {
  if (!documents) {
    return undefined;
  }
  return documents.find((document) => document.type === type);
};

const buildCreditForm = (
  creditFormData: CreditFormResponseData
): CalculationStepperFormValues & any => {
  const {
    monthlyIncome,
    monthlySpending,
    childrenCount,
    dependantsCount,
    group,
    companyName,
    educationalLevel,
    economicActivity,
    civilStatus,
    livesWith,
    name,
    firstLastName,
    secondLastName,
    email,
    phone,
    documents,
    // eslint-disable-next-line camelcase
    personal_references,
    curp,
    _id,
  } = creditFormData;
  return {
    incomeStep: {
      monthlyIncome,
      monthlySpending,
    },
    dependantsStep: {
      childrenCount,
      dependantsCount,
    },
    activityStep: {
      group,
      companyName,
      economicActivity,
      educationalLevel,
    },
    userStatusStep: {
      civilStatus,
      livesWith,
    },
    userInfoStep: {
      name,
      firstLastName,
      secondLastName,
      email,
      phone,
      curp,
    },
    assetsStep: {
      assets: [],
    },
    identity: {
      ine_front: getDocumentByType({ documents, type: "ine_front" }),
      ine_back: getDocumentByType({ documents, type: "ine_back" }),
      selfie: getDocumentByType({ documents, type: "selfie" }),
    },
    bank_certificates: {
      bank_certificate_1: getDocumentByType({
        documents,
        type: "bank_certificate_1",
      }),
      bank_certificate_2: getDocumentByType({
        documents,
        type: "bank_certificate_2",
      }),
      bank_certificate_3: getDocumentByType({
        documents,
        type: "bank_certificate_3",
      }),
    },
    proof_of_address: getDocumentByType({
      documents,
      type: "proof_of_address",
    }),
    // eslint-disable-next-line camelcase
    personal_references,
    _id,
  };
};

export const ModalFormFinanciero: FC<Props> = ({
  open,
  setOpen,
  vehicleSelected,
  selectedCreditTime,
  title,
  subtitle,
  description,
  orientation = "horizontal",
}) => {
  const { setPhase } = useContext(CreditContext);
  const dispatch = useDispatch();
  const [results, setResults] = useUserVerificationDetails();
  const history = useHistory();
  const [loading, setloading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "search",
      email: "",
      curp: "",
      workInDigitalPlatforms: false,
      platforms: [],
      authDataTreatment: false,
    },
    validationSchema,
    onSubmit: async (value: Form) => {
      const {
        email,
        name,
        curp,
        workInDigitalPlatforms,
        platforms,
        authDataTreatment,
      } = value;
      setloading(true);
      localStorage.setItem("emailModal", email);
      localStorage.setItem("curpModal", curp);

      if (workInDigitalPlatforms) {
        const digitalPlatforms: DigitalPlatformsFormValues = {
          authDataTreatment,
          platforms,
          workInDigitalPlatforms,
        };
        setResults({
          ...results,
          digitalPlatforms,
          timestamp: Date.now(),
        });
      }
      if (vehicleSelected && selectedCreditTime) {
        dispatch(setCreditVerificationVehicleAction(vehicleSelected));
        dispatch(setCreditVerificationCreditTimeAction(selectedCreditTime));

        setPhase(CreditPhases.CreditForm);
      }
      fetchCheckIn({
        email,
        name,
        curp,
        search: true,
      })
        .then(async (data) => {
          const creditForms = data?.user?.financialForm;
          const nameUser = data?.user?.name;
          if (creditForms.length > 0) {
            const { vehicleId, creditTime } = creditForms[0];
            if (vehicleId) {
              const vehicle = await getVehicle(vehicleId);
              if (vehicle!.status === "available") {
                dispatch(setCreditVerificationVehicleAction(vehicle!));
              }
            }
            if (creditTime) {
              dispatch(setCreditVerificationCreditTimeAction(creditTime));
            }
            setOpen(false);
            history.push(
              "/financia-tu-moto/results",
              buildCreditForm({
                ...creditForms[0],
                email,
                name: nameUser,
              })
            );
          } else {
            setloading(false);
            setOpen(false);
            history.push("/financia-tu-moto");
          }
        })
        .catch((err) => {
          if (err.statusCode === 404) {
            setloading(false);
            setOpen(false);
            history.push("/financia-tu-moto");
          }
          if (err.statusCode === 401) {
            formik.setFieldError("email", "¡Email registrado!");
            formik.setFieldError(
              "curp",
              "¡CURP no coincide con el email registrado!"
            );
          }
        })
        .finally(() => {
          setloading(false);
        });
    },
  });

  useEffect(() => {
    if (!vehicleSelected) {
      formik.setFieldValue("authDataTreatment", true);
    } else {
      formik.setFieldValue("authDataTreatment", false);
    }
  }, [vehicleSelected]);

  const onPlatformsChange = useCallback(
    (platforms) => {
      formik.setFieldValue("platforms", platforms);
    },
    [formik.setFieldValue]
  );

  const onworkInDigitalPlatformsChange = useCallback(() => {
    formik.setFieldValue("workInDigitalPlatforms", false);
  }, [formik.setFieldValue]);

  const onCheckboxChange = useCallback(
    (e) => {
      // eslint-disable-next-line default-case
      switch (e.target.value) {
        case "1":
          formik.setFieldValue("authDataTreatment", e.target.checked);
          break;
      }
    },
    [formik.setFieldValue]
  );

  useEffect(() => {
    if (open) {
      setResults({
        creditCalculation: {
          state: {
            completed: false,
          },
          score: 0,
          vehicles: [],
        },
        digitalPlatforms: {
          platforms: [],
          authDataTreatment: false,
          workInDigitalPlatforms: false,
        },
        timestamp: Date.now(),
      });
      localStorage.setItem("emailModal", "");
      localStorage.setItem("curpModal", "");
    }
  }, [open]);

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      className="modalF p_none bg_neutral_300"
    >
      <div className="display_flex flex_col_mobile">
        <div className="flex_1 w_100_per modalInf p_xxl text_neutral_0">
          <img src={logo} alt="logo" />
          {subtitle || (
            <Typography
              weight="600"
              scale="heading3"
              className="text_primary_300"
            >
              {vehicleSelected
                ? "¡Excelente elección de moto, ozoner!"
                : "¡Estas a solo 1 paso de conseguir tú moto!"}
            </Typography>
          )}

          {description || (
            <Typography
              weight="400"
              scale="large"
              className="text_neutral_0 m_y_md display_none_mobile"
            >
              {vehicleSelected ? (
                <span style={{ fontWeight: "bold" }}>
                  Disfruta de estos y más beneficios al comprar una de nuestras
                  motos:
                </span>
              ) : (
                <>
                  Recuerda que con OZON,{" "}
                  <span style={{ fontWeight: "bold" }}>
                    podrás disfrutar de estos beneficios:
                  </span>
                </>
              )}
            </Typography>
          )}

          {/* CARDS */}
          <div className="display_flex flex_gap_md display_none_mobile">
            <div
              className={`${
                orientation === "vertical" && "flex_col"
              } flex_1 display_flex`}
            >
              <div
                className={`${
                  orientation === "vertical" ? "br_t_xs h_50_per" : "br_l_xs"
                } bg_neutral_0 flex_center p_md`}
              >
                <EyeOff />
              </div>
              <div
                className={`${
                  orientation === "vertical"
                    ? "br_b_xs text_center h_50_per"
                    : "br_r_xs"
                } bg_neutral_500 flex_center  p_md`}
              >
                <Typography
                  weight="600"
                  scale="medium"
                  className="text_neutral_1000"
                >
                  Sin checar buró y sin enganche
                </Typography>
              </div>
            </div>
            <div
              className={`${
                orientation === "vertical" && "flex_col"
              } flex_1 display_flex`}
            >
              <div
                className={`${
                  orientation === "vertical" ? "br_t_xs h_50_per" : "br_l_xs"
                } bg_neutral_0 flex_center p_md`}
              >
                <Two />
              </div>
              <div
                className={`${
                  orientation === "vertical"
                    ? "br_b_xs text_center h_50_per"
                    : "br_r_xs"
                } bg_neutral_500 flex_center  p_md`}
              >
                <Typography
                  weight="600"
                  scale="medium"
                  className="text_neutral_1000"
                >
                  No rentes, invierte en ti
                </Typography>
              </div>
            </div>
          </div>
          <div className="display_flex flex_gap_md m_t_md display_none_mobile">
            <div
              className={`${
                orientation === "vertical" && "flex_col"
              } flex_1 display_flex`}
            >
              <div
                className={`${
                  orientation === "vertical" ? "br_t_xs h_50_per" : "br_l_xs"
                } bg_neutral_0 flex_center p_md`}
              >
                <Three />
              </div>
              <div
                className={`${
                  orientation === "vertical"
                    ? "br_b_xs text_center h_50_per"
                    : "br_r_xs"
                } bg_neutral_500 flex_center  p_md`}
              >
                <Typography
                  weight="600"
                  scale="medium"
                  className="text_neutral_1000"
                >
                  Llévatela el mismo día
                </Typography>
              </div>
            </div>
            <div
              className={`${
                orientation === "vertical" && "flex_col"
              } flex_1 display_flex`}
            >
              <div
                className={`${
                  orientation === "vertical" ? "br_t_xs h_50_per" : "br_l_xs"
                } bg_neutral_0 flex_center p_md`}
              >
                <Four />
              </div>
              <div
                className={`${
                  orientation === "vertical"
                    ? "br_b_xs text_center h_50_per"
                    : "br_r_xs"
                } bg_neutral_500 flex_center  p_md`}
              >
                <Typography
                  weight="600"
                  scale="medium"
                  className="text_neutral_1000"
                >
                  Más de 2000 motos vendidas
                </Typography>
              </div>
            </div>
          </div>
        </div>
        {/* END CARDS */}
        <div className="flex_1 w_100_per h_100_per h_100_per">
          <div className="w_100_per p_xl bg_neutral_0 shadow_hard">
            {title ||
              (vehicleSelected ? (
                <>
                  <Typography
                    weight="600"
                    scale="medium"
                    className="text_center"
                  >
                    Vamos a{" "}
                    <span
                      className="text_primary_300"
                      style={{ fontWeight: "bold" }}
                    >
                      iniciar
                    </span>{" "}
                    la compra de:
                  </Typography>
                  <Typography
                    weight="600"
                    scale="heading3"
                    className="text_center m_t_xs"
                    style={{ fontWeight: "bold" }}
                  >
                    <div className="display_flex flex_center">
                      <Moto className="text_primary_300 m_x_xs" />
                      <div>{`${vehicleSelected.brand.name} ${vehicleSelected.model.name} ${vehicleSelected.cylindersCapacity.value}`}</div>
                    </div>
                  </Typography>
                </>
              ) : (
                <Typography weight="600" scale="medium" className="text_center">
                  Ingresa los siguientes datos para continuar con tu solicitud
                </Typography>
              ))}
          </div>
          <form onSubmit={formik.handleSubmit} className="formF">
            <div
              className={`${
                selectedCreditTime || orientation === "vertical"
                  ? "p_t_xl"
                  : "p_y_xl"
              } p_x_xxl`}
            >
              {vehicleSelected && (
                <Typography
                  weight="400"
                  scale="medium"
                  className="text_center m_b_xs"
                >
                  ¡Primero{" "}
                  <span style={{ fontWeight: "bold" }}>danos tu mail</span> y te
                  mandaremos{" "}
                  <span style={{ fontWeight: "bold" }}>
                    información especial de tu moto!
                  </span>
                </Typography>
              )}
              <Input
                name="email"
                placeholder="Escribe tu correo aquí"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                title="Correo"
                icon={<Email />}
                type="text"
                error={!!formik.errors.email && !!formik.touched.email}
                subtitle={formik.touched.email ? formik.errors.email : ""}
              />
              <Input
                name="curp"
                placeholder="Escribe tu curp aquí"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.curp}
                title="Curp"
                icon={<CardBoy />}
                type="text"
                error={!!formik.errors.curp && !!formik.touched.curp}
                subtitle={formik.touched.curp ? formik.errors.curp : ""}
              />

              <Typography
                scale="small"
                weight="400"
                className="m_y_md text_neutral_900 text_center"
              >
                *Nota: Usaremos tu CURP como contraseña
              </Typography>
              {orientation === "horizontal" && (
                <div className="display_flex flex_center">
                  <Button
                    icon={<ValIcon />}
                    scale="small"
                    className="w_60_per"
                    type="submit"
                    disabled={!formik.isValid || loading}
                  >
                    Validar
                  </Button>
                </div>
              )}
            </div>
            {orientation === "vertical" && (
              <>
                <div
                  className="bg_neutral_400 p_x_xxl p_y_md w_100_per"
                  style={{ maxWidth: "460px" }}
                >
                  <Input
                    title="¿Trabajas en plataformas digitales?"
                    name="workInDigitalPlatforms"
                    type="slider"
                    inputClassName="center_x"
                    icon={<Moto />}
                    className="center_x"
                    titleClassName=""
                    labels
                    value={formik.values.workInDigitalPlatforms}
                    onChange={formik.handleChange}
                  />
                  {formik.values.workInDigitalPlatforms && (
                    <div>
                      <Typography
                        className="text_center p_b_lg"
                        scale="small"
                        weight="600"
                      >
                        <span className="text_neutral_700">
                          Selecciona las plataformas en las que trabajas
                        </span>
                      </Typography>

                      <SelectorGroup
                        className="w_100_per"
                        buttonClassName="m_y_xs"
                        orientation="vertical"
                        multiple
                        value={formik.values.platforms}
                        options={[
                          { id: 1, icon: <Uber />, text: "Uber" },
                          { id: 2, icon: <Rappi />, text: "Rappi" },
                          { id: 3, icon: <Didi />, text: "Didi" },
                          { id: 4, icon: <Didi />, text: "Didi driver" },
                          { id: 5, icon: <Jkr />, text: "Jokr" },
                          {
                            id: 6,
                            icon: <Mensajeros />,
                            text: "Mensajeros urbanos",
                          },
                          { id: 7, icon: <Meli />, text: "Mercado Libre" },
                          { id: 8, icon: <Ivoy />, text: "Ivoy" },
                          { id: 9, icon: <Zubale />, text: "Zubale" },
                        ]}
                        onChange={onPlatformsChange}
                      />
                      <Button
                        scale="small"
                        variant="link"
                        className="text_primary_300 text_center w_100_per"
                        onClick={() => onworkInDigitalPlatformsChange()}
                      >
                        No trabajo con plataformas digitales
                      </Button>
                    </div>
                  )}
                </div>
                <div className="bg_neutral_0 p_x_xxl p_y_md w_100_per display_flex flex_center flex_col">
                  <Input
                    name="extra"
                    onChange={onCheckboxChange}
                    className="border_neutral_700"
                    title=""
                    options={[
                      {
                        label: "Autorizo el tratamiento de mis datos",
                        value: 1,
                      },
                    ]}
                    type="checkbox"
                  />
                  <Button
                    className="w_80_per m_b_xl_mobile"
                    type="submit"
                    disabled={!formik.isValid || loading}
                    icon={<Money />}
                    scale="small"
                  >
                    SOLICITA TU FINANCIACIÓN
                  </Button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </Modal>
  );
};
