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
    <Box sx={{ py: 10, bgcolor: '#f8fafc', borderTop: '3px solid #1e293b' }}>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Box 
            sx={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: 1.5, 
              mb: 3, 
              bgcolor: '#e0f2fe',
              color: '#1e293b',
              px: 2.5,
              py: 1,
              borderRadius: 0,
              border: '3px solid #1e293b',
              boxShadow: '4px 4px 0px #1e293b',
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
              borderRadius: 0, 
              border: '3px solid #1e293b',
              boxShadow: '8px 8px 0px #1e293b',
              bgcolor: 'white'
            }}
          >
            <Typography variant="h5" color="text.primary" gutterBottom sx={{ fontWeight: '900', textTransform: 'uppercase' }}>
              No scheduled events found
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 700 }}>
              Stay tuned! Or use the CMS panel to add new charity activities.
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
                  boxShadow: '3px 3px 0px #1e293b',
                  border: '2px solid #1e293b',
                  borderRadius: 0,
                  width: 44,
                  height: 44,
                  color: '#1e293b',
                  '&:hover': { bgcolor: 'primary.light', boxShadow: '4px 4px 0px #1e293b' },
                  '&.Mui-disabled': { bgcolor: 'grey.100', opacity: 0.5, border: '2px solid grey.300', boxShadow: 'none' }
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
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 0, border: '3px solid #1e293b', boxShadow: '6px 6px 0px #1e293b', overflow: 'hidden' }}>
                      <Box sx={{ position: 'relative', overflow: 'hidden', borderBottom: '3px solid #1e293b' }}>
                        <CardMedia component="img" height="220" image={ev.image} alt={ev.title} loading="lazy" />
                      </Box>
                      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 4 }}>
                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 2, bgcolor: '#f0f9ff', color: '#1e293b', px: 1.8, py: 0.6, borderRadius: 0, border: '1.5px solid #1e293b', boxShadow: '2px 2px 0px #1e293b' }}>
                          <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                            📅 {new Date(ev.date).toLocaleDateString('en-TZ', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                          </Typography>
                        </Box>
                        <Typography variant="h6" sx={{ minHeight: 56, lineHeight: 1.35, fontSize: '1.2rem', mb: 2, fontWeight: '900' }}>
                          {ev.title}
                        </Typography>
                        <Typography variant="body2" sx={{ lineHeight: 1.4, fontWeight: 655, mb: 1.5 }}>
                          <strong>📍 Location:</strong> {ev.location}
                        </Typography>
                        <Typography variant="body2" sx={{ lineHeight: 1.4, fontWeight: 655, mb: 3.5 }}>
                          <strong>🕒 Hours:</strong> {ev.time}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', mb: 2, minHeight: 90, lineHeight: 1.6 }}>
                          {ev.description}
                        </Typography>
                        <Box sx={{ mt: 'auto', pt: 3, borderTop: '1px dashed', borderColor: 'grey.200' }}>
                          <Button
                            fullWidth variant="contained"
                            onClick={() => onReadMoreClick(ev)}
                            sx={{ 
                              py: 1, borderRadius: 0, fontWeight: '900', textTransform: 'none',
                              fontSize: '0.95rem', boxShadow: '2px 2px 0px #1e293b', border: '2px solid #1e293b',
                              bgcolor: '#0284c7', color: '#ffffff',
                              '&:hover': { bgcolor: '#0369a1', transform: 'translate(-1px, -1px)', boxShadow: '3px 3px 0px #1e293b' }
                            }}
                          >
                            See More of This
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
                  boxShadow: '3px 3px 0px #1e293b',
                  border: '2px solid #1e293b',
                  borderRadius: 0,
                  width: 44,
                  height: 44,
                  color: '#1e293b',
                  '&:hover': { bgcolor: 'primary.light', boxShadow: '4px 4px 0px #1e293b' },
                  '&.Mui-disabled': { bgcolor: 'grey.100', opacity: 0.5, border: '2px solid grey.300', boxShadow: 'none' }
                }}
              >
                ▶
              </IconButton>
            )}

            {maxIndex > 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 5 }}>
                {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                  <Box key={idx} onClick={() => setCarouselIndex(idx)} sx={{
                    width: 14, height: 14, bgcolor: carouselIndex === idx ? 'secondary.main' : 'white',
                    border: '2px solid #1e293b', boxShadow: carouselIndex === idx ? '1px 1px 0px #1e293b' : '2px 2px 0px #1e293b',
                    cursor: 'pointer', transition: 'all 0.15s ease-in-out',
                    '&:hover': { transform: 'scale(1.15)', bgcolor: carouselIndex === idx ? 'secondary.main' : 'primary.light' }
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
