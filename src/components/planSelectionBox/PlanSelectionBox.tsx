import React from "react";
import { Box, Grid, Radio, useMediaQuery } from "@mui/material";
import { Typography } from "@ecommerce-ozon/design_system";

type PlanSelectionBoxProps = {
  title: string;
  weeks: number;
  weeklyAmount: string;
  handlePlanClick: any;
  index: number;
  selectedPlanIndex: any;
  noDiscountAmount?: string;
};

const PlanSelectionBox: React.FC<PlanSelectionBoxProps> = ({
  title,
  weeks,
  weeklyAmount,
  handlePlanClick,
  index,
  selectedPlanIndex,
  noDiscountAmount,
}) => {
  // const [selectedValue, setSelectedValue] = React.useState("a");

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSelectedValue(event.target.value);
  // };

  const matchesXS = useMediaQuery("(min-width:600px)");
  return !matchesXS ? (
    <Grid
      container
      onClick={() => handlePlanClick(index, weeks)}
      flexDirection="row"
      alignItems="center"
      style={{
        backgroundColor: index === selectedPlanIndex ? "#FCF2E7" : "#F4F5F6",
        marginBottom: "5px",
        padding: "20px 10px",
        borderRadius: "6px",
      }}
    >
      <Grid item xs={3} className="txt-center">
        <Radio
          checked={index === selectedPlanIndex}
          value="a"
          name="radio-buttons"
          inputProps={{ "aria-label": "A" }}
          sx={{
            paddingRight: "25px",
            width: 30,
            color: "#FE8A02",
            "&.Mui-checked": {
              color: "#FE8A02",
            },
          }}
        />
      </Grid>
      <Grid item xs={9}>
        <Typography
          scale="medium"
          weight="600"
          style={{ color: index === selectedPlanIndex ? "#FE8A02" : "inherit" }}
        >
          {title}
        </Typography>
        <Typography scale="small" weight="400">
          Crédito a {weeks} semanas
        </Typography>
        <div>
          {noDiscountAmount && (
            <Typography
              scale="small"
              weight="600"
              style={{
                color: index === selectedPlanIndex ? "#FE8A02" : "#8F99A3",
                textDecoration: "line-through",
              }}
            >
              Antes: ${noDiscountAmount}
            </Typography>
          )}
          <Typography
            scale="medium"
            weight="600"
            style={{
              color: index === selectedPlanIndex ? "#FE8A02" : "inherit",
            }}
          >
            ${weeklyAmount} /semanales
          </Typography>
        </div>
      </Grid>
    </Grid>
  ) : (
    <Box
      className="p_md m_y_md"
      onClick={() => handlePlanClick(index, weeks)}
      sx={{
        width: "100%",
        border:
          index === selectedPlanIndex
            ? "1px solid #FE8A02"
            : "1px solid #ECEDEF",
        borderRadius: "8px",
        height: 70,
        backgroundColor: index === selectedPlanIndex ? "#FCF2E7" : "#F4F5F6",
        "&:hover": {
          backgroundColor: "#FCF2E7",
          // opacity: [0.9, 0.8, 0.1],
        },
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", justifyContent: "start" }}>
          <Radio
            checked={index === selectedPlanIndex}
            value="a"
            name="radio-buttons"
            inputProps={{ "aria-label": "Seleccionar Plan" }}
            sx={{
              paddingRight: "25px",
              width: 30,
              color: "#FE8A02",
              "&.Mui-checked": {
                color: "#FE8A02",
              },
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
            }}
          >
            <Typography
              scale="small"
              weight="600"
              style={{
                color: index === selectedPlanIndex ? "#FE8A02" : "inherit",
              }}
            >
              {title}
            </Typography>
            <Typography scale="small" weight="400">
              Crédito a {weeks} semanas
            </Typography>
          </div>
        </div>
        <div>
          {noDiscountAmount && (
            <Typography
              scale="small"
              weight="600"
              style={{
                color: index === selectedPlanIndex ? "#FE8A02" : "#8F99A3",
              }}
            >
              <>
                Antes:{" "}
                <span style={{ textDecoration: "line-through" }}>
                  ${noDiscountAmount}
                </span>{" "}
              </>
            </Typography>
          )}
          <Typography
            scale="small"
            weight="600"
            style={{
              color: index === selectedPlanIndex ? "#FE8A02" : "inherit",
            }}
          >
            ${weeklyAmount} /semanales
          </Typography>
        </div>
      </div>
    </Box>
  );
};

export default PlanSelectionBox;
