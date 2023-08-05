/* eslint-disable consistent-return */
import { useEffect, useState } from "react";

const useCountdown = (startCount: number = 86400) => {
  const [timeLeft, setTimeLeft] = useState(startCount);

  useEffect(() => {
    setTimeLeft(startCount);
  }, [startCount]);

  useEffect(() => {
    if (!timeLeft) {
      return;
    }
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [setTimeLeft, timeLeft]);

  return timeLeft;
};

export default useCountdown;
