import React, { useContext } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import useStyles from "./disclaimerStyles";

const Disclaimer = () => {
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...theme });

  return (
    <div className={classes.box}>
      Disclaimer: Account integrity persistence and security are not assured.
      Expect that funds used for account might be lost, as well as any data the
      account uses.
    </div>
  );
};

export default Disclaimer;
