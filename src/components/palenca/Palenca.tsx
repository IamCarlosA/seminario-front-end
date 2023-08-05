/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Typography,
  Button,
  ModalConfirmation,
} from "@ecommerce-ozon/design_system";
import { ReactComponent as Back } from "@ecommerce-ozon/design_system/dist/public/static/icons/back.svg";
import { ReactComponent as CreditCard } from "@ecommerce-ozon/design_system/dist/public/static/icons/credit-card-2.svg";

// @ts-ignore
import { loadLink, PalencaLinkReact } from "@palenca/palenca-link";
import useUserVerificationDetails, {
  IUserCreditVerificationData,
} from "hooks/useUserVerificationDetails";
import { store } from "store";
import { fetchFormCrediticioUpdatePalenca } from "../../helpers/fetchFormCrediticio";

const linkPromise = loadLink(
  process.env.REACT_APP_PALENCA_PUB,
  process.env.REACT_APP_PALENCA_SANDBOX_ID
);

export const Palenca = () => {
  const [results, setResults] = useUserVerificationDetails();
  const [openConfirmation, setOpenConfirmation] = React.useState(false);
  const { user } = store.getState().userReducer;
  const [isConfirmationLoading, setIsConfirmationLoading] = useState(false);
  const handleOpenConfirmationModal = () => setOpenConfirmation(true);
  const handleClose = () => setOpenConfirmation(!openConfirmation);

  const [backState, setbackState] = useState<IUserCreditVerificationData>({
    creditCalculation: results.creditCalculation,
    digitalPlatforms: {
      platforms: [],
      authDataTreatment: false,
      workInDigitalPlatforms: false,
    },
    timestamp: Date.now(),
  });
  const history = useHistory();
  const handleBack = () => {
    handleClose();
  };
  const onConfirmationCallBack = async () => {
    setResults(backState);
    history.push("/validateIdentity");
    handleClose();
  };

  const handleEvent = useCallback(
    async (event: string /* , data: object */) => {
      if (event === "connection_success") {
        await fetchFormCrediticioUpdatePalenca();
        history.push("/validateIdentity");
      }
    },
    []
  );

  const options = {
    configuration: {
      hideConsent: true,
      country: "mx",
      externalId: user._id,
    },
    appearance: {
      primaryColor: "#ea4c89",
      borderRadius: "999px",
    },
  };

  useEffect(() => {
    console.log(options);
  }, [options]);

  const renderModalTitle = () => (
    <Typography scale="medium" weight="400" textColor="neutral_900">
      ¿Estás seguro de que quieres{" "}
      <span style={{ fontWeight: "bolder" }}>
        {" "}
        salir de la validación de plataformas digitales?
      </span>{" "}
    </Typography>
  );

  const renderModalSubTitle = () => (
    <Typography scale="xsmall" weight="400" textColor="neutral_900">
      Si sales{" "}
      <span style={{ fontWeight: "bolder" }}>
        {" "}
        no podrás volver a realizar dicha validación.
      </span>
    </Typography>
  );

  return (
    <div
      style={{ height: "100vh", width: "100%" }}
      className="dso_container p_y_xl m_b_xl"
    >
      <ModalConfirmation
        icon={<CreditCard />}
        handleClose={handleClose}
        openConfirmation={openConfirmation}
        onConfirmationCallBack={() => onConfirmationCallBack()}
        isConfirmationLoading={isConfirmationLoading}
        title={renderModalTitle()}
        subtitle={renderModalSubTitle()}
        copyReject="No, regrésame"
        copyConfirm="Si, seguro"
      />

      <div className="display_flex flex_align_center m_t_md">
        <Button
          variant="icon"
          icon={<Back />}
          subvariant="edit"
          scale="small"
          onClick={handleBack}
        />
        <Typography
          scale="medium"
          weight="400"
          className="text_neutral_800 m_l_md"
        >
          Regresar a la vista anterior
        </Typography>
      </div>
      <PalencaLinkReact
        link={linkPromise}
        options={options}
        onEvent={handleEvent}
      />
    </div>
  );
};
