import { Box, Button, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getAPIs, putAPIs } from "../utils/Apis";
import { RouteGuard } from "../utils/RouteGuard";
import { AlertDialog } from "../utils/AlertDialog";
import { IUser } from "../Interfaces/IUser";
import { useNavigate } from "react-router-dom";

function AccountPage() {
  const alertDialog = new AlertDialog();
  const navigator = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");

  const userNameInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const emailInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const passwordInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const confirmPasswordInputHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  const addressInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  // when loading this page, get user info by token and uid
  const loadUserInfo = () => {
    if (!RouteGuard.haveLogined) {
      alertDialog.setTitle("Error");
      alertDialog.setContent("You have no access to update this account");
      alertDialog.openDialog();
    } else {
      const userInfo = RouteGuard.localStorageLoading();
      const token = userInfo.token;
      const uid = userInfo.user?._id ? userInfo.user._id : "";
      const url = getAPIs.getUserById.replace("{uid}", uid);
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          if (res.status !== 200) {
            alertDialog.setTitle("Error");
            alertDialog.setContent("Get user information failed");
            alertDialog.openDialog();
            return false;
          } else {
            return res.json();
          }
        })
        .then((res) => {
          const data: IUser = res.data;
          setName(data.name);
          setUsername(data.username);
          setEmail(data.email);
          setAddress(data.shippingAddress);
        });
    }
  };

  // when click the update button
  const updateHandler = () => {
    alertDialog.setTitle("Update Account Failed");
    if (!password) {
      alertDialog.setContent("Please enter the password");
      alertDialog.openDialog();
    } else if (password.length <= 4) {
      alertDialog.setContent("Password length should greater than 4");
      alertDialog.openDialog();
    } else if (password !== confirmPassword) {
      alertDialog.setContent(
        "The confirm password is different than the password"
      );
      alertDialog.openDialog();
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      alertDialog.setContent("Invalid email address");
      alertDialog.openDialog();
    } else {
      const userInfo = RouteGuard.localStorageLoading();
      const token = userInfo.token;
      const uid = userInfo.user?._id ? userInfo.user._id : "";
      const url = putAPIs.updateAccountById.replace("{uid}", uid);
      fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          name,
          username,
          email,
          password,
          shippingAddress: address,
        } as IUser),
      }).then((res) => {
        if (res.status !== 200) {
          res.json().then((res) => {
            alertDialog.setContent(res.errors[0].msg);
            alertDialog.openDialog();
          });
        } else {
          alertDialog.setTitle("Update Account Successfully");
          alertDialog.setContent("You account information has been updated");
          alertDialog.openDialog();
        }
      });
    }
  };

  // when click the delete button
  const deleteHandler = () => {
    alertDialog.setTitle("Confirm");
    alertDialog.setContent("Are you sure you want to logout?");
    alertDialog.setActions([
      () => {
        RouteGuard.clearLocalStorage();
        navigator("/");
        window.location.reload();
      },
    ]);
    alertDialog.openDialog();
  };

  useEffect(() => {
    loadUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container
      maxWidth={"md"}
      sx={{
        p: 3,
      }}
    >
      {alertDialog.generateJSX()}
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        sx={{
          height: "80vh",
        }}
      >
        <Typography
          variant={"h4"}
          variantMapping={{ h4: "h1" }}
          sx={{
            mb: 3,
          }}
        >
          Account Management
        </Typography>
        <TextField
          sx={{
            mb: 2,
          }}
          id="account-username"
          fullWidth
          label="Username"
          value={username}
          onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
            userNameInputHandler(event);
          }}
        />
        <TextField
          sx={{
            mb: 2,
          }}
          id="account-email"
          fullWidth
          label="Email Address"
          value={email}
          onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
            emailInputHandler(event);
          }}
        />
        <TextField
          sx={{
            mb: 2,
          }}
          id="account-password"
          fullWidth
          type={"password"}
          label="Password"
          value={password}
          onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
            passwordInputHandler(event);
          }}
        />
        <TextField
          sx={{
            mb: 2,
          }}
          id="account-confirm-password"
          fullWidth
          type={"password"}
          label="Confirm Password"
          value={confirmPassword}
          onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
            confirmPasswordInputHandler(event);
          }}
        />
        <TextField
          sx={{
            mb: 2,
          }}
          id="account-address"
          fullWidth
          label="Shipping Address"
          value={address}
          onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
            addressInputHandler(event);
          }}
        />
        <Box>
          <Button variant={"contained"} onClick={updateHandler}>
            Update
          </Button>
          <Button
            sx={{
              ml: 2,
            }}
            variant={"contained"}
            color={"error"}
            onClick={deleteHandler}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default AccountPage;
