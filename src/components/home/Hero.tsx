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
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '3.75rem' },
                  lineHeight: 1.15,
                  letterSpacing: '-1.5px',
                  fontWeight: 900,
                  color: 'text.primary',
                  mb: 2.5
                }}
              >
                Restoring Health.<br />
                Restoring <Box component="span" sx={{ color: 'primary.main' }}>Children's Smiles.</Box>
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
                    borderRadius: 0, 
                    fontWeight: '900', 
                    fontSize: '1rem', 
                    textTransform: 'none',
                    border: '2px solid #1e293b',
                    boxShadow: '2px 2px 0px #1e293b',
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
                    borderRadius: 0, 
                    fontWeight: '900', 
                    fontSize: '1rem', 
                    textTransform: 'none', 
                    border: '2px solid #1e293b',
                    boxShadow: '4px 4px 0px #1e293b',
                    bgcolor: 'white',
                    color: '#1e293b',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                    '&:hover': { 
                      transform: 'translate(-2px, -2px)',
                      boxShadow: '6px 6px 0px #1e293b',
                      bgcolor: 'primary.light',
                      border: '2px solid #1e293b'
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
                  borderRadius: 0,
                  border: '3px solid #1e293b',
                  boxShadow: '8px 8px 0px #0284c7',
                  overflow: 'visible',
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
                    borderRadius: 0,
                    borderBottom: '3px solid #1e293b',
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
