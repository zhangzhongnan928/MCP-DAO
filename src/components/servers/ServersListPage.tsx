import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Rating,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Divider,
  Paper,
  IconButton,
  Pagination,
  Stack,
  useTheme
} from '@mui/material';
import {
  Search,
  FilterList,
  Star,
  StarBorder,
  Sort,
  ArrowDropDown,
  ArrowDropUp
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

// Mock data for servers and applications
const mockItems = [
  {
    id: 1,
    name: 'OpenMCP Server',
    description: 'Open source implementation of Model Context Protocol with advanced features for enterprise use',
    rating: 4.9,
    reviewCount: 87,
    type: 'Server',
    version: '1.2.3',
    lastUpdated: '2023-12-15',
    image: 'https://via.placeholder.com/300x150?text=OpenMCP'
  },
  {
    id: 2,
    name: 'MCP Chat Client',
    description: 'Desktop chat application with full MCP support, designed for seamless AI interactions',
    rating: 4.7,
    reviewCount: 53,
    type: 'Application',
    version: '2.0.1',
    lastUpdated: '2024-01-22',
    image: 'https://via.placeholder.com/300x150?text=MCPChat'
  },
  {
    id: 3,
    name: 'MCP Protocol Bridge',
    description: 'Connect legacy systems to MCP-compatible services with minimal configuration',
    rating: 4.5,
    reviewCount: 42,
    type: 'Tool',
    version: '0.9.8',
    lastUpdated: '2024-02-05',
    image: 'https://via.placeholder.com/300x150?text=Bridge'
  },
  {
    id: 4,
    name: 'MCP DevTools',
    description: 'Developer toolkit for creating MCP-compatible applications with debugging and testing utilities',
    rating: 4.8,
    reviewCount: 31,
    type: 'Tool',
    version: '1.3.0',
    lastUpdated: '2024-01-10',
    image: 'https://via.placeholder.com/300x150?text=DevTools'
  },
  {
    id: 5,
    name: 'MCP Server Pro',
    description: 'Professional grade MCP server with enhanced performance and security features',
    rating: 4.4,
    reviewCount: 76,
    type: 'Server',
    version: '3.2.1',
    lastUpdated: '2024-02-18',
    image: 'https://via.placeholder.com/300x150?text=ServerPro'
  },
  {
    id: 6,
    name: 'Contextual AI Chat',
    description: 'AI chat application built on the MCP protocol for context-aware conversations',
    rating: 4.3,
    reviewCount: 65,
    type: 'Application',
    version: '1.5.2',
    lastUpdated: '2024-01-30',
    image: 'https://via.placeholder.com/300x150?text=AIChat'
  },
  {
    id: 7,
    name: 'MCP Protocol Explorer',
    description: 'Visualization tool for exploring and understanding MCP data flows',
    rating: 4.1,
    reviewCount: 27,
    type: 'Tool',
    version: '0.8.5',
    lastUpdated: '2023-12-20',
    image: 'https://via.placeholder.com/300x150?text=Explorer'
  },
  {
    id: 8,
    name: 'MCP Server Lite',
    description: 'Lightweight MCP server implementation for testing and development',
    rating: 4.6,
    reviewCount: 39,
    type: 'Server',
    version: '1.0.0',
    lastUpdated: '2024-02-01',
    image: 'https://via.placeholder.com/300x150?text=ServerLite'
  },
  {
    id: 9,
    name: 'Context-Guardian',
    description: 'Privacy-focused MCP application with enhanced security and data encryption',
    rating: 4.7,
    reviewCount: 48,
    type: 'Application',
    version: '2.1.3',
    lastUpdated: '2024-01-05',
    image: 'https://via.placeholder.com/300x150?text=Guardian'
  }
];

// Item type options
const typeOptions = [
  { value: 'all', label: 'All Types' },
  { value: 'Server', label: 'Servers' },
  { value: 'Application', label: 'Applications' },
  { value: 'Tool', label: 'Tools' }
];

// Sort options
const sortOptions = [
  { value: 'rating', label: 'Highest Rating' },
  { value: 'reviewCount', label: 'Most Reviews' },
  { value: 'newest', label: 'Newest' },
  { value: 'name', label: 'Name (A-Z)' }
];

const ServersListPage: React.FC = () => {
  const theme = useTheme();
  
  // States for filtering and sorting
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  // Filtered and sorted items
  const [displayedItems, setDisplayedItems] = useState(mockItems);
  
  // Handle type filter change
  const handleTypeChange = (event: SelectChangeEvent) => {
    setSelectedType(event.target.value as string);
    setCurrentPage(1); // Reset to first page on filter change
  };
  
  // Handle sort change
  const handleSortChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value as string);
  };
  
  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page on search change
  };
  
  // Handle pagination change
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };
  
  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...mockItems];
    
    // Apply type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter(item => item.type === selectedType);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviewCount':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    
    setDisplayedItems(filtered);
  }, [searchQuery, selectedType, sortBy]);
  
  // Calculate pagination
  const totalPages = Math.ceil(displayedItems.length / itemsPerPage);
  const paginatedItems = displayedItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        {/* Page Header */}
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          MCP Servers & Applications
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
          Explore our comprehensive directory of Model Context Protocol servers, 
          applications, and tools. Find the perfect resources for your needs.
        </Typography>
        
        {/* Search and Filter Bar */}
        <Paper 
          elevation={2} 
          sx={{ 
            p: 3, 
            mb: 4, 
            borderRadius: 2,
            backgroundColor: theme.palette.grey[50]
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                placeholder="Search servers & applications..."
                value={searchQuery}
                onChange={handleSearchChange}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={6} sm={3} md={2}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="type-filter-label">Type</InputLabel>
                <Select
                  labelId="type-filter-label"
                  id="type-filter"
                  value={selectedType}
                  onChange={handleTypeChange}
                  label="Type"
                >
                  {typeOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={6} sm={3} md={3}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="sort-label">Sort By</InputLabel>
                <Select
                  labelId="sort-label"
                  id="sort-select"
                  value={sortBy}
                  onChange={handleSortChange}
                  label="Sort By"
                  startAdornment={
                    <InputAdornment position="start">
                      <Sort color="action" />
                    </InputAdornment>
                  }
                >
                  {sortOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: { xs: 'start', md: 'end' } }}>
              <Typography variant="body2" color="text.secondary">
                Showing {displayedItems.length} results
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        
        {/* Results Section */}
        {paginatedItems.length > 0 ? (
          <Grid container spacing={3}>
            {paginatedItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.image}
                    alt={item.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography variant="h6" component="div" gutterBottom>
                        {item.name}
                      </Typography>
                      <Chip 
                        label={item.type} 
                        size="small" 
                        color={
                          item.type === 'Server' ? 'primary' : 
                          item.type === 'Application' ? 'secondary' : 
                          'warning'
                        }
                        variant="outlined"
                      />
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {item.description}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Rating 
                        value={item.rating} 
                        precision={0.1} 
                        size="small" 
                        readOnly 
                      />
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        ({item.reviewCount} reviews)
                      </Typography>
                    </Box>
                    
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary" display="block">
                          Version: {item.version}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary" display="block">
                          Updated: {new Date(item.lastUpdated).toLocaleDateString()}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions>
                    <Button 
                      size="small" 
                      component={Link} 
                      to={`/servers/${item.id}`}
                    >
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="h6" color="text.secondary">
              No results found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search criteria or filters
            </Typography>
          </Box>
        )}
        
        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <Pagination 
              count={totalPages} 
              page={currentPage} 
              onChange={handlePageChange} 
              color="primary" 
              size="large"
              showFirstButton 
              showLastButton
            />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ServersListPage; 