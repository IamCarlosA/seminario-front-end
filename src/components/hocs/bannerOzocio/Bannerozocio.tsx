import React, { useEffect } from "react";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Hidden from "@material-ui/core/Hidden";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import Typography from "@mui/material/Typography";
// imgs
import motoorange from "static/bannerImages/motoorange.png";
import bannerozocio from "static/bannerImages/bannerozocio.png";
import rect1 from "static/images/motos/rect1.svg";
import copy from "static/images/banner/copy.svg";

// css
import "./banner.css";
import { useStyles } from "./banner.styles";

export const Bannerozocio = () => {
  const history = useHistory();
  const classes = useStyles();

  const ozocio = () => {
    history.push("/formulario-vende-tu-moto");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div className="dad">
        <Container>
          <Grid
            container
            direction="row"
            alignItems="center"
            spacing={3}
            style={{ height: "55vh" }}
          >
            <Grid item xs={12} sm={12} md={6}>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={12}>
                  <img src={copy} alt="img" className={classes.photo} />
                </Grid>

                <Grid item xs={12} style={{ paddingTop: "1rem" }}>
                  <Typography
                    variant="h2"
                    component="div"
                    style={{
                      fontFamily: "Staatliches",
                      letterSpacing: "0.3em",
                      fontWeight: 600,
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    VENDE TU MOTO
                  </Typography>
                  <Button
                    variant="contained"
                    style={{
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                      backgroundColor: "#FF8B00",
                    }}
                    onClick={ozocio}
                  >
                    CLIC AQUÍ
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <Hidden smDown>
              <Grid item md={6}>
                <img
                  src={bannerozocio}
                  alt="bici"
                  style={{
                    height: "50%",
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                />
              </Grid>
            </Hidden>
          </Grid>
        </Container>
      </div>

      <Container className={classes.pad}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item xs={12} sm={6}>
            <img
              src={rect1}
              alt="moto"
              style={{
                width: "40%",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="h3"
              color="primary"
              component="div"
              style={{
                fontFamily: "Staatliches",
                letterSpacing: "0.1em",
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              VENDE TU MOTO DE FORMA ÁGIL Y CONFIABLE...
            </Typography>
            <Typography
              variant="h6"
              component="div"
              style={{ textAlign: "center" }}
            >
              <span style={{ fontWeight: 300 }}>
                Con Ozon lo haces en UN DÍA*
              </span>
            </Typography>
          </Grid>
        </Grid>
      </Container>

      <div
        style={{
          backgroundColor: "white",
          paddingTop: "3rem",
          paddingBottom: "3rem",
        }}
      >
        <Container>
          <Grid container direction="row" spacing={3}>
            <Grid item xs={12} sm={12} md={6}>
              <img
                src={motoorange}
                alt="moto"
                style={{
                  width: "75%",
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <Grid item xs={12}>
                <Typography
                  variant="h3"
                  color="primary"
                  component="div"
                  style={{
                    textAlign: "center",
                    fontFamily: "Staatliches",
                    letterSpacing: "0.2em",
                    fontWeight: 600,
                  }}
                >
                  BENEFICIOS OZON 🐼
                </Typography>
              </Grid>
              <Grid
                container
                direction="row"
                spacing={2}
                style={{ marginTop: "2.5rem" }}
              >
                <Grid item xs={2} sm={3}>
                  <div
                    style={{
                      backgroundColor: "#FF8B00",
                      borderRadius: "50%",
                      height: "2rem",
                      width: "2rem",
                      position: "relative",
                      float: "right",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "white",
                        position: "absolute",
                        borderRadius: "50%",
                        height: "1rem",
                        width: "1rem",
                        margin: "auto",
                        top: "0",
                        left: "0",
                        bottom: "0",
                        right: "0",
                      }}
                    />
                  </div>
                </Grid>
                <Grid item xs={10} sm={9}>
                  <Typography
                    variant="h5"
                    style={{ fontWeight: 600, color: "#FF8B00" }}
                  >
                    Te dámos un precio preliminar
                  </Typography>
                  <Typography variant="h6" style={{ fontWeight: 300 }}>
                    En linea y al instante.
                  </Typography>
                </Grid>
                <Grid item xs={2} sm={3}>
                  <div
                    style={{
                      backgroundColor: "#FF8B00",
                      borderRadius: "50%",
                      height: "2rem",
                      width: "2rem",
                      position: "relative",
                      float: "right",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "white",
                        position: "absolute",
                        borderRadius: "50%",
                        height: "1rem",
                        width: "1rem",
                        margin: "auto",
                        top: "0",
                        left: "0",
                        bottom: "0",
                        right: "0",
                      }}
                    />
                  </div>
                </Grid>
                <Grid item xs={10} sm={9}>
                  <Typography
                    variant="h5"
                    style={{ fontWeight: 600, color: "#FF8B00" }}
                  >
                    CERO tramites
                  </Typography>
                  <Typography
                    variant="h6"
                    component="div"
                    style={{ fontWeight: 300 }}
                  >
                    Ozon se encarga de los trámites necesarios.
                  </Typography>
                </Grid>
                <Grid item xs={2} sm={3}>
                  <div
                    style={{
                      backgroundColor: "#FF8B00",
                      borderRadius: "50%",
                      height: "2rem",
                      width: "2rem",
                      position: "relative",
                      float: "right",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "white",
                        position: "absolute",
                        borderRadius: "50%",
                        height: "1rem",
                        width: "1rem",
                        margin: "auto",
                        top: "0",
                        left: "0",
                        bottom: "0",
                        right: "0",
                      }}
                    />
                  </div>
                </Grid>
                <Grid item xs={10} sm={9}>
                  <Typography
                    variant="h5"
                    style={{ fontWeight: 600, color: "#FF8B00" }}
                  >
                    Revisión Gratis
                  </Typography>
                  <Typography
                    variant="h6"
                    component="div"
                    style={{ fontWeight: 300 }}
                  >
                    Realizamos la revisión del vehículo rápido y te asegurarémos
                    el precio preliminar.
                  </Typography>
                </Grid>

                <Grid item xs={false} sm={3} />
                <Grid item xs={12} sm={9}>
                  <Button
                    variant="contained"
                    style={{
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                      backgroundColor: "#FF8B00",
                    }}
                    onClick={ozocio}
                  >
                    Cotiza tu moto
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>

      <div style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
        <Container>
          <Grid container direction="row" spacing={3}>
            <Grid item xs={12}>
              <Grid item xs={12}>
                <Typography
                  variant="h3"
                  color="primary"
                  component="div"
                  style={{
                    textAlign: "center",
                    fontFamily: "Staatliches",
                    letterSpacing: "0.1em",
                    fontWeight: 600,
                  }}
                >
                  ¿CÓMO VENDER? HAZLO EN 3 PASOS
                </Typography>
              </Grid>
              <Grid
                container
                direction="row"
                spacing={3}
                style={{ marginTop: "2.5rem" }}
              >
                <Grid item xs={2} sm={4}>
                  <div
                    style={{
                      backgroundColor: "#FF8B00",
                      borderRadius: "50%",
                      height: "2rem",
                      width: "2rem",
                      position: "relative",
                      float: "right",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "white",
                        position: "absolute",
                        borderRadius: "50%",
                        height: "1rem",
                        width: "1rem",
                        margin: "auto",
                        top: "0",
                        left: "0",
                        bottom: "0",
                        right: "0",
                      }}
                    />
                  </div>
                </Grid>
                <Grid item xs={10} sm={8}>
                  <Typography
                    variant="h5"
                    style={{ fontWeight: 600, color: "#FF8B00" }}
                  >
                    Cotiza{" "}
                    <span style={{ fontWeight: 300, color: "black" }}>
                      tu moto en linea con la información básica.
                    </span>
                  </Typography>
                </Grid>

                <Grid item xs={2} sm={4}>
                  <div
                    style={{
                      backgroundColor: "#FF8B00",
                      borderRadius: "50%",
                      height: "2rem",
                      width: "2rem",
                      position: "relative",
                      float: "right",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "white",
                        position: "absolute",
                        borderRadius: "50%",
                        height: "1rem",
                        width: "1rem",
                        margin: "auto",
                        top: "0",
                        left: "0",
                        bottom: "0",
                        right: "0",
                      }}
                    />
                  </div>
                </Grid>
                <Grid item xs={10} sm={8}>
                  <Typography
                    variant="h5"
                    style={{ fontWeight: 600, color: "#FF8B00" }}
                  >
                    Agenda{" "}
                    <span style={{ fontWeight: 300, color: "black" }}>
                      una inspección totalmente gratis con nosotros, puede ser a
                      domicilio.
                    </span>
                  </Typography>
                </Grid>

                <Grid item xs={2} sm={4}>
                  <div
                    style={{
                      backgroundColor: "#FF8B00",
                      borderRadius: "50%",
                      height: "2rem",
                      width: "2rem",
                      position: "relative",
                      float: "right",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "white",
                        position: "absolute",
                        borderRadius: "50%",
                        height: "1rem",
                        width: "1rem",
                        margin: "auto",
                        top: "0",
                        left: "0",
                        bottom: "0",
                        right: "0",
                      }}
                    />
                  </div>
                </Grid>
                <Grid item xs={10} sm={8}>
                  <Typography
                    variant="h5"
                    style={{ fontWeight: 600, color: "#FF8B00" }}
                  >
                    Final{" "}
                    <span style={{ fontWeight: 300, color: "black" }}>
                      después de la revisión, te darémos una oferta final y
                      firmarémos la documentación correspondiente.
                    </span>
                  </Typography>
                </Grid>

                <Grid item xs={false} sm={3} />
                <Grid item xs={12} sm={9}>
                  <Button
                    variant="contained"
                    style={{
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                      backgroundColor: "#FF8B00",
                    }}
                    onClick={ozocio}
                  >
                    Compramos tu moto
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};
