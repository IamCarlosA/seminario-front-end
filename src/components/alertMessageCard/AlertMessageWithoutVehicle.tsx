import React, { FC, useEffect, useState } from "react";
import moment from "moment";
import { ReactComponent as Trophy } from "@ecommerce-ozon/design_system/dist/public/static/icons/trophy.svg";
import { Typography, Button } from "@ecommerce-ozon/design_system";
import { useHistory } from "react-router-dom";

import useUserVerificationDetails from "hooks/useUserVerificationDetails";

interface Props {}

const AlertMessageWithoutvehicle: FC<Props> = () => {
  const history = useHistory();
  const [results, setResults] = useUserVerificationDetails();
  const [creditScore, setcreditScore] = useState<number>(0);
  useEffect(() => {
    if (results.creditCalculation.score > 0) {
      setcreditScore(results.creditCalculation.score);
    }
  }, [results]);
  return (
    <div className="p_t_md h_100_per">
      <div className="dso_card_small bg_neutral_0 h_100_per pos_relative">
        <div
          className="pos_absolute display_flex flex_center p_xs bg_primary_100 br_xs"
          style={{
            top: "-5%",
            left: "50%",
            transform: "translate(-50%, 0)",
          }}
        >
          <Trophy className="text_primary_300" />
        </div>
        <div className="w_100_per h_50_per_desktop p_xl display_flex flex_center flex_col">
          <Typography scale="heading4" weight="600">
            Tu crédito pre-aprobado de
          </Typography>
          <Typography
            scale="heading3"
            weight="600"
            className="text_primary_300"
          >
            ${Math.ceil(creditScore)}/Semanales
          </Typography>
          <Typography scale="heading4" weight="600">
            esta esperando la validación
          </Typography>
        </div>
        <div className="w_100_per h_50_per_desktop  bg_neutral_200 p_xl display_flex flex_col flex_gap_md">
          <Typography scale="medium" weight="400">
            Por el momento, te dejamos{" "}
            <span style={{ fontWeight: "bold" }}>un link personalizado</span>{" "}
            para que puedas explorar{" "}
            <span className="text_primary_300">todas tus motos ideales.</span>
          </Typography>
          <Button
            scale="small"
            variant="outline"
            className="p_y_xs"
            onClick={() =>
              history.push(`/catalogo?creditScore=${Math.ceil(creditScore)}`)
            }
          >
            Conocer mis motos ideales
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlertMessageWithoutvehicle;
