import React from "react";
import "./styles.scss";
import { useFormikContext } from "formik";
import _ from "lodash";
import { CalculationStepperFormValues } from "views/creditCalculation/CreditCalculationStepperView";
import { Slider } from "@ecommerce-ozon/design_system";

interface Props {
  icon: React.ReactElement;
  label: string;
  name: string;
}

const FamilyCard: React.FC<Props> = ({ icon, label, name }) => {
  const { handleChange, values } =
    useFormikContext<CalculationStepperFormValues>();

  return (
    <div className="family-card-container dso_card bg_neutral_0 m_y_md p_x_xs">
      <div style={{ display: "flex", alignItems:"center" }}>
        <div className="m_r_xs ">{icon}</div>
        <span className="text_small_600 text_neutral_700">{label}</span>
      </div>
      <div className="m_t_xl p_x_md m_b_xs">
        <Slider
          value={_.get(values, name)}
          name={name}
          onChange={handleChange}
          min={0}
          max={5}
          valueLabelDisplay="on"
          marks={[
            { label: "0", value: 0 },
            { label: "1", value: 1 },
            { label: "2", value: 2 },
            {
              label: "3",
              value: 3,
            },
            { label: "4", value: 4 },
            { label: "5+", value: 5 },
          ]}
        />
      </div>
    </div>
  );
};

export default FamilyCard;
