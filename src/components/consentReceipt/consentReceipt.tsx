/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import useStyles from "./consentReceiptStyles";
// @ts-ignore
import { ConsentViewer } from "@datafund/consent-viewer";
import { openPod } from "../../api/pod.api";
import { downloadFile } from "../../api/file.api";
import SessionContext, { User } from "../../context/session";
export interface Props {
  match: {
    params: RouteParams;
  };
}
type RouteParams = {
  username: string;
  pod: string;
  directory: string;
  name: string;
};

function ConsentReceipt(props: Props) {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(SessionContext);
  const classes = useStyles({ ...props, ...theme });
  const [file, setFile] = useState<Blob | null>(null);
  const [dataRes, setDataRes] = useState(null);

  const loadFile = async (newPassword?: string) => {
    try {
      const { pod, directory, name } = props.match.params;
      try {
        await openPod(pod, newPassword || ((user as User).password as string));
      } catch (error) {
        // pod might be already open
      }
      const file = await downloadFile(pod, directory, name);
      setFile(file);
    } catch (error) {
      localStorage.setItem("password", "");
    }
  };

  const init = async () => {
    if (!user) {
      return;
    }
    loadFile();
  };

  const readJSON = async () => {
    const req = await URL.createObjectURL(
      file as unknown as Blob | MediaSource
    );
    const res = await fetch(req);
    setDataRes(JSON.parse(await res.text()));
  };

  useEffect(() => {
    init();
  }, [user]);

  useEffect(() => {
    if (file) {
      readJSON();
    }
  }, [file]);

  return (
    <div className={classes.BoilerPlate}>
      {dataRes && <ConsentViewer data={dataRes}></ConsentViewer>}
    </div>
  );
}

export default React.memo(ConsentReceipt);
