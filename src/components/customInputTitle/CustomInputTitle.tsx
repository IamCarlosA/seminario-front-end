import React from "react";
import Box from "@mui/material/Box";
import {ReactComponent as Boy} from "@ecommerce-ozon/design_system/dist/public/static/icons/boy.svg";
import {Typography} from "@ecommerce-ozon/design_system";



type ICustomInputTitle = {
  text: string;
  icon?: any;
  subtitle?: string;
}

const CustomInputTitle:React.FC<ICustomInputTitle> = ({text,icon, subtitle}) => {
  return (
    <Box sx={{
      display: "flex",
      justifyContent: "start",
      color:"#67737e",
    }} >
      <div className="m_t_xxs">
        {icon || <Boy className="primary_300"/>}
      </div>
      <div style={{display:"flex", flexDirection:"column"}}>
        <Typography scale="small" weight="600" className={subtitle? "m_l_xs m_t_sm " :  "m_l_sm m_t_xs "}>
          {text}
        </Typography>
        {
          subtitle && (
            <div style={{marginLeft: -20, marginTop:2}}>
              <Typography scale="xsmall" weight="400" textColor="neutral_600" >
                {subtitle}
              </Typography>
            </div>
          )
        }
      </div>

    </Box>
  );
};

export default CustomInputTitle;
