import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import cdmxLogo from "static/images/cityModal/CDMX_Logo.png";
import guadalajaraLogo from "static/images/cityModal/GUADALAJARA_Logo.png";

import "./CityModal.scss";

import {Typography, Modal, Button} from "@ecommerce-ozon/design_system";
import CityModalOption from "./CityModalOption";

import { changeRootCity } from "../../store/actions/city";
import { Cities } from "../../store/reducers/cityReducer";
import {fetchVehiclesUpdateCity} from "../../store/actions/vehicles";
import {RootState} from "../../store";

interface Props {
  openCityModal: boolean;
  setOpenCityModal: Function
}

const CityModal: React.FC<Props> = ({openCityModal, setOpenCityModal}) => {
  // const [open, setOpen] = useState(true);

  const cityReducerState = useSelector((state: RootState) => state.cityReducer);


  const dispatch = useDispatch();
  const [currentCity, setCurrentCity] = useState<Cities>();

  const closeModal = () => {
    dispatch(changeRootCity(Cities.NO_CITY));
    setCurrentCity(Cities.NO_CITY);
    setOpenCityModal(false);
    localStorage.removeItem("city");
  };

  const onClickOption = useCallback((option: Cities) => {
    dispatch(changeRootCity(option));
    setCurrentCity(option);

    localStorage.setItem("city", option);
    setOpenCityModal(false);
  }, [dispatch, closeModal]);

  useEffect(() => {
    dispatch(fetchVehiclesUpdateCity(currentCity));
  }, [currentCity]);



  return <Modal className="city-modal" open={openCityModal} setOpen={setOpenCityModal}>
    <div className="display_flex flex_col flex_align_center flex_justify_center">
      <Typography scale="heading2" weight="600">
        ¡En OZON, <span className="text_primary_300">Nos expandimos!</span>
      </Typography>
      <Typography className="text_center m_t_md" scale="large" weight="400">
        Para darte una experiencia <span className="text_large_600">más personalizada </span> <br />
        por favor indícanos en dónde estás localizado
      </Typography>
      <div className="display_flex flex_col_mobile flex_align_center_mobile m_t_xxl w_100_per flex_justify_around">
        <CityModalOption value={Cities.CDMX} onClick={onClickOption} ml={139} cityName="Ciudad de México" cityCode="CDMX" logo={cdmxLogo} />
        <div className="m_t_xxl_mobile" />
        <CityModalOption value={Cities.GUADALAJARA} onClick={onClickOption} cityName="Guadalajara" cityCode="JALISCO" logo={guadalajaraLogo} />
      </div>
      <Button onClick={closeModal} scale="small" variant="ghost" className="m_t_lg"><Typography scale="large" weight="400">
        No por ahora
      </Typography></Button>
    </div>
  </Modal>;
};

export default CityModal;
