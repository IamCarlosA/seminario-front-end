/* eslint-disable no-unused-vars */

import React from "react";
import { ReactComponent as Hamburger } from "@ecommerce-ozon/design_system/dist/public/static/icons/filter-ascending.svg";
import { ReactComponent as ChevronLeft } from "@ecommerce-ozon/design_system/dist/public/static/icons/left-md.svg";
import { Typography } from "@ecommerce-ozon/design_system";
import InputFilters from "./InputFilters";
import InputSearchTextFilter from "./InputSearchTextFilter";
import FilterByHeader from "./FilterByHeader";

type SidebarProps = {
  onSidebarExpanded: (value: boolean) => void;
  open: boolean;
  setCurrentPage?: any;
};

const Sidebar: React.FC<SidebarProps> = ({
  onSidebarExpanded,
  open,
  setCurrentPage,
}) => (
  <aside
    className={`sidebar display_none_mobile bg_neutral_0 ${
      open ? "expanded" : ""
    } m_t_xxl`}
  >
    <div className=" display_flex flex_justify_center flex_col flex_align_center ">
      <div className="display_flex flex_align_center text_neutral_700 w_100_per ">
        {/*<Hamburger onClick={() => {*/}
        {/*  onSidebarExpanded(!open);*/}
        {/*}} className="cursor_pointer" />*/}
        <Typography
          className={`m_l_lg ${!open ? "display_none" : ""}m_t_xxl`}
          weight="600"
          scale="small"
        >
          Filtros
        </Typography>
        {/*<div className={`display_flex flex_1 ${!open ? "display_none" : ""}`} style={{ justifyContent: "flex-end" }}>*/}
        {/*  <ChevronLeft onClick={() => {*/}
        {/*    onSidebarExpanded(!open);*/}
        {/*  }} className="cursor_pointer" style={{ justifySelf: "flex-end" }} />*/}
        {/*</div>*/}
      </div>
      <div className="divider m_t_md " />
      <div
        className={`w_100_per p_x_md display_flex flex_col text_neutral_700 ${
          !open ? "display_none" : ""
        }`}
      >
        <InputSearchTextFilter />
        {/*<FilterByHeader />*/}
        {/* <div className="m_t_md"> */}
        {/*  <StyledFilters /> */}
        {/* </div> */}
        <div className="divider m_b_sm " />
        <Typography className="m_b_xs" weight="400" scale="small">
          Detalles de moto
        </Typography>
        <InputFilters setCurrentPage={setCurrentPage} />
      </div>
    </div>
  </aside>
);

export default Sidebar;
