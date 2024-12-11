import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Alert, 
  TextField, 
  Button, 
  Tab, 
  Tabs, 
  Typography, 
  Box, 
  InputAdornment, 
  IconButton 
} from "@mui/material";
import { Visibility, VisibilityOff, Mail, Lock } from "@mui/icons-material";
import { useAuth } from '../../../context/AuthContext';
import Logo from "../../../src/assets/Logo.jpeg"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [signInPasswordVisible, setSignInPasswordVisible] = useState(false);
  const [signUpPasswordVisible, setSignUpPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  
  const { login, register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setError("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await login(email, password);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      await register(email, password);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box 
      sx={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {/* Left Side - Web App Name and Logo */}
      <Box 
        sx={{
          width: '50%',
          height: '100%',
          backgroundColor: 'black',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 0,
          boxSizing: 'border-box',
        }}
      >
        <Box 
          sx={{
            width: 200,
            height: 200,
            backgroundColor: 'white',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 3,
            overflow: 'hidden',
          }}
        >
          <img 
            src={Logo} 
            alt="Global Gazette Logo" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>
        <Typography 
          variant="h2" 
          sx={{ 
            fontWeight: 'bold', 
            textAlign: 'center',
            margin: 0,
            marginBottom: 1,
          }}
        >
          Global Gazette
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            textAlign: 'center', 
            color: 'grey.400',
            margin: 0,
          }}
        >
          Your Window to the World
        </Typography>
      </Box>

      {/* Right Side - Login/Signup Form */}
      <Box 
        sx={{
          width: '50%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          padding: 0,
          boxSizing: 'border-box',
        }}
      >
        <Box maxWidth={400} width="100%">
          <Typography 
            variant="h4" 
            align="center" 
            gutterBottom
            sx={{ fontWeight: 'bold', margin: 0 }}
          >
            Welcome Back
          </Typography>
          <Typography 
            variant="body1" 
            align="center" 
            color="textSecondary" 
            gutterBottom
            sx={{ margin: 0 }}
          >
            Sign in or register to continue
          </Typography>

          {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}

          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            centered
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: 'black',
              },
            }}
          >
            <Tab 
              label="Login" 
              sx={{
                '&.Mui-selected': {
                  color: 'black',
                  fontWeight: 'bold',
                },
              }}
            />
            <Tab 
              label="Register" 
              sx={{
                '&.Mui-selected': {
                  color: 'black',
                  fontWeight: 'bold',
                },
              }}
            />
          </Tabs>

          {activeTab === 0 && (
            <form onSubmit={handleSignIn}>
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Password"
                fullWidth
                margin="normal"
                type={signInPasswordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setSignInPasswordVisible(!signInPasswordVisible)}
                        edge="end"
                      >
                        {signInPasswordVisible ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ 
                  marginTop: 2,
                  backgroundColor: 'black',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'grey.800',
                  },
                }}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Sign In"}
              </Button>
              <Button
                fullWidth
                variant="outlined"
                sx={{ 
                  marginTop: 2,
                  borderColor: 'black',
                  color: 'black',
                  '&:hover': {
                    backgroundColor: 'grey.100',
                  },
                }}
                onClick={handleGoogleSignIn}
              >
                Sign in with Google
              </Button>
            </form>
          )}

          {activeTab === 1 && (
            <form onSubmit={handleSignUp}>
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Password"
                fullWidth
                margin="normal"
                type={signUpPasswordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setSignUpPasswordVisible(!signUpPasswordVisible)}
                        edge="end"
                      >
                        {signUpPasswordVisible ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Confirm Password"
                fullWidth
                margin="normal"
                type={confirmPasswordVisible ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                        edge="end"
                      >
                        {confirmPasswordVisible ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ 
                  marginTop: 2,
                  backgroundColor: 'black',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'grey.800',
                  },
                }}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Sign Up"}
              </Button>
            </form>
          )}
        </Box>
      </Box>
    </Box>
  );
}
