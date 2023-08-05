import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import notFound from "../static/images/404.png";

export const NotFound = () => (
  <Container style={{ paddingTop: "2rem" }}>
    <Grid
      container
      direction="row"
      spacing={1}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12}>
        <img
          src={notFound}
          alt=""
          style={{ display: "block", margin: "auto" }}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography
          color="primary"
          style={{
            display: "flex",
            fontFamily: "Fredoka One",
            justifyContent: "center",
          }}
          variant="h5"
        >
          uffff! <br />
          No encontramos la página que estas buscando...
        </Typography>
      </Grid>
    </Grid>
  </Container>
);
