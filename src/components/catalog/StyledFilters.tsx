import React, { FC } from "react";
import { Typography } from "@ecommerce-ozon/design_system";
import { ReactComponent as Bag } from "@ecommerce-ozon/design_system/dist/public/static/icons/working-bag-3.svg";
import StyledFilterItem from "./StyledFilterItem";

interface Props {

}


const StyledFilters: FC<Props> = () => <>
  <Typography weight="400" scale="small">Estilo de moto</Typography>
  <div className="display_flex">
    <StyledFilterItem active icon={<Bag width={27} height={27} />} label="Buena para trabajar" />
    <StyledFilterItem icon={<Bag width={27} height={27} />} label="Buena para trabajar" />
  </div>
</>;

export default StyledFilters;
