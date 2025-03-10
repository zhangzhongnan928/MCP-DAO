import React from 'react';
import { PrivyProvider as PrivyAuthProvider } from '@privy-io/react-auth';

// Get the App ID from environment variables
const PRIVY_APP_ID = process.env.REACT_APP_PRIVY_APP_ID || '';

// Check if a valid App ID is provided
const isValidAppId = PRIVY_APP_ID !== '' && PRIVY_APP_ID !== 'YOUR_PRIVY_APP_ID';

interface PrivyProviderProps {
  children: React.ReactNode;
}

const PrivyProvider: React.FC<PrivyProviderProps> = ({ children }) => {
  // If no valid App ID is provided, just render children without Privy
  if (!isValidAppId) {
    console.warn('No valid Privy App ID provided. Authentication is disabled.');
    console.info('To enable Privy authentication, create a .env file with REACT_APP_PRIVY_APP_ID=your_app_id_here');
    return <>{children}</>;
  }

  return (
    <PrivyAuthProvider
      appId={PRIVY_APP_ID}
      config={{
        loginMethods: ['email', 'wallet', 'google', 'twitter'],
        appearance: {
          theme: 'light',
          accentColor: '#3f51b5', // Primary color of MCP.ai
          logo: 'https://mcp.ai/logo.png', // Replace with your actual logo URL
        },
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
      }}
    >
      {children}
    </PrivyAuthProvider>
  );
};

export default PrivyProvider; 