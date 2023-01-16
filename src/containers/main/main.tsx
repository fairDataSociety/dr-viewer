import React, { useContext } from "react";
import useStyles from "./mainStyles";

import { ThemeContext } from "../../store/themeContext/themeContext";
import Disclaimer from "../../components/disclaimer/disclaimer";

export interface Props {}

export default function Main(props: Props) {
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });

  return (
    <div className={classes.Main}>
      Welcome to Receipt viewer, to open the consent please login.
      <Disclaimer />
    </div>
  );
}
