/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import React, { useEffect, useState } from "react";
import ReactGA from "react-ga4";
import { useFormik } from "formik";
import * as yup from "yup";
import { ReactComponent as Moto } from "@ecommerce-ozon/design_system/dist/public/static/icons/motorcycle.svg";
import { ReactComponent as Boy } from "@ecommerce-ozon/design_system/dist/public/static/icons/boy.svg";
import { ReactComponent as Phone } from "@ecommerce-ozon/design_system/dist/public/static/icons/phone.svg";
import { ReactComponent as Email } from "@ecommerce-ozon/design_system/dist/public/static/icons/email.svg";
import { ReactComponent as Right } from "@ecommerce-ozon/design_system/dist/public/static/icons/Rigth.svg";
import { ReactComponent as TimeSand } from "@ecommerce-ozon/design_system/dist/public/static/icons/time-sand.svg";
import { ReactComponent as ChevronUp } from "@ecommerce-ozon/design_system/dist/public/static/icons/chevron-up.svg";
import { ReactComponent as ChevronDown } from "@ecommerce-ozon/design_system/dist/public/static/icons/chevron-down.svg";
import { ReactComponent as Whatsapp } from "@ecommerce-ozon/design_system/dist/public/static/icons/whatsapp.svg";
import { ReactComponent as Facebook } from "@ecommerce-ozon/design_system/dist/public/static/icons/facebook.svg";
import { ReactComponent as Instagram } from "@ecommerce-ozon/design_system/dist/public/static/icons/instagram.svg";
import { ReactComponent as Twitter } from "@ecommerce-ozon/design_system/dist/public/static/icons/twitter.svg";
import moto from "static/images/waitlist/moto.svg";

import { TVehicle } from "models/vehicle.interface";

import { Modal, Typography, Button, Input } from "@ecommerce-ozon/design_system";

import { fetchUserWaitlist } from "helpers/fetchPayment";
import { fetchWaitlist } from "helpers/fetchWaitlist";


const validationSchema = yup.object({
  name: yup.string().required("Campo requerido"),
  mobile_phone: yup
    .string()
    .max(12, "Maximo 12 digitos")
    .required("Campo requerido"),
  email: yup.string().email("Debe ser email").required("Campo requerido"),
  digitalPlatform: yup.bool().required("Campo requerido"),
});

type Props = {
  vehicle: TVehicle;
};

const CardUnavailable = ({ vehicle }: Props) => {
  const [open, setopen] = useState(false);
  const [loading, setloading] = useState(false);
  const [onWaitList, setonWaitList] = useState(false);
  const [position, setPosition] = useState<number>(10);
  const [positionFake, setPositionFake] = useState<number>(10);

  const formik = useFormik({
    initialValues: {
      name: "",
      mobile_phone: "",
      email: "",
      digitalPlatform: false,
    },
    validationSchema,
    onSubmit: (value: any) => {
      setloading(true);
      const { name, mobile_phone, email, digitalPlatform } = value;
      fetchUserWaitlist({
        name,
        mobile_phone,
        email,
        digitalPlatform,
      }).then((res: any) => {
        if (res) {
          if (res.jwt) {
            fetchWaitlist(vehicle._id).then((response) => {
              if (response.position) {
                setPosition((pos) => pos + response.position);
                setPositionFake(
                  (PositionFake) => PositionFake + response.position
                );
                setloading(false);
                setonWaitList(true);
              }
            });
          }
        }
      });
    },
  });

  useEffect(() => {
    ReactGA.event("CTA_ozoner_waitlist", {
      category: "Ozoner",
      label: "Param (Vehicle Id) from details view to waitlist",
      vehicleId: vehicle.internalId,
    });
  }, [vehicle]);

  const handlePosition = (link: string) => {
    if (positionFake > 1) {
      setPositionFake(positionFake - 1);
    }

    switch (link) {
      case "whatsapp":
        window.open(
          "https://chat.whatsapp.com/BTB5q4AkLzEJKLgZBW1mb0",
          "_blank"
        );
        break;
      case "facebook":
        window.open("https://www.facebook.com/OzonMobi.mx", "_blank");
        break;
      case "instagram":
        window.open("https://www.instagram.com/ozon.mx/", "_blank");
        break;
      case "twitter":
        window.open("https://twitter.com/ozon_mx", "_blank");
        break;

      default:
        break;
    }
  };

  return (
    <div className="pos_relative dso_card h_100_per_desktop p_x_xxl p_y_md bg_neutral_0 flex_center_col flex_justify_between flex_align_start">
      <div className="w_100_per_desktop">
        <div className="flex_center">
          <div className="p_y_none flex_center dso_chip_rounded dso_chip_small bg_red_300">
            <Moto className="w_md m_r_xxs" />
            MOTO NO DISPONIBLE
          </div>
        </div>
        <Typography
          scale="small"
          weight="400"
          className="text_primary_300 m_t_xxxl"
        >
          {`Ubicación: ${vehicle.city?.name}`}
        </Typography>
        <Typography
          scale="heading3"
          weight="600"
          className="text_neutral_900 m_t_xs"
        >
          {vehicle.brand?.name} {vehicle.model.name}
        </Typography>
        <Typography
          scale="small"
          weight="400"
          className="text_neutral_900 m_t_xs"
        >
          {vehicle.cylindersCapacity.value} CC
        </Typography>
        <Typography
          scale="small"
          weight="400"
          className="text_neutral_900 m_t_xs"
        >
          {`ID ${vehicle.internalId}`}
        </Typography>
      </div>
      <div className="m_t_md">
        {onWaitList ? (
          <Button
            variant="outline"
            scale="small"
            className="w_100_per m_t_md"
            orientation="right"
            onClick={() => setopen(true)}
            icon={<TimeSand />}
          >
            ESTAS EN LISTA DE ESPERA
          </Button>
        ) : (
          <Button
            variant="principal"
            scale="small"
            className="w_100_per m_t_md"
            onClick={() => setopen(true)}
            orientation="right"
            icon={<Right />}
          >
            ENTRAR A LA LISTA DE ESPERA
          </Button>
        )}
        <Typography
          scale="small"
          weight="400"
          className="text_neutral_800 m_t_xs text_center"
        >
          Si entras a lista de espera te contactaremos una vez tengamos este
          vehículo disponible
        </Typography>
      </div>
      <Modal open={open} setOpen={setopen}>
        {onWaitList ? (
          <div>
            <Typography
              scale="heading2"
              weight="600"
              className="text_primary_300 text_center"
            >
              ¡Felicidades!
            </Typography>
            <Typography
              scale="heading4"
              weight="600"
              className="text_neutral_900 m_t_md"
            >
              Estas en la lista de espera
            </Typography>
            <Typography
              scale="small"
              weight="400"
              className="text_neutral_900 m_t_xs"
            >
              Tu turno de espera es el numero:
            </Typography>
            <div className="m_t_md flex_center flex_justify_start">
              <div className="br_xs bg_neutral_300">
                <Typography
                  scale="heading4"
                  weight="600"
                  className="text_neutral_900 m_y_xs m_x_md"
                >
                  {positionFake}
                </Typography>
              </div>
              <div className="m_l_md">
                {positionFake === position ? (
                  <ChevronUp className="text_green_300" />
                ) : (
                  <ChevronDown className="text_red_300" />
                )}
              </div>
            </div>
            <div className="flex_center flex_col">
              <img src={moto} alt="" className="w_80_per" />
              <Typography
                scale="xxsmall"
                weight="400"
                className="text_neutral_600 text_center"
              >
                Una vez este vehículo este disponible te contactaremos
              </Typography>
            </div>
            <Typography
              scale="heading4"
              weight="600"
              className="text_neutral_900 m_t_md"
            >
              Mejora tu turno
            </Typography>
            <Typography
              scale="medium"
              weight="400"
              className="text_neutral_900 m_t_md"
            >
              Unete a nuestra comunidad
            </Typography>
            <Button
              variant="principal"
              scale="small"
              className="w_100_per m_t_md"
              orientation="right"
              onClick={() => handlePosition("whatsapp")}
              icon={<Whatsapp />}
            >
              COMUNIDAD DE WHATSAPP
            </Button>
            <Typography
              scale="medium"
              weight="400"
              className="text_neutral_900 m_t_md text_center"
            >
              Siguenos en redes sociales
            </Typography>
            <div className="flex_center m_y_md">
              <Button
                variant="icon"
                subvariant="edit"
                scale="small"
                style={{ backgroundColor: "#2254C0" }}
                onClick={() => handlePosition("facebook")}
                icon={<Facebook className="text_neutral_0" />}
              />
              <Button
                variant="icon"
                subvariant="edit"
                scale="small"
                className="m_x_xl"
                onClick={() => handlePosition("instagram")}
                style={{ backgroundColor: "#F21B64" }}
                icon={<Instagram className="text_neutral_0" />}
              />
              <Button
                variant="icon"
                subvariant="edit"
                scale="small"
                onClick={() => handlePosition("twitter")}
                style={{ backgroundColor: "#1F9DFF" }}
                icon={<Twitter className="text_neutral_0" />}
              />
            </div>
          </div>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <Typography
              scale="heading2"
              weight="600"
              className="text_primary_300 text_center"
            >
              ¡Genial!
            </Typography>
            <Typography
              scale="heading4"
              weight="600"
              className="text_neutral_900 m_t_md"
            >
              Estas muy cerca de tener la moto de tus sueños
            </Typography>

            <Typography
              scale="small"
              weight="400"
              className="text_neutral_900 m_t_xs"
            >
              Llena los siguientes datos para poder contactarte
            </Typography>

            <Input
              title="¿Trabajas en plataformas digitales?"
              name="digitalPlatform"
              type="slider"
              labels
              className="flex_center_column m_t_md"
              value={formik.values.digitalPlatform}
              onChange={formik.handleChange}
            />

            <Input
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              type="text"
              placeholder="Escribe tu nombre aquí"
              title="Nombre"
              icon={<Boy className="primary_300" />}
              className="m_t_md"
            />
            <Input
              name="mobile_phone"
              value={formik.values.mobile_phone}
              onChange={formik.handleChange}
              type="text"
              placeholder="Escribe tu Celular aquí"
              title="Celular"
              icon={<Phone className="primary_300" />}
              className="m_t_md"
            />
            <Input
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              type="text"
              placeholder="Escribe tu correo aquí"
              title="Correo"
              icon={<Email className="primary_300" />}
              className="m_t_md"
            />
            <Button
              type="submit"
              variant="principal"
              disabled={loading}
              scale="small"
              className="w_100_per m_y_md"
              orientation="right"
              icon={<Right />}
            >
              {loading ? "CARGANDO" : "ENTRAR A LA LISTA DE ESPERA"}
            </Button>
          </form>
        )}
      </Modal>
      {/* {open && <div className="dim_100_per_desktop modelcard pos_absolute_desktop pos_fixed_mobile dim_90_vp_mobile m_auto">modal</div>} */}
    </div>
  );
};

export default CardUnavailable;
