import React, { FC } from "react";
import { useDispatch } from "react-redux";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import Accordion from "@mui/material/Accordion";
import { Button, Modal, Typography } from "@ecommerce-ozon/design_system";
import { ReactComponent as Search } from "@ecommerce-ozon/design_system/dist/public/static/icons/search.svg";
import InputSearchTextFilter from "./InputSearchTextFilter";
import FilterByHeader from "./FilterByHeader";
import InputFilters from "./InputFilters";
import { TVehicle } from "../../models/vehicle.interface";
import {clearSelectedFilters} from "../../store/actions/vehicles";

interface Props {
  open?: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpen?: any;
  filterVehicles?: TVehicle[];
  setCurrentPage?:any
}

const FiltersModal: FC<Props> = ({ open = false, setOpen, filterVehicles, setCurrentPage}) => {

  const dispatch = useDispatch();

  return(

      <Modal setOpen={setOpen} open={open} className=" " >
        {/*<InputSearchTextFilter />*/}
        {/*<div className="">*/}
        {/*  <FilterByHeader />*/}
        {/*</div>*/}
        <div className="display_flex " style={{justifyContent:"flex-end"}}>
          {/*<Typography weight="600" scale="small" className="text_neutral_700">*/}
          {/*  Detalles de moto*/}
          {/*</Typography>*/}

          <Button onClick={() => {
            dispatch(clearSelectedFilters());
          }} variant="principal" scale="small" className="m_b_xxl">
            {/*<Typography weight="400" className="text_secondary_600" scale="small">*/}
            Limpiar Filtros
            {/*</Typography>*/}
          </Button>
        </div>
        <InputFilters setCurrentPage={setCurrentPage}/>
        <div className=""  style={{paddingBottom:"7.5vh", }}>
          <Button className="w_100_per m_t_xl m_b_xxl" onClick={() => setOpen(false)}
                  icon={<Search />}>Ver <b>{filterVehicles?.length}</b> moto{filterVehicles?.length !== 1 ? "s" : ""}</Button>
        </div>


        {/*<Accordion style={{border:"none"}} elevation={0} defaultExpanded>*/}
        {/*  <AccordionSummary*/}
        {/*    expandIcon={<ExpandMoreIcon />}*/}
        {/*  >*/}
        {/*      <Typography weight="600" scale="small" className="text_neutral_700">*/}
        {/*        Detalles de moto*/}
        {/*      </Typography>*/}
        {/*  </AccordionSummary>*/}
        {/*  <AccordionDetails>*/}
        {/*    <InputFilters setCurrentPage={setCurrentPage}/>*/}
        {/*  </AccordionDetails>*/}
        {/*</Accordion>*/}
        {/*<Button className="w_100_per m_t_xl m_b_xxxl" onClick={() => setOpen(false)}*/}
        {/*        icon={<Search />}>Ver <b>{filterVehicles?.length}</b> moto{filterVehicles?.length !== 1 ? "s" : ""}</Button>*/}
      </Modal>
  );
};



export default FiltersModal;
