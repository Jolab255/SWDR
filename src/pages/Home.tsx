import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  LinearProgress,
  Chip,
  Paper,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PeopleIcon from '@mui/icons-material/People';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import type { ClinicEvent, NewsArticle } from '../utils/mockData';
import { getStoredEvents, getStoredNews } from '../utils/mockData';

interface HomeProps {
  onDonateClick: () => void;
  setCurrentPage: (page: string) => void;
}

export default function Home({ onDonateClick, setCurrentPage }: HomeProps) {
  const [events, setEvents] = useState<ClinicEvent[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [filter, setFilter] = useState<string>('All');
  
  // Responsive breakpoints for dynamic carousel
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'));
  const isSm = useMediaQuery(theme.breakpoints.up('sm'));
  const visibleCards = isMd ? 3 : isSm ? 2 : 1;

  const [carouselIndex, setCarouselIndex] = useState(0);
  
  // Volunteer Registration & Details Dialog State
  const [openRegister, setOpenRegister] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [showFullDetails, setShowFullDetails] = useState(false);
  const [openRegSuccessDialog, setOpenRegSuccessDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<ClinicEvent | null>(null);
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  // Scroll to top when showing/hiding full details
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [showFullDetails]);
  const [regProfession, setRegProfession] = useState('Dentist');
  const [showRegSuccess, setShowRegSuccess] = useState(false);

  // Photo gallery state
  const [openPhotoModal, setOpenPhotoModal] = useState(false);
  const [activePhoto, setActivePhoto] = useState<null | {
    title: string; location: string; date: string;
    description: string; image: string;
    extraImages: string[]; fullDescription: string;
  }>(null);

  // --- DYNAMIC SLIDER SECTION STATE ---
  const [activeSlide, setActiveSlide] = useState(0);
  const [openGalleryGrid, setOpenGalleryGrid] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const sliderImages = [
    {
      url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2070&auto=format&fit=crop',
      title: 'Smile with Dr. Rome Charity',
      location: 'Muhimbili Hospital',
      date: 'May 15, 2026',
    },
    {
      url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop',
      title: 'Community Outreach Program',
      location: 'Mwananyamala Clinic',
      date: 'April 20, 2026',
    },
    {
      url: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1932&auto=format&fit=crop',
      title: 'Pediatric Dental Camp',
      location: 'Mikocheni Health Center',
      date: 'March 12, 2026',
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [sliderImages.length]);

  const nextSlide = (activeSlide + 1) % sliderImages.length;

  const photoEvents = [
    {
      title: 'Mikocheni Mobile Clinic Camp',
      location: 'Mikocheni, Dar es Salaam',
      date: '2026-04-12',
      description: 'Our team deployed a mobile dental unit to Mikocheni primary school, treating over 80 children in a single day.',
      image: '/images/swdr_hero.png',
      extraImages: ['/images/swdr_hero.png', '/images/swdr_hero.png', '/images/swdr_hero.png'],
      fullDescription: 'During the Mikocheni Mobile Clinic Camp, our dedicated team of dentists and nurses set up a fully equipped dental station inside the school compound. Over 80 children received emergency extractions, restorative fillings, and oral hygiene instruction. Parents were also educated on preventive care and the importance of fluoride toothpaste. The event was co-organized with the local ward office and drew significant community participation.',
    },
    {
      title: 'Mwananyamala Hygiene Campaign',
      location: 'Mwananyamala, Dar es Salaam',
      date: '2026-03-05',
      description: 'Distributed 300+ dental kits to school children and conducted live brushing demonstrations in four classrooms.',
      image: '/images/swdr_hero.png',
      extraImages: ['/images/swdr_hero.png', '/images/swdr_hero.png', '/images/swdr_hero.png'],
      fullDescription: 'The Mwananyamala Hygiene Campaign was a landmark preventative outreach event. Our team visited four classrooms across two primary schools, distributing high-fluoride toothpaste and quality toothbrushes to over 300 children. Interactive demonstrations on correct brushing technique were delivered by Dr. Jerome Rome himself. The campaign was warmly received by teachers and parents who noted visible improvements in children\'s dental hygiene habits within weeks.',
    },
    {
      title: 'Cleft Lip Surgical Camp — Muhimbili',
      location: 'Muhimbili National Hospital, DSM',
      date: '2026-02-18',
      description: 'Partnered with Muhimbili surgeons to perform 12 cleft lip and palate reconstructions for children aged 2–14.',
      image: '/images/swdr_hero.png',
      extraImages: ['/images/swdr_hero.png', '/images/swdr_hero.png', '/images/swdr_hero.png'],
      fullDescription: 'In collaboration with the oral and maxillofacial surgery department at Muhimbili National Hospital, SWDR facilitated a two-day cleft lip and palate surgical camp. Twelve children between the ages of 2 and 14 underwent reconstructive surgery completely free of charge. Pre-operative assessments, anesthesia, surgery, and post-operative care were all covered by SWDR donor funds. Families traveled from as far as Dodoma and Mbeya to access this life-changing service.',
    },
  ];

  useEffect(() => {
    try {
      const ver = localStorage.getItem('swdr_home_migration_v5');
      if (ver !== 'v5') {
        localStorage.removeItem('swdr_events');
        localStorage.setItem('swdr_home_migration_v5', 'v5');
      }
    } catch (e) {
      console.error(e);
    }
    setEvents(getStoredEvents());
    setNews(getStoredNews());
  }, []);

  // Sort and calculate carousel boundary metrics
  const sortedEvents = [...(filter === 'All' 
    ? events 
    : events.filter(e => e.category.toLowerCase() === filter.toLowerCase()))]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const maxIndex = Math.max(0, sortedEvents.length - visibleCards);

  // Reset carouselIndex when filter changes
  useEffect(() => {
    setCarouselIndex(0);
  }, [filter]);

  // Keep carouselIndex in bounds during window resize / responsive adjustments
  useEffect(() => {
    if (carouselIndex > maxIndex) {
      setCarouselIndex(maxIndex);
    }
  }, [visibleCards, maxIndex, carouselIndex]);

  const handleRegisterClick = (ev: ClinicEvent) => {
    setSelectedEvent(ev);
    setOpenRegister(true);
  };

  const handleReadMoreClick = (ev: ClinicEvent) => {
    setSelectedEvent(ev);
    setShowFullDetails(true);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail) return;

    // Simulate database record update
    if (selectedEvent) {
      const updatedEvents = events.map(item => {
        if (item.id === selectedEvent.id) {
          return {
            ...item,
            slotsRegistered: Math.min(item.slotsRegistered + 1, item.slotsTotal)
          };
        }
        return item;
      });
      setEvents(updatedEvents);
      // Sync back to localstorage
      localStorage.setItem('swdr_events', JSON.stringify(updatedEvents));
    }

    setOpenRegister(false);
    setOpenRegSuccessDialog(true); // Open premium success Dialog with Donate button!
    setRegName('');
    setRegEmail('');
  };


  const filteredEvents = filter === 'All' 
    ? events 
    : events.filter(e => e.category.toLowerCase() === filter.toLowerCase());



  if (showFullDetails && selectedEvent) {
    return (
      <Box sx={{ py: 6, bgcolor: '#f8fafc', minHeight: '80vh' }}>
        <Container maxWidth="lg">
          {/* Back Button */}
          <Box sx={{ mb: 4 }}>
            <Button
              onClick={() => {
                setShowFullDetails(false);
                setSelectedEvent(null);
              }}
              startIcon={<ArrowBackIcon />}
              sx={{ 
                color: '#1e293b', 
                fontWeight: '900',
                textTransform: 'none',
                borderRadius: 0,
                border: '2px solid #1e293b',
                boxShadow: '4px 4px 0px #1e293b',
                px: 3,
                py: 1.2,
                bgcolor: 'white',
                transition: 'all 0.2s',
                '&:hover': { 
                  transform: 'translate(-2px, -2px)',
                  boxShadow: '6px 6px 0px #1e293b',
                  bgcolor: '#f0f9ff'
                }
              }}
            >
              Back to Events Calendar
            </Button>
          </Box>

          <Paper 
            elevation={0}
            sx={{
              borderRadius: 0,
              border: '3px solid #1e293b',
              boxShadow: '10px 10px 0px #1e293b',
              bgcolor: 'white',
              overflow: 'hidden',
              mb: 4
            }}
          >
            {/* Event Header Image */}
            <Box 
              sx={{ 
                position: 'relative', 
                width: '100%', 
                height: { xs: 250, sm: 400 }, 
                overflow: 'hidden',
                borderBottom: '3px solid #1e293b'
              }}
            >
              <Box 
                component="img"
                src={selectedEvent.image}
                alt={selectedEvent.title}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: 0
                }}
              />
              <Box 
                sx={{ 
                  position: 'absolute', 
                  top: 20, 
                  right: 20, 
                  bgcolor: 'rgba(15, 23, 42, 0.85)', 
                  backdropFilter: 'blur(8px)',
                  color: '#ffffff', 
                  px: 2.5, 
                  py: 1,
                  fontSize: '0.85rem',
                  fontWeight: 'bold',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                {selectedEvent.category}
              </Box>
            </Box>

            <Box sx={{ p: { xs: 4, sm: 6 } }}>
              {/* Event Title */}
              <Typography 
                variant="h2" 
                fontWeight="900" 
                color="text.primary" 
                gutterBottom 
                sx={{ 
                  fontSize: { xs: '2rem', sm: '2.75rem' },
                  lineHeight: 1.2,
                  letterSpacing: '-1px',
                  mb: 4
                }}
              >
                {selectedEvent.title}
              </Typography>

              {/* Event Metadata Cards */}
              <Grid container spacing={3.5} sx={{ mb: 6 }}>
                <Grid item xs={12} sm={6} md={4}>
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: 3, 
                      bgcolor: '#f8fafc', 
                      border: '2px solid #1e293b', 
                      boxShadow: '4px 4px 0px #0284c7',
                      borderRadius: 0,
                      height: '100%'
                    }}
                  >
                    <Typography sx={{ fontSize: '1.5rem', mb: 1 }}>📅</Typography>
                    <Typography variant="caption" color="text.secondary" fontWeight="900" sx={{ textTransform: 'uppercase', display: 'block', mb: 1, letterSpacing: '0.5px' }}>
                      Date
                    </Typography>
                    <Typography variant="body1" fontWeight="bold" color="text.primary">
                      {new Date(selectedEvent.date).toLocaleDateString('en-TZ', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: 3, 
                      bgcolor: '#f8fafc', 
                      border: '2px solid #1e293b', 
                      boxShadow: '4px 4px 0px #0284c7',
                      borderRadius: 0,
                      height: '100%'
                    }}
                  >
                    <Typography sx={{ fontSize: '1.5rem', mb: 1 }}>🕒</Typography>
                    <Typography variant="caption" color="text.secondary" fontWeight="900" sx={{ textTransform: 'uppercase', display: 'block', mb: 1, letterSpacing: '0.5px' }}>
                      Hours
                    </Typography>
                    <Typography variant="body1" fontWeight="bold" color="text.primary">
                      {selectedEvent.time}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={12} md={4}>
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: 3, 
                      bgcolor: '#f8fafc', 
                      border: '2px solid #1e293b', 
                      boxShadow: '4px 4px 0px #0284c7',
                      borderRadius: 0,
                      height: '100%'
                    }}
                  >
                    <Typography sx={{ fontSize: '1.5rem', mb: 1 }}>📍</Typography>
                    <Typography variant="caption" color="text.secondary" fontWeight="900" sx={{ textTransform: 'uppercase', display: 'block', mb: 1, letterSpacing: '0.5px' }}>
                      Location
                    </Typography>
                    <Typography variant="body1" fontWeight="bold" color="text.primary">
                      {selectedEvent.location}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              {/* Event Description */}
              <Typography variant="h5" fontWeight="900" sx={{ mb: 2.5, color: 'text.primary', borderBottom: '2px solid', pb: 1, borderColor: 'grey.100' }}>
                About this Event
              </Typography>
              <Typography 
                variant="body1" 
                color="text.secondary" 
                sx={{ 
                  lineHeight: 1.8, 
                  color: 'grey.800',
                  fontSize: '1.1rem',
                  mb: 6
                }}
              >
                {selectedEvent.description}
              </Typography>

              {/* --- DEDICATED VOLUNTEER & DONATE CTA SECTION --- */}
              <Paper 
                elevation={0}
                sx={{
                  p: { xs: 4, md: 6 },
                  background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', 
                  border: '3px solid #1e293b', 
                  boxShadow: '8px 8px 0px #0284c7', 
                  borderRadius: 0,
                  mb: 4,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translate(-4px, -4px)',
                    boxShadow: '12px 12px 0px #0369a1'
                  }
                }}
              >
                {/* Decorative background icon */}
                <Box 
                  sx={{
                    position: 'absolute',
                    right: -20,
                    bottom: -30,
                    fontSize: '12rem',
                    opacity: 0.05,
                    userSelect: 'none',
                    pointerEvents: 'none'
                  }}
                >
                  🦷
                </Box>

                <Grid container spacing={4} alignItems="center" sx={{ position: 'relative', zIndex: 2 }}>
                  <Grid item xs={12} md={12}>
                    <Typography 
                      variant="h4" 
                      fontWeight="900" 
                      color="text.primary" 
                      gutterBottom 
                      sx={{ 
                        fontSize: { xs: '1.6rem', sm: '2.25rem' },
                        lineHeight: 1.15,
                        letterSpacing: '-1px'
                      }}
                    >
                      Make a <Box component="span" sx={{ color: 'secondary.main' }}>Tangible Difference</Box> Today
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7, mb: { xs: 3, md: 0 }, fontSize: '1.025rem', color: 'grey.800' }}>
                      Every child deserves a pain-free, healthy smile. You can make an immediate impact by either contributing your specialized medical or general coordination skills on the ground as a volunteer, or by providing the vital financial resources to purchase high-quality clinical supplies, restorative dental materials, and emergency tools.
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Box sx={{ display: 'flex', flexDirection: "row", gap: 1.5, mt: 4 }}>
                      <Button
                        
                        variant="contained"
                        onClick={onDonateClick}
                        startIcon={<FavoriteIcon />}
                        sx={{ flex: 1, whiteSpace: "nowrap", fontSize: { xs: "0.85rem", sm: "1.05rem" }, 
                          py: 1.2,
                          borderRadius: 0,
                          fontWeight: '900',
                          textTransform: 'none',
                          boxShadow: '2px 2px 0px #1e293b',
                          border: '2px solid #1e293b',
                          bgcolor: 'secondary.main',
                          color: '#ffffff',
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
                        Donate to Event
                      </Button>
                      <Button
                        
                        variant={selectedEvent.slotsRegistered >= selectedEvent.slotsTotal ? 'outlined' : 'contained'}
                        disabled={selectedEvent.slotsRegistered >= selectedEvent.slotsTotal}
                        onClick={() => setOpenRegister(true)}
                        startIcon={<PeopleIcon />}
                        sx={{ flex: 1, whiteSpace: "nowrap", fontSize: { xs: "0.85rem", sm: "1.05rem" }, 
                          py: 1.2,
                          borderRadius: 0,
                          fontWeight: '900',
                          textTransform: 'none',
                          border: '2px solid #1e293b',
                          ...(selectedEvent.slotsRegistered < selectedEvent.slotsTotal ? {
                            background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                            color: '#ffffff',
                            '&:hover': {
                              background: 'linear-gradient(135deg, #0369a1 0%, #0284c7 100%)',
                              transform: 'translate(-2px, -2px)',
                              boxShadow: '4px 4px 0px #1e293b'
                            }
                          } : {
                            borderColor: 'grey.300',
                            color: 'text.disabled',
                            border: '2px solid grey.300'
                          })
                        }}
                      >
                        {selectedEvent.slotsRegistered >= selectedEvent.slotsTotal ? 'Registration Closed' : 'Join as Volunteer'}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          </Paper>
        </Container>

        {/* Keep dialogs renderable so popups work on this view too */}
  

      {/* --- VOLUNTEER REGISTRATION DIALOG --- */}
        <Dialog 
          open={openRegister} 
          onClose={() => setOpenRegister(false)} 
          maxWidth="xs" 
          fullWidth
            PaperProps={{ 
              sx: { 
                borderRadius: 0, 
                border: "3px solid #1e293b", 
                boxShadow: "10px 10px 0px #1e293b" 
              } 
            }}
        >
          <form onSubmit={handleRegisterSubmit}>
            <DialogTitle sx={{ fontWeight: "900", pt: 3.5, px: 3, fontSize: "1.4rem", borderBottom: "3px solid #1e293b", mb: 2 }}> 
              Volunteer for Outreach 
            </DialogTitle>
            <DialogContent sx={{ px: 3 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                Register to assist Dr. Rome's team during the <strong>{selectedEvent.title}</strong> on <strong>{selectedEvent.date}</strong>. 
                We are seeking dental practitioners, hygienists, and general volunteers.
              </Typography>

              <Grid container spacing={2.5}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    InputProps={{ sx: { borderRadius: 0 } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    InputProps={{ sx: { borderRadius: 0 } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Your Skill/Role</InputLabel>
                    <Select
                      value={regProfession}
                      label="Your Skill/Role"
                      onChange={(e) => setRegProfession(e.target.value)}
                      sx={{ borderRadius: 0 }}
                    >
                      <MenuItem value="Dentist">Licensed Dentist</MenuItem>
                      <MenuItem value="Hygienist">Dental Hygienist</MenuItem>
                      <MenuItem value="Nurse">Medical Nurse / Assistant</MenuItem>
                      <MenuItem value="General">General Coordinator / Helper</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 3.5, pt: 1.5, display: "flex", gap: 1.5 }}> 
              <Button 
                onClick={() => setOpenRegister(false)} 
                sx={{ 
                  borderRadius: 0, 
                  fontWeight: "900", 
                  textTransform: "none", 
                  px: 3, 
                  py: 1, 
                  border: "2px solid #1e293b", 
                  boxShadow: "4px 4px 0px #1e293b", 
                  color: "#1e293b", 
                  bgcolor: "white", 
                  "&:hover": { 
                    bgcolor: "#f0f9ff", 
                    transform: "translate(-2px, -2px)", 
                    boxShadow: "6px 6px 0px #1e293b" 
                  } 
                }} 
              > 
                Cancel 
              </Button> 
              <Button 
                type="submit" 
                variant="contained" 
                sx={{ 
                  borderRadius: 0, 
                  fontWeight: "900", 
                  textTransform: "none", 
                  px: 3, 
                  py: 1, 
                  border: "2px solid #1e293b", 
                  boxShadow: "4px 4px 0px #1e293b", 
                  background: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)", 
                  color: "#ffffff", 
                  "&:hover": { 
                    background: "linear-gradient(135deg, #0369a1 0%, #0284c7 100%)", 
                    transform: "translate(-2px, -2px)", 
                    boxShadow: "6px 6px 0px #1e293b" 
                  } 
                }} 
              > 
                Confirm Registration 
              </Button> 
            </DialogActions> 
          </form> 
        </Dialog>

        {/* --- REGISTRATION SUCCESS DIALOG --- */}
        <Dialog 
          open={openRegSuccessDialog} 
          onClose={() => setOpenRegSuccessDialog(false)} 
          maxWidth="xs" 
          fullWidth
            PaperProps={{ 
              sx: { 
                borderRadius: 0, 
                border: "3px solid #1e293b", 
                boxShadow: "10px 10px 0px #1e293b" 
              } 
            }}
        >
          <DialogContent sx={{ p: 4, textAlign: 'center' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <Box 
                sx={{ 
                  width: 70, 
                  height: 70, 
                  bgcolor: 'success.light', 
                  borderRadius: 0, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: 'success.dark',
                  border: '2px solid',
                  borderColor: 'success.dark'
                }}
              >
                <CheckCircleIcon sx={{ fontSize: 40 }} />
              </Box>
            </Box>

            <Typography variant="h5" fontWeight="900" gutterBottom sx={{ color: 'text.primary', mb: 2 }}>
              You're Registered!
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 3.5, lineHeight: 1.6 }}>
              Thank you for volunteering! Your registration for <strong>{selectedEvent.title}</strong> is confirmed. Our coordinator will email you logistics shortly.
            </Typography>

                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: 2.5, 
                      bgcolor: "#f0f9ff", 
                      border: "2px solid #1e293b", 
                      boxShadow: "4px 4px 0px #1e293b", 
                      borderRadius: 0, 
                      mb: 4, 
                      textAlign: "left" 
                    }} 
                  >
              <Typography variant="subtitle2" fontWeight="800" color="secondary.dark" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                Consider Making a Donation
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', lineHeight: 1.5 }}>
                Your physical support on the ground is invaluable. If you are able, a small donation will go a long way in purchasing essential clinical supplies, anesthetics, and dental kits for the children we treat.
              </Typography>
            </Paper>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}> 
              <Button 
                fullWidth 
                variant="contained" 
                onClick={() => { 
                  setOpenRegSuccessDialog(false); 
                  onDonateClick(); 
                }} 
                startIcon={<FavoriteIcon />} 
                sx={{ 
                  py: 1.6, 
                  borderRadius: 0, 
                  fontWeight: "900", 
                  textTransform: "uppercase", 
                  letterSpacing: "1px", 
                  fontSize: "0.95rem", 
                  boxShadow: "4px 4px 0px #1e293b", 
                  border: "3px solid #1e293b", 
                  bgcolor: "#0284c7", 
                  color: "white", 
                  transition: "all 0.15s ease", 
                  "&:hover": { 
                    bgcolor: "#0369a1", 
                    transform: "translate(-2px, -2px)", 
                    boxShadow: "6px 6px 0px #1e293b" 
                  }, 
                  "&:active": { 
                    transform: "translate(2px, 2px)", 
                    boxShadow: "2px 2px 0px #1e293b" 
                  } 
                }} 
              > 
                Donate Now 
              </Button> 
              <Button 
                fullWidth 
                variant="outlined" 
                onClick={() => setOpenRegSuccessDialog(false)} 
                sx={{ 
                  py: 1.4, 
                  borderRadius: 0, 
                  fontWeight: "900", 
                  textTransform: "none", 
                  fontSize: "0.9rem", 
                  border: "2px solid #1e293b", 
                  boxShadow: "2px 2px 0px #1e293b", 
                  color: "#1e293b", 
                  bgcolor: "white", 
                  "&:hover": { 
                    bgcolor: "#f0f9ff", 
                    transform: "translate(-1px, -1px)", 
                    boxShadow: "3px 3px 0px #1e293b" 
                  } 
                }} 
              > 
                Close 
              </Button> 
            </Box> 
          </DialogContent> 
        </Dialog> 
      </Box>
    );
  }

  return (
    <Box sx={{ overflow: 'hidden' }}>
      
      {/* --- REFINED HERO SECTION --- */}
      <Box 
        sx={{
          position: 'relative',
          pt: { xs: 4, md: 6 }, // Reduced padding top
          pb: { xs: 6, md: 8 },  // Adjusted padding bottom
          background: 'linear-gradient(180deg, #f0f9ff 0%, #ffffff 100%)', // Elegant light blue to white gradient
          color: 'text.primary',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={6} alignItems="center">
            {/* Left Column: Descriptive Typographic Block */}
            <Grid item xs={12} md={7}>
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
                    onClick={() => setCurrentPage('about')}
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
 
            {/* Right Column: Framed Photorealistic Outreach Image */}
            <Grid item xs={12} md={5}>
              <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', width: '100%' }}>
                {/* Visual Image container with nice drop shadow and white borders */}
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
                    alt="Smile with Doctor Rome outreach"
                    onClick={() => setLightboxImage('/images/swdr_hero.png')}
                    sx={{
                      width: '100%',
                      height: { xs: 320, md: 440 },
                      objectFit: 'cover',
                      borderRadius: 0,
                      borderBottom: '3px solid #1e293b',
                      display: 'block',
                      cursor: 'pointer',
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


      {/* --- PHOTO MODAL --- */}
      <Dialog
        open={openPhotoModal}
        onClose={() => setOpenPhotoModal(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 0,
            border: '3px solid #1e293b',
            boxShadow: '10px 10px 0px #1e293b',
            m: { xs: 1, sm: 3 },
          },
        }}
      >
        {activePhoto && (
          <>
            {/* Modal header */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 3,
                py: 2,
                borderBottom: '3px solid #1e293b',
                bgcolor: '#1e293b',
              }}
            >
              <Typography fontWeight="900" sx={{ color: 'white', textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '0.95rem' }}>
                {activePhoto.title}
              </Typography>
              <IconButton
                onClick={() => setOpenPhotoModal(false)}
                sx={{
                  color: 'white',
                  borderRadius: 0,
                  border: '2px solid rgba(255,255,255,0.3)',
                  p: 0.5,
                  '&:hover': { bgcolor: '#0284c7', borderColor: '#0284c7' },
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>

            <DialogContent sx={{ p: 0 }}>
              {/* Full main image */}
              <Box
                component="img"
                src={activePhoto.image}
                alt={activePhoto.title}
                sx={{
                  width: '100%',
                  height: { xs: 220, sm: 360 },
                  objectFit: 'cover',
                  display: 'block',
                  borderBottom: '3px solid #1e293b',
                }}
              />

              <Box sx={{ p: { xs: 3, md: 4 } }}>
                {/* Location + Date */}
                <Box sx={{ display: 'flex', gap: 3, mb: 2.5, flexWrap: 'wrap' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <LocationOnIcon sx={{ fontSize: 16, color: '#0284c7' }} />
                    <Typography variant="body2" fontWeight={700} sx={{ color: '#1e293b' }}>
                      {activePhoto.location}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <CalendarTodayIcon sx={{ fontSize: 15, color: '#0284c7' }} />
                    <Typography variant="body2" fontWeight={700} sx={{ color: '#1e293b' }}>
                      {new Date(activePhoto.date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                    </Typography>
                  </Box>
                </Box>

                {/* Full description */}
                <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.85, mb: 4 }}>
                  {activePhoto.fullDescription}
                </Typography>

                {/* Extra images */}
                <Typography
                  fontWeight="900"
                  sx={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '2px', color: '#0284c7', mb: 2 }}
                >
                  More from this event
                </Typography>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 1.5,
                  }}
                >
                  {activePhoto.extraImages.map((img, i) => (
                    <Box
                      key={i}
                      component="img"
                      src={img}
                      alt={`Event photo ${i + 1}`}
                      sx={{
                        width: '100%',
                        height: { xs: 90, sm: 130 },
                        objectFit: 'cover',
                        border: '2.5px solid #1e293b',
                        display: 'block',
                        transition: 'all 0.15s',
                        '&:hover': { borderColor: '#0284c7', transform: 'scale(1.02)' },
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>


      {/* --- WHAT WE DO SECTION --- */}
      <Box sx={{ py: 10, bgcolor: 'white', borderTop: '4px solid #1e293b' }}>
        <Container maxWidth="xl">
          <Box sx={{ maxWidth: { xs: '100%', md: '60%' }, mx: 'auto', textAlign: 'center' }}>
            {/* Section Header */}
            <Box sx={{ mb: 6 }}>
              <Typography 
                variant="h3" 
                fontWeight="900" 
                gutterBottom 
                sx={{ 
                  color: '#1e293b', 
                  fontSize: { xs: '2.2rem', md: '2.8rem' },
                  textTransform: 'uppercase',
                  letterSpacing: '-1px',
                  mb: 2,
                  textAlign: 'center'
                }}
              >
                What We Do
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  fontSize: '1.175rem', 
                  lineHeight: 1.85, 
                  textAlign: 'center',
                  fontStyle: 'italic',
                  color: '#64748b',
                  fontWeight: 400,
                  letterSpacing: '0.01em',
                  mt: 1
                }}
              >
                Smile with Doctor Rome Clinic delivers professional dental services and reconstructive oral surgery through four core humanitarian programs.
              </Typography>
            </Box>

            {/* Programs Stack */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4.5 }}>
              
              {/* Program 1: Mobile Clinics */}
              <Box>
                <Typography variant="h5" fontWeight="900" sx={{ color: '#1e293b', mb: 1, fontSize: '1.4rem', textAlign: 'left' }}>
                  Mobile Clinics
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.025rem', lineHeight: 1.7, color: '#475569', fontWeight: '500', textAlign: 'justify' }}>
                  We deploy equipped mobile units to remote rural villages where dental services are non-existent, performing critical emergency checkups and relief extractions for school pupils.
                </Typography>
              </Box>

              {/* Program 2: Restorative Surgery */}
              <Box>
                <Typography variant="h5" fontWeight="900" sx={{ color: '#1e293b', mb: 1, fontSize: '1.4rem', textAlign: 'left' }}>
                  Restorative Surgery
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.025rem', lineHeight: 1.7, color: '#475569', fontWeight: '500', textAlign: 'justify' }}>
                  At our permanent center in Dar es Salaam, we provide advanced endodontic treatment, dental restoration, and emergency oral surgeries to children referred from our rural mobile campaigns.
                </Typography>
              </Box>

              {/* Program 3: Hygiene Campaigns */}
              <Box>
                <Typography variant="h5" fontWeight="900" sx={{ color: '#1e293b', mb: 1, fontSize: '1.4rem', textAlign: 'left' }}>
                  Hygiene Campaigns
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.025rem', lineHeight: 1.7, color: '#475569', fontWeight: '500', textAlign: 'justify' }}>
                  We host dynamic preventative hygiene checkups and educational workshops in primary schools, distributing dental health kits (toothbrushes and pastes) to foster lasting positive habits.
                </Typography>
              </Box>

              {/* Program 4: Surgical Camps */}
              <Box>
                <Typography variant="h5" fontWeight="900" sx={{ color: '#1e293b', mb: 1, fontSize: '1.4rem', textAlign: 'left' }}>
                  Surgical Camps
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.025rem', lineHeight: 1.7, color: '#475569', fontWeight: '500', textAlign: 'justify' }}>
                  We coordinate cleft lip and palate reconstruction camps, collaborating with local municipal hospitals to execute complex pediatric oral and maxillofacial surgeries completely free of charge.
                </Typography>
              </Box>

            </Box>
          </Box>
        </Container>
      </Box>




      {/* --- SUPPORT OUR MISSION SECTION --- */}
      <Box sx={{ pt: 1, pb: 10, bgcolor: 'white', borderBottom: '1px solid #e2e8f0' }}>
        <Container maxWidth="md">

          {/* CTA Container */}
          <Box
            sx={{
              border: '3px solid #1e293b',
              boxShadow: '8px 8px 0px #1e293b',
              p: { xs: 2.5, md: 4 },
              textAlign: 'center',
              bgcolor: 'white',
            }}
          >

            {/* Headline */}
            <Typography
              variant="h2"
              fontWeight="900"
              sx={{
                color: '#1e293b',
                fontSize: { xs: '2.4rem', md: '3.6rem' },
                textTransform: 'uppercase',
                letterSpacing: '-2px',
                lineHeight: 1.1,
                mb: 3,
              }}
            >
              Support Our Mission
            </Typography>

            {/* Divider bar */}
            <Box sx={{ width: 64, height: 5, bgcolor: '#0284c7', border: '2px solid #1e293b', mx: 'auto', mb: 3 }} />

            {/* Supporting text */}
            <Typography
              sx={{
                fontSize: '1.2rem',
                color: '#475569',
                fontWeight: 500,
                lineHeight: 1.85,
                maxWidth: '540px',
                mx: 'auto',
                mb: 5,
              }}
            >
              Every donation goes directly to clinical supplies, surgical materials, and outreach — no overhead, no middlemen.
            </Typography>

            {/* CTA Button */}
            <Button
              variant="contained"
              onClick={onDonateClick}
              startIcon={<FavoriteIcon />}
              sx={{
                px: 6,
                py: 2,
                borderRadius: 0,
                fontWeight: '900',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontSize: '1rem',
                boxShadow: '6px 6px 0px #1e293b',
                border: '3px solid #1e293b',
                bgcolor: '#0284c7',
                color: 'white',
                transition: 'all 0.15s ease',
                '&:hover': {
                  bgcolor: '#0369a1',
                  transform: 'translate(-3px, -3px)',
                  boxShadow: '9px 9px 0px #1e293b',
                },
                '&:active': {
                  transform: 'translate(2px, 2px)',
                  boxShadow: '3px 3px 0px #1e293b',
                },
              }}
            >
              Donate Now
            </Button>

          </Box>
        </Container>
      </Box>





      {/* --- DYNAMIC CALENDAR & EVENTS SECTION --- */}
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
              fontWeight="900" 
              gutterBottom 
              sx={{ 
                color: '#1e293b', 
                fontSize: { xs: '2rem', md: '2.8rem' },
                textTransform: 'uppercase',
                letterSpacing: '-0.5px',
                mb: 2
              }}
            >
              Our Scheduled Outreaches & Charities
            </Typography>

          </Box>
          {/* --- SPACIOUS 3-COLUMN CALENDAR CARD GRID --- */}
          {filteredEvents.length === 0 ? (
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
              <Typography variant="h5" fontWeight="900" color="text.primary" gutterBottom sx={{ textTransform: 'uppercase' }}>
                No scheduled events found
              </Typography>
              <Typography variant="body1" color="text.secondary" fontWeight="700">
                Stay tuned! Or use the CMS panel to add new outreach activities.
              </Typography>
            </Paper>
          ) : (
            (() => {
              // Helper navigation handlers
              const handlePrev = () => setCarouselIndex((prev) => Math.max(0, prev - 1));
              const handleNext = () => setCarouselIndex((prev) => Math.min(maxIndex, prev + 1));

              return (
                <Box sx={{ position: 'relative', width: '100%', overflow: 'visible', px: { xs: 2, sm: 6 } }}>
                  
                  {/* Left Navigation Arrow */}
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
                        '&:hover': {
                          bgcolor: 'primary.light',
                          borderColor: '#1e293b',
                          boxShadow: '4px 4px 0px #1e293b'
                        },
                        '&.Mui-disabled': {
                          bgcolor: 'grey.100',
                          opacity: 0.5,
                          border: '2px solid grey.300',
                          boxShadow: 'none'
                        }
                      }}
                    >
                      <Typography sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1e293b', userSelect: 'none' }}>◀</Typography>
                    </IconButton>
                  )}

                  {/* Inner Track Clipping Window */}
                  <Box sx={{ overflow: 'hidden', width: '100%' }}>
                    
                    {/* Sliding Track */}
                    <Box sx={{ 
                      display: 'flex', 
                      transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)', 
                      transform: `translateX(-${carouselIndex * (100 / visibleCards)}%)`
                    }}>
                      {sortedEvents.map((ev) => (
                        <Box key={ev.id} sx={{ 
                          flex: {
                            xs: '0 0 100%',
                            sm: '0 0 50%',
                            md: '0 0 33.3333%'
                          },
                          px: 2,
                          boxSizing: 'border-box'
                        }}>
                          <Card 
                            sx={{ 
                              height: '100%', 
                              display: 'flex', 
                              flexDirection: 'column', 
                              borderRadius: 0,
                              border: '3px solid #1e293b',
                              boxShadow: '6px 6px 0px #1e293b',
                              overflow: 'hidden'
                            }}
                          >
                            <Box sx={{ position: 'relative', overflow: 'hidden', borderBottom: '3px solid #1e293b' }}>
                              <CardMedia
                                component="img"
                                height="220"
                                image={ev.image}
                                alt={ev.title}
                                sx={{ 
                                  borderRadius: 0,
                                  display: 'block'
                                }}
                              />
                            </Box>
                            
                            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 4 }}>
                              {/* Date Badge */}
                              <Box sx={{ 
                                display: 'inline-flex', 
                                alignItems: 'center', 
                                gap: 1, 
                                mb: 2, 
                                bgcolor: '#f0f9ff', 
                                color: '#1e293b',
                                alignSelf: 'flex-start',
                                px: 1.8,
                                py: 0.6,
                                borderRadius: 0,
                                border: '1.5px solid #1e293b',
                                boxShadow: '2px 2px 0px #1e293b'
                              }}>
                                <Typography variant="caption" sx={{ fontSize: '0.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                  📅 {new Date(ev.date).toLocaleDateString('en-TZ', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                                </Typography>
                              </Box>
                              
                              <Typography variant="h6" fontWeight="900" color="text.primary" gutterBottom sx={{ minHeight: 56, lineHeight: 1.35, fontSize: '1.2rem', mb: 2 }}>
                                {ev.title}
                              </Typography>

                              {/* Location Details */}
                              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.2, mb: 1.5 }}>
                                <Typography sx={{ fontSize: '1.1rem', lineHeight: 1, color: 'primary.main', mt: '2px' }}>📍</Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.4, fontWeight: 655 }}>
                                  <strong>Location:</strong> {ev.location}
                                </Typography>
                              </Box>

                              {/* Hours Details */}
                              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.2, mb: 3.5 }}>
                                <Typography sx={{ fontSize: '1.1rem', lineHeight: 1, color: 'primary.main', mt: '2px' }}>🕒</Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.4, fontWeight: 655 }}>
                                  <strong>Hours:</strong> {ev.time}
                                </Typography>
                              </Box>

                              <Typography variant="body2" color="text.secondary" sx={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', mb: 2, minHeight: 90, lineHeight: 1.6, color: 'grey.800' }}>
                                {ev.description}
                              </Typography>

                              {/* Slots registered metrics and progress bar */}
                              <Box sx={{ mt: 'auto', pt: 3, borderTop: '1px dashed', borderColor: 'grey.200' }}>
                                <Button
                                  fullWidth
                                  variant="contained"
                                  onClick={() => handleReadMoreClick(ev)}
                                  sx={{ 
                                    py: 1,
                                    borderRadius: 0,
                                    fontWeight: '900', 
                                    textTransform: 'none',
                                    fontSize: '0.95rem',
                                    boxShadow: '2px 2px 0px #1e293b',
                                    border: '2px solid #1e293b',
                                    bgcolor: '#0284c7',
                                    color: '#ffffff',
                                    transition: 'all 0.15s ease-in-out',
                                    '&:hover': {
                                      bgcolor: '#0369a1',
                                      transform: 'translate(-1px, -1px)',
                                      boxShadow: '3px 3px 0px #1e293b'
                                    },
                                    '&:active': {
                                      transform: 'translate(1px, 1px)',
                                      boxShadow: '1px 1px 0px #1e293b'
                                    }
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

                  {/* Right Navigation Arrow */}
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
                        '&:hover': {
                          bgcolor: 'primary.light',
                          borderColor: '#1e293b',
                          boxShadow: '4px 4px 0px #1e293b'
                        },
                        '&.Mui-disabled': {
                          bgcolor: 'grey.100',
                          opacity: 0.5,
                          border: '2px solid grey.300',
                          boxShadow: 'none'
                        }
                      }}
                    >
                      <Typography sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1e293b', userSelect: 'none' }}>▶</Typography>
                    </IconButton>
                  )}

                  {/* Indicator Dots */}
                  {maxIndex > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 5 }}>
                      {Array.from({ length: maxIndex + 1 }).map((_, idx) => {
                        const isCurrent = carouselIndex === idx;
                        return (
                          <Box
                            key={idx}
                            onClick={() => setCarouselIndex(idx)}
                            sx={{
                              width: 14,
                              height: 14,
                              bgcolor: isCurrent ? 'secondary.main' : 'white',
                              border: '2px solid #1e293b',
                              boxShadow: isCurrent ? '1px 1px 0px #1e293b' : '2px 2px 0px #1e293b',
                              cursor: 'pointer',
                              transition: 'all 0.15s ease-in-out',
                              borderRadius: 0,
                              '&:hover': {
                                transform: 'scale(1.15)',
                                bgcolor: isCurrent ? 'secondary.main' : 'primary.light'
                              }
                            }}
                          />
                        );
                      })}
                    </Box>
                  )}

                </Box>
              );
            })()
          )}
        </Container>
      </Box>
      {/* --- NEW DYNAMIC SLIDER SECTION --- */}
      <Box sx={{ py: 10, bgcolor: 'white', borderTop: '4px solid #1e293b' }}>
        <Container maxWidth="xl">
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Typography 
                variant="h3" 
                fontWeight="900" 
                gutterBottom 
                sx={{ 
                  color: "#1e293b", 
                  fontSize: { xs: "2.2rem", md: "2.8rem" },
                  textTransform: "uppercase",
                  letterSpacing: "-1px",
                  mb: 2
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
            border: '4px solid #1e293b',
            boxShadow: '12px 12px 0px #1e293b',
          }}>
            {/* Main Active Image with Automatic Move Animation */}
            <Box 
              sx={{ 
                position: 'relative', 
                width: '100%', 
                height: '100%', 
                overflow: 'hidden',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer'
              }}
              onClick={() => setLightboxImage(sliderImages[activeSlide].url)}
            >
              {sliderImages.map((img, idx) => (
                <Box
                  key={idx}
                  component="img"
                  src={img.url}
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

              {/* Transparent Overlay */}
              <Box 
                sx={{ 
                  position: 'absolute', 
                  bottom: 0, 
                  left: 0, 
                  right: 0, 
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
                  color: 'white', 
                  p: { xs: 3, md: 6 },
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.5,
                  pointerEvents: 'none'
                }}
              >
                <Typography 
                  variant="h3" 
                  fontWeight="900" 
                  sx={{ 
                    fontSize: { xs: '1.5rem', md: '2.4rem' },
                    textTransform: 'uppercase',
                    letterSpacing: '-1px',
                    mb: 0.5
                  }}
                >
                  {sliderImages[activeSlide].title}
                </Typography>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 2, md: 4 }, mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationOnIcon sx={{ color: '#0284c7', fontSize: { xs: '1rem', md: '1.25rem' } }} />
                    <Typography variant="body1" fontWeight="700" sx={{ fontSize: { xs: '0.85rem', md: '1rem' } }}>
                      Location: {sliderImages[activeSlide].location}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarTodayIcon sx={{ color: '#0284c7', fontSize: { xs: '0.9rem', md: '1.1rem' } }} />
                    <Typography variant="body1" fontWeight="700" sx={{ fontSize: { xs: '0.85rem', md: '1rem' } }}>
                      Date: {sliderImages[activeSlide].date}
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
                    px: 4,
                    py: 1,
                    borderRadius: 0,
                    fontWeight: '900',
                    textTransform: 'uppercase',
                    bgcolor: '#0284c7',
                    color: 'white',
                    border: '3px solid white',
                    boxShadow: '4px 4px 0px white',
                    pointerEvents: 'auto',
                    '&:hover': {
                      bgcolor: '#0369a1',
                      transform: 'translate(-2px, -2px)',
                      boxShadow: '6px 6px 0px white',
                    }
                  }}
                >
                  See More of This
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* --- RANDOM GALLERY GRID POPUP --- */}
      <Dialog
        open={openGalleryGrid}
        onClose={() => setOpenGalleryGrid(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 0,
            border: '4px solid #1e293b',
            boxShadow: '20px 20px 0px #1e293b',
            overflowX: 'hidden'
          }
        }}
      >
        <Box sx={{ p: { xs: 2, md: 4 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" fontWeight="900" sx={{ textTransform: 'uppercase', fontSize: { xs: '1.5rem', md: '2.125rem' } }}>
              Charity Moments Gallery
            </Typography>
            <IconButton onClick={() => setOpenGalleryGrid(false)} sx={{ border: '2px solid #1e293b', borderRadius: 0, bgcolor: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Box>
          
          <Box 
            sx={{ 
              display: 'grid', 
              gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                sm: 'repeat(3, 1fr)',
                md: 'repeat(4, 1fr)',
                lg: 'repeat(6, 1fr)'
              },
              gridAutoRows: '160px',
              gap: 2 
            }}
          >
            {Array.from({ length: 18 }).map((_, i) => {
              // Bento logic for spans to create "random" but structured look
              let gridColumn = 'span 1';
              let gridRow = 'span 1';
              if (i === 0) { gridColumn = 'span 2'; gridRow = 'span 2'; }
              if (i === 5) { gridColumn = 'span 2'; gridRow = 'span 1'; }
              if (i === 8) { gridColumn = 'span 1'; gridRow = 'span 2'; }
              if (i === 13) { gridColumn = 'span 2'; gridRow = 'span 2'; }
              if (i === 16) { gridColumn = 'span 2'; gridRow = 'span 1'; }

              const imgUrl = `https://picsum.photos/800/800?random=${i + 50}`;
              
              return (
                <Box 
                  key={i}
                  onClick={() => setLightboxImage(imgUrl)}
                  sx={{ 
                    gridColumn,
                    gridRow,
                    border: '3px solid #1e293b',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: '8px 8px 0px #0284c7',
                      borderColor: '#0284c7',
                      zIndex: 2,
                      '& .overlay': { opacity: 1 }
                    }
                  }}
                >
                  <Box 
                    component="img"
                    src={imgUrl}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <Box 
                    className="overlay"
                    sx={{
                      position: 'absolute',
                      top: 0, left: 0, right: 0, bottom: 0,
                      bgcolor: 'rgba(2, 132, 199, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0,
                      transition: 'opacity 0.2s',
                      backdropFilter: 'blur(2px)'
                    }}
                  >
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 900, textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>VIEW</Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Dialog>

      {/* --- LIGHTBOX DIALOG --- */}
      <Dialog
        open={!!lightboxImage}
        onClose={() => setLightboxImage(null)}
        maxWidth="lg"
        PaperProps={{
          sx: {
            borderRadius: 0,
            bgcolor: 'transparent',
            boxShadow: 'none',
            overflow: 'visible'
          }
        }}
      >
        <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <IconButton 
            onClick={() => setLightboxImage(null)}
            sx={{ 
              position: 'absolute', 
              top: -50, 
              right: 0, 
              color: 'white',
              bgcolor: 'rgba(0,0,0,0.5)',
              borderRadius: 0,
              border: '2px solid white',
              '&:hover': { bgcolor: '#0284c7' }
            }}
          >
            <CloseIcon />
          </IconButton>
          {lightboxImage && (
            <Box 
              component="img"
              src={lightboxImage}
              sx={{ 
                width: 'auto',
                maxWidth: '95vw', 
                maxHeight: '85vh', 
                objectFit: 'contain',
                border: '5px solid white',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                bgcolor: 'white'
              }}
            />
          )}
        </Box>
      </Dialog>
    </Box>
  );
}

