/* eslint-disable jsx-a11y/media-has-caption */
import Grid from "@material-ui/core/Grid";
import React from "react";

export const OzocioLanding = () => (
  <>
    <div style={{ width: "100wh", height: "40vh", backgroundColor: "#286ee8" }}>
      <Grid
        container
        direction="row"
        alignItems="center"
        style={{ height: "100%" }}
      >
        <Grid item xs={6}>
          <video
            preload="auto"
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              width: "350px",
              height: "500px",
            }}
          >
            <source src="https://firebasestorage.googleapis.com/v0/b/ozon-68ff3.appspot.com/o/ozon_03.mp4?alt=media&amp;token=3d035f04-7f38-4314-9b24-d0187a1bf432" />
          </video>
        </Grid>
        <Grid item xs={6}>
          2
        </Grid>
      </Grid>
    </div>
    <div
      style={{ width: "100wh", height: "60vh", backgroundColor: "#F5F5F5" }}
    />
  </>
);
