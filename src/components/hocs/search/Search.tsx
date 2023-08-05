import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Buttom from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
// Icons
import RoomIcon from "@material-ui/icons/Room";
import MotorcycleIcon from "@material-ui/icons/Motorcycle";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSearch } from "models/constants/select.constants";
import { vehicles } from "models/constants/vehicles.constants";
import { RootState } from "store/index";
import { changeSelect, changeCity } from "store/actions/select";

// style
import { useStyles } from "./search.styles";

export const Search = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { country } = useSelector((state: RootState) => state.countryReducer);
  const search = useSelector((state: RootState) => state.selectReducer);
  const [select, setselect] = useState({
    city: search.city,
    type: search.typev,
  });

  useEffect(() => {
    setselect((s) => ({ ...s, city: "Todas" }));
    dispatch(changeCity("Todas"));
  }, [country]);

  const handleSearch = () => {
    dispatch(changeSelect(select.city, select.type));
  };

  const handleChange = (event: any) => {
    setselect({ ...select, [event.target.name]: event.target.value });
  };
  return (
    <div>
      <Paper>
        <Box style={{ padding: "15px" }}>
          <Grid container direction="row" spacing={4}>
            <Grid item xs={12} sm={4}>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Box alignItems="center" display="flex">
                    <Box>
                      <RoomIcon color="primary" />
                    </Box>
                    <Box>
                      <b>Ciudad</b>
                    </Box>
                  </Box>
                </Grid>
                <Grid item>
                  <FormControl variant="outlined" fullWidth size="small">
                    <Select
                      defaultValue="Todas"
                      value={select.city}
                      name="city"
                      onChange={handleChange}
                    >
                      <MenuItem value="Todas">Todas</MenuItem>
                      {country === "CO"
                        ? selectSearch.CO.cities.map((item, i) => (
                            <MenuItem key={i} value={item.name}>
                              {item.name}
                            </MenuItem>
                          ))
                        : selectSearch.MX.cities.map((item, i) => (
                            <MenuItem key={i} value={item.name}>
                              {item.name}
                            </MenuItem>
                          ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Box alignItems="center" display="flex">
                    <Box>
                      <MotorcycleIcon color="primary" />
                    </Box>
                    <Box>
                      <b>Vehículo</b>
                    </Box>
                  </Box>
                </Grid>
                <Grid item>
                  <FormControl variant="outlined" fullWidth size="small">
                    <Select
                      value={select.type}
                      name="type"
                      onChange={handleChange}
                    >
                      <MenuItem value="Todos">Todos</MenuItem>
                      {vehicles.map((item, i) => (
                        <MenuItem key={i} value={item.type}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              item
              xs={12}
              sm={3}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <Buttom
                variant="contained"
                onClick={handleSearch}
                fullWidth
                className={classes.btn}
              >
                <SearchIcon />
              </Buttom>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </div>
  );
};
