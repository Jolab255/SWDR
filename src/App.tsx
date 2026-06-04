import { useState, useEffect, lazy, Suspense } from 'react';
import { createTheme, ThemeProvider, CssBaseline, Box, CircularProgress } from '@mui/material';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DonateWidget from './components/DonateWidget';

// Lazy load pages for performance (Code Splitting)
const Home = lazy(() => import('./pages/Home'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const WhyWeStarted = lazy(() => import('./pages/WhyWeStarted'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const CMSDashboard = lazy(() => import('./pages/CMSDashboard'));

// Sleek loading placeholder for lazy components
const PageLoader = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', bgcolor: 'white' }}>
    <CircularProgress size={50} thickness={4} sx={{ color: '#1b4f93' }} />
  </Box>
);

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Define our premium blue & white theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1b4f93', // Sky Blue primary
      light: '#e0f2fe', // Extremely soft blue highlights
      dark: '#113a70', // Deep navy blue
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#113a70', // Deep Cobalt/Navy Blue
      light: '#f0f9ff', // Extra soft ice blue highlight
      dark: '#1e293b', // Midnight Blue / Dark Slate
      contrastText: '#ffffff',
    },
    success: {
      main: '#1b4f93', // Sky Blue success
      light: '#e0f2fe', // Soft ice blue success
      dark: '#113a70', // Deep blue success
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
            boxShadow: '0 4px 12px rgba(27, 79, 147, 0.15)',
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
  const [donateOpen, setDonateOpen] = useState<boolean>(false);
  const location = useLocation();

  const handleDonateOpen = () => {
    setDonateOpen(true);
  };

  const handleDonateClose = () => {
    setDonateOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ScrollToTop />

      {/* Dynamic SEO Meta Tags */}
      <Helmet>
        <link rel="canonical" href={`https://smilewithdrrome.org${location.pathname === '/' ? '' : location.pathname}`} />
      </Helmet>

      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100vw' }}>
        
        {/* Sticky Header Navigation */}
        <Navbar onDonateClick={handleDonateOpen} />

        {/* Dynamic Canvas Area */}
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home onDonateClick={handleDonateOpen} />} />
              <Route path="/about" element={<AboutUs onDonateClick={handleDonateOpen} />} />
              <Route path="/why-we-started" element={<WhyWeStarted onDonateClick={handleDonateOpen} />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/cms" element={<CMSDashboard />} />
              {/* Fallback to Home */}
              <Route path="*" element={<Home onDonateClick={handleDonateOpen} />} />
            </Routes>
          </Suspense>
        </Box>

        {/* Unified Portal Footer */}
        <Footer />

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
