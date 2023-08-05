import React, { FC, useCallback, useEffect } from "react";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { Button, Input } from "@ecommerce-ozon/design_system";
import { ReactComponent as Search } from "@ecommerce-ozon/design_system/dist/public/static/icons/search.svg";
import { updateSelectedFilters } from "../../store/actions/vehicles";
import useVehicles from "../../hooks/useVehicles";

interface Props {
  withButton?: boolean;
}

const InputSearchTextFilter: FC<Props> = ({ withButton }) => {
  const { selectedFilters: { searchText } = {} } = useVehicles();
  const [text, setText] = React.useState(searchText);
  const dispatch = useDispatch();

  const updateFilters = (e: any) => {
    dispatch(updateSelectedFilters(e.target.name, e.target.value));
  };

  useEffect(() => {
    setText(searchText ?? "");
  }, [searchText]);

  const debounceUpdateFilters = useCallback(_.debounce(updateFilters, 500), []);

  return (
    <div
      className="display_flex w_100_per"
      style={{
        alignItems: "center",
        gap: 8,
        paddingLeft: 12,
        paddingRight: 12,
      }}
    >
      <Input
        title=""
        type="text"
        name="searchText"
        placeholder="Búsqueda"
        className="flex_1"
        value={text || ""}
        onChange={(e) => {
          setText(e.target.value);
          debounceUpdateFilters(e);
        }}
      />
      {withButton && (
        <Button
          icon={<Search className="" />}
          scale="small"
          style={{ height: 42 }}
          variant="principal"
        >
          {" "}
        </Button>
      )}
    </div>
  );
};

export default InputSearchTextFilter;
