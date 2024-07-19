import * as React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import SearchIcon from "@mui/icons-material/Search";
import { FixedHeader, Profile } from "./Header.styles";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import useLocalStorage from "../../../hooks/UseLocalstorage";
import {
  SearchIconWrapper,
  Search,
  StyledInputBase,
  TypographyWrapper,
} from "./Header.styles";
import navLinksData from "../../../Json/MenuItems.json";
import { Navbar } from "../TopMenu";

const pages = ["Purchases", "Inventory", "Sales", "Reports"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

export const Header = () => {
  const [username] = useLocalStorage("username");
  const navigate = useNavigate();
  const [isSticky, setIsSticky] = React.useState(true);

  // Function to handle scroll event
  const handleScroll = () => {
    // If the user has scrolled more than 50 pixels from the top, make the header sticky
    setIsSticky(window.scrollY > 50);
  };

  // Add scroll event listener when the component mounts
  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      // Clean up the scroll event listener when the component unmounts
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    event.preventDefault();
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    event.preventDefault();
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <FixedHeader className={isSticky ? "sticky" : ""}>
      <AppBar position="static" sx={{ backgroundColor: "#DEE1E6B5" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img
              style={{
                width: "95px",
                height: "32px",
                objectFit: "cover",
                marginRight: "1rem",
              }}
              src={require("../../../assets/img/logo.png")}
              alt="logo"
            />
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <TypographyWrapper
                      sx={{
                        display: { xs: "none", md: "flex" },
                        fontWeight: 700,
                        letterSpacing: ".3rem",
                        color: "#565D6DFF",
                        textDecoration: "none",
                        textTransformation: "capitalize",
                        fontFamily: "'Mukta', sans-serif",
                      }}
                      textAlign="center"
                    >
                      {page}
                    </TypographyWrapper>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <TypographyWrapper
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </TypographyWrapper>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: '#565D6DFF', display: 'block', textTransform: 'capitalize', fontFamily: "'Mukta', sans-serif" }}
              >
                {page}
              </Button>
            ))} */}
              <Navbar navLinksData={navLinksData} />
            </Box>
            <Box>
              <NotificationsIcon style={{ color: "#4a2495" }} />
            </Box>
            <Box sx={{ marginRight: 4 }}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon sx={{ color: "#BDC1CAFF" }} />
                </SearchIconWrapper>
                <StyledInputBase
                  sx={{ color: "#BDC1CAFF" }}
                  placeholder="Search…"
                  inputProps={{
                    "aria-label": "search",
                    backgroundColor: "#F3F4F6FF",
                  }}
                />
              </Search>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <AccountCircleIcon
                  fontSize="large"
                  style={{ color: "#4a2495" }}
                />
                <Profile onClick={handleOpenUserMenu}>{username}</Profile>
              </Box>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={
                      setting === "Logout" ? handleLogout : handleCloseUserMenu
                    }
                  >
                    <TypographyWrapper textAlign="center">
                      {setting}
                    </TypographyWrapper>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </FixedHeader>
  );
};

// font-family: 'Mukta', sans-serif
