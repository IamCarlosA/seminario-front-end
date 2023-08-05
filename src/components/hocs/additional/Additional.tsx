import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/index";
import { changeDelivery, changeSure } from "store/actions/pay";
import { TVehicle } from "models/vehicle.interface";
import { insurance } from "helpers/prices";
import { formatPrice } from "helpers/formatPrice";
import { useStyles } from "./additional.styles";

export const Additional = () => {
  const dispatch = useDispatch();
  const { delivery, sure, vehicle } = useSelector(
    (state: RootState) => state.payReducer
  );
  const [vehi] = useState<TVehicle>(vehicle);
  const classes = useStyles();

  const handleDomi = () => {
    dispatch(changeDelivery(!delivery));
  };

  const handleSeg = () => {
    dispatch(changeSure(!sure));
  };

  return (
    <Grid container direction="row" spacing={3} style={{ marginTop: "2rem" }}>
      <Typography
        color="primary"
        variant="h5"
        gutterBottom
        style={{ fontWeight: 600 }}
      >
        ADICIONES / COMPLEMENTOS
      </Typography>
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: "2rem" }}>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12}>
              <Typography
                variant="body1"
                gutterBottom
                style={{ fontWeight: 600 }}
              >
                DOMICILIO
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              Si adicionas el domicilio se enviará tu vehículo en máximo 2 días
              hábiles de lo contrario tienes un día hábil para retirarlo en
              nuestras bodegas.
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography
                style={{ fontWeight: "bold", color: "#FF8B00" }}
                variant="h5"
              >
                ${formatPrice(vehi.country?.deliveryPrice, vehi.country?.iso)}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Button
                variant="contained"
                onClick={handleDomi}
                className={delivery ? classes.btnCanc : classes.btnAdd}
              >
                {delivery ? <CancelIcon /> : <AddCircleIcon />}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: "2rem" }}>
          <Grid container direction="row">
            <Grid item xs={12}>
              <Typography
                variant="body1"
                gutterBottom
                style={{ fontWeight: 600 }}
              >
                PROTECCIÓN CONTRA ROBO
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              Gracias a esta protección que costeas mensualmente, si a tu
              vehículo le pasa algo, solo debes pagar una mensualidad extra.
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography
                style={{ fontWeight: "bold", color: "#FF8B00" }}
                variant="h5"
              >
                $
                {formatPrice(
                  insurance(vehi.rentPrice, vehi.country?.insurance),
                  vehi.country?.iso
                )}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Button
                variant="contained"
                onClick={handleSeg}
                className={sure ? classes.btnCanc : classes.btnAdd}
              >
                {sure ? <CancelIcon /> : <AddCircleIcon />}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper
          elevation={3}
          style={{ padding: "2rem", backgroundColor: "#EEEEEE" }}
        >
          <Grid container direction="row">
            <Grid item xs={12}>
              <Typography
                color="primary"
                variant="body1"
                gutterBottom
                style={{ fontWeight: 600 }}
              >
                ¿POR QUÉ PAGO DEPÓSITO? ☝️
              </Typography>
            </Grid>
            <Grid item xs={12}>
              Este depósito de alquiler lo pagas al inicio para cubrir daños
              ocasionados en el vehículo, para ser reparado en un mantenimiento
              o en su defecto se te reembolsa una vez devuelvas el vehículo en
              las mismas condiciones en las que te fue entregado y al estar sin
              pagos pendientes.
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper
          elevation={3}
          style={{ padding: "2rem", backgroundColor: "#EEEEEE" }}
        >
          <Grid container direction="row">
            <Grid item xs={12}>
              <Typography
                color="primary"
                variant="body1"
                gutterBottom
                style={{ fontWeight: 600 }}
              >
                ¿QUÉ INCLUYE EL PLAN MENSUAL? 👍
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="body2"
                gutterBottom
                style={{ fontWeight: 600 }}
              >
                MANTENIMIENTO
              </Typography>
            </Grid>
            <Grid item xs={12}>
              Te ofrecemos mantenimientos, hacemos los ajustes que necesite tu
              vehículo debes programarlo con nuestros talleres aliados, SOLO SI
              LO NECESITAS mensualmente.
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="body2"
                gutterBottom
                style={{ fontWeight: 600 }}
              >
                KILOMETROS ILIMITADOS
              </Typography>
            </Grid>
            <Grid item xs={12}>
              Puedes conducir todo lo que quieras sin cargos adicionales.
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};
