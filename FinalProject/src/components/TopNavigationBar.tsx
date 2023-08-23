import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { RouteGuard } from "../utils/RouteGuard";

// pages names
const pages = ["Products", "Cart", "Orders", "Account"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const navigate = useNavigate();
  const haveLogined = RouteGuard.haveLogined;

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const navigateToPage = (page: string) => {
    handleCloseNavMenu();
    navigate(page);
  };

  const toolbarGreeting = () => {
    if (haveLogined) {
      const userInfo = RouteGuard.localStorageLoading();
      if (userInfo.user?.name) {
        return `Hello, ${userInfo.user.username}`;
      }
      return "";
    }
    return "";
  };

  return (
    <AppBar position={"sticky"}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            onClick={() => navigateToPage("/")}
            sx={{
              display: {
                xs: "none",
                md: "block",
              },
              py: 1,
              pl: 2,
              pr: 5,
            }}
          >
            <img alt="logo" src="/assets/images/logo.svg" height={"50px"} />
          </Box>

          {/* mobile nav */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => navigateToPage(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            onClick={() => navigateToPage("/")}
            sx={{
              display: {
                xs: "block",
                md: "none",
              },
              flexGrow: 1,
              textAlign: "center",
              marginLeft: "-48px",
              py: 1,
            }}
          >
            <img alt="logo" src="/assets/images/logo.svg" height={"50px"} />
          </Box>

          {/* pc nav */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              alignItems: "center",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => navigateToPage(page)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Typography sx={{ whiteSpace: "nowrap" }}>
            {toolbarGreeting()}
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
