import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

export const Delivery = ({ formik, country }: any) => (
  <div>
    {/* recibe los parametros por props */}
    <Grid
      container
      direction="column"
      spacing={3}
      style={{ marginTop: "1rem" }}
    >
      <Grid item>
        <Typography
          color="primary"
          variant="h5"
          gutterBottom
          style={{ fontWeight: 600 }}
        >
          DIRECCIÓN DOMICILIO A ENTREGAR
        </Typography>
        <Typography variant="body1" gutterBottom style={{ fontWeight: 600 }}>
          Deja aquí los datos donde quieres recibir tu vehículo.
        </Typography>
        <TextField
          name="deliveryCity"
          value={formik.values.deliveryCity}
          onChange={formik.handleChange}
          error={
            formik.touched.deliveryCity && Boolean(formik.errors.deliveryCity)
          }
          helperText={formik.touched.deliveryCity && formik.errors.deliveryCity}
          fullWidth
          required
          margin="dense"
          label="Ciudad"
          size="small"
          variant="outlined"
        />
        <TextField
          name="deliveryDistrict"
          value={formik.values.deliveryDistrict}
          onChange={formik.handleChange}
          error={
            formik.touched.deliveryDistrict &&
            Boolean(formik.errors.deliveryDistrict)
          }
          helperText={
            formik.touched.deliveryDistrict && formik.errors.deliveryDistrict
          }
          fullWidth
          label={country === "CO" ? "Barrio" : "Colonia"}
          size="small"
          variant="outlined"
          margin="dense"
          required
        />
        <TextField
          value={formik.values.deliveryAddress}
          onChange={formik.handleChange}
          error={
            formik.touched.deliveryAddress &&
            Boolean(formik.errors.deliveryAddress)
          }
          helperText={
            formik.touched.deliveryAddress && formik.errors.deliveryAddress
          }
          name="deliveryAddress"
          fullWidth
          margin="dense"
          label="Dirección"
          size="small"
          required
          variant="outlined"
        />
        <TextField
          value={formik.values.deliveryNotes}
          onChange={formik.handleChange}
          error={
            formik.touched.deliveryNotes && Boolean(formik.errors.deliveryNotes)
          }
          helperText={
            formik.touched.deliveryNotes && formik.errors.deliveryNotes
          }
          name="deliveryNotes"
          fullWidth
          margin="dense"
          label="Otras instrucciones de envío (Opcional)"
          multiline
          rows={4}
          variant="outlined"
        />
      </Grid>
      <Grid item>
        <Typography variant="body1" gutterBottom style={{ fontWeight: 600 }}>
          ¿En qué horario lo quieres recibir?
        </Typography>
        <FormControl style={{ marginLeft: "3rem" }}>
          <RadioGroup
            value={formik.values.deliveryTime}
            name="deliveryTime"
            onChange={formik.handleChange}
          >
            <FormControlLabel
              value="AM"
              control={<Radio color="primary" />}
              label="En la mañana 8:00 am - 11 am"
            />
            <FormControlLabel
              value="PM"
              control={<Radio color="primary" />}
              label="En la tarde 1:00 pm - 6:00 pm"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  </div>
);
