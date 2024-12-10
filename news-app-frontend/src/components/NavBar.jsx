import React, { useState } from "react";
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Box, 
  TextField, 
  Slide 
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import LogoImage from "../../src/assets/Logo.jpeg";

const NavBar = ({ onSearchSubmit }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearchSubmit(searchQuery);
      setIsSearchOpen(false);
    }
  };

  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{ 
          backgroundColor: '#000', 
          color: '#fff', 
          fontFamily: '"Manrope","Times New Roman", Times, serif',
          width: '100vw',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: 2 }}>
          {/* Logo and Title */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <img
              src={LogoImage}
              alt="Logo"
              style={{
                width: '42px',
                height: '40px',
                objectFit: 'contain',
                borderRadius: '50%',
              }}
            />
            <Typography 
              variant="h5" 
              component="div" 
              sx={{ 
                fontWeight: 700, 
                letterSpacing: 1,
                fontFamily: '"Times New Roman", Times, serif' 
              }}
            >
              Global Gazette
            </Typography>
          </Box>

          {/* Search and Logout Icons */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton 
              color="inherit" 
              onClick={handleSearchToggle}
              sx={{ mr: 2 }}
            >
              <SearchIcon />
            </IconButton>
            
            <IconButton 
              color="inherit" 
              onClick={handleLogout}
            >
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Search Input Field */}
      <Slide direction="down" in={isSearchOpen} mountOnEnter unmountOnExit>
        <Box 
          component="form" 
          onSubmit={handleSearchSubmit}
          sx={{ 
            width: '100%', 
            backgroundColor: '#f4f4f4', 
            p: 2, 
            display: 'flex', 
            justifyContent: 'center' 
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ 
              maxWidth: 600, 
              '& .MuiOutlinedInput-root': { 
                borderRadius: 0,
                backgroundColor: '#fff' 
              } 
            }}
            InputProps={{
              endAdornment: (
                <IconButton type="submit">
                  <SearchIcon />
                </IconButton>
              )
            }}
          />
        </Box>
      </Slide>
    </>
  );
};

export default NavBar;
