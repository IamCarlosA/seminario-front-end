/* eslint-disable arrow-body-style */
import { Button, Typography } from "@ecommerce-ozon/design_system";
import React from "react";
import { ReactComponent as Money } from "@ecommerce-ozon/design_system/dist/public/static/icons/money.svg";
import moto from "./motoOzocio.png";

export const SectionsThousandOzocio = () => {
  const scrollTop = () => {
    window.focus();
    window.scrollTo(0, 0);
  };
  return (
    <section className="w_100_per pos_relative p_y_xs bg_neutral_0">
      <div className="dso_container">
        <div className="display_flex_desktop w_100_per display_flex_col_mobile">
          <div className="w_50_per_desktop w_100_per_mobile display_flex_desktop display_flex_col_mobile flex_center_desktop p_md">
            <div className="display_none_desktop">
              <div className="letterTittleMedium">Más de</div>
              <div className="letterTittleLarge text_neutral_1000">2000+</div>
              <div className="letterTittleMedium">Motos Compradas!</div>
            </div>
            <img src={moto} alt="vehiculo" className="w_100_per" />
          </div>
          <div className="w_50_per_desktop w_100_per_mobile p_x_md p_y_xxl">
            <div className="display_none_mobile">
              <div className="letterTittleMedium">Más de</div>
              <div className="letterTittleLarge text_neutral_1000">2000+</div>
              <div className="letterTittleMedium">Motos Compradas!</div>
            </div>

              <Typography scale="large" weight="400">
                No hay mejor lugar para vender tu moto que en OZON, no esperes
                mas !
              </Typography>

            <Button
              variant="principal"
              icon={<Money />}
              className="m_y_xl w_80_per_desktop w_100_per_mobile bg_neutral_1000"
              onClick={scrollTop}
            >
              Quiero vender mi moto
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
