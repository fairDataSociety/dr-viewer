import { makeStyles, createStyles } from "@material-ui/styles";

const useStyles = makeStyles(() =>
  createStyles({
    form: {
      minWidth: "500px",
      margin: "30px",
      display: "flex",
      flexDirection: "column",
    },
    message: {
      fontSize: "16px !important",
      marginBottom: "20px !important",
    },
    button: {
      marginTop: "20px !important",
      fontSize: "16px !important",
      height: "40px",
    },
  })
);

export default useStyles;
