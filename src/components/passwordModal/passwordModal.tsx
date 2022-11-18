import React, { useContext, useState } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import useStyles from "./passwordModalStyles";
import { Button, Dialog, TextField, Typography } from "@material-ui/core";

export interface Props {
  onPasswordEnter: (password: string) => void;
}

function PasswordModal({ onPasswordEnter }: Props) {
  const { theme } = useContext(ThemeContext);
  const classes = useStyles(theme);
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    if (!password) {
      return;
    }
    onPasswordEnter(password);
  };

  return (
    <Dialog open={true} aria-labelledby="password-modal">
      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <Typography variant="h5" className={classes.message}>
          Please enter your password:
        </Typography>
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.button}
        >
          Confirm
        </Button>
      </form>
    </Dialog>
  );
}

export default React.memo(PasswordModal);
