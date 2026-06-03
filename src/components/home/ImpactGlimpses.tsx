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
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    if (impactStories.length === 0) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % impactStories.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [impactStories.length]);

  if (impactStories.length === 0) return null;

  const BORDER = '4px solid #1e293b';

  return (
    <Box sx={{ py: 10, bgcolor: 'white', borderTop: BORDER }}>
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
          height: '55vh',
          overflow: 'hidden',
          border: BORDER,
          boxShadow: '12px 12px 0px #1e293b',
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
            onClick={() => setLightboxImage(impactStories[activeSlide]?.image)}
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
                background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
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
                  <LocationOnIcon sx={{ color: '#0284c7', fontSize: { xs: '1rem', md: '1.25rem' } }} />
                  <Typography variant="body1" sx={{ fontWeight: '700', fontSize: { xs: '0.85rem', md: '1rem' } }}>
                    Location: {impactStories[activeSlide]?.location}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CalendarTodayIcon sx={{ color: '#0284c7', fontSize: { xs: '0.9rem', md: '1.1rem' } }} />
                  <Typography variant="body1" sx={{ fontWeight: '700', fontSize: { xs: '0.85rem', md: '1rem' } }}>
                    Date: {impactStories[activeSlide]?.date}
                  </Typography>
                </Box>
              </Box>

              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenGalleryGrid(true);
                }}
                sx={{
                  alignSelf: 'flex-start',
                  px: 4, py: 1, borderRadius: 0, fontWeight: '900', textTransform: 'uppercase',
                  bgcolor: '#0284c7', color: 'white', border: '3px solid white', boxShadow: '4px 4px 0px white',
                  pointerEvents: 'auto',
                  '&:hover': { bgcolor: '#0369a1', transform: 'translate(-2px, -2px)', boxShadow: '6px 6px 0px white' }
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
          slotProps={{ paper: { sx: { borderRadius: 0, border: '4px solid #1e293b', boxShadow: '20px 20px 0px #1e293b' } } }}
        >
          <Box sx={{ p: { xs: 2, md: 4 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
              <Typography variant="h4" sx={{ fontWeight: '900', textTransform: 'uppercase', fontSize: { xs: '1.5rem', md: '2.125rem' } }}>
                Charity Moments Gallery
              </Typography>
              <IconButton onClick={() => setOpenGalleryGrid(false)} sx={{ border: '2px solid #1e293b', borderRadius: 0, bgcolor: 'white' }}>
                <CloseIcon />
              </IconButton>
            </Box>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' }, gridAutoRows: '240px', gap: 3 }}>
              {impactStories.map((story) => (
                <Box key={story.id} onClick={() => setLightboxImage(story.image)} sx={{ border: '4px solid #1e293b', overflow: 'hidden', cursor: 'pointer', position: 'relative', transition: 'all 0.3s ease', '&:hover': { transform: 'translate(-4px, -4px)', boxShadow: '8px 8px 0px #0284c7', borderColor: '#0284c7', zIndex: 2, '& .overlay': { opacity: 1 } } }}>
                  <Box component="img" src={story.image} loading="lazy" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <Box className="overlay" sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, bgcolor: 'rgba(2, 132, 199, 0.85)', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 3, opacity: 0, transition: 'opacity 0.3s ease', textAlign: 'center' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: '900', textTransform: 'uppercase', mb: 1 }}>{story.title}</Typography>
                    <Typography variant="caption" sx={{ fontWeight: '700' }}>📍 {story.location}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Dialog>

        {/* --- LIGHTBOX --- */}
        <Dialog open={!!lightboxImage} onClose={() => setLightboxImage(null)} maxWidth="lg" slotProps={{ paper: { sx: { borderRadius: 0, bgcolor: 'transparent', boxShadow: 'none', overflow: 'visible' } } }}>
          <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <IconButton onClick={() => setLightboxImage(null)} sx={{ position: 'absolute', top: -50, right: 0, color: 'white', bgcolor: 'rgba(0,0,0,0.5)', borderRadius: 0, border: '2px solid white', '&:hover': { bgcolor: '#0284c7' } }}>
              <CloseIcon />
            </IconButton>
            {lightboxImage && <Box component="img" src={lightboxImage} sx={{ maxWidth: '100%', maxHeight: '85vh', border: '5px solid white', boxShadow: '0 0 40px rgba(0,0,0,0.5)' }} />}
          </Box>
        </Dialog>
      </Container>
    </Box>
  );
}
