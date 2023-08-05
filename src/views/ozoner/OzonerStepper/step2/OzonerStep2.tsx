/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
import { Grid } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useState } from "react";
import { useFormikContext } from "formik";
import _ from "lodash";
import { Typography, CalendarWeb, Button } from "@ecommerce-ozon/design_system";
import { ReactComponent as Date } from "@ecommerce-ozon/design_system/dist/public/static/icons/date.svg";
import { OzonerStepperFormValues } from "../../Ozoner";
import useValidateStep from "../useValidateStep";
import NextStepButton from "../NextStepButton/NextStepButton";
import BackStepButton from "../BackStepButton/BackStepButton";

export const OzonerStep2 = () => {
  const [hora, setHora] = useState(0);
  const [horas, setHoras] = useState<{ inicio: string; fin: string }[]>([]);

  const { handleChange, values, errors, setFieldValue, submitForm } =
    useFormikContext<OzonerStepperFormValues>();
  const isValid = useValidateStep("step2");

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Formulario ozoner en Ozon";
    //   ReactGA.send({ hitType: "pageview", page: history.location.pathname });
    const h = [];
    for (let i = 10; i < 18; i++) {
      const ini = i > 12 ? i - 12 : i;
      const fin = i + 1 > 12 ? i - 11 : i + 1;
      h.push({
        inicio: `${ini < 10 ? "0" : ""}${ini}:00${i > 12 ? "PM" : "AM"}`,
        fin: `${fin < 10 ? "0" : ""}${fin}:00${i + 1 > 12 ? "PM" : "AM"}`,
      });
    }
    setHora(0);
    setHoras(h);
  }, []);
  return (
    <div className="flex_center_col w_90_per">
      <Typography weight="600" scale="heading3" className="text_center">
        Elige la fecha para tu <span className="text_primary_300">visita</span>
      </Typography>
      <Typography weight="400" scale="small" className="text_center m_t_lg">
        SELECCIONA FECHA Y HORA
      </Typography>
      <Grid
        container
        spacing={3}
        className="m_t_lg"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} sm={12} md={6}>
          <div className="dso_input_cont">
            <div className="dso_input_title">
              <div className="dso_input_img">
                <Date />
              </div>
              <div className="dso_input_text">Fecha</div>
            </div>
            <CalendarWeb
            
              // disableTwoDays
              disableSunday
              disablePast
              disabledWeekends
              name="step2.date"
              value={_.get(values, "step2.date")}
              onChange={(value: any) => setFieldValue("step2.date", value)}
              // MM/dd/yyyy
            />
          </div>
        </Grid>
        {/* <Grid item xs={12} sm={12} md={6}>
          <Input
            className="m_r_xxxl_desktop w_100_per_mobile flex_grow_1"
            title="Selecciona sede"
            type="select"
            icon={<Company />}
            name="step2.campus"
            value={_.get(values, "step2.campus")}
            onChange={handleChange}
            subtitle={_.get(errors, "step2.campus")}
            error={!!_.get(errors, "step2.campus")}
            options={[
              {
                label: "Selecciona sede",
                value: "",
              },
              {
                label: "test",
                value: "test",
              },
            ]}
          />
        </Grid> */}
      </Grid>
      <div className="m_t_lg">
        <Grid container spacing={3}>
          {horas.map((hor: any, index: any) => (
            <Grid item xs={4} sm className="flex_center"  key={uuidv4()}>
              <Button
                variant="selector"
                onClick={() =>
                  setFieldValue("step2.time", `${hor.inicio}-${hor.fin}`)
                }
                className={`${
                  values.step2.time === `${hor.inicio}-${hor.fin}`
                    ? "active"
                    : ""
                }`}
              >
                <div>{hor.inicio}</div>
                <div>a</div>
                <div>{hor.fin}</div>
              </Button>
            </Grid>
          ))}
        </Grid>
      </div>
      <div className="m_t_xl w_300_px_desktop flex_center_col">
        <NextStepButton onClick={submitForm} isValid={isValid} />
        <BackStepButton isValid />
      </div>
    </div>
  );
};
