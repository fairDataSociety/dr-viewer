/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import useStyles from "./consentReceiptStyles";
// @ts-ignore
import { ConsentViewer } from "@datafund/consent-viewer";
import { openPod } from "../../api/pod.api";
import {
  createDirectory,
  downloadFile,
  saveConsentBase64,
} from "../../api/file.api";
import SessionContext, { User } from "../../context/session";
export interface Props {
  match: {
    params: RouteParams;
  };
  location: {
    search: string;
  };
}
type RouteParams = {
  username: string;
  pod: string;
  directory: string;
  name: string;
  data: string;
};

function ConsentReceipt(props: Props) {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(SessionContext);
  const classes = useStyles({ ...props, ...theme });
  const [file, setFile] = useState<Blob | null>(null);
  const [dataRes, setDataRes] = useState(null);
  const [error, setError] = useState<unknown>(null);

  const tryOpenPod = async (pod: string) => {
    try {
      await openPod(pod, (user as User).password as string);
    } catch (error) {
      // pod might be already open
    }
  };

  const tryCreateDirectory = async (pod: string, directory: string) => {
    try {
      await createDirectory(pod, directory);
    } catch (error) {}
  };

  const handleError = (error: unknown) => {
    console.error(error);
    localStorage.setItem("password", "");
    setDataRes(null);
    setError(error);
  };

  const saveFile = async (data: string, newPassword?: string) => {
    try {
      const { pod, directory, name } = props.match.params;

      await tryOpenPod(pod);

      if (directory) {
        await tryCreateDirectory(pod, directory);
      }

      const file = await saveConsentBase64(pod, directory, name, data);

      setFile(file);
    } catch (error) {
      handleError(error);
    }
  };

  const loadFile = async () => {
    try {
      const { pod, directory, name } = props.match.params;

      await tryOpenPod(pod);

      const file = await downloadFile(pod, directory, name);
      setFile(file);
    } catch (error) {
      handleError(error);
    }
  };

  const init = async () => {
    if (!user) {
      return;
    }
    const data = new URLSearchParams(props.location.search).get("data");

    if (data) {
      return saveFile(data);
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
      {error && <div>Error: {String(error)}</div>}
    </div>
  );
}

export default React.memo(ConsentReceipt);
