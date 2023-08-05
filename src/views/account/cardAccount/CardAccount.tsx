/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
import { Grid } from "@material-ui/core";
import { Button, ProgressBar, Typography } from "@ecommerce-ozon/design_system";
import { ReactComponent as Money } from "@ecommerce-ozon/design_system/dist/public/static/icons/money.svg";
import { ReactComponent as Tuerca } from "@ecommerce-ozon/design_system/dist/public/static/icons/settings-ui.svg";
import { TCreditPayment } from "models/credit-payment.interface";
import {
  CreditStatusValues,
  TCredit,
  TCreditTotals,
} from "models/credit.interface";
import { TDataozoner } from "models/ozoner.interface";
import { TVehicle } from "models/vehicle.interface";
import moment from "moment";
import "moment/min/locales.min";
import React, { useEffect, useState } from "react";

type Props = {
  credit: TCredit;
  creditTotals: TCreditTotals;
  lastPayment: TCreditPayment;
};

export const CardAccount = ({ credit, creditTotals, lastPayment }: Props) => {
  moment.locale("es");
  const [ozoner, setozoner] = useState<TDataozoner>();
  const [vehicle, setvehicle] = useState<TVehicle>();
  const openLink = () => {
    window.open(lastPayment?.paymentLink, "_blank");
  };
  useEffect(() => {
    if (credit) {
      setozoner(credit.ozoner);
      setvehicle(credit.ozoner.vehicle);
    }
  }, [credit]);

  return (
    <div className="dso_card_small bg_neutral_0 dim_100_per p_xl">
      <Grid container>
        <Grid item xs={12}>
          <div className="display_flex flex_justify_between">
            <Typography weight="400" scale="medium" className="m_b_xs">
              Pago mínimo
            </Typography>
            <Tuerca className="text_primary_300"/>
          </div>

          <Typography
            weight="600"
            scale="heading2"
            className="text_green_300 m_b_xs"
          >
            ${creditTotals?.amountPerPay} MXN
          </Typography>
          <div
            style={{ borderBottom: "1px solid #ECEDEF" }}
            className="m_b_xs"
          />
          <Typography
            scale="medium"
            weight="400"
            className="text_neutral_800 m_b_xs"
          >
            Deuda
          </Typography>
          <Typography
            scale="heading3"
            weight="600"
            className="text_neutral_800 m_b_xs"
          >
            ${creditTotals?.totalDebt} MXN
          </Typography>
          <div className="m_t_sm w_100_per">
            <ProgressBar
              containerClassName="bg_neutral_400 h_10_px"
              fillClassName="bg_primary_300"
              percentage={
                (Number(creditTotals?.totalPaid) * 100) /
                Number(creditTotals?.totalCredit)
              }
            />
          </div>
          <div className="display_flex w_100_per m_t_xs">
            <Typography
              scale="medium"
              weight="600"
              className="text_neutral_800 text_left"
            >
              Pagado:
            </Typography>
            <Typography
              scale="medium"
              weight="600"
              className="text_neutral_800 flex_1 text_right"
            >
              ${Number(creditTotals?.totalPaid)} MXN
            </Typography>
          </div>
          <Typography
            scale="small"
            weight="400"
            className="text_neutral_700 m_t_lg"
          >
            Fecha de pago
          </Typography>
          <Typography
            scale="heading4"
            weight="600"
            className="text_neutral_1000"
          >
            {moment(lastPayment.dueDate).format("LL")}
          </Typography>
          {
            (lastPayment.paymentLink !== undefined) && <Button
            icon={<Money />}
            className="m_y_md w_100_per"
            variant="principal"
            onClick={openLink}
            scale="small"
          >
            Paga tu moto
          </Button>
          }
          
          {/* <Button className="w_100_per" variant="outline" scale="small">
            ¿Te ayudamos en algo?
          </Button> */}
        </Grid>
      </Grid>
    </div>
  );
};
