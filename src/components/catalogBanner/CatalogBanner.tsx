import React, {useState} from "react";
import {Grid, useMediaQuery} from "@mui/material";

import {Button, Typography} from "@ecommerce-ozon/design_system";
import BannerBG from "../../static/backgrounds/catalogBanner/catalogBanner.svg";
import MotosBanner from "../../static/backgrounds/catalogBanner/catalogBannerMotos.svg";
import {ModalFormFinanciero} from "../hocs/modal/ModalFormFinanciero";

const CatalogBanner = () => {
  const [open, setOpen] = useState<boolean>(false);


  const bannerStyle = {
    marginTop:1,
    backgroundImage: `url(${BannerBG})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "220px",
  };


  const handleBannerClick =()=> {
    setOpen(true);
  };

  const matchesXS = useMediaQuery("(min-width:600px)");

  return (
    <>
      {
        !matchesXS ? (
          <Grid container >
            <Grid item xs={12} sx={{backgroundColor:"#fe8a02", height:"15vh", paddingBottom:"120px" }} >
              <img src={MotosBanner} alt="moto" style={{
                height:"auto",
                padding:"20px",
                position:"absolute",
                marginTop:"-6.5vh",
                maxWidth:"100%",
                marginBottom:500
              }}/>
            </Grid>
            <br/>
            <Grid item xs={12} sx={{backgroundColor:"black"}} className="txt-center p_x_lg ">
              <Typography weight="600" scale="heading3" className=" m_t_md m_b_sm p_t_xl" textColor="primary_300">
                ¿Aún no encuentras tu moto? {" "}
              </Typography>
              <Typography weight="400" scale="small" className="p_x_lg m_l_md m_t_lg p_b_lg" style={{color:"white"}}>
                Permítenos ayudarte, calcularemos cuál sería tu moto ideal{" "}
                <span style={{fontWeight: "bolder"}}>basándonos en tus ingresos y egresos mensuales.</span>
              </Typography>
              <Button
                variant="principal"
                scale="small"
                className="m_t_md w_100_per_desktop   w_80_per_mobile m_l_xl m_r_xl  m_b_xxl"
                onClick={handleBannerClick}
              >
            <span style={{fontSize:"16px", }}>
              Quiero comenzar mi solicitud
            </span>
              </Button>
            </Grid>
          </Grid>
        ) : (

          <Grid container sx={bannerStyle} >
            <Grid item xs={12} sm={8} md={7} lg={8} xl={9}>
              <Grid container justifyContent="start" sx={{maxWidth:650}}>
                <Typography weight="600" scale="heading3" className="m_l_xl m_t_md m_b_sm" textColor="primary_300">
                  ¿Aún no encuentras tu moto? {" "}
                </Typography>
                <div style={{marginTop: "-20px", color: "white"}}>
                  <Typography weight="400" scale="small" className="p_x_lg m_l_md m_t_lg">
                    Permítenos ayudarte, calcularemos cuál sería tu moto ideal{" "}
                    <span style={{fontWeight: "bolder"}}>basándonos en tus ingresos y egresos mensuales.</span>
                  </Typography>
                </div>
                <div style={{maxWidth:300, }}>
                  <Button
                    variant="principal"
                    scale="small"
                    className="m_t_md w_100_per_desktop   w_100_per_mobile m_l_xl m_r_xl "
                    onClick={handleBannerClick}
                  >
            <span style={{fontSize:"16px", }}>
              Quiero comenzar mi solicitud
            </span>
                  </Button>
                </div>

              </Grid>
            </Grid>
            <Grid item xs={4} sm={4} md={5} lg={4} xl={3} className="display_none_mobile ">
              <img src={MotosBanner} width="100%" alt="banner" className="p_b_md" />
            </Grid>
          </Grid>

        )
      }


      <ModalFormFinanciero
        title={
          <Typography weight="600" scale="large" className="txt-center">
            Vamos a
            <span className="text_primary_300"> iniciar </span>
            la busqueda de tu moto ideal:
          </Typography>}
        subtitle={<Typography weight="600" scale="heading3" textColor="primary_300">¿Quieres saber cual es tu moto ideal?
        </Typography>}
        open={open}
        setOpen={()=>setOpen(!open)}
        orientation="vertical"/>
    </>
  );
};

export default CatalogBanner;

