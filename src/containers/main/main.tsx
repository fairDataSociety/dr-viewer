import React, { useContext } from "react";
import useStyles from "./mainStyles";

import { ThemeContext } from "../../store/themeContext/themeContext";

export interface Props {

}

export default function Main(props: Props) {
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });
 
  return (
    <div className={classes.Main}>
      Welcome to Receipt viewer, to open the consent please login to <a target="_blank" className={classes.link} href="https://app.fairdrive.fairdatasociety.org/">Fairdrive app</a>
    </div>
  );
}
