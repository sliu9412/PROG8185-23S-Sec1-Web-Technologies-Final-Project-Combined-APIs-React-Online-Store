import { Box, Button, Container, Grid, Typography } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import React, { useEffect, useState } from "react";
import ProductCount from "../components/ProductCount";
import IProduct from "../Interfaces/IProduct";
import { useNavigate, useParams } from "react-router-dom";
import { getAPIs } from "../utils/Apis";
import { AlertDialog } from "../utils/AlertDialog";
import ProductComment from "../components/ProductComment";

const productTemplate: IProduct = {
  _id: "",
  name: "",
  description: "",
  image: "",
  price: 0,
  shippingCost: 0,
  __v: 0,
};

function CommentPage() {
  const alertDialog = new AlertDialog();
  const navigator = useNavigate();
  const { productId } = useParams();

  const [product, setProduct] = useState<IProduct>(productTemplate);
  // load product information by id
  const loadProductById = () => {
    const url = getAPIs.getProductById.replace("{pid}", productId!);
    fetch(url, {
      method: "GET",
    })
      .then((res) => {
        if (res.status !== 200) {
          alertDialog.setTitle("Get Product Failed");
          alertDialog.setContent("Please try again later");
          alertDialog.setActions([
            () => {
              navigator("/");
            },
          ]);
          alertDialog.openDialog();
          return false;
        } else {
          return res.json();
        }
      })
      .then((res) => {
        setProduct(res.data as IProduct);
      });
  };

  // when click 'Buy now' btn, jump to the cart page
  const navigateToCart = () => {
    navigator("/cart");
  };

  useEffect(() => {
    if (productId) {
      loadProductById();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container
      sx={{
        px: 3,
        py: 4,
      }}
    >
      {alertDialog.generateJSX()}
      <Grid container spacing={4}>
        <Grid item xs={12} lg={5}>
          <img
            style={{
              width: "100%",
            }}
            src={product?.image}
            alt={product?.name}
          />
        </Grid>
        <Grid item xs={12} lg={7}>
          <Typography
            sx={{
              my: 1,
            }}
            variant={"h3"}
            variantMapping={{ h3: "h1" }}
          >
            {product?.name}
          </Typography>
          <Box display={"flex"} alignItems={"center"}>
            <Typography
              sx={{
                my: 2,
              }}
              variant={"h4"}
            >
              ${product?.price}
            </Typography>
            <Typography
              sx={{
                px: 2,
              }}
              variant={"body1"}
            >
              {product?.description}
            </Typography>
          </Box>
          <hr />
          <Box
            display={"flex"}
            alignItems={"center"}
            sx={{
              pt: 2,
            }}
          >
            <InventoryIcon
              sx={{
                mr: 1,
              }}
            />
            <Typography variant={"body1"}>
              Pick up as soon as tomorrow at WATERLOO, ONTARIO
            </Typography>
          </Box>

          <Box
            display={"flex"}
            alignItems={"center"}
            sx={{
              pt: 2,
              pb: 2,
            }}
          >
            <LocalShippingIcon
              sx={{
                mr: 1,
              }}
            />
            <Typography variant={"body1"}>
              Arrives as soon as tomorrow
            </Typography>
          </Box>

          <hr />

          <Box
            sx={{
              pt: 2,
              pb: 1,
            }}
          >
            <Typography variant={"h6"}>Quantity</Typography>
            <ProductCount productId={product?._id} />
          </Box>
          <hr />
          <Box
            sx={{
              py: 2,
            }}
          >
            <Typography variant={"h6"}>My Cart</Typography>
            <Button
              sx={{
                my: 1,
              }}
              startIcon={<ShoppingCartIcon />}
              variant={"contained"}
              onClick={navigateToCart}
            >
              Buy Now
            </Button>
          </Box>
        </Grid>
      </Grid>
      <ProductComment productId={productId} />
    </Container>
  );
}

export default CommentPage;
