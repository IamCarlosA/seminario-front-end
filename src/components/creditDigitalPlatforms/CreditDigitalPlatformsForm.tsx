import React, { useCallback } from "react";
import { Form, useFormikContext } from "formik";
import { Typography, SelectorGroup, Button, Input } from "@ecommerce-ozon/design_system";
import { ReactComponent as Money } from "@ecommerce-ozon/design_system/dist/public/static/icons/money.svg";
import { ReactComponent as Uber } from "@ecommerce-ozon/design_system/dist/public/static/icons/UBER.svg";
import { ReactComponent as Rappi } from "@ecommerce-ozon/design_system/dist/public/static/icons/Rppi.svg";
import { ReactComponent as Didi } from "@ecommerce-ozon/design_system/dist/public/static/icons/DIDI.svg";
import { ReactComponent as Jkr } from "@ecommerce-ozon/design_system/dist/public/static/icons/JKR.svg";
import { ReactComponent as Mensajeros } from "@ecommerce-ozon/design_system/dist/public/static/icons/mensajeros.svg";
import { ReactComponent as Meli } from "@ecommerce-ozon/design_system/dist/public/static/icons/mercadolibre.svg";
import { ReactComponent as Ivoy } from "@ecommerce-ozon/design_system/dist/public/static/icons/ivoy.svg";
import { ReactComponent as Zubale } from "@ecommerce-ozon/design_system/dist/public/static/icons/zubale.svg";
import { ReactComponent as Motorcycle } from "@ecommerce-ozon/design_system/dist/public/static/icons/motorcycle.svg";
import logo from "../../static/images/creditDigitalPlatforms/logo.png";

import { DigitalPlatformsFormValues } from "./CreditDigitalPlatforms";
import "./styles.scss";

const CreditDigitalPlatformsForm: React.FC = () => {
  const { values, handleChange, setFieldValue, isValid } =
    useFormikContext<DigitalPlatformsFormValues>();
  const onCheckboxChange = useCallback(
    (e) => {
      // eslint-disable-next-line default-case
      switch (e.target.value) {
        case "1":
          setFieldValue("authDataTreatment", e.target.checked);
          break;
      }
    },
    [setFieldValue]
  );

  const onPlatformsChange = useCallback(
    (platforms) => {
      setFieldValue("platforms", platforms);
    },
    [setFieldValue]
  );

  return (
    <Form
      className="credit-digital-platforms bg_neutral_0  dso_card p_xl"
      style={{ background: "F7F7F7" }}
    >
      <div className="dso_card display_flex flex_align_center p_y_xxl flex_col">
        <Typography scale="heading3" weight="600">
          <span>
            ¡En Ozon te damos la{" "}
            <span className="text_primary_300">moto de tus sueños </span>!
          </span>
        </Typography>

        <div className="logo-container p_y_lg">
          <img alt="" src={logo} />
        </div>

        <Typography
          className="p_b_lg text_center subtitle"
          scale="heading4"
          weight="600"
        >
          <span>
            En Ozon financiamos tu moto con cómodos pagos semanales por 1 año
          </span>
        </Typography>

        <div className="inputs-container">
          <div className="p_b_md">
            <Input
              title="¿Trabajas en plataformas digitales?"
              name="workInDigitalPlatforms"
              type="slider"
              titleClassName="text_primary_300"
              inputClassName="center_x"
              icon={<Motorcycle />}
              labels
              className=""
              value={values.workInDigitalPlatforms}
              onChange={handleChange}
            />
          </div>

          {values.workInDigitalPlatforms && (
            <>
              <Typography
                className="text_center p_b_lg"
                scale="small"
                weight="600"
              >
                <span className="text_neutral_700">
                  Selecciona las plataformas en las que trabajas
                </span>
              </Typography>

              <SelectorGroup
                value={values.platforms}
                buttonClassName="m_y_xs"
                options={[
                  { id: 1, icon: <Uber />, text: "Uber" },
                  { id: 2, icon: <Rappi />, text: "Rappi" },
                  { id: 3, icon: <Didi />, text: "Didi" },
                  { id: 4, icon: <Didi />, text: "Didi driver" },
                  { id: 5, icon: <Jkr />, text: "Jokr" },
                  { id: 6, icon: <Mensajeros />, text: "Mensajeros urbanos" },
                  { id: 7, icon: <Meli />, text: "Mercado Libre" },
                  { id: 8, icon: <Ivoy />, text: "Ivoy" },
                  { id: 9, icon: <Zubale />, text: "Zubale" },
                ]}
                onChange={onPlatformsChange}
              />
            </>
          )}

          <Input
            name="extra"
            onChange={onCheckboxChange}
            className="border_neutral_700"
            title=""
            options={[
              {
                label: "Autorizo el tratamiento de mis datos",
                value: 1,
              },
            ]}
            type="checkbox"
          />
        </div>

        <Button
          className="submit"
          type="submit"
          disabled={!isValid}
          icon={<Money />}
          scale="small"
        >
          SOLICITA TU FINANCIACIÓN
        </Button>
      </div>
    </Form>
  );
};
export default CreditDigitalPlatformsForm;
