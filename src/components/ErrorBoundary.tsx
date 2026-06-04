import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { Box, Container, Typography, Button, Paper } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import HomeIcon from '@mui/icons-material/Home';
import RefreshIcon from '@mui/icons-material/Refresh';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  };

  private handleRefresh = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      const BORDER = "3px solid #1e293b";
      const SHADOW = "10px 10px 0px #1e293b";

      return (
        <Box 
          sx={{ 
            minHeight: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            bgcolor: '#f8fafc',
            p: 3 
          }}
        >
          <Container maxWidth="sm">
            <Paper 
              elevation={0} 
              sx={{ 
                p: { xs: 4, md: 6 }, 
                textAlign: 'center', 
                borderRadius: 0, 
                border: BORDER, 
                boxShadow: SHADOW,
                bgcolor: 'white'
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                <Box 
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    bgcolor: '#fff1f2', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    color: '#e11d48', 
                    border: '3px solid #1e293b',
                    boxShadow: '4px 4px 0px #1e293b'
                  }}
                >
                  <ErrorIcon sx={{ fontSize: 48 }} />
                </Box>
              </Box>

              <Typography variant="h5" sx={{ fontWeight: "900", mb: 2, color: 'text.primary' }}>
                Oops! Something went wrong.
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.6 }}>
                Our pediatric dental support team has been notified of this technical issue. Please try refreshing the page or navigating back to the homepage.
              </Typography>
              
              {this.state.error && (
                <Box sx={{ mb: 4, p: 2.5, bgcolor: '#fff1f2', border: '2px solid #e11d48', textAlign: 'left', overflow: 'auto', maxHeight: '200px' }}>
                  <Typography variant="subtitle2" color="error.main" sx={{ fontWeight: "bold" }} gutterBottom>
                    Technical Error Details:
                  </Typography>
                  <Typography variant="caption" component="pre" sx={{ fontFamily: 'monospace', color: '#be123c', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                    {this.state.error.toString()}
                  </Typography>
                  
                  {this.state.errorInfo && (
                    <>
                      <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: "bold", mt: 2, mb: 1 }}>
                        Component Stack:
                      </Typography>
                      <Typography variant="caption" component="pre" sx={{ fontFamily: 'monospace', color: '#64748b', fontSize: '0.7rem', whiteSpace: 'pre-wrap' }}>
                        {this.state.errorInfo.componentStack}
                      </Typography>
                    </>
                  )}
                </Box>
              )}

              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                <Button 
                  fullWidth 
                  variant="contained" 
                  onClick={this.handleRefresh} 
                  startIcon={<RefreshIcon />}
                  sx={{ 
                    py: 1.5, 
                    borderRadius: 2, 
                    fontWeight: "900", 
                    textTransform: "uppercase", 
                    boxShadow: "0 2px 8px rgba(2,132,199,0.3)", 
                    bgcolor: "#1b4f93", 
                    color: "white",
                    "&:hover": { bgcolor: "#113a70", boxShadow: "0 4px 12px rgba(2,132,199,0.4)" }
                  }}
                >
                  Refresh Page
                </Button>
                <Button 
                  fullWidth 
                  variant="outlined" 
                  onClick={this.handleReset} 
                  startIcon={<HomeIcon />}
                  sx={{ 
                    py: 1.5, 
                    borderRadius: 2, 
                    fontWeight: "900", 
                    textTransform: "uppercase", 
                    border: "1px solid #e2e8f0", 
                    boxShadow: "0 1px 4px rgba(0,0,0,0.06)", 
                    color: "#1e293b", 
                    bgcolor: "white",
                    "&:hover": { bgcolor: "#f0f9ff", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }
                  }}
                >
                  Go Home
                </Button>
              </Box>
            </Paper>
          </Container>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
