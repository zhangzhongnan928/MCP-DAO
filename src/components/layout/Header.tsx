import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Box, 
  Menu, 
  MenuItem, 
  Avatar, 
  Divider,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  AccountCircle, 
  Storage, 
  Dashboard, 
  AddCircle, 
  HowToVote, 
  ChevronRight,
  Logout
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { usePrivy } from '@privy-io/react-auth';

// Check if a valid Privy App ID is provided
const isPrivyConfigured = process.env.REACT_APP_PRIVY_APP_ID && 
  process.env.REACT_APP_PRIVY_APP_ID !== '' && 
  process.env.REACT_APP_PRIVY_APP_ID !== 'YOUR_PRIVY_APP_ID';

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  
  // Always call hooks at the top level
  const privyAuth = usePrivy();
  
  // Mock authentication state when Privy is not configured
  const [mockAuthenticated, setMockAuthenticated] = useState(false);
  
  // Privy authentication or mock authentication
  let authenticated = false;
  let ready = true;
  let user = null;
  let login = () => setMockAuthenticated(true);
  let logout = () => setMockAuthenticated(false);
  
  // Use Privy if configured
  if (isPrivyConfigured) {
    authenticated = privyAuth.authenticated;
    ready = privyAuth.ready;
    user = privyAuth.user;
    login = privyAuth.login;
    logout = privyAuth.logout;
  } else {
    // Use mock authentication
    authenticated = mockAuthenticated;
    console.warn('Privy is not configured. Using mock authentication.');
  }
  
  // States for user menu and mobile drawer
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  // Handle user menu
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  // Toggle mobile drawer
  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };
  
  // Handle login/logout
  const handleLogin = () => {
    login();
  };
  
  const handleLogout = () => {
    logout();
    handleClose();
  };
  
  // Navigation items
  const navItems = [
    { text: 'Servers & Apps', icon: <Storage color="primary" />, path: '/servers' },
    { text: 'Growth Dashboard', icon: <Dashboard color="primary" />, path: '/dashboard' },
    { text: 'Submit', icon: <AddCircle color="primary" />, path: '/submit' },
    { text: 'DAO', icon: <HowToVote color="primary" />, path: '/dao' },
  ];
  
  // Mobile drawer content
  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={() => toggleDrawer(false)}>
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          p: 2, 
          backgroundColor: 'primary.main',
          color: 'white'
        }}
      >
        <Typography variant="h6" component="div">
          MCP.ai
        </Typography>
        <IconButton 
          sx={{ ml: 'auto', color: 'white' }} 
          onClick={() => toggleDrawer(false)}
        >
          <ChevronRight />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem 
            key={item.text} 
            component={Link} 
            to={item.path}
            disablePadding
          >
            <ListItemButton sx={{ py: 1.5 }}>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {authenticated ? (
          <>
            <ListItem component={Link} to="/profile" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AccountCircle color="primary" />
                </ListItemIcon>
                <ListItemText primary="My Profile" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                  <Logout color="primary" />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogin}>
              <ListItemText primary="Login / Register" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );
  
  // Wait for Privy to be ready
  if (isPrivyConfigured && !ready) {
    return null; // Or a loading indicator
  }
  
  return (
    <>
      <AppBar position="fixed" elevation={1} color="default" sx={{ backgroundColor: 'white' }}>
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Typography 
            variant="h6" 
            component={Link} 
            to="/"
            sx={{ 
              flexGrow: 0, 
              fontWeight: 700, 
              color: 'primary.main', 
              textDecoration: 'none',
              mr: 3
            }}
          >
            MCP.ai
          </Typography>
          
          {!isMobile && (
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
              {navItems.map((item) => (
                <Button 
                  key={item.text}
                  component={Link}
                  to={item.path}
                  color="inherit"
                  sx={{ mx: 1 }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}
          
          <Box sx={{ flexGrow: isMobile ? 1 : 0 }} />
          
          {authenticated ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {(isPrivyConfigured && user?.wallet) || !isPrivyConfigured ? (
                <Button 
                  color="primary" 
                  variant="outlined" 
                  startIcon={<HowToVote />}
                  sx={{ mr: 2, display: { xs: 'none', sm: 'flex' } }}
                >
                  25 MCP Tokens
                </Button>
              ) : null}
              <IconButton
                size="large"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar 
                  sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}
                >
                  <AccountCircle />
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={() => {navigate('/profile'); handleClose();}}>
                  My Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          ) : (
            <Button 
              color="primary" 
              variant="contained" 
              onClick={handleLogin}
            >
              Login / Register
            </Button>
          )}
        </Toolbar>
      </AppBar>
      
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
      >
        {drawer}
      </Drawer>
      
      {/* Toolbar placeholder to prevent content from hiding behind the AppBar */}
      <Toolbar />
    </>
  );
};

export default Header; 