import {
  Box,
  Button,
  Card,
  CardContent,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAPIs, postAPIs } from "../../utils/Apis";
import { AlertDialog } from "../../utils/AlertDialog";
import { IMakeComment } from "../../Interfaces/IMakeComment";
import { RouteGuard } from "../../utils/RouteGuard";
import { IOrder } from "../../Interfaces/IOrder";

interface AddCommentProps {
  productId: string | undefined;
}

function AddComment(props: AddCommentProps) {
  const alertDialog = new AlertDialog();
  const userInfo = RouteGuard.localStorageLoading();
  const token = userInfo.token;
  const [commentContent, setCommentContent] = useState("");
  const [rating, setRating] = useState(0);
  const [productHasBeenPurchased, setProductHasBeenPurchased] = useState(false);

  const commentInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentContent(event.target.value);
  };

  const ratingChangeHandler = (
    event: React.SyntheticEvent<Element, Event>,
    value: number | null
  ) => {
    if (value) {
      setRating(value!);
    }
  };

  // when click the submit button
  const submitCommentHandler = () => {
    alertDialog.setActions([]);
    if (props.productId) {
      const url = postAPIs.makeComment.replace("{pid}", props.productId!);
      if (commentContent.trim().length > 0 && token) {
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            comment: commentContent,
            rating,
            images: [],
          } as IMakeComment),
        }).then((res) => {
          if (res.status === 200) {
            alertDialog.setTitle("Submit Comment Successfully");
            alertDialog.setContent("Comment submitted successfully");
            alertDialog.setActions([
              () => {
                setRating(0);
                setCommentContent("");
              },
            ]);
            alertDialog.openDialog();
          } else {
            alertDialog.setTitle("Alert");
            alertDialog.setContent("Comment submitted failed");
            alertDialog.openDialog();
          }
        });
      }
    }
  };

  // check whether the user has purchased this product
  const checkProductHasBeenPurchased = () => {
    if (token) {
      fetch(getAPIs.getOrderHistory, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }).then((res) => {
        if (res.status === 200) {
          res.json().then((res) => {
            // if there's no record of this product in the database, disallowing user to comment
            const isProductInOrderList = (res.data as IOrder[]).some(
              (order) => {
                return order.orders.some((orderItem) => {
                  return orderItem.productID === props.productId;
                });
              }
            );
            setProductHasBeenPurchased(isProductInOrderList);
          });
        }
      });
    }
  };

  useEffect(() => {
    checkProductHasBeenPurchased();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.productId]);

  return (
    <Card
      variant={"outlined"}
      sx={{
        my: 3,
      }}
    >
      {alertDialog.generateJSX()}
      <CardContent>
        <Typography
          variant={"h6"}
          sx={{
            mb: 2,
          }}
        >
          Add Comment
        </Typography>
        <TextField
          sx={{
            mb: 2,
          }}
          disabled={!productHasBeenPurchased}
          fullWidth
          multiline
          rows={5}
          value={
            productHasBeenPurchased
              ? commentContent
              : "The product can not be commented if you have not purchased it before"
          }
          onInput={commentInputHandler}
        />
        <Box
          sx={{
            mb: 2,
          }}
        >
          <Typography
            variant={"h6"}
            sx={{
              mb: 1,
            }}
          >
            Rate the Product
          </Typography>
          <Rating
            disabled={!productHasBeenPurchased}
            value={rating}
            onChange={ratingChangeHandler}
          />
        </Box>

        <Button
          disabled={!productHasBeenPurchased}
          variant={"contained"}
          onClick={submitCommentHandler}
        >
          submit
        </Button>
      </CardContent>
    </Card>
  );
}

export default AddComment;
