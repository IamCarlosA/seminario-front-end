/* eslint-disable no-unused-vars */

import React from "react";
import {FormHelperText, MenuItem, Select} from "@mui/material";
import _ from "lodash";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {makeStyles} from "@material-ui/core";

type ICustomSelect = {
  fieldName:string;
  options: any[];
  values:any;
  handleChange:any;
  handleBlur?:any;
  getFieldMeta?: any;
  errors?: any;
  itemsLabel?:string;
  listContainerHeight?:string;
  isFormikForm?: boolean;
}

const CustomSelect:React.FC<ICustomSelect> = ({
                                                fieldName,
                                                options,
                                                values,
                                                handleChange,
                                                errors,
                                                handleBlur,
                                                getFieldMeta,
                                                itemsLabel,
                                                listContainerHeight,
                                                isFormikForm=true
                                              }) => {


  const useStyles = makeStyles({
    listContainer: {
      height: listContainerHeight || "auto",
    }
  });

  const classes = useStyles();

  const renderSelect = () => {
    return(
      <>
        <Select
          value={(isFormikForm ? _.get(values, fieldName) : values) || ""}
          label={itemsLabel}
          defaultValue=""
          disableUnderline
          variant="standard"
          color="primary"
          name={fieldName}
          displayEmpty
          inputProps={{ "aria-label": "OZON select" }}
          IconComponent={ExpandMoreIcon}
          onChange={handleChange}
          onBlur={handleBlur || (()=>{}) }
          MenuProps={{ classes: { paper: classes.listContainer } }}
          sx={{height:42, color:"#67737E", fontSize:14,}}
          error={
            getFieldMeta &&(
              !!_.get(errors, fieldName) &&
              getFieldMeta(fieldName).touched
            )
          }
        >
          {
            itemsLabel && (
              <MenuItem disabled value="">
                <em>{itemsLabel}</em>
              </MenuItem>
            )
          }

          {
            options.map((opt, idx) => (
              <MenuItem key={`${itemsLabel}-${opt.label }-${idx}`} value={opt.value }>
                {opt.label }
              </MenuItem>
            ))
          }
        </Select>
        {
          getFieldMeta && (
            getFieldMeta(fieldName).touched
              ? (
                <FormHelperText
                  sx={{ color: "#bf3333", marginLeft: "16px !important" }}
                >
                  {(_.get(errors, fieldName) as string)}
                </FormHelperText>
              ) : undefined
          )
        }
      </>
    );
  };

  return renderSelect();

};

export default CustomSelect;
