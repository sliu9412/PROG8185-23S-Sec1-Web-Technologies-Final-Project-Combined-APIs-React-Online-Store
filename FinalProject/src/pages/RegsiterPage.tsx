import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { postAPIs } from "../utils/Apis";
import { AlertDialog } from "../utils/AlertDialog";
import LoginRegisterSkeleton from "../components/LoginRegisterSkeleton";
import { Link, useNavigate } from "react-router-dom";
import { IRegister } from "../Interfaces/IRegister";

function RegisterPage() {
  const navigator = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const emailInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const usernameInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const addressInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const passwordInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const confirmPasswordInputHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  const alertDialog = new AlertDialog();

  const registerHandler = () => {
    alertDialog.setTitle("Alert");
    alertDialog.setActions([]);
    if (email && username && address && password && confirmPassword) {
      if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        alertDialog.setContent("Invalid email format");
        alertDialog.openDialog();
      } else if (password !== confirmPassword) {
        alertDialog.setContent(
          "The confirm password is different than the password"
        );
        alertDialog.openDialog();
      } else {
        fetch(postAPIs.register, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: Date.now().toString(),
            email,
            username,
            password,
            shippingAddress: address,
          } as IRegister),
        }).then((res) => {
          if (res.status !== 201) {
            res.json().then((res) => {
              alertDialog.setContent(res.error);
              alertDialog.openDialog();
            });
          } else {
            return res.json().then((res) => {
              alertDialog.setTitle(res.message);
              alertDialog.setContent(
                "Your account has been registered successfully"
              );
              alertDialog.setActions([
                () => {
                  navigator("/login");
                },
              ]);
              alertDialog.openDialog();
            });
          }
        });
      }
    } else {
      alertDialog.setContent("Please fill the form to register");
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
          Register
        </Typography>
        <Typography variant={"body1"} sx={{ mb: 2 }}>
          Already have an account? <Link to="/login">Click here to login</Link>
        </Typography>
        <Box>
          <TextField
            required
            sx={{
              mb: 2,
            }}
            fullWidth
            id="email"
            label="Email Address"
            variant="outlined"
            value={email}
            onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
              emailInputHandler(event);
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
            id="shipping-address"
            label="Shipping Address"
            variant="outlined"
            value={address}
            onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
              addressInputHandler(event);
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
        <Box>
          <TextField
            required
            sx={{
              mb: 2,
            }}
            fullWidth
            type={"password"}
            id="confirm-password"
            label="Confirm Password"
            variant="outlined"
            value={confirmPassword}
            onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
              confirmPasswordInputHandler(event);
            }}
          />
        </Box>

        <Button onClick={registerHandler} variant="contained">
          Register
        </Button>
      </Box>
    </LoginRegisterSkeleton>
  );
}

export default RegisterPage;
