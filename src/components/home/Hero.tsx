import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import heroImg from '../../assets/hero_img.webp';

interface HeroProps {
  onDonateClick: () => void;
}

export default function Hero({ onDonateClick }: HeroProps) {
  return (
    <Box 
      sx={{
        position: 'relative',
        pt: { xs: 4, md: 10 },
        pb: { xs: 5, md: 10 },
        backgroundImage: {
          xs: 'linear-gradient(180deg, rgba(253, 242, 248, 0.95) 0%, rgba(255, 255, 255, 0.975) 100%), url("/favicon.png")',
          md: `linear-gradient(90deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.85) 45%, rgba(255, 255, 255, 0.1) 85%, rgba(255, 255, 255, 0) 100%), url(${heroImg})`
        },
        backgroundRepeat: { xs: 'no-repeat, repeat', md: 'no-repeat, no-repeat' },
        backgroundSize: { xs: 'auto, 120px 120px', md: 'cover, cover' },
        backgroundPosition: { xs: 'top left', md: 'center right' },
        backgroundAttachment: 'scroll, fixed',
        color: 'text.primary',
        overflow: 'hidden',
        minHeight: { md: 540 },
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4} direction={{ xs: 'column-reverse', md: 'row' }} sx={{ alignItems: 'center' }}>
          {/* Left Column: Descriptive Typographic Block */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ pr: { md: 4 } }}>
              <Box
                sx={{
                  color: '#be185d',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  mb: 2,
                  display: 'inline-block',
                  px: 2,
                  py: 0.6,
                  borderRadius: 1.5,
                  bgcolor: '#fdf2f8',
                  border: '1px solid #fce7f3',
                  fontSize: '0.85rem'
                }}
              >
                #untileveryonesmiles
              </Box>
              <Typography 
                variant="h1" 
                gutterBottom
                sx={{ 
                  fontSize: { xs: '1.6rem', sm: '2.2rem', md: '2.8rem' },
                  lineHeight: 1.15,
                  letterSpacing: '-1px',
                  fontWeight: 700,
                  color: 'text.primary',
                  mb: 3
                }}
              >
                Making Oral Healthcare Accessible to{' '}
                <Box 
                  component="span" 
                  sx={{ 
                    background: 'linear-gradient(135deg, #be185d 0%, #e11d48 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline'
                  }}
                >
                  Children with Special Healthcare Needs
                </Box>
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: 5, 
                  color: 'text.secondary', 
                  fontSize: '1.1rem',
                  lineHeight: 1.7,
                  maxWidth: 680
                }}
              >
                We provide professional, free comprehensive dental care services ranging from education, consultation to treatment to children with special healthcare needs. We serve children with physical impairments (disabilities/handicapped), street children, orphans, refugees, the poor, prisoners, abused children, and children living in remote areas.
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Button
                  variant="contained"
                  onClick={onDonateClick}
                  startIcon={<FavoriteIcon />}
                  sx={{ 
                    px: 3, 
                    py: 1.2, 
                    borderRadius: 2, 
                    fontWeight: 700, 
                    fontSize: '0.9rem', 
                    textTransform: 'none',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                    bgcolor: 'secondary.main',
                    color: 'white',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: 'secondary.dark',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.18)'
                    }
                  }}
                >
                  Donate to Save a Smile
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  component={Link}
                  to="/about"
                  sx={{ 
                    px: 3, 
                    py: 1.2, 
                    borderRadius: 2, 
                    fontWeight: 700, 
                    fontSize: '0.9rem', 
                    textTransform: 'none', 
                    border: '1px solid #be185d',
                    boxShadow: '0 2px 6px rgba(190, 24, 93,0.1)',
                    bgcolor: 'white',
                    color: '#be185d',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                    '&:hover': { 
                      boxShadow: '0 4px 12px rgba(190, 24, 93,0.18)',
                      bgcolor: '#fdf2f8',
                    } 
                  }}
                >
                  Learn Our Story
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* Right Column: Framed Image (Visible on Mobile Only) */}
          <Grid size={{ xs: 12, md: 5 }} sx={{ display: { xs: 'block', md: 'none' }, mb: 4 }}>
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
                  src={heroImg}
                  alt="Smile with Doctor Rome charity"
                  loading="lazy"
                  sx={{
                    width: '100%',
                    height: { xs: 260, sm: 320 },
                    objectFit: 'cover',
                    borderRadius: 2,
                    display: 'block'
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
