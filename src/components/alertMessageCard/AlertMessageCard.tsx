import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CardHeader,
} from "@mui/material";
import { Button, Typography } from "@ecommerce-ozon/design_system";
import { ReactComponent as Phone } from "@ecommerce-ozon/design_system/dist/public/static/icons/phone.svg";
import { useHistory } from "react-router-dom";

const AlertMessageCard = () => {
  const history = useHistory();
  return (
    <div className="h_100_per w_100_per">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "0 20px",
        }}
      >
        <div
          style={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            fontSize: 19,
            alignItems: "center",
            backgroundColor: "#FFE0E6",
            color: "red",
            width: "40px",
            height: "40px",
            borderRadius: "10px",
          }}
        >
          X
        </div>
        <Card style={{ marginTop: 20 }} className="h_100_per w_100_per">
          <CardContent sx={{ padding: 0 }}>
            <div className="p_md">
              <Typography weight="600" scale="heading4" className="txt-center">
                Hemos guardado tu solicitud, sin embargo, la validación de
                identidad <span className="text_red_300">no fue exitosa.</span>
              </Typography>
            </div>
            <div
              style={{
                alignItems: "center",
                backgroundColor: "#F4F5F6",
              }}
              className="p_md display_flex flex_gap_md"
            >
              <Phone
                style={{ transform: "scale(2)" }}
                className="text_primary_300 m_md "
              />
              <Typography weight="400" scale="small" className="">
                Nos pondremos en contacto contigo, lo más rápido posible, para
                ayudarte con esta validación.{" "}
              </Typography>
            </div>
          </CardContent>
          <CardActions>
            <div className="display_flex flex_col_mobile p_md flex_center">
              <div className="w_50_per_desktop w_100_per_mobile">
                <Typography
                  weight="600"
                  scale="xsmall"
                  className="text_primary_300 m_r_lg txt-center"
                >
                  Toda la información{"  "}
                  <span className="text_neutral_800">
                    y futuras actualizaciones serán enviadas a tu correo
                    electrónico
                  </span>
                </Typography>
              </div>
              <Button
                className="w_50_per_desktop w_100_per_mobile"
                style={{ margin: "10px 0px " }}
                scale="small"
                onClick={() => history.push("/")}
              >
                Enterado, regresar a inicio
              </Button>
            </div>
          </CardActions>
        </Card>
      </div>
    </div>
  );
};

export default AlertMessageCard;
