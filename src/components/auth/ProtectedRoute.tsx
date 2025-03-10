import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { usePrivy } from '@privy-io/react-auth';
import { Box, CircularProgress, Typography } from '@mui/material';

// Check if a valid Privy App ID is provided
const isPrivyConfigured = process.env.REACT_APP_PRIVY_APP_ID && 
  process.env.REACT_APP_PRIVY_APP_ID !== '' && 
  process.env.REACT_APP_PRIVY_APP_ID !== 'YOUR_PRIVY_APP_ID';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const [mockAuthenticated, setMockAuthenticated] = useState(false);
  
  // Always call hooks at the top level
  const privyAuth = usePrivy();
  
  // For demo purposes, auto-authenticate after 1 second when Privy is not configured
  useEffect(() => {
    if (!isPrivyConfigured) {
      const timer = setTimeout(() => {
        setMockAuthenticated(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Use Privy if configured, otherwise use mock authentication
  let ready = true;
  let authenticated = mockAuthenticated;
  
  if (isPrivyConfigured) {
    ready = privyAuth.ready;
    authenticated = privyAuth.authenticated;
  } else {
    console.warn('Privy is not configured. Using mock authentication for protected routes.');
  }

  if (!isPrivyConfigured && !authenticated) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', flexDirection: 'column' }}>
        <CircularProgress size={40} sx={{ mb: 2 }} />
        <Typography variant="h6">Mock authentication in progress...</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          (Privy is not configured, using mock authentication)
        </Typography>
      </Box>
    );
  }

  if (isPrivyConfigured && !ready) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', flexDirection: 'column' }}>
        <CircularProgress size={40} sx={{ mb: 2 }} />
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  if (isPrivyConfigured && !authenticated) {
    // Redirect to the login page with a return url
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute; 