import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  TextField,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemIcon,
  Avatar,
  IconButton,
  Badge,
  Tabs,
  Tab,
  Alert,
  AlertTitle,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Card,
  CardContent,
  CircularProgress,
  useTheme,
  Menu,
  Tooltip
} from '@mui/material';
import {
  CheckCircle,
  Cancel,
  Edit,
  Delete,
  Save,
  MoreVert,
  AutoAwesome,
  Warning,
  Search,
  FilterList,
  SortByAlpha,
  ArrowDropDown,
  Visibility
} from '@mui/icons-material';

// Mock data for submissions
const mockSubmissions = [
  {
    id: 1001,
    name: 'Neural MCP Server',
    type: 'Server',
    description: 'Advanced neural network-based MCP server with enhanced context management',
    version: '0.9.5',
    maintainer: 'NeuralTech Labs',
    license: 'MIT',
    submittedBy: 'developer123',
    submittedDate: '2024-02-15T10:30:00Z',
    status: 'pending',
    aiAnalysis: {
      score: 0.92,
      issues: [],
      suggestions: [
        'Consider adding system requirements in the detailed description.'
      ],
      similar: [
        { id: 5, name: 'MCP Server Pro', similarity: 0.35 }
      ]
    }
  },
  {
    id: 1002,
    name: 'Context Visualizer',
    type: 'Tool',
    description: 'Visualization tool for MCP context interactions and flows',
    version: '1.2.0',
    maintainer: 'DataViz Inc',
    license: 'Apache-2.0',
    submittedBy: 'visualguru',
    submittedDate: '2024-02-10T14:15:00Z',
    status: 'pending',
    aiAnalysis: {
      score: 0.85,
      issues: [
        'Missing detailed description'
      ],
      suggestions: [
        'Add screenshots of the visualization interface',
        'Specify which MCP server versions are compatible'
      ],
      similar: []
    }
  },
  {
    id: 1003,
    name: 'MCP CLI Tool',
    type: 'Tool',
    description: 'Command line interface for interacting with MCP servers and managing contexts',
    version: '0.5.0',
    maintainer: 'CLI Enthusiasts',
    license: 'GPL-3.0',
    submittedBy: 'terminal_lover',
    submittedDate: '2024-02-12T09:45:00Z',
    status: 'approved',
    aiAnalysis: {
      score: 0.78,
      issues: [
        'License might not be compatible with some commercial uses'
      ],
      suggestions: [
        'Add installation instructions for different platforms'
      ],
      similar: []
    }
  },
  {
    id: 1004,
    name: 'MCP Chat Client Pro',
    type: 'Application',
    description: 'Enhanced chat client with advanced MCP protocol support and plugin system',
    version: '3.1.2',
    maintainer: 'ChatPro Software',
    license: 'Commercial',
    submittedBy: 'chat_developer',
    submittedDate: '2024-02-08T16:20:00Z',
    status: 'rejected',
    rejectionReason: 'Duplicate of existing entry (ID: 2)',
    aiAnalysis: {
      score: 0.65,
      issues: [
        'Highly similar to existing MCP Chat Client (ID: 2)'
      ],
      suggestions: [],
      similar: [
        { id: 2, name: 'MCP Chat Client', similarity: 0.92 }
      ]
    }
  },
  {
    id: 1005,
    name: 'Secure MCP Server',
    type: 'Server',
    description: 'Security-focused MCP server implementation with encryption and access controls',
    version: '1.0.0',
    maintainer: 'SecureProtocols',
    license: 'BSD-3-Clause',
    submittedBy: 'security_expert',
    submittedDate: '2024-02-14T11:05:00Z',
    status: 'pending',
    aiAnalysis: {
      score: 0.88,
      issues: [],
      suggestions: [
        'Add details about the encryption methods used',
        'Specify security certifications if any'
      ],
      similar: [
        { id: 1, name: 'OpenMCP Server', similarity: 0.45 }
      ]
    }
  }
];

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

const AdminReviewPage: React.FC = () => {
  const theme = useTheme();
  
  // States
  const [tabValue, setTabValue] = useState(0);
  const [submissions, setSubmissions] = useState(mockSubmissions);
  const [filteredSubmissions, setFilteredSubmissions] = useState(mockSubmissions);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [currentSubmission, setCurrentSubmission] = useState<any | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [editNotes, setEditNotes] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Menu anchor state
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [activeSubmissionId, setActiveSubmissionId] = useState<number | null>(null);
  
  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...submissions];
    
    // Filter by tab
    if (tabValue === 0) { // Pending
      filtered = filtered.filter(item => item.status === 'pending');
    } else if (tabValue === 1) { // Approved
      filtered = filtered.filter(item => item.status === 'approved');
    } else if (tabValue === 2) { // Rejected
      filtered = filtered.filter(item => item.status === 'rejected');
    }
    
    // Filter by type if not "all"
    if (filterType !== 'all') {
      filtered = filtered.filter(item => item.type === filterType);
    }
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query) ||
        item.submittedBy.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.submittedDate).getTime() - new Date(b.submittedDate).getTime());
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'aiScore':
        filtered.sort((a, b) => b.aiAnalysis.score - a.aiAnalysis.score);
        break;
      default:
        break;
    }
    
    setFilteredSubmissions(filtered);
  }, [submissions, tabValue, filterType, searchQuery, sortBy]);
  
  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  // Handle filter type change
  const handleFilterTypeChange = (event: SelectChangeEvent) => {
    setFilterType(event.target.value);
  };
  
  // Handle sort change
  const handleSortChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
  };
  
  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  
  // Handle menu open
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, submissionId: number) => {
    setMenuAnchorEl(event.currentTarget);
    setActiveSubmissionId(submissionId);
  };
  
  // Handle menu close
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setActiveSubmissionId(null);
  };
  
  // Handle view submission
  const handleViewSubmission = (submissionId: number) => {
    const submission = submissions.find(s => s.id === submissionId);
    setCurrentSubmission(submission);
    setIsViewDialogOpen(true);
    handleMenuClose();
  };
  
  // Handle open action dialog
  const handleOpenActionDialog = (type: 'approve' | 'reject', submissionId: number) => {
    const submission = submissions.find(s => s.id === submissionId);
    setCurrentSubmission(submission);
    setActionType(type);
    setRejectionReason('');
    setIsActionDialogOpen(true);
    handleMenuClose();
  };
  
  // Handle close dialogs
  const handleCloseDialogs = () => {
    setIsViewDialogOpen(false);
    setIsActionDialogOpen(false);
    setCurrentSubmission(null);
    setActionType(null);
    setRejectionReason('');
    setEditNotes('');
  };
  
  // Handle submission action
  const handleSubmissionAction = () => {
    if (!currentSubmission || !actionType) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedSubmissions = submissions.map(submission => {
        if (submission.id === currentSubmission.id) {
          return {
            ...submission,
            status: actionType,
            rejectionReason: actionType === 'reject' ? (rejectionReason || '') : undefined,
            editNotes: editNotes || undefined
          };
        }
        return submission;
      });
      
      setSubmissions(updatedSubmissions as any); // Type assertion to fix the error
      setLoading(false);
      handleCloseDialogs();
    }, 1000);
  };
  
  // Get badge count for tabs
  const getBadgeCount = (status: string) => {
    return submissions.filter(s => s.status === status).length;
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };
  
  // Get AI score color
  const getAiScoreColor = (score: number) => {
    if (score >= 0.8) return theme.palette.success.main;
    if (score >= 0.6) return theme.palette.warning.main;
    return theme.palette.error.main;
  };
  
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Review Submissions
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
          Review and process user submissions. Our AI has analyzed each submission and provided suggestions.
        </Typography>
        
        {/* Tabs */}
        <Paper elevation={2} sx={{ mb: 4, borderRadius: 2 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            aria-label="submission tabs"
          >
            <Tab 
              label={
                <Badge badgeContent={getBadgeCount('pending')} color="warning">
                  <Typography sx={{ mx: 1 }}>Pending</Typography>
                </Badge>
              } 
            />
            <Tab 
              label={
                <Badge badgeContent={getBadgeCount('approved')} color="success">
                  <Typography sx={{ mx: 1 }}>Approved</Typography>
                </Badge>
              } 
            />
            <Tab 
              label={
                <Badge badgeContent={getBadgeCount('rejected')} color="error">
                  <Typography sx={{ mx: 1 }}>Rejected</Typography>
                </Badge>
              } 
            />
          </Tabs>
        </Paper>
        
        {/* Filter and Search */}
        <Paper elevation={1} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                placeholder="Search submissions..."
                value={searchQuery}
                onChange={handleSearchChange}
                variant="outlined"
                size="small"
                InputProps={{
                  startAdornment: <Search color="action" sx={{ mr: 1 }} />
                }}
              />
            </Grid>
            
            <Grid item xs={6} sm={3} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel id="filter-type-label">Type</InputLabel>
                <Select
                  labelId="filter-type-label"
                  value={filterType}
                  label="Type"
                  onChange={handleFilterTypeChange}
                  startAdornment={<FilterList fontSize="small" sx={{ mr: 1 }} />}
                >
                  <MenuItem value="all">All Types</MenuItem>
                  <MenuItem value="Server">Servers</MenuItem>
                  <MenuItem value="Application">Applications</MenuItem>
                  <MenuItem value="Tool">Tools</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={6} sm={3} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel id="sort-by-label">Sort By</InputLabel>
                <Select
                  labelId="sort-by-label"
                  value={sortBy}
                  label="Sort By"
                  onChange={handleSortChange}
                  startAdornment={<SortByAlpha fontSize="small" sx={{ mr: 1 }} />}
                >
                  <MenuItem value="newest">Newest First</MenuItem>
                  <MenuItem value="oldest">Oldest First</MenuItem>
                  <MenuItem value="name">Name (A-Z)</MenuItem>
                  <MenuItem value="aiScore">AI Score</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                {filteredSubmissions.length} {filteredSubmissions.length === 1 ? 'submission' : 'submissions'} found
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        
        {/* Submissions List */}
        <TabPanel value={tabValue} index={0}>
          <SubmissionsList 
            submissions={filteredSubmissions}
            handleViewSubmission={handleViewSubmission}
            handleOpenActionDialog={handleOpenActionDialog}
            handleMenuOpen={handleMenuOpen}
            menuAnchorEl={menuAnchorEl}
            activeSubmissionId={activeSubmissionId}
            handleMenuClose={handleMenuClose}
            getAiScoreColor={getAiScoreColor}
            formatDate={formatDate}
          />
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <SubmissionsList 
            submissions={filteredSubmissions}
            handleViewSubmission={handleViewSubmission}
            handleOpenActionDialog={handleOpenActionDialog}
            handleMenuOpen={handleMenuOpen}
            menuAnchorEl={menuAnchorEl}
            activeSubmissionId={activeSubmissionId}
            handleMenuClose={handleMenuClose}
            getAiScoreColor={getAiScoreColor}
            formatDate={formatDate}
          />
        </TabPanel>
        
        <TabPanel value={tabValue} index={2}>
          <SubmissionsList 
            submissions={filteredSubmissions}
            handleViewSubmission={handleViewSubmission}
            handleOpenActionDialog={handleOpenActionDialog}
            handleMenuOpen={handleMenuOpen}
            menuAnchorEl={menuAnchorEl}
            activeSubmissionId={activeSubmissionId}
            handleMenuClose={handleMenuClose}
            getAiScoreColor={getAiScoreColor}
            formatDate={formatDate}
          />
        </TabPanel>
        
        {/* View Submission Dialog */}
        <Dialog
          open={isViewDialogOpen}
          onClose={handleCloseDialogs}
          maxWidth="md"
          fullWidth
        >
          {currentSubmission && (
            <>
              <DialogTitle>
                Submission Details
                <IconButton
                  aria-label="close"
                  onClick={handleCloseDialogs}
                  sx={{ position: 'absolute', right: 8, top: 8 }}
                >
                  <Cancel />
                </IconButton>
              </DialogTitle>
              <DialogContent dividers>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={8}>
                    <Typography variant="h5" gutterBottom>
                      {currentSubmission.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Chip 
                        label={currentSubmission.type} 
                        color={
                          currentSubmission.type === 'Server' ? 'primary' : 
                          currentSubmission.type === 'Application' ? 'secondary' : 
                          'default'
                        } 
                        size="small" 
                        sx={{ mr: 1 }}
                      />
                      <Chip 
                        label={currentSubmission.status} 
                        color={
                          currentSubmission.status === 'approved' ? 'success' : 
                          currentSubmission.status === 'rejected' ? 'error' : 
                          'warning'
                        } 
                        size="small" 
                      />
                    </Box>
                    
                    <Typography variant="body1" paragraph>
                      {currentSubmission.description}
                    </Typography>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={4}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Version
                        </Typography>
                        <Typography variant="body2">
                          {currentSubmission.version}
                        </Typography>
                      </Grid>
                      
                      <Grid item xs={12} sm={4}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Maintainer
                        </Typography>
                        <Typography variant="body2">
                          {currentSubmission.maintainer}
                        </Typography>
                      </Grid>
                      
                      <Grid item xs={12} sm={4}>
                        <Typography variant="subtitle2" color="text.secondary">
                          License
                        </Typography>
                        <Typography variant="body2">
                          {currentSubmission.license}
                        </Typography>
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Submitted By
                        </Typography>
                        <Typography variant="body2">
                          {currentSubmission.submittedBy}
                        </Typography>
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Submitted Date
                        </Typography>
                        <Typography variant="body2">
                          {formatDate(currentSubmission.submittedDate)}
                        </Typography>
                      </Grid>
                      
                      {currentSubmission.status === 'rejected' && currentSubmission.rejectionReason && (
                        <Grid item xs={12}>
                          <Alert severity="error" sx={{ mt: 2 }}>
                            <AlertTitle>Rejection Reason</AlertTitle>
                            {currentSubmission.rejectionReason}
                          </Alert>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                  
                  <Grid item xs={12} sm={4}>
                    <Paper
                      variant="outlined"
                      sx={{
                        p: 2,
                        borderColor: theme.palette.primary.light,
                        bgcolor: theme.palette.grey[50],
                        height: '100%'
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <AutoAwesome color="primary" sx={{ mr: 1 }} />
                        <Typography variant="h6">
                          AI Analysis
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                          Quality Score:
                        </Typography>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            color: getAiScoreColor(currentSubmission.aiAnalysis.score),
                            fontWeight: 'bold'
                          }}
                        >
                          {(currentSubmission.aiAnalysis.score * 100).toFixed(0)}%
                        </Typography>
                      </Box>
                      
                      {currentSubmission.aiAnalysis.issues.length > 0 && (
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="subtitle2" color="error" gutterBottom>
                            Issues Detected:
                          </Typography>
                          <List dense disablePadding>
                            {currentSubmission.aiAnalysis.issues.map((issue: string, index: number) => (
                              <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                                <ListItemIcon sx={{ minWidth: 30 }}>
                                  <Warning fontSize="small" color="error" />
                                </ListItemIcon>
                                <ListItemText primary={issue} />
                              </ListItem>
                            ))}
                          </List>
                        </Box>
                      )}
                      
                      {currentSubmission.aiAnalysis.suggestions.length > 0 && (
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="subtitle2" color="primary" gutterBottom>
                            Suggestions:
                          </Typography>
                          <List dense disablePadding>
                            {currentSubmission.aiAnalysis.suggestions.map((suggestion: string, index: number) => (
                              <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                                <ListItemIcon sx={{ minWidth: 30 }}>
                                  <AutoAwesome fontSize="small" color="primary" />
                                </ListItemIcon>
                                <ListItemText primary={suggestion} />
                              </ListItem>
                            ))}
                          </List>
                        </Box>
                      )}
                      
                      {currentSubmission.aiAnalysis.similar.length > 0 && (
                        <Box>
                          <Typography variant="subtitle2" color="warning.dark" gutterBottom>
                            Similar Items:
                          </Typography>
                          {currentSubmission.aiAnalysis.similar.map((item: any, index: number) => (
                            <Box key={index} sx={{ mb: 1 }}>
                              <Typography variant="body2">
                                {item.name} (ID: {item.id})
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Similarity: {(item.similarity * 100).toFixed(0)}%
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      )}
                    </Paper>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialogs}>Close</Button>
                {currentSubmission.status === 'pending' && (
                  <>
                    <Button 
                      color="error" 
                      onClick={() => handleOpenActionDialog('reject', currentSubmission.id)}
                    >
                      Reject
                    </Button>
                    <Button 
                      color="success" 
                      variant="contained"
                      onClick={() => handleOpenActionDialog('approve', currentSubmission.id)}
                    >
                      Approve
                    </Button>
                  </>
                )}
              </DialogActions>
            </>
          )}
        </Dialog>
        
        {/* Action Dialog */}
        <Dialog
          open={isActionDialogOpen}
          onClose={handleCloseDialogs}
          maxWidth="sm"
          fullWidth
        >
          {currentSubmission && actionType && (
            <>
              <DialogTitle>
                {actionType === 'approve' ? 'Approve Submission' : 'Reject Submission'}
              </DialogTitle>
              <DialogContent>
                <DialogContentText paragraph>
                  {actionType === 'approve' 
                    ? `Are you sure you want to approve "${currentSubmission.name}"?` 
                    : `Are you sure you want to reject "${currentSubmission.name}"?`
                  }
                </DialogContentText>
                
                {actionType === 'reject' && (
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Rejection Reason"
                    fullWidth
                    multiline
                    rows={3}
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    required
                    helperText="Please provide a reason for rejection that will be shown to the submitter"
                  />
                )}
                
                <TextField
                  margin="dense"
                  label="Admin Notes (Optional)"
                  fullWidth
                  multiline
                  rows={2}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  helperText="These notes are visible only to administrators"
                  sx={{ mt: 2 }}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialogs}>Cancel</Button>
                <Button 
                  variant="contained"
                  color={actionType === 'approve' ? 'success' : 'error'}
                  onClick={handleSubmissionAction}
                  disabled={loading || (actionType === 'reject' && !rejectionReason)}
                  startIcon={loading ? <CircularProgress size={20} /> : null}
                >
                  {loading 
                    ? 'Processing...' 
                    : actionType === 'approve' 
                      ? 'Approve' 
                      : 'Reject'
                  }
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Container>
    </Box>
  );
};

// SubmissionsList component
interface SubmissionsListProps {
  submissions: any[];
  handleViewSubmission: (id: number) => void;
  handleOpenActionDialog: (type: 'approve' | 'reject', id: number) => void;
  handleMenuOpen: (event: React.MouseEvent<HTMLElement>, id: number) => void;
  menuAnchorEl: HTMLElement | null;
  activeSubmissionId: number | null;
  handleMenuClose: () => void;
  getAiScoreColor: (score: number) => string;
  formatDate: (date: string) => string;
}

const SubmissionsList: React.FC<SubmissionsListProps> = ({
  submissions,
  handleViewSubmission,
  handleOpenActionDialog,
  handleMenuOpen,
  menuAnchorEl,
  activeSubmissionId,
  handleMenuClose,
  getAiScoreColor,
  formatDate
}) => {
  if (submissions.length === 0) {
    return (
      <Paper elevation={0} sx={{ p: 4, textAlign: 'center', bgcolor: 'grey.50' }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No submissions found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Try adjusting your search criteria or filters
        </Typography>
      </Paper>
    );
  }
  
  return (
    <List sx={{ width: '100%' }}>
      {submissions.map((submission) => (
        <Paper 
          key={submission.id} 
          elevation={1} 
          sx={{ 
            mb: 2, 
            borderRadius: 2,
            borderLeft: submission.status === 'pending' 
              ? `4px solid ${submission.aiAnalysis.issues.length > 0 ? 'orange' : 'green'}`
              : undefined
          }}
        >
          <ListItem
            alignItems="flex-start"
            secondaryAction={
              <IconButton 
                edge="end" 
                aria-label="options"
                onClick={(e) => handleMenuOpen(e, submission.id)}
              >
                <MoreVert />
              </IconButton>
            }
            sx={{ py: 2 }}
          >
            <ListItemAvatar>
              <Avatar 
                sx={{ 
                  bgcolor: submission.type === 'Server' 
                    ? 'primary.main' 
                    : submission.type === 'Application' 
                      ? 'secondary.main' 
                      : 'warning.main'
                }}
              >
                {submission.name.charAt(0)}
              </Avatar>
            </ListItemAvatar>
            
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h6" component="span">
                    {submission.name}
                  </Typography>
                  <Chip 
                    label={submission.type} 
                    size="small" 
                    color={
                      submission.type === 'Server' ? 'primary' : 
                      submission.type === 'Application' ? 'secondary' : 
                      'default'
                    }
                    variant="outlined"
                    sx={{ ml: 1 }}
                  />
                  {submission.status !== 'pending' && (
                    <Chip 
                      label={submission.status} 
                      size="small" 
                      color={submission.status === 'approved' ? 'success' : 'error'}
                      sx={{ ml: 1 }}
                    />
                  )}
                </Box>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                    sx={{ display: 'block', mt: 1 }}
                  >
                    {submission.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, flexWrap: 'wrap' }}>
                    <Typography variant="caption" color="text.secondary" sx={{ mr: 2 }}>
                      Submitted by: {submission.submittedBy}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mr: 2 }}>
                      Date: {formatDate(submission.submittedDate)}
                    </Typography>
                    <Typography variant="caption" sx={{ mr: 2 }}>
                      Version: {submission.version}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
                      <Tooltip title="AI Quality Score">
                        <Chip 
                          icon={<AutoAwesome fontSize="small" />}
                          label={`${(submission.aiAnalysis.score * 100).toFixed(0)}%`}
                          size="small"
                          sx={{ 
                            fontWeight: 'bold',
                            bgcolor: getAiScoreColor(submission.aiAnalysis.score),
                            color: 'white'
                          }}
                        />
                      </Tooltip>
                      
                      {submission.aiAnalysis.issues.length > 0 && (
                        <Tooltip title={`${submission.aiAnalysis.issues.length} issues detected`}>
                          <Chip 
                            icon={<Warning fontSize="small" />}
                            label={submission.aiAnalysis.issues.length}
                            size="small"
                            sx={{ ml: 1, bgcolor: 'warning.light' }}
                          />
                        </Tooltip>
                      )}
                    </Box>
                  </Box>
                </React.Fragment>
              }
            />
          </ListItem>
          
          {submission.status === 'rejected' && submission.rejectionReason && (
            <Box sx={{ px: 2, pb: 2 }}>
              <Alert severity="error" variant="outlined">
                <AlertTitle>Rejection Reason</AlertTitle>
                {submission.rejectionReason}
              </Alert>
            </Box>
          )}
        </Paper>
      ))}
      
      {/* Options Menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => activeSubmissionId && handleViewSubmission(activeSubmissionId)}>
          <Visibility fontSize="small" sx={{ mr: 1 }} />
          View Details
        </MenuItem>
        {submissions.find(s => s.id === activeSubmissionId)?.status === 'pending' && (
          <>
            <MenuItem 
              onClick={() => activeSubmissionId && handleOpenActionDialog('approve', activeSubmissionId)}
              sx={{ color: 'success.main' }}
            >
              <CheckCircle fontSize="small" sx={{ mr: 1 }} />
              Approve
            </MenuItem>
            <MenuItem 
              onClick={() => activeSubmissionId && handleOpenActionDialog('reject', activeSubmissionId)}
              sx={{ color: 'error.main' }}
            >
              <Cancel fontSize="small" sx={{ mr: 1 }} />
              Reject
            </MenuItem>
          </>
        )}
      </Menu>
    </List>
  );
};

export default AdminReviewPage; 