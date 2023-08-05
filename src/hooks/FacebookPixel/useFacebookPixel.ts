import ReactPixel from "react-facebook-pixel";

const options = {
  debug: process.env.NODE_ENV !== "production",
  autoConfig: false
};
ReactPixel.init(process.env.REACT_APP_PIXEL_ID as string, undefined, options);

const useFacebookPixel = () => ReactPixel;

export default useFacebookPixel;
