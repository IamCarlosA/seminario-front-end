/* eslint-disable no-unused-vars */
import { TVehicle } from "../../../models/vehicle.interface";
import { CalculationStepperFormValues } from "../CreditCalculationStepperView";

const DTI = 0.65;

const getDependantsPercentage = (
  dependantsCount: number,
  chidrenCount: number
) => {
  switch (dependantsCount) {
    case 0:
      return 0.08;
    case 1:
      return 0.065;
    case 2:
      return 0.03;
    case 3:
      return 0.01;
    default:
      return 0;
  }
};

const getMaximumCreditNumber = (values: CalculationStepperFormValues) => {
  if (values && values.incomeStep && values.dependantsStep) {
    const {
      incomeStep: { monthlySpending, monthlyIncome },
      dependantsStep: { dependantsCount, childrenCount }
    } = values;
    const weeklyIncome = (monthlyIncome / 30) * 7;
    let weeklySpending = (monthlySpending / 30) * 7;
    weeklySpending -=
      weeklySpending * getDependantsPercentage(dependantsCount, childrenCount);

    return (weeklyIncome - weeklySpending) * DTI;
  }
  return 0;
};

const filterByCreditCalculation = (maximum: number) => (vehicle: TVehicle) => {
  if (vehicle.getWeeklyPrice()) {
    return vehicle.getWeeklyPrice() < maximum;
  }
  return false;
};

export { filterByCreditCalculation, getMaximumCreditNumber };
