import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  useTheme,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tooltip,
  IconButton,
  Stack
} from '@mui/material';
import {
  TrendingUp,
  Public,
  Code,
  Forum,
  GitHub,
  Storage,
  Apps,
  Info,
  DateRange,
  CloudDownload
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';

// Mock data for charts
const growthOverTimeData = [
  { month: 'Jan', servers: 25, apps: 78, contributors: 156 },
  { month: 'Feb', servers: 28, apps: 85, contributors: 187 },
  { month: 'Mar', servers: 32, apps: 91, contributors: 201 },
  { month: 'Apr', servers: 35, apps: 99, contributors: 228 },
  { month: 'May', servers: 39, apps: 112, contributors: 254 },
  { month: 'Jun', servers: 41, apps: 121, contributors: 290 },
  { month: 'Jul', servers: 44, apps: 125, contributors: 321 },
  { month: 'Aug', servers: 45, apps: 132, contributors: 356 },
  { month: 'Sep', servers: 45, apps: 137, contributors: 387 }
];

const githubActivityData = [
  { month: 'Jan', stars: 850, forks: 120, issues: 45 },
  { month: 'Feb', stars: 1050, forks: 145, issues: 52 },
  { month: 'Mar', stars: 1320, forks: 168, issues: 58 },
  { month: 'Apr', stars: 1580, forks: 194, issues: 63 },
  { month: 'May', stars: 1890, forks: 212, issues: 67 },
  { month: 'Jun', stars: 2100, forks: 230, issues: 72 },
  { month: 'Jul', stars: 2350, forks: 248, issues: 68 },
  { month: 'Aug', stars: 2670, forks: 270, issues: 65 },
  { month: 'Sep', stars: 2840, forks: 290, issues: 60 }
];

const socialMediaMentionsData = [
  { month: 'Jan', twitter: 156, reddit: 89, discord: 320 },
  { month: 'Feb', twitter: 189, reddit: 102, discord: 350 },
  { month: 'Mar', twitter: 212, reddit: 124, discord: 380 },
  { month: 'Apr', twitter: 256, reddit: 131, discord: 420 },
  { month: 'May', twitter: 291, reddit: 142, discord: 450 },
  { month: 'Jun', twitter: 345, reddit: 156, discord: 485 },
  { month: 'Jul', twitter: 367, reddit: 168, discord: 510 },
  { month: 'Aug', twitter: 392, reddit: 175, discord: 530 },
  { month: 'Sep', twitter: 423, reddit: 189, discord: 560 }
];

const geographicalDistributionData = [
  { name: 'North America', value: 45 },
  { name: 'Europe', value: 30 },
  { name: 'Asia Pacific', value: 15 },
  { name: 'South America', value: 5 },
  { name: 'Africa', value: 3 },
  { name: 'Other', value: 2 }
];

const serverTypeDistributionData = [
  { name: 'Open Source', value: 65 },
  { name: 'Enterprise', value: 20 },
  { name: 'Custom', value: 15 }
];

const topContributorsData = [
  { id: 1, name: 'TechInnovator', contributions: 124, avatar: 'https://via.placeholder.com/40' },
  { id: 2, name: 'AIEnthusiast', contributions: 98, avatar: 'https://via.placeholder.com/40' },
  { id: 3, name: 'ProtocolDev', contributions: 85, avatar: 'https://via.placeholder.com/40' },
  { id: 4, name: 'Context_Guru', contributions: 72, avatar: 'https://via.placeholder.com/40' },
  { id: 5, name: 'CodeNinja42', contributions: 68, avatar: 'https://via.placeholder.com/40' }
];

const topApplicationsData = [
  { id: 1, name: 'MCP Chat Client', downloads: 15280 },
  { id: 2, name: 'Context Guardian', downloads: 12450 },
  { id: 3, name: 'MCP DevTools', downloads: 9870 },
  { id: 4, name: 'OpenMCP Server', downloads: 8540 },
  { id: 5, name: 'MCP Protocol Explorer', downloads: 6230 }
];

// Time period options
const timePeriodOptions = [
  { value: '3m', label: 'Last 3 Months' },
  { value: '6m', label: 'Last 6 Months' },
  { value: '1y', label: 'Last Year' },
  { value: 'all', label: 'All Time' }
];

const DashboardPage: React.FC = () => {
  const theme = useTheme();
  
  // States
  const [tabValue, setTabValue] = useState(0);
  const [timePeriod, setTimePeriod] = useState('6m');
  
  // COLORS for charts
  const COLORS = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main,
    theme.palette.info.main
  ];
  
  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  // Handle time period change
  const handleTimePeriodChange = (event: SelectChangeEvent) => {
    setTimePeriod(event.target.value);
  };
  
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          MCP Adoption & Growth Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
          Track the real-time growth of the Model Context Protocol ecosystem. 
          This dashboard provides insights into active servers, developer participation, 
          and community engagement.
        </Typography>
        
        {/* Filter Controls */}
        <Paper elevation={1} sx={{ p: 2, mb: 4, borderRadius: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange} 
                variant="scrollable"
                scrollButtons="auto"
                aria-label="dashboard tabs"
              >
                <Tab label="Overview" icon={<TrendingUp />} iconPosition="start" />
                <Tab label="Ecosystem Growth" icon={<Storage />} iconPosition="start" />
                <Tab label="Developer Activity" icon={<Code />} iconPosition="start" />
                <Tab label="Community Engagement" icon={<Forum />} iconPosition="start" />
                <Tab label="Geographical Distribution" icon={<Public />} iconPosition="start" />
              </Tabs>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel id="time-period-label">Time Period</InputLabel>
                <Select
                  labelId="time-period-label"
                  id="time-period-select"
                  value={timePeriod}
                  onChange={handleTimePeriodChange}
                  label="Time Period"
                  startAdornment={
                    <DateRange color="action" sx={{ mr: 1 }} />
                  }
                >
                  {timePeriodOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>
        
        {/* Key Metrics Section */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card 
              elevation={2} 
              sx={{ 
                borderRadius: 2,
                borderLeft: `4px solid ${theme.palette.primary.main}`,
                height: '100%'
              }}
            >
              <CardContent>
                <Typography variant="overline" color="text.secondary">
                  Active MCP Servers
                </Typography>
                <Typography variant="h3" color="primary" sx={{ fontWeight: 700, mb: 1 }}>
                  45
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingUp color="success" fontSize="small" sx={{ mr: 0.5 }} />
                  <Typography variant="body2" color="success.main">
                    +12% from last month
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card 
              elevation={2} 
              sx={{ 
                borderRadius: 2,
                borderLeft: `4px solid ${theme.palette.secondary.main}`,
                height: '100%'
              }}
            >
              <CardContent>
                <Typography variant="overline" color="text.secondary">
                  Compatible Applications
                </Typography>
                <Typography variant="h3" color="secondary" sx={{ fontWeight: 700, mb: 1 }}>
                  137
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingUp color="success" fontSize="small" sx={{ mr: 0.5 }} />
                  <Typography variant="body2" color="success.main">
                    +5% from last month
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card 
              elevation={2} 
              sx={{ 
                borderRadius: 2,
                borderLeft: `4px solid ${theme.palette.success.main}`,
                height: '100%'
              }}
            >
              <CardContent>
                <Typography variant="overline" color="text.secondary">
                  GitHub Stars
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, color: theme.palette.success.main }}>
                  2,843
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingUp color="success" fontSize="small" sx={{ mr: 0.5 }} />
                  <Typography variant="body2" color="success.main">
                    +173 in last month
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card 
              elevation={2} 
              sx={{ 
                borderRadius: 2,
                borderLeft: `4px solid ${theme.palette.warning.main}`,
                height: '100%'
              }}
            >
              <CardContent>
                <Typography variant="overline" color="text.secondary">
                  Community Posts
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, color: theme.palette.warning.main }}>
                  1,256
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingUp color="success" fontSize="small" sx={{ mr: 0.5 }} />
                  <Typography variant="body2" color="success.main">
                    +8% from last month
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        {/* Overview Tab */}
        {tabValue === 0 && (
          <Grid container spacing={4}>
            {/* Growth Over Time Chart */}
            <Grid item xs={12}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                  MCP Ecosystem Growth
                </Typography>
                <Box sx={{ height: 350 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={growthOverTimeData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="servers" 
                        name="MCP Servers" 
                        stroke={theme.palette.primary.main} 
                        activeDot={{ r: 8 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="apps" 
                        name="Compatible Apps" 
                        stroke={theme.palette.secondary.main} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="contributors" 
                        name="Contributors" 
                        stroke={theme.palette.success.main} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </Paper>
            </Grid>
            
            {/* Activity and Mentions Charts */}
            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  GitHub Activity
                </Typography>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={githubActivityData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="stars" 
                        name="Stars" 
                        stackId="1"
                        stroke={theme.palette.primary.main}
                        fill={theme.palette.primary.light}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="forks" 
                        name="Forks" 
                        stackId="2"
                        stroke={theme.palette.secondary.main}
                        fill={theme.palette.secondary.light}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="issues" 
                        name="Issues" 
                        stackId="3"
                        stroke={theme.palette.info.main}
                        fill={theme.palette.info.light}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Box>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Social Media Mentions
                </Typography>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={socialMediaMentionsData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <Bar 
                        dataKey="twitter" 
                        name="Twitter" 
                        fill={theme.palette.info.main} 
                      />
                      <Bar 
                        dataKey="reddit" 
                        name="Reddit" 
                        fill={theme.palette.warning.main} 
                      />
                      <Bar 
                        dataKey="discord" 
                        name="Discord" 
                        fill={theme.palette.success.main} 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </Paper>
            </Grid>
            
            {/* Distribution Charts */}
            <Grid item xs={12} md={4}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Geographical Distribution
                </Typography>
                <Box sx={{ height: 300, display: 'flex', justifyContent: 'center' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={geographicalDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {geographicalDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Server Type Distribution
                </Typography>
                <Box sx={{ height: 300, display: 'flex', justifyContent: 'center' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={serverTypeDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {serverTypeDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
                <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                  Top Contributors
                </Typography>
                <List>
                  {topContributorsData.map((contributor, index) => (
                    <React.Fragment key={contributor.id}>
                      <ListItem>
                        <ListItemIcon>
                          <Box
                            component="img"
                            src={contributor.avatar}
                            alt={contributor.name}
                            sx={{ 
                              width: 32, 
                              height: 32, 
                              borderRadius: '50%',
                              border: `2px solid ${COLORS[index % COLORS.length]}`
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText 
                          primary={contributor.name}
                          secondary={`${contributor.contributions} contributions`}
                        />
                      </ListItem>
                      {index < topContributorsData.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            </Grid>
            
            {/* Additional section for top applications */}
            <Grid item xs={12}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Top Downloaded Applications
                </Typography>
                <Grid container spacing={2}>
                  {topApplicationsData.map((app, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={2.4} key={app.id}>
                      <Card variant="outlined" sx={{ height: '100%' }}>
                        <CardContent>
                          <Typography variant="h5" color="primary" gutterBottom>
                            #{index + 1}
                          </Typography>
                          <Typography variant="subtitle1" noWrap>
                            {app.name}
                          </Typography>
                          <Stack direction="row" alignItems="center" spacing={0.5}>
                            <CloudDownload fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                              {app.downloads.toLocaleString()} downloads
                            </Typography>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        )}
        
        {/* Other tabs would be implemented here */}
        {tabValue !== 0 && (
          <Paper elevation={2} sx={{ p: 4, borderRadius: 2, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              {tabValue === 1 ? 'Ecosystem Growth' : 
               tabValue === 2 ? 'Developer Activity' : 
               tabValue === 3 ? 'Community Engagement' : 
               'Geographical Distribution'}
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Detailed metrics for this category will be available in the next update.
            </Typography>
            <Button variant="outlined">Subscribe for Updates</Button>
          </Paper>
        )}
        
        {/* Call to Action */}
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
            Help Grow the MCP Ecosystem
          </Typography>
          <Typography variant="body1" paragraph sx={{ maxWidth: 800, mx: 'auto' }}>
            Are you working on an MCP server or compatible application? 
            Submit your project to be featured in our directory and contribute to the growing ecosystem.
          </Typography>
          <Button 
            variant="contained" 
            color="secondary" 
            size="large"
            sx={{ 
              px: 4,
              py: 1.5,
              fontWeight: 600,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
          >
            Submit Your Project
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default DashboardPage; 