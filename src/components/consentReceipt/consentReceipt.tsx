/* eslint-disable react-hooks/exhaustive-deps */
import { FetchFileComponent, LoginComponent } from 'fd-t-p';
import React, { useContext, useState } from "react";
import { useEffect } from 'react';
import { ThemeContext } from "../../store/themeContext/themeContext";
import useStyles from "./consentReceiptStyles";
// @ts-ignore
import { ConsentViewer } from "@datafund/consent-viewer";
export interface Props {
  match: {
    params: RouteParams;
  };
}
type RouteParams = { username: string, pod: string, directory:string, name: string };

function ConsentReceipt(props: Props) {
  const { theme } = useContext(ThemeContext);

  const classes = useStyles({ ...props, ...theme });
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState('');
  const [dataRes, setDataRes] = useState(null);
  const readJSON = async() =>{
          const req = await  URL.createObjectURL(file);
          const res = await fetch(req);
          setDataRes(JSON.parse(await res.text()))
  }
  useEffect(()=>{
    if(file){
      readJSON();
    }
    console.log(password);
    if(password) {
      localStorage.removeItem("password");
    }

  },[ file, localStorage]);
 
  return (
    <div className={classes.BoilerPlate}>
    {!password && (
        <LoginComponent setUserPassword={setPassword}></LoginComponent>
    )}
    {password &&  <FetchFileComponent password={password!== null? password: ""} setFile={setFile} fileName={props.match.params.name} directory={props.match.params.directory} podName={props.match.params.pod} ></FetchFileComponent>}
     {password && dataRes &&
        <ConsentViewer data={ dataRes }></ConsentViewer>
     }
    </div>
  );
}

export default React.memo(ConsentReceipt);
