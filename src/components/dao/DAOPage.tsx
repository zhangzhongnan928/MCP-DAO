import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Button, 
  Divider, 
  Card, 
  CardContent, 
  CardActions, 
  Chip, 
  LinearProgress, 
  Avatar, 
  Stack, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogContentText, 
  DialogActions, 
  TextField, 
  FormControl, 
  FormControlLabel, 
  RadioGroup, 
  Radio, 
  Alert, 
  Tabs, 
  Tab,
  List,
  useTheme 
} from '@mui/material';
import { 
  HowToVote, 
  CheckCircle, 
  Cancel, 
  Pending, 
  ThumbUp, 
  ThumbDown, 
  Info, 
  AddCircle, 
  History, 
  Wallet 
} from '@mui/icons-material';

// Mock data for active proposals
const activeProposals = [
  {
    id: 1,
    title: 'Protocol Enhancement: Context Versioning',
    description: 'Add versioning support to MCP context objects to allow for better tracking of changes and compatibility between different versions.',
    proposer: 'ProtocolDev',
    dateCreated: '2024-02-10',
    endDate: '2024-02-25',
    status: 'active',
    votesFor: 1250,
    votesAgainst: 450,
    votesAbstain: 300,
    totalVotes: 2000,
    category: 'protocol'
  },
  {
    id: 2,
    title: 'Community Fund Allocation for Developer Grants',
    description: 'Allocate 50,000 MCP tokens from the community fund to support developers building MCP-compatible applications and tools.',
    proposer: 'MCPFoundation',
    dateCreated: '2024-02-15',
    endDate: '2024-03-01',
    status: 'active',
    votesFor: 1800,
    votesAgainst: 200,
    votesAbstain: 100,
    totalVotes: 2100,
    category: 'funding'
  },
  {
    id: 3,
    title: 'Add Support for Encrypted Contexts',
    description: 'Enhance the MCP specification to support end-to-end encrypted contexts for sensitive applications.',
    proposer: 'SecurityExpert',
    dateCreated: '2024-02-18',
    endDate: '2024-03-04',
    status: 'active',
    votesFor: 950,
    votesAgainst: 850,
    votesAbstain: 200,
    totalVotes: 2000,
    category: 'protocol'
  }
];

// Mock data for past proposals
const pastProposals = [
  {
    id: 101,
    title: 'Increase Token Rewards for Content Submissions',
    description: 'Increase the token rewards for high-quality content submissions to encourage more participation.',
    proposer: 'ContentCreator',
    dateCreated: '2024-01-05',
    endDate: '2024-01-20',
    status: 'passed',
    votesFor: 1800,
    votesAgainst: 200,
    votesAbstain: 100,
    totalVotes: 2100,
    category: 'governance'
  },
  {
    id: 102,
    title: 'Add Support for Binary Context Data',
    description: 'Extend the MCP specification to support binary data in context objects.',
    proposer: 'DataScientist',
    dateCreated: '2024-01-10',
    endDate: '2024-01-25',
    status: 'rejected',
    votesFor: 800,
    votesAgainst: 1200,
    votesAbstain: 100,
    totalVotes: 2100,
    category: 'protocol'
  },
  {
    id: 103,
    title: 'Partnership with AI Research Institute',
    description: 'Establish a formal partnership with the Global AI Research Institute to promote MCP adoption.',
    proposer: 'Partnerships',
    dateCreated: '2023-12-15',
    endDate: '2023-12-30',
    status: 'passed',
    votesFor: 1900,
    votesAgainst: 100,
    votesAbstain: 50,
    totalVotes: 2050,
    category: 'partnership'
  }
];

// Mock user data
const userData = {
  tokenBalance: 245,
  votingPower: 245,
  delegatedPower: 0,
  totalVotingPower: 245,
  votingHistory: [
    { proposalId: 101, vote: 'for', weight: 100 },
    { proposalId: 102, vote: 'against', weight: 150 },
    { proposalId: 103, vote: 'for', weight: 200 }
  ]
};

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

const DAOPage: React.FC = () => {
  const theme = useTheme();
  
  // States
  const [tabValue, setTabValue] = useState(0);
  const [selectedProposal, setSelectedProposal] = useState<any | null>(null);
  const [voteDialogOpen, setVoteDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [voteType, setVoteType] = useState('for');
  const [voteAmount, setVoteAmount] = useState('100');
  const [newProposal, setNewProposal] = useState({
    title: '',
    description: '',
    category: 'protocol'
  });
  
  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  // Open vote dialog
  const handleOpenVoteDialog = (proposal: any) => {
    setSelectedProposal(proposal);
    setVoteDialogOpen(true);
  };
  
  // Close vote dialog
  const handleCloseVoteDialog = () => {
    setVoteDialogOpen(false);
    setSelectedProposal(null);
    setVoteType('for');
    setVoteAmount('100');
  };
  
  // Handle vote submission
  const handleVoteSubmit = () => {
    // In a real app, this would submit the vote to the blockchain
    console.log(`Voted ${voteType} on proposal ${selectedProposal?.id} with ${voteAmount} tokens`);
    handleCloseVoteDialog();
    // Show success message or update UI
  };
  
  // Open create proposal dialog
  const handleOpenCreateDialog = () => {
    setCreateDialogOpen(true);
  };
  
  // Close create proposal dialog
  const handleCloseCreateDialog = () => {
    setCreateDialogOpen(false);
    setNewProposal({
      title: '',
      description: '',
      category: 'protocol'
    });
  };
  
  // Handle proposal creation
  const handleCreateProposal = () => {
    // In a real app, this would submit the proposal to the blockchain
    console.log('Created new proposal:', newProposal);
    handleCloseCreateDialog();
    // Show success message or update UI
  };
  
  // Handle input change for new proposal
  const handleProposalInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProposal(prev => ({ ...prev, [name]: value }));
  };
  
  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return theme.palette.info.main;
      case 'passed':
        return theme.palette.success.main;
      case 'rejected':
        return theme.palette.error.main;
      default:
        return theme.palette.grey[500];
    }
  };
  
  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Pending />;
      case 'passed':
        return <CheckCircle />;
      case 'rejected':
        return <Cancel />;
      default:
        return <Info />;
    }
  };
  
  // Calculate days remaining
  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };
  
  // Render proposal card
  const renderProposalCard = (proposal: any) => {
    const forPercentage = (proposal.votesFor / proposal.totalVotes) * 100;
    const againstPercentage = (proposal.votesAgainst / proposal.totalVotes) * 100;
    const abstainPercentage = (proposal.votesAbstain / proposal.totalVotes) * 100;
    
    return (
      <Card 
        key={proposal.id} 
        elevation={2} 
        sx={{ 
          mb: 3, 
          borderRadius: 2,
          borderLeft: `4px solid ${getStatusColor(proposal.status)}`
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Typography variant="h6" component="div">
              {proposal.title}
            </Typography>
            <Chip 
              icon={getStatusIcon(proposal.status)} 
              label={proposal.status.toUpperCase()} 
              size="small"
              sx={{ 
                bgcolor: getStatusColor(proposal.status),
                color: 'white'
              }}
            />
          </Box>
          
          <Typography variant="body2" color="text.secondary" paragraph>
            {proposal.description}
          </Typography>
          
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="caption" color="text.secondary" display="block">
                Proposer
              </Typography>
              <Typography variant="body2">
                {proposal.proposer}
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="caption" color="text.secondary" display="block">
                Category
              </Typography>
              <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                {proposal.category}
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="caption" color="text.secondary" display="block">
                Created
              </Typography>
              <Typography variant="body2">
                {formatDate(proposal.dateCreated)}
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="caption" color="text.secondary" display="block">
                {proposal.status === 'active' ? 'Ends In' : 'Ended On'}
              </Typography>
              <Typography variant="body2">
                {proposal.status === 'active' 
                  ? `${getDaysRemaining(proposal.endDate)} days` 
                  : formatDate(proposal.endDate)
                }
              </Typography>
            </Grid>
          </Grid>
          
          <Typography variant="subtitle2" gutterBottom>
            Voting Results
          </Typography>
          
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={2} sm={1}>
              <ThumbUp color="success" fontSize="small" />
            </Grid>
            <Grid item xs={10} sm={11}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LinearProgress 
                  variant="determinate" 
                  value={forPercentage} 
                  sx={{ 
                    flexGrow: 1, 
                    height: 8, 
                    borderRadius: 5,
                    backgroundColor: theme.palette.grey[200],
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: theme.palette.success.main
                    }
                  }} 
                />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1, minWidth: 100 }}>
                  {proposal.votesFor.toLocaleString()} ({forPercentage.toFixed(1)}%)
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={2} sm={1}>
              <ThumbDown color="error" fontSize="small" />
            </Grid>
            <Grid item xs={10} sm={11}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LinearProgress 
                  variant="determinate" 
                  value={againstPercentage} 
                  sx={{ 
                    flexGrow: 1, 
                    height: 8, 
                    borderRadius: 5,
                    backgroundColor: theme.palette.grey[200],
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: theme.palette.error.main
                    }
                  }} 
                />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1, minWidth: 100 }}>
                  {proposal.votesAgainst.toLocaleString()} ({againstPercentage.toFixed(1)}%)
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={2} sm={1}>
              <Info color="disabled" fontSize="small" />
            </Grid>
            <Grid item xs={10} sm={11}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LinearProgress 
                  variant="determinate" 
                  value={abstainPercentage} 
                  sx={{ 
                    flexGrow: 1, 
                    height: 8, 
                    borderRadius: 5,
                    backgroundColor: theme.palette.grey[200],
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: theme.palette.grey[500]
                    }
                  }} 
                />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1, minWidth: 100 }}>
                  {proposal.votesAbstain.toLocaleString()} ({abstainPercentage.toFixed(1)}%)
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
        
        {proposal.status === 'active' && (
          <CardActions sx={{ justifyContent: 'flex-end', p: 2, pt: 0 }}>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<HowToVote />}
              onClick={() => handleOpenVoteDialog(proposal)}
            >
              Vote
            </Button>
          </CardActions>
        )}
      </Card>
    );
  };
  
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          MCP DAO Governance
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
          Participate in the governance of the MCP ecosystem through our decentralized autonomous organization.
          Use your MCP tokens to vote on proposals and shape the future of the protocol.
        </Typography>
        
        <Grid container spacing={4}>
          {/* Voting Power Section */}
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar 
                  sx={{ 
                    bgcolor: theme.palette.primary.main, 
                    width: 56, 
                    height: 56,
                    mr: 2
                  }}
                >
                  <HowToVote sx={{ fontSize: 30 }} />
                </Avatar>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Your Voting Power
                  </Typography>
                  <Typography variant="h3" color="primary" sx={{ fontWeight: 700 }}>
                    {userData.totalVotingPower} MCP
                  </Typography>
                </Box>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Token Balance
                  </Typography>
                  <Typography variant="h6">
                    {userData.tokenBalance} MCP
                  </Typography>
                </Grid>
                
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Delegated Power
                  </Typography>
                  <Typography variant="h6">
                    {userData.delegatedPower} MCP
                  </Typography>
                </Grid>
              </Grid>
              
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth 
                sx={{ mt: 3 }}
                startIcon={<AddCircle />}
                onClick={handleOpenCreateDialog}
              >
                Create Proposal
              </Button>
            </Paper>
            
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2, mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Voting History
              </Typography>
              
              {userData.votingHistory.length > 0 ? (
                <List disablePadding>
                  {userData.votingHistory.map((vote) => {
                    const proposal = [...activeProposals, ...pastProposals].find(p => p.id === vote.proposalId);
                    return (
                      <Box key={vote.proposalId} sx={{ mb: 2 }}>
                        <Typography variant="subtitle2">
                          {proposal?.title}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Chip 
                            label={vote.vote.toUpperCase()} 
                            size="small"
                            color={vote.vote === 'for' ? 'success' : vote.vote === 'against' ? 'error' : 'default'}
                            variant="outlined"
                          />
                          <Typography variant="body2" color="text.secondary">
                            {vote.weight} MCP
                          </Typography>
                        </Box>
                      </Box>
                    );
                  })}
                </List>
              ) : (
                <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 2 }}>
                  You haven't voted on any proposals yet.
                </Typography>
              )}
            </Paper>
          </Grid>
          
          {/* Proposals Section */}
          <Grid item xs={12} md={8}>
            <Paper elevation={2} sx={{ borderRadius: 2 }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="fullWidth"
                aria-label="proposal tabs"
              >
                <Tab label="Active Proposals" />
                <Tab label="Past Proposals" />
              </Tabs>
              
              <TabPanel value={tabValue} index={0}>
                {activeProposals.length > 0 ? (
                  activeProposals.map(proposal => renderProposalCard(proposal))
                ) : (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      No active proposals
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      There are currently no active proposals to vote on.
                    </Typography>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      sx={{ mt: 2 }}
                      startIcon={<AddCircle />}
                      onClick={handleOpenCreateDialog}
                    >
                      Create Proposal
                    </Button>
                  </Box>
                )}
              </TabPanel>
              
              <TabPanel value={tabValue} index={1}>
                {pastProposals.length > 0 ? (
                  pastProposals.map(proposal => renderProposalCard(proposal))
                ) : (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      No past proposals
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      There are no completed proposals yet.
                    </Typography>
                  </Box>
                )}
              </TabPanel>
            </Paper>
          </Grid>
        </Grid>
        
        {/* Vote Dialog */}
        <Dialog
          open={voteDialogOpen}
          onClose={handleCloseVoteDialog}
          maxWidth="sm"
          fullWidth
        >
          {selectedProposal && (
            <>
              <DialogTitle>
                Vote on Proposal
              </DialogTitle>
              <DialogContent>
                <DialogContentText paragraph>
                  <strong>{selectedProposal.title}</strong>
                </DialogContentText>
                <DialogContentText paragraph>
                  {selectedProposal.description}
                </DialogContentText>
                
                <Alert severity="info" sx={{ mb: 3 }}>
                  You have {userData.totalVotingPower} MCP voting power available.
                </Alert>
                
                <FormControl component="fieldset" sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Your Vote
                  </Typography>
                  <RadioGroup
                    name="vote-type"
                    value={voteType}
                    onChange={(e) => setVoteType(e.target.value)}
                  >
                    <FormControlLabel value="for" control={<Radio />} label="For" />
                    <FormControlLabel value="against" control={<Radio />} label="Against" />
                    <FormControlLabel value="abstain" control={<Radio />} label="Abstain" />
                  </RadioGroup>
                </FormControl>
                
                <TextField
                  label="Voting Power to Use"
                  type="number"
                  fullWidth
                  value={voteAmount}
                  onChange={(e) => setVoteAmount(e.target.value)}
                  InputProps={{
                    endAdornment: <Typography variant="body2">MCP</Typography>,
                    inputProps: { min: 1, max: userData.totalVotingPower }
                  }}
                  helperText={`Maximum: ${userData.totalVotingPower} MCP`}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseVoteDialog}>Cancel</Button>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={handleVoteSubmit}
                  disabled={parseInt(voteAmount) <= 0 || parseInt(voteAmount) > userData.totalVotingPower}
                >
                  Submit Vote
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
        
        {/* Create Proposal Dialog */}
        <Dialog
          open={createDialogOpen}
          onClose={handleCloseCreateDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            Create New Proposal
          </DialogTitle>
          <DialogContent>
            <DialogContentText paragraph>
              Create a new proposal for the MCP community to vote on. Proposals require a minimum of 100 MCP tokens to create.
            </DialogContentText>
            
            <Alert severity="info" sx={{ mb: 3 }}>
              Creating a proposal will lock 100 MCP tokens until the voting period ends.
            </Alert>
            
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Proposal Title"
                  name="title"
                  value={newProposal.title}
                  onChange={handleProposalInputChange}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Description"
                  name="description"
                  value={newProposal.description}
                  onChange={handleProposalInputChange}
                  multiline
                  rows={6}
                  helperText="Provide a detailed description of your proposal and its benefits to the MCP ecosystem."
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <Typography variant="subtitle2" gutterBottom>
                    Category
                  </Typography>
                  <RadioGroup
                    row
                    name="category"
                    value={newProposal.category}
                    onChange={handleProposalInputChange}
                  >
                    <FormControlLabel value="protocol" control={<Radio />} label="Protocol" />
                    <FormControlLabel value="governance" control={<Radio />} label="Governance" />
                    <FormControlLabel value="funding" control={<Radio />} label="Funding" />
                    <FormControlLabel value="partnership" control={<Radio />} label="Partnership" />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCreateDialog}>Cancel</Button>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleCreateProposal}
              disabled={!newProposal.title || !newProposal.description || userData.tokenBalance < 100}
            >
              Create Proposal
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default DAOPage; 