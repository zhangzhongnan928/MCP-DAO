import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  CardMedia, 
  Chip, 
  Rating, 
  Divider, 
  Paper,
  useTheme,
  Stack
} from '@mui/material';
import { 
  Explore, 
  TrendingUp, 
  AddCircle, 
  HowToVote, 
  ArrowForward, 
  Star 
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

// Mock data for server cards
const mockServers = [
  {
    id: 1,
    name: 'OpenMCP Server',
    description: 'Open source implementation of Model Context Protocol',
    rating: 4.9,
    reviewCount: 87,
    type: 'Server',
    image: 'https://via.placeholder.com/150?text=OpenMCP'
  },
  {
    id: 2,
    name: 'MCP Chat Client',
    description: 'Desktop chat application with full MCP support',
    rating: 4.7,
    reviewCount: 53,
    type: 'Application',
    image: 'https://via.placeholder.com/150?text=MCPChat'
  },
  {
    id: 3,
    name: 'MCP Protocol Bridge',
    description: 'Connect legacy systems to MCP-compatible services',
    rating: 4.5,
    reviewCount: 42,
    type: 'Tool',
    image: 'https://via.placeholder.com/150?text=Bridge'
  }
];

// Mock data for stats
const stats = {
  servers: 45,
  apps: 137,
  githubStars: 2843,
  communityPosts: 1256
};

const HomePage: React.FC = () => {
  const theme = useTheme();
  
  return (
    <Box>
      {/* Hero Section */}
      <Box 
        sx={{ 
          background: `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
          color: 'white',
          pt: { xs: 10, md: 15 },
          pb: { xs: 10, md: 15 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
                The Hub for Model Context Protocol
              </Typography>
              <Typography variant="h6" paragraph sx={{ opacity: 0.9, mb: 3 }}>
                Discover MCP servers and compatible applications, contribute content,
                and participate in the growing MCP community.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button 
                  variant="contained" 
                  size="large" 
                  component={Link}
                  to="/servers"
                  color="secondary"
                  startIcon={<Explore />}
                  sx={{ 
                    px: 3, 
                    py: 1.5,
                    fontSize: '1rem',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                  }}
                >
                  Explore MCP Servers & Apps
                </Button>
                <Button 
                  variant="outlined" 
                  size="large"
                  component={Link}
                  to="/submit"
                  sx={{ 
                    px: 3, 
                    py: 1.5,
                    fontSize: '1rem',
                    color: 'white',
                    borderColor: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  Submit Content
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box
                component="img"
                src="https://via.placeholder.com/600x400?text=MCP+Ecosystem"
                alt="MCP Ecosystem"
                sx={{
                  width: '100%',
                  borderRadius: 4,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                }}
              />
            </Grid>
          </Grid>
        </Container>
        
        {/* Decorative shapes */}
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.1)',
            zIndex: 0
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -150,
            left: -50,
            width: 400,
            height: 400,
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.05)',
            zIndex: 0
          }}
        />
      </Box>
      
      {/* Stats Section */}
      <Container sx={{ mt: -5, position: 'relative', zIndex: 1 }}>
        <Paper elevation={3} sx={{ borderRadius: 4, py: 3 }}>
          <Grid container>
            <Grid item xs={6} sm={3} sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h3" color="primary" sx={{ fontWeight: 600 }}>
                {stats.servers}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                MCP Servers
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3} sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h3" color="primary" sx={{ fontWeight: 600 }}>
                {stats.apps}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Compatible Apps
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3} sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h3" color="primary" sx={{ fontWeight: 600 }}>
                {stats.githubStars}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                GitHub Stars
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3} sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h3" color="primary" sx={{ fontWeight: 600 }}>
                {stats.communityPosts}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Community Posts
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      
      {/* Featured Servers & Apps Section */}
      <Container sx={{ my: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Featured MCP Servers & Apps
          </Typography>
          <Button 
            component={Link}
            to="/servers"
            endIcon={<ArrowForward />}
          >
            View All
          </Button>
        </Box>
        
        <Grid container spacing={3}>
          {mockServers.map((server) => (
            <Grid item xs={12} sm={6} md={4} key={server.id}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-8px)'
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={server.image}
                  alt={server.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="h6" component="div">
                      {server.name}
                    </Typography>
                    <Chip 
                      label={server.type} 
                      size="small" 
                      color={server.type === 'Server' ? 'primary' : 'secondary'}
                      variant="outlined"
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {server.description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Rating 
                      value={server.rating} 
                      precision={0.1} 
                      size="small" 
                      readOnly 
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      ({server.reviewCount} reviews)
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    component={Link} 
                    to={`/servers/${server.id}`}
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      
      {/* Core Features Section */}
      <Box sx={{ backgroundColor: theme.palette.grey[50], py: 8 }}>
        <Container>
          <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
            Core Features
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            textAlign="center" 
            sx={{ maxWidth: 700, mx: 'auto', mb: 6 }}
          >
            MCP.ai provides a comprehensive platform for exploring, contributing to, 
            and participating in the Model Context Protocol ecosystem.
          </Typography>
          
          <Grid container spacing={4}>
            {/* Server & App Listings */}
            <Grid item xs={12} md={6} lg={3}>
              <Card sx={{ height: '100%' }}>
                <Box sx={{ p: 2, backgroundColor: 'primary.light', color: 'white', textAlign: 'center' }}>
                  <Explore sx={{ fontSize: 40 }} />
                </Box>
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    Server & App Listings
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Browse a comprehensive directory of MCP servers and compatible applications.
                    Read user reviews, compare ratings, and find the perfect tools for your needs.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    component={Link} 
                    to="/servers"
                  >
                    Explore
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            
            {/* Growth Dashboard */}
            <Grid item xs={12} md={6} lg={3}>
              <Card sx={{ height: '100%' }}>
                <Box sx={{ p: 2, backgroundColor: 'success.light', color: 'white', textAlign: 'center' }}>
                  <TrendingUp sx={{ fontSize: 40 }} />
                </Box>
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    Growth Dashboard
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Track the real-time growth of the MCP ecosystem with interactive visualizations.
                    Monitor active servers, developer participation, and community engagement.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    component={Link} 
                    to="/dashboard"
                  >
                    View Dashboard
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            
            {/* User Contributions */}
            <Grid item xs={12} md={6} lg={3}>
              <Card sx={{ height: '100%' }}>
                <Box sx={{ p: 2, backgroundColor: 'warning.light', color: 'white', textAlign: 'center' }}>
                  <AddCircle sx={{ fontSize: 40 }} />
                </Box>
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    User Contributions
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Submit new MCP servers and tools to the directory. AI-powered processing
                    helps standardize entries while ensuring high-quality submissions.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    component={Link} 
                    to="/submit"
                  >
                    Submit Content
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            
            {/* DAO & Incentives */}
            <Grid item xs={12} md={6} lg={3}>
              <Card sx={{ height: '100%' }}>
                <Box sx={{ p: 2, backgroundColor: 'secondary.light', color: 'white', textAlign: 'center' }}>
                  <HowToVote sx={{ fontSize: 40 }} />
                </Box>
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    DAO & Incentives
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Earn MCP tokens for your contributions and use them to participate
                    in governance decisions or unlock premium features on the platform.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    component={Link} 
                    to="/dao"
                  >
                    Join DAO
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Call to Action */}
      <Box sx={{ py: 8 }}>
        <Container>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 4, 
              textAlign: 'center',
              backgroundColor: theme.palette.primary.main,
              borderRadius: 4,
              color: 'white'
            }}
          >
            <Typography variant="h4" component="h2" gutterBottom>
              Join the MCP Community
            </Typography>
            <Typography variant="body1" paragraph sx={{ maxWidth: 700, mx: 'auto', mb: 4 }}>
              Be part of the growing Model Context Protocol ecosystem. Explore, contribute, 
              and help shape the future of AI context management.
            </Typography>
            <Button 
              variant="contained" 
              size="large" 
              color="secondary"
              component={Link}
              to="/servers"
              startIcon={<Explore />}
              sx={{ 
                px: 4, 
                py: 1.5, 
                mr: 2,
                boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
              }}
            >
              Start Exploring
            </Button>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage; 