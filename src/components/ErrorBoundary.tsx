import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Container, Typography, Button, Paper, Collapse, Divider } from '@mui/material';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import RefreshIcon from '@mui/icons-material/Refresh';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  showDetails: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
    showDetails: false
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in SWDR App:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleResetCache = () => {
    if (window.confirm('This will reset your local CMS data (Events & News) to stable default templates. Proceed?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <Box 
          sx={{ 
            minHeight: '100vh', 
            bgcolor: '#f8fafc', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            py: 6,
            px: 2
          }}
        >
          <Container maxWidth="sm">
            <Paper 
              elevation={0}
              sx={{
                p: { xs: 4, md: 5 },
                borderRadius: 5,
                border: '1px solid',
                borderColor: 'error.light',
                bgcolor: 'white',
                textAlign: 'center',
                boxShadow: '0 10px 30px rgba(225, 29, 72, 0.05)'
              }}
            >
              <Box 
                sx={{ 
                  width: 70, 
                  height: 70, 
                  borderRadius: '50%', 
                  bgcolor: 'error.light', 
                  color: 'error.main', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3
                }}
              >
                <ReportProblemIcon sx={{ fontSize: 40 }} />
              </Box>

              <Typography variant="h5" fontWeight="900" gutterBottom sx={{ color: '#1e293b' }}>
                Application Caught a Warning
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
                Smile with Dr. Rome's diagnostic safeguard caught a runtime rendering issue. 
                This usually occurs due to a browser caching glitch or incompatible mock data structure entered via CMS.
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', mb: 4 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<RefreshIcon />}
                  onClick={this.handleReload}
                  sx={{ borderRadius: 2.5, px: 3, py: 1.2, textTransform: 'none' }}
                >
                  Reload Page
                </Button>
                
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<RestartAltIcon />}
                  onClick={this.handleResetCache}
                  sx={{ borderRadius: 2.5, px: 3, py: 1.2, textTransform: 'none' }}
                >
                  Reset CMS Database
                </Button>
              </Box>

              <Button 
                variant="text" 
                size="small" 
                onClick={() => this.setState(prev => ({ showDetails: !prev.showDetails }))}
                sx={{ textTransform: 'none', fontWeight: 'bold' }}
              >
                {this.state.showDetails ? 'Hide Diagnostics' : 'Show Diagnostic Logs'}
              </Button>

              <Collapse in={this.state.showDetails} sx={{ mt: 3, textAlign: 'left' }}>
                <Divider sx={{ mb: 2 }} />
                <Box 
                  sx={{ 
                    bgcolor: 'grey.50', 
                    p: 2.5, 
                    borderRadius: 3, 
                    border: '1px solid', 
                    borderColor: 'grey.200',
                    maxHeight: 250,
                    overflowY: 'auto'
                  }}
                >
                  <Typography variant="subtitle2" color="error.main" fontWeight="bold" gutterBottom>
                    Error details:
                  </Typography>
                  <Typography 
                    variant="caption" 
                    component="pre" 
                    sx={{ 
                      fontFamily: 'monospace', 
                      display: 'block', 
                      whiteSpace: 'pre-wrap', 
                      wordBreak: 'break-all',
                      color: 'text.primary'
                    }}
                  >
                    {this.state.error && this.state.error.toString()}
                  </Typography>
                  
                  {this.state.errorInfo && (
                    <>
                      <Typography variant="subtitle2" color="text.secondary" fontWeight="bold" sx={{ mt: 2, mb: 1 }}>
                        Component Stack Trace:
                      </Typography>
                      <Typography 
                        variant="caption" 
                        component="pre" 
                        sx={{ 
                          fontFamily: 'monospace', 
                          display: 'block', 
                          whiteSpace: 'pre-wrap', 
                          fontSize: '0.75rem',
                          color: 'text.secondary' 
                        }}
                      >
                        {this.state.errorInfo.componentStack}
                      </Typography>
                    </>
                  )}
                </Box>
              </Collapse>

            </Paper>
          </Container>
        </Box>
      );
    }

    return this.props.children;
  }
}
