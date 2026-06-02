import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import FlagIcon from '@mui/icons-material/Flag';
import TimelineIcon from '@mui/icons-material/Timeline';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import StarIcon from '@mui/icons-material/Star';

interface WhyWeStartedProps {
  onDonateClick: () => void;
  setCurrentPage: (page: string) => void;
}

export default function WhyWeStarted({ onDonateClick, setCurrentPage }: WhyWeStartedProps) {
  const timelineEvents = [
    {
      year: '2021',
      title: 'The Eye-Opener (Morogoro)',
      desc: 'Dr. Jerome Rome volunteers at a rural orphanage in Morogoro. He discovers that over 90% of children suffered from active toothaches and facial infections, with absolutely zero access to dental professionals or simple toothbrushes.'
    },
    {
      year: '2022',
      title: 'Genesis of SWDR Charity',
      desc: 'Dr. Rome dedicates a portion of his private city clinic profits to start Smile with Doctor Rome Dental Clinic - Charity Branch. We conduct our first outreach in Kisarawe, Pwani, screening and treating 85 kids inside a school classroom.'
    },
    {
      year: '2023',
      title: 'The Mobile Dental Truck',
      desc: 'Recognizing classroom environments limit medical quality, we buy and retrofit a clinical mobile truck. Equipped with solar-powered patient chairs, dental tools, clean water tanks, and sterilization chambers.'
    },
    {
      year: '2024',
      title: 'Specialized Cleft & Palate Surgeries',
      desc: 'Visiting maxillofacial specialists partner with SWDR. We successfully perform our first batch of 12 free reconstructive cleft palate surgeries for children whose families could never afford clinical fees.'
    },
    {
      year: '2025',
      title: 'Unified Checkout Integration',
      desc: 'To support rising operation costs, we secure direct free API integrations with Tanzanian mobile networks (M-Pesa, Tigo Pesa, Airtel Money, Halopesa) and Selcom, enabling seamless domestic and international donation flows.'
    }
  ];

  const neoCardStyle = {
    borderRadius: 0,
    border: '3px solid #1e293b',
    boxShadow: '10px 10px 0px #1e293b',
    bgcolor: 'white',
    height: '100%',
    transition: 'all 0.2s ease',
    '&:hover': {
      transform: 'translate(-4px, -4px)',
      boxShadow: '14px 14px 0px #1e293b',
    }
  };

  const neoButtonStyle = {
    px: 4,
    py: 1.8,
    borderRadius: 0,
    fontWeight: '900',
    fontSize: '1rem',
    textTransform: 'none',
    border: '3px solid #1e293b',
    boxShadow: '4px 4px 0px #1e293b',
    transition: 'all 0.15s ease-in-out',
    '&:hover': {
      transform: 'translate(-2px, -2px)',
      boxShadow: '6px 6px 0px #1e293b',
    },
    '&:active': {
      transform: 'translate(1px, 1px)',
      boxShadow: '2px 2px 0px #1e293b',
    }
  };

  return (
    <Box sx={{ bgcolor: '#ffffff', overflow: 'hidden' }}>
      
      {/* HEADER SECTION */}
      <Box sx={{ pt: 10, pb: 8, bgcolor: '#f0f9ff', borderBottom: '4px solid #1e293b' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box 
              sx={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: 1.5, 
                mb: 3, 
                bgcolor: '#ffffff',
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
              <StarIcon sx={{ fontSize: '1.2rem', color: '#0284c7' }} />
              OUR HISTORY & COMMITMENT
            </Box>
            <Typography 
              variant="h1" 
              fontWeight="900" 
              sx={{ 
                color: '#1e293b', 
                fontSize: { xs: '2.5rem', md: '4rem' },
                textTransform: 'uppercase',
                letterSpacing: '-2px',
                lineHeight: 1.1
              }}
            >
              Why We <Box component="span" sx={{ color: '#0284c7' }}>Started</Box>
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 10 }}>
        {/* COMMITMENT SECTION */}
        <Grid container spacing={6} alignItems="center" sx={{ mb: 12 }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ position: 'relative' }}>
              <Box 
                sx={{
                  position: 'absolute',
                  top: 20,
                  left: 20,
                  width: '100%',
                  height: '100%',
                  bgcolor: '#0284c7',
                  zIndex: 0
                }}
              />
              <Box 
                component="img"
                src="/images/swdr_happy_children.png"
                alt="Happy children"
                sx={{
                  width: '100%',
                  height: { xs: 300, md: 450 },
                  objectFit: 'cover',
                  borderRadius: 0,
                  border: '4px solid #1e293b',
                  position: 'relative',
                  zIndex: 1,
                  display: 'block'
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box 
              sx={{ 
                p: { xs: 4, md: 5 }, 
                border: '4px solid #1e293b', 
                boxShadow: '12px 12px 0px #1e293b',
                bgcolor: 'white'
              }}
            >
              <Typography variant="h3" fontWeight="900" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5, textTransform: 'uppercase', fontSize: '2rem', letterSpacing: '-1px' }}>
                <FlagIcon sx={{ fontSize: '2.5rem', color: '#0284c7' }} /> Our Commitment
              </Typography>
              <Typography variant="body1" sx={{ color: '#1e293b', mb: 3, lineHeight: 1.7, fontWeight: 700, fontSize: '1.1rem' }}>
                "A child suffering from untreated cavities and chronic facial infection cannot eat properly, cannot sleep, and cannot concentrate in school."
              </Typography>
              <Typography variant="body1" sx={{ color: '#475569', mb: 4, lineHeight: 1.8, fontWeight: 500 }}>
                Dental health is a neglected crisis in East African healthcare. Our absolute commitment is to ensure that no child in Tanzania is denied fundamental healthcare or forced to leave school due to dental infections.
              </Typography>
              
              <Button
                variant="contained"
                onClick={onDonateClick}
                startIcon={<FavoriteIcon />}
                sx={{ 
                  ...neoButtonStyle,
                  bgcolor: '#0284c7',
                  color: 'white',
                  '&:hover': { bgcolor: '#0369a1' }
                }}
              >
                Stand With Our Commitment
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* TIMELINE JOURNEY */}
        <Box sx={{ py: 10, bgcolor: '#f8fafc', border: '4px solid #1e293b', boxShadow: '12px 12px 0px #1e293b', mb: 12, px: { xs: 3, md: 8 } }}>
          <Typography variant="h3" fontWeight="900" align="center" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 8, textTransform: 'uppercase', letterSpacing: '-1px' }}>
            <TimelineIcon sx={{ fontSize: '3rem', color: '#0284c7' }} /> Our Journey So Far
          </Typography>

          <Box sx={{ position: 'relative', pl: { xs: 4, sm: 8 }, borderLeft: '6px solid #1e293b' }}>
            {timelineEvents.map((item, idx) => (
              <Box key={idx} sx={{ position: 'relative', mb: 8, '&:last-child': { mb: 0 } }}>
                {/* Square Node */}
                <Box 
                  sx={{
                    position: 'absolute',
                    left: { xs: -47, sm: -79 },
                    top: 0,
                    width: 30,
                    height: 30,
                    bgcolor: '#0284c7',
                    border: '4px solid #1e293b',
                    boxShadow: '4px 4px 0px #1e293b'
                  }}
                />
                
                <Box 
                  sx={{ 
                    p: 4, 
                    bgcolor: 'white', 
                    border: '3px solid #1e293b', 
                    boxShadow: '6px 6px 0px #1e293b',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'translateX(8px)' }
                  }}
                >
                  <Typography variant="h5" fontWeight="900" color="#0284c7" gutterBottom sx={{ textTransform: 'uppercase' }}>
                    {item.year} — {item.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.7, fontWeight: 500, fontSize: '1.05rem' }}>
                    {item.desc}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* BE PART OF THE MOVEMENT */}
        <Box sx={{ mb: 12 }}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" fontWeight="900" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 3, textTransform: 'uppercase', letterSpacing: '-1px' }}>
              <VolunteerActivismIcon sx={{ fontSize: '3rem', color: '#0284c7' }} /> Be Part of the Movement
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: 700, mx: 'auto', fontWeight: 600, color: '#475569' }}>
              Smile with Doctor Rome is a collective movement. Your support, whether medical, financial, or logistics, keeps our dental truck moving.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              {
                title: 'Sponsor an Outreach',
                desc: 'Support the complete clinical costs of one rural mobile camp. Funds go directly to purchasing dental materials and truck fuel.',
                actionText: 'Sponsor a Camp Now',
                action: onDonateClick,
                color: '#ef4444'
              },
              {
                title: 'Volunteer Your Skills',
                desc: 'Are you a licensed dentist, hygienist, or nurse? Register to travel with Dr. Rome on our upcoming scheduled calendar dates.',
                actionText: 'See Outreach Calendar',
                action: () => setCurrentPage('home'),
                color: '#22c55e'
              },
              {
                title: 'Donate Dental Equipment',
                desc: 'We seek donations of examination chairs, dental tools, and supplies. Reach out to arrange delivery coordinates.',
                actionText: 'Contact Our Office',
                action: () => setCurrentPage('contact'),
                color: '#a855f7'
              }
            ].map((item, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Card sx={{ ...neoCardStyle, boxShadow: `8px 8px 0px ${item.color}` }}>
                  <CardContent sx={{ p: 5, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h5" fontWeight="900" gutterBottom sx={{ textTransform: 'uppercase', mb: 3 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.7, mb: 5, flexGrow: 1, fontWeight: 500 }}>
                      {item.desc}
                    </Typography>
                    <Button 
                      variant="contained" 
                      onClick={item.action}
                      fullWidth
                      sx={{ 
                        ...neoButtonStyle, 
                        bgcolor: 'white', 
                        color: '#1e293b', 
                        boxShadow: `4px 4px 0px ${item.color}`,
                        border: `3px solid ${item.color}`,
                        '&:hover': { bgcolor: '#f8fafc', boxShadow: `6px 6px 0px ${item.color}` }
                      }}
                    >
                      {item.actionText}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* GET IN TOUCH BANNER */}
        <Paper 
          elevation={0}
          sx={{
            bgcolor: '#1e293b',
            color: 'white',
            p: { xs: 6, md: 8 },
            borderRadius: 0,
            textAlign: 'center',
            border: '4px solid #0284c7',
            boxShadow: '15px 15px 0px #1e293b',
          }}
        >
          <Typography variant="h3" fontWeight="900" gutterBottom sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, textTransform: 'uppercase', mb: 3 }}>
            <MarkEmailReadIcon sx={{ fontSize: '3rem', color: '#0284c7' }} /> Get in Touch
          </Typography>
          <Typography variant="h6" sx={{ color: '#94a3b8', mb: 5, maxWidth: 700, mx: 'auto', lineHeight: 1.8, fontWeight: 600 }}>
            Do you have questions regarding our NGO registrations, partnership queries, or donation receipt issues? Send us a direct message now.
          </Typography>
          <Button
            variant="contained"
            onClick={() => setCurrentPage('contact')}
            sx={{ 
              ...neoButtonStyle, 
              bgcolor: '#0284c7', 
              color: 'white',
              px: 6,
              fontSize: '1.1rem',
              '&:hover': { bgcolor: '#0369a1' }
            }}
          >
            Go to Contact Page
          </Button>
        </Paper>

      </Container>
    </Box>
  );
}
