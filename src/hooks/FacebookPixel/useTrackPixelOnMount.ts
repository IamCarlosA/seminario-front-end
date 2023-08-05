import { useEffect } from "react";
import useFacebookPixel from "./useFacebookPixel";

const useTrackPixelOnMount = (event?: string, data?: any) => {
  const ReactPixel = useFacebookPixel();
  useEffect(() => {
    if(!event) return;
    ReactPixel.track(event, data);
  }, []);
};

export default useTrackPixelOnMount;
