import React, { FC } from "react";
import "./styles.scss";
import { ReactComponent as Forbes } from "static/images/media/forbes.svg";
import { ReactComponent as Moves } from "static/images/media/moves.svg";
import { ReactComponent as Palenca } from "static/images/media/palenca.svg";
import { ReactComponent as Dinero } from "static/images/media/dinero.svg";
import { Typography } from "@ecommerce-ozon/design_system";
import MediaList from "./mediaList/MediaList";

interface Props {}

interface MediaCompopnentProps {
  logo: React.FC;
}

const MediaComponent: React.FC<MediaCompopnentProps> = ({ logo: Logo }) => (
  <Logo />
);

const ForbesMediaComponent = () => <MediaComponent logo={Forbes} />;
const MovesMediaComponent = () => <MediaComponent logo={Moves} />;
const PalencaMediaComponent = () => <MediaComponent logo={Palenca} />;
const DineroMediaComponent = () => <MediaComponent logo={Dinero} />;

const MediaSection: FC<Props> = () => (
  <section className="media-section-container m_y_xxxl dso_container">
    <div className="title-container">
      <Typography scale="heading3" weight="600">
        <span>
          Medios que <span className="text_primary_300">escriben</span>{" "}
          <span>sobre Ozon 📷</span>
        </span>
      </Typography>
    </div>
    <MediaList
      media={[
        {
          component: ForbesMediaComponent,
          color: "#00000",
          link: "https://forbes.co/2021/12/21/actualidad/ozon-entregara-creditos-a-repartidores-de-plataformas-para-que-compren-sus-propias-motos/",
        },
        {
          component: ForbesMediaComponent,
          color: "#00000",
          link: "https://www.forbes.com.mx/ozon-el-kavak-de-las-motos-acelera-su-negocio-en-mexico/",
        },
        {
          component: DineroMediaComponent,
          color: "#017DB0",
          link: "https://www.dineroenimagen.com/autos/necesitas-una-moto-ozon-mexico-oferta-estos-vehiculos-al-estilo-kavak/142478",
        },
        {
          component: PalencaMediaComponent,
          color: "#2147c0",
          link: "https://www.palenca.com/blog/ozon-revolucionando-el-financiamiento-de-motos/",
        },
        {
          component: MovesMediaComponent,
          color: "#2c9adf",
          link: "https://moves.com.mx/2022/03/25/la-startup-ozon-repunta-en-mexico-con-un-modelo-similar-a-kavak/",
        },
      ]}
    />
  </section>
);

export default MediaSection;
