/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */

import React, { FC, useEffect, useState } from "react";
import _ from "lodash";
import { useFormikContext } from "formik";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import moment from "moment";
import { Input, Typography, OzonSelect } from "@ecommerce-ozon/design_system";

import { FormControl } from "@mui/material";

import { makeStyles } from "@material-ui/core";
import { ReactComponent as Money } from "@ecommerce-ozon/design_system/dist/public/static/icons/money.svg";
import { ReactComponent as Chat } from "@ecommerce-ozon/design_system/dist/public/static/icons/group-chat.svg";
import { ReactComponent as Baby } from "@ecommerce-ozon/design_system/dist/public/static/icons/baby.svg";
import { ReactComponent as Profile } from "@ecommerce-ozon/design_system/dist/public/static/icons/profile.svg";
import { ReactComponent as Curp } from "@ecommerce-ozon/design_system/dist/public/static/icons/user-card-2.svg";
import { ReactComponent as Calendar } from "@ecommerce-ozon/design_system/dist/public/static/icons/calendar.svg";
import { ReactComponent as Groups } from "@ecommerce-ozon/design_system/dist/public/static/icons/groups.svg";
import { ReactComponent as Building } from "@ecommerce-ozon/design_system/dist/public/static/icons/building.svg";
import { ReactComponent as CoupleLove } from "@ecommerce-ozon/design_system/dist/public/static/icons/couple-love.svg";
import { ReactComponent as Boy } from "@ecommerce-ozon/design_system/dist/public/static/icons/boy.svg";
import { ReactComponent as Phone } from "@ecommerce-ozon/design_system/dist/public/static/icons/phone.svg";
import { ReactComponent as Map } from "@ecommerce-ozon/design_system/dist/public/static/icons/map.svg";
import { ReactComponent as Envelop } from "@ecommerce-ozon/design_system/dist/public/static/icons/email.svg";

import ReactGA from "react-ga4";
import { CalculationStepperFormValues } from "../CreditCalculationStepperView";
import IncomeCard from "../../../components/creditCalculationStepper/incomeStep/incomeCard/IncomeCard";
import FamilyCard from "../../../components/creditCalculationStepper/dependantsStep/familyCard/FamilyCard";

import CustomInputTitle from "../../../components/customInputTitle/CustomInputTitle";
import {
  getDayOptions,
  getMonthsNamesOptions,
  getYearOptions,
} from "../../../helpers/dateUtils";
import AssetCard, { assetEnum } from "../../../components/assetCard/assetCard";

import NoneIcon from "../../../static/icons/codeBar.png";
import HomeIcon from "../../../static/icons/houseIcon.png";
import CarIcon from "../../../static/icons/carIcon.svg";
import MotoIcon from "../../../static/icons/motoIcon.png";
import CubeIcon from "../../../static/icons/cubeIcon .png";
import CustomCheckBox from "../../../components/customCheckBox/CustomCheckBox";
import { FinancialFormFieldsEnum } from "../../../enums/financialFormFields.enum";
import ScrollToTop from "../../../components/scrollToTop/ScrollToTop";

type StepProps = {
  subTitle?: string;
};

export const StepOne: React.FC<StepProps> = () => {
  useEffect(() => {
    ReactGA.event("CTA_Financial_final", {
      category: "Financial Form",
      label: "first step of the form is shown",
    });
  }, []);

  const { values, handleChange, errors, handleBlur, getFieldMeta } =
    useFormikContext<CalculationStepperFormValues>();

  return (
    <div className="animate__animated animate__fadeIn">
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item md={6} xs={12}>
            <Input
              type="text"
              title="Nombres"
              name={FinancialFormFieldsEnum.NAME}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Escribe tu nombre aquí"
              icon={<Boy className="primary_300" />}
              value={_.get(values, FinancialFormFieldsEnum.NAME)}
              error={
                !!_.get(errors, FinancialFormFieldsEnum.NAME) &&
                getFieldMeta(FinancialFormFieldsEnum.NAME).touched
              }
              subtitle={
                getFieldMeta(FinancialFormFieldsEnum.NAME).touched
                  ? (_.get(errors, FinancialFormFieldsEnum.NAME) as string)
                  : undefined
              }
            />
          </Grid>
        </Grid>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Input
              type="text"
              title="1er. Apellido"
              name={FinancialFormFieldsEnum.FIRST_LAST_NAME}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Escribe tu apellido paterno"
              icon={<Boy className="primary_300" />}
              value={_.get(values, FinancialFormFieldsEnum.FIRST_LAST_NAME)}
              error={
                !!_.get(errors, FinancialFormFieldsEnum.FIRST_LAST_NAME) &&
                getFieldMeta(FinancialFormFieldsEnum.FIRST_LAST_NAME).touched
              }
              subtitle={
                getFieldMeta(FinancialFormFieldsEnum.FIRST_LAST_NAME).touched
                  ? (_.get(
                      errors,
                      FinancialFormFieldsEnum.FIRST_LAST_NAME
                    ) as string)
                  : undefined
              }
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              type="text"
              title="2do. apellido"
              name={FinancialFormFieldsEnum.SECOND_LAST_NAME}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Escribe tu apellido materno"
              icon={<Boy className="primary_300" />}
              value={_.get(values, FinancialFormFieldsEnum.SECOND_LAST_NAME)}
              error={
                !!_.get(errors, FinancialFormFieldsEnum.SECOND_LAST_NAME) &&
                getFieldMeta(FinancialFormFieldsEnum.SECOND_LAST_NAME).touched
              }
              subtitle={
                getFieldMeta(FinancialFormFieldsEnum.SECOND_LAST_NAME).touched
                  ? (_.get(
                      errors,
                      FinancialFormFieldsEnum.SECOND_LAST_NAME
                    ) as string)
                  : undefined
              }
            />
          </Grid>
        </Grid>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item sm={6} xs={12}>
            <CustomInputTitle
              text="Celular"
              icon={<Phone className="custom-input-color" />}
            />
            <div className="w_100_per display_flex flex_center flex_gap_xs">
              <div className="display_flex flex_center flex_gap_xxs w_30_per bg_neutral_500 p_y_sm_desktop  p_y_xs_mobile br_xxs">
                <img
                  src="https://flagcdn.com/w80/mx.png"
                  alt="mx"
                  width="36"
                  height="20"
                />
                <Typography scale="xsmall" weight="600" className="">
                  +52
                </Typography>
              </div>
              <div className="w_70_per">
                <Input
                  title=""
                  type="number"
                  name={FinancialFormFieldsEnum.PHONE}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="1234567890"
                  value={_.get(values, FinancialFormFieldsEnum.PHONE)}
                  error={
                    !!_.get(errors, FinancialFormFieldsEnum.PHONE) &&
                    getFieldMeta(FinancialFormFieldsEnum.PHONE).touched
                  }
                  subtitle={
                    getFieldMeta(FinancialFormFieldsEnum.PHONE).touched
                      ? (_.get(errors, FinancialFormFieldsEnum.PHONE) as string)
                      : undefined
                  }
                />
              </div>
            </div>
          </Grid>

          <Grid item sm={6} xs={12}>
            <div style={{ marginTop: 10 }}>
              <Input
                type="text"
                title="Dirección"
                name={FinancialFormFieldsEnum.ADDRESS}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Escribe tu dirección"
                icon={<Map className="primary_300" />}
                value={_.get(values, FinancialFormFieldsEnum.ADDRESS)}
                error={
                  !!_.get(errors, FinancialFormFieldsEnum.ADDRESS) &&
                  getFieldMeta(FinancialFormFieldsEnum.ADDRESS).touched
                }
                subtitle={
                  getFieldMeta(FinancialFormFieldsEnum.ADDRESS).touched
                    ? (_.get(errors, FinancialFormFieldsEnum.ADDRESS) as string)
                    : undefined
                }
              />
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export const StepOneAndHalf: React.FC<StepProps> = () => {
  const {
    values,
    handleChange,
    errors,
    handleBlur,
    getFieldMeta,
    setFieldValue,
  } = useFormikContext<CalculationStepperFormValues>();

  const populateInfoFromCurp = (): void => {
    const currentCURP = _.get(values, FinancialFormFieldsEnum.CURP);
    const dateTemp = currentCURP.substring(4, 10);

    moment.locale("es");
    // const age = moment().diff(moment(dateTemp, "YYMMDD"), "years", false);
    const yearOfBirth = moment(dateTemp, "YYMMDD").format("YYYY");
    const monthOfBirth = moment(dateTemp, "YYMMDD").format("MMMM");
    const dayOfBirth = moment(dateTemp, "YYMMDD").format("DD");
    const gender =
      currentCURP.toUpperCase().substring(10, 11) === "H"
        ? "Masculino"
        : "Femenino";

    // setFieldValue(FinancialFormFieldsEnum.AGE, age);
    setFieldValue(FinancialFormFieldsEnum.GENDER, gender);
    setFieldValue(FinancialFormFieldsEnum.YEAR, yearOfBirth);
    setFieldValue(FinancialFormFieldsEnum.DAY, dayOfBirth);
    setFieldValue(FinancialFormFieldsEnum.MONTH, monthOfBirth);
  };

  const genderOptions = [
    { label: "Masculino", value: "Masculino" },
    { label: "Femenino", value: "Femenino" },
  ];

  const onBlurEvent = (event: any) => {
    handleBlur(event);
    if (!_.get(errors, FinancialFormFieldsEnum.CURP)) {
      populateInfoFromCurp();
    }
  };
  const useStyles = makeStyles({
    select: {
      border: "1px solid lightgrey",
      height: "42px",
      borderRadius: 5,
      backgroundColor: "white",
      "&:hover": {
        border: "1px solid darkorange",
        backgroundColor: "white",
      },
      "&:focus": {
        backgroundColor: "yellow",
      },
      "&& .Mui-selected": {
        backgroundColor: "pink",
      },
    },
    listContainer: {
      height: "300px",
    },
    genreListContainer: {
      height: "auto",
    },
    cssOutlinedInput: {
      "&$cssFocused $notchedOutline": {
        borderColor: "orange !important",
      },
    },
    cssFocused: {},
    notchedOutline: {
      borderWidth: "1px",
      borderColor: "green !important",
    },
  });

  const classes = useStyles();

  useEffect(() => {
    const cachedCurp = localStorage.getItem("curpModal");
    if (cachedCurp) {
      populateInfoFromCurp();
    }
  }, []);

  return (
    <div className="animate__animated animate__fadeIn">
      <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item md={6} xs={12}>
          <Input
            type="text"
            title="CURP"
            name={FinancialFormFieldsEnum.CURP}
            icon={<Curp className="custom-input-color" />}
            onChange={handleChange}
            onBlur={(e: any) => onBlurEvent(e)}
            placeholder="Escribe tu curp"
            value={_.get(values, FinancialFormFieldsEnum.CURP)}
            error={
              !!_.get(errors, FinancialFormFieldsEnum.CURP) &&
              getFieldMeta(FinancialFormFieldsEnum.CURP).touched
            }
            subtitle={
              getFieldMeta(FinancialFormFieldsEnum.CURP).touched
                ? (_.get(errors, FinancialFormFieldsEnum.CURP) as string)
                : undefined
            }
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <Input
            type="text"
            title="Correo electrónico"
            name={FinancialFormFieldsEnum.EMAIL}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Escribe tu correo electrónico aquí"
            icon={<Envelop className="primary_300" />}
            value={_.get(values, FinancialFormFieldsEnum.EMAIL)}
            error={
              !!_.get(errors, FinancialFormFieldsEnum.EMAIL) &&
              getFieldMeta(FinancialFormFieldsEnum.EMAIL).touched
            }
            subtitle={
              getFieldMeta(FinancialFormFieldsEnum.EMAIL).touched
                ? (_.get(errors, FinancialFormFieldsEnum.EMAIL) as string)
                : undefined
            }
          />
        </Grid>
      </Grid>

      <Grid container rowSpacing={0} columnSpacing={2}>
        <Grid item xs={12} sm={6}>
          <div style={{ marginTop: "10px" }}>
            <CustomInputTitle
              text="Género"
              subtitle="Se auto completará con tu CURP"
              icon={<Profile className="custom-input-color" />}
            />
          </div>
          <div style={{ marginTop: 15 }}>
            <FormControl sx={{ minWidth: "100%" }} size="small">
              <OzonSelect
                itemsLabel="Género"
                fieldName={FinancialFormFieldsEnum.GENDER}
                options={genderOptions}
                handleBlur={handleBlur}
                handleChange={handleChange}
                values={values}
                getFieldMeta={getFieldMeta}
                errors={errors}
              />
            </FormControl>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <div style={{ marginTop: "10px" }}>
            <CustomInputTitle
              text="Fecha de nacimiento"
              subtitle="Se auto completará con tu CURP"
              icon={<Calendar className="custom-input-color" />}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "row", marginTop: 15 }}>
            <FormControl sx={{ minWidth: "24%" }} size="small">
              <OzonSelect
                itemsLabel="Día"
                fieldName={FinancialFormFieldsEnum.DAY}
                listContainerHeight="300px"
                options={getDayOptions()}
                handleBlur={handleBlur}
                handleChange={handleChange}
                values={values}
                getFieldMeta={getFieldMeta}
                errors={errors}
              />
            </FormControl>

            <FormControl sx={{ minWidth: "28%", marginX: 1 }} size="small">
              <OzonSelect
                itemsLabel="Mes"
                fieldName={FinancialFormFieldsEnum.MONTH}
                listContainerHeight="300px"
                options={getMonthsNamesOptions}
                handleBlur={handleBlur}
                handleChange={handleChange}
                values={values}
                getFieldMeta={getFieldMeta}
                errors={errors}
              />
            </FormControl>

            <FormControl sx={{ minWidth: "30%" }} size="small">
              <OzonSelect
                itemsLabel="Año"
                fieldName={FinancialFormFieldsEnum.YEAR}
                listContainerHeight="300px"
                options={getYearOptions()}
                handleBlur={handleBlur}
                handleChange={handleChange}
                values={values}
                getFieldMeta={getFieldMeta}
                errors={errors}
              />
            </FormControl>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export const StepTwo: React.FC<StepProps> = () => {
  useEffect(() => {
    ReactGA.event("CTA_Financial_final", {
      category: "Financial Form",
      label: "click continue to the second step of the form",
    });
  }, []);
  return (
    <div className="animate__animated animate__fadeIn">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item sm={6} xs={12}>
          <IncomeCard
            icon={<Money className="text_primary_300" />}
            placeholder="Escribe tu ingreso promedio mensual"
            label={
              <Typography scale="medium" weight="400" textColor="neutral_600">
                ¿Cuales son tus{" "}
                <Typography
                  component="span"
                  scale="medium"
                  weight="600"
                  textColor="neutral_800"
                >
                  ingresos promedio mensual?
                </Typography>{" "}
              </Typography>
            }
            name={FinancialFormFieldsEnum.MONTHLY_INCOME}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <IncomeCard
            icon={<Money className="text_primary_300" />}
            placeholder="Escribe tu egreso promedio mensual"
            label={
              <Typography scale="medium" weight="400" textColor="neutral_600">
                ¿Cuales son tus{" "}
                <Typography
                  component="span"
                  scale="medium"
                  weight="600"
                  textColor="neutral_800"
                >
                  gastos promedio mensual?
                </Typography>{" "}
              </Typography>
            }
            name={FinancialFormFieldsEnum.MONTHLY_OUTCOME}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export const StepThree: React.FC<StepProps> = () => {
  useEffect(() => {
    ReactGA.event("CTA_Financial_final", {
      category: "Financial Form",
      label: "click continue to the third step of the form",
    });
  }, []);

  return (
    <div className="animate__animated animate__fadeIn">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <div className="title-container  m_b_md">
            <Typography scale="large" weight="600" textColor="neutral_800">
              Dependientes
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <FamilyCard
            name={FinancialFormFieldsEnum.CHILDREN_COUNT}
            icon={<Baby className="text_primary_300" />}
            label="¿Cuantos hijos tienes?"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <FamilyCard
            name={FinancialFormFieldsEnum.DEPENDANTS_COUNT}
            icon={<Chat className="text_primary_300" />}
            label="¿Cuantas personas dependen de ti económicamente?"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export const StepThreeAndHalf: React.FC<StepProps> = () => {
  const { values, handleChange, errors, handleBlur, getFieldMeta } =
    useFormikContext<CalculationStepperFormValues>();

  const educationOptions = [
    { label: "Primaria", value: "Primaria" },
    { label: "Secundaria", value: "Secundaria" },
    { label: "Preparatoria", value: "Preparatoria" },
    { label: "Tecnicatura", value: "Tecnicatura" },
    { label: "Licenciatura", value: "Licenciatura" },
    { label: "Maestria", value: "Maestria" },
  ];
  return (
    <div className="animate__animated animate__fadeIn">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <div className="title-container  m_b_md">
            <Typography scale="large" weight="600" textColor="neutral_800">
              Empleo
            </Typography>
          </div>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Input
            type="text"
            title="¿Cuál es tu ocupación?"
            name={FinancialFormFieldsEnum.ECONOMIC_ACTIVITY}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Escribe tu ocupación aquí"
            icon={<Groups className="primary_300" />}
            value={_.get(values, FinancialFormFieldsEnum.ECONOMIC_ACTIVITY)}
            error={
              !!_.get(errors, FinancialFormFieldsEnum.ECONOMIC_ACTIVITY) &&
              getFieldMeta(FinancialFormFieldsEnum.ECONOMIC_ACTIVITY).touched
            }
            subtitle={
              getFieldMeta(FinancialFormFieldsEnum.ECONOMIC_ACTIVITY).touched
                ? (_.get(
                    errors,
                    FinancialFormFieldsEnum.ECONOMIC_ACTIVITY
                  ) as string)
                : undefined
            }
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <Input
            type="text"
            title="Nombre de la empresa"
            name={FinancialFormFieldsEnum.COMPANY_NAME}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Escribe el nombre de la empresa"
            icon={<Groups className="primary_300" />}
            value={_.get(values, FinancialFormFieldsEnum.COMPANY_NAME)}
            error={
              !!_.get(errors, FinancialFormFieldsEnum.COMPANY_NAME) &&
              getFieldMeta(FinancialFormFieldsEnum.COMPANY_NAME).touched
            }
            subtitle={
              getFieldMeta(FinancialFormFieldsEnum.COMPANY_NAME).touched
                ? (_.get(
                    errors,
                    FinancialFormFieldsEnum.COMPANY_NAME
                  ) as string)
                : undefined
            }
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <div style={{ marginTop: -7, marginBottom: 25 }}>
            <CustomInputTitle
              text="Nivel de estudios"
              icon={<Building className="custom-input-color" />}
            />
          </div>
          <FormControl sx={{ minWidth: "100%" }} size="small">
            <OzonSelect
              itemsLabel="Nivel de estudios"
              fieldName={FinancialFormFieldsEnum.EDUCATIONAL_LEVEL}
              options={educationOptions}
              handleBlur={handleBlur}
              handleChange={handleChange}
              values={values}
              getFieldMeta={getFieldMeta}
              errors={errors}
            />
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
};

export const StepFour: React.FC<StepProps> = () => {
  useEffect(() => {
    ReactGA.event("CTA_Financial_final", {
      category: "Financial Form",
      label: "click continue to the fourth step of the form",
    });
  }, []);
  const useStyles = makeStyles({
    listContainer: {
      display: "flex",
      flexDirection: "column",
      height: "auto",
    },
  });

  const classes = useStyles();

  const {
    values,
    handleChange,
    errors,
    handleBlur,
    getFieldMeta,
    setFieldValue,
  } = useFormikContext<CalculationStepperFormValues>();

  const civilStatus = [
    { label: "Solter@", value: "Solter@" },
    { label: "Casad@", value: "Casad@" },
    { label: "Union Libre", value: "Union Libre" },
    { label: "Devorciad@", value: "Devorciad@" },
    { label: "Viud@", value: "Viud@" },
  ];
  const livesWith = [
    "Solo (a)",
    "Esposo (a)",
    "Amigos ",
    "Padres ",
    "Pareja estable",
    "Hermanos ",
    "Hijos",
  ];

  const [checkboxState, setCheckboxState] = React.useState<any>({
    "Solo (a)": false,
    "Esposo (a)": false,
    "Amigos ": false,
    "Padres ": false,
    "Hermanos ": false,
    Hijos: false,
    "Pareja estable": false,
  });

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxState({
      ...checkboxState,
      [event.target.name]: event.target.checked,
    });
  };

  useEffect(() => {
    const nextState = Object.keys(checkboxState).filter(
      (key) => checkboxState[key] === true
    );
    setFieldValue(FinancialFormFieldsEnum.LIVES_WITH, nextState);
  }, [checkboxState]);

  return (
    <div className="animate__animated animate__fadeIn">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item sm={6} xs={12}>
          <div style={{ marginBottom: 25 }}>
            <CustomInputTitle
              text="Estado Civil"
              icon={<CoupleLove className="custom-input-color" />}
            />
          </div>
          <FormControl sx={{ marginBottom: 3 }} size="small" fullWidth>
            <OzonSelect
              itemsLabel="Estado Civil"
              fieldName={FinancialFormFieldsEnum.CIVIL_STATUS}
              options={civilStatus}
              handleBlur={handleBlur}
              handleChange={handleChange}
              values={values}
              getFieldMeta={getFieldMeta}
              errors={errors}
            />
          </FormControl>
        </Grid>
        <Grid item sm={12} xs={12}>
          <CustomInputTitle
            text="¿Con quién vives?"
            icon={<Groups className="custom-input-color" />}
          />
        </Grid>
        <Grid item sm={12} xs={12}>
          <CustomCheckBox
            options={livesWith}
            checkboxState={checkboxState}
            handleCheckboxChange={handleCheckboxChange}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export const StepFourAndHalf: React.FC<StepProps> = () => {
  const {
    values,
    handleChange,
    errors,
    handleBlur,
    getFieldMeta,
    setFieldValue,
  } = useFormikContext<CalculationStepperFormValues>();

  const initialAssetsInfo = [
    { id: 0, text: assetEnum.ninguno, isActive: true, icon: NoneIcon },
    { id: 1, text: assetEnum.casa, isActive: false, icon: HomeIcon },
    { id: 2, text: assetEnum.carro, isActive: false, icon: CarIcon },
    { id: 3, text: assetEnum.moto, isActive: false, icon: MotoIcon },
    { id: 4, text: assetEnum.otro, isActive: false, icon: CubeIcon },
  ];
  const [assetsInfo, setAssetsInfo] = useState(initialAssetsInfo);
  const [showOtherAssetInput, setShowOtherAssetInput] =
    useState<boolean>(false);
  const [isNoneSelected, setIsNoneSelected] = useState(true);
  const getOtherIsActiveValue = assetsInfo.slice(-1)[0].isActive;

  const currentAssets = assetsInfo
    .filter((asset) => asset.isActive)
    .map((item) => item.text);
  const findNoneAssets = currentAssets.find(
    (asset) => asset === assetEnum.ninguno
  );

  useEffect(() => {
    if (currentAssets.length > 1 && isNoneSelected) {
      const currentValue = assetsInfo[0];
      const nextState = { ...currentValue, isActive: false };
      const removeNonOpt = assetsInfo.splice(1);
      const newArray = [nextState, ...removeNonOpt];
      setAssetsInfo(newArray);
    }
    if (currentAssets.length <= 0) {
      setAssetsInfo(initialAssetsInfo);
    }
  }, [currentAssets]);

  useEffect(() => {
    if (findNoneAssets) {
      setIsNoneSelected(true);
      setAssetsInfo(initialAssetsInfo);
    } else {
      setIsNoneSelected(false);
    }
  }, [findNoneAssets]);

  useEffect(() => {
    if (findNoneAssets === assetEnum.ninguno) {
      setAssetsInfo(initialAssetsInfo);
    }
  }, []);

  useEffect(() => {
    if (currentAssets.length > 0) {
      setFieldValue(FinancialFormFieldsEnum.ASSETS, currentAssets);
      setFieldValue(FinancialFormFieldsEnum.OTHER_ASSETS, "");
    }
  }, [assetsInfo]);

  return (
    <div className="animate__animated animate__fadeIn">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 12, md: 12 }}>
        <Grid item sm={12} xs={12}>
          <CustomInputTitle
            text="¿Con qué activo cuentas?"
            icon={<Building className="custom-input-color" />}
          />
        </Grid>
        <Grid item sm={12} xs={12}>
          <div className="m_t_md" style={{ display: "flex", flexWrap: "wrap" }}>
            {assetsInfo.map((item, idx) => (
              <AssetCard
                key={idx}
                item={item}
                assetsInfo={assetsInfo}
                setAssetsInfo={setAssetsInfo}
              />
            ))}
            {getOtherIsActiveValue && (
              <Grid item sm={6} xs={6} className="m_t_md">
                <Input
                  type="text"
                  title="¿Con qué OTRO activo cuentas?"
                  name={FinancialFormFieldsEnum.OTHER_ASSETS}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Cuentanos que otro activo posees"
                  icon={<Boy className="primary_300" />}
                  value={_.get(values, FinancialFormFieldsEnum.OTHER_ASSETS)}
                  error={
                    !!_.get(errors, FinancialFormFieldsEnum.OTHER_ASSETS) &&
                    getFieldMeta(FinancialFormFieldsEnum.OTHER_ASSETS).touched
                  }
                  subtitle={
                    getFieldMeta(FinancialFormFieldsEnum.OTHER_ASSETS).touched
                      ? (_.get(
                          errors,
                          FinancialFormFieldsEnum.OTHER_ASSETS
                        ) as string)
                      : undefined
                  }
                />
              </Grid>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

// <Input
//   name=FinancialFormFieldsEnum.LIVES_WITH
//   onChange={handleChange}
//   options={[
//     "Solo (a)",
//     "Esposo (a)",
//     "Amigos ",
//     "Padres ",
//     "Pareja estable",
//     "Hermanos ",
//     "Hijos",
//   ]}
//   icon={<Groups />}
//   title="Con quien vives?"
//   type="checkbox"
// />
