import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { RouteGuard } from "../utils/RouteGuard";
import { getAPIs, postAPIs } from "../utils/Apis";
import { ICartItem } from "../Interfaces/ICartItem";
import { ICartUpdate } from "../Interfaces/ICartUpdate";
import { useNavigate } from "react-router-dom";

interface IProductProps {
  productId: string | null;
  updateHook?: any;
}

const initialCartItem: ICartUpdate = {
  productID: "",
  quantity: 0,
};

function ProductCount(props: IProductProps) {
  const userInfo = RouteGuard.localStorageLoading();
  const token = userInfo.token;
  const navigator = useNavigate();
  const [disableBtn, setDisableBtn] = useState(false);
  const [count, setCount] = useState(0);
  const [cartItem, setCartItem] = useState(initialCartItem);

  const increaseCount = () => {
    setDisableBtn(true);
    updateItemInCart(count + 1);
  };

  const decreaseCount = () => {
    if (count - 1 >= 0) {
      setDisableBtn(true);
      updateItemInCart(count - 1);
    }
  };

  // get the product count in current user's cart
  const getCartProductCount = () => {
    fetch(getAPIs.getUserCart, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      if (res.status === 200) {
        return res.json().then((res) => {
          const product = (res.data.items as ICartItem[]).find((product) => {
            return product.product._id === props.productId;
          });
          setDisableBtn(false);
          if (product) {
            setCount(product.quantity);
            setCartItem({
              productID: product.product._id,
              quantity: product.quantity,
            });
          } else {
            setCount(0);
            setCartItem({
              productID: props.productId!,
              quantity: 0,
            });
          }
        });
      }
    });
  };

  // update quantity of item in the cart
  const updateItemInCart = (newCount: number) => {
    if (token) {
      fetch(postAPIs.updateCart, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ ...cartItem, quantity: newCount }),
      }).then((res) => {
        getCartProductCount();
        if (props.updateHook) {
          props.updateHook();
        }
      });
    } else {
      // the guest should be navigate to login page if click the button
      navigator("/login");
    }
  };

  useEffect(() => {
    getCartProductCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.productId]);

  return (
    <Box
      sx={{
        py: 1,
      }}
      display={"flex"}
      alignItems={"center"}
    >
      <Button
        disabled={disableBtn}
        size={"small"}
        variant={"contained"}
        sx={{
          minWidth: "max-content",
        }}
        onClick={decreaseCount}
      >
        −
      </Button>
      <Typography
        sx={{
          mx: 2,
        }}
        variant={"body1"}
      >
        {count}
      </Typography>
      <Button
        disabled={disableBtn}
        size={"small"}
        variant={"contained"}
        sx={{
          minWidth: "max-content",
        }}
        onClick={increaseCount}
      >
        +
      </Button>
    </Box>
  );
}

export default ProductCount;
