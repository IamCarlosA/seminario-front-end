import React from "react";
import {Typography} from "@ecommerce-ozon/design_system";
import {ReactComponent as Hamburger} from "@ecommerce-ozon/design_system/dist/public/static/icons/filter-ascending.svg";
import InputSearchTextFilter from "./InputSearchTextFilter";
import FilterByHeader from "./FilterByHeader";
import InputFilters from "./InputFilters";


type NewSideBarProps = {
  open: boolean;
  setCurrentPage: any
}

const NewSideBar: React.FC<NewSideBarProps> = ({open, setCurrentPage}) => {
  return (
    <aside className="sticky display_none_mobile m_x_md">
      <div className="m_t_lg display_flex  flex_col" style={{
        maxHeight: "80vh",
        minHeight: "30vh",
        overflowY: "auto",
        overflowX: "hidden",
        position: "relative",
        // width:"80%"
      }}>
        <div>
          <div className="display_flex flex_align_center text_neutral_700 w_100_per p_x_lg">
            <Hamburger/>
            <Typography className={`m_l_lg ${!open ? "display_none" : ""}`} weight="600"
                        scale="small">Filtros</Typography>
          </div>
          <div style={{borderTop: "1px solid rgb(199,199,199)",
            padding: 5, marginTop: 20, marginRight:20, marginLeft:20}}/>
          <InputSearchTextFilter/>
          {/*<div style={{borderTop: "1px solid rgb(199,199,199)", padding: 5,}}/>*/}
          {/*<FilterByHeader/>*/}
        </div>
        {/*<Typography className="m_b_xs" weight="400" scale="small">Detalles de moto</Typography> */}
        <InputFilters setCurrentPage={setCurrentPage}/>
      </div>
    </aside>
  );
};

export default NewSideBar;
