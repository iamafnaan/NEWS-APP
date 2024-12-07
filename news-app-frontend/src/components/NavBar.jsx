import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Box, 
  Container, 
  Tooltip 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {
  const { logout } = useAuth();
  
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <AppBar position="sticky" color="primary" elevation={4}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography 
            variant="h5" 
            component="div" 
            sx={{ 
              fontWeight: 600, 
              letterSpacing: 1,
              display: { xs: 'none', sm: 'block' }
            }}
          >
            News Insights
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip >

                
            </Tooltip>
            
            <Tooltip title="Logout">
              <Button 
                color="inherit" 
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
                variant="outlined"
                sx={{ 
                  borderColor: 'rgba(255,255,255,0.5)', 
                  '&:hover': { 
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)' 
                  }
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