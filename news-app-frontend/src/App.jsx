
import React, { useState, useEffect } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate 
} from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Dash from './pages/Dash';
import OAuthCallback from './components/Auth/OauthCallBack';
import { supabase } from './utils/supaBaseClient';

const App = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check initial session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);

      // Listen for auth state changes
      const { data: authListener } = supabase.auth.onAuthStateChange(
        (event, session) => {
          setSession(session);
        }
      );

      // Cleanup subscription
      return () => {
        authListener.subscription.unsubscribe();
      };
    };

    checkSession();
  }, []);

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return <div>Loading...</div>; // Or a loading spinner
    }

    return session ? children : <Navigate to="/auth" replace />;
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/auth/callback" element={<OAuthCallback />} />
        
        {/* Protected Routes */}
        <Route 
          path="/dash" 
          element={
            <ProtectedRoute>
              <Dash />
            </ProtectedRoute>
          } 
        />
        
        {/* Default Route */}
        <Route 
          path="/" 
          element={
            session ? <Navigate to="/dashboard" /> : <Navigate to="/auth" />
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;