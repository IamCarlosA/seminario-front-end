/* eslint-disable no-unused-vars */

import { FormikProvider, useFormik } from "formik";
import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { Typography, NewStepper } from "@ecommerce-ozon/design_system";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { ReactComponent as Rigth } from "@ecommerce-ozon/design_system/dist/public/static/icons/Rigth.svg";

import { formatCity } from "helpers/formatCity";
import { RootState } from "../../store";
import useUserVerificationDetails, {
  ICreditCalculationResults,
} from "../../hooks/useUserVerificationDetails";
import { fetchFormCrediticio } from "../../helpers/fetchFormCrediticio";
import { DigitalPlatformsFormValues } from "../../components/creditDigitalPlatforms/CreditDigitalPlatforms";
import {
  useCreditVerificationSelectedCreditTime,
  useCreditVerificationSelectedVehicle,
} from "../../hooks/useCreditVerificationSelectedVehicle";
import {
  filterByCreditCalculation,
  getMaximumCreditNumber,
} from "./results/filterByCreditCalculation";
import { useUser } from "../../hooks/useUser";
import {
  StepFour,
  StepFourAndHalf,
  StepOne,
  StepOneAndHalf,
  StepThree,
  StepThreeAndHalf,
  StepTwo,
} from "./steps";
import {
  CreditFormResponseData,
  fetchCheckIn,
  UserDocument,
} from "../../helpers/fetchCheckIn";
import { FinancialFormFieldsEnum } from "../../enums/financialFormFields.enum";

import bikeImage from "../../static/images/moto-financiero.png";
// import {NewStepper} from "../../design_system/src/organisms/NewStepper";  //--->ONLY for Develop purposes

interface IStepperItem {
  component: ReactElement<any, any>;
  validationKey?: string;
  stepTitle?: string;
}

const stepComponentsArr: Array<IStepperItem>[] = [
  [
    {
      component: <StepOne />,
      stepTitle: "Información personal",
      validationKey: "userInfoStep",
    },
    {
      component: <StepOneAndHalf />,
      validationKey: "userInfoStep1",
    },
  ],
  [
    {
      component: <StepTwo />,
      stepTitle: "Ingresos y gastos",
      validationKey: "incomeStep",
    },
  ],
  [
    {
      component: <StepThree />,
      stepTitle: "Dependientes y empleo",
      validationKey: "dependantsStep",
    },
    {
      component: <StepThreeAndHalf />,
      validationKey: "dependantsStep1",
    },
  ],
  [
    {
      component: <StepFour />,
      stepTitle: "Estado civil y Activos",
      validationKey: "userStatusStep",
    },
    {
      component: <StepFourAndHalf />,
      validationKey: "userStatusStep1",
    },
  ],
];

export interface CalculationStepperFormValues {
  userInfoStep: {
    name: string;
    firstLastName: string;
    secondLastName: string;
    email: string;
    phone: string;
    address: string;
    gender: string;
    curp: string;
    day: string;
    month: string;
    year: string;
    age?: number | string;
  };
  userInfoStep1?: any;
  incomeStep: {
    monthlyIncome: number;
    monthlySpending: number;
  };
  dependantsStep: {
    childrenCount: number;
    dependantsCount: number;
    economicActivity: string;
    position: string;
    companyName: string;
    educationalLevel: string;
  };
  dependantsStep1?: any;
  userStatusStep: {
    civilStatus: string;
    livesWith: string[];
    assets: string[];
    otherAsset: string;
  };
  userStatusStep1?: any;
  // activityStep: {
  //   group: string;
  //   companyName: string;
  //   economicActivity: string;
  //   educationalLevel: string;
  // };
  // userStatusStep: {
  //   civilStatus: string;
  //   livesWith: [];
  // };
  // userInfoStep: {
  //   name: string;
  //   lastName: string;
  //   email: string;
  //   phone: string;
  //   curp: string;
  // };
  // assetsStep: {
  //   assets: [];
  //   otherSelected?: boolean;
  //   other?: string;
  //   joinedAssets?: string;
  // };
  _id: string;
}

const curpRegex =
  /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/;
const validationSchema = yup.object().shape({
  userInfoStep: yup.object().shape({
    name: yup.string().required("Campo requerido"),
    firstLastName: yup.string().required("Campo requerido"),
    secondLastName: yup.string().required("Campo requerido"),
    phone: yup
      .string()
      .required("Campo requerido")
      .matches(/^!*(\d!*){10,}$/, "Numero invalido"),
    address: yup.string().required("Campo requerido"),
  }),
  userInfoStep1: yup.object().shape({
    curp: yup
      .string()
      .required("Campo requerido")
      .matches(curpRegex, "CURP inválido"), // Reference: https://vidadigital.com.mx/es/expresiones/regulares/curp/
    email: yup.string().email("Email invalido").required("Campo requerido"),
    day: yup.string().required("Campo requerido"),
    month: yup.string().required("Campo requerido"),
    year: yup.string().required("Campo requerido"),
  }),
  incomeStep: yup.object().shape({
    monthlyIncome: yup
      .number()
      .required("Campo requerido")
      .lessThan(100001, "Debe ser menor a $100,000.00mxn")
      .positive("Debe ser mayor a $0.00mxn")
      .integer("Debe ser mayor a $0.00mxn"),
    monthlySpending: yup
      .number()
      .required("Campo requerido")
      .lessThan(100001, "Debe ser menor a $100,000.00mxn")
      .positive("Debe ser mayor a  $0.00mxn")
      .integer("Debe ser mayor a $0.00mxn"),
  }),
  dependantsStep: yup.object().shape({}),
  dependantsStep1: yup.object().shape({
    educationalLevel: yup.string().required("Campo requerido"),
    economicActivity: yup.string().required("Campo requerido"),
  }),
  userStatusStep: yup.object().shape({
    civilStatus: yup.string().required("Campo requerido"),
    livesWith: yup.array().of(yup.string()).min(1, "Al menos uno requerido"),
  }),
  userStatusStep1: yup.object().shape({
    assets: yup.array().of(yup.string()).min(1, "Campo requerido"),
  }),
  assetsStep: yup.object().shape({
    assets: yup.array().of(yup.string()),
    otherSelected: yup.boolean(),
    other: yup.string().when("otherSelected", {
      is: true,
      then: yup.string().required("Campo requerido"),
    }),
  }),
});

export type StepsKeys = keyof typeof validationSchema.fields;

export const validateStep = (
  step: StepsKeys,
  values: CalculationStepperFormValues
) =>
  // @ts-ignore
  yup.reach(validationSchema, step).isValidSync(values[step]);

// todo: Change inmplementation to allow async request between steps
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
    companyName,
    educationalLevel,
    economicActivity,
    position,
    civilStatus,
    livesWith,
    name,
    firstLastName,
    secondLastName,
    email,
    phone,
    documents,
    address,
    gender,
    day,
    month,
    year,
    assets,
    otherAsset,
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
      economicActivity,
      position,
      companyName,
      educationalLevel,
    },
    userStatusStep: {
      civilStatus,
      livesWith,
      assets,
      otherAsset,
    },
    userInfoStep: {
      name,
      firstLastName,
      secondLastName,
      email,
      phone,
      curp,
      address,
      gender,
      day,
      month,
      year,
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

const CreditCalculationStepperView = () => {
  const { city } = useSelector((state: RootState) => state.cityReducer);
  const history = useHistory();
  const user = useUser();
  const [loading, setLoading] = useState(false);
  const [results] = useUserVerificationDetails();
  const selectedVehicle = useCreditVerificationSelectedVehicle();
  const selectedCreditTime = useCreditVerificationSelectedCreditTime();

  const onSubmitForm = useCallback(
    async (values: CalculationStepperFormValues) => {
      try {
        setLoading(true);

        const prepareFormValues = {
          userInfoStep: {
            ...values.userInfoStep,
            curp: values.userInfoStep1?.curp,
            email: values.userInfoStep1?.email,
            gender: values.userInfoStep1?.gender,
            day: values.userInfoStep1?.day,
            month: values.userInfoStep1?.month,
            year: values.userInfoStep1?.year,
          },
          incomeStep: {
            ...values.incomeStep,
          },
          dependantsStep: {
            ...values.dependantsStep,
            economicActivity: values.dependantsStep1?.economicActivity,
            companyName: values.dependantsStep1?.companyName,
            educationalLevel: values.dependantsStep1?.educationalLevel,
          },
          userStatusStep: {
            ...values.userStatusStep,
            assets: values.userStatusStep1?.assets,
            otherAsset: values.userStatusStep1?.otherAsset,
          },
          _id: values._id,
        };

        const data = await fetchCheckIn({
          email: prepareFormValues.userInfoStep.email,
          name: `${prepareFormValues.userInfoStep.name} ${prepareFormValues.userInfoStep.firstLastName} ${prepareFormValues.userInfoStep.secondLastName}`,
          phone: `${prepareFormValues.userInfoStep.phone}`,
        });
        // registerSalesforceLeads({
        //   email: values.userInfoStep.email,
        //   name: `${values.userInfoStep.name} ${values.userInfoStep.lastName}`,
        //   phone: `${values.userInfoStep.phone}`,
        //   description: selectedVehicle?.internalId
        // });
        const creditForms = data?.user?.financialForm;

        if (creditForms.length > 0) {
          history.push(
            "/financia-tu-moto/results",
            buildCreditForm({
              ...creditForms[0],
              email: values.userInfoStep.email,
              name: `${values.userInfoStep.name} ${values.userInfoStep.firstLastName} ${values.userInfoStep.secondLastName}`,
              phone: `${values.userInfoStep.phone}`,
            })
          );
        }

        const newFormData = await fetchFormCrediticio({
          creditCalculation: prepareFormValues,
          digitalPlatforms: results.digitalPlatforms,
          vehicleId: selectedVehicle?.internalId,
          creditTime: selectedCreditTime,
          advancedMoney: selectedVehicle?.advancedMoney,
          approved: selectedVehicle
            ? filterByCreditCalculation(getMaximumCreditNumber(values))(
                selectedVehicle
              )
            : undefined,
          score: getMaximumCreditNumber(values),
          city: formatCity(city),
        });
        setLoading(false);
        history.push("/financia-tu-moto/results", {
          ...values,
          _id: newFormData._id,
        });
      } catch (e) {
        setLoading(false);
        // history.push("/financia-tu-moto/results", values);
      }
    },
    [history, user]
  );

  const form = useFormik<CalculationStepperFormValues>({
    initialValues: {
      userInfoStep: {
        name: "",
        firstLastName: "",
        secondLastName: "",
        phone: "",
        address: "",
        email: "",
        curp: "",
        gender: "",
        day: "",
        month: "",
        year: "",
      },
      userInfoStep1: {
        curp: "",
        email: "",
        gender: "",
        day: "",
        month: "",
        year: "",
      },
      incomeStep: {
        monthlyIncome: 0,
        monthlySpending: 0,
      },
      dependantsStep: {
        childrenCount: 0,
        dependantsCount: 0,
        economicActivity: "",
        position: "",
        companyName: "",
        educationalLevel: "",
      },
      dependantsStep1: {
        economicActivity: "",
        companyName: "",
        educationalLevel: "",
      },
      userStatusStep: {
        civilStatus: "",
        livesWith: [],
        assets: [],
        otherAsset: "",
      },

      // userInfoStep: {
      //   name: "",
      //   lastName: "",
      //   email: "",
      //   phone: "",
      //   curp: "",
      // },
      // assetsStep: {
      //   assets: [],
      // },
      _id: "",
    },
    validationSchema,
    onSubmit: onSubmitForm,
  });

  useEffect(() => {
    const emailLocalStorage = localStorage.getItem("emailModal");
    const curpLocalStorage = localStorage.getItem("curpModal");
    if (emailLocalStorage) {
      form.setFieldValue(FinancialFormFieldsEnum.EMAIL, emailLocalStorage);
    }
    if (curpLocalStorage) {
      form.setFieldValue(FinancialFormFieldsEnum.CURP, curpLocalStorage);
    }
  }, []);

  return (
    <FormikProvider value={form}>
      <div
        style={{ display: "flex" }}
        className="credit-calculation m_y_xl  flex_col_reverse_mobile"
      >
        <div className="display_flex flex_col flex_justify_center flex_align_end_desktop flex_align_center_mobile flex_gap_md">
          <img alt="bikeimage" className="w_100_per" src={bikeImage} />
          <Typography scale="heading3" weight="600">
            Averigua cuál es{" "}
            <span className="text_primary_300">tu moto ideal</span>
          </Typography>
          <Typography
            scale="large"
            weight="400"
            className="text_right_desktop text_center_mobile"
          >
            Ingresa tus datos y te mostraremos motos que se{" "}
            <span style={{ fontWeight: "bold" }}>ajusten a tu presupuesto</span>{" "}
            y a tus necesidades.
          </Typography>
          <div className="display_flex flex_center_mobile">
            <Typography scale="medium" weight="600">
              Te tomará{" "}
              <span style={{ fontWeight: "bold" }}>
                solo 5 minutos, ¿qué esperas?
              </span>
            </Typography>
            <Rigth className="text_primary_300 m_x_xs" />
          </div>
        </div>
        <div className="right-side-container">
          <div className="card-container m_y_xl dso_card">
            <NewStepper
              validateStep={validateStep}
              stepperComponents={stepComponentsArr}
              onSubmitForm={form.submitForm}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </FormikProvider>
  );
};

export default CreditCalculationStepperView;
