import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { getAPIs } from "../../utils/Apis";
import { RouteGuard } from "../../utils/RouteGuard";
import { ICart } from "../../Interfaces/ICart";
import CartSummary from "./CartSummary";

const emptyCart: ICart = {
  totalPrice: 0,
  totalQuantity: 0,
  totalShippingCost: 0,
  totalTaxes: 0,
  items: [],
};

function CartPage() {
  const [cart, setCart] = useState(emptyCart);

  const getUserCart = () => {
    const userInfo = RouteGuard.localStorageLoading();
    const token = userInfo.token;
    if (token) {
      fetch(getAPIs.getUserCart, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }).then((res) => {
        if (res.status === 200) {
          res.json().then((res) => {
            setCart(res.data as ICart);
          });
        }
      });
    }
  };

  useEffect(() => {
    getUserCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container
      sx={{
        p: 3,
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          {cart.items.length === 0 ? (
            <Card>
              <CardContent>
                <Typography
                  variant={"body1"}
                  sx={{
                    mt: 1,
                  }}
                >
                  There's no product in your shopping cart
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <></>
          )}
          {cart.items.map((cartItem) => (
            <CartItem
              updateHook={getUserCart}
              key={cartItem.product._id}
              item={cartItem}
            />
          ))}
        </Grid>
        <Grid item xs={12} lg={4}>
          <CartSummary cart={cart} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default CartPage;
