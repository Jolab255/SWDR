import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import type { ClinicEvent } from '../../utils/mockData';

interface EventsCalendarProps {
  events: ClinicEvent[];
  onReadMoreClick: (ev: ClinicEvent) => void;
}

export default function EventsCalendar({ events, onReadMoreClick }: EventsCalendarProps) {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'));
  const isSm = useMediaQuery(theme.breakpoints.up('sm'));
  const visibleCards = isMd ? 3 : isSm ? 2 : 1;
  const maxIndex = Math.max(0, events.length - visibleCards);

  // Keep carouselIndex in bounds during window resize / responsive adjustments
  useEffect(() => {
    if (carouselIndex > maxIndex) {
      setCarouselIndex(maxIndex);
    }
  }, [visibleCards, maxIndex, carouselIndex]);

  const handlePrev = () => setCarouselIndex((prev) => Math.max(0, prev - 1));
  const handleNext = () => setCarouselIndex((prev) => Math.min(maxIndex, prev + 1));

  return (
    <Box 
      sx={{ 
        py: 6, 
        backgroundImage: 'linear-gradient(180deg, rgba(248, 250, 252, 0.97) 0%, rgba(248, 250, 252, 0.97) 100%), url("/favicon.png")',
        backgroundRepeat: 'no-repeat, repeat',
        backgroundSize: 'auto, 120px 120px',
        backgroundAttachment: 'scroll, fixed',
        borderTop: '1px solid #e2e8f0' 
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Box 
            sx={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: 1.5, 
              mb: 3, 
              bgcolor: '#fbcfe8',
              color: '#1e293b',
              px: 2.5,
              py: 1,
              borderRadius: 2,
              border: '1px solid #fce7f3',
              boxShadow: '0 2px 6px rgba(190, 24, 93,0.12)',
              fontWeight: '900',
              textTransform: 'uppercase',
              fontSize: '0.85rem',
              letterSpacing: '1px'
            }}
          >
            <CalendarMonthIcon sx={{ fontSize: '1.2rem', color: 'primary.main' }} />
            CALENDAR OF EVENTS
          </Box>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: '900',
              color: '#1e293b', 
              fontSize: { xs: '2rem', md: '2.8rem' },
              textTransform: 'uppercase',
              letterSpacing: '-0.5px',
              mb: 2
            }}
          >
            Our Scheduled Charities
          </Typography>
        </Box>

        {events.length === 0 ? (
          <Paper 
            elevation={0}
            sx={{ 
              p: 6, 
              textAlign: 'center', 
              borderRadius: 2, 
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
              bgcolor: 'white'
            }}
          >
            <Typography variant="h5" color="text.primary" gutterBottom sx={{ fontWeight: '900', textTransform: 'uppercase' }}>
              No scheduled events found
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 700 }}>
              Stay tuned! New charity activities and mobile outreach camps will be posted here soon.
            </Typography>
          </Paper>
        ) : (
          <Box sx={{ position: 'relative', width: '100%', overflow: 'visible', px: { xs: 2, sm: 6 } }}>
            {maxIndex > 0 && (
              <IconButton
                onClick={handlePrev}
                disabled={carouselIndex === 0}
                sx={{
                  position: 'absolute',
                  left: { xs: -8, sm: -24 },
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                  bgcolor: 'white',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                  border: '1px solid #e2e8f0',
                  borderRadius: 1,
                  width: 44,
                  height: 44,
                  color: '#1e293b',
                  '&:hover': { bgcolor: 'primary.light', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' },
                  '&.Mui-disabled': { bgcolor: 'grey.100', opacity: 0.5, border: '1px solid #e2e8f0', boxShadow: 'none' }
                }}
              >
                ◀
              </IconButton>
            )}

            <Box sx={{ overflow: 'hidden', width: '100%' }}>
              <Box sx={{ 
                display: 'flex', 
                transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)', 
                transform: `translateX(-${carouselIndex * (100 / visibleCards)}%)`
              }}>
                {events.map((ev) => (
                  <Box key={ev.id} sx={{ 
                    flex: { xs: '0 0 100%', sm: '0 0 50%', md: '0 0 33.3333%' },
                    px: 2, boxSizing: 'border-box'
                  }}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2, border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
                      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                        <CardMedia component="img" height="220" image={ev.image} alt={ev.title} loading="lazy" />
                        {/* Overlay Calendar Date Badge */}
                        <Box sx={{ position: 'absolute', top: 12, left: 12, bgcolor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(4px)', px: 2, py: 0.75, borderRadius: 1.5, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 52 }}>
                          <Typography variant="caption" sx={{ fontWeight: 800, color: '#be185d', textTransform: 'uppercase', fontSize: '0.7rem', lineHeight: 1 }}>
                            {new Date(ev.date).toLocaleDateString('en-TZ', { month: 'short' })}
                          </Typography>
                          <Typography variant="h5" sx={{ fontWeight: 900, color: '#1e293b', lineHeight: 1.1, mt: 0.25 }}>
                            {new Date(ev.date).toLocaleDateString('en-TZ', { day: 'numeric' })}
                          </Typography>
                        </Box>
                      </Box>
                      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
                        <Typography variant="h6" sx={{ minHeight: 48, lineHeight: 1.3, fontSize: '1.15rem', mb: 2, fontWeight: '900', color: '#1e293b' }}>
                          {ev.title}
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                            <LocationOnIcon sx={{ color: '#be185d', fontSize: '1.1rem', mt: 0.25, flexShrink: 0 }} />
                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', fontSize: '0.85rem' }}>
                              {ev.location}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <AccessTimeIcon sx={{ color: '#be185d', fontSize: '1.1rem', flexShrink: 0 }} />
                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', fontSize: '0.85rem' }}>
                              {ev.time}
                            </Typography>
                          </Box>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', mb: 2.5, minHeight: 60, lineHeight: 1.5, fontSize: '0.825rem' }}>
                          {ev.description}
                        </Typography>
                        <Box sx={{ mt: 'auto', pt: 2, borderTop: '1px dashed', borderColor: 'grey.200' }}>
                          <Button
                            fullWidth variant="contained"
                            onClick={() => onReadMoreClick(ev)}
                            sx={{ 
                              py: 1, borderRadius: 1.5, fontWeight: '900', textTransform: 'none',
                              fontSize: '0.9rem', boxShadow: '0 2px 6px rgba(190, 24, 93,0.15)',
                              bgcolor: '#be185d', color: '#ffffff',
                              '&:hover': { bgcolor: '#9d174d', boxShadow: '0 4px 10px rgba(190, 24, 93,0.25)' }
                            }}
                          >
                            See Event Details
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                ))}
              </Box>
            </Box>

            {maxIndex > 0 && (
              <IconButton
                onClick={handleNext}
                disabled={carouselIndex === maxIndex}
                sx={{
                  position: 'absolute',
                  right: { xs: -8, sm: -24 },
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                  bgcolor: 'white',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                  border: '1px solid #e2e8f0',
                  borderRadius: 1,
                  width: 44,
                  height: 44,
                  color: '#1e293b',
                  '&:hover': { bgcolor: 'primary.light', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' },
                  '&.Mui-disabled': { bgcolor: 'grey.100', opacity: 0.5, border: '1px solid #e2e8f0', boxShadow: 'none' }
                }}
              >
                ▶
              </IconButton>
            )}

            {maxIndex > 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 5 }}>
                {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                  <Box key={idx} onClick={() => setCarouselIndex(idx)} sx={{
                    width: 10, height: 10, bgcolor: carouselIndex === idx ? '#be185d' : '#cbd5e1',
                    borderRadius: '50%',
                    cursor: 'pointer', transition: 'all 0.2s ease',
                    '&:hover': { transform: 'scale(1.3)', bgcolor: '#be185d' }
                  }} />
                ))}
              </Box>
            )}
          </Box>
        ) }
      </Container>
    </Box>
  );
}
