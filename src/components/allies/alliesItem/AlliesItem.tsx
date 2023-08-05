import React, { FC, useCallback } from "react";
import { Typography } from "@ecommerce-ozon/design_system";
import { Ally } from "components/allies/Ally";
import "./styles.scss";

interface Props {
  ally: Ally;
}

const AlliesItem: FC<Props> = ({ ally }) => {
  const onClick = useCallback(() => {
    if (ally.link) {
      window.open(ally.link, "_blank", "noopener noreferrer");
    }
  }, [ally.link]);

  return (
    <div
      className={`allies-item-container dso_card p_sm m_r_xl ${
        ally.link ? "has-link" : ""
      } ${ally.logoOnly ? "full-logo" : ""}`}
      onClick={onClick}
    >
      {ally.image}
      {!ally.logoOnly && (
        <Typography weight="400" scale="small">
          <span className="m_l_sm">{ally.name}</span>
        </Typography>
      )}
    </div>
  );
};

export default AlliesItem;
