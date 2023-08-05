import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import "./layout.scss";

// components
import { Navbar } from "components/hocs/navbar/Navbar";
import { Footer } from "components/hocs/footer/Footer";
import CityModal from "../cityModal/CityModal";

type Props = {
  children: JSX.Element;
};

export const Layout = ({ children }: Props) => {
  const location = useLocation();
  const [openCityModal, setOpenCityModal] = useState(false);

  return (
    // const { country } = useSelector((state: RootState) => state.countryReducer);

    // const handleEvent = () => {
    //   return ReactGA.event("CTA_static_WA", {
    //     category: "Support",
    //     label: "click botton whatsapp layout",
    //   });
    // };

    <div className="root">
      <Navbar setOpenCityModal={setOpenCityModal} />
      {!location.pathname.includes("/micuenta/") ? (
        <span className="bordeNav" />
      ) : (
        <span className="m_b_xxxl_desktop m_b_xs_mobile" />
      )}
      <div className="main m_t_md_mobile">
        <div className="layout-container">{children}</div>
        {/* <a
          href={
            country === "CO"
              ? `https://api.whatsapp.com/send?phone=${infSupp.CONTACT.COLOMBIA.CELLPHONE}`
              : `https://api.whatsapp.com/send?phone=${infSupp.CONTACT.MEXICO.CELLPHONE}`
          }
          onClick={handleEvent}
          target="_blank"
          rel="noreferrer"
          className="fab-wa shadow_hard p_md"
        >
          <WA className="dim_xxl"/>
        </a> */}

        <CityModal
          openCityModal={openCityModal}
          setOpenCityModal={setOpenCityModal}
        />
        <Footer />
      </div>
    </div>
  );
};
