import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
  Tooltip,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";

const Navbar = ({ searchQuery, handleSearch }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
      }}
      elevation={4}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: 64,
          }}
        >
          {/* Logo and App Title */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: 600,
                letterSpacing: 1,
                mr: 2,
              }}
            >
              News App
            </Typography>
          </Box>

          {/* Search Bar */}
          <Box sx={{ flexGrow: 1, mx: 3 }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search news..."
              fullWidth
              value={searchQuery}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                style: { backgroundColor: "white", borderRadius: 4 },
              }}
            />
          </Box>

          {/* Buttons: Theme Toggle and Logout */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Tooltip title="Toggle Theme">
              <IconButton color="inherit">
                <Brightness4Icon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Logout">
              <Button
                color="inherit"
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
                variant="outlined"
                sx={{
                  borderColor: "rgba(255,255,255,0.5)",
                  "&:hover": {
                    borderColor: "white",
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                Logout
              </Button>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
