import { useState } from 'react';
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
          borderBottom: '4px solid #1e293b',
          color: 'text.primary',
          zIndex: theme.zIndex.drawer + 1
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: 75 }}>
            
            {/* 1. Sleek Typographic Logo */}
            <Box 
              component={Link}
              to="/"
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                cursor: 'pointer',
                userSelect: 'none',
                textDecoration: 'none'
              }}
            >
              <Typography 
                variant="h5" 
                noWrap 
                sx={{ 
                  fontWeight: 900, 
                  textTransform: 'uppercase',
                  letterSpacing: '-0.8px', 
                  color: '#1e293b',
                  fontSize: { xs: '1.1rem', md: '1.35rem' },
                  lineHeight: 1
                }}
              >
                SMILE <Box component="span" sx={{ color: 'primary.main', fontWeight: 500, textTransform: 'lowercase', fontStyle: 'italic', mx: 0.2 }}>with</Box> DR. ROME
              </Typography>
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
                color="secondary"
                onClick={onDonateClick}
                startIcon={<FavoriteIcon />}
                sx={{
                  px: { xs: 2, sm: 3 },
                  py: 1.2,
                  borderRadius: 0,
                  fontWeight: '900',
                  textTransform: 'none',
                  fontSize: '0.9rem',
                  boxShadow: '2px 2px 0px #1e293b',
                  border: '2px solid #1e293b',
                  bgcolor: 'secondary.main',
                  color: 'white',
                  transition: 'all 0.15s ease-in-out',
                  '&:hover': {
                    bgcolor: 'secondary.dark',
                    transform: 'translate(-1px, -1px)',
                    boxShadow: '3px 3px 0px #1e293b'
                  },
                  '&:active': {
                    transform: 'translate(1px, 1px)',
                    boxShadow: '1px 1px 0px #1e293b'
                  }
                }}
              >
                Donate Now
              </Button>

              {isMobile && (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="end"
                  onClick={handleDrawerToggle}
                  sx={{ 
                    ml: 0.5, 
                    border: '2.5px solid #1e293b', 
                    p: 0.8, 
                    borderRadius: 0,
                    bgcolor: 'white',
                    boxShadow: '2px 2px 0px #1e293b',
                    '&:hover': {
                      bgcolor: 'primary.light',
                      transform: 'translate(-1px, -1px)',
                      boxShadow: '3px 3px 0px #1e293b'
                    },
                    '&:active': {
                      transform: 'translate(1px, 1px)',
                      boxShadow: '1px 1px 0px #1e293b'
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
              borderRadius: 0,
              borderLeft: '4px solid #1e293b',
              bgcolor: '#ffffff'
            }
          }
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
      >
        <Box sx={{ p: 2.5, display: 'flex', flexDirection: 'column', height: '100%', bgcolor: 'white' }}>
          <Box sx={{ mb: 4, mt: 1, px: 1, borderBottom: '2.5px solid #1e293b', pb: 2 }}>
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
                      borderLeft: isActive ? '4px solid #0284c7' : '4px solid transparent',
                      bgcolor: isActive ? '#f8fafc' : 'transparent',
                      '&.Mui-selected': {
                        bgcolor: '#f8fafc',
                        color: '#1e293b',
                        '&:hover': { bgcolor: '#f8fafc' }
                      },
                      '&:hover': {
                        bgcolor: '#e0f2fe'
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
              color="secondary"
              startIcon={<FavoriteIcon />}
              onClick={() => {
                handleDrawerToggle();
                onDonateClick();
              }}
              sx={{ 
                py: 1.5, 
                borderRadius: 0, 
                fontWeight: '900',
                textTransform: 'none',
                fontSize: '0.95rem',
                boxShadow: '2px 2px 0px #1e293b',
                border: '2px solid #1e293b',
                bgcolor: 'secondary.main',
                color: 'white',
                '&:hover': {
                  bgcolor: 'secondary.dark'
                }
              }}
            >
              Donate Now
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
