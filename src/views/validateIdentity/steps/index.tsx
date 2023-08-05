/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import _ from "lodash";
import { useFormikContext } from "formik";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import moment from "moment";
import {Button, Input, OzonSelect, Typography} from "@ecommerce-ozon/design_system";

import { ReactComponent as Pencil } from "@ecommerce-ozon/design_system/dist/public/static/icons/pencil.svg";
import { ReactComponent as Phone } from "@ecommerce-ozon/design_system/dist/public/static/icons/phone.svg";
import { ReactComponent as Moto } from "@ecommerce-ozon/design_system/dist/public/static/icons/motorcycle.svg";
import { ReactComponent as Home } from "@ecommerce-ozon/design_system/dist/public/static/icons/home.svg";
import { ReactComponent as Boy } from "@ecommerce-ozon/design_system/dist/public/static/icons/boy.svg";
import { ReactComponent as Invoice } from "@ecommerce-ozon/design_system/dist/public/static/icons/invoice.svg";
import { ReactComponent as People } from "@ecommerce-ozon/design_system/dist/public/static/icons/people.svg";

import { ReactComponent as UserCard2 } from "@ecommerce-ozon/design_system/dist/public/static/icons/user-card-2.svg";
import { ReactComponent as CreditCard2 } from "@ecommerce-ozon/design_system/dist/public/static/icons/credit-card-2.svg";
import { ReactComponent as Scanner } from "@ecommerce-ozon/design_system/dist/public/static/icons/scanner-profile.svg";
import {FormControl} from "@mui/material";
import IncomeCard from "../../../components/creditCalculationStepper/incomeStep/incomeCard/IncomeCard";
import FamilyCard from "../../../components/creditCalculationStepper/dependantsStep/familyCard/FamilyCard";

import UploadInput, {
  OnUploadInputChangeProps,
} from "../uploadInput/UploadInput";
import ineF from "../../../static/images/validateIdentity/ineF.png";
import ineB from "../../../static/images/validateIdentity/ineB.png";
import selfie from "../../../static/images/validateIdentity/selfie.png";
import {FinancialFormFieldsEnum} from "../../../enums/financialFormFields.enum";
import CustomInputTitle from "../../../components/customInputTitle/CustomInputTitle";

type StepProps = {
  error?: boolean;
};

const tooltipData = [
  {
    title: "¿Cómo tomar una foto a tu INE?",
    step1: "De frente sin Flash",
    step2: "No deberá tener reflejos o sombras que impidan su legibilidad.",
    image: ineF,
  },
  {
    title: "¿Cómo tomar una foto a tu INE?",
    step1: "De atras sin Flash",
    step2: "No deberá tener reflejos o sombras que impidan su legibilidad.",
    image: ineB,
  },
  {
    title: "¿Como tomarte Selfie?",
    step1: "Rostro Centrado",
    step2: "De frente mirando a la camara.",
    image: selfie,
  },
];

const relationOptions = [
  { label: "Familiar", value: "Familiar" },
  { label: "Pareja", value: "Pareja" },
  { label: "Amigo/a", value: "Amigo/a" },
  { label: "Compañero de trabajo", value: "Compañero de trabajo" },
  { label: "Otro", value: "Otro" },
];
const documentTooltip = (id: number) => (
  <div className="display_flex flex_gap_xxs">
    <div className="p_y_md p_l_lg">
      <Typography weight="600" scale="medium" className=" text_center m_b_md">
        {tooltipData[id].title}
      </Typography>
      <Typography
        weight="600"
        scale="xxsmall"
        className="m_b_sm"
        textColor="neutral_900"
      >
        <Typography
          weight="600"
          scale="xxsmall"
          textColor="primary_300"
          component="span"
        >
          {"1. "}
        </Typography>
        {tooltipData[id].step1}
      </Typography>
      <Typography
        weight="600"
        scale="xxsmall"
        className=""
        textColor="neutral_900"
      >
        <Typography
          weight="600"
          scale="xxsmall"
          textColor="primary_300"
          component="span"
        >
          {"2. "}
        </Typography>
        {tooltipData[id].step2}
      </Typography>
    </div>
    <img src={tooltipData[id].image} className="h_100_per" alt="" />
  </div>
);

export const StepOneA: React.FC<StepProps> = () => {
  const {
    values,
    setFieldValue,
    handleChange,
    errors,
    handleBlur,
    getFieldMeta,
  } = useFormikContext<any>();
  const onInputChange = ({
    name,
    imageFile,
    imageData,
  }: OnUploadInputChangeProps) => {
    setFieldValue(
      name,
      imageFile && imageData ? { imageFile, imageData } : null
    );
  };

  useEffect(() => {}, [values]);

  return (
    <div className="animate__animated animate__fadeIn p_x_lg p_y_xl">
      <Grid container>
        <Grid item md={6} xs={12} className="p_x_xxxl_desktop p_x_md_mobile p_y_md_mobile">
          <UploadInput
            onChange={onInputChange}
            value={values.step1.ine_front}
            name="step1.ine_front"
            tooltip={documentTooltip(0)}
            error={(_.get(errors, "step1.ine_front") as string) ?? undefined}
            title="Sube la foto de tu INE por la "
            titleFocus="parte frontal"
            placeholderIcon={<UserCard2 className="dim_xl" />}
            accept="image/jpeg,image/png"
          />
        </Grid>
        <Grid item md={6} xs={12} className="p_x_xxxl_desktop p_x_md_mobile ">
          <UploadInput
            onChange={onInputChange}
            value={values.step1.ine_back}
            name="step1.ine_back"
            tooltip={documentTooltip(1)}
            error={(_.get(errors, "step1.ine_back") as string) ?? undefined}
            title="Sube la foto de tu INE por la "
            titleFocus="parte posterior"
            placeholderIcon={<UserCard2 className="dim_xl" />}
            accept="image/jpeg,image/png"
          />
        </Grid>
      </Grid>
    </div>
  );
};
export const StepOneB: React.FC<StepProps> = () => {
  const {
    values,
    setFieldValue,
    handleChange,
    errors,
    handleBlur,
    getFieldMeta,
  } = useFormikContext<any>();
  const onInputChange = ({
    name,
    imageFile,
    imageData,
  }: OnUploadInputChangeProps) => {
    setFieldValue(
      name,
      imageFile && imageData ? { imageFile, imageData } : null
    );
  };

  useEffect(() => {}, [values]);

  return (
    <div className="animate__animated animate__fadeIn p_x_lg p_y_xl">
      <Grid container justifyContent="center">
        <Grid item md={6} xs={12} className="p_x_xxxl_desktop p_x_md_mobile">
          <UploadInput
            onChange={onInputChange}
            value={values.step1B.selfie}
            name="step1B.selfie"
            tooltip={documentTooltip(2)}
            error={(_.get(errors, "step1B.selfie") as string) ?? undefined}
            title="¡Genial! ahora "
            titleFocus="tómate una selfie"
            placeholderIcon={<Boy className="dim_xl" />}
            accept="image/jpeg,image/png"
          />
        </Grid>
      </Grid>
    </div>
  );
};
export const StepTwoA: React.FC<StepProps> = () => {
  const {
    values,
    setFieldValue,
    handleChange,
    errors,
    handleBlur,
    getFieldMeta,
  } = useFormikContext<any>();
  const onInputChange = ({
    name,
    imageFile,
    imageData,
  }: OnUploadInputChangeProps) => {
    setFieldValue(
      name,
      imageFile && imageData ? { imageFile, imageData } : null
    );
  };

  useEffect(() => {
    // console.log(values);
  }, [values]);

  return (
    <div className="animate__animated animate__fadeIn p_y_xl">
      <Typography
        weight="400"
        scale="small"
        className="w_60_per text_center center_x m_b_lg"
      >
        {"Sube los certificados de cuenta "}
        <Typography weight="600" scale="small" className="" component="span">
          {"de los últimos 3 meses "}
        </Typography>
        (En formato PDF)
      </Typography>
      <Grid container>
        <Grid item md={4} xs={12} className="p_x_lg">
          <UploadInput
            onChange={onInputChange}
            accept="application/pdf"
            value={values.step2.bank_certificate_1}
            name="step2.bank_certificate_1"
            placeholderIcon={<Invoice className="dim_xl" />}
          />
        </Grid>
        <Grid item md={4} xs={12} className="p_x_lg">
          <UploadInput
            onChange={onInputChange}
            accept="application/pdf"
            value={values.step2.bank_certificate_2}
            name="step2.bank_certificate_2"
            placeholderIcon={<Invoice className="dim_xl" />}
          />
        </Grid>
        <Grid item md={4} xs={12} className="p_x_lg">
          <UploadInput
            onChange={onInputChange}
            accept="application/pdf"
            value={values.step2.bank_certificate_3}
            name="step2.bank_certificate_3"
            placeholderIcon={<Invoice className="dim_xl" />}
          />
        </Grid>
      </Grid>
    </div>
  );
};
export const StepTwoB: React.FC<StepProps> = () => {
  const {
    values,
    setFieldValue,
    handleChange,
    errors,
    handleBlur,
    getFieldMeta,
  } = useFormikContext<any>();
  const onInputChange = ({
    name,
    imageFile,
    imageData,
  }: OnUploadInputChangeProps) => {
    setFieldValue(
      name,
      imageFile && imageData ? { imageFile, imageData } : null
    );
  };

  useEffect(() => {}, [values]);

  return (
    <div className="animate__animated animate__fadeIn p_x_lg p_y_xl">
      <Grid container justifyContent="center">
        <Grid item md={6} xs={12} className="p_x_xxxl_desktop p_x_md_mobile">
          <UploadInput
            onChange={onInputChange}
            value={values.step2B.proof_of_address}
            name="step2B.proof_of_address"
            titleFocus="Comprobante de domicilio"
            subTitle="Sube un recibo de agua, luz o gas de menos de 3 meses"
            placeholderIcon={<Home className="dim_xl" />}
          />
        </Grid>
      </Grid>
    </div>
  );
};
export const StepTwoC: React.FC<StepProps> = () => {
  const {
    values,
    setFieldValue,
    handleChange,
    errors,
    handleBlur,
    getFieldMeta,
  } = useFormikContext<any>();
  const onInputChange = ({
    name,
    imageFile,
    imageData,
  }: OnUploadInputChangeProps) => {
    setFieldValue(
      name,
      imageFile && imageData ? { imageFile, imageData } : null
    );
  };

  useEffect(() => {}, [values]);

  return (
    <div className="animate__animated animate__fadeIn p_x_lg p_y_xl">
      <Grid container>
        <Grid item md={6} xs={12} className="p_x_xxxl_desktop p_x_md_mobile p_y_md_mobile">
          <UploadInput
            onChange={onInputChange}
            value={values.step2C.license_front}
            name="step2C.license_front"
            title="Sube la foto de tu licencia de conducir por la "
            titleFocus="parte frontal (opcional)"
            placeholderIcon={<Moto className="dim_xl" />}
            accept="image/jpeg,image/png"
          />
        </Grid>
        <Grid item md={6} xs={12} className="p_x_xxxl_desktop p_x_md_mobile">
          <UploadInput
            onChange={onInputChange}
            value={values.step2C.license_back}
            name="step2C.license_back"
            title="Sube la foto de tu licencia de conducir por la "
            titleFocus="parte posterior (opcional)"
            placeholderIcon={<Moto className="dim_xl" />}
            accept="image/jpeg,image/png"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export const StepTwoD: React.FC<StepProps> = () => {
  const {
    values,
    setFieldValue,
    handleChange,
    errors,
    handleBlur,
    getFieldMeta,
  } = useFormikContext<any>();
  const onInputChange = ({
    name,
    imageFile,
    imageData,
  }: OnUploadInputChangeProps) => {
    setFieldValue(
      name,
      imageFile && imageData ? { imageFile, imageData } : null
    );
  };

  useEffect(() => {}, [values]);

  return (
    <div className="animate__animated animate__fadeIn p_x_lg p_y_xl">
      <Grid container alignItems="center" justifyContent="center">
        <Grid item md={6} xs={12} className="p_x_xxxl_desktop p_x_md_mobile ">
          <UploadInput
            onChange={onInputChange}
            value={values.step2D.tax_situation}
            name="step2D.tax_situation"
            title="Sube constancia de situación fiscal"
            titleFocus=" formato PDF (opcional)"
            placeholderIcon={<Boy className="dim_xl" />}
            accept="application/pdf"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export const StepThree: React.FC<StepProps> = () => {
  const {
    values,
    handleChange,
    errors,
    handleBlur,
    getFieldMeta,
    setFieldValue,
  } = useFormikContext<any>();

  const [showRef1OtherField, setShowRef1OtherField] = useState(false);
  const [showRef2OtherField, setShowRef2OtherField] = useState(false);


  useEffect(() => {
    if(values.step3.personal_reference_1.relation === "Otro"){
      setShowRef1OtherField(true);
    }else{
      setShowRef1OtherField(false);
      setFieldValue("step3.personal_reference_1.other", "");
    }
  }, [values.step3.personal_reference_1.relation,
    values.step3.personal_reference_1.other]);


  useEffect(() => {
    if(values.step3.personal_reference_2.relation === "Otro"){
      setShowRef2OtherField(true);
    }else{
      setShowRef2OtherField(false);
      setFieldValue("step3.personal_reference_2.other", "");
    }
  }, [values.step3.personal_reference_2,
    values.step3.personal_reference_2.other]);


  return (
    <div className="animate__animated animate__fadeIn">
      <Grid container>
        <Grid item md={6} xs={12} className="p_x_xxl">
          <Typography weight="400" scale="small" className="text_center m_b_xl">
            {"Escribe los datos de tu "}
            <Typography
              weight="600"
              scale="small"
              className=""
              component="span"
            >
              referencia personal número 1
            </Typography>
          </Typography>
          <Input
            type="text"
            title="Nombre y apellidos"
            name="step3.personal_reference_1.name"
            icon={<Boy />}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Escribe el nombre aquí"
            value={_.get(values, "step3.personal_reference_1.name")}
            error={
              !!_.get(errors, "step3.personal_reference_1.name") &&
              getFieldMeta("step3.personal_reference_1.name").touched
            }
            subtitle={
              getFieldMeta("step3.personal_reference_1.name").touched
                ? (_.get(errors, "step3.personal_reference_1.name") as string)
                : undefined
            }
          />
          <Input
            type="number"
            title="Celular"
            name="step3.personal_reference_1.phone"
            icon={<Phone />}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Escribe el celular aquí"
            value={_.get(values, "step3.personal_reference_1.phone")}
            error={
              !!_.get(errors, "step3.personal_reference_1.phone") &&
              getFieldMeta("step3.personal_reference_1.phone").touched
            }
            subtitle={
              getFieldMeta("step3.personal_reference_1.phone").touched
                ? (_.get(errors, "step3.personal_reference_1.phone") as string)
                : undefined
            }
          />
          <div>
            <div style={{ marginTop: "-6px" }}>
              <CustomInputTitle
                text="Parentesco"
                subtitle=""
                icon={<People className="custom-input-color" />}
              />
            </div>
            <div style={{ marginTop: 11, marginBottom:11 }}>
              <FormControl sx={{ minWidth: "100%" }} size="small">
                <OzonSelect
                  itemsLabel="Parentesco"
                  fieldName="step3.personal_reference_1.relation"
                  options={relationOptions}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  values={values}
                  getFieldMeta={getFieldMeta}
                  errors={errors}
                />
              </FormControl>
            </div>
          </div>

          {showRef1OtherField && (
            <Input
              onBlur={handleBlur}
              error={
                !!_.get(errors, "step3.personal_reference_1.other") &&
                getFieldMeta("step3.personal_reference_1.other").touched
              }
              subtitle={
                getFieldMeta("step3.personal_reference_1.other").touched
                  ? (_.get(errors, "step3.personal_reference_1.other") as string)
                  : undefined
              }
              name="step3.personal_reference_1.other"
              placeholder="Escribe el parentesco"
              title="Otro"
              icon={<Pencil />}
              type="text"
              className="m_b_xs w_100_per"
              value={_.get(values, "step3.personal_reference_1.other")}
              onChange={handleChange}
            />
          )}

          <Input
            type="text"
            title="CURP (opcional)"
            name="step3.personal_reference_1.curp"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Escribe el CURP aquí"
            icon={<UserCard2 />}
            value={_.get(values, "step3.personal_reference_1.curp")}
            error={
              !!_.get(errors, "step3.personal_reference_1.curp") &&
              getFieldMeta("step3.personal_reference_1.curp").touched
            }
            subtitle={
              getFieldMeta("step3.personal_reference_1.curp").touched
                ? (_.get(errors, "step3.personal_reference_1.curp") as string)
                : undefined
            }
          />
        </Grid>
        <Grid item md={6} xs={12} className="p_x_xxl">
          <Typography weight="400" scale="small" className="text_center m_b_xl">
            {"Escribe los datos de tu "}
            <Typography
              weight="600"
              scale="small"
              className=""
              component="span"
            >
              referencia personal número 2
            </Typography>
          </Typography>
          <Input
            type="text"
            title="Nombre y apellidos"
            name="step3.personal_reference_2.name"
            icon={<Boy />}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Escribe el nombre aquí"
            value={_.get(values, "step3.personal_reference_2.name")}
            error={
              !!_.get(errors, "step3.personal_reference_2.name") &&
              getFieldMeta("step3.personal_reference_2.name").touched
            }
            subtitle={
              getFieldMeta("step3.personal_reference_2.name").touched
                ? (_.get(errors, "step3.personal_reference_2.name") as string)
                : undefined
            }
          />
          <Input
            type="number"
            title="Celular"
            name="step3.personal_reference_2.phone"
            icon={<Phone />}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Escribe el celular aquí"
            value={_.get(values, "step3.personal_reference_2.phone")}
            error={
              !!_.get(errors, "step3.personal_reference_2.phone") &&
              getFieldMeta("step3.personal_reference_2.phone").touched
            }
            subtitle={
              getFieldMeta("step3.personal_reference_2.phone").touched
                ? (_.get(errors, "step3.personal_reference_2.phone") as string)
                : undefined
            }
          />
          <div>
            <div style={{ marginTop: "-6px" }}>
              <CustomInputTitle
                text="Parentesco"
                subtitle=""
                icon={<People className="custom-input-color" />}
              />
            </div>
            <div style={{ marginTop: 11, marginBottom:11 }}>
              <FormControl sx={{ minWidth: "100%" }} size="small">
                <OzonSelect
                  itemsLabel="Parentesco"
                  fieldName="step3.personal_reference_2.relation"
                  options={relationOptions}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  values={values}
                  getFieldMeta={getFieldMeta}
                  errors={errors}
                />
              </FormControl>
            </div>
          </div>

          {showRef2OtherField && (
            <Input
              onBlur={handleBlur}
              error={
                !!_.get(errors, "step3.personal_reference_2.other") &&
                getFieldMeta("step3.personal_reference_2.other").touched
              }
              subtitle={
                getFieldMeta("step3.personal_reference_2.other").touched
                  ? (_.get(errors, "step3.personal_reference_2.other") as string)
                  : undefined
              }
              name="step3.personal_reference_2.other"
              placeholder="Escribe el parentesco"
              title="Otro"
              icon={<Pencil />}
              type="text"
              className="m_b_xs w_100_per"
              value={_.get(values, "step3.personal_reference_2.other")}
              onChange={handleChange}
            />
          )}

          <Input
            type="text"
            title="CURP (opcional)"
            name="step3.personal_reference_2.curp"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Escribe el CURP aquí"
            icon={<UserCard2 />}
            value={values.step3.personal_reference_2.curp}
            error={
              !!_.get(errors, "step3.personal_reference_2.curp") &&
              getFieldMeta("step3.personal_reference_2.curp").touched
            }
            subtitle={
              getFieldMeta("step3.personal_reference_2.curp").touched
                ? (_.get(errors, "step3.personal_reference_2.curp") as string)
                : undefined
            }
          />
        </Grid>
      </Grid>
    </div>
  );
};

// export const StepTwo: React.FC<StepProps> = () => {

//     const { values, handleChange, errors, handleBlur, getFieldMeta } = useFormikContext<CalculationStepperFormValues>();

//     return (
//         <div className="animate__animated animate__fadeIn">

//             <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
//                 <Grid item sm={6} xs={12}>
//                     <IncomeCard
//                         icon={<Money className="text_primary_300" />}
//                         label="¿Cuales son tus ingresos promedio mensual?"
//                         name="incomeStep.monthlyIncome"
//                     />
//                 </Grid>
//                 <Grid item sm={6} xs={12}>
//                     <IncomeCard
//                         icon={<Money className="text_primary_300" />}
//                         label="¿Cuales son tus gastos promedio mensual?"
//                         name="incomeStep.monthlySpending"
//                     />
//                 </Grid>
//             </Grid>
//         </div>
//     );
// };

// export const StepThree: React.FC<StepProps> = () => {

//     const { values, handleChange, errors, handleBlur, getFieldMeta } = useFormikContext<CalculationStepperFormValues>();
//     return (
//         <div className="animate__animated animate__fadeIn">
//             <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
//                 <Grid item xs={12}>
//                     <div className="title-container  m_b_md">
//                         <Typography scale="large" weight="600">
//                             <span>
//                                 Dependientes
//                             </span>
//                         </Typography>
//                     </div>
//                 </Grid>
//                 <Grid item xs={6}>
//                     <FamilyCard
//                         name="step3.childrenCount"
//                         icon={<Baby className="text_primary_300" />}
//                         label="¿Cuantos hijos tienes?"
//                     />
//                 </Grid>
//                 <Grid item xs={6}>
//                     <FamilyCard
//                         name="step3.dependantsCount"
//                         icon={<Chat className="text_primary_300" />}
//                         label="¿Cuantas personas dependen de ti económicamente?"
//                     />
//                 </Grid>
//             </Grid>
//         </div>
//     );
// };

// export const StepThreeAndHalf: React.FC<StepProps> = () => {

//     const { values, handleChange, errors, handleBlur, getFieldMeta } = useFormikContext<CalculationStepperFormValues>();

//     return (
//         <div className="animate__animated animate__fadeIn">
//             <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
//                 <Grid item sm={6} xs={12}>
//                     <Input
//                         type="text"
//                         title="¿Cuál es tu ocupación?"
//                         name="step3.occupation"
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         placeholder="Escribe tu position aquí"
//                         icon={<Boy className="primary_300" />}
//                         value={_.get(values, "step3.occupation")}
//                         error={
//                             !!_.get(errors, "step3.occupation") &&
//                             getFieldMeta("step3.occupation").touched
//                         }
//                         subtitle={
//                             getFieldMeta("step3.occupation").touched
//                                 ? (_.get(errors, "step3.occupation") as string)
//                                 : undefined
//                         }
//                     />
//                 </Grid>
//                 <Grid item sm={6} xs={12}>
//                     <Input
//                         type="text"
//                         title="¿Cuál es tu cargo?"
//                         name="step3.position"
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         placeholder="Escribe tu position aquí"
//                         icon={<Boy className="primary_300" />}
//                         value={_.get(values, "step3.position")}
//                         error={
//                             !!_.get(errors, "step3.position") &&
//                             getFieldMeta("step3.position").touched
//                         }
//                         subtitle={
//                             getFieldMeta("step3.position").touched
//                                 ? (_.get(errors, "step3.position") as string)
//                                 : undefined
//                         }
//                     />
//                 </Grid>
//             </Grid>
//         </div>
//     );
// };

// export const StepFour: React.FC<StepProps> = () => {

//     const initialAssetsInfo = [
//         { id: 0, text: assetEnum.ninguno, isActive: false, icon: NoneIcon, },
//         { id: 1, text: assetEnum.casa, isActive: false, icon: HomeIcon },
//         { id: 2, text: assetEnum.carro, isActive: false, icon: CarIcon },
//         { id: 3, text: assetEnum.moto, isActive: false, icon: MotoIcon },
//         { id: 4, text: assetEnum.otro, isActive: false, icon: CubeIcon },
//     ];
//     const [assetsInfo, setAssetsInfo] = useState(initialAssetsInfo);
//     const [showOtherAssetInput, setShowOtherAssetInput] = useState<boolean>(false);
//     const getOtherIsActiveValue = assetsInfo.slice(-1)[0].isActive;

//     const { values, handleChange, errors, handleBlur, getFieldMeta, setFieldValue } = useFormikContext<CalculationStepperFormValues>();

//     const currentAssets = assetsInfo.filter(asset => asset.isActive).map(item => item.text);

//     console.log(values);

//     useEffect(() => {
//         if (currentAssets.length > 0) {
//             setFieldValue("step4.assets", currentAssets);
//         }
//     }, [assetsInfo]);

//     return (
//         <div className="animate__animated animate__fadeIn">
//             <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 12, md: 12 }}>
//                 <Grid item sm={12} xs={12}>
//                     <CustomInputTitle text="¿Con qué activo cuentas?" />
//                 </Grid>
//                 <Grid item sm={12} xs={12}>
//                     <div className="m_t_md" style={{ display: "flex", flexWrap: "wrap" }}>
//                         {
//                             assetsInfo.map((item, idx) => (
//                                 <AssetCard
//                                     key={idx}
//                                     item={item}
//                                     assetsInfo={assetsInfo}
//                                     setAssetsInfo={setAssetsInfo}
//                                     showOtherAssetInput={showOtherAssetInput}
//                                     setShowOtherAssetInput={setShowOtherAssetInput}
//                                 />))
//                         }
//                         {
//                             getOtherIsActiveValue && (
//                                 <Grid item sm={6} xs={6} className="m_t_md">
//                                     <Input
//                                         type="text"
//                                         title="¿Con qué OTRO activo cuentas?"
//                                         name="step4.otherAsset"
//                                         onChange={handleChange}
//                                         onBlur={handleBlur}
//                                         placeholder="Cuentanos que otro activo posees"
//                                         icon={<Boy className="primary_300" />}
//                                         value={_.get(values, "step3.otherAsset")}
//                                         error={
//                                             !!_.get(errors, "step4.otherAsset") &&
//                                             getFieldMeta("step4.otherAsset").touched
//                                         }
//                                         subtitle={
//                                             getFieldMeta("step4.otherAsset").touched
//                                                 ? (_.get(errors, "step4.otherAsset") as string)
//                                                 : undefined
//                                         }
//                                     />
//                                 </Grid>
//                             )
//                         }
//                     </div>
//                 </Grid>
//             </Grid>
//         </div>
//     );
// };
