/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React, { useCallback, useEffect, useState } from "react";
import { Button, Typography } from "@ecommerce-ozon/design_system";
import { getVehicle } from "helpers/fetchVehicles";
import { TImages, TVehicle } from "models/vehicle.interface";
import { useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import "./DetailsView.scss";

import { ModalFormFinanciero } from "components/hocs/modal/ModalFormFinanciero";
import { HeaderVehicle } from "./HeaderVehicle/HeaderVehicle";
import Gallery from "./Gallery/Gallery";
import DetailsVehicle from "./DetailsVehicle/DetailsVehicle";
import { OneThousandSecction } from "../../components/hocs/bannerMX/oneThousandSecction/OneThousandSecction";
import { HubsSection } from "../../components/hubs/HubsSection";
import RecommendedDetails from "./RecommendedDetails/RecommendedDetails";
import { AdvancedView } from "./AdvancedSection/AdvancedView";

type paramDetail = {
  id: string;
};

export const DetailsView = () => {
  const [open, setopen] = useState<boolean>(false);
  const [selectedCreditTime, setSelectedCreditTime] = useState<number>();
  const history = useHistory();
  const { id }: paramDetail = useParams();
  const [vehicle, setvehicle] = useState<TVehicle>();
  const [loading, setloading] = useState(true);
  const [photos, setPhotos] = useState<TImages[]>([]);

  const handleModal = (cuota: number) => {
    setSelectedCreditTime(cuota);
    setopen(!open);
  };

  const handleSeparate = useCallback(() => {
    history.push("/separate", vehicle);
  }, [history, vehicle]);
  const scrollTop = () => {
    window.focus();
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    scrollTop();
  }, []);

  useEffect(() => {
    (async () => {
      const res = await getVehicle(id);
      if (res) {
        setvehicle(res);
        if (res.images) {
          setPhotos(res.images);
        }
        setloading(false);
      } else {
        Swal.fire({
          title: "Error",
          text: "El vehículo no existe",
          icon: "error",
          confirmButtonText: "Aceptar",
        }).then(() => {
          history.push("/");
        });
      }
    })();
  }, [id, history]);

  if (!vehicle || photos.length < 1) {
    return <div className="detailsMain">loading</div>;
  }

  return (
    <div className="detailsMain">
      <HeaderVehicle vehicle={vehicle} />
      <div className="dso_container  display_flex flex_row_desktop flex_col_reverse_mobile containerDetailsdata m_y_md">
        <div className="w_100_per_mobile w_40_per_desktop h_100_per_desktop">
          <DetailsVehicle vehicle={vehicle} handleModal={handleModal} />
        </div>
        <div className="w_100_per_mobile w_60_per_desktop">
          <Gallery photos={photos} />
        </div>
      </div>

      <AdvancedView vehicle={vehicle} handleModal={handleModal} />
      <div className="dso_container p_b_xl_desktop">
        <div className="dso_card bg_neutral_0 w_100_per_mobile w_60_per_desktop m_t_xl p_lg display_flex flex_col_mobile">
          <div className="display_flex flex_center w_50_per_desktop w_100_per_mobile flex_col_desktop flex_col_mobile p_y_xs_mobile borderSeparate">
            <Typography weight="400" scale="small" className="text_center">
              {" "}
              <span style={{ fontWeight: "bolder" }}>
                Reserva esta moto
              </span>{" "}
              por solo
            </Typography>
            <Typography
              weight="600"
              scale="heading3"
              className="text_center text_primary_300"
            >
              $ 150 MXN
            </Typography>
          </div>
          <div className="display_flex flex_center w_50_per_desktop w_100_per_mobile flex_col m_y_xs_mobile p_x_xs_desktop">
            <Typography
              weight="400"
              scale="small"
              className="text_center text_neutral_800"
            >
              Estará reservada{" "}
              <span
                style={{ fontWeight: "bolder" }}
                className="text_neutral_1000"
              >
                por 72 horas
              </span>
            </Typography>
            <Button
              className="w_100_per dso_btn_small m_t_xxs"
              onClick={handleSeparate}
            >
              Reservar con solo $150 mxn
            </Button>
          </div>
        </div>
      </div>
      <OneThousandSecction />
      <HubsSection />
      <RecommendedDetails />
      <ModalFormFinanciero
        open={open}
        setOpen={handleModal}
        vehicleSelected={vehicle}
        selectedCreditTime={selectedCreditTime}
        orientation="vertical"
      />
    </div>
  );
};
