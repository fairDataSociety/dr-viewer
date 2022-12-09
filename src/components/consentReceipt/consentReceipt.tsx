/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import useStyles from "./consentReceiptStyles";
// @ts-ignore
import { ConsentViewer } from "@datafund/consent-viewer";
import { openPod } from "../../api/pod.api";
import { downloadFile } from "../../api/file.api";
import { userStats } from "../../api/user.api";
import PasswordModal from "../passwordModal/passwordModal";
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

  const classes = useStyles({ ...props, ...theme });
  const [file, setFile] = useState<Blob | null>(null);
  const [dataRes, setDataRes] = useState(null);
  const [password, setPassword] = useState<string | null>(null);
  const [openPassModal, setOpenPassModal] = useState(false);

  const isLoggedIn = async (): Promise<boolean> => {
    try {
      await userStats();
      return true;
    } catch (error) {
      localStorage.setItem("password", "");
      return false;
    }
  };

  const loadFile = async (newPassword?: string) => {
    try {
      const { pod, directory, name } = props.match.params;
      try {
        await openPod(pod, newPassword || (password as string));
      } catch (error) {
        // pod might be already open
      }
      const file = await downloadFile(pod, directory, name);
      setFile(file);
    } catch (error) {
      localStorage.setItem("password", "");
    }
  };

  const loadPassword = (): boolean => {
    const password = localStorage.getItem("password");

    if (password) {
      setPassword(password);
      return true;
    }

    return false;
  };

  const onPasswordEnter = (password: string) => {
    setPassword(password);
    setOpenPassModal(false);
    localStorage.setItem("password", password);
    loadFile(password);
  };

  const init = async () => {
    const loggedIn = await isLoggedIn();
    if (!loggedIn) {
      // react-router-dom types are causing an error
      document.location.href = "/";
      return;
    }

    if (!loadPassword()) {
      return setOpenPassModal(true);
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
  }, []);

  useEffect(() => {
    if (file) {
      readJSON();
    }
  }, [file]);

  return (
    <div className={classes.BoilerPlate}>
      {openPassModal && <PasswordModal onPasswordEnter={onPasswordEnter} />}
      {dataRes && <ConsentViewer data={dataRes}></ConsentViewer>}
    </div>
  );
}

export default React.memo(ConsentReceipt);
