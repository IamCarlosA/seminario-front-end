/* eslint-disable no-unused-vars */

import React, {useEffect, useMemo, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Slider from "@material-ui/core/Slider";
import {Typography} from "@ecommerce-ozon/design_system";
import {useDispatch} from "react-redux";
import {updateSelectedFilters} from "../../store/actions/vehicles";
import {SelectedFilters} from "../../store/reducers/vehiclesReducer";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

type PriceBoxProps = {
  label: string;
  value: string;
  isCurrencyFormat?: boolean

}

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const BoxShadow =
  "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";

export const RangeSliderStyled = styled(Slider)(({theme}) => ({
  color: "rgb(248,157,62) !important",
  height: "10",
  padding: "15px 0",
  "& .MuiSlider-thumb": {
    height: 18,
    width: 18,
    backgroundColor: "rgb(245,118,10) ",
    boxShadow: BoxShadow,
    "&:focus, &:hover, &.Mui-active": {
      boxShadow:
        "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        boxShadow: BoxShadow,
      },
    },
  },
  "& .MuiSlider-valueLabel": {
    fontSize: 6,
    fontWeight: "normal",
    top: 1,
    backgroundColor: "unset",
    color: theme.palette.text.primary,
    "&:before": {
      display: "none",
    },
    "& *": {
      background: "transparent",
      color: "#C7CCD1",
    },
  },
  "& .MuiSlider-track": {
    border: "none",
    height: 8
  },
  "& .MuiSlider-rail": {
    opacity: 0.5,
    height: 8,
    backgroundColor: "white",
    border: "1px solid #C7CCD1",
    borderRadius: 8

  },
  "& .MuiSlider-markLabel": {
    marginTop: 7,
    "&.MuiSlider-markLabelActive": {
      opacity: 1,
      color: "rgba(245,118,10,0.9)",
    },
  },
  "& .MuiSlider-mark": {
    backgroundColor: "#bfbfbf",
    height: 8,
    width: 2,
    marginTop: 12,
    "&.MuiSlider-markActive": {
      opacity: 1,
      backgroundColor: "rgb(245,118,10)",
    },
  },
}));

const PriceBox: React.FC<PriceBoxProps> = ({label, value,isCurrencyFormat=false}) => {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent:"center",
      alignItems:"center"
    }}>
      <Typography className=" m_b_xxs" scale="medium" weight="400">
        {label}
      </Typography>
      <Box component="span" sx={{
        paddingX: 2,
        paddingY: 1,
        border: "1px solid #C7CCD1",
        borderRadius: 1,
        backgroundColor: "white",
        color: "#C7CCD1"
      }}>
        <Typography scale="medium" weight="400">
          {
            isCurrencyFormat ? currencyFormatter.format(Number(value)) : value.toString()
          }
        </Typography>
      </Box>
    </div>

  );
};

export interface IMark {
  value: number;
  label: string;
}

type OzonRangeSliderProps = {
  fromLabel: string;
  toLabel: string;
  filterName: keyof SelectedFilters;
  rangeValue: number[];
  setRangeValue: any;
  minValue:number,
  maxValue:number,
  marks: IMark[]
  isCurrencyFormat?: boolean;
}

const OzonFilterRangeSlider: React.FC<OzonRangeSliderProps> = ({
                                                                 fromLabel,
                                                                 toLabel,
                                                                 filterName,
                                                                 rangeValue,
                                                                 setRangeValue,
                                                                 minValue,
                                                                 maxValue,
                                                                 marks,
                                                                 isCurrencyFormat=false
                                                               }) => {

  const classes = useStyles();

  const dispatch = useDispatch();

  const handleChange = (event: any, newValue: number | number[]) => {
    setRangeValue(newValue as number[]);
  };

  const handleChangeCommited = () => {
    dispatch(updateSelectedFilters(filterName, rangeValue));
  };


  const splittedValue = rangeValue.toString().split(",");


  return (
    <div className={classes.root}>

      <div className="m_t_xs p_b_md p_x_md p_t_lg"
           style={{display: "flex",
             justifyContent: "space-between",
             backgroundColor: "#F4F5F6",
             borderTopLeftRadius:10,
             borderTopRightRadius:10,
      }}>
        <PriceBox label={fromLabel} value={splittedValue[0]} isCurrencyFormat={isCurrencyFormat}/>
        <PriceBox label={toLabel} value={splittedValue[1]} isCurrencyFormat={isCurrencyFormat}/>
      </div>
      <div className=" p_b_md p_x_xl"
        style={{
        backgroundColor: "transparent",
          borderBottomLeftRadius:10,
          borderBottomRightRadius:10,
      }}>
        <RangeSliderStyled
          value={rangeValue}
          onChange={handleChange}
          aria-labelledby="price-range"
          min={minValue}
          marks={marks}
          max={maxValue}
          onChangeCommitted={handleChangeCommited}
        />
      </div>

    </div>
  );
};

export default OzonFilterRangeSlider;
