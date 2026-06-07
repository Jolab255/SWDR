import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Dialog,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import type { ImpactStory } from '../../utils/mockData';

interface ImpactGlimpsesProps {
  impactStories: ImpactStory[];
}

export default function ImpactGlimpses({ impactStories }: ImpactGlimpsesProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [openGalleryGrid, setOpenGalleryGrid] = useState(false);
  const [selectedImpact, setSelectedImpact] = useState<ImpactStory | null>(null);

  useEffect(() => {
    if (impactStories.length === 0) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % impactStories.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [impactStories.length]);

  if (impactStories.length === 0) return null;

  return (
    <Box 
      sx={{ 
        py: 6, 
        backgroundImage: 'linear-gradient(180deg, rgba(255, 255, 255, 0.975) 0%, rgba(255, 255, 255, 0.975) 100%), url("/favicon.png")',
        backgroundRepeat: 'no-repeat, repeat',
        backgroundSize: 'auto, 120px 120px',
        backgroundAttachment: 'scroll, fixed',
        borderTop: '1px solid #e2e8f0' 
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography 
            variant="h3" 
            sx={{ 
              color: "#1e293b", 
              fontSize: { xs: "2.2rem", md: "2.8rem" },
              textTransform: "uppercase",
              letterSpacing: "-1px",
              mb: 2,
              fontWeight: '900'
            }}
          >
            Glimpses of Our Impact
          </Typography>
        </Box>

        <Box sx={{ 
          position: 'relative', 
          width: '100%', 
          height: { xs: '65vh', md: '55vh' },
          overflow: 'hidden',
          borderRadius: 2,
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
        }}>
          {/* Main Slider */}
          <Box 
            sx={{ 
              position: 'relative', 
              width: '100%', 
              height: '100%', 
              overflow: 'hidden',
              cursor: 'pointer'
            }}
            onClick={() => setSelectedImpact(impactStories[activeSlide])}
          >
            {impactStories.map((img, idx) => (
              <Box
                key={img.id}
                component="img"
                src={img.image}
                loading="lazy"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: activeSlide === idx ? 1 : 0,
                  transform: activeSlide === idx ? 'scale(1)' : 'scale(1.1)',
                  transition: 'all 1.2s ease-in-out',
                }}
              />
            ))}

            {/* Overlay */}
            <Box 
              sx={{ 
                position: 'absolute', 
                bottom: 0, left: 0, right: 0, 
                background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 60%, transparent 100%)',
                color: 'white', 
                p: { xs: 3, md: 6 },
                display: 'flex',
                flexDirection: 'column',
                gap: 0.5,
                pointerEvents: 'none'
              }}
            >
              <Typography variant="h3" sx={{ fontWeight: '900', fontSize: { xs: '1.5rem', md: '2.4rem' }, textTransform: 'uppercase', letterSpacing: '-1px', mb: 0.5 }}>
                {impactStories[activeSlide]?.title}
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 2, md: 4 }, mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOnIcon sx={{ color: '#be185d', fontSize: { xs: '1rem', md: '1.25rem' } }} />
                  <Typography variant="body1" sx={{ fontWeight: '700', fontSize: { xs: '0.85rem', md: '1rem' } }}>
                    Location: {impactStories[activeSlide]?.location}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CalendarTodayIcon sx={{ color: '#be185d', fontSize: { xs: '0.9rem', md: '1.1rem' } }} />
                  <Typography variant="body1" sx={{ fontWeight: '700', fontSize: { xs: '0.85rem', md: '1rem' } }}>
                    Date: {impactStories[activeSlide]?.date}
                  </Typography>
                </Box>
              </Box>

              <Typography 
                variant="body1" 
                sx={{ 
                  fontSize: { xs: '0.85rem', md: '1.025rem' }, 
                  lineHeight: 1.6, 
                  color: '#e2e8f0', 
                  fontWeight: 500, 
                  mb: 3, 
                  maxWidth: '800px',
                  textAlign: 'justify',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
              >
                {impactStories[activeSlide]?.description}
              </Typography>

              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenGalleryGrid(true);
                }}
                sx={{
                  alignSelf: 'flex-start',
                  px: 4, py: 1, borderRadius: 2, fontWeight: '900', textTransform: 'uppercase',
                  bgcolor: '#be185d', color: 'white', boxShadow: '0 2px 10px rgba(190, 24, 93,0.4)',
                  pointerEvents: 'auto',
                  '&:hover': { bgcolor: '#9d174d', boxShadow: '0 4px 16px rgba(190, 24, 93,0.5)' }
                }}
              >
                View Impact Gallery
              </Button>
            </Box>
          </Box>
        </Box>

        {/* --- GALLERY GRID DIALOG --- */}
        <Dialog
          open={openGalleryGrid}
          onClose={() => setOpenGalleryGrid(false)}
          maxWidth="lg"
          fullWidth
          slotProps={{ paper: { sx: { borderRadius: 2, border: '1px solid #e2e8f0', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' } } }}
        >
          <Box sx={{ p: { xs: 2, md: 4 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
              <Typography variant="h4" sx={{ fontWeight: '900', textTransform: 'uppercase', fontSize: { xs: '1.5rem', md: '2.125rem' } }}>
                Charity Moments Gallery
              </Typography>
              <IconButton onClick={() => setOpenGalleryGrid(false)} sx={{ border: '1px solid #e2e8f0', borderRadius: 1, bgcolor: 'white' }}>
                <CloseIcon />
              </IconButton>
            </Box>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' }, gridAutoRows: '240px', gap: 3 }}>
              {impactStories.map((story) => (
                <Box 
                  key={story.id} 
                  onClick={() => {
                    setOpenGalleryGrid(false);
                    setSelectedImpact(story);
                  }} 
                  sx={{ borderRadius: 1, overflow: 'hidden', cursor: 'pointer', position: 'relative', transition: 'all 0.3s ease', '&:hover': { transform: 'scale(1.02)', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', zIndex: 2, '& .overlay': { opacity: 1 } } }}
                >
                  <Box component="img" src={story.image} loading="lazy" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <Box className="overlay" sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, bgcolor: 'rgba(190, 24, 93, 0.85)', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 3, opacity: 0, transition: 'opacity 0.3s ease', textAlign: 'center' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: '900', textTransform: 'uppercase', mb: 1 }}>{story.title}</Typography>
                    <Typography variant="caption" sx={{ fontWeight: '700' }}>📍 {story.location}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Dialog>

        {/* --- LIGHTBOX & DETAILS --- */}
        <Dialog 
          open={!!selectedImpact} 
          onClose={() => setSelectedImpact(null)} 
          maxWidth="md" 
          fullWidth
          slotProps={{ paper: { sx: { borderRadius: 2, border: '1px solid #e2e8f0', boxShadow: '0 20px 60px rgba(0,0,0,0.15)', overflow: 'hidden' } } }}
        >
          {selectedImpact && (
            <Box>
              <Box sx={{ position: 'relative', width: '100%', height: { xs: 200, sm: 350 }, overflow: 'hidden' }}>
                <Box component="img" src={selectedImpact.image} alt={selectedImpact.title} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <IconButton 
                  onClick={() => setSelectedImpact(null)} 
                  sx={{ 
                    position: 'absolute', top: 16, right: 16, 
                    color: 'white', bgcolor: 'rgba(0,0,0,0.6)', 
                    '&:hover': { bgcolor: '#be185d' } 
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
              <Box sx={{ p: { xs: 3, md: 5 } }}>
                <Typography variant="overline" sx={{ fontWeight: '900', color: '#be185d', letterSpacing: '2px' }}>
                  📍 {selectedImpact.location} — 📅 {selectedImpact.date}
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: '900', color: '#1e293b', textTransform: 'uppercase', mt: 1, mb: 3, letterSpacing: '-0.5px' }}>
                  {selectedImpact.title}
                </Typography>
                <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.8, fontSize: '1.05rem', textAlign: 'justify', whiteSpace: 'pre-line' }}>
                  {selectedImpact.description}
                </Typography>
              </Box>
            </Box>
          )}
        </Dialog>
      </Container>
    </Box>
  );
}
