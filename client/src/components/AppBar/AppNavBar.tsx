import * as React from "react";
import styles from "./AppNavBar.module.scss";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../navigation/routes/routes";
import { FormControlLabel, Switch } from "@mui/material";
import { useStore } from "zustand";
import { useAppContext } from "../../context/appContext";

const pages = [
  { name: "Spending", path: routes.SPENDING },
  { name: "Budget", path: routes.BUDGET },
  { name: "Data", path: routes.DATA },
];
const login = [
  { name: "Login", path: routes.HOME },
  { name: "Register", path: routes.REGISTER },
];

export const AppNavBar = () => {
  const { setDarkMode, darkMode, user, logout } = useStore(useAppContext);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const navLinks = user ? pages : login;

  return (
    <AppBar color="primary" position="static">
      <Container maxWidth="xl">
        <Toolbar>
          {/* SMALL SCREEN BURGER MENU */}
          <Box className={styles.burgerBox}>
            <IconButton
              size="large"
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
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {[
                ...navLinks.map((page) => (
                  <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                    <Link
                      className={styles.smallScreenDropdownLinkstyles}
                      to={page.path}
                    >
                      <Typography>{page.name}</Typography>
                    </Link>
                  </MenuItem>
                )),
                user && (
                  <MenuItem
                    key="logout"
                    onClick={() => {
                      logout();
                      handleCloseNavMenu();
                      navigate(routes.HOME);
                    }}
                  >
                    <Typography>Logout</Typography>
                  </MenuItem>
                ),
              ]}
            </Menu>
          </Box>

          {/* LARGE SCREEN NAVIGATION */}
          <Box className={styles.largerScreenBox}>
            <Box className={styles.largeScreenLogoBox}>
              <AdbIcon sx={{ mr: 1 }} fontSize="large" />
            </Box>
            <>
              {navLinks.map((page) => (
                <Link
                  className={styles.largeScreenLinkStyles}
                  to={page.path}
                  key={page.name}
                  onClick={handleCloseNavMenu}
                >
                  {page.name}
                </Link>
              ))}
              {user && (
                <button
                  onClick={() => {
                    logout();
                    navigate(routes.HOME);
                  }}
                  className={`${styles.largeScreenLinkStyles} ${styles.logoutButton}`}
                >
                  Logout
                </button>
              )}
            </>
          </Box>

          {/* DARK MODE TOGGLE */}
          <FormControlLabel
            control={<Switch onChange={setDarkMode} checked={darkMode} />}
            label={darkMode ? "Dark Mode" : "Light Mode"}
            labelPlacement="end"
            sx={{ ml: 2, whiteSpace: "nowrap" }}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
