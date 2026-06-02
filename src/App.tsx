import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider, CssBaseline, Box } from '@mui/material';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import WhyWeStarted from './pages/WhyWeStarted';
import ContactUs from './pages/ContactUs';
import CMSDashboard from './pages/CMSDashboard';
import DonateWidget from './components/DonateWidget';

// Define our premium blue & white theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#0284c7', // Sky Blue primary
      light: '#e0f2fe', // Extremely soft blue highlights
      dark: '#0369a1', // Deep navy blue
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#0369a1', // Deep Cobalt/Navy Blue
      light: '#f0f9ff', // Extra soft ice blue highlight
      dark: '#1e293b', // Midnight Blue / Dark Slate
      contrastText: '#ffffff',
    },
    success: {
      main: '#0284c7', // Sky Blue success
      light: '#e0f2fe', // Soft ice blue success
      dark: '#0369a1', // Deep blue success
    },
    background: {
      default: '#f8fafc', // Sleek soft blue-grey canvas
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b', // Premium charcoal
      secondary: '#475569', // Cool grey
    },
  },
  typography: {
    fontFamily: '"Outfit", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 900,
    },
    h2: {
      fontWeight: 800,
    },
    h3: {
      fontWeight: 800,
    },
    h4: {
      fontWeight: 800,
    },
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
    },
    subtitle1: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 700,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 0,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '0px', // Completely square corners
          padding: '8px 20px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(2, 132, 199, 0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '0px',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.02)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '0px',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '0px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '0px',
          },
        },
      },
    },
  },
});

function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [donateOpen, setDonateOpen] = useState<boolean>(false);

  // Scroll to top automatically when switching pages
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleDonateOpen = () => {
    setDonateOpen(true);
  };

  const handleDonateClose = () => {
    setDonateOpen(false);
  };

  // Content switcher based on active page state
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onDonateClick={handleDonateOpen} setCurrentPage={setCurrentPage} />;
      case 'about':
        return <AboutUs onDonateClick={handleDonateOpen} />;
      case 'why-we-started':
        return <WhyWeStarted onDonateClick={handleDonateOpen} setCurrentPage={setCurrentPage} />;
      case 'contact':
        return <ContactUs />;
      case 'cms':
        return <CMSDashboard />;
      default:
        return <Home onDonateClick={handleDonateOpen} setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100vw' }}>
        
        {/* Sticky Header Navigation */}
        <Navbar 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage} 
          onDonateClick={handleDonateOpen} 
        />

        {/* Dynamic Canvas Area */}
        <Box component="main" sx={{ flexGrow: 1 }}>
          {renderPage()}
        </Box>

        {/* Unified Portal Footer */}
        <Footer 
          setCurrentPage={setCurrentPage} 
          onDonateClick={handleDonateOpen} 
        />

        {/* Global checkout donation dialog */}
        <DonateWidget 
          open={donateOpen} 
          onClose={handleDonateClose} 
        />

      </Box>
    </ThemeProvider>
  );
}

export default App;
