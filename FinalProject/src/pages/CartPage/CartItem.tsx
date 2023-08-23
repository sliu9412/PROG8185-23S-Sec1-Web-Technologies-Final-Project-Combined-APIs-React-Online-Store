import {
  Card,
  Grid,
  CardMedia,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ProductCount from "../../components/ProductCount";
import { ICartItem } from "../../Interfaces/ICartItem";

interface CartItempProps {
  item: ICartItem;
  updateHook: any;
}

function CartItem(props: CartItempProps) {
  const cartItem = props.item;
  const theme = useTheme();
  const lgScreen = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Card
      variant={"outlined"}
      sx={{
        mb: 2,
      }}
    >
      <Grid container>
        <Grid
          item
          xs={4}
          lg={3}
          sx={{
            minHeight: {
              lg: "150px",
              xs: "90px",
            },
          }}
        >
          <CardMedia
            image={cartItem?.product?.image}
            sx={{
              height: "100%",
            }}
          />
        </Grid>
        <Grid item xs={8} lg={9} display={"flex"} alignItems={"center"}>
          <Grid
            container
            sx={{
              px: 3,
              py: 1,
            }}
          >
            <Grid item xs={12} lg={6}>
              <Typography
                noWrap
                sx={{
                  width: "100%",
                }}
                variant={"h5"}
                variantMapping={{ h4: "h2" }}
              >
                {cartItem?.product?.name}
              </Typography>
              <Box display={"flex"} alignItems={"center"}>
                <Typography
                  sx={{
                    mr: 1,
                  }}
                  variant={"h6"}
                  variantMapping={{ h6: "h3" }}
                >
                  {cartItem?.product?.price}
                </Typography>
                /
                <Typography
                  sx={{
                    ml: 1,
                  }}
                  variant={"body1"}
                >
                  {cartItem?.product?.description}
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              lg={6}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: lgScreen ? "end" : "start",
              }}
            >
              <ProductCount
                updateHook={props.updateHook}
                productId={cartItem?.product?._id}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

export default CartItem;
