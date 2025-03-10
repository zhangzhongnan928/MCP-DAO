import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  FormHelperText,
  Stepper,
  Step,
  StepLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
  Alert,
  AlertTitle,
  CircularProgress,
  Stack,
  Divider,
  Autocomplete,
  useTheme,
  List
} from '@mui/material';
import {
  CloudUpload,
  CheckCircleOutline,
  Info,
  Lightbulb,
  Add,
  AutoAwesome
} from '@mui/icons-material';

// Mock data for license options
const licenseOptions = [
  'MIT',
  'Apache-2.0',
  'GPL-3.0',
  'BSD-3-Clause',
  'BSD-2-Clause',
  'Commercial',
  'Freemium',
  'Proprietary',
  'Other'
];

// Mock data for tag suggestions
const tagSuggestions = [
  'open-source',
  'enterprise',
  'scalable',
  'chat',
  'mobile',
  'desktop',
  'cross-platform',
  'security',
  'visualization',
  'development',
  'testing',
  'monitoring',
  'integration'
];

// Steps for the submission process
const steps = [
  'Basic Information',
  'Detailed Description',
  'Links & Tags',
  'Review & Submit'
];

const SubmitPage: React.FC = () => {
  const theme = useTheme();
  
  // Form state
  const [activeStep, setActiveStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  // AI feedback state
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [similarItems, setSimilarItems] = useState<any[]>([]);
  
  // Form fields
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    version: '',
    maintainer: '',
    license: '',
    description: '',
    longDescription: '',
    requirements: '',
    website: '',
    github: '',
    documentation: '',
    tags: [] as string[]
  });
  
  // Form validation
  const [errors, setErrors] = useState({
    name: false,
    type: false,
    description: false
  });
  
  // AI functions - in a real app, these would make API calls to backend services
  
  // Simulate AI analysis of form input
  useEffect(() => {
    // Only run AI analysis if we have some basic data and are on the first step
    if (activeStep === 0 && formData.name.length > 3 && formData.type && formData.description.length > 10) {
      const timer = setTimeout(() => {
        setAiAnalyzing(true);
        
        // Simulate API call delay
        setTimeout(() => {
          // Check for similar items
          const foundSimilar = formData.name.toLowerCase().includes('mcp') || 
                              formData.name.toLowerCase().includes('server') ||
                              formData.name.toLowerCase().includes('protocol');
          
          if (foundSimilar) {
            setSimilarItems([
              {
                id: 1,
                name: 'MCP Server Pro',
                similarity: '75%',
                link: '/servers/5'
              }
            ]);
          } else {
            setSimilarItems([]);
          }
          
          // Generate AI suggestions based on input
          const suggestions = [];
          
          if (formData.type === 'Server') {
            suggestions.push('Consider adding deployment instructions in the detailed description.');
            suggestions.push('Make sure to specify system requirements for optimal performance.');
          }
          
          if (formData.type === 'Application') {
            suggestions.push('Include screenshots of your application in the documentation link.');
            suggestions.push('Specify which MCP servers are compatible with your application.');
          }
          
          if (formData.description.length < 50) {
            suggestions.push('A more detailed description will help users understand your submission better.');
          }
          
          setAiSuggestions(suggestions);
          setAiAnalyzing(false);
        }, 1500);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [activeStep, formData.name, formData.type, formData.description]);
  
  // Handle form field changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field if it exists
    if (name in errors && errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: false }));
    }
  };
  
  // Handle select changes
  const handleSelectChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field if it exists
    if (name in errors && errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: false }));
    }
  };
  
  // Handle tag changes
  const handleTagsChange = (_event: React.SyntheticEvent, newValue: string[]) => {
    setFormData(prev => ({ ...prev, tags: newValue }));
  };
  
  // Validate current step
  const validateStep = () => {
    let valid = true;
    const newErrors = { ...errors };
    
    if (activeStep === 0) {
      // Validate basic information
      if (!formData.name.trim()) {
        newErrors.name = true;
        valid = false;
      }
      
      if (!formData.type) {
        newErrors.type = true;
        valid = false;
      }
      
      if (!formData.description.trim()) {
        newErrors.description = true;
        valid = false;
      }
    }
    
    setErrors(newErrors);
    return valid;
  };
  
  // Handle next step
  const handleNext = () => {
    if (validateStep()) {
      setActiveStep(prev => prev + 1);
    }
  };
  
  // Handle back step
  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };
  
  // Handle form submission
  const handleSubmit = () => {
    setSubmitting(true);
    setSubmitError(null);
    
    // Simulate API call
    setTimeout(() => {
      // 90% chance of success
      if (Math.random() > 0.1) {
        setSubmitSuccess(true);
      } else {
        setSubmitError('There was an error submitting your entry. Please try again.');
      }
      setSubmitting(false);
    }, 2000);
  };
  
  // Reset form
  const handleReset = () => {
    setActiveStep(0);
    setSubmitSuccess(false);
    setSubmitError(null);
    setFormData({
      name: '',
      type: '',
      version: '',
      maintainer: '',
      license: '',
      description: '',
      longDescription: '',
      requirements: '',
      website: '',
      github: '',
      documentation: '',
      tags: []
    });
    setErrors({
      name: false,
      type: false,
      description: false
    });
    setSimilarItems([]);
    setAiSuggestions([]);
  };
  
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Submit MCP Content
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
          Add your MCP server, application, or tool to our directory. Our AI will help ensure 
          your submission is complete and formatted correctly.
        </Typography>
        
        {/* Success message */}
        {submitSuccess ? (
          <Paper 
            elevation={2} 
            sx={{ 
              p: 4, 
              borderRadius: 2, 
              textAlign: 'center',
              mb: 4,
              bgcolor: 'success.light',
              color: 'white'
            }}
          >
            <CheckCircleOutline sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Submission Successful!
            </Typography>
            <Typography variant="body1" paragraph>
              Thank you for your contribution to the MCP ecosystem. Your submission has been 
              received and is now pending review by our team.
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleReset}
              sx={{ mt: 2 }}
            >
              Submit Another
            </Button>
          </Paper>
        ) : (
          <Box>
            {/* Stepper */}
            <Paper elevation={1} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Paper>
            
            <Grid container spacing={4}>
              {/* Form Section */}
              <Grid item xs={12} md={8}>
                <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
                  {/* Step 1: Basic Information */}
                  {activeStep === 0 && (
                    <Box>
                      <Typography variant="h5" gutterBottom>
                        Basic Information
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        Start by providing the basic details about your MCP resource.
                      </Typography>
                      
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            id="name"
                            name="name"
                            label="Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            error={errors.name}
                            helperText={errors.name ? 'Name is required' : ''}
                          />
                        </Grid>
                        
                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth required error={errors.type}>
                            <InputLabel id="type-label">Type</InputLabel>
                            <Select
                              labelId="type-label"
                              id="type"
                              name="type"
                              value={formData.type}
                              label="Type"
                              onChange={handleSelectChange}
                            >
                              <MenuItem value="Server">MCP Server</MenuItem>
                              <MenuItem value="Application">Application</MenuItem>
                              <MenuItem value="Tool">Development Tool</MenuItem>
                            </Select>
                            {errors.type && (
                              <FormHelperText>Type is required</FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            id="version"
                            name="version"
                            label="Version"
                            value={formData.version}
                            onChange={handleInputChange}
                            placeholder="e.g., 1.0.0"
                          />
                        </Grid>
                        
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            id="maintainer"
                            name="maintainer"
                            label="Maintainer"
                            value={formData.maintainer}
                            onChange={handleInputChange}
                            placeholder="Individual or Organization"
                          />
                        </Grid>
                        
                        <Grid item xs={12} sm={6}>
                          <Autocomplete
                            id="license"
                            options={licenseOptions}
                            value={formData.license}
                            onChange={(event, newValue) => {
                              setFormData(prev => ({ ...prev, license: newValue || '' }));
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="License"
                                name="license"
                              />
                            )}
                          />
                        </Grid>
                        
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            id="description"
                            name="description"
                            label="Short Description"
                            value={formData.description}
                            onChange={handleInputChange}
                            multiline
                            rows={3}
                            error={errors.description}
                            helperText={errors.description ? 'Description is required' : 'A brief overview (max 200 characters)'}
                            inputProps={{ maxLength: 200 }}
                          />
                          <Typography variant="caption" color="text.secondary" align="right" sx={{ display: 'block' }}>
                            {formData.description.length}/200
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  )}
                  
                  {/* Step 2: Detailed Description */}
                  {activeStep === 1 && (
                    <Box>
                      <Typography variant="h5" gutterBottom>
                        Detailed Description
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        Provide more detailed information about your MCP resource.
                      </Typography>
                      
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            id="longDescription"
                            name="longDescription"
                            label="Detailed Description"
                            value={formData.longDescription}
                            onChange={handleInputChange}
                            multiline
                            rows={8}
                            placeholder="Describe your resource in detail. Include key features, use cases, and any other relevant information."
                            helperText="Markdown formatting is supported"
                          />
                        </Grid>
                        
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            id="requirements"
                            name="requirements"
                            label="System Requirements"
                            value={formData.requirements}
                            onChange={handleInputChange}
                            multiline
                            rows={3}
                            placeholder="Specify any hardware, software, or other requirements needed to use your resource."
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  )}
                  
                  {/* Step 3: Links & Tags */}
                  {activeStep === 2 && (
                    <Box>
                      <Typography variant="h5" gutterBottom>
                        Links & Tags
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        Add relevant links and tags to help users find your resource.
                      </Typography>
                      
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            id="website"
                            name="website"
                            label="Website URL"
                            value={formData.website}
                            onChange={handleInputChange}
                            placeholder="https://example.com"
                          />
                        </Grid>
                        
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            id="github"
                            name="github"
                            label="GitHub Repository"
                            value={formData.github}
                            onChange={handleInputChange}
                            placeholder="https://github.com/username/repo"
                          />
                        </Grid>
                        
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            id="documentation"
                            name="documentation"
                            label="Documentation URL"
                            value={formData.documentation}
                            onChange={handleInputChange}
                            placeholder="https://docs.example.com"
                          />
                        </Grid>
                        
                        <Grid item xs={12}>
                          <Autocomplete
                            multiple
                            id="tags"
                            options={tagSuggestions}
                            freeSolo
                            value={formData.tags}
                            onChange={handleTagsChange}
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip 
                                  variant="outlined" 
                                  label={option} 
                                  {...getTagProps({ index })} 
                                  key={option}
                                />
                              ))
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Tags"
                                placeholder="Add tags"
                                helperText="Press enter to add a custom tag"
                              />
                            )}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  )}
                  
                  {/* Step 4: Review & Submit */}
                  {activeStep === 3 && (
                    <Box>
                      <Typography variant="h5" gutterBottom>
                        Review & Submit
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        Please review your submission before finalizing.
                      </Typography>
                      
                      <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Typography variant="h6">{formData.name}</Typography>
                            <Chip 
                              label={formData.type} 
                              color={
                                formData.type === 'Server' ? 'primary' : 
                                formData.type === 'Application' ? 'secondary' : 
                                'default'
                              } 
                              size="small" 
                              sx={{ mt: 1 }}
                            />
                          </Grid>
                          
                          <Grid item xs={12}>
                            <Divider sx={{ my: 1 }} />
                          </Grid>
                          
                          <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" color="text.secondary">
                              Version
                            </Typography>
                            <Typography variant="body2">
                              {formData.version || 'Not specified'}
                            </Typography>
                          </Grid>
                          
                          <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" color="text.secondary">
                              Maintainer
                            </Typography>
                            <Typography variant="body2">
                              {formData.maintainer || 'Not specified'}
                            </Typography>
                          </Grid>
                          
                          <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" color="text.secondary">
                              License
                            </Typography>
                            <Typography variant="body2">
                              {formData.license || 'Not specified'}
                            </Typography>
                          </Grid>
                          
                          <Grid item xs={12}>
                            <Typography variant="subtitle2" color="text.secondary">
                              Description
                            </Typography>
                            <Typography variant="body2" paragraph>
                              {formData.description}
                            </Typography>
                          </Grid>
                          
                          {formData.longDescription && (
                            <Grid item xs={12}>
                              <Typography variant="subtitle2" color="text.secondary">
                                Detailed Description
                              </Typography>
                              <Typography variant="body2" paragraph sx={{ whiteSpace: 'pre-line' }}>
                                {formData.longDescription}
                              </Typography>
                            </Grid>
                          )}
                          
                          {formData.requirements && (
                            <Grid item xs={12}>
                              <Typography variant="subtitle2" color="text.secondary">
                                System Requirements
                              </Typography>
                              <Typography variant="body2" paragraph>
                                {formData.requirements}
                              </Typography>
                            </Grid>
                          )}
                          
                          <Grid item xs={12}>
                            <Typography variant="subtitle2" color="text.secondary">
                              Links
                            </Typography>
                            <Typography variant="body2">
                              {formData.website && (
                                <Box component="span" display="block">
                                  Website: {formData.website}
                                </Box>
                              )}
                              {formData.github && (
                                <Box component="span" display="block">
                                  GitHub: {formData.github}
                                </Box>
                              )}
                              {formData.documentation && (
                                <Box component="span" display="block">
                                  Documentation: {formData.documentation}
                                </Box>
                              )}
                              {!formData.website && !formData.github && !formData.documentation && 'No links provided'}
                            </Typography>
                          </Grid>
                          
                          {formData.tags.length > 0 && (
                            <Grid item xs={12}>
                              <Typography variant="subtitle2" color="text.secondary">
                                Tags
                              </Typography>
                              <Box sx={{ mt: 1 }}>
                                {formData.tags.map(tag => (
                                  <Chip 
                                    key={tag} 
                                    label={tag} 
                                    size="small" 
                                    variant="outlined"
                                    sx={{ mr: 1, mb: 1 }}
                                  />
                                ))}
                              </Box>
                            </Grid>
                          )}
                        </Grid>
                      </Paper>
                      
                      {submitError && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                          <AlertTitle>Error</AlertTitle>
                          {submitError}
                        </Alert>
                      )}
                    </Box>
                  )}
                  
                  {/* Navigation buttons */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                    <Box>
                      {activeStep === steps.length - 1 ? (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleSubmit}
                          disabled={submitting}
                          startIcon={submitting ? <CircularProgress size={20} /> : <CloudUpload />}
                        >
                          {submitting ? 'Submitting...' : 'Submit'}
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleNext}
                        >
                          Next
                        </Button>
                      )}
                    </Box>
                  </Box>
                </Paper>
              </Grid>
              
              {/* AI Assistant Section */}
              <Grid item xs={12} md={4}>
                <Paper 
                  elevation={2} 
                  sx={{ 
                    p: 3, 
                    borderRadius: 2,
                    bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.50',
                    border: `1px solid ${theme.palette.primary.light}`,
                    height: '100%'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <AutoAwesome color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">
                      AI Assistant
                    </Typography>
                  </Box>
                  
                  {aiAnalyzing ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 3 }}>
                      <CircularProgress size={30} sx={{ mb: 2 }} />
                      <Typography variant="body2" color="text.secondary">
                        Analyzing your input...
                      </Typography>
                    </Box>
                  ) : (
                    <Box>
                      {/* Similar Items Section */}
                      {similarItems.length > 0 && (
                        <Box sx={{ mb: 3 }}>
                          <Alert severity="info" variant="outlined" sx={{ mb: 2 }}>
                            <AlertTitle>Similar items found</AlertTitle>
                            We found some entries that might be similar to yours. Please check if your submission already exists.
                          </Alert>
                          
                          {similarItems.map(item => (
                            <Paper 
                              key={item.id} 
                              variant="outlined" 
                              sx={{ p: 2, mb: 1 }}
                            >
                              <Typography variant="subtitle2">
                                {item.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Similarity: {item.similarity}
                              </Typography>
                              <Button size="small" color="primary" sx={{ mt: 1 }}>
                                View Item
                              </Button>
                            </Paper>
                          ))}
                        </Box>
                      )}
                      
                      {/* AI Suggestions */}
                      {aiSuggestions.length > 0 ? (
                        <Box>
                          <Typography variant="subtitle2" color="primary" gutterBottom>
                            Suggestions
                          </Typography>
                          <List>
                            {aiSuggestions.map((suggestion, index) => (
                              <Paper 
                                key={index} 
                                variant="outlined" 
                                sx={{ p: 2, mb: 2, bgcolor: theme.palette.background.paper }}
                              >
                                <Box sx={{ display: 'flex' }}>
                                  <Lightbulb color="warning" sx={{ mr: 1, alignSelf: 'flex-start' }} />
                                  <Typography variant="body2">
                                    {suggestion}
                                  </Typography>
                                </Box>
                              </Paper>
                            ))}
                          </List>
                        </Box>
                      ) : (
                        activeStep === 0 && formData.name === '' ? (
                          <Box sx={{ my: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                              Start filling out the form, and I'll provide real-time feedback and suggestions to help improve your submission.
                            </Typography>
                          </Box>
                        ) : (
                          activeStep === 0 && (
                            <Box sx={{ my: 2 }}>
                              <Typography variant="body2" color="text.secondary">
                                Looking good so far! Continue adding information for more specific suggestions.
                              </Typography>
                            </Box>
                          )
                        )
                      )}
                      
                      {/* Tips based on current step */}
                      <Box sx={{ mt: 4 }}>
                        <Typography variant="subtitle2" color="primary" gutterBottom>
                          Tips for this step
                        </Typography>
                        <Paper variant="outlined" sx={{ p: 2, bgcolor: theme.palette.background.paper }}>
                          <Box sx={{ display: 'flex' }}>
                            <Info color="info" sx={{ mr: 1, alignSelf: 'flex-start' }} />
                            <Typography variant="body2">
                              {activeStep === 0 && "Provide a clear, concise name and description to help users understand what your resource does."}
                              {activeStep === 1 && "In the detailed description, highlight key features and use cases. Format with paragraphs for readability."}
                              {activeStep === 2 && "Add relevant tags to make your submission more discoverable. Include all important links."}
                              {activeStep === 3 && "Review all information carefully before submitting. You can go back to previous steps to make changes."}
                            </Typography>
                          </Box>
                        </Paper>
                      </Box>
                    </Box>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default SubmitPage; 