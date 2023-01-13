/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Dialog, TextField, Typography } from "@material-ui/core";
import React, { useContext, useState } from "react";
import SessionContext from "../../context/session";
import { ThemeContext } from "../../store/themeContext/themeContext";
import useStyles from "./loginStyles";

function Login() {
  const { theme } = useContext(ThemeContext);
  const { login } = useContext(SessionContext);
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
    <Dialog open={true}>
      <div className={classes.Main}>
        Please login:
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
      </div>
    </Dialog>
  );
}

export default Login;
