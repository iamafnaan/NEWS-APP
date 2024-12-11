import React, { useState, useEffect } from "react";
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
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  const formatDateTime = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); 
    return {
      date: date.toLocaleDateString(undefined, options),
      time: time
    };
  };

  const { date, time } = formatDateTime(currentDateTime);

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
        <Toolbar sx={{ 
          justifyContent: 'space-between', 
          px: 2, 
          display: 'flex', 
          alignItems: 'center' 
        }}>
          
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

          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton 
              color="inherit" 
              onClick={handleSearchToggle}
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

          
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'flex-end', 
              position: 'absolute', 
              right: 8, 
              top: '50%', 
              transform: 'translateY(-50%)',
              mr: 17
            }}
          >
            <Typography variant="body2" sx={{ fontSize: '0.85rem', color: '#ccc' }}>
              {date}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1rem', fontWeight: 500 }}>
              {time}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      
      <Slide direction="down" in={isSearchOpen} mountOnEnter unmountOnExit>
        <Box 
          component="form" 
          onSubmit={handleSearchSubmit}
          sx={{ 
            width: '100%', 
            backgroundColor: '#f4f4f4', 
            paddingTop: 10, 
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