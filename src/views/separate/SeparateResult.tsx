import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { TVehicle } from "models/vehicle.interface";
import { Grid } from "@material-ui/core";
import {useStepper, Typography, Button, SectionList} from "@ecommerce-ozon/design_system";
import { ReactComponent as Back } from "@ecommerce-ozon/design_system/dist/public/static/icons/back.svg";
import { AccordionFaqs } from "./faqs/AccordionFaqs";
import { SeparateStepper } from "./SeparateStepper/SeparateStepper";
import { Summary } from "./views/summary/Summary";
// import { ConektaComponent } from "./views/summary/ConektaComponent";

type Props = {
  vehicle: TVehicle;
};

const sections = [
  { label: "Información personal", point: 0 },
  { label: "Metódo/Estado de pago", point: 1 },
];

export const SeparateResult = ({ vehicle }: Props) => {
  const { currentStep } = useStepper();
  const history = useHistory();

  useEffect(() => {
    console.log(currentStep);
  }, [currentStep]);

  return (
    <div>
      <div className="display_flex flex_align_center m_b_lg">
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
        <Typography scale="xsmall" weight="400" className="text_primary_300">
          {`Vehículo ${vehicle.internalId}`}
        </Typography>
      </div>
      <SectionList
        labels={sections}
        className="w_100_per_desktop flex_center_desktop m_b_xl"
      />
      <div className="flex_center">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <div className="w_100_per h_100_per dso_card_small p_y_xxl bg_neutral_0">
              <SeparateStepper />
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className="w_100_per h_100_per dso_card_small p_y_xxl bg_neutral_0">
              <Summary vehicle={vehicle} />
              {/* <ConektaComponent/> */}
            </div>
          </Grid>
          <Grid item xs={12}>
            <AccordionFaqs />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
