/* eslint-disable no-unused-vars */
import React, { FC, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Typography } from "@ecommerce-ozon/design_system";
import { ReactComponent as Back } from "@ecommerce-ozon/design_system/dist/public/static/icons/back.svg";
import { ReactComponent as WA } from "@ecommerce-ozon/design_system/dist/public/static/icons/whatsapp.svg";
import { fetchGetFinancialForm } from "helpers/fetchFormCrediticio";
import { fetchLogin } from "helpers/fetchCheckIn";
import { getVehicle } from "helpers/fetchVehicles";
import { useDispatch } from "react-redux";
import {
  setCreditVerificationCreditTimeAction,
  setCreditVerificationVehicleAction,
} from "store/actions/creditVerification";
import { TVehicle } from "models/vehicle.interface";
import { ContactHelper } from "components/hocs/ContactHelper/ContactHelper";
import useUserVerificationDetails from "hooks/useUserVerificationDetails";
import { useCreditVerificationSelectedVehicle } from "../../hooks/useCreditVerificationSelectedVehicle";
import ValidateIdentity from "./ValidateIdentity";
import ValidateIdentityCompleted from "./ValidateIdentityCompleted";

import maskWhite from "../creditCalculation/results/mask-white.svg";
import maskOrange from "../creditCalculation/results/mask-orange.svg";
import person from "../creditCalculation/results/person.svg";

type param = {
  id: string;
};

interface Props {}

const ValidateIdentityView: FC<Props> = () => {
  const [results, setResults] = useUserVerificationDetails();
  const [loading, setloading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { id }: param = useParams();
  const [completed, setCompleted] = useState(false);
  const history = useHistory();
  const selectedVehicle = useCreditVerificationSelectedVehicle();
  const goWA = () =>
    window.open(
      "https://api.whatsapp.com/send?phone=525636630355&text=Hola%20buen%20día,%20quiero%20continuar%20con%20mi%20proceso%20de%20solicitud%20de%20crédito%20pre-Aprobada...",
      "_blank"
    );

  useEffect(() => {
    if (id) {
      setloading(true);
      fetchGetFinancialForm(id)
        .then((res) => {
          const { email } = res.ozoner;
          const password: string = res.ozoner.curp;
          const vehicleSelect =
            res.ozoner.financialForm[res.ozoner.financialForm.length - 1]
              .vehicleId;
          const creditTimeSelected =
            res.ozoner.financialForm[res.ozoner.financialForm.length - 1]
              .creditTime;
          fetchLogin(email, password).then((response) => {
            getVehicle(vehicleSelect).then((vehicleReturn) => {
              dispatch(
                setCreditVerificationVehicleAction(vehicleReturn as TVehicle)
              );
              dispatch(
                setCreditVerificationCreditTimeAction(creditTimeSelected)
              );
              const { platforms, score, workInDigitalPlatforms, _id } =
                res.ozoner.financialForm[res.ozoner.financialForm.length - 1];
              if (workInDigitalPlatforms) {
                setResults({
                  creditCalculation: {
                    state:
                      res.ozoner.financialForm[
                        res.ozoner.financialForm.length - 1
                      ],
                    score,
                    vehicles: [],
                  },
                  digitalPlatforms: {
                    platforms,
                    authDataTreatment: true,
                    workInDigitalPlatforms,
                  },
                  timestamp: Date.now(),
                });
                history.push("/palenca");
              }
              setloading(false);
            });
          });
        })
        .catch((err) => {
          setloading(false);
          history.push("/");
        });
    }
  }, [id]);

  return (
    <>
      <div className="dso_container">
        <div className="display_flex flex_align_center m_y_lg">
          <Button
            variant="icon"
            icon={<Back />}
            subvariant="edit"
            scale="small"
            onClick={() => history.goBack()}
          />
          <Typography
            scale="xsmall"
            weight="400"
            className="text_neutral_800 m_l_md"
          >
            Catálogo
          </Typography>
          <Typography
            scale="xsmall"
            weight="400"
            className="text_neutral_800 m_x_xs"
          >
            {" < "}
          </Typography>
          <Typography
            scale="xsmall"
            weight="400"
            className="text_neutral_800 m_x_xs"
          >
            {selectedVehicle?.model?.name || "-"}
          </Typography>
          <Typography
            scale="xsmall"
            weight="400"
            className="text_neutral_800 m_x_xs"
          >
            {" < "}
          </Typography>
          <Typography
            scale="xsmall"
            weight="400"
            className="text_neutral_800 m_x_xs"
          >
            Solicitud de compra
          </Typography>
          <Typography
            scale="xsmall"
            weight="400"
            className="text_neutral_800 m_x_xs"
          >
            {" < "}
          </Typography>
          <Typography
            scale="xsmall"
            weight="400"
            className="text_neutral_800 m_x_xs"
          >
            Validación de identidad
          </Typography>
        </div>
        {loading ? (
          <div style={{ height: "100vh" }}>Cargando...</div>
        ) : (
          <div>
            {!completed ? (
              <ValidateIdentity complete={() => setCompleted(true)} />
            ) : (
              <ValidateIdentityCompleted />
            )}
          </div>
        )}
      </div>
      {/*<ContactHelper />*/}
    </>
  );
};

export default ValidateIdentityView;
