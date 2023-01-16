import { makeStyles, createStyles } from "@material-ui/styles";
// import interface for component Props and Theme

const useStyles = makeStyles(() =>
  createStyles({
    Main: {
      padding: "100px",
      fontSize: "38px",
      zIndex: 100,
    },
    link: {
      color: "blue",
    },
    input: {
      marginBottom: "20px !important",
      fontSize: "16px !important",
    },
    error: {
      color: "red",
    },
  })
);

export default useStyles;
