import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { postAPIs } from "../utils/Apis";
import { AlertDialog } from "../utils/AlertDialog";
import { RouteGuard } from "../utils/RouteGuard";
import LoginRegisterSkeleton from "../components/LoginRegisterSkeleton";
import { Link } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const usernameInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const passwordInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const alertDialog = new AlertDialog();

  // when login button is clicked
  const loginHandler = () => {
    if (username && password) {
      fetch(postAPIs.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })
        .then((res) => {
          if (res.status === 201) {
            return res.json();
          }
          return false;
        })
        .then((res) => {
          if (res) {
            RouteGuard.localStorageSaving(res.data.user, res.data.token);
            window.location.reload();
          } else {
            alertDialog.setTitle("Login Failed");
            alertDialog.setContent("Username and password are not match");
            alertDialog.openDialog();
          }
        });
    } else {
      alertDialog.setTitle("Alert");
      alertDialog.setContent("Username and password are required");
      alertDialog.openDialog();
    }
  };

  return (
    <LoginRegisterSkeleton>
      <Box
        sx={{
          width: "100%",
        }}
      >
        {alertDialog.generateJSX()}
        <Typography variant={"h4"} variantMapping={{ h4: "h1" }} sx={{ mb: 1 }}>
          Login
        </Typography>
        <Typography variant={"body1"} sx={{ mb: 2 }}>
          Do not have an account?{" "}
          <Link to={"/register"}>Click here to register</Link>
        </Typography>

        <Box>
          <TextField
            required
            sx={{
              mb: 2,
            }}
            fullWidth
            id="username"
            label="Username"
            variant="outlined"
            value={username}
            onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
              usernameInputHandler(event);
            }}
          />
        </Box>
        <Box>
          <TextField
            required
            sx={{
              mb: 2,
            }}
            fullWidth
            type={"password"}
            id="password"
            label="Password"
            variant="outlined"
            value={password}
            onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
              passwordInputHandler(event);
            }}
          />
        </Box>
        <Button onClick={loginHandler} variant="contained">
          LOGIN
        </Button>
      </Box>
    </LoginRegisterSkeleton>
  );
}

export default LoginPage;
