import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import PrivyProvider from './providers/PrivyProvider';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Layout
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './components/home/HomePage';
import ServersListPage from './components/servers/ServersListPage';
import ServerDetailPage from './components/servers/ServerDetailPage';
import DashboardPage from './components/dashboard/DashboardPage';
import SubmitPage from './components/submit/SubmitPage';
import AdminReviewPage from './components/submit/AdminReviewPage';
import DAOPage from './components/dao/DAOPage';
import UserDashboardPage from './components/profile/UserDashboardPage';

// Theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
      light: '#757de8',
      dark: '#002984',
    },
    secondary: {
      main: '#f50057',
      light: '#ff4081',
      dark: '#c51162',
    },
    background: {
      default: '#fafafa',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

function App() {
  return (
    <PrivyProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Header />
          <main style={{ minHeight: 'calc(100vh - 140px)', paddingTop: '64px' }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/servers" element={<ServersListPage />} />
              <Route path="/servers/:id" element={<ServerDetailPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/submit" element={
                <ProtectedRoute>
                  <SubmitPage />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminReviewPage />
                </ProtectedRoute>
              } />
              <Route path="/dao" element={
                <ProtectedRoute>
                  <DAOPage />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <UserDashboardPage />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </Router>
      </ThemeProvider>
    </PrivyProvider>
  );
}

export default App;
