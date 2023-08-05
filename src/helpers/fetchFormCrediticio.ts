import _ from "lodash";
import { CalculationStepperFormValues } from "../views/creditCalculation/CreditCalculationStepperView";
import { DigitalPlatformsFormValues } from "../components/creditDigitalPlatforms/CreditDigitalPlatforms";
import { PersonalReference } from "../views/validateIdentity/ValidateIdentity";
import { PandaboardApiInstance } from "./api";

export interface FormCrediticioRequest {
  creditCalculation: CalculationStepperFormValues;
  digitalPlatforms: DigitalPlatformsFormValues;
  vehicleId?: number | string;
  creditTime?: number;
  advancedMoney?: number;
  approved?: boolean;
  score: number;
  city: string;
}

export interface FormCrediticioRequestSaleForce {
  oid: string;
  name: string;
  email: string;
  Telefono: string;
  origin: string;
  subject: string;
  description: string;
}

const formatfetchFormCrediticioData = (data: FormCrediticioRequest) => {
  // POR REQUERIMIENTO DE PANDABOARD HAY QUE FORMATEAR LOS ASSETS COMO UN STRING SEPARADOS POR COMAS
  const dataFormatted = { ...data };
  // delete dataFormatted.creditCalculation.assetsStep.otherSelected;
  return _.set(
    dataFormatted,
    "creditCalculation.assetsStep.joinedAssets",
    `${dataFormatted.creditCalculation.userStatusStep.assets
      .filter((e) => e !== "Otros")
      .join(",")}${
      dataFormatted.creditCalculation.userStatusStep.otherAsset
        ? `,${dataFormatted.creditCalculation.userStatusStep.otherAsset}`
        : ""
    }`
  );
};

export const fetchFormCrediticio = async (data: FormCrediticioRequest) =>
  PandaboardApiInstance.post(
    "financial-form",
    formatfetchFormCrediticioData(data),
    { requireAuth: true }
  )
    .then((res) => res.data)
    .catch((err: any) => {
      throw err.response.data;
    });

export const fetchFormCrediticioUpdatePalenca = async () =>
  PandaboardApiInstance.put("financial-form/palenca", {}, { requireAuth: true })
    .then((res) => res.data)
    .catch((err: any) => {
      throw err.response.data;
    });

export interface FormCrediticioAddDocumentRequest {
  creditFormId: string;
  formData: FormData;
  documentName: string;
}

export const fetchFormCrediticioAddDocument = async ({
  creditFormId,
  formData,
  documentName,
}: FormCrediticioAddDocumentRequest) =>
  PandaboardApiInstance.put(
    `financial-form/${creditFormId}/document/${documentName}`,
    formData,
    { requireAuth: true }
  )
    .then((res) => res.data)
    .catch((err: any) => {
      throw err.response.data;
    });

export interface FormCrediticioAddReferenceRequest {
  creditFormId: string;
  references: {
    personal_reference_1: PersonalReference;
    personal_reference_2: PersonalReference;
  };
}

export const fetchFormCrediticioAddReference = async ({
  creditFormId,
  references,
}: FormCrediticioAddReferenceRequest) =>
  PandaboardApiInstance.put(
    `financial-form/${creditFormId}/addReference`,
    references,
    { requireAuth: true }
  )
    .then((res) => res.data)
    .catch((err: any) => {
      throw err.response.data;
    });

export const fetchGetFinancialForm = async (id: string) =>
  PandaboardApiInstance.get(`financial-form/${id}`)
    .then((res) => res.data)
    .catch((err: any) => {
      throw err.response.data;
    });
