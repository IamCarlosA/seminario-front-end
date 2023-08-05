/* eslint-disable no-unused-vars */
import React, {
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from "react";
import "./ValidateIdentity.scss";
import * as yup from "yup";
import { FormikHelpers, FormikProvider, useFormik } from "formik";
import { NewStepper, Typography } from "@ecommerce-ozon/design_system";

import Swal from "sweetalert2";
// eslint-disable-next-line import/extensions,import/no-unresolved
import SwiperClass from "swiper/types/swiper-class";
import { ReactComponent as CreditCard } from "@ecommerce-ozon/design_system/dist/public/static/icons/credit-card-2.svg";

//import {NewStepper} from "../../design_system/src/organisms/NewStepper";  //--->ONLY for Develop purposes
import { Container, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AlertMessageWithoutVehicle from "components/alertMessageCard/AlertMessageWithoutVehicle";
import AlertMessageWithvehicle from "components/alertMessageCard/AlertMessageWithVehicle";
import {
  fetchFormCrediticioAddDocument,
  fetchFormCrediticioAddReference,
} from "../../helpers/fetchFormCrediticio";
import useUserVerificationDetails from "../../hooks/useUserVerificationDetails";
import { UserDocument } from "../../helpers/fetchCheckIn";
import { validateIdentity } from "../../helpers/validateIdentity";
import {
  StepOneA,
  StepOneB,
  StepThree,
  StepTwoA,
  StepTwoB,
  StepTwoC,
  StepTwoD,
} from "./steps";
import motoLoading from "../../static/images/validateIdentity/loading_moto.gif";
import ozoner4 from "../../static/images/validateIdentity/ozoner4.jpg";
import AlertMessageCard from "../../components/alertMessageCard/AlertMessageCard";
import { TImages, TVehicle } from "../../models/vehicle.interface";
import { RootState } from "../../store";
import { getVehicle } from "../../helpers/fetchVehicles";
import { formatPrice } from "../../helpers/formatPrice";
import { prices } from "../../helpers/prices";

import AlertMessage from "../../components/alertMessage/AlertMessage";
import { getCurrentDate } from "../../helpers/dateUtils";

interface Props {
  complete?: Function;
  error?: Function;
}

export interface PersonalReference {
  name?: string;
  phone?: string;
  curp?: string;

  relation?: string;

  other?: string;
}

export interface PersonalReferences {
  personal_reference_1: PersonalReference;
  personal_reference_2: PersonalReference;
}

export interface IDocument {
  imageData: any;
  imageFile: Blob | UserDocument;
}

type DocumentType = IDocument | null | undefined;

export interface ValidateIdentityStepperFormValues {
  step1: {
    ine_front: DocumentType;
    ine_back: DocumentType;
  };
  step1B: {
    selfie: DocumentType;
  };
  step2: {
    bank_certificate_1: DocumentType;
    bank_certificate_2: DocumentType;
    bank_certificate_3: DocumentType;
  };
  step2B: {
    proof_of_address: DocumentType;
  };
  step2C: {
    license_front: DocumentType;
    license_back: DocumentType;
  };
  step2D: {
    tax_situation: DocumentType;
  };
  step3: PersonalReferences;
}

const SUPPORTED_FORMATS = ["image/jpg", "image/png", "image/jpeg"];

const validationSchema = yup.object().shape({
  step1: yup.object().shape({
    ine_front: yup
      .mixed()
      .required("Campo requerido")
      .test("fileSize", "El archivo es demasiado grande", ({ imageFile }) => {
        return imageFile.size <= 1000000 * 5; // 1000000 = 1mb | 1 = mb´s number
      })
      .test(
        "format",
        "El archivo corresponde al formato jpg/jpeg o png",
        ({ imageFile }) => {
          return SUPPORTED_FORMATS.includes(imageFile.type);
        }
      ),
    ine_back: yup
      .mixed()
      .required("Campo requerido")
      .test("fileSize", "El archivo es demasiado grande", ({ imageFile }) => {
        return imageFile.size <= 1000000 * 5; // 1000000 = 1mb | 1 = mb´s number
      })
      .test(
        "format",
        "El archivo corresponde al formato jpg/jpeg o png",
        ({ imageFile }) => {
          return SUPPORTED_FORMATS.includes(imageFile.type);
        }
      ),
  }),
  step1B: yup.object().shape({
    selfie: yup
      .mixed()
      .required("Campo requerido")
      .test("fileSize", "El archivo es demasiado grande", ({ imageFile }) => {
        return imageFile.size <= 1000000 * 5; // 1000000 = 1mb | 1 = mb´s number
      })
      .test(
        "format",
        "El archivo no corresponde al formato jpg/jpeg o png",
        ({ imageFile }) => {
          return SUPPORTED_FORMATS.includes(imageFile.type);
        }
      ),
  }),
  step2: yup.object().shape({
    bank_certificate_1: yup.mixed().required("Campo requerido"),
    bank_certificate_2: yup.mixed().required("Campo requerido"),
    bank_certificate_3: yup.mixed().required("Campo requerido"),
  }),
  step2B: yup.object().shape({
    proof_of_address: yup.mixed().required("Campo requerido"),
  }),
  step2C: yup.object().shape({
    license_front: yup.mixed(),
    license_back: yup.mixed(),
  }),
  step2D: yup.object().shape({
    tax_situation: yup.mixed(),
  }),
  step3: yup.object().shape({
    personal_reference_1: yup.object().shape({
      name: yup.string().required("Campo requerido"),
      phone: yup
        .string()
        .required("Campo requerido")
        .matches(/^!*(\d!*){10,}$/, "Numero invalido")
        .typeError("Campo requerido"),
      relation: yup.string().required("Campo requerido"),
      other: yup.string().when("relation", {
        is: (value: string) => value === "Otro",
        then: yup.string().required("Campo requerido"),
        otherwise: yup.string().optional(),
      }),
    }),
    personal_reference_2: yup.object().shape({
      name: yup.string().required("Campo requerido"),
      phone: yup
        .string()
        .required("Campo requerido")
        .matches(/^!*(\d!*){10,}$/, "Numero invalido"),
      relation: yup.string().required("Campo requerido"),
      other: yup.string().when("relation", {
        is: (value: string) => value === "Otro",
        then: yup.string().required("Campo requerido"),
        otherwise: yup.string().optional(),
      }),
    }),
  }),
});

export type StepsKeys = keyof typeof validationSchema.fields;

export const validateStep = (
  step: StepsKeys,
  values: ValidateIdentityStepperFormValues
) =>
  // @ts-ignore
  yup.reach(validationSchema, step).isValidSync(values[step]);

const getFileFromValues = (
  values: ValidateIdentityStepperFormValues,
  documentName: string
) => {
  const conglomerate = {
    ...values.step1,
    ...values.step1B,
    ...values.step2B,
    ...values.step2C,
    ...values.step2D,
    ...values.step2,
  };
  type Keys = keyof typeof conglomerate;
  return conglomerate[documentName as unknown as Keys]?.imageFile;
};

const ValidateIdentity: FC<Props> = ({ complete, error }) => {
  const [swiperRef, setSwiperRef] = useState<SwiperClass>();
  const [slider, setSlider] = useState({ current: 0 });
  const [loading, setLoading] = useState(false);
  const [creditCalculationData] = useUserVerificationDetails();

  const [photos, setPhotos] = useState<TImages[] | undefined>([]);
  const { selectedVehicle, selectedCreditTime } = useSelector(
    (state: RootState) => state.creditVerificationReducer
  );
  const { user } = useSelector((state: RootState) => state.userReducer);

  const [vehicle, setvehicle] = useState<TVehicle | null>(null);
  const [failedRequests, setFailedRequests] = useState(0);
  const [showAlertMessage, setShowAlertMessage] = useState(true);

  const [openConfirmation, setOpenConfirmation] = React.useState(false);

  const history = useHistory();

  useEffect(() => {
    async function fetchVehicle() {
      return getVehicle(selectedVehicle.internalId);
    }

    if (selectedVehicle) {
      fetchVehicle().then((response) => {
        setvehicle(response);
        setPhotos(response?.images);
      });
    }
  }, []);

  const slideTo = (index: any) => {
    if (swiperRef) swiperRef.slideTo(index - 1, 0);
  };
  const onSubmitForm = useCallback(
    async (
      values: ValidateIdentityStepperFormValues,
      helpers: FormikHelpers<ValidateIdentityStepperFormValues>
    ) => {
      try {
        setLoading(true);
        const identityDocumentNames = [
          ...Object.keys(values.step1),
          ...Object.keys(values.step1B),
          ...Object.keys(values.step2B),
          ...Object.keys(values.step2C),
          ...Object.keys(values.step2D),
          ...Object.keys(values.step2),
        ];

        const slackNotifyPayload = {
          ozonerName: user.name,
          email: user.email,
          phone: user.phone,
          requestDate: getCurrentDate(),
          vehicle: vehicle?.internalId || undefined,
          quota:
            vehicle !== undefined
              ? formatPrice(
                  prices(vehicle?.getWeeklyPrice(selectedCreditTime)),
                  "MX"
                )
              : undefined,
          requestId: creditCalculationData.creditCalculation.state._id || " ",
        };

        await validateIdentity(
          { ...values.step1, ...values.step1B },
          slackNotifyPayload
        );
        await Promise.all(
          identityDocumentNames
            .filter((documentName) => {
              return !!getFileFromValues(values, documentName);
            })
            .map((documentName) => {
              const formData = new FormData();
              formData.append(
                "file",
                getFileFromValues(values, documentName) as Blob
              );
              formData.append("name", documentName);
              return fetchFormCrediticioAddDocument({
                documentName,
                creditFormId:
                  creditCalculationData.creditCalculation.state._id || "",
                formData,
              });
            })
        );
        await fetchFormCrediticioAddReference({
          references: values.step3,
          creditFormId: creditCalculationData.creditCalculation.state._id || "",
        });
        complete?.();
      } catch (e) {
        setLoading(false);
        setFailedRequests((prevState) => prevState + 1);
        setShowAlertMessage(true);
        error?.();
        if (Array.isArray(e)) {
          Swal.fire({
            title: "Error",
            text: "Tu selfie y tu INE están Borrosas, Intenta otra vez",
            icon: "error",
          });
          helpers.setFieldError(
            "step1.ine_front",
            "Cuida que no se vea borrosa la imagen"
          );
          helpers.setFieldError(
            "step1.ine_back",
            "Cuida que no se vea borrosa la imagen"
          );
          helpers.setFieldError(
            "step1B.selfie",
            "Cuida que tu cara esté centrada"
          );
        } else {
          Swal.fire({
            text: "No se pudo validar la información. Intenta nuevamente",
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      }
    },
    [complete]
  );

  const handleClose = () => setOpenConfirmation(!openConfirmation);

  const renderModalTitle = () => (
    <Typography scale="medium" weight="400" textColor="neutral_900">
      ¿Seguro que{" "}
      <span style={{ fontWeight: "bolder" }}>
        {" "}
        quieres continuar sin subir tu licencia de conducir?
      </span>{" "}
    </Typography>
  );

  const renderModalSubTitle = () => (
    <Typography scale="xsmall" weight="400" textColor="neutral_900">
      Recuerda que te la pediremos al darte tu moto{" "}
    </Typography>
  );

  const renderModalTitleFiscal = () => (
    <Typography scale="medium" weight="400" textColor="neutral_900">
      ¿Seguro que{" "}
      <span style={{ fontWeight: "bolder" }}>
        {" "}
        quieres continuar sin subir tu constancia de situación fiscal?
      </span>{" "}
    </Typography>
  );

  const renderModalSubTitleFiscal = () => (
    <Typography scale="xsmall" weight="400" textColor="neutral_900">
      Recuerda que te la pediremos al darte tu moto{" "}
    </Typography>
  );

  const form = useFormik<ValidateIdentityStepperFormValues>({
    initialValues: {
      step1: {
        ine_front: null,
        ine_back: null,
      },
      step1B: {
        selfie: null,
      },
      step2: {
        bank_certificate_1: null,
        bank_certificate_2: null,
        bank_certificate_3: null,
      },
      step2B: {
        proof_of_address: null,
      },
      step2C: {
        license_front: null,
        license_back: null,
      },
      step2D: {
        tax_situation: null,
      },
      step3: {
        personal_reference_1: {
          name: "",
          phone: "",
          curp: "",
          relation: "",
          other: "",
        },
        personal_reference_2: {
          name: "",
          phone: "",
          curp: "",
          relation: "",
          other: "",
        },
      },
    },
    validationSchema,
    onSubmit: onSubmitForm,
  });

  // console.log(form.values);

  const submitFailedRequest = async () => {
    const identityDocumentNames = [
      ...Object.keys(form.values.step1),
      ...Object.keys(form.values.step1B),
      ...Object.keys(form.values.step2B),
      ...Object.keys(form.values.step2C),
      ...Object.keys(form.values.step2D),
      ...Object.keys(form.values.step2),
    ];
    await Promise.all(
      identityDocumentNames
        .filter((documentName) => {
          return !!getFileFromValues(form.values, documentName);
        })
        .map((documentName) => {
          const formData = new FormData();
          formData.append(
            "file",
            getFileFromValues(form.values, documentName) as Blob
          );
          formData.append("name", documentName);
          return fetchFormCrediticioAddDocument({
            documentName,
            creditFormId:
              creditCalculationData.creditCalculation.state._id || "",
            formData,
          });
        })
    );
    await fetchFormCrediticioAddReference({
      references: form.values.step3,
      creditFormId: creditCalculationData.creditCalculation.state._id || "",
    });
  };

  useEffect(() => {
    if (failedRequests >= 3) {
      submitFailedRequest();
    }
  }, [failedRequests]);

  interface IStepperSubComponet {
    component: ReactElement<any, any>;
    subComponent?: any;
  }

  interface IStepperItem {
    component: ReactElement<any, any>;
    validationKey?: string;
    stepTitle?: string;
    stepModalConfig?: {
      icon: React.ReactElement<any, any> | null;
      handleClose: any;
      title: JSX.Element;
      subtitle: JSX.Element;
    };
  }

  const initialStepComponentsArr: Array<IStepperItem>[] = [
    [
      {
        component: <StepTwoA />,
        stepTitle: "Documentos de validación",
        validationKey: "step2",
      },
      {
        component: <StepTwoB />,
        validationKey: "step2B",
      },
      {
        component: <StepTwoC />,
        validationKey: "step2C",
        stepModalConfig: {
          icon: <CreditCard />,
          handleClose,
          title: renderModalTitle(),
          subtitle: renderModalSubTitle(),
        },
      },
      {
        component: <StepTwoD />,
        validationKey: "step2D",
        stepModalConfig: {
          icon: <CreditCard />,
          handleClose,
          title: renderModalTitleFiscal(),
          subtitle: renderModalSubTitleFiscal(),
        },
      },
    ],
    [
      {
        component: <StepThree />,
        stepTitle: "Referencias personales",
        validationKey: "step3",
      },
    ],
    [
      {
        component: <StepOneA />,
        stepTitle: "Verificación de identidad",
        validationKey: "step1",
      },
      {
        component: <StepOneB />,
        validationKey: "step1B",
      },
    ],
  ];
  const [stepComponentsArr, setStepComponentsArr] = useState(
    initialStepComponentsArr
  );

  useEffect(() => {
    /**
     * Remove the stepModalConfig if the required fields are not null
     * */
    const newArray = initialStepComponentsArr.map((stepArray: any) => {
      return stepArray.map(
        (step: {
          [x: string]: any;
          validationKey?: any;
          stepModalConfig?: any;
        }) => {
          const { stepModalConfig, ...rest } = step;
          // check on step2C
          if (
            step.validationKey === "step2C" &&
            form.values.step2C.license_back !== null &&
            form.values.step2C.license_front !== null
          ) {
            return rest;
          }
          // check on step2D
          if (
            step.validationKey === "step2D" &&
            form.values.step2D.tax_situation !== null
          ) {
            return rest;
          }
          // add additional conditions if required here

          return step;
        }
      );
    });
    setStepComponentsArr(newArray);
  }, [form.values]);

  const renderValidateIdentityForm = () => {
    return (
      <FormikProvider value={form}>
        <div className="display_flex flex_col_reverse_mobile flex_gap_xl_mobile m_xl flex_justify_center">
          <div className="flex_basis_0 flex_grow_4 flex_center_col p_r_xxxl_desktop m_b_xxl_mobile">
            <Typography weight="600" scale="heading3" className="">
              Termina tu proceso,
            </Typography>
            <Typography weight="600" scale="heading3" textColor="primary_300">
              validando tu identidad
            </Typography>
            <Typography weight="600" scale="heading3" className="m_b_xxxl">
              y consigue tu moto
            </Typography>
            <div className="dso_card bg_neutral_0 p_x_xxl p_y_md flex_center_col">
              <Typography
                weight="400"
                scale="small"
                className="m_b_lg w_60_per"
              >
                {"Se parte de "}
                <Typography weight="600" scale="small" component="span">
                  {"más de 2000 Ozoners "}
                </Typography>
                que ya ruedan con una moto OZON
              </Typography>
              <img src={ozoner4} alt="moto" className="w_100_per" />
              {/* <Swiper
              autoplay={{
                delay: 3500,
                disableOnInteraction: false
              }}
              onSwiper={setSwiperRef}
              className="dim_100_per m_t_md"
              onSlideChange={() => {
                setSlider({ current: swiperRef ? swiperRef.activeIndex : 0 });
              }}
            >
              <SwiperSlide>
                  <img
                    src={ozoner1}
                    alt="moto"
                    className="w_100_per"
                  />
                </SwiperSlide>
              <SwiperSlide>
                  <img
                    src={ozoner2}
                    alt="moto"
                    className="w_100_per"
                  />
                </SwiperSlide>
              <SwiperSlide>
                  <img
                    src={ozoner3}
                    alt="moto"
                    className="w_100_per"
                  />
                </SwiperSlide>
              <SwiperSlide>
                  <img
                    src={ozoner4}
                    alt="moto"
                    className="w_100_per"
                  />
                </SwiperSlide>

            </Swiper> */}
              <div className="custom-slider">
                {Array(4).map((_e, index) => (
                  <div
                    className={`slider-point ${
                      slider.current === index ? "active" : ""
                    }`}
                    onClick={() => slideTo(index + 1)}
                    key={`heros-${index}`}
                  />
                ))}
              </div>
              {/* <img alt="bikeimage" className="left-side-image" src={bikeImage} /> */}
            </div>
          </div>

          <div className="flex_basis_0 flex_grow_5 pos_relative">
            {failedRequests > 0 && (
              <AlertMessage
                severity="warning"
                message={`Validación de identidad ${failedRequests}/3 intentos`}
                showAlert={showAlertMessage}
                setShowAlert={setShowAlertMessage}
              />
            )}
            {loading && (
              <div className="identity_loading flex_center_col">
                <Typography
                  weight="600"
                  scale="medium"
                  textColor="neutral_0"
                  className="m_b_xxxs"
                >
                  Cargando tus datos
                </Typography>
                <img src={motoLoading} alt="" />
              </div>
            )}
            <div className="dso_card br_lg overflow_hidden p_t_md">
              <NewStepper
                validateStep={validateStep}
                stepperComponents={stepComponentsArr}
                onSubmitForm={form.submitForm}
              />
            </div>
          </div>
        </div>
      </FormikProvider>
    );
  };

  const renderFailedAttemptsElement = () => {
    return (
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={7}>
          <AlertMessageCard />
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
          {vehicle ? (
            <AlertMessageWithvehicle vehicle={vehicle} />
          ) : (
            <AlertMessageWithoutVehicle />
          )}
        </Grid>
      </Grid>
    );
  };

  return (
    <div style={{ margin: "0 0 5vh 0" }}>
      
        {failedRequests >= 3
          ? renderFailedAttemptsElement()
          : renderValidateIdentityForm()}
      
    </div>
  );
};

export default ValidateIdentity;
