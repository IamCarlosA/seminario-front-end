/* eslint-disable arrow-body-style */
import React from "react";
import ozon from "components/hocs/bannerMX/oneThousandSecction/mitadOzon.svg";
import moto from "components/hocs/bannerMX/oneThousandSecction/1000vh.png";
import { useHistory } from "react-router-dom";
import "./oneThousand.scss";
import { Typography, Button } from "@ecommerce-ozon/design_system";
import { ReactComponent as Moto } from "@ecommerce-ozon/design_system/dist/public/static/icons/motorcycle.svg";
import { Container, Grid } from "@mui/material";

export const OneThousandSecction = () => {
  const history = useHistory();
  return (
    <section
      className="w_100_per pos_relative p_y_xs p_x_xxl"
      style={{ border: "1px solid #EAEAEA" }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="end"
          className="display_none_mobile"
        >
          <Grid item xs={5}>
            <img src={moto} alt="vehiculo" style={{ width: "100%" }} />
          </Grid>
          <Grid item xs={7}>
            <div>
              <div className="display_none_mobile">
                <div className="letterTittleMedium">Más de</div>
                <div className="letterTittleLarge" style={{ maxWidth: "100%" }}>
                  2000+
                </div>
                <div className="letterTittleMedium">Motos Financiadas!</div>
              </div>
              <Typography scale="heading4" weight="600">
                Únete a la familia Ozon y disfruta de todos los beneficios que
                tenemos para ti!
              </Typography>
              <Button
                variant="principal"
                icon={<Moto />}
                className="m_y_xl w_80_per_desktop w_100_per_mobile"
                onClick={() => history.push("/catalogo")}
              >
                Encuentra tu moto ideal
              </Button>
            </div>
          </Grid>
        </Grid>
      </Container>
      <div className="display_none_desktop">
        <div className="display_flex_desktop w_100_per display_flex_col_mobile">
          <div className="w_50_per_desktop w_100_per_mobile display_flex_desktop display_flex_col_mobile flex_center_desktop p_md">
            <div className="display_none_desktop">
              <div className="letterTittleMedium">Más de</div>
              <div className="letterTittleLarge">2000+</div>
              <div className="letterTittleMedium">Motos Financiadas!</div>
            </div>
            <img src={moto} alt="vehiculo" className="w_100_per m_t_md" />
          </div>

          <div className=" w_100_per_mobile  p_y_xxl">
            <Typography scale="heading4" weight="600">
              ¡Únete a la familia Ozon y disfruta de todos los beneficios que
              tenemos para ti!
            </Typography>
            <Button
              variant="principal"
              icon={<Moto />}
              className="m_y_xl w_80_per_desktop w_100_per_mobile"
              onClick={() => history.push("/catalogo")}
            >
              Encuentra tu moto ideal
            </Button>
          </div>
        </div>
      </div>
      <img
        src={ozon}
        alt="ozon"
        className="pos_absolute display_none_mobile h_60_per"
        style={{ right: "0", top: "20%" }}
      />
    </section>
  );
};
