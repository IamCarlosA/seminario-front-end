import React, { FC, useEffect, useState } from "react";
import useCountdown from "hooks/useCountdown";
import hotsaleImage from "static/logos/hotsale.png";
import "./styles.scss";
import { Typography } from "@ecommerce-ozon/design_system";

interface Props {
  triangleColor?: string;
  className?: string;
}

interface TimeFormatted {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const formatSeconds = (seconds: number): TimeFormatted => {
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  return {
    days: d,
    hours: h,
    minutes: m,
    seconds: s,
  };
};

export const HOTSALE_START_DATE = new Date(2022, 4, 23, 0, 0, 0);
export const HOTSALE_END_DATE = new Date(2022, 4, 31, 0, 0, 0);

const pluralize = (value: number, singular: string, plural: string) =>
  value === 1 ? singular : plural;

const HotsaleCountdown: FC<Props> = ({
  triangleColor = "#FFFFFF",
  className = "",
}) => {
  const [hotSaleDate] = useState<Date>(
    // eslint-disable-next-line no-nested-ternary
    new Date() < HOTSALE_START_DATE
      ? HOTSALE_START_DATE
      : new Date() < HOTSALE_END_DATE
      ? HOTSALE_END_DATE
      : new Date()
  );
  const [dateDiff, setDateDiff] = useState(
    (hotSaleDate.getTime() - new Date().getTime()) / 1000
  );
  const secondsLeft = useCountdown(dateDiff > 0 ? dateDiff : 0);
  const [timeLeft, setTimeLeft] = useState(formatSeconds(secondsLeft));
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (
      formatSeconds(dateDiff).toString() !==
      formatSeconds(
        hotSaleDate.getTime() - new Date().getTime() / 1000
      ).toString()
    ) {
      setDateDiff((hotSaleDate.getTime() - new Date().getTime()) / 1000);
    }
  }, [setDateDiff, hotSaleDate, dateDiff]);

  useEffect(() => {
    setTimeLeft(formatSeconds(secondsLeft));
    if (secondsLeft === 0) {
      setComplete(true);
    }
  }, [secondsLeft]);

  return (
    <div
      className={`hotsale-countdown-container p_y_xs p_x_lg ${
        complete ? "complete" : ""
      } ${className}`}
      style={{}}
    >
      <Typography weight="600" scale="small">
        <span className="display text_neutral_900 text_xsmall_800">
          {hotSaleDate === HOTSALE_START_DATE ? "Comienza" : "Finaliza"} en:{" "}
          {`${timeLeft.days} día${pluralize(timeLeft.days, "", "s")} ${
            timeLeft.hours
          } hora${pluralize(timeLeft.hours, "", "s")} ${
            timeLeft.minutes
          } min${pluralize(timeLeft.minutes, "", "s")}`}
        </span>
      </Typography>
      <div className="logo">
        <img src={hotsaleImage} alt="hotSale" />
      </div>
      <div
        className="triangle-border"
        style={{ borderBottomColor: triangleColor }}
      />
    </div>
  );
};

export default HotsaleCountdown;
