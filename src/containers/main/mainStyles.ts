import { makeStyles, createStyles } from "@material-ui/styles";

const useStyles = makeStyles(() =>
  createStyles({
    Main: {
      padding:"100px",
      fontSize: '38px'
    },
    link:{
      color: "blue"
    }
  })
);

export default useStyles;
