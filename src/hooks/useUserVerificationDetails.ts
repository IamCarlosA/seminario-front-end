import useLocalStorage, { SetValue } from "./useLocalStorage";
import { TVehicle } from "../models/vehicle.interface";
import { CalculationStepperFormValues } from "../views/creditCalculation/CreditCalculationStepperView";
import { DigitalPlatformsFormValues } from "../components/creditDigitalPlatforms/CreditDigitalPlatforms";

export interface ICreditCalculationResults {
  state: Partial<CalculationStepperFormValues> & {completed: boolean};
  score: number;
  vehicles: TVehicle[];
}

export interface IDigitalPlatformsData extends DigitalPlatformsFormValues{

}

export interface IUserCreditVerificationData {
  creditCalculation: ICreditCalculationResults
  digitalPlatforms: IDigitalPlatformsData
  timestamp: number;
}

const useUserVerificationDetails = () : [IUserCreditVerificationData, SetValue<IUserCreditVerificationData>] => {
  const [data, setData] = useLocalStorage<IUserCreditVerificationData>("user-verification-data", {
    creditCalculation: {
      state: {
        completed: false
      },
      score: 0,
      vehicles: [],
    },
    digitalPlatforms: {
      platforms: [],
      authDataTreatment: false,
      workInDigitalPlatforms: false
    },
    timestamp: Date.now()
  });

  return [data, setData];
};

export default useUserVerificationDetails;
