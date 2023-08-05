import React, { FC, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Typography, CarouselProvider, CarouselItem, useDevice } from "@ecommerce-ozon/design_system";
import HotsaleCountdown, {
  HOTSALE_END_DATE
} from "components/hotsaleCountdown/HotsaleCountdown";
import "./styles.scss";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { Grid } from "@material-ui/core";
import DiscountCarousel from "./DiscountCarousel/DiscountCarousel";
import useVehicles from "../../hooks/useVehicles";
import { fetchVehiclesThunk } from "../../store/actions/vehicles";
import useCurrentCity from "../../hooks/useCurrentCity";
import { TVehicle } from "../../models/vehicle.interface";
import { CardViewMX } from "../hocs/card/CardViewMX";

const DiscountSection: FC = () => {
  const [isHotSale] = useState(HOTSALE_END_DATE > new Date());
  const {
    loading: vehiclesLoading,
    error: vehiclesError,
    data: { vehicles }
  } = useVehicles();
  const dispatch = useDispatch();
  const city = useCurrentCity();
  const [discountVehicles, setDiscountVehicles] = useState<TVehicle[][]>([]);
  const { isDesktop } = useDevice();

  const renderedVehicles = useMemo(
    () =>
      discountVehicles.map((vehiclesArray, pageIndex) => (
        <CarouselItem
          value={`${pageIndex}`}
          name={`page-${pageIndex}`}
          key={`page-${pageIndex}`}
        >
          <Grid
            container
            direction="row"
            alignItems="center"
            spacing={2}
            className="vehicle-grid"
          >
            {vehiclesArray.map((vehicle, index) => (
              <Grid key={`${pageIndex}-item-${index}`} item xs={6} md={3}>
                <CardViewMX key={vehicle._id} vehicle={vehicle} />
              </Grid>
            ))}
          </Grid>
        </CarouselItem>
      )),
    [discountVehicles]
  );

  useEffect(() => {
    dispatch(fetchVehiclesThunk({ filters: { city } }));
  }, [dispatch, city]);

  useLayoutEffect(() => {
    if (!vehiclesLoading && !vehiclesError && vehicles) {
      const discountVehiclesFilter = vehicles.filter(
        (vehicle) => vehicle.hasDiscount()
      );
      setDiscountVehicles(_.chunk(discountVehiclesFilter, isDesktop ? 4 : 2));
    }
  }, [vehiclesLoading, vehiclesError, vehicles, isDesktop]);
  
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return (<>
      {
        !vehiclesLoading && !vehiclesError && renderedVehicles.length > 0 ? (
          <section className="discount-section-container m_y_xxxl dso_container">
            <CarouselProvider>
              <div className="display_flex flex_col_mobile flex_align_center flex_justify_center m_y_xxxl">
                <Typography weight="600" scale="heading3">
                  {isHotSale ? (
                    <span>
                Descuentos <span className="text_primary_300">Hot-sale</span>
              </span>
                  ) : (
                    <span>
                Descuentos de{" "}
                      <span className="text_primary_300">Temporada</span>
              </span>
                  )}
                </Typography>

                {
                  isHotSale && <div className="hotsale-container m_t_lg_mobile">
                    <HotsaleCountdown />
                  </div>
                }

              </div>
              <DiscountCarousel error={Boolean(vehiclesError)} loading={vehiclesLoading} renderedVehicles={renderedVehicles} />
            </CarouselProvider>
          </section>
        ) : null
      }
    </>
  );
};

export default DiscountSection;
