import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Link, 
  Divider,
  IconButton
} from '@mui/material';
import { 
  GitHub, 
  Twitter, 
  Telegram, 
  Chat
} from '@mui/icons-material';

const Footer: React.FC = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 4, 
        mt: 'auto', 
        backgroundColor: (theme) => theme.palette.grey[100]
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography 
              variant="h6" 
              color="primary" 
              gutterBottom
              sx={{ fontWeight: 700 }}
            >
              MCP.ai
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Promoting and supporting the Model Context Protocol (MCP) through a transparent, 
              interactive, and rewarding ecosystem.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton aria-label="GitHub" color="inherit" size="small">
                <GitHub />
              </IconButton>
              <IconButton aria-label="Twitter" color="inherit" size="small">
                <Twitter />
              </IconButton>
              <IconButton aria-label="Telegram" color="inherit" size="small">
                <Telegram />
              </IconButton>
              <IconButton aria-label="Discord" color="inherit" size="small">
                <Chat />
              </IconButton>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={8}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={4}>
                <Typography variant="subtitle1" color="text.primary" gutterBottom>
                  Resources
                </Typography>
                <Link href="#" color="inherit" display="block" underline="hover" sx={{ py: 0.5 }}>
                  Servers & Apps
                </Link>
                <Link href="#" color="inherit" display="block" underline="hover" sx={{ py: 0.5 }}>
                  Growth Dashboard
                </Link>
                <Link href="#" color="inherit" display="block" underline="hover" sx={{ py: 0.5 }}>
                  MCP Documentation
                </Link>
              </Grid>
              
              <Grid item xs={6} sm={4}>
                <Typography variant="subtitle1" color="text.primary" gutterBottom>
                  Community
                </Typography>
                <Link href="#" color="inherit" display="block" underline="hover" sx={{ py: 0.5 }}>
                  Submit Content
                </Link>
                <Link href="#" color="inherit" display="block" underline="hover" sx={{ py: 0.5 }}>
                  DAO Governance
                </Link>
                <Link href="#" color="inherit" display="block" underline="hover" sx={{ py: 0.5 }}>
                  Discord
                </Link>
              </Grid>
              
              <Grid item xs={6} sm={4}>
                <Typography variant="subtitle1" color="text.primary" gutterBottom>
                  About
                </Typography>
                <Link href="#" color="inherit" display="block" underline="hover" sx={{ py: 0.5 }}>
                  Team
                </Link>
                <Link href="#" color="inherit" display="block" underline="hover" sx={{ py: 0.5 }}>
                  Privacy Policy
                </Link>
                <Link href="#" color="inherit" display="block" underline="hover" sx={{ py: 0.5 }}>
                  Terms of Service
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 3 }} />
        
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} MCP.ai. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 