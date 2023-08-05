/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Grid, Stack, Slider } from "@mui/material";

import "./styles.scss";
import { useFormikContext } from "formik";

import _ from "lodash";
import { Input } from "@ecommerce-ozon/design_system";

import { CalculationStepperFormValues } from "../../../../views/creditCalculation/CreditCalculationStepperView";

interface Props {
  icon: React.ReactElement;
  label: any;
  name: string;
  placeholder?: string;
}

const boxStyle = {
  bgcolor: "rgb(233, 234, 236)",
  boxShadow:
    "2px 4px 8px rgba(34, 38, 42, 0.05), 4px 8px 24px rgba(34, 38, 42, 0.1)",
  borderRadius: 2,
};

const cardBody = {
  paddingRight: 10,
  paddingLeft: 10,
};

const footerStyle = {
  backgroundColor: "white",
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 40,
  paddingRight: 40,
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
};

const headerStyle = {
  backgroundColor: "white",
  padding: 10,
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
};

const IncomeCard: React.FC<Props> = ({ icon, label, name, placeholder }) => {
  const {
    handleChange,
    handleBlur,
    values,
    errors,
    getFieldMeta,
    setFieldValue,
  } = useFormikContext<CalculationStepperFormValues>();

  const [value, setValue] = useState<number>(0);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value));
    setFieldValue(name, Number(event.target.value));
  };

  const handleSliderChangeCommitted = () => {
    setFieldValue(name, value);
  };

  const min = 0;
  const max = 100000;
  const step = 1;

  const BoxShadow =
    "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";

  return (
    <Box sx={boxStyle}>
      <>
        <div style={headerStyle} className="shadow_hard_inv">
          <Grid container>
            <Grid item xs={12}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                {icon}
              </div>
              {label}
            </Grid>
          </Grid>
        </div>
        <div style={cardBody}>
          {/*<TextField*/}
          {/*  fullWidth*/}
          {/*  label={label}*/}
          {/*  value={value}*/}
          {/*  onChange={handleInputChange}*/}
          {/*  type="number"*/}
          {/*  inputProps={{ min, max, step }}*/}
          {/*/>*/}
          <Input
            type="number"
            style={{ textAlign: "center" }}
            title=""
            placeholder={placeholder || ""}
            name={name}
            onChange={handleInputChange}
            // onChange={handleChange}
            // onBlur={handleBlur}
            // value={ _.get(values, name) === 0 ? "" : _.get(values, name)}
            value={value === 0 ? "" : value}
            error={!!_.get(errors, name) && getFieldMeta(name).touched}
            subtitle={
              getFieldMeta(name).touched
                ? (_.get(errors, name) as string)
                : undefined
            }
          />
        </div>
        <div style={footerStyle} className="shadow_hard_inv">
          {/*<Slider*/}
          {/*  value={_.get(values, name)}*/}
          {/*  onChange={handleChange}*/}
          {/*  name={name}*/}
          {/*  step={1}*/}
          {/*  min={0}*/}
          {/*  max={100000}*/}
          {/*  valueLabelDisplay="on"*/}
          {/*/>*/}
          <Slider
            valueLabelDisplay="auto"
            value={value}
            onChange={handleSliderChange}
            onChangeCommitted={handleSliderChangeCommitted}
            aria-labelledby={`${name}-slider`}
            min={min}
            max={max}
            step={step}
            sx={{
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

              "& .MuiSlider-track": {
                border: "none",
                height: 8,
              },
              "& .MuiSlider-rail": {
                opacity: 0.5,
                height: 8,
                backgroundColor: "white",
                border: "1px solid #C7CCD1",
                borderRadius: 8,
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
            }}
          />
        </div>
      </>
    </Box>
  );
};

export default IncomeCard;
