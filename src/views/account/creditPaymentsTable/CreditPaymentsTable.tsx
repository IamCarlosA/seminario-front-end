/* eslint-disable no-plusplus */
import "./CreditPaymentsTable.scss";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Typography,
  BaseTableProps,
  ListTable,
} from "@ecommerce-ozon/design_system";
import { TCredit } from "models/credit.interface";
import {
  CreditPaymentStatus,
  CreditPaymentStatusValues,
  TCreditPayment,
} from "models/credit-payment.interface";

interface Props {
  credit: TCredit;
  loading: boolean;
}

const CreditPaymentsTable: React.FC<Props> = ({ credit, loading }) => {
  const [payments, setPayments] = useState<any[]>([]);
  useEffect(() => {
    let period = 0;
    const payment = [...credit.payments, ...credit.paymentsPending.map(p => ({ ...p, status: CreditPaymentStatus.FUTURE }))]
      .sort(
        (objA: any, objB: any) =>
          moment.utc(objA.dueDate).diff(moment.utc(objB.dueDate), "days")
      ).map((p: any) => {
        if (p.isInterest) {
          return { ...p, status: CreditPaymentStatus.INTEREST };
        }
        if (p.uuidContract === "porcobrar")
          return { ...p, period: "Nota Venta" };
        period++;
        return { ...p, period };
      });
    setPayments(payment);
  }, [credit]);
  return (<>
    <ListTable
      data={payments}
      canSelect={false}
      hideHeader
      dividers
      rowClassName="shadow_hard"
      className="display_none_mobile"
      cols={[
        {
          label: "id",
          render: (row: TCreditPayment, index: number) => (
            <div className="flex_center_col">
              <Typography scale="medium" weight="600">{row.code ?? "-"}</Typography>
              <Typography scale="small" weight="400" textColor="neutral_700">ID</Typography>
            </div>
          ),
        },
        {
          label: "Periodo",
          render: (row: TCreditPayment, index: number) => (
            <div className="flex_center_col">
              <Typography scale="medium" weight="600">
                {row.period ?? "-"}
              </Typography>
              <Typography scale="small" weight="400" textColor="neutral_700">Periodo</Typography>
            </div>
          ),
        },
        {
          label: "cobro",
          render: (row: TCreditPayment, index: number) => (
            <div className="flex_center_col">
              <Typography scale="medium" weight="600">
                {moment.utc(row.dueDate).format("DD/MM/YYYY")}
              </Typography>
              <Typography scale="small" weight="400" textColor="neutral_700" className="text_no_break">Fecha Vencimiento</Typography>
            </div>
          ),
        },
        {
          label: "pago",
          render: (row: TCreditPayment, index: number) => (
            <div className="flex_center_col">
              <Typography scale="medium" weight="600" textColor={moment.utc(row.paidDate).diff(moment.utc(row.dueDate), "days") > 0 ? "red_300" : "neutral_900"}>
                {row.paidDate ? moment.utc(row.paidDate).format("DD/MM/YYYY") : "-"}
              </Typography>
              <Typography scale="small" weight="400" textColor="neutral_700">Fecha de Pago</Typography>
            </div>
          ),
        },
        {
          label: "Monto",
          render: (row: TCreditPayment, index: number) => (
            <div className="flex_center_col">
              <Typography scale="medium" weight="600" textColor="primary_300">
                {row.total} MXN
              </Typography>
              <Typography scale="small" weight="400" textColor="neutral_700">Monto</Typography>
            </div>
          ),
        },
        {
          label: "Estado",
          render: (row: TCreditPayment) => (
            <Typography
              weight="400"
              scale="medium"
              textColor="neutral_0"
              className="text_center flex_grow_1 flex_basis_0"
            >
              <div
                className={`dso_chip_small w_fit center_x cardStatus bg_${CreditPaymentStatusValues[
                  row.status as keyof typeof CreditPaymentStatusValues
                ]?.color
                  }_nocontrast`}
              >
                {
                  CreditPaymentStatusValues[
                    row.status as keyof typeof CreditPaymentStatusValues
                  ]?.title
                }
              </div>
            </Typography>
          ),
        },
      ]}
    />
    <ListTable
      data={payments}
      canSelect={false}
      hideHeader
      dividers
      rowClassName="shadow_hard"
      className="display_none_desktop"
      cols={[
        {
          label: "Periodo",
          render: (row: TCreditPayment, index: number) => (
            <div className="flex_center_col">
              <div
                className={`dso_chip_small w_fit cardStatus m_b_sm bg_${CreditPaymentStatusValues[
                  row.status as keyof typeof CreditPaymentStatusValues
                ]?.color
                  }_nocontrast`}
              >
                {
                  CreditPaymentStatusValues[
                    row.status as keyof typeof CreditPaymentStatusValues
                  ]?.title
                }
              </div>
              <Typography scale="medium" weight="600">
                {row.period ?? "-"}
              </Typography>
              <Typography scale="small" weight="400" textColor="neutral_700">Periodo</Typography>
            </div>
          ),
        },
        {
          label: "cobro",
          render: (row: TCreditPayment, index: number) => (
            <div className="flex_center_col">
              <Typography scale="small" weight="400" textColor="neutral_700" className="text_center">Fecha Vencimiento</Typography>
              <Typography scale="medium" weight="600" className="m_b_sm">
                {moment.utc(row.dueDate).format("DD/MM/YYYY")}
              </Typography>
              <Typography scale="small" weight="400" textColor="neutral_700" className="text_center">Fecha de Pago</Typography>
              <Typography scale="medium" weight="600" textColor={moment.utc(row.paidDate).diff(moment.utc(row.dueDate), "days") > 0 ? "red_300" : "neutral_900"}>
                {row.paidDate ? moment.utc(row.paidDate).format("DD/MM/YYYY") : "-"}
              </Typography>
            </div>
          ),
        },
        {
          label: "Monto",
          render: (row: TCreditPayment, index: number) => (
            <div className="flex_center_col">
              <Typography scale="medium" weight="600" textColor="primary_300">
                {row.total} MXN
              </Typography>
              <Typography scale="small" weight="400" textColor="neutral_700">Monto</Typography>
            </div>
          ),
        },
      ]}
    />
  </>);
};

export default CreditPaymentsTable;
