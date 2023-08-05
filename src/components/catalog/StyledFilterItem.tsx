import React, { FC } from "react";
import { Typography } from "@ecommerce-ozon/design_system";
import "./StyledFilterItem.scss";

interface ItemProps {
  active?: boolean;
  icon: React.ReactElement;
  label: string;
}

const StyledFilterItem: FC<ItemProps> = ({ active, icon, label }) => <div
  className={`display_flex flex_col cursor_pointer flex_align_center flex_justify_center text_center styled-filter-item-container ${active ? "active" : ""}`}
  style={{ width: 120, height: 120 }}>
  {icon}
  <Typography weight="600" scale="xsmall">
    {label}
  </Typography>
</div>;

export default StyledFilterItem;
