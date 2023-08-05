import React, { FC } from "react";
import { v4 as uuidv4 } from "uuid";
import "./styles.scss";
import { Ally } from "components/allies/Ally";
import AlliesItem from "components/allies/alliesItem/AlliesItem";

interface Props {
  allies: Ally[];
}

const AlliesList: FC<Props> = ({ allies }) => (
  <div className="allies-list-container p_y_xl">
    {allies.map((ally) => (
      <AlliesItem key={uuidv4()} ally={ally} />
    ))}
  </div>
);

export default AlliesList;
