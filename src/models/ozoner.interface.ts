import { TVehicle } from "./vehicle.interface";

export interface TDataozoner {
  invoice?: any;
  createdAt: string;
  _id: string;
  vehicle: TVehicle;
  status: string;
  paymentMethod: string;
  paymentDay: number;
  truoraVerification: boolean;
  palencaVerification: boolean;
  occupation: string;
  curp: string;
  address: string;
  email: string;
  phone: string;
  name: string;
  creditTime: number | string;
  image?: any;
  income?: number;
  outcome?: number;
}

export interface TEditDataSolicitud {
  weeklyIncome: number;
  monthlyIncome: number;
  weekFlow: number;
  afterPayIncome: number;
  maxWeekQuota: number;
  monthlySpending: number;
}

export interface TEditDataozoner {
  invoice?: any;
  createdAt?: string;
  _id: string;
  vehicle?: TVehicle;
  status?: string;
  paymentMethod?: string;
  paymentDay?: string;
  truoraVerification?: boolean;
  palencaVerification?: boolean;
  occupation?: string;
  curp?: string;
  address?: string;
  email?: string;
  phone?: string;
  name?: string;
  image?: any;
  creditTime?: string | number;
  income?: number;
  outcome?: number;
}

export interface TRequestozoner {
  totals: any;
  count: number;
  pages: number;
  page: number;
  data: TDataozoner[];
}

export const statusOzoners = {
  lead: {
    title: "Lead",
    color: "secondary_600",
  },
  pending: {
    title: "En espera",
    color: "primary_300",
  },
  approved: {
    title: "Aprobado",
    color: "green_300",
  },
  default: {
    title: "En mora",
    color: "neutral_600",
  },
  earlyDefault: {
    title: "Mora temprana",
    color: "primary_300",
  },
  lateDefault: {
    title: "Mora tardia",
    color: "red_300",
  },
  stolen: {
    title: "Default",
    color: "neutral_900",
  },
};
