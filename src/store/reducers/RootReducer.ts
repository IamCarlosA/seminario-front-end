import { combineReducers } from "redux";
import { accountReducer } from "./accountReducer";
import { countryReducer } from "./countryReducer";
import { cityReducer } from "./cityReducer";
import { selectReducer } from "./selectReducer";
import { userReducer } from "./userReducer";
import { payReducer } from "./payReducer";
import { invoiceReducer } from "./invoiceReducer";
import { stepperReducer } from "./stepperReducer";
import { couponReducer } from "./couponReducer";
import { datevReducer } from "./datevReducer";
import { ozonerVehiReducer } from "./ozonerVehiReducer";
import { buttonOzocioReducer } from "./buttonOzocioReducer";
import { vehiclesReducer } from "./vehiclesReducer";
import { recommendedReducer } from "./recommendedReducer";
import { creditVerificationReducer } from "./creditVerificationReducer";

export const RootReducer = combineReducers({
  countryReducer,
  cityReducer,
  creditVerificationReducer,
  selectReducer,
  userReducer,
  payReducer,
  invoiceReducer,
  stepperReducer,
  couponReducer,
  datevReducer,
  ozonerVehiReducer,
  buttonOzocioReducer,
  vehiclesReducer,
  recommendedReducer,
  accountReducer
});
