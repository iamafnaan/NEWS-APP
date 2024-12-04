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
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff, Mail, Lock } from "@mui/icons-material";
import { authService } from "../../services/authService";

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
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setError(""); // Clear errors when switching tabs
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await authService.signIn(email, password);
      navigate("/dashboard");
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
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      await authService.signUp(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError("");

    try {
      await authService.signInWithGoogle();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="background.default"
      px={2}
    >
      <Box
        maxWidth={400}
        width="100%"
        bgcolor="background.paper"
        borderRadius={2}
        p={3}
        boxShadow={4}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Welcome to the App
        </Typography>
        <Typography variant="body2" align="center" color="textSecondary" gutterBottom>
          Sign in or register to get started
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Tabs value={activeTab} onChange={handleTabChange} centered sx={{ mb: 3 }}>
          <Tab label="Login" />
          <Tab label="Register" />
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
                    <Mail fontSize="small" />
                  </InputAdornment>
                ),
              }}
              disabled={isLoading}
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
                    <Lock fontSize="small" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setSignInPasswordVisible(!signInPasswordVisible)}
                      size="small"
                      edge="end"
                    >
                      {signInPasswordVisible ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              disabled={isLoading}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isLoading}
              sx={{ mt: 2 }}
            >
              {isLoading ? "Loading..." : "Sign In"}
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
                    <Mail fontSize="small" />
                  </InputAdornment>
                ),
              }}
              disabled={isLoading}
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
                    <Lock fontSize="small" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setSignUpPasswordVisible(!signUpPasswordVisible)}
                      size="small"
                      edge="end"
                    >
                      {signUpPasswordVisible ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              disabled={isLoading}
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
                    <Lock fontSize="small" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                      size="small"
                      edge="end"
                    >
                      {confirmPasswordVisible ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              disabled={isLoading}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isLoading}
              sx={{ mt: 2 }}
            >
              {isLoading ? "Loading..." : "Sign Up"}
            </Button>
          </form>
        )}

        <Button
          fullWidth
          variant="outlined"
          color="secondary"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          sx={{ mt: 3 }}
        >
          Continue with Google
        </Button>
      </Box>
    </Box>
  );
}
