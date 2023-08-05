import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles } from "@material-ui/core/styles";
import {Checkbox, Grid} from "@mui/material";
import { Typography } from "@ecommerce-ozon/design_system";


const useStyles = makeStyles({
  root: {
    "&$checked": {
      color: "orange",
    },
  },

  checked: {},
});


type ICustomCheckBox = {
  options: any
  checkboxState: any
  handleCheckboxChange: any
  orientation?: "row" | "column";
}

const CustomCheckBox:React.FC<ICustomCheckBox> = ({options,checkboxState, handleCheckboxChange, orientation="row"}) => {
  const classes = useStyles();
  return (

      <Grid container justifyContent="start">
        {
          options.map((item:any) => (
            <Grid item xs={6} sm={6} md={4} key={item}   >
              <FormControlLabel
                style={{color:"#67737e",fontFamily:"Poppins",}}
                control={
                  <Checkbox checked={checkboxState[`${item}`]}
                            onChange={handleCheckboxChange}
                            name={item}
                            color="primary"
                            className={classes.root}
                            sx={{
                              color: "#67737e",
                              "&.Mui-checked": {
                                color: "#fe8a02",
                              },
                              "&:not($checked) .MuiIconButton-label:after": {
                                backgroundColor: "white",
                              },
                            }}
                  />
                }
                label={
                  <Typography
                    scale="small"
                    weight="600"
                    textColor="neutral_700"
                  >{item}
                  </Typography>}
              />
            </Grid>

          ))
        }
      </Grid>

  );
};

export default CustomCheckBox;
