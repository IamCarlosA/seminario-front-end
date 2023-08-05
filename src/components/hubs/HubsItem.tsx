import React, { FC } from "react";
import { Typography, Button } from "@ecommerce-ozon/design_system";
import { ReactComponent as COMPANY } from "@ecommerce-ozon/design_system/dist/public/static/icons/company.svg";
import { ReactComponent as MAP } from "@ecommerce-ozon/design_system/dist/public/static/icons/map.svg";
import { Cities } from "../../store/reducers/cityReducer";

export interface Hub {
  title: string;
  img: any;
  map: any;
  mapM: any;
  desc: string;
  url: string;
  city: string;
}

interface Props {
  hub: Hub;
}

export const HubsItem: FC<Props> = ({ hub }) => {
  const handleMap = () => {
    window.open(hub.url, "_blank");
  };

  return (
    <div
      onClick={handleMap}
      className="dso_card m_y_lg flex_center_col_mobile flex_center_desktop flex_align_center_desktop flex_justify_start_desktop  m_x_xs bg_neutral_0 w_650_px_desktop w_250_px_mobile h_400_px_mobile h_200_px_desktop cursor_pointer"
    >
      <img
        src={hub.img}
        alt="ozon"
        className="m_l_md_desktop m_r_xs_desktop m_y_md_mobile "
      />
      <img
        src={hub.map}
        alt="ozon"
        className="m_x_xs_desktop display_none_mobile"
      />
      <img
        src={hub.mapM}
        alt="ozon"
        className="m_x_xs_desktop display_none_desktop m_y_md_mobile"
      />
      <div className="dim_100_per bg_neutral_0 m_l_xs_desktop m_r_md_desktop p_y_md_desktop pos_relative p_md_mobile">
        <Typography scale="heading4" weight="600">
          <div className="icon_text dso_centrado_v p_xxs text_primary_300">
            <MAP className="dim_lg" />
            <span className="text_primary_300"> {hub.title} </span>
          </div>
        </Typography>
        <Typography
          scale="xsmall"
          weight="400"
          className="text_neutral_900 w_200_px h_40_px "
        >
          {hub.desc}
        </Typography>

        <Button
          scale="small"
          className=" display_none_mobile bg_neutral_700 "
          icon={<COMPANY />}
          style={{position:"absolute", bottom:"10px", right:"1px"}}
          onClick={handleMap}
        >
          {hub.city === Cities.CDMX ? "CDMX" : "GDL"}
        </Button>
        <Button
          scale="small"
          className="pos_absolute display_none_desktop bg_neutral_700 display_flex flex_align_center"
          style={{
            position:"absolute", bottom:"10px", right:"10px"

            // bottom: "13.31px",
            // right: "13.31px",
            // width: "68px",
            // height: "32px",
            // borderRadius: "8px",
            // padding: "8px",
            // fontSize: "10px",
            // display: "flex",
            // alignItems: "center",
          }}
          icon={<COMPANY />}
          onClick={handleMap}
        >
          {hub.city === Cities.CDMX ? "CDMX" : "GDL"}
        </Button>
      </div>
    </div>
  );
};
