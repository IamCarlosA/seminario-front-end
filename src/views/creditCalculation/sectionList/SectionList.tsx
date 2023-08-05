import React, { FC } from "react";
import {useStepper} from "@ecommerce-ozon/design_system";
import "./styles.scss";
import SectionListItem from "./sectionListItem/SectionListItem";

interface Props {
  completed?: boolean;
}

const SectionList: FC<Props> = ({ completed }) => {
  const { currentStep } = useStepper();

  return (
    <div className="section-list-container">
      <SectionListItem
        completed
        number={1}
        separator
        label="Informacion financiera"
      />
      <SectionListItem
        completed={completed || currentStep > 2}
        number={2}
        separator
        label="Informacion personal"
      />
      <SectionListItem
        completed={completed}
        number={3}
        label="Tu vehiculo ideal"
      />
    </div>
  );
};

export default SectionList;
