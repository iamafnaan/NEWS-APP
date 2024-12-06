import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import { AuthProvider } from '../context/AuthContext';

import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import { LoginForm } from './components/Auth/LoginForm';

// const LoginForm = lazy(() => import('./components/Auth/LoginForm'));
// // const Home = lazy(() => import('./pages/Home'));
// const Navbar = lazy(() => import('./components/NavBar'));

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense 
          fallback={
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
              <CircularProgress />
            </Box>
          }
        >
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route 
              path="/home" 
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } 
            />
            <Route path="/" element={<Home />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;