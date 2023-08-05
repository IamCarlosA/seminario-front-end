/* eslint-disable no-unused-vars */
import {
  Step,
  Stepper,
  StepperBody,
  StepperProvider,
  StepperSteps,
  useStepper,
  Button, 
  Typography,
  CarouselProvider
} from "@ecommerce-ozon/design_system";
import { formatPrice } from "helpers/formatPrice";
import { prices } from "helpers/prices";
import { TVehicle } from "models/vehicle.interface";
import React, {FC, memo} from "react";
import StepperCarousel from "views/DetailsView/DetailsVehicle/StepperCarousel";

interface Props {
  vehicle: TVehicle;
  handleModal: Function;
}

const PlanCarousel: FC<Props> = ({ vehicle, handleModal }) => (
  <CarouselProvider>
    <StepperCarousel vehicle={vehicle} handleModal={handleModal}/>
  </CarouselProvider>
);

export default memo(PlanCarousel);
