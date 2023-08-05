import React from "react";


import {Accordion,AccordionSummary,AccordionDetails} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Typography} from "@ecommerce-ozon/design_system";


interface IconTypeProps {
  fill: string;
}

type IconType = (props: IconTypeProps) => JSX.Element;


type OzonAccordionProps = {
  title: any
  childComponent:any;
  icon:IconType
  array: any[]
  idx: any
}

export const OzonAccordion:React.FC<OzonAccordionProps> = ({title,childComponent, icon, array, idx})  => {

  const [expanded, setExpanded] = React.useState<boolean>(false);

  const handleChange = (panel: boolean) =>
    (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? !panel : isExpanded);
    };

  return (
      <Accordion
        expanded={array[idx].isExpanded } onChange={handleChange(array[idx].isExpanded)}
        disableGutters
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <div className="m_t_xxs" style={{display: "flex", alignItems: "center", }}>
            {React.createElement(icon, {fill:expanded ? "darkorange" : "grey"})}
            <Typography scale="small" weight="600" className="m_l_md" textColor={expanded ? "primary_300" : "neutral_700"}>
              {title}
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails
        >
          {childComponent}
        </AccordionDetails>
      </Accordion>
  );
};

export default OzonAccordion;
