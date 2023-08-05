import React, {useState} from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import {Typography, Button} from "@ecommerce-ozon/design_system";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {clearSelectedFilters} from "../../store/actions/vehicles";


interface OptionProps {
  title:string,
  icon: any;
  children: any
}

interface AccordionProps {
  options: OptionProps[];
}

const OzonAccordion: React.FC<AccordionProps> = ({ options }) => {
  const [expanded, setExpanded] = useState<boolean[]>(options.map(() => false));

  const handleExpandAll = () => {
    const allExpanded = expanded.every((value) => value);
    setExpanded(options.map(() => !allExpanded));
  };

  const handleExpand = (index: number) => () => {
    const newExpanded = [...expanded];
    newExpanded[index] = !newExpanded[index];
    setExpanded(newExpanded);
  };

  return (
    <>
      <div className="display_flex flex_align_center text_neutral_700 " style={{ justifyContent: "space-between" }}>
        <Typography className="p_x_md" weight="600" scale="small">Filtrar por</Typography>
        <Button onClick={handleExpandAll}
                variant="link" scale="small">
          <Typography weight="400" className="text_secondary_600" scale="small">
            {expanded.every((value) => value) ? "Colapsar Todo" : "Expandir Todo"}
          </Typography>
        </Button>
      </div>
      {options.map((option, index) => (
        <Accordion key={index}
                   expanded={expanded[index]}
                   onChange={handleExpand(index)}
                   disableGutters
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}
                            style={{paddingRight:"10px", width:"100%"}}>
            <div className="m_l_md" style={{display: "flex", alignItems: "center",  }}>
              {React.createElement(option.icon, {fill:expanded[index] ? "darkorange" : "grey"})}
              <Typography scale="small" weight="600" className="m_l_sm" textColor={expanded[index] ? "primary_300" : "neutral_700"}>
                {option.title}
              </Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            {option.children}
          </AccordionDetails>
        </Accordion>
      ))}
    </>

  );
};

export default OzonAccordion;
