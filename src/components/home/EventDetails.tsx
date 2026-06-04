import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PeopleIcon from '@mui/icons-material/People';
import type { ClinicEvent } from '../../utils/mockData';

interface EventDetailsProps {
  event: ClinicEvent;
  onBack: () => void;
  onDonateClick: () => void;
  onRegisterClick: () => void;
}

export default function EventDetails({ event, onBack, onDonateClick, onRegisterClick }: EventDetailsProps) {
  return (
    <Box sx={{ py: 6, bgcolor: '#f8fafc', minHeight: '80vh' }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Button
            onClick={onBack}
            startIcon={<ArrowBackIcon />}
            sx={{ 
              color: '#1e293b', fontWeight: '900', textTransform: 'none', borderRadius: 2,
              border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', px: 3, py: 1.2,
              bgcolor: 'white', transition: 'all 0.2s',
              '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.1)', bgcolor: '#fdf2f8' }
            }}
          >
            Back to Events Calendar
          </Button>
        </Box>

        <Paper elevation={0} sx={{ borderRadius: 2, border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', bgcolor: 'white', overflow: 'hidden', mb: 4 }}>
          <Box sx={{ position: 'relative', width: '100%', height: { xs: 250, sm: 400 }, overflow: 'hidden' }}>
            <Box component="img" src={event.image} alt={event.title} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <Box sx={{ position: 'absolute', top: 20, right: 20, bgcolor: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(8px)', color: '#ffffff', px: 2.5, py: 1, fontSize: '0.85rem', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
              {event.category}
            </Box>
          </Box>

          <Box sx={{ p: { xs: 4, sm: 6 } }}>
            <Typography variant="h2" sx={{ fontWeight: '900', color: 'text.primary', fontSize: { xs: '2rem', sm: '2.75rem' }, lineHeight: 1.2, letterSpacing: '-1px', mb: 4 }}>
              {event.title}
            </Typography>

            <Grid container spacing={3.5} sx={{ mb: 6 }}>
              {[
                { icon: '📅', label: 'Date', val: new Date(event.date).toLocaleDateString('en-TZ', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }) },
                { icon: '🕒', label: 'Hours', val: event.time },
                { icon: '📍', label: 'Location', val: event.location }
              ].map((item, i) => (
                <Grid size={{ xs: 12, sm: 4 }} key={i}>
                  <Paper elevation={0} sx={{ p: 3, bgcolor: '#f8fafc', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(190, 24, 93,0.1)', borderRadius: 2, height: '100%' }}>
                    <Typography sx={{ fontSize: '1.5rem', mb: 1 }}>{item.icon}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: '900', textTransform: 'uppercase', display: 'block', mb: 1, letterSpacing: '0.5px' }}>{item.label}</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'text.primary' }}>{item.val}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            <Typography variant="h5" sx={{ fontWeight: '900', mb: 2.5, color: 'text.primary', borderBottom: '2px solid', pb: 1, borderColor: 'grey.100' }}>
              About this Event
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'grey.800', fontSize: '1.1rem', mb: 6, textAlign: 'justify' }}>
              {event.description}
            </Typography>

            <Paper elevation={0} sx={{ p: { xs: 4, md: 6 }, background: 'linear-gradient(135deg, #fdf2f8 0%, #fbcfe8 100%)', border: '1px solid #fce7f3', boxShadow: '0 4px 20px rgba(190, 24, 93,0.12)', borderRadius: 2, mb: 4, position: 'relative', overflow: 'hidden', '&:hover': { boxShadow: '0 8px 32px rgba(190, 24, 93,0.2)' }, transition: 'all 0.3s' }}>
              <Box sx={{ position: 'absolute', right: -20, bottom: -30, fontSize: '12rem', opacity: 0.05, userSelect: 'none', pointerEvents: 'none' }}>🦷</Box>
              <Grid container spacing={4} sx={{ position: 'relative', zIndex: 2, alignItems: 'center' }}>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="h4" sx={{ fontWeight: '900', color: 'text.primary', fontSize: { xs: '1.6rem', sm: '2.25rem' }, lineHeight: 1.15, letterSpacing: '-1px', mb: 2 }}>
                    Make a <Box component="span" sx={{ color: 'secondary.main' }}>Tangible Difference</Box> Today
                  </Typography>
                  <Typography variant="body1" sx={{ lineHeight: 1.7, fontSize: '1.025rem', color: 'grey.800', mb: 4 }}>
                    Every child deserves a pain-free, healthy smile. You can make an immediate impact by either contributing your specialized medical or general coordination skills on the ground as a volunteer, or by providing the vital financial resources to purchase high-quality clinical supplies, restorative dental materials, and emergency tools.
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button 
                      variant="contained" 
                      onClick={onDonateClick} 
                      startIcon={<FavoriteIcon />} 
                      sx={{ 
                        flex: 1, 
                        py: 1.5, 
                        fontWeight: '900', 
                        borderRadius: 2,
                        textTransform: 'none',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                        bgcolor: 'secondary.main',
                        color: 'white',
                        '&:hover': {
                          bgcolor: 'secondary.dark',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                        }
                      }}
                    >
                      Donate to Event
                    </Button>
                    <Button 
                      variant="contained" 
                      onClick={onRegisterClick} 
                      startIcon={<PeopleIcon />} 
                      sx={{ 
                        flex: 1, 
                        py: 1.5, 
                        fontWeight: '900', 
                        borderRadius: 2,
                        textTransform: 'none',
                        boxShadow: '0 2px 8px rgba(190, 24, 93,0.3)',
                        bgcolor: '#be185d',
                        color: 'white',
                        '&:hover': {
                          bgcolor: '#9d174d',
                          boxShadow: '0 4px 12px rgba(190, 24, 93,0.4)',
                        }
                      }}
                    >
                      Join as Volunteer
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
