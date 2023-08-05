import React, { FC, useState } from "react";
import { useHistory } from "react-router-dom";
import { Typography, Button } from "@ecommerce-ozon/design_system";
import { ReactComponent as Motorcycle } from "@ecommerce-ozon/design_system/dist/public/static/icons/motorcycle.svg";
import { ReactComponent as Dollar } from "@ecommerce-ozon/design_system/dist/public/static/icons/money.svg";
import { ModalFormFinanciero } from "components/hocs/modal/ModalFormFinanciero";
import Hero from "../../../hero/Hero";

const HeroSection: FC = () => {
  const [open, setopen] = useState<boolean>(false);
  const history = useHistory();
  const showModal = () => {
    setopen(!open);
  };

  return (
    <section className="display_flex flex_align_center flex_col_mobile dso_container">
      <div className="display_flex flex_col flex_justify_center flex_1 flex_order_2_mobile text_center_mobile m_t_xs_mobile">
        <div className="dso_card_small p_xxl m_r_xxl_desktop">
          <Typography scale="heading1" scaleMobile="heading2" weight="600">
            <span>
              Comienza tu aventura,
              <span className="text_primary_300"> maneja con estilo.</span>
            </span>
          </Typography>
          <Typography className="m_t_md" scale="large" weight="400">
            En Ozon, <b>te financiamos</b> la moto de tus sueños o{" "}
            <br className="display_none_mobile" /> <b>compramos</b> tu moto al
            instante.
          </Typography>
          <div className="display_flex m_t_xl flex_col_mobile">
            <Button
              onClick={() => history.push("/catalogo")}
              className="m_r_md w_100_per w_100_per_mobile m_b_lg_mobile"
              variant="principal"
              scale="small"
              icon={<Motorcycle />}
            >
              Catálogo
            </Button>
            {/* <Button
              onClick={() => history.push("/formulario-vende-tu-moto")}
              className="w_50_per w_100_per_mobile bg_neutral_900"
              variant="principal"
              scale="small"
              icon={<Dollar />}
            >
              Vende tu moto
            </Button> */}
          </div>
        </div>

        <div className="display_flex p_y_md m_r_xxl_desktop flex_col_mobile">
          <div className="flex_1">
            <Typography scale="large" scaleMobile="large" weight="400">
              ¿Ya tienes{" "}
              <span style={{ fontWeight: "bold" }}>tu Pre - aprobado</span>?
            </Typography>
          </div>
          <div className="flex_1 m_t_md_mobile">
            <Button
              onClick={() => showModal()}
              className="w_100_per w_100_per_mobile"
              variant="outline"
              scale="small"
            >
              Continúa con tu solicitud
            </Button>
            <ModalFormFinanciero open={open} setOpen={showModal} />
          </div>
        </div>
      </div>
      <div className="flex_1 w_100_per" style={{ overflow: "hidden" }}>
        <Hero />
      </div>
    </section>
  );
};

export default HeroSection;
