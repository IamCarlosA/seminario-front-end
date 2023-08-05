import React, { useState } from "react";
import {Grid, Button} from "@mui/material";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import {priceFormatFinancial} from "../../helpers/prices";


const useStyles = makeStyles(() =>
  createStyles({

    button: {
      margin: "8px 0",
      width:"95%",
      height:"46px",
      fontSize:"14px",
      border:"1px solid #ECEDEF",
      backgroundColor: "transparent",
      color: "black",
      "&:hover": {
        backgroundColor: "rgb(254, 138, 2)",
        color: "white",
      },
    },
    selectedButton: {
      backgroundColor: "rgb(254, 138, 2)",
      color: "white",
      "&:hover": {
        backgroundColor: "rgb(254, 138, 2)",
        color: "white",
      },
    },
  })
);

type paymentButtonsProps= {
  setInitialPaymentAmount:any
  selectedButton:any;
  setSelectedButton:any;
}

const PaymentButtons: React.FC<paymentButtonsProps> = ({
                                                         setInitialPaymentAmount,
                                                         selectedButton,
                                                         setSelectedButton
}) => {
  const classes = useStyles();


  const handleButtonClick = (button: string, amount:number) => {
    setSelectedButton(button);
    setInitialPaymentAmount(amount);
  };

  const paymentOptions = [
    {amount: 0},
    {amount: 2000},
    {amount: 5000},
    {amount: 10000},
  ];

  return (
    <>
      {
        paymentOptions.map((item:any, idx:number)=> (
          <Grid  key={idx} item xs={6} md={3} >
            <Button
              variant="contained"
              disableElevation
              className={`${classes.button} ${
                selectedButton === idx.toString() ? classes.selectedButton : ""
              }`}
              onClick={() => handleButtonClick(idx.toString(),item.amount )}

            >
              {priceFormatFinancial(item.amount, 0)}
            </Button>
          </Grid>

        ))
      }
    </>
  );
};

export default PaymentButtons;
