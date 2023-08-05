import React, { FC } from "react";
import { Typography } from "@ecommerce-ozon/design_system";
import { Cities } from "store/reducers/cityReducer";
import { HubsList } from "./HubsList";
import img12 from "./img12.png";
import img13 from "./img13.png";
import img13M from "./img13M.png";
import forum from "./forum.png";
import forumGmaps from "./forumGmaps.png";
import forumGmapsMb from "./forumGmapsMobile.png";
// import img14 from "./img14.png";
// import img15 from "./img15.png";

import guadalajaraMap from "./ozon-mapa-Guadalajara.png";
import guadalajaraMapM from "./ozon-mapa-Guadalajara-mobil.png";
import guadalajaraFachada from "./ozon-guadalajara-fachada.png";

import "./hub.scss";

interface Props {}

export const HubsSection: FC<Props> = () => (
  <div
    className="w_100_per bg_neutral_100 p_y_xl hub"
    style={{ border: "1px solid #EAEAEA" }}
  >
    <div className="w_100_per dso_container ">
      <div className="w_100_per display_none_desktop">
        <Typography scale="heading3" weight="600" className="text_neutral_900">
          Prefieres un{" "}
          <span className="text_primary_300">contacto más directo</span>
        </Typography>

        <Typography scale="small" weight="400" className="text_neutral_900">
          Encuéntranos en ciudad de México en los siguientes puntos de atención.
        </Typography>

        {/* <Button variant="principal" scale="small" icon={<WA/>} className="w_100_per" onClick={() => window.open("https://api.whatsapp.com/send?phone=525574050922&text=Hola%20me%20interesa%20saber%20sobre%20Ozon%20", "_blank", "noopener noreferrer")}>
        COMUNICATE CON UN AGENTE
        </Button> */}
      </div>
      <HubsList
        hubs={[
          {
            title: "Fórum Buenavista",
            img: forum,
            map: forumGmaps,
            mapM: forumGmapsMb,
            desc: "Eje 1 Nte. 259, Buenavista, Cuauhtémoc, 06350 Ciudad de México, CDMX, México",
            url: "https://www.google.com/maps/place/Forum+Buenavista/@19.4496728,-99.1538179,17z/data=[…]8dbc7f643f7:0x1d9b7ca35f8b46c6!8m2!3d19.4496728!4d-99.1516292",
            city: Cities.CDMX,
          },
          {
            title: "Anáhuac",
            img: img12,
            map: img13,
            mapM: img13M,
            desc: "Laguna de Mayran 396, Anáhuac I Secc., Anáhuac I Secc, Miguel Hidalgo, 11320 Ciudad de México, CDMX, México",
            url: "https://goo.gl/maps/yM8sDtMi7MqVyRe59",
            city: Cities.CDMX,
          },
          {
            title: "Campo Polo - GDL",
            img: guadalajaraFachada,
            map: guadalajaraMap,
            mapM: guadalajaraMapM,
            desc: "Av. Adolfo López Mateos Sur 1480, Chapalita, 45040 Guadalajara, Jal",
            url: "https://goo.gl/maps/BAA3mHe9USmJodaQ8",
            city: Cities.GUADALAJARA,
          },
        ]}
      />
    </div>
  </div>
);
