import React from "react";
import {Container, Grid, useTheme, useMediaQuery} from "@mui/material";


import {Button, Typography} from "@ecommerce-ozon/design_system";
import {useHistory} from "react-router-dom";
import GarageImage from "../../static/bannerImages/garaje.png";
import {ContactHelper} from "../../components/hocs/ContactHelper/ContactHelper";
import RecommendedDetails from "../DetailsView/RecommendedDetails/RecommendedDetails";




const NoAvailableVehicle: React.FC<any> = (props) => {
  const history = useHistory();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // eslint-disable-next-line react/destructuring-assignment
  const { model } = props?.location?.state || {};
  const motoModel = model;

  const handleClick = () => {
    history.push("catalogo");
  };

  return (
    <div>
      <Container maxWidth="lg" style={{marginTop: "4vh", marginBottom: "4vh"}}>
        <Grid container style={{border: "1px solid #E0E3E5", borderRadius: 10, backgroundColor: "white"}}>
          <Grid item xs={12} md={6} style={{
            order: isMobile ? 2 : 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            paddingRight: isMobile ? 20 : 40,
            paddingLeft: isMobile ? 20 : 40,
          }}>
            <div style={{width: "100%", display: "flex", justifyContent: "start", marginTop: "30px"}}>
              <div style={{
                backgroundColor: "#FCF2E7",
                paddingLeft: 15,
                marginBottom: 12,
                borderRadius: "50%",
                height: "45px",
                width: "45px",
                fontSize: "30px",
                fontWeight: "bolder",
                color: "darkorange"
              }}>
                ?
              </div>
            </div>
            <Typography scale="heading3" weight="600" className="m_b_md">
              ¡¡Ups!! Parece que nuestra moto <span>{motoModel}</span> <span style={{color: "darkorange",}}>salió a explorar el mundo</span>
            </Typography>
            <Typography scale="medium" weight="600">
              Nuestra moto se ha escapado para descubrir nuevos horizontes. Aunque no esté aquí, <span
              style={{color: "black", fontWeight: "bolder"}}>no te preocupes,&nbsp;</span>
              ¡tenemos otras sorpresas emocionantes esperándote!
            </Typography>
            <br/>
            <Button
              onClick={handleClick}
              scale="small"
              className="m_b_xl"
            >
              ¡Descubrir alternativas emocionantes!
            </Button>
          </Grid>
          <Grid item xs={12} md={6} style={{
            order: isMobile ? 1 : 2,

          }}>
            <div style={{height: "100%"}}>
              <img src={GarageImage} alt="imageGarage" style={{
                width: "100%",
                height: "100%",
                borderTopLeftRadius: isMobile ? 10 : 0,
                borderTopRightRadius: 10,
                borderBottomRightRadius: isMobile ? 0 : 10
              }}/>
            </div>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12}>
          <RecommendedDetails/>
        </Grid>
      </Container>
      {/* <ContactHelper/> */}
    </div>
  );
};

export default NoAvailableVehicle;
