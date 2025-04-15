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
import { Link } from "react-router-dom";
import { routes } from "../../navigation/routes/routes";

const pages = [
  { name: "Spending", path: routes.SPENDINGS },
  { name: "Budget", path: routes.BUDGET },
  { name: "Data", path: routes.DATA },
];
const login = [
  { name: "Login", path: routes.HOME },
  { name: "Register", path: routes.REGISTER },
];

export const AppNavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar color="primary" position="static">
      <Container maxWidth="xl">
        <Toolbar>
          {/* this part is responsible for burger on smaller screens */}
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
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Link
                    className={styles.smallScreenDropdownLinkstyles}
                    to={page.path}
                  >
                    <Typography>{page.name}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
            <Box className={styles.smallScreenAuthMenu}>
              {login.map((page) => (
                <MenuItem
                  sx={{ padding: 0 }}
                  key={page.name}
                  onClick={handleCloseNavMenu}
                >
                  <Link className={styles.smallScreenLinkStyles} to={page.path}>
                    <Typography>{page.name}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Box>
          </Box>

          {/* this one gives links to larger screens */}
          <Box className={styles.largerScreenBox}>
            <Box className={styles.largeScreenLogoBox}>
              <AdbIcon sx={{ mr: 1 }} fontSize="large" />
            </Box>
            {pages.map((page) => (
              <Link
                className={styles.largeScreenLinkStyles}
                to={page.path}
                key={page.name}
                onClick={handleCloseNavMenu}
              >
                {page.name}
              </Link>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
