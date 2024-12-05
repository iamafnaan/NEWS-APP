import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { LoginForm } from './components/Auth/LoginForm';
import Dash from './pages/Dash';
import { auth }   from './components/firebase'; // Firebase auth import
import { onAuthStateChanged } from 'firebase/auth';


const App = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check session using Firebase's onAuthStateChanged
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setSession(user);  // Set user session if logged in
      } else {
        setSession(null);   // Set null session if not logged in
      }
      setLoading(false);
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return <div>Loading...</div>;
    }

    // Redirect to login if session is null
    return session ? children : <Navigate to="/auth" replace />;
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/auth" element={<LoginForm />} />

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
            session ? <Navigate to="/dash" /> : <Navigate to="/auth" />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
