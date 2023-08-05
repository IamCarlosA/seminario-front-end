import { PersonalReferences } from "../views/validateIdentity/ValidateIdentity";
import { PandaboardApiInstance } from "./api";

interface FetchUserData {
  email: string;
  name: string;
  phone?: string;
  curp?: string;
  search?: boolean;
  address?: string;
  status?: string;
  statusHistoric?: any[];
}

export type UserDocument = {
  docs: any[];
  type: string;
};

export interface CreditFormResponseData {
  vehicleId?: string;
  creditTime?: number;
  workInDigitalPlatforms: boolean;
  platforms: (number | string)[];
  authDataTreatment: boolean;
  monthlyIncome: number;
  monthlySpending: number;
  childrenCount: number;
  dependantsCount: number;
  group: string;
  companyName: string;
  economicActivity: string;
  educationalLevel: string;
  position: string;
  civilStatus: string;
  livesWith: [];
  name: string;
  firstLastName: string;
  secondLastName: string;
  email: string;
  phone: string;
  address: string;
  gender: string;
  day: string;
  month: string;
  year: string;
  documents: UserDocument[];
  personal_references: PersonalReferences;
  curp: string;
  _id: string;
  user: string;
  assets: string[];
  otherAsset: string;
}

export interface FetchUserResponse {
  token: string;
  refresh_token: string;
  user: {
    confirmed: boolean;
    blocked: boolean;
    type: string;
    verified: boolean;
    name: string;
    mobile_phone: string;
    email: string;
    city: string;
    address: string;
    termsAgreed: boolean;
    username: string;
    provider: string;
    paymentData: any;
    createdAt: string;
    updatedAt: string;
    role: {
      name: string;
      description: string;
      type: string;
      id: string;
    };
    subscriptions: any[];
    credit_cards: any[];
    vehicles: any[];
    waitlists: any[];
    financialForm: CreditFormResponseData[];
    id: string;
  };
}

export const fetchCheckIn = async (data: FetchUserData) =>
  PandaboardApiInstance.post<FetchUserResponse>("auth-client/checkin", data)
    .then((res) => res.data)
    .catch((err: any) => {
      throw err.response.data;
    });

export const fetchLogin = async (email: string, password: string) =>
  PandaboardApiInstance.post("auth-client/login", { email, password })
    .then((res) => res.data)
    .catch((err: any) => {
      throw err.response.data;
    });
