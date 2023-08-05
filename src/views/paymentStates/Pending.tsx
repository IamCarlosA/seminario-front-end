import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import bicis from "static/images/paystatus/bicis.svg";
import { infSupp } from "models/constants/infoSupp.constants";

export const Pending = () => (
  <Container style={{ marginTop: "2rem" }}>
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={7}>
        <Paper style={{ backgroundColor: "#FFE03D" }} elevation={3}>
          <Grid
            container
            direction="row"
            style={{ padding: "2rem" }}
            spacing={3}
          >
            <Grid item xs={12}>
              <img
                src={bicis}
                alt="bicis"
                style={{ display: "block", margin: "auto" }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                style={{
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                }}
                variant="h5"
              >
                Tu pago está PENDIENTE
                {/* <span style={{ color: 'black', fontWeight: 'bold' }}> APROBADO</span> */}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} style={{ paddingTop: "2rem" }}>
        <Typography
          color="primary"
          style={{
            display: "flex",
            justifyContent: "center",
            fontWeight: "bold",
          }}
          variant="h4"
        >
          ¡TU PAGO AÚN NO ESTÁ VERIFICADO!
        </Typography>
        <Typography
          style={{
            display: "flex",
            justifyContent: "center",
            fontWeight: "bold",
            color: "#565656",
            paddingTop: "2rem",
          }}
          variant="h5"
        >
          EL PROCESO PUEDE TARDAR
        </Typography>

        <Typography
          component="p"
          variant="body1"
          style={{ paddingTop: "1rem" }}
        >
          Una vez esté aprobado o rechazado el pago te lo notificaremos a tu
          correo electrónico, no olvides mirar en tu bandeja de entrada y en el
          correo no deseado.
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sm={7}
        style={{
          paddingTop: "2rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            borderRadius: "50%",
            backgroundColor: "green",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50px",
            width: "50px",
          }}
        >
          <WhatsAppIcon style={{ color: "white" }} />
        </div>
      </Grid>

      <Grid item xs={12} sm={7}>
        <Typography
          style={{
            display: "flex",
            justifyContent: "center",
            fontWeight: "bold",
            color: "#565656",
            paddingTop: "1rem",
          }}
          variant="body1"
        >
          Si tienes dudas puedes contactar a Joha de soporte
        </Typography>
        <Typography
          color="primary"
          style={{
            display: "flex",
            justifyContent: "center",
            fontWeight: "bold",
          }}
          variant="body1"
        >
          + {infSupp.CONTACT.COLOMBIA.CELLPHONE}
        </Typography>
      </Grid>
    </Grid>
  </Container>
);
