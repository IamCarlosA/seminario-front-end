import React from "react";
import Select from "react-select";


type FilterSelectProps = {
  name: string;
  placeholderText: string;
  value: any;
  setSelectValue: any;
  loading: boolean;
  dropdownOptions: any[];
  handleSelectChange: any;
}

const FilterSelect:React.FC<FilterSelectProps> = ({
                        name,
                        placeholderText,
                        value, setSelectValue, loading, dropdownOptions, handleSelectChange

                      }) => {
  return (
    <Select
      placeholder={placeholderText}
      isClearable
      value={setSelectValue}
      // value={setSelectValue("brand", brand)}
      isSearchable
      isLoading={loading}
      name={name}
      options={dropdownOptions}
      // options={brandOptions}
      onChange={handleSelectChange}
      // onChange={(option) => handleSelectChange("brand", option)}
      theme={(theme) => ({
        ...theme,
        borderRadius: 4,
        colors: {
          ...theme.colors,
          primary25: "#FFD8AB",
          primary: "#FE8A02",
        },
      })}
    />
  );
};

export default FilterSelect;
