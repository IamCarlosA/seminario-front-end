/* eslint-disable no-underscore-dangle */
import { Grid } from "@material-ui/core";
import React, { FC, useEffect, useState } from "react";
import _ from "lodash";
import { useFormikContext } from "formik";
import { Input, Typography } from "@ecommerce-ozon/design_system";

import { ReactComponent as GPS } from "@ecommerce-ozon/design_system/dist/public/static/icons/gps.svg";
import { ReactComponent as Moto } from "@ecommerce-ozon/design_system/dist/public/static/icons/motorcycle.svg";
import { ReactComponent as Speedometer } from "@ecommerce-ozon/design_system/dist/public/static/icons/speedometer.svg";
import BackStepButton from "../BackStepButton/BackStepButton";
import NextStepButton from "../NextStepButton/NextStepButton";
import { OzocioStepperFormValues } from "../../Ozocio";
import useValidateStep from "../useValidateStep";
import { getSimulatorModelsByBrand } from "../../../../helpers/fecthModels";
import { TSimulatorModelByBrand } from "../../../../models/model.interface";
import { TCylinder } from "../../../../models/cylinder.interface";
import { TBrand } from "../../../../models/brand.interface";

interface Props {
  brands: TBrand[];
}

export const OzocioStep4: FC<Props> = ({ brands }) => {
  const [models, setModels] = useState<TSimulatorModelByBrand[] | []>([]);
  const [cylinder, setCylinders] = useState<TCylinder[] | []>([]);
  const {
    values,
    handleChange,
    errors,
    handleBlur,
    getFieldMeta,
    setFieldValue,
  } = useFormikContext<OzocioStepperFormValues>();
  const isValid = useValidateStep("step4");

  const initModels = async (brand: string) => getSimulatorModelsByBrand(brand);

  useEffect(() => {
    if (values.step4.brand.length > 1 && values.step4.brand !== "other") {
      initModels(values.step4.brand).then((res) => {
        setModels(res);
      });
    }

    setFieldValue("step4.model", "");
    setFieldValue("step4.cylinder", "");
  }, [values.step4.brand]);

  useEffect(() => {
    const result = models.find((data) => values.step4.model === data._id);
    if (result) {
      setCylinders(result.cylinder_capacities);
    }
    setFieldValue("step4.cylinder", "");
  }, [values.step4.model, models]);

  return (
    <div className="flex_center_col w_90_per">
      <Typography weight="600" scale="heading3" className="text_center">
        <span className="text_primary_300">Cuéntanos sobre </span>tu vehículo
      </Typography>
      <Typography weight="400" scale="small" className="text_center m_t_lg">
        ¿Qué referencia es tu vehículo?
      </Typography>
      <Grid
        container
        spacing={3}
        className="m_t_lg"
        justifyContent="center"
        alignItems="flex-end"
      >
        <Grid item xs={12} sm={12} md={values.step4.brand === "other" ? 3 : 4}>
          <Input
            className="m_r_xxxl_desktop w_100_per flex_grow_1"
            title="Marca"
            type="select"
            icon={<GPS />}
            name="step4.brand"
            value={_.get(values, "step4.brand")}
            onBlur={handleBlur}
            onChange={handleChange}
            subtitle={
              getFieldMeta("step4.brand").touched
                ? (_.get(errors, "step4.brand") as string)
                : undefined
            }
            error={
              !!_.get(errors, "step4.brand") &&
              getFieldMeta("step4.brand").touched
            }
            options={[
              {
                label: "Selecciona marca",
                value: "",
              },
            ]
              .concat(
                brands.map((brand) => ({
                  label: brand.name,
                  value: brand.name,
                }))
              )
              .concat([
                {
                  label: "OTRA",
                  value: "other",
                },
              ])}
          />
        </Grid>

        {values.step4.brand !== "other" ? (
          <>
            <Grid item xs={12} sm={12} md={4}>
              <Input
                disabled={!(values.step4.brand.length > 1)}
                className="m_r_xxxl_desktop w_100_per_mobile flex_grow_1"
                title="Modelo"
                type="select"
                icon={<Moto />}
                name="step4.model"
                onBlur={handleBlur}
                value={_.get(values, "step4.model")}
                onChange={handleChange}
                subtitle={
                  getFieldMeta("step4.model").touched
                    ? (_.get(errors, "step4.model") as string)
                    : undefined
                }
                error={
                  !!_.get(errors, "step4.model") &&
                  getFieldMeta("step4.model").touched
                }
                options={[
                  {
                    label: "Selecciona modelo",
                    value: "",
                  },
                ].concat(
                  models.map((model) => ({
                    label: model._id,
                    value: model._id,
                  }))
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <Input
                disabled={
                  !(
                    values.step4.model.length > 0 &&
                    values.step4.brand.length > 0
                  )
                }
                className="m_r_xxxl_desktop w_100_per_mobile flex_grow_1"
                title="Cilindraje"
                type="select"
                icon={<Speedometer />}
                onBlur={handleBlur}
                name="step4.cylinder"
                value={_.get(values, "step4.cylinder")}
                onChange={handleChange}
                subtitle={
                  getFieldMeta("step4.cylinder").touched
                    ? (_.get(errors, "step4.cylinder") as string)
                    : undefined
                }
                error={
                  !!_.get(errors, "step4.cylinder") &&
                  getFieldMeta("step4.cylinder").touched
                }
                options={[
                  {
                    label:
                      cylinder.length > 0
                        ? "Selecciona cilindraje"
                        : "No hay disponible",
                    value: "",
                  },
                ].concat(
                  cylinder.map((cylin) => ({
                    label: cylin.value,
                    value: cylin.value,
                  }))
                )}
              />
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12} sm={12} md={3}>
              <Input
                title="Tu marca"
                icon={<GPS />}
                onBlur={handleBlur}
                name="step4.brandOther"
                subtitle={
                  getFieldMeta("step4.brandOther").touched
                    ? (_.get(errors, "step4.brandOther") as string)
                    : undefined
                }
                type="text"
                error={
                  !!_.get(errors, "step4.brandOther") &&
                  getFieldMeta("step4.brandOther").touched
                }
                placeholder="Escribe tu marca aquí"
                value={_.get(values, "step4.brandOther")}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <Input
                onBlur={handleBlur}
                name="step4.model"
                title="Modelo"
                icon={<Moto />}
                subtitle={
                  getFieldMeta("step4.model").touched
                    ? (_.get(errors, "step4.model") as string)
                    : undefined
                }
                type="text"
                error={
                  !!_.get(errors, "step4.model") &&
                  getFieldMeta("step4.model").touched
                }
                placeholder="Escribe tu modelo aquí"
                value={_.get(values, "step4.model")}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <Input
                onBlur={handleBlur}
                name="step4.cylinder"
                title="Cilindraje"
                icon={<Speedometer />}
                subtitle={
                  getFieldMeta("step4.cylinder").touched
                    ? (_.get(errors, "step4.cylinder") as string)
                    : undefined
                }
                type="text"
                error={
                  !!_.get(errors, "step4.cylinder") &&
                  getFieldMeta("step4.cylinder").touched
                }
                placeholder="Escribe tu marca aquí"
                value={_.get(values, "step4.cylinder")}
                onChange={handleChange}
              />
            </Grid>
          </>
        )}
      </Grid>
      <div className="m_t_xxxl w_300_px_desktop flex_center_col">
        <NextStepButton isValid={isValid} />
        <BackStepButton isValid />
      </div>
    </div>
  );
};
