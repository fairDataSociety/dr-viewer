import { typography, Typography } from "./typography";

export interface Theme {
  name: string;
  textColor: string;
  background1: string;
  backgroundShade: string;
  background2: string;
  typography: Typography;
}

export const themes = {
  dark: {
    name: "dark",
    textColor: "white",
    background1: "#242424",
    backgroundShade: "#333333",
    background2: "grey",
    typography,
  },
  light: {
    name: "light",
    textColor: "black",
    background1: "white",
    backgroundShade: "white",
    background2: "grey",
    typography,
  },
};
