/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */

import React from "react";
import Card from "@mui/material/Card";
import { Container, createStyles, makeStyles } from "@material-ui/core";
import { ReactComponent as Reload } from "@ecommerce-ozon/design_system/dist/public/static/icons/reload-ui-2.svg";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import {Grid, useMediaQuery} from "@mui/material";
import {Typography} from "@ecommerce-ozon/design_system";
import Box from "@mui/material/Box";

import {Divider} from "../../views/DetailsView/NewDetailsView";
import {formatPrice} from "../../helpers/formatPrice";
import {prices} from "../../helpers/prices";
import {TextBox} from "../cards/OzonCardVehicle";


type SkeletonCardProps = {
  showItems?: number;
  columnsPerCard?: number;
}

type CardItemProps = {
  columnsPerCard?: number;
}

const CardItem: React.FC<CardItemProps> = ({columnsPerCard}) => {
  return (
    <Grid item xs={columnsPerCard} sm={columnsPerCard} md={columnsPerCard} lg={columnsPerCard}>
      <Card sx={{width: "100%", m: 2, p: 1}}>
        <Skeleton sx={{height: 179}} animation="wave" variant="rectangular"/>
        <div style={{display: "flex", justifyContent: "space-around"}}>
          <Skeleton animation="wave" height={35} style={{marginBottom: 6}} width="40%"/>
          <Skeleton animation="wave" height={35} width="40%"/>
        </div>
        <div className="m_t_xs" style={{display: "flex", justifyContent: "space-evenly"}}>
          <Skeleton variant="rectangular" animation="wave" height={25} style={{marginBottom: 6}} width="30%"/>
          <Skeleton variant="rectangular" animation="wave" height={25} width="30%"/>
        </div>
        <div style={{display: "flex", justifyContent: "space-evenly"}}>
          <Skeleton variant="rectangular" animation="wave" height={25} style={{marginBottom: 6}} width="30%"/>
          <Skeleton variant="rectangular" animation="wave" height={25} width="30%"/>
        </div>
        <Skeleton className="m_md" sx={{height: 100}} animation="wave" variant="rectangular"/>

      </Card>
    </Grid>

  );
};

const MobileCardItem: React.FC<CardItemProps> = () => {

   const useStyles = makeStyles(() =>
    createStyles({
      rotateIcon: {
        animation: "$spin 2s linear infinite",
        width:"15px",
        marginRight:15
      },
      "@keyframes spin": {
        "0%": {
          transform: "rotate(360deg)"
        },
        "100%": {
          transform: "rotate(0deg)"
        }
      }
    })
  );
  const classes = useStyles();
  return (
    <Grid item className="dso_card m_t_lg  " xs={12} style={{backgroundColor: "white"}}>
      <Grid container>
        <Grid item xs={6}>
          <Skeleton className="m_md" sx={{height: 67, width: "80%", borderRadius: 3}} animation="wave"
                    variant="rectangular"/>

        </Grid>
        <Grid item xs={6}>

          <Skeleton className="m_md" sx={{height: 10, width: "30%", borderRadius: 3}} animation="wave"
                    variant="rectangular"/>
          <Skeleton className="m_md" sx={{height: 10, width: "60%", borderRadius: 3}} animation="wave"
                    variant="rectangular"/>
          <Skeleton className="m_md" sx={{height: 10, width: "90%", borderRadius: 3}} animation="wave"
                    variant="rectangular"/>
        </Grid>
      </Grid>
      <div style={{borderBottom: "0.529801px solid #DEDEDE"}}/>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={6}>
          <div style={{display: "flex", justifyContent: "center"}}>
            <Skeleton className="" sx={{height: 16, width: "30%", borderRadius: 3}} animation="wave"
                      variant="rectangular"/>
          </div>
          <div style={{display: "flex"}}>
            <Skeleton className="m_md" sx={{height: 16, width: "30%", borderRadius: 3}} animation="wave"
                      variant="rectangular"/>
            <Skeleton className="m_md" sx={{height: 16, width: "30%", borderRadius: 3}} animation="wave"
                      variant="rectangular"/>
            <Skeleton className="m_md" sx={{height: 16, width: "30%", borderRadius: 3}} animation="wave"
                      variant="rectangular"/>
          </div>
          <div className=" display_flex"  style={{justifyContent:"center", alignItems:"center"}} >

            <Reload className={classes.rotateIcon}/>
            <Typography weight="400" scale="xxsmall">
              Cargando...
            </Typography>
          </div>
        </Grid>
        <Grid item xs={6}>
          <Skeleton className="m_md" sx={{height: 67, width: "90%", borderRadius: 3}} animation="wave"
                    variant="rectangular"/>
        </Grid>
      </Grid>
    </Grid>

  );
};

const SkeletonCard: React.FC<SkeletonCardProps> = ({showItems = 6, columnsPerCard = 4}) => {

  const matchesXS = useMediaQuery("(min-width:600px)");

  const renderMobileSkeletonCards = (): JSX.Element => {
    return (
      <>
        <MobileCardItem />
        <MobileCardItem />
        <MobileCardItem />
        <MobileCardItem />
      </>
    );
  };

  const renderSkeletonCards = (): any[] => {
    const skeletonCards: any[] = [];
    for (let i: number = 1; i <= showItems; i++) {
      skeletonCards.push(<CardItem key={i}
                                   columnsPerCard={columnsPerCard}/>);
    }
    return skeletonCards;
  };
  return (
    <Grid  container >
      {
        !matchesXS
          ? renderMobileSkeletonCards()
          : renderSkeletonCards()
      }
      <div className="center m_t_xxl">
        {
          !matchesXS
            ? <> </>
            :
            <Typography weight="600" scale="small">Cargando...</Typography>
        }
      </div>
    </Grid>
  );
};

export default SkeletonCard;
