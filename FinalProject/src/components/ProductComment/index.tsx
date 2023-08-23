import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import CustomerComment from "./CustomerComment";
import AddComment from "./AddComment";

interface CustomerCommentProps {
  productId: string | undefined;
}

function ProductComment(props: CustomerCommentProps) {
  const [value, setValue] = React.useState(1);

  const tabIndexChangeHandler = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: "100%", mt: 3 }} minHeight={"50vh"}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            onChange={tabIndexChangeHandler}
            value={value}
            aria-label="basic tabs example"
          >
            <Tab label="Comments" value={1} />
            <Tab label="Add Comment" value={2} />
          </Tabs>
        </Box>
        {value === 1 ? <CustomerComment productId={props.productId} /> : <></>}

        {value === 2 ? <AddComment productId={props.productId} /> : <></>}
      </Box>
    </>
  );
}

export default ProductComment;
