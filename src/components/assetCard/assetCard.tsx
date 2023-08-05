/* eslint-disable no-unused-vars */

import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {Typography} from "@ecommerce-ozon/design_system";
import Button from "@mui/material/Button";

// eslint-disable-next-line no-shadow
export enum assetEnum {
  ninguno="Ninguno",
  casa="Casa",
  carro="Carro",
  moto="Moto",
  otro = "Otro",
}

type AssetCardProps = {
  item: any;
  assetsInfo: any;
  setAssetsInfo: any;
}



const AssetCard: React.FC<AssetCardProps> = ({item,assetsInfo, setAssetsInfo}) => {

  const {isActive, text, icon}= item;

  const assetCardStyle = {
    padding: 2,
    marginTop: 2,
    marginRight: 1,
    border: "0px solid ",
    borderRadius: 5,
    backgroundColor: isActive ? "orange" : "white",
    boxShadow: "2px 4px 8px rgba(34, 38, 42, 0.05), 4px 8px 24px rgba(34, 38, 42, 0.1)",
    "&:hover": {
      border: "0px solid ",
      backgroundColor: "#fe8a02",
      opacity: [0.9, 0.8, 0.7],
      cursor: "pointer",
      color: "white"
    },
  };



  const handleClick = () => {
    const nextState = assetsInfo.map((button:any, idx:number) =>{
      if(idx === item.id){
        return {...button, isActive: !button.isActive};
      }
      return  button;
    });



     setAssetsInfo(nextState);
  };




  return (
    <Button
      color="info"
      onClick={handleClick}
      variant={isActive? "contained":"outlined"}
      sx={assetCardStyle}
      disableElevation={!!isActive}
    >
      <div style={{display:"flex", flexDirection:"column"}}>
        <img src={icon}
             alt="cardImage"
             width="57"
        />
        <Typography
          scale="small"
          weight="600"
          className=" m_t_xxs"
          textColor={isActive ? "neutral_100": "neutral_700"}
        >
          {text}
        </Typography>
      </div>
    </Button>
  );
};

export default AssetCard;
