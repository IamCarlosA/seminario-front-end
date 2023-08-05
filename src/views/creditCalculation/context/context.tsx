/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import React, { Dispatch, useState } from "react";

export enum CreditPhases {
  DigitalPlatformsForm,
  CreditForm,
}

interface CreditContextType {
  phase: CreditPhases;
  setPhase: Dispatch<React.SetStateAction<CreditPhases>>;
}

const CreditContext = React.createContext<CreditContextType>({
  phase: CreditPhases.DigitalPlatformsForm,
  setPhase: () => {}
});

const CreditProvider: React.FC = ({ children }) => {
  const [phase, setPhase] = useState(CreditPhases.DigitalPlatformsForm);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <CreditContext.Provider value={{ phase, setPhase }}>
      {children}
    </CreditContext.Provider>
  );
};

export { CreditContext, CreditProvider };
