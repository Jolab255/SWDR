import { useState } from 'react';
// Force Vite HMR cache invalidation
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  onDonateClick: () => void;
}

export default function Navbar({ onDonateClick }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const navItems = [
    { id: '/', label: 'Home' },
    { id: '/about', label: 'About Us' },
    { id: '/why-we-started', label: 'Why We Started' },
    { id: '/collaborators', label: 'Collaborators' },
    { id: '/contact', label: 'Contact Us' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{
          bgcolor: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          color: 'text.primary',
          zIndex: theme.zIndex.drawer + 1
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: 75 }}>
            
            {/* Logo Image */}
            <Box 
              component={Link}
              to="/"
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                cursor: 'pointer',
                userSelect: 'none',
                textDecoration: 'none',
                ml: { xs: 1, sm: 2.5 }
              }}
            >
              <Box 
                component="img"
                src="/logo.png"
                alt="Smile with Doctor Rome"
                sx={{ 
                  height: { xs: 45, md: 54 },
                  width: 'auto',
                  display: 'block',
                  objectFit: 'contain'
                }}
              />
              <Box 
                sx={{ 
                  height: 38, 
                  width: '3px', 
                  bgcolor: '#1e293b', 
                  mx: 2, 
                  display: { xs: 'none', sm: 'block' }
                }} 
              />
              <Box 
                sx={{ 
                  display: { xs: 'none', sm: 'flex' }, 
                  flexDirection: 'column', 
                  justifyContent: 'center',
                  lineHeight: 1.05
                }}
              >
                <Typography 
                  sx={{ 
                    fontSize: '0.55rem', 
                    fontWeight: 500, 
                    color: '#1e293b', 
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    lineHeight: 1.1
                  }}
                >
                  A COMMUNITY
                </Typography>
                <Typography 
                  sx={{ 
                    fontSize: '0.55rem', 
                    fontWeight: 500, 
                    color: '#1e293b', 
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    lineHeight: 1.1
                  }}
                >
                  BASED
                </Typography>
                <Typography 
                  sx={{ 
                    fontSize: '0.55rem', 
                    fontWeight: 500, 
                    color: '#1e293b', 
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    lineHeight: 1.1
                  }}
                >
                  DENTAL
                </Typography>
                <Typography 
                  sx={{ 
                    fontSize: '0.55rem', 
                    fontWeight: 500, 
                    color: '#1e293b', 
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    lineHeight: 1.1
                  }}
                >
                  PRACTICE
                </Typography>
              </Box>
            </Box>

            {/* 2. Elegant Navigation Links (Desktop) */}
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 3.5, alignItems: 'center' }}>
                {navItems.map((item) => {
                  const isActive = location.pathname === item.id;
                  return (
                    <Box
                      component={Link}
                      to={item.id}
                      key={item.id}
                      sx={{
                        cursor: 'pointer',
                        fontWeight: 900,
                        color: isActive ? 'primary.main' : '#1e293b',
                        fontSize: '0.85rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.8px',
                        px: 0.5,
                        py: 0.8,
                        transition: 'all 0.15s ease-in-out',
                        userSelect: 'none',
                        textDecoration: 'none',
                        borderBottom: '3px solid',
                        borderColor: isActive ? 'secondary.main' : 'transparent',
                        '&:hover': {
                          color: 'primary.main',
                          borderColor: 'primary.main'
                        }
                      }}
                    >
                      {item.label}
                    </Box>
                  );
                })}
              </Box>
            )}

            {/* 3. Sharp Square CTA Buttons & Hamburger */}
            <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={onDonateClick}
                startIcon={<FavoriteIcon />}
                sx={{
                  px: { xs: 2, sm: 3 },
                  py: 1.2,
                  borderRadius: 2,
                  fontWeight: '900',
                  textTransform: 'none',
                  fontSize: '0.9rem',
                  boxShadow: '0 2px 8px rgba(190, 24, 93, 0.25)',
                  bgcolor: 'primary.main',
                  color: 'white',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                    boxShadow: '0 4px 14px rgba(190, 24, 93, 0.4)'
                  }
                }}
              >
                Donate to Save a Smile
              </Button>

              {isMobile && (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="end"
                  onClick={handleDrawerToggle}
                  sx={{ 
                    ml: 0.5, 
                    border: '1px solid #e2e8f0', 
                    p: 0.8, 
                    borderRadius: 1,
                    bgcolor: 'white',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                    '&:hover': {
                      bgcolor: 'primary.light',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.12)'
                    }
                  }}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Drawer for Mobile Viewports (Square Aesthetics) */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true
        }}
        slotProps={{
          paper: {
            sx: { 
              boxSizing: 'border-box', 
              width: 270, 
              borderLeft: '1px solid #e2e8f0',
              boxShadow: '-4px 0 20px rgba(0,0,0,0.08)',
              bgcolor: '#ffffff'
            }
          }
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
      >
        <Box sx={{ p: 2.5, display: 'flex', flexDirection: 'column', height: '100%', bgcolor: 'white' }}>
          <Box sx={{ mb: 4, mt: 1, px: 1, borderBottom: '1px solid #e2e8f0', pb: 2 }}>
            <Typography variant="h6" color="text.primary" sx={{ fontWeight: "900", textTransform: 'uppercase', letterSpacing: '-0.5px' }}>
              SMILE <Box component="span" sx={{ color: 'primary.main', textTransform: 'lowercase', fontStyle: 'italic' }}>with</Box> DR. ROME
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: "700" }}>
              Restoring Health & Smiles
            </Typography>
          </Box>
          <List sx={{ mb: 'auto' }}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.id;
              return (
                <ListItem key={item.id} disablePadding sx={{ mb: 1.5 }}>
                  <ListItemButton 
                    component={Link}
                    to={item.id}
                    onClick={handleDrawerToggle}
                    selected={isActive}
                    sx={{
                      borderRadius: 0,
                      borderLeft: isActive ? '4px solid #be185d' : '4px solid transparent',
                      bgcolor: isActive ? '#f8fafc' : 'transparent',
                      '&.Mui-selected': {
                        bgcolor: '#f8fafc',
                        color: '#1e293b',
                        '&:hover': { bgcolor: '#f8fafc' }
                      },
                      '&:hover': {
                        bgcolor: '#fbcfe8'
                      }
                    }}
                  >
                    <ListItemText 
                      primary={item.label} 
                      slotProps={{
                        primary: {
                          sx: {
                            fontWeight: '900',
                            fontSize: '0.9rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }
                        }
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
          
          <Box sx={{ p: 1, mb: 1 }}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              startIcon={<FavoriteIcon />}
              onClick={() => {
                handleDrawerToggle();
                onDonateClick();
              }}
              sx={{ 
                py: 1.5, 
                borderRadius: 2, 
                fontWeight: '900',
                textTransform: 'none',
                fontSize: '0.95rem',
                boxShadow: '0 2px 8px rgba(190, 24, 93, 0.25)',
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': {
                  bgcolor: 'primary.dark',
                  boxShadow: '0 4px 14px rgba(190, 24, 93, 0.4)'
                }
              }}
            >
              Donate to Save a Smile
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
