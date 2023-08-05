import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";

import FormControlLabel from "@material-ui/core/FormControlLabel";

import * as yup from "yup";
import { useFormik } from "formik";

import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import React, { useState } from "react";

// import { useSelector } from "react-redux";
// import { RootState } from "store/index";

// const validationSchema = yup.object({
//     typeVehicle: yup
//         .string()
//         .required('Campo requerido'),
//     sellVehicle: yup
//         .string()
//         .required('Campo requerido'),
//     money: yup
//         .number()
//         .positive()
//         .required('Campo requerido'),
//     file: yup
//         .mixed()
//         .required('Campo requerido'),
//     radiusBox: yup
//         .string()
//         .required('Campo requerido'),
//     deliveryAddress: yup
//         .string(),
//     timeAddress: yup
//         .date(),
//     name: yup
//         .string()
//         .min(3, 'Minimo 3 letras')
//         .max(50, 'Maximo 50 letras')
//         .required('Campo requerido'),
//     cellphone: yup
//         .string()
//         .required('Campo requerido'),
//     address: yup
//         .string()
//         .required('Campo requerido'),
//     email: yup
//         .string()
//         .email()
//         .required('Campo requerido'),
//     city: yup
//         .string()
//         .required('Campo requerido'),
// });

const validationSchema = yup.object({
  name: yup
    .string()
    .min(3, "Minimo 3 letras")
    .max(50, "Maximo 50 letras")
    .required("Campo requerido"),
  mobile_phone: yup.string().required("Campo requerido"),
  address: yup.string().required("Campo requerido"),
  email: yup.string().email().required("Campo requerido"),
  termsAgreed: yup.bool().oneOf([true], "Debe aceptar terminos y condiciones"),
  typeVehicle: yup.string().required("Campo requerido"),
});

export const OffererRegister = () => {
  const [img, setimg] = useState({
    file: null,
    view: "",
  });

  // const { country } = useSelector((state: RootState) => state.countryReducer);

  // const formik = useFormik({
  //     initialValues: {
  //         typeVehicle: '',
  //         sellVehicle: '',
  //         money: '',
  //         files: '',
  //         radiusBox: 'yes',
  //         deliveryAddress: '',
  //         timeAddress: '',
  //         name: '',
  //         cellphone: '',
  //         address: '',
  //         email: '',
  //         city: ''

  //     },
  //     validationSchema: validationSchema,
  //     onSubmit: (values) => {
  //         console.log(values)
  //     },
  // });

  const formik = useFormik({
    initialValues: {
      name: "",
      mobile_phone: "",
      address: "",
      email: "",
      termsAgreed: true,
    },
    validationSchema,
    onSubmit: () => {
      if (img.file) {
        console.log(img.file);
      } else {
        window.alert("falta imagen");
      }
    },
  });

  const handleFile = (e: any) => {
    const file = e.target.files[0];
    setimg({
      file,
      view: URL.createObjectURL(file),
    });
  };
  const { termsAgreed } = formik.values;

  return (
    <Container style={{ marginTop: "2rem" }}>
      <Paper elevation={3}>
        <form onSubmit={formik.handleSubmit}>
          <Grid
            container
            direction="row"
            spacing={3}
            style={{ padding: "2rem" }}
          >
            <Grid item xs={12}>
              <Typography
                color="primary"
                variant="h4"
                gutterBottom
                style={{ fontWeight: 600 }}
              >
                Información general del vehículo
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* <FormControl variant="filled" fullWidth margin='normal' >
                                <InputLabel>¿Qué vehículo quieres dar en alquiler?</InputLabel>
                                <Select
                                    variant="outlined"
                                    name='typeVehicle'
                                    value={formik.values.typeVehicle}
                                    onChange={formik.handleChange}
                                    error={formik.touched.typeVehicle && Boolean(formik.errors.typeVehicle)}

                                >
                                    {
                                        vehicles.map((item, i) => (
                                            <MenuItem key={i} value={item.type}>{item.name}</MenuItem>
                                        ))
                                    }




                                </Select>
                            </FormControl> */}
              {/* <FormControl variant="filled" fullWidth margin='normal' >
                                <InputLabel>¿Qué precio le pondrias si lo tuvieras que vender?</InputLabel>
                                <Select
                                    variant="outlined"
                                    name='sellVehicle'
                                    value={formik.values.sellVehicle}
                                    onChange={formik.handleChange}
                                    error={formik.touched.sellVehicle && Boolean(formik.errors.sellVehicle)}


                                >
                                    {
                                        (country === COUNTRY.CO.iso)
                                            ? PRICESOZOCIO.CO.map((item, i) => (
                                                <MenuItem key={i} value={item}>{item}</MenuItem>
                                            ))
                                            : PRICESOZOCIO.MX.map((item, i) => (
                                                <MenuItem key={i} value={item}>{item}</MenuItem>
                                            ))
                                    }



                                </Select>
                            </FormControl> */}
              {/* <TextField
                                name='money'
                                value={formik.values.money}
                                onChange={formik.handleChange}
                                error={formik.touched.money && Boolean(formik.errors.money)}
                                fullWidth
                                type='number'
                                label="¿Por cuánto quieres alquilar tu vehículo?"
                                margin="normal"
                                required
                                helperText='Te sugerimos alquilar tu vehículo en $ 0.00 mensuales'
                                variant="outlined"
                            /> */}
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {img.view ? (
                <img src={img.view} style={{ height: "20vw" }} alt="" />
              ) : (
                <Button variant="contained" component="label">
                  <CloudUploadIcon
                    style={{
                      color: "#286ee8",
                      width: "150px",
                      height: "150px",
                    }}
                  />
                  <input
                    name="files"
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleFile}
                    hidden
                  />
                </Button>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography
                color="primary"
                variant="h4"
                gutterBottom
                style={{ fontWeight: 600 }}
              >
                ¿Cómo quieres entregar tu vehículo?
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* 
                            <FormControl component="fieldset" style={{ paddingLeft: '2rem' }}>
                                <FormLabel component="legend">Entrega</FormLabel>
                                <RadioGroup name="radiusBox" value={formik.values.radiusBox} onChange={formik.handleChange} >
                                    <FormControlLabel value='yes' control={<Radio color='primary' />} label="Entregarlo directamente en el taller" />
                                    <FormControlLabel value='no' control={<Radio color='primary' />} label="Domicilio gratis (dentro de la Ciudad)" />
                                </RadioGroup>
                            </FormControl> */}
            </Grid>
            {
              // (formik.values.radiusBox === 'no') && <Grid item xs={12} sm={6}>
              //     <TextField
              //         name='deliveryAddress'
              //         value={formik.values.deliveryAddress}
              //         onChange={formik.handleChange}
              //         error={formik.touched.deliveryAddress && Boolean(formik.errors.deliveryAddress)}
              //         helperText={formik.touched.deliveryAddress && formik.errors.deliveryAddress}
              //         fullWidth
              //         label="Dirección"
              //         margin="normal"
              //         required
              //         variant="outlined"
              //     />
              //     <TextField
              //         id="datetime-local"
              //         margin="normal"
              //         name='timeAddress'
              //         value={formik.values.timeAddress}
              //         onChange={formik.handleChange}
              //         error={formik.touched.timeAddress && Boolean(formik.errors.timeAddress)}
              //         helperText={formik.touched.timeAddress && formik.errors.timeAddress}
              //         required
              //         fullWidth
              //         variant="outlined"
              //         label="Fecha / hora"
              //         type="datetime-local"
              //         defaultValue={new Date()}
              //         InputLabelProps={{
              //             shrink: true,
              //         }}
              //     />
              // </Grid>
            }
            <Grid item xs={12}>
              <Typography
                color="primary"
                variant="h4"
                gutterBottom
                style={{ fontWeight: 600 }}
              >
                Información de contacto
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                fullWidth
                label="Nombre"
                margin="normal"
                required
                variant="outlined"
              />
              <TextField
                name="mobile_phone"
                value={formik.values.mobile_phone}
                onChange={formik.handleChange}
                error={
                  formik.touched.mobile_phone &&
                  Boolean(formik.errors.mobile_phone)
                }
                helperText={
                  formik.touched.mobile_phone && formik.errors.mobile_phone
                }
                fullWidth
                label="Número de celular"
                margin="normal"
                required
                variant="outlined"
              />
              <TextField
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
                fullWidth
                label="Dirección"
                margin="normal"
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                fullWidth
                label="Correo"
                margin="normal"
                required
                variant="outlined"
              />
              {/* <FormControl variant="filled" fullWidth margin='normal' >
                                <InputLabel>Ciudad</InputLabel>
                                <Select
                                    variant="outlined"
                                    name='city'
                                    value={formik.values.city}
                                    onChange={formik.handleChange}
                                    error={formik.touched.city && Boolean(formik.errors.city)}

                                >
                                    {
                                        (country === COUNTRY.CO.iso)
                                            ? selectSearch.CO.cities.map((item, i) => (
                                                <MenuItem key={i} value={item.name}>{item.name}</MenuItem>
                                            ))
                                            : selectSearch.MX.cities.map((item, i) => (
                                                <MenuItem key={i} value={item.name}>{item.name}</MenuItem>
                                            ))
                                    }

                                </Select>
                            </FormControl> */}
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={termsAgreed}
                      onChange={formik.handleChange}
                      color="primary"
                      name="termsAgreed"
                    />
                  }
                  label="He leído y acepto las políticas de privacidad y los términos y condiciones de uso"
                />
                {formik.touched.termsAgreed &&
                  Boolean(formik.errors.termsAgreed) && (
                    <FormHelperText style={{ color: "red" }}>
                      {formik.errors.termsAgreed}
                    </FormHelperText>
                  )}
              </FormGroup>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                Finalizar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};
