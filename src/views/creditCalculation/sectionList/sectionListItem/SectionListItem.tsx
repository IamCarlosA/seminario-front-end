import React from "react";
import "./styles.scss";

interface Props {
  number: number;
  label: string;
  completed?: boolean;
  separator?: boolean;
}

const SectionListItem: React.FC<Props> = ({
  completed,
  label,
  number,
  separator,
}) => (
  <div className="section-list-item-container">
    <div className="text-container">
      <div
        className={`number-container m_r_xs ${completed ? "completed" : ""}`}
      >
        <span className="text_xsmall_600">{number}</span>
      </div>
      <div className={`label-container ${completed ? "completed" : ""}`}>
        <span className="text_xsmall_600">{label}</span>
      </div>
    </div>
    {separator && (
      <span
        className={`separator m_x_xs text_xsmall_600 ${
          completed ? "completed" : ""
        }`}
      >
        ----------
      </span>
    )}
  </div>
);

export default SectionListItem;
