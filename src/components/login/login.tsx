/* eslint-disable react-hooks/exhaustive-deps */
import { Button, TextField, Typography } from "@material-ui/core";
import React, { useContext, useState } from "react";
import SessionContext from "../../context/session";
import { ThemeContext } from "../../store/themeContext/themeContext";
import Disclaimer from "../disclaimer/disclaimer";
import useStyles from "./loginStyles";

function Login() {
  const { theme } = useContext(ThemeContext);
  const { login, user } = useContext(SessionContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const classes = useStyles({ ...theme });

  const onLogin = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);
      setError(null);

      await login(username, password);
    } catch (error) {
      console.error(error);
      setError(String(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.Main}>
      {user ? (
        <div>Please provide file path to the URL to access your consent.</div>
      ) : (
        <>
          Welcome to Receipt viewer, to open the consent please login:
          <form>
            <TextField
              label="Username"
              variant="outlined"
              className={classes.input}
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              className={classes.input}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              fullWidth
              required
            />
            {error && (
              <Typography
                variant="body1"
                align="center"
                className={classes.error}
              >
                {error}
              </Typography>
            )}
            <Button
              color="primary"
              variant="contained"
              type="submit"
              size="large"
              disabled={loading}
              onClick={onLogin}
            >
              Login
            </Button>
          </form>
        </>
      )}

      <Disclaimer />
    </div>
  );
}

export default Login;
