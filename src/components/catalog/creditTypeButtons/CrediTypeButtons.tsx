import React, {useEffect, useState} from "react";
import { Button, Grid } from "@material-ui/core";

import {Typography} from "@ecommerce-ozon/design_system";
import {useDispatch} from "react-redux";
import {updateSelectedFilters} from "../../../store/actions/vehicles";

interface CreditButton {
  weeks: number;
  months: number;
}

const buttonValues: CreditButton[] = [
  { weeks: 52, months: 12, },
  { weeks: 78, months:  18},
  { weeks: 104, months:  24},
];


type CreditTypeButtonsProps = {
  setCurrentPage: any
}

const CreditTypeButtons:React.FC<CreditTypeButtonsProps> = ({setCurrentPage}) => {

  const buttonsInitialState=[52,78,104];

  const [selectedButtons, setSelectedButtons] = useState<number[]>(buttonsInitialState);

  const dispatch = useDispatch();

  const handleButtonClick = (weeks:number,) => {
    if (selectedButtons.includes(weeks)) {
      setSelectedButtons(selectedButtons.filter((i) => i !== weeks));
    } else {
      setSelectedButtons([...selectedButtons, weeks]);
    }

  };

  useEffect(() => {

    if(selectedButtons.length === 0) {
      setSelectedButtons(buttonsInitialState);
    }
    dispatch(updateSelectedFilters("weeks", selectedButtons));

    setCurrentPage(1);

  }, [selectedButtons]);





  return (

      <Grid container direction="column" spacing={1} justifyContent="center" className="m_t_xs" >
        {buttonValues.map((button) => (
          <Grid item key={button.weeks}>
            <Button
              className="w_100_per"
              disableElevation
              disableRipple
              variant="contained"
              style={{
                width:"100%", height:45,
                backgroundColor: selectedButtons.includes(button.weeks) ? "darkorange" : "white",
                color: selectedButtons.includes(button.weeks) ? "white" : "darkorange",
                margin: "5px",
                border: "1px solid"
              }}
              onClick={() => handleButtonClick(button.weeks)}
            >
              <span style={{fontWeight:"bolder"}}>{`${button.weeks} semanas `} </span> &nbsp; {` (${button.months} meses )`}
            </Button>
          </Grid>
        ))}
      </Grid>

  );
};

export default CreditTypeButtons;
