import { Box, Typography, useTheme } from "@mui/material";
import React from "react";

function Footer() {
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;

  return (
    <Box
      color={"#fff"}
      sx={{
        backgroundColor: primaryColor,
        py: 2,
      }}
    >
      <Typography variant={"body2"} textAlign={"center"}>
        @Copyright {new Date().getFullYear()} Designed by
        sliu9412@conestogac.on.ca <br />
        powered by MUI
      </Typography>
    </Box>
  );
}

export default Footer;
