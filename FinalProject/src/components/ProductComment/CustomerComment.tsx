import { Card, CardContent, Grid, Rating, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAPIs } from "../../utils/Apis";
import { IComment } from "../../Interfaces/IComment";

interface CustomerCommentProps {
  productId: string | undefined;
}

const emptyCommentList: IComment[] = [];

function CustomerComment(props: CustomerCommentProps) {
  const [commentList, setCommentList] = useState(emptyCommentList);

  // get comments of the product
  const getCommentsByProductId = () => {
    if (props.productId) {
      const url = getAPIs.getCommentsByProductId.replace(
        "{pid}",
        props.productId
      );
      fetch(url, {
        method: "GET",
      }).then((res) => {
        if (res.status === 200) {
          res.json().then((res) => {
            const comments = res.data[0]?.reviews as IComment[];
            if (comments) {
              setCommentList(comments);
            }
          });
        }
      });
    }
  };

  useEffect(() => {
    getCommentsByProductId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.productId]);

  return (
    <Grid
      container
      spacing={1}
      sx={{
        py: 3,
      }}
    >
      {commentList.length <= 0 ? (
        <Grid item xs={12}>
          <Card variant="outlined" sx={{ display: "flex" }}>
            <CardContent
              sx={{
                pt: 3,
              }}
            >
              <Typography
                sx={{
                  paddingLeft: "3px",
                }}
                variant={"h6"}
              >
                There's no comment for this product
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ) : (
        <></>
      )}
      {commentList.map((comment) => (
        <Grid key={comment._id} item xs={12}>
          <Card variant="outlined" sx={{ display: "flex" }}>
            <CardContent>
              <Typography
                sx={{
                  paddingLeft: "3px",
                }}
                variant={"h6"}
              >
                {comment.username}
              </Typography>
              <Rating readOnly value={comment.rating} />
              <Typography
                sx={{
                  paddingLeft: "3px",
                }}
                variant={"body2"}
              >
                {comment.comment}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default CustomerComment;
