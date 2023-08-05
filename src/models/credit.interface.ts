import { TCreditPayment, TCreditPaymentPending } from "./credit-payment.interface";
import { TDataozoner } from "./ozoner.interface";

// eslint-disable-next-line no-shadow,no-unused-vars
export enum CreditStatus {
  // eslint-disable-next-line no-unused-vars
  PENDING = "pending",
  // eslint-disable-next-line no-unused-vars
  ACTIVE = "active",
  // eslint-disable-next-line no-unused-vars
  UP_TO_DATE = "upToDate",
  // eslint-disable-next-line no-unused-vars
  EARLY_DEFAULT = "earlyDefault",
  // eslint-disable-next-line no-unused-vars
  MEDIUM_DEFAULT = "mediumDefault",
  // eslint-disable-next-line no-unused-vars
  MEDIUM_HIGH_DEFAULT = "mediumHighDefault",
  // eslint-disable-next-line no-unused-vars
  LATE = "late",
  // eslint-disable-next-line no-unused-vars
  DEFAULT = "default",
}

export interface TCreditTotals {
  amountPerPay: number;
  totalCredit: number;
  totalPaid: number;
  totalDebt: number;
}
export interface TCredit {
  paymentsPending: TCreditPaymentPending[];

  amountPerPay:number;
  currency:string;
  daysDefault:number;
  dti:number;
  duration:number;
  endedAt:string;
  ozoner:TDataozoner;
  payments: TCreditPayment[];
  startedAt:string;
  status:string;
  total:number;
  totalCredit:number;
  totalDebt:number;
  totalPaid:number;
  _id:string;
  code?:number
}

export const statusPayment = {
  soon: {
    title: "Pronto pago",
    color: "secondary_500",
  },
  payed: {
    title: "Pagado",
    color: "green_300",
  },
  ok: {
    title: "Al dia",
    color: "green_300",
  },
  default: {
    title: "En mora",
    color: "red_300",
  },
};

export const CreditStatusValues = {
  [CreditStatus.PENDING]: {
    title: "En espera",
    color: "primary_200",
  },
  [CreditStatus.ACTIVE]: {
    title: "Activo",
    color: "secondary_400",
  },
};

export const typePayment = {
  by_month: {
    title: "Mensualidad",
  },
};

export const methodPayment = {
  por_cobrar: {
    title: "por cobrar",
  },
};
