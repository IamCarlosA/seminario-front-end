import React from "react";

export interface Ally {
  name: string;
  image: React.ReactElement;
  link: string;
  logoOnly?: boolean;
}
