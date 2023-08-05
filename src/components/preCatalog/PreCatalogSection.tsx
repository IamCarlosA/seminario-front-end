import React, { FC, useMemo } from "react";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import { CarouselItem, CarouselProvider, Typography, useWindowSize, Button, useDevice, useStepper } from "@ecommerce-ozon/design_system";
import { ReactComponent as Right } from "@ecommerce-ozon/design_system/dist/public/static/icons/chevron-right.svg";
import { ReactComponent as RightArrow } from "@ecommerce-ozon/design_system/dist/public/static/icons/right-lg.svg";
import { ReactComponent as LeftArrow } from "@ecommerce-ozon/design_system/dist/public/static/icons/left-lg.svg";
import OzonCardVehicle from "components/cards/OzonCardVehicle";
import PreCatalogCarousel from "./PreCatalogCarousel";
import PreCatalogCarouselItem from "./PreCatalogCarouselItem";
import useVehicles from "../../hooks/useVehicles";
import "./styles.scss";


interface Props {

}

const PAGES = 4;

const PreCatalogControl = () => {
  const { incrementCurrentStep, decrementCurrentStep, setCurrentStep, currentStep, steps } = useStepper();
  return <div className="slider-control display_flex flex_col">
    <div className="display_flex flex_align_center m_t_xxxl">
      <LeftArrow className={`${currentStep === 0 ? "text_neutral_700" : "text_primary_300"}`}
                 onClick={decrementCurrentStep} />
      <div className="display_flex flex_1 flex_justify_center">
        {
          _.range(PAGES).map((page, index) => <div
            key={index}
            className={`slider-point ${currentStep === index ? "active" : ""}`}
            onClick={() => setCurrentStep(index + 1)}
          />)
        }
      </div>
      <RightArrow className={`${currentStep === steps.length - 1 ? "text_neutral_700" : "text_primary_300"}`}
                  onClick={incrementCurrentStep} />
    </div>
  </div>;
};

const AllBrandsButton = () => {
  const history = useHistory();
  return <Button style={{ padding: 0 }} onClick={() => {
    history.push("/catalogo");
  }} variant="link" scale="small" orientation="right" className="text_primary_300 flex_align_self_start_desktop"
                 icon={<Right />}>
    Ver todas las marcas
  </Button>;
};

const PreCatalogSection: FC<Props> = () => {
  const { data: { vehicles }, error, loading } = useVehicles();
  const { width: windowWidth } = useWindowSize();
  const { isDesktop, isMobile } = useDevice();

  // eslint-disable-next-line no-nested-ternary
  const itemsPerPage = useMemo(() => windowWidth > 1200 ? 4 : windowWidth > 800 ? 3 : 1, [windowWidth]);
  const selectedVehicles = useMemo(() => _.chunk(_.sampleSize(vehicles, itemsPerPage * PAGES), itemsPerPage).map((chunk, index) =>
    <CarouselItem value={`${index}`} name={`${index}`} key={`${index}`}>
      <div className="carousel-item-container"
           style={{ gridTemplateColumns: `repeat(${itemsPerPage}, minmax(200px, 1fr))` }}>
        {chunk.map((vehicle) => <div className="m_r_lg p_y_xl" key={vehicle._id}>
          {/* <OzonCardVehicle isHelperCard={false} vehicle={vehicle} /> */}
        </div>)}
      </div>
    </CarouselItem>), [vehicles, itemsPerPage]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>
    {!loading && !error && selectedVehicles.length > 0 &&
      <section className="pre-catalog-section-container dso_container_desktop">
        <CarouselProvider>
          <div style={{ gridArea: "labels" }}>
            <Typography className="text_center_mobile" weight="600" scale="heading2">
              Encuentra tu {isDesktop && <br />} <span className="text_primary_300"> moto ideal </span>
            </Typography>
            <Typography className="m_y_lg text_center_mobile" weight="400" textColor="neutral_700" scale="large">
              ¡No pierdas la
              oportunidad de disfrutar estos <b>descuentos que
              tenemos para ti!</b> 
            </Typography>
            {
              isDesktop && <AllBrandsButton />
            }
          </div>
          <div className="text_center_mobile m_y_xl_mobile" style={{ gridArea: "control", alignSelf: "start" }}>
            {
              isMobile && <AllBrandsButton />
            }
            <PreCatalogControl />
          </div>
          <div style={{ gridArea: "carousel" }}>
            <PreCatalogCarousel renderedVehicles={selectedVehicles} />
          </div>
        </CarouselProvider>
      </section>}
  </>;
};

export default PreCatalogSection;
