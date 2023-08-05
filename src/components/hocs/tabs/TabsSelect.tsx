import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeForsell } from "store/actions/select";

export const TabsSelect = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    (() =>
      value === 0
        ? dispatch(changeForsell(false))
        : dispatch(changeForsell(true)))();
  }, [value, dispatch]);
  return (
    <div style={{ paddingTop: "2rem" }}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          centered
        >
          <Tab label="Vehículos para alquiler mensual" />
          <Tab label="Comprar Vehículos" />
        </Tabs>
      </AppBar>
    </div>
  );
};
