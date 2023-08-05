import React, { FC } from "react";
import "./CreditVerificationResultCard.scss";
import { Typography } from "@ecommerce-ozon/design_system";
import { ReactComponent as Moto } from "../../../static/images/creditVerification/moto.svg";
import IconSuccess from "../../../static/images/creditVerification/icon_success.png";

interface Props {
  success?: boolean;
}

const CreditVerificationResultCard: FC<Props> = ({ success }) => <div
    className={`credit-verification-result-card p_xl ${success ? "success" : "fail"} display_flex flex_align_center flex_col`}>
    <div>
      <Moto className="logo" />
      {
        success && <img alt="icon-success" src={IconSuccess} className="icon-success" />
      }
    </div>
    <Typography className="m_y_lg text_center" scale="heading4" weight="600">
      <span style={{ fontWeight: 400, fontSize: 20 }} className="text_neutral_0">Tu credito ha sido:</span>
      <br />
      {
        success ? <span style={{ fontWeight: 600, fontSize: 24, color: "rgb(2,103,42)" }}>PRE-APROBADO</span> :
          <span style={{ fontWeight: 600, fontSize: 24, color: "rgb(54,4,14)" }}>RECHAZADO</span>
      }
    </Typography>
  </div>;

export default CreditVerificationResultCard;
