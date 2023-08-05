import React, { FC } from "react";
import {useStepper, Typography} from "@ecommerce-ozon/design_system";

interface Props {

}

const stepperTitle: { [key:string]: React.ReactElement } = {
  "0": <Typography scale="heading3" weight="600" className="m_t_xxl">
    Verifica tu <span className="text_primary_300">identidad</span>
  </Typography>,
  "1": <Typography scale="heading3" weight="600" className="m_t_xxl">
    Certificados <span className="text_primary_300">bancarios</span>
  </Typography>,
  "2": <Typography scale="heading3" weight="600" className="m_t_xxl">
    Comprobante <span className="text_primary_300">de domicilio</span>
  </Typography>,
  "3": <Typography scale="heading3" weight="600" className="m_t_xxl">
    Referencias personales 1
  </Typography>,
  "4": <Typography scale="heading3" weight="600" className="m_t_xxl">
    Referencias personales 2
  </Typography>
};

const ValidateStepperHeader: FC<Props> = () => {
  const { currentStep } = useStepper();
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>
    {
      stepperTitle[currentStep]
    }
  </>;
};

export default ValidateStepperHeader;
