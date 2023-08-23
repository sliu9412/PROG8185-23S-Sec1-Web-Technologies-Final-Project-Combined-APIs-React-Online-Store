import {
  Card,
  CardContent,
  Grid,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import React from "react";
import { IOrderItem } from "../../Interfaces/IOrderItem";

interface OrderItemProps {
  product: IOrderItem;
}

function OrderItem(props: OrderItemProps) {
  const product = props.product;

  return (
    <Card
      variant={"outlined"}
      sx={{
        mb: 1,
      }}
    >
      <CardContent>
        <Grid container>
          <Grid
            item
            xs={4}
            lg={2}
            sx={{
              minHeight: {
                lg: "150px",
                xs: "90px",
              },
            }}
          >
            <CardMedia
              image={product.productImage}
              sx={{
                height: "100%",
              }}
            />
          </Grid>
          <Grid item xs={8} lg={10} display={"flex"} alignItems={"center"}>
            <Grid
              container
              sx={{
                px: 3,
                py: 1,
              }}
            >
              <Grid item xs={12} lg={8}>
                <Typography
                  noWrap
                  sx={{
                    width: "100%",
                  }}
                  variant={"h5"}
                  variantMapping={{ h4: "h2" }}
                >
                  {product.productName}
                </Typography>
                <Box display={"flex"} alignItems={"center"}>
                  <Typography
                    sx={{
                      mr: 1,
                    }}
                    variant={"h6"}
                    variantMapping={{ h6: "h3" }}
                  >
                    {"$" + product.productPrice.toFixed(2)}
                  </Typography>
                  /
                  <Typography
                    sx={{
                      ml: 1,
                    }}
                    variant={"body1"}
                  >
                    {product.productDescription}
                  </Typography>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                lg={4}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography variant={"body2"}>
                  Quantity: {product.productQuantity}
                </Typography>
                <Typography variant={"body2"}>
                  Total Price: {"$" + product.productTotalPrice.toFixed(2)}
                </Typography>
                <Typography variant={"body2"}>
                  Tax: {"$" + product.productTotalTaxes.toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default OrderItem;
