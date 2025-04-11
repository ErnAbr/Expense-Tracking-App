import * as React from "react";
import styles from "./appBar.module.scss";
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
import AdbIcon from "@mui/icons-material/Adb";

const pages = ["Spending", "Budget", "Data"];
const login = ["Login", "Register"];

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
    <AppBar color="secondary" position="static">
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
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
            <Box className={styles.smallScreenAuthMenu}>
              {login.map((page) => (
                <MenuItem
                  sx={{ padding: 0 }}
                  key={page}
                  onClick={handleCloseNavMenu}
                >
                  <Typography>{page}</Typography>
                </MenuItem>
              ))}
            </Box>
          </Box>

          {/* this one gives links to larger screens */}
          <Box className={styles.largerScreenBox}>
            <Box className={styles.largeScreenLogoBox}>
              <AdbIcon sx={{ mr: 1 }} />
            </Box>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "white",
                  fontSize: "1.2rem",
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
