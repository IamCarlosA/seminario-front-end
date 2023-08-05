import React, { FC } from "react";
import { Carousel } from "@ecommerce-ozon/design_system";

interface Props {
  renderedVehicles: React.ReactElement[]
}

const PreCatalogCarousel: FC<Props> = ({renderedVehicles}) => <Carousel autoplay={false} defaultArrows={false}>
    {
     renderedVehicles
    }
  </Carousel>;

export default PreCatalogCarousel;
