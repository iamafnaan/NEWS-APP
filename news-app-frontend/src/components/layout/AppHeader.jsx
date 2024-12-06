import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box 
} from '@mui/material';

const AppHeader = () => {
  return (
    <AppBar position="fixed" color="default" elevation={1}>
      <Toolbar>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          width: '100%' 
        }}>
          <img 
            src="/api/placeholder/40/40" 
            alt="News App Logo" 
            style={{ 
              width: 40, 
              height: 40, 
              borderRadius: '50%', 
              marginRight: 10 
            }} 
          />
          <Typography variant="h6" component="div">
            News App
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
