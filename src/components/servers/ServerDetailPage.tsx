import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Divider,
  Chip,
  Rating,
  Button,
  Avatar,
  TextField,
  Card,
  CardContent,
  Tab,
  Tabs,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  LinearProgress,
  IconButton,
  Alert,
  useTheme,
  Breadcrumbs,
  ListItemButton
} from '@mui/material';
import {
  ArrowBack,
  Star,
  StarBorder,
  VerifiedUser,
  Update,
  Info,
  Link as LinkIcon,
  GitHub,
  DeviceHub,
  Code,
  Download,
  Share,
  Edit,
  Flag,
  ThumbUp,
  ThumbDown,
  Comment
} from '@mui/icons-material';
import { TabContext, TabPanel } from '@mui/lab';

// Mock server/app data
const mockServers = [
  {
    id: 1,
    name: 'OpenMCP Server',
    description: 'Open source implementation of Model Context Protocol with advanced features for enterprise use. This server provides a high-performance, scalable solution for MCP applications.',
    longDescription: `OpenMCP Server is a comprehensive implementation of the Model Context Protocol, designed for developers and enterprises who need reliable context management for AI applications.

Built with performance in mind, it handles high traffic loads while maintaining low latency for context retrieval operations. The server implements the full MCP specification with additional enterprise features.

Key features include:
- Full implementation of MCP v1.2
- Horizontal scaling support
- Advanced security features
- Comprehensive logging and monitoring
- REST and gRPC API support
- Detailed documentation`,
    rating: 4.9,
    reviewCount: 87,
    type: 'Server',
    version: '1.2.3',
    lastUpdated: '2023-12-15',
    logo: 'https://via.placeholder.com/300x150?text=OpenMCP',
    maintainer: 'MCP Foundation',
    license: 'MIT',
    website: 'https://openmcp-example.org',
    github: 'https://github.com/example/openmcp',
    downloads: 25483,
    tags: ['open-source', 'enterprise', 'scalable'],
    requirements: 'Node.js 16+, 4GB RAM',
    documentation: 'https://docs.openmcp-example.org',
    reviews: [
      {
        id: 101,
        user: 'AI_Dev_Pro',
        avatar: 'https://via.placeholder.com/40',
        rating: 5,
        date: '2024-02-01',
        review: 'Excellent implementation of the MCP protocol. We\'ve been using this in production for months with zero issues. The documentation is comprehensive and the performance is outstanding.',
        helpful: 32,
        notHelpful: 2
      },
      {
        id: 102,
        user: 'ContextGuru',
        avatar: 'https://via.placeholder.com/40',
        rating: 5,
        date: '2024-01-15',
        review: 'Best MCP server out there. The enterprise features are worth the setup time. I appreciate the detailed logging which makes debugging much easier.',
        helpful: 18,
        notHelpful: 0
      },
      {
        id: 103,
        user: 'DevOpsNinja',
        avatar: 'https://via.placeholder.com/40',
        rating: 4,
        date: '2023-12-22',
        review: 'Great server overall. The horizontal scaling works as advertised, though setup requires careful reading of the docs. Would be 5 stars if the setup was more streamlined.',
        helpful: 15,
        notHelpful: 1
      },
      {
        id: 104,
        user: 'AIEngineer',
        avatar: 'https://via.placeholder.com/40',
        rating: 5,
        date: '2023-12-10',
        review: 'This server is the foundation of our ML pipeline. Rock solid and performance is stellar even under heavy load. Highly recommended!',
        helpful: 24,
        notHelpful: 0
      }
    ],
    ratingBreakdown: {
      5: 70,
      4: 12,
      3: 3,
      2: 1,
      1: 1
    }
  },
  {
    id: 2,
    name: 'MCP Chat Client',
    description: 'Desktop chat application with full MCP support, designed for seamless AI interactions',
    longDescription: `MCP Chat Client is a cross-platform desktop application that leverages the Model Context Protocol to provide enhanced context-aware conversations with AI models.

The application maintains conversation history within the MCP protocol, allowing for more coherent and contextually relevant AI responses. It supports multiple AI providers and custom MCP servers.

Key features include:
- Intuitive chat interface
- Support for multiple AI providers
- MCP context visualization
- Customizable context management
- Conversation exporting
- Offline mode with local context storage`,
    rating: 4.7,
    reviewCount: 53,
    type: 'Application',
    version: '2.0.1',
    lastUpdated: '2024-01-22',
    logo: 'https://via.placeholder.com/300x150?text=MCPChat',
    maintainer: 'MCP Solutions Ltd.',
    license: 'Freemium',
    website: 'https://mcpchat-example.com',
    github: 'https://github.com/example/mcpchat',
    downloads: 15280,
    tags: ['chat', 'desktop', 'cross-platform'],
    requirements: 'Windows 10+, macOS 11+, or Linux',
    documentation: 'https://docs.mcpchat-example.com',
    reviews: [
      {
        id: 201,
        user: 'ChatEnthusiast',
        avatar: 'https://via.placeholder.com/40',
        rating: 5,
        date: '2024-02-10',
        review: 'This chat client has completely changed how I interact with AI. The context management is seamless, and the UI is beautiful and intuitive.',
        helpful: 12,
        notHelpful: 1
      },
      {
        id: 202,
        user: 'ProductivityExpert',
        avatar: 'https://via.placeholder.com/40',
        rating: 4,
        date: '2024-01-30',
        review: 'Great application that makes the most of MCP. The only reason it\'s not 5 stars is occasional lag when handling very large contexts.',
        helpful: 9,
        notHelpful: 0
      }
    ],
    ratingBreakdown: {
      5: 38,
      4: 10,
      3: 3,
      2: 1,
      1: 1
    }
  }
];

const ServerDetailPage: React.FC = () => {
  const theme = useTheme();
  const { id } = useParams<{ id: string }>();
  
  // States
  const [server, setServer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState('overview');
  const [userReview, setUserReview] = useState('');
  const [userRating, setUserRating] = useState<number | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  
  // Load server data
  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      const foundServer = mockServers.find(s => s.id === Number(id));
      if (foundServer) {
        setServer(foundServer);
        setError(null);
      } else {
        setError('Server or application not found');
      }
      setLoading(false);
    }, 500);
  }, [id]);
  
  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };
  
  // Handle review submit
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would connect to the backend in a real application
    alert('Review submitted successfully!');
    setUserReview('');
    setUserRating(null);
    setShowReviewForm(false);
  };
  
  // Rating breakdown
  const RatingBreakdown = () => {
    if (!server) return null;
    
    const totalReviews = server.reviewCount;
    return (
      <Box>
        {[5, 4, 3, 2, 1].map((star) => (
          <Box key={star} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography variant="body2" sx={{ minWidth: 20 }}>
              {star}
            </Typography>
            <Star fontSize="small" color="action" sx={{ mx: 0.5 }} />
            <Box sx={{ width: '60%', mx: 1 }}>
              <LinearProgress 
                variant="determinate" 
                value={(server.ratingBreakdown[star] / totalReviews) * 100} 
                sx={{ 
                  height: 8, 
                  borderRadius: 5,
                  backgroundColor: theme.palette.grey[200],
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: star >= 4 ? theme.palette.success.main : 
                                    star >= 3 ? theme.palette.warning.main : 
                                    theme.palette.error.main
                  }
                }}
              />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              {server.ratingBreakdown[star]}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  };
  
  if (loading) {
    return (
      <Box sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Loading...
        </Typography>
        <Box sx={{ width: '50%', mx: 'auto', mt: 3 }}>
          <LinearProgress />
        </Box>
      </Box>
    );
  }
  
  if (error) {
    return (
      <Box sx={{ py: 10 }}>
        <Container>
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
          <Button 
            component={RouterLink} 
            to="/servers" 
            startIcon={<ArrowBack />}
            variant="outlined"
          >
            Back to Servers List
          </Button>
        </Container>
      </Box>
    );
  }
  
  if (!server) return null;
  
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link component={RouterLink} underline="hover" color="inherit" to="/">
            Home
          </Link>
          <Link component={RouterLink} underline="hover" color="inherit" to="/servers">
            Servers & Applications
          </Link>
          <Typography color="text.primary">{server.name}</Typography>
        </Breadcrumbs>
        
        {/* Header Section */}
        <Paper elevation={2} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4} md={3}>
              <Box 
                component="img"
                src={server.logo}
                alt={server.name}
                sx={{ 
                  width: '100%', 
                  borderRadius: 2,
                  border: `1px solid ${theme.palette.grey[200]}`
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={8} md={9}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
                    {server.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Chip 
                      label={server.type} 
                      size="small" 
                      color={server.type === 'Server' ? 'primary' : 'secondary'}
                      sx={{ mr: 1 }}
                    />
                    <Rating 
                      value={server.rating} 
                      precision={0.1} 
                      readOnly 
                      size="small"
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      ({server.reviewCount} reviews)
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    startIcon={server.type === 'Server' ? <DeviceHub /> : <Download />}
                    sx={{ mb: 1 }}
                  >
                    {server.type === 'Server' ? 'Connect' : 'Download'}
                  </Button>
                </Box>
              </Box>
              
              <Typography variant="body1" paragraph>
                {server.description}
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="body2" color="text.secondary">
                    Version
                  </Typography>
                  <Typography variant="body1">
                    {server.version}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="body2" color="text.secondary">
                    Last Updated
                  </Typography>
                  <Typography variant="body1">
                    {new Date(server.lastUpdated).toLocaleDateString()}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="body2" color="text.secondary">
                    Maintainer
                  </Typography>
                  <Typography variant="body1">
                    {server.maintainer}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="body2" color="text.secondary">
                    License
                  </Typography>
                  <Typography variant="body1">
                    {server.license}
                  </Typography>
                </Grid>
              </Grid>
              
              <Stack 
                direction="row" 
                spacing={1} 
                sx={{ mt: 2 }}
              >
                {server.tags.map((tag: string) => (
                  <Chip 
                    key={tag} 
                    label={tag} 
                    size="small" 
                    variant="outlined"
                  />
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Paper>
        
        {/* Tabs Section */}
        <TabContext value={tabValue}>
          <Paper elevation={1} sx={{ mb: 4 }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              variant="fullWidth"
              sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
              <Tab label="Overview" value="overview" />
              <Tab label="Reviews" value="reviews" />
              <Tab label="Documentation" value="documentation" />
              <Tab label="Support" value="support" />
            </Tabs>
          </Paper>
          
          <TabPanel value="overview" sx={{ px: 0 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <Paper elevation={1} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    About
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      whiteSpace: 'pre-line',
                      color: theme.palette.text.secondary
                    }}
                  >
                    {server.longDescription}
                  </Typography>
                </Paper>
                
                <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    System Requirements
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {server.requirements}
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Paper elevation={1} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Statistics
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <Download fontSize="small" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Downloads" 
                        secondary={server.downloads.toLocaleString()} 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Star fontSize="small" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Average Rating" 
                        secondary={server.rating.toFixed(1)} 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Update fontSize="small" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Last Updated" 
                        secondary={new Date(server.lastUpdated).toLocaleDateString()} 
                      />
                    </ListItem>
                  </List>
                </Paper>
                
                <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Links
                  </Typography>
                  <List dense>
                    <ListItem component="a" href={server.website} target="_blank" sx={{ textDecoration: 'none' }}>
                      <ListItemButton>
                        <ListItemIcon>
                          <LinkIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Website" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem component="a" href={server.github} target="_blank" sx={{ textDecoration: 'none' }}>
                      <ListItemButton>
                        <ListItemIcon>
                          <GitHub fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="GitHub Repository" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem component="a" href={server.documentation} target="_blank" sx={{ textDecoration: 'none' }}>
                      <ListItemButton>
                        <ListItemIcon>
                          <Code fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Documentation" />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </TabPanel>
          
          <TabPanel value="reviews" sx={{ px: 0 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <Paper elevation={1} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">
                      User Reviews
                    </Typography>
                    {!showReviewForm && (
                      <Button 
                        variant="outlined" 
                        startIcon={<Edit />}
                        onClick={() => setShowReviewForm(true)}
                      >
                        Write a Review
                      </Button>
                    )}
                  </Box>
                  
                  {showReviewForm && (
                    <Box component="form" onSubmit={handleReviewSubmit} sx={{ mb: 4 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        Your Rating
                      </Typography>
                      <Rating
                        name="user-rating"
                        value={userRating}
                        onChange={(event, newValue) => {
                          setUserRating(newValue);
                        }}
                        size="large"
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        fullWidth
                        label="Your Review"
                        multiline
                        rows={4}
                        value={userReview}
                        onChange={(e) => setUserReview(e.target.value)}
                        margin="normal"
                        required
                      />
                      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                        <Button 
                          type="submit" 
                          variant="contained" 
                          color="primary"
                          disabled={!userRating}
                        >
                          Submit Review
                        </Button>
                        <Button 
                          variant="outlined" 
                          onClick={() => setShowReviewForm(false)}
                        >
                          Cancel
                        </Button>
                      </Box>
                    </Box>
                  )}
                  
                  <Divider sx={{ my: 2 }} />
                  
                  {server.reviews.map((review: any) => (
                    <Box key={review.id} sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', mb: 1 }}>
                        <Avatar src={review.avatar} alt={review.user} sx={{ mr: 2 }} />
                        <Box>
                          <Typography variant="subtitle1">
                            {review.user}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Rating value={review.rating} size="small" readOnly />
                            <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                              {new Date(review.date).toLocaleDateString()}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Typography variant="body2" paragraph>
                        {review.review}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="caption" color="text.secondary" sx={{ mr: 2 }}>
                          Was this review helpful?
                        </Typography>
                        <IconButton size="small" color="primary">
                          <ThumbUp fontSize="small" />
                        </IconButton>
                        <Typography variant="caption" sx={{ mx: 1 }}>
                          {review.helpful}
                        </Typography>
                        <IconButton size="small" color="primary">
                          <ThumbDown fontSize="small" />
                        </IconButton>
                        <Typography variant="caption" sx={{ mx: 1 }}>
                          {review.notHelpful}
                        </Typography>
                        <IconButton size="small" color="primary" sx={{ ml: 1 }}>
                          <Flag fontSize="small" />
                        </IconButton>
                      </Box>
                      {review.id !== server.reviews[server.reviews.length - 1].id && (
                        <Divider sx={{ my: 2 }} />
                      )}
                    </Box>
                  ))}
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Paper elevation={1} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Rating Breakdown
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h3" color="primary" sx={{ mr: 2 }}>
                      {server.rating.toFixed(1)}
                    </Typography>
                    <Box>
                      <Rating value={server.rating} precision={0.1} readOnly />
                      <Typography variant="body2" color="text.secondary">
                        {server.reviewCount} reviews
                      </Typography>
                    </Box>
                  </Box>
                  <RatingBreakdown />
                </Paper>
              </Grid>
            </Grid>
          </TabPanel>
          
          <TabPanel value="documentation" sx={{ px: 0 }}>
            <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Documentation & Guides
              </Typography>
              <Typography variant="body1" paragraph>
                For full documentation, please visit our official documentation site:
              </Typography>
              <Button 
                variant="contained" 
                component="a" 
                href={server.documentation} 
                target="_blank" 
                startIcon={<Code />}
                sx={{ mb: 3 }}
              >
                View Documentation
              </Button>
              
              <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
                Quick Start Guide
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {server.type === 'Server' ? (
                  <>
                    To get started with {server.name}, follow these steps:
                    <ol>
                      <li>Download the latest version from our website</li>
                      <li>Install the required dependencies</li>
                      <li>Configure your environment variables</li>
                      <li>Run the server using the provided command</li>
                      <li>Connect your MCP-compatible applications</li>
                    </ol>
                  </>
                ) : (
                  <>
                    To get started with {server.name}, follow these steps:
                    <ol>
                      <li>Download the application from our website</li>
                      <li>Install on your preferred platform</li>
                      <li>Launch the application and complete the initial setup</li>
                      <li>Connect to your preferred MCP server</li>
                      <li>Start enjoying context-aware AI interactions</li>
                    </ol>
                  </>
                )}
              </Typography>
            </Paper>
          </TabPanel>
          
          <TabPanel value="support" sx={{ px: 0 }}>
            <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Support & Resources
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Community Support
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        Get help from our community of users and contributors.
                      </Typography>
                      <Button 
                        variant="outlined" 
                        startIcon={<GitHub />}
                        component="a"
                        href={server.github}
                        target="_blank"
                        sx={{ mr: 1, mb: 1 }}
                      >
                        GitHub Issues
                      </Button>
                      <Button 
                        variant="outlined" 
                        startIcon={<Comment />}
                        sx={{ mb: 1 }}
                      >
                        Community Forum
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Professional Support
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        Need enterprise-grade support for your organization?
                      </Typography>
                      <Button 
                        variant="contained" 
                        color="primary"
                      >
                        Contact Sales
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          </TabPanel>
        </TabContext>
      </Container>
    </Box>
  );
};

export default ServerDetailPage; 