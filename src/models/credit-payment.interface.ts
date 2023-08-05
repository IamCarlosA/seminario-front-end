// eslint-disable-next-line no-shadow
export enum CreditPaymentStatus {
  // eslint-disable-next-line no-unused-vars
  PAID = "paid",
  // eslint-disable-next-line no-unused-vars
  CURRENT = "current",
  // eslint-disable-next-line no-unused-vars
  EXPIRED = "expired",
  FUTURE = "future",
  INTEREST = "interest",
}

export interface TCreditPaymentAttachment {
  id: number;
  isVoucher: boolean;
  name: string;
  path: string;
  uuid: string;
  _id: string;
}
export interface TCreditPaymentPending {
  _id: string;
  dueDate: string;
  attachment: TCreditPaymentAttachment[];
  porcobrarId: string;
  total: number;
}

export interface TCreditPayment {
  _id: string;
  balance: number;
  code: string;
  createdAt: string;
  currency: string;
  currencyRate: number;
  discount: number;
  dueDate: string;
  paidDate: string;
  issueDate: string;
  paymentLink: string;
  porcobrarId: string;
  status: CreditPaymentStatus;
  subtotal: number;
  tax: number;
  total: number;
  updatedAt: string;
  attachment: TCreditPaymentAttachment[];
  period?: number

}

export const CreditPaymentStatusValues = {
  [CreditPaymentStatus.PAID]: {
    title: "Pagado",
    color: "green_300",
  },
  [CreditPaymentStatus.CURRENT]: {
    title: "Pronto Pago",
    color: "secondary_500",
  },
  [CreditPaymentStatus.EXPIRED]: {
    title: "En mora",
    color: "red_300",
  },
};
