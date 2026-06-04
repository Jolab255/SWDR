import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';

interface HeroProps {
  onDonateClick: () => void;
}

export default function Hero({ onDonateClick }: HeroProps) {
  return (
    <Box 
      sx={{
        position: 'relative',
        pt: { xs: 4, md: 6 },
        pb: { xs: 6, md: 8 },
        background: 'linear-gradient(180deg, #f0f9ff 0%, #ffffff 100%)',
        color: 'text.primary',
        overflow: 'hidden'
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={6} sx={{ alignItems: 'center' }}>
          {/* Left Column: Descriptive Typographic Block */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ pr: { md: 4 } }}>
              <Typography 
                variant="h1" 
                gutterBottom
                sx={{ 
                  fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
                  lineHeight: 1.15,
                  letterSpacing: '-1px',
                  fontWeight: 900,
                  color: 'text.primary',
                  mb: 2.5
                }}
              >
                CHILDREN WITH SPECIAL HEALTHCARE NEEDS <Box component="span" sx={{ color: 'primary.main' }}>DESERVE BETTER ORAL HEALTHCARE SERVICES.</Box>
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: 5, 
                  color: 'text.secondary', 
                  fontSize: '1.1rem',
                  lineHeight: 1.7,
                  maxWidth: 580
                }}
              >
                We provide professional, free dental treatments and reconstructive surgeries to vulnerable children in remote villages and challenging environments across Tanzania. Join us to make a lasting impact.
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={onDonateClick}
                  startIcon={<FavoriteIcon />}
                  sx={{ 
                    px: 4, 
                    py: 1.8, 
                    borderRadius: 2, 
                    fontWeight: '900', 
                    fontSize: '1rem', 
                    textTransform: 'none',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    bgcolor: 'secondary.main',
                    color: 'white',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: 'secondary.dark',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.2)'
                    }
                  }}
                >
                  Donate to Save a Smile
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  component={Link}
                  to="/about"
                  sx={{ 
                    px: 4, 
                    py: 1.8, 
                    borderRadius: 2, 
                    fontWeight: '900', 
                    fontSize: '1rem', 
                    textTransform: 'none', 
                    border: '1px solid #0284c7',
                    boxShadow: '0 2px 6px rgba(2,132,199,0.15)',
                    bgcolor: 'white',
                    color: '#0284c7',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                    '&:hover': { 
                      boxShadow: '0 4px 14px rgba(2,132,199,0.25)',
                      bgcolor: '#f0f9ff',
                    } 
                  }}
                >
                  Learn Our Story
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* Right Column: Framed Photorealistic Charity Image */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', width: '100%' }}>
              <Box 
                sx={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: 440,
                  borderRadius: 2,
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                  overflow: 'hidden',
                  bgcolor: 'white'
                }}
              >
                <Box 
                  component="img"
                  src="/images/swdr_hero.png"
                  alt="Smile with Doctor Rome charity"
                  loading="lazy"
                  sx={{
                    width: '100%',
                    height: { xs: 320, md: 440 },
                    objectFit: 'cover',
                    borderRadius: 2,
                    display: 'block',
                    transition: 'transform 0.3s ease',
                    '&:hover': { transform: 'scale(1.02)' }
                  }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
