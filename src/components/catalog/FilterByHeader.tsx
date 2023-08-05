import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { Button, Typography } from "@ecommerce-ozon/design_system";
import { clearSelectedFilters } from "../../store/actions/vehicles";

interface Props {

}

const FilterByHeader: FC<Props> = () => {
  const dispatch = useDispatch();
  return <div className="display_flex flex_align_center text_neutral_700" style={{ justifyContent: "space-between" }}>
    <Typography weight="600" scale="small">Filtrar por</Typography>
    <Button onClick={() => {
      dispatch(clearSelectedFilters());
    }} variant="link" scale="small">
      <Typography weight="400" className="text_secondary_600" scale="small">
        Borrar
      </Typography>
    </Button>
  </div>;
};

export default FilterByHeader;
