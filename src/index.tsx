import React from "react";
import ReactDOM from "react-dom";
import ReactGA from "react-ga4";
import { Ozon } from "./Ozon";
import "./theme/global.scss";

ReactGA.initialize(`${process.env.REACT_APP_GA}`);

ReactDOM.render(<Ozon />, document.getElementById("root"));
