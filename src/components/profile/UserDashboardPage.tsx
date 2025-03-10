import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  Tabs,
  Tab,
  Chip,
  LinearProgress,
  Stack,
  IconButton,
  Tooltip,
  useTheme
} from '@mui/material';
import {
  Person,
  Edit,
  HowToVote,
  History,
  Star,
  AddCircle,
  Comment,
  Share,
  ArrowUpward,
  ArrowDownward,
  CheckCircle,
  Cancel,
  Pending,
  BarChart,
  Wallet
} from '@mui/icons-material';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend
} from 'recharts';
import { usePrivy } from '@privy-io/react-auth';
import { useNavigate } from 'react-router-dom';

// Check if a valid Privy App ID is provided
const isPrivyConfigured = process.env.REACT_APP_PRIVY_APP_ID && 
  process.env.REACT_APP_PRIVY_APP_ID !== '' && 
  process.env.REACT_APP_PRIVY_APP_ID !== 'YOUR_PRIVY_APP_ID';

// Define a type for our mock user
interface MockUser {
  email?: { address: string };
  wallet?: { address: string };
}

// Tab interface
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// TabPanel component
const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const UserDashboardPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  
  // Always call hooks at the top level
  const privyAuth = usePrivy();
  
  // Mock authentication state when Privy is not configured
  const [mockAuthenticated] = useState(true);
  const mockUser: MockUser = {
    email: { address: 'demo@mcp.ai' },
    wallet: { address: '0x1234567890abcdef' }
  };
  
  // Use Privy if configured, otherwise use mock authentication
  let ready = true;
  let authenticated = mockAuthenticated;
  let user: MockUser | null = mockUser;
  
  // Redirect if not authenticated (for both Privy and mock auth)
  useEffect(() => {
    if (privyAuth.ready && !privyAuth.authenticated) {
      navigate('/');
    }
  }, [privyAuth.ready, privyAuth.authenticated, navigate]);
  
  if (isPrivyConfigured) {
    ready = privyAuth.ready;
    authenticated = privyAuth.authenticated;
    user = privyAuth.user;
  } else {
    console.warn('Privy is not configured. Using mock user data for UserDashboardPage.');
  }
  
  // Mock data for user profile
  const userProfile = {
    username: user?.email?.address || user?.wallet?.address?.slice(0, 8) + '...' || 'MCP User',
    avatar: '', // No avatar from Privy, using default
    joinDate: new Date().toLocaleDateString(),
    tokenBalance: 25,
    votingPower: 25,
    contributions: [
      { id: 1, type: 'server', name: 'MCP Server v1.2', status: 'approved', date: '2023-06-15', tokensEarned: 10 },
      { id: 2, type: 'review', name: 'Review for LLaMA Server', status: 'pending', date: '2023-06-20', tokensEarned: 0 },
      { id: 3, type: 'proposal', name: 'Governance Proposal #12', status: 'active', date: '2023-06-25', tokensEarned: 5 },
      { id: 4, type: 'server', name: 'Claude Integration', status: 'rejected', date: '2023-06-10', tokensEarned: 0 },
    ],
    tokenHistory: [
      { date: '2023-01', amount: 5 },
      { date: '2023-02', amount: 8 },
      { date: '2023-03', amount: 12 },
      { date: '2023-04', amount: 15 },
      { date: '2023-05', amount: 20 },
      { date: '2023-06', amount: 25 },
    ],
    tokenDistribution: [
      { name: 'Submissions', value: 12 },
      { name: 'Reviews', value: 8 },
      { name: 'Governance', value: 5 },
    ],
    leaderboard: [
      { rank: 1, username: 'alice_ai', tokens: 120, avatar: '' },
      { rank: 2, username: 'bob_llm', tokens: 95, avatar: '' },
      { rank: 3, username: 'charlie_mcp', tokens: 82, avatar: '' },
      { rank: 4, username: 'dave_model', tokens: 78, avatar: '' },
      { rank: 5, username: 'eve_context', tokens: 65, avatar: '' },
    ]
  };
  
  // If not ready or not authenticated, show loading
  if (isPrivyConfigured && (!ready || !authenticated)) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <Typography variant="h5">Loading profile...</Typography>
        </Box>
      </Container>
    );
  }
  
  // COLORS for charts
  const COLORS = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main
  ];
  
  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return theme.palette.success.main;
      case 'pending':
        return theme.palette.warning.main;
      case 'rejected':
        return theme.palette.error.main;
      default:
        return theme.palette.info.main;
    }
  };
  
  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle fontSize="small" />;
      case 'pending':
        return <Pending fontSize="small" />;
      case 'rejected':
        return <Cancel fontSize="small" />;
      default:
        return <CheckCircle fontSize="small" />;
    }
  };
  
  // Get contribution icon
  const getContributionIcon = (type: string) => {
    switch (type) {
      case 'submission':
        return <AddCircle color="primary" />;
      case 'review':
        return <Comment color="secondary" />;
      case 'vote':
        return <HowToVote color="success" />;
      case 'share':
        return <Share color="info" />;
      default:
        return <Star color="warning" />;
    }
  };
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* User Profile Section */}
        <Grid item xs={12} md={4}>
          <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
              <Avatar 
                src={userProfile.avatar} 
                sx={{ width: 100, height: 100, mb: 2, bgcolor: 'primary.main' }}
              >
                {!userProfile.avatar && <Person fontSize="large" />}
              </Avatar>
              <Typography variant="h5" gutterBottom>
                {userProfile.username}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Member since {userProfile.joinDate}
              </Typography>
              <Button 
                variant="outlined" 
                startIcon={<Edit />} 
                size="small" 
                sx={{ mt: 1 }}
              >
                Edit Profile
              </Button>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Box>
              <Typography variant="h6" gutterBottom>
                Token Balance
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <HowToVote color="primary" sx={{ mr: 1 }} />
                <Typography variant="h4" color="primary.main">
                  {userProfile.tokenBalance}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  MCP Tokens
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Voting Power: {userProfile.votingPower}
              </Typography>
            </Box>
          </Paper>
        </Grid>
        
        {/* Token Balance Section */}
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2, mb: 4 }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: theme.palette.primary.main, 
                      width: 56, 
                      height: 56,
                      mr: 2
                    }}
                  >
                    <Wallet sx={{ fontSize: 30 }} />
                  </Avatar>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Your Token Balance
                    </Typography>
                    <Typography variant="h3" color="primary" sx={{ fontWeight: 700 }}>
                      {userProfile.tokenBalance} MCP
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Stack direction="row" spacing={2}>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth
                  >
                    Use Tokens
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    fullWidth
                  >
                    Transfer
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Paper>
          
          {/* Tabs Section */}
          <Paper elevation={2} sx={{ borderRadius: 2 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              aria-label="dashboard tabs"
            >
              <Tab label="Contributions" icon={<Star />} iconPosition="start" />
              <Tab label="Token History" icon={<History />} iconPosition="start" />
              <Tab label="Leaderboard" icon={<BarChart />} iconPosition="start" />
            </Tabs>
            
            {/* Contributions Tab */}
            <TabPanel value={tabValue} index={0}>
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Your Contributions
                </Typography>
                <List>
                  {userProfile.contributions.map((contribution) => (
                    <Paper 
                      key={contribution.id} 
                      variant="outlined" 
                      sx={{ 
                        mb: 2, 
                        borderRadius: 2,
                        borderLeft: `4px solid ${getStatusColor(contribution.status)}`
                      }}
                    >
                      <ListItem
                        secondaryAction={
                          <Box sx={{ textAlign: 'right' }}>
                            <Chip 
                              icon={getStatusIcon(contribution.status)}
                              label={contribution.status}
                              size="small"
                              sx={{ 
                                mb: 1,
                                bgcolor: getStatusColor(contribution.status),
                                color: 'white'
                              }}
                            />
                            <Typography 
                              variant="body2" 
                              color={contribution.tokensEarned > 0 ? 'success.main' : 'text.secondary'}
                              sx={{ display: 'block' }}
                            >
                              {contribution.tokensEarned > 0 ? `+${contribution.tokensEarned} MCP` : 'Pending'}
                            </Typography>
                          </Box>
                        }
                      >
                        <ListItemIcon>
                          {getContributionIcon(contribution.type)}
                        </ListItemIcon>
                        <ListItemText
                          primary={contribution.name}
                          secondary={
                            <>
                              <Typography variant="caption" color="text.secondary">
                                {contribution.date}
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                    </Paper>
                  ))}
                </List>
                
                <Box sx={{ mt: 3, textAlign: 'center' }}>
                  <Button variant="outlined">
                    View All Contributions
                  </Button>
                </Box>
              </Box>
            </TabPanel>
            
            {/* Token History Tab */}
            <TabPanel value={tabValue} index={1}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                  <Typography variant="h6" gutterBottom>
                    Token History
                  </Typography>
                  <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={userProfile.tokenHistory}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <RechartsTooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="amount" 
                          name="Tokens Earned" 
                          stroke={theme.palette.success.main} 
                          activeDot={{ r: 8 }} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" gutterBottom>
                    Token Distribution
                  </Typography>
                  <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={userProfile.tokenDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {userProfile.tokenDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <RechartsTooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                  
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Total Earned: {userProfile.tokenHistory.reduce((a, b) => a + b.amount, 0)} MCP
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </TabPanel>
            
            {/* Leaderboard Tab */}
            <TabPanel value={tabValue} index={2}>
              <Typography variant="h6" gutterBottom>
                Top Contributors
              </Typography>
              <List>
                {userProfile.leaderboard.map((user) => (
                  <Paper 
                    key={user.rank} 
                    variant="outlined" 
                    sx={{ 
                      mb: 2, 
                      borderRadius: 2,
                      bgcolor: user.username === userProfile.username ? 'primary.light' : 'transparent',
                      color: user.username === userProfile.username ? 'white' : 'inherit'
                    }}
                  >
                    <ListItem>
                      <ListItemIcon>
                        <Avatar 
                          sx={{ 
                            bgcolor: user.rank <= 3 ? 'warning.main' : 'grey.400',
                            color: 'white',
                            fontWeight: 'bold'
                          }}
                        >
                          {user.rank}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemAvatar sx={{ minWidth: 40 }}>
                        <Avatar alt={user.username}>
                          {user.username.charAt(0).toUpperCase()}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography 
                            variant="subtitle1" 
                            color={user.username === userProfile.username ? 'inherit' : 'text.primary'}
                          >
                            {user.username}
                            {user.username === userProfile.username && ' (You)'}
                          </Typography>
                        }
                      />
                      <Typography 
                        variant="h6" 
                        color={user.username === userProfile.username ? 'inherit' : 'primary'}
                        sx={{ fontWeight: 'bold' }}
                      >
                        {user.tokens} MCP
                      </Typography>
                    </ListItem>
                  </Paper>
                ))}
              </List>
              
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Button variant="outlined">
                  View Full Leaderboard
                </Button>
              </Box>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Earn More Tokens Section */}
      <Paper 
        elevation={0} 
        sx={{ 
          mt: 6, 
          p: 4, 
          borderRadius: 2,
          backgroundColor: theme.palette.primary.main,
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Typography variant="h5" gutterBottom>
          Earn More MCP Tokens
        </Typography>
        <Typography variant="body1" paragraph sx={{ maxWidth: 800, mx: 'auto' }}>
          Contribute to the MCP ecosystem by submitting content, reviewing submissions, 
          participating in governance, or sharing MCP.ai with your network.
        </Typography>
        <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
          <Grid item>
            <Button 
              variant="contained" 
              color="secondary" 
              startIcon={<AddCircle />}
              sx={{ px: 3 }}
            >
              Submit Content
            </Button>
          </Grid>
          <Grid item>
            <Button 
              variant="outlined" 
              sx={{ 
                px: 3, 
                color: 'white', 
                borderColor: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
              startIcon={<Share />}
            >
              Share MCP.ai
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default UserDashboardPage; 