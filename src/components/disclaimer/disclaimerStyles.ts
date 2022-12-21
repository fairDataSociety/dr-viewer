import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "../../store/themeContext/themes";

const useStyles = makeStyles(() =>
  createStyles({
    box: {
      border: (style: Theme) => `2px solid ${style.backgroundShade}`,
      margin: "10px",
      padding: "10px",
    },
  })
);

export default useStyles;
