import Grid from "@material-ui/core/Grid";
import React from "react";
import fianciado from "static/images/banner/financiada.png";
import { Typography, Button } from "@ecommerce-ozon/design_system";

interface Props {
  country: string;
  finan: () => void;
  className?: string;
}

const IdealVehicleBanner: React.FC<Props> = ({
  country,
  finan,
  className = "",
}) => (
  <Grid item xs={12} md={6} className={`p_r_lg ${className}`}>
    <Grid
      container
      direction="row"
      className="dso_card bg_neutral_200 p_y_none"
      justifyContent="center"
      spacing={3}
    >
      <Grid item xs={12} md={country === "MX" ? 6 : 12}>
        <Typography scale="large" weight="600" className="m_b_lg">
          {" "}
          Encuentra la moto ideal para ti
        </Typography>
        <Typography scale="small" weight="600" className="m_b_lg">
          {" "}
          Calcula tu financiamiento con Ozon
        </Typography>
        <Typography scale="small" weight="400" className="m_b_xxl">
          {" "}
          Conoce el costo de tus cuotas semanales haciendo clic aquí
        </Typography>
        <Button scale="small" className="w_100_per" onClick={finan}>
          Financia tu moto
        </Button>
      </Grid>
      <Grid item xs={12} md={6}>
        <img src={fianciado} alt="" className="w_100_per" />
      </Grid>
    </Grid>
  </Grid>
);

export default IdealVehicleBanner;
