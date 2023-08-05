import React, { FC } from "react";
import "./styles.scss";
import AlliesList from "components/allies/alliesList/AlliesList";
import { ReactComponent as MUNDIMOTOS } from "static/icons/mundimotos.svg";
import { ReactComponent as MOTUL } from "static/icons/motul.svg";

import Ivoy from "static/icons/ivoy.png";
import { Typography } from "@ecommerce-ozon/design_system";


import Coppel from "static/icons/coppel_logo.png";
import Uber from "static/icons/uber_logo.png";

interface Props {}

const AlliesSection: FC<Props> = () => (
  <section className="allies-section-container m_y_xxxl dso_container">
    <div className="title-container">
      <Typography scale="heading3" weight="600">
        <span>
          Nuestros
          <span className="text_primary_300"> aliados 🤝</span>
        </span>
      </Typography>
    </div>
    <AlliesList
      allies={[
        {
          name: "Mundimotos",
          link: "https://www.mundimotos.com.mx/",
          image: <MUNDIMOTOS />,
          logoOnly: true,
        },
        {
          name: "Motul",
          link: "https://www.motul.com/mx/",
          image: <MOTUL />,
          logoOnly: true,
        },
        {
          name: "Ivoy",
          link: "https://ivoy.mx/",
          image: <img src={Ivoy} alt="Ivoy" />,
          logoOnly: true,
        },
        {
          name: "Coppel",
          link: "https://www.coppel.com/",
          image: <img src={Coppel} alt="Coppel" />,
          logoOnly: true,
        },
        {
          name: "Uber",
          link: "https://uber.ozon.mobi/",
          image: <img src={Uber} alt="Uber" />,
          logoOnly: true,
        },
      ]}
    />
  </section>
);

export default AlliesSection;
