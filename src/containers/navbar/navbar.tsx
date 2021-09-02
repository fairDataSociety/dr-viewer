import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import useStyles from "./navbarStyles";
import {
  ListPodsComponent,
  OpenPodComponent,
} from "fd-t-p";
export interface Props {
  file: any;
  setShowSaveModal: any;
  showSaveModal: any;
  setPodName: any;
}

function Navbar(props: Props) {
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });
  const [password, setPassword] = useState("");
  const [pods, setPods] = useState([]);
  const { setShowSaveModal, setPodName, showSaveModal } = props;
  useEffect(() =>{
     if(localStorage.getItem("password")){
      const pass = localStorage.getItem("password");
      setPassword(pass !== null && pass !== undefined? pass: "");
    }
    if(password) {
      localStorage.setItem("password", password);
    }
  },[password]);
  return (
    <div className={classes.Navbar}>
      {password && (
        <div className={classes.buttonPill}>
          <ListPodsComponent setPod={setPods}></ListPodsComponent>
        </div>
      )}
      {password && (
        <div
          className={classes.buttonPill}
          onClick={() => {
            setShowSaveModal(!showSaveModal);
          }}
        >
          Store receipt
        </div>
      )}
      {pods &&
        pods.map((pod: any) => {
          return (
            <div
              className={classes.buttonPill}
              onClick={() => {
                setPodName(pod);
              }}
            >
              <OpenPodComponent
                password={password}
                podName={pod}
              ></OpenPodComponent>
            </div>
          );
        })}
      
    </div>
  );
}

export default React.memo(Navbar);
