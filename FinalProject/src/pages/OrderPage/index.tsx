import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import OrderItem from "./OrderItem";
import { useEffect, useState } from "react";
import { RouteGuard } from "../../utils/RouteGuard";
import { getAPIs } from "../../utils/Apis";
import { IOrder } from "../../Interfaces/IOrder";

const emptyOrders: IOrder[] = [];

function OrderPage() {
  const [orders, setOrders] = useState(emptyOrders);

  const getOrders = () => {
    const userInfo = RouteGuard.localStorageLoading();
    const token = userInfo.token;
    if (token) {
      fetch(getAPIs.getOrderHistory, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }).then((res) => {
        if (res.status === 200) {
          res.json().then((res) => {
            setOrders(res.data as IOrder[]);
          });
        }
      });
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Container
      sx={{
        py: 4,
      }}
    >
      {orders.length === 0 ? (
        <Card>
          <CardContent>
            <Typography
              sx={{
                mt: 1,
              }}
            >
              You have not purchased any product before
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <></>
      )}
      {orders.map((order) => {
        let totalPay = 0;
        order.orders.forEach((order) => {
          totalPay += order.productTotalPrice + order.productTotalTaxes;
        });

        return (
          <Card
            variant={"outlined"}
            sx={{
              mb: 4,
            }}
          >
            <CardContent>
              <Box
                sx={{
                  mb: 1,
                }}
              >
                <Typography variant={"h6"}>Tracking Number</Typography>
                <Typography
                  variant={"body2"}
                  sx={{
                    mb: 1,
                  }}
                >
                  {order._id}
                </Typography>
                <Typography variant={"h6"}>Total Pay</Typography>
                <Typography
                  variant={"body2"}
                  sx={{
                    mb: 1,
                  }}
                >
                  {"$" + totalPay.toFixed(2)}
                </Typography>
                <Typography variant={"h6"}>Product List</Typography>
              </Box>
              {order.orders.map((product) => (
                <OrderItem product={product} />
              ))}
            </CardContent>
          </Card>
        );
      })}
    </Container>
  );
}

export default OrderPage;
