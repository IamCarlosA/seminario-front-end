/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-param-reassign*/
import React, {FC, useEffect, useMemo, useState} from "react";
import _ from "lodash";
import {useDispatch} from "react-redux";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";


import {ReactComponent as Calendar} from "@ecommerce-ozon/design_system/dist/public/static/icons/date.svg";
import {ReactComponent as Motorcycle} from "@ecommerce-ozon/design_system/dist/public/static/icons/motorcycle.svg";
import {ReactComponent as Speed} from "@ecommerce-ozon/design_system/dist/public/static/icons/speedometer.svg";
import {ReactComponent as Tag} from "@ecommerce-ozon/design_system/dist/public/static/icons/price-tag-rotate.svg";
import {ReactComponent as Color} from "@ecommerce-ozon/design_system/dist/public/static/icons/color.svg";
import {ReactComponent as Price} from "@ecommerce-ozon/design_system/dist/public/static/icons/money.svg";
import {ReactComponent as Credit} from "@ecommerce-ozon/design_system/dist/public/static/icons/balance.svg";

import useVehicles from "../../hooks/useVehicles";
import {updateSelectedFilters} from "../../store/actions/vehicles";
import OzonFilterRangeSlider, {IMark} from "../rangeSlider/OzonFilterRangeSlider";
import CreditTypeButtons from "./creditTypeButtons/CrediTypeButtons";
import {SelectedFilters} from "../../store/reducers/vehiclesReducer";
import FilterSelect from "../filterSelect/FilterSelect";
import CustomAccordion from "../accordion/CustomAcccordion";
import {getColorLabelEs} from "../../helpers/translateColor";

interface Props {
  setCurrentPage: any;
}

const InputFilters: FC<Props> = ({setCurrentPage}) => {

  const [rangeValue, setRangeValue] = useState([0, 2500]);

  const {
    loading,
    data: {vehicles, filters},
    selectedFilters: {year, brand, cylinder, kmTo, color, model} = {}
  } = useVehicles();
  const dispatch = useDispatch();


  const {
    brands = [],
    years = [],
    models = [],
    // eslint-disable-next-line camelcase
    cylinder_Capacities = [],
    colors = [],
    milages = [],
    ranges = rangeValue
  } = filters ?? {};

  const yearOptions = useMemo(() => (vehicles && !loading ? [
    ...years.map(y => ({label: y.toString(), value: y}))
  ] : []), [vehicles, years, loading]);
  const [yearRangeValue, setYearRangeValue] = useState<number[]>([0, 0]);
  useEffect(() => {
    if (!loading) {
      setYearRangeValue([yearOptions[0]?.value, yearOptions[yearOptions.length - 1]?.value]);
    }
  }, [years]);

  const milageOptions = [
    // {label: "Selecciona año", value: ""},
    ..._.range(0, 20500, 500).map(milage => ({label: `${milage}`, value: milage}))];
  const [milageRange, setMilageRange] = useState<number[]>([0, 0]);
  useEffect(() => {
    if (!loading) {
      setMilageRange([milageOptions[0]?.value, milageOptions[milageOptions.length - 1]?.value]);
    }
  }, []);

  const cylinderOptions = useMemo(() => (vehicles && !loading ? [
    // { label: "Selecciona cilindraje", value: "" },
    // eslint-disable-next-line camelcase
    ...cylinder_Capacities.map(c => ({
      label: `${c} CC`,
      value: c
    }))
    // eslint-disable-next-line camelcase
  ] : []), [vehicles, cylinder_Capacities, loading]);

  const brandOptions = useMemo(() => (vehicles && !loading ? [
    // { label: "Selecciona marca", value: "" },
    ...brands.map(b => ({
      label: `${b}`,
      value: b
    }))
  ] : []), [vehicles, loading, brands]);




  const modelOptions = useMemo(() => (vehicles && !loading ? [
    // { label: "Selecciona el modelo", value: "" },
    ...models.map((b: any) => ({
      label: `${b}`,
      value: b
    }))
  ] : []), [vehicles, loading, models]);


  const colorOptions = useMemo(() => (vehicles && !loading ? [
    ...colors.map((c) => {
        return  ({label: c.label, value: c.value});
    }
    )
      // @ts-ignore
  ].sort( (a,b)=>  a.label - b.label || a.label.localeCompare(b.label) )
    : []), [vehicles, loading, colors]);


  const handleSelectChange = (name: string, option: any) => {
    // setSelectedBrandOption(option);
    dispatch(updateSelectedFilters(name as keyof SelectedFilters, option?.value || undefined));
  };

  const resetAll = () => {
    // setSelectedBrandOption(undefined);
  };

  useEffect(() => {
    setCurrentPage(1);

    if (!year && !cylinder && !kmTo && !brand && !color &&!model) {
      resetAll();
    }

  }, [year, cylinder, kmTo, brand, color, model]);

  const priceRangeMarks = [
    {
      value: 0,
      label: "$0",
    },
    {
      value: 800,
      label: "$800",
    },
    {
      value: 1600,
      label: "$1600",
    },
    {
      value: 2500,
      label: "$2500",
    },
  ];

  interface Option {
    value: string | number;
    label: string;
  }



  const setSelectValue = (fieldName: string, fieldValue: string | number | undefined,): Option | null => {

    if (fieldValue) {
      switch(fieldName) {
        case "cylinder": {
          // eslint-disable-next-line no-param-reassign
          return {label: fieldName === "cylinder" ? `${fieldValue} CC` : `${fieldValue}`, value: fieldValue};
        }
        case "color": {
          // eslint-disable-next-line no-param-reassign
          return {label: getColorLabelEs(fieldValue.toString()), value: fieldValue};
        }
        default: {
          //statements;
          return {label: fieldValue.toString(), value: fieldValue};
        }
      }




      // return {label: fieldName === "cylinder" ? `${fieldValue} CC` : `${fieldValue}`, value: fieldValue};
    }
    return null;
  };


  const renderMilageMarks = () => {
    const milageMarks: IMark[] = [
      {
        value: 0,
        label: "0"
      },
      {
        value: milageOptions[milageOptions.length - 1]?.value,
        label: milageOptions[milageOptions.length - 1]?.label,
      }
    ];
    return milageMarks;
  };



  interface IconTypeProps {
    fill: string;
  }


  interface IAcordionItems{
    title:string,
    icon: any;
    children: any
  }

  const acordionOptions: IAcordionItems[] = [
    {
      title: "Marca",
      icon: (props:IconTypeProps) =>  <Tag {...props}  />,
      children: <FilterSelect name="brand"
                              placeholderText="Selecciona la Marca..."
                              value={brand}
                              setSelectValue={setSelectValue("brand", brand)}
                              loading={loading}
                              dropdownOptions={brandOptions}
                              handleSelectChange={(option: any) => handleSelectChange("brand", option)}
      />,
    },
    {
      title: "Modelo",
      icon: (props:IconTypeProps) =>  <Motorcycle {...props}  />,
      children: <FilterSelect name="model"
                              placeholderText="Selecciona el Modelo..."
                              value={model}
                              setSelectValue={setSelectValue("model", model)}
                              loading={loading}
                              dropdownOptions={modelOptions}
                              handleSelectChange={(option: any) => handleSelectChange("model", option)}
      />,
    },
    {
      title: "Cilindraje",
      icon: (props:IconTypeProps) =>  <Motorcycle {...props}  />,
      children: <FilterSelect name="cylinder"
                              placeholderText="Selecciona el Cilindraje..."
                              value={cylinder}
                              setSelectValue={setSelectValue("cylinder", cylinder)}
                              loading={loading}
                              dropdownOptions={cylinderOptions}
                              handleSelectChange={(option: any) => handleSelectChange("cylinder", option)}
      />,
    },
  ];


  const [expandAll, setExpandAll] = useState(false);


  const renderFilters = () => {
    return (
        <CustomAccordion options={acordionOptions} />
    );
  };

  return (
    loading ?
      <div style={{padding:15}}>
        <Stack spacing={1}>
          <Skeleton variant="rounded" width="100%" height={50} />
          <Skeleton variant="rounded" width="100%" height={50} />
          <Skeleton variant="rounded" width="100%" height={50} />
        
        </Stack>
      </div>

      : renderFilters());
};

export default InputFilters;


