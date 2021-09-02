import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "../../store/themeContext/themes";
import { Props } from "./navbar";

const useStyles = makeStyles(() =>
  createStyles({
    Navbar: {
      width: "100%",
      display: "flex",
      left: 0,
      top: 0,
      background:"#9580FF",
      border: "1px solid #16181D",
      color:"white",
    },
    modal:{
      marginTop:"100px",
      marginLeft:"calc(50% - 27.5rem)"
    },
    buttonPill: {
      // from bodyBold in Fairdrive:
      fontFamily: 'Work Sans',
      fontWeight: 'bold',
      fontSize: '13px',
      letterSpacing: '0',
      textAlign: 'center',
      boxSizing: 'border-box',
      padding: "2rem",
      borderRadius: "4px",
      cursor: 'pointer',
      border: "1px solid #16181D",
      background:"rgb(73, 75, 80)",
      "&:hover": {
        color: "#EEF0FF"
      },
    },
    // TODO How to do psuedo elements here
    // .button:active{
    //   backgroundColor: "#efd96f",
    // },
    buttontext: {
      // from bodyBold in Fairdrive:
      // fontFamily: 'Work Sans',
      fontWeight: 'bold',
      // custom
      fontFamily: 'IBM Plex Mono',
      cursor: 'pointer',
      textTransform: 'capitalize',
    },
  })
);

export default useStyles;
