import { Card, CardContent, Typography, Button } from "@mui/material";
import React from "react";
import { ICart } from "../../Interfaces/ICart";
import { postAPIs } from "../../utils/Apis";
import { RouteGuard } from "../../utils/RouteGuard";
import { AlertDialog } from "../../utils/AlertDialog";

interface CartSummaryProps {
  cart: ICart;
}

function CartSummary(props: CartSummaryProps) {
  const alertDialog = new AlertDialog();
  const { cart } = props;

  const placeOrder = () => {
    const userInfo = RouteGuard.localStorageLoading();
    const token = userInfo.token;
    if (cart.totalQuantity > 0 && token) {
      alertDialog.setTitle("Confirm");
      alertDialog.setContent("Are you sure you want to place order?");
      alertDialog.setActions([
        () => {
          fetch(postAPIs.placeOrder, {
            method: "POST",
            headers: {
              Authorization: "Bearer " + token,
            },
          }).then((res) => {
            if (res.status === 200) {
              alertDialog.setTitle("Purchase Successfully");
              alertDialog.setContent(
                "Your order is on the way, please wait for the delivery"
              );
              alertDialog.setActions([
                () => {
                  window.location.reload();
                },
              ]);
              alertDialog.openDialog();
            } else {
              alertDialog.setTitle("Alert");
              alertDialog.setContent(
                "Place order failed, please try again later"
              );
              alertDialog.openDialog();
            }
          });
        },
      ]);
      alertDialog.openDialog();
    }
  };

  return (
    <Card variant={"outlined"}>
      {alertDialog.generateJSX()}
      <CardContent>
        <Typography
          sx={{
            mb: 1,
          }}
          variant={"h6"}
        >
          Summary
        </Typography>
        <Typography
          sx={{
            mb: 1,
          }}
          variant={"body1"}
        >
          Total Price: {"$" + cart.totalPrice.toFixed(2)}
        </Typography>
        <Typography
          sx={{
            mb: 1,
          }}
          variant={"body1"}
        >
          Total Quantity: {cart.totalQuantity}
        </Typography>
        <Typography
          sx={{
            mb: 1,
          }}
          variant={"body1"}
        >
          Total Taxes: {"$" + cart.totalTaxes.toFixed(2)}
        </Typography>
        <Typography
          sx={{
            mb: 2,
          }}
          variant={"body1"}
        >
          Total Pay: {"$" + (cart.totalTaxes + cart.totalPrice).toFixed(2)}
        </Typography>
        <Button variant="contained" onClick={placeOrder}>
          Place order
        </Button>
      </CardContent>
    </Card>
  );
}

export default CartSummary;
