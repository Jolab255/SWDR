import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
} from '@mui/material';
import FlagIcon from '@mui/icons-material/Flag';
import TimelineIcon from '@mui/icons-material/Timeline';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GroupsIcon from '@mui/icons-material/Groups';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { useNavigate } from 'react-router-dom';

interface WhyWeStartedProps {
  onDonateClick: () => void;
}

export default function WhyWeStarted({ onDonateClick }: WhyWeStartedProps) {
  const navigate = useNavigate();

  const timelineEvents = [
    {
      year: '2021',
      title: 'The Eye-Opener (Morogoro)',
      desc: 'Dr. Jerome Rome volunteers at a rural orphanage in Morogoro. He discovers that over 90% of children suffered from active toothaches and facial infections, with absolutely zero access to dental professionals or simple toothbrushes.'
    },
    {
      year: '2022',
      title: 'Genesis of SWDR Charity',
      desc: 'Dr. Rome dedicates a portion of his private city clinic profits to start Smile with Doctor Rome Dental Clinic - Charity Branch. We conduct our first charity in Kisarawe, Pwani, screening and treating 85 kids inside a school classroom.'
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

  const neoButtonStyle = {
    px: 4,
    py: 1.8,
    borderRadius: 2,
    fontWeight: '900',
    fontSize: '1rem',
    textTransform: 'none',
    boxShadow: '0 2px 8px rgba(2,132,199,0.3)',
    transition: 'all 0.2s ease',
    '&:hover': {
      boxShadow: '0 4px 16px rgba(2,132,199,0.4)',
    },
  };

  return (
    <Box sx={{ bgcolor: '#ffffff', overflow: 'hidden' }}>
      
      {/* HEADER SECTION */}
      <Box sx={{ pt: { xs: 6, md: 7 }, pb: { xs: 4, md: 5 }, bgcolor: '#f0f9ff', borderBottom: '1px solid #e2e8f0' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center' }}>
            <Typography 
              variant="h1" 
              sx={{ 
                fontWeight: '900',
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
        {/* THE WHY / TURNING POINT SECTION */}
        <Box 
          sx={{ 
            mb: 12,
            border: '1px solid #e2e8f0', 
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            bgcolor: 'white',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            overflow: 'hidden',
            borderRadius: 2,
          }}
        >
          {/* Info Section (70%) */}
          <Box 
            sx={{ 
              width: { xs: '100%', md: '70%' }, 
              p: { xs: 5, md: 8 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: '900', mb: 3, display: 'flex', alignItems: 'center', gap: 1.5, textTransform: 'uppercase', fontSize: '2.2rem', letterSpacing: '-1px' }}>
              <FlagIcon sx={{ fontSize: '2.8rem', color: '#0284c7' }} /> The Turning Point
            </Typography>
            <Typography variant="body1" sx={{ color: '#1e293b', mb: 3, lineHeight: 1.7, fontWeight: 700, fontSize: '1.2rem' }}>
              "It started with a single volunteer trip to Morogoro that changed everything."
            </Typography>
            <Typography variant="body1" sx={{ color: '#475569', mb: 4, lineHeight: 1.8, fontWeight: 500, textAlign: 'justify' }}>
              While running a successful private practice in Dar es Salaam, Dr. Jerome Rome took a weekend to volunteer in rural Morogoro. What he found wasn't just "bad teeth"—it was a humanitarian crisis. He saw children with massive facial abscesses who hadn't slept in weeks, students dropping out because they couldn't speak without pain, and parents who had never even seen a toothbrush.
            </Typography>
            <Typography variant="body1" sx={{ color: '#475569', mb: 5, lineHeight: 1.8, fontWeight: 500, textAlign: 'justify' }}>
              He realized that for the millions of children in Tanzania's hardest environments, a "private clinic" was a fantasy. They didn't need a dentist in a city office; they needed a dentist who would drive to them. **That is why we started.** SWDR was founded to ensure that geography and poverty are no longer death sentences for a child's smile.
            </Typography>
            
            <Box>
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
                Help Us Reach More Villages
              </Button>
            </Box>
          </Box>

          {/* Image Section (30%) */}
          <Box 
            sx={{ 
              width: { xs: '100%', md: '30%' }, 
              border: { md: '1px solid #e2e8f0' },
              borderTop: { xs: '1px solid #e2e8f0', md: 'none' },
              overflow: 'hidden',
              minHeight: { xs: 300, md: 'auto' }
            }}
          >
            <Box 
              component="img"
              src="/images/swdr_doctor_rome.png"
              alt="Dr Jerome Rome"
              loading="lazy"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
            />
          </Box>
        </Box>

        {/* TIMELINE JOURNEY */}
        <Box sx={{ py: 10, bgcolor: '#f8fafc', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', mb: 12, px: { xs: 3, md: 8 }, borderRadius: 2 }}>
          <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: '900', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 8, textTransform: 'uppercase', letterSpacing: '-1px' }}>
            <TimelineIcon sx={{ fontSize: '3rem', color: '#0284c7' }} /> Our Journey So Far
          </Typography>

          <Box sx={{ position: 'relative', pl: { xs: 4, sm: 8 }, borderLeft: '3px solid #0284c7' }}>
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
                    border: '3px solid #bae6fd',
                    borderRadius: '50%',
                    boxShadow: '0 2px 8px rgba(2,132,199,0.3)'
                  }}
                />
                
                <Box 
                  sx={{ 
                    p: 4, 
                    bgcolor: 'white', 
                    border: '1px solid #e2e8f0', 
                    boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
                    borderRadius: 2,
                    transition: 'all 0.2s ease',
                    '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }
                  }}
                >
                  <Typography variant="h5" color="#0284c7" gutterBottom sx={{ fontWeight: '900', textTransform: 'uppercase' }}>
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
        <Box sx={{ mb: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" sx={{ fontWeight: '900', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 3, textTransform: 'uppercase', letterSpacing: '-1.5px', fontSize: { xs: '2rem', md: '2.8rem' } }}>
              Be Part of the Movement
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: 800, mx: 'auto', fontWeight: 500, color: '#475569', lineHeight: 1.85, fontSize: '1.1rem' }}>
              Smile with Doctor Rome is more than a clinic; it's a collective mission to restore health to the most vulnerable. Join us in making dental pain a thing of the past for Tanzania's children.
            </Typography>
            <Box sx={{ width: 64, height: 5, bgcolor: '#0284c7', mx: 'auto', mt: 3, borderRadius: 2 }} />
          </Box>

          <Grid container spacing={4}>
            {[
              {
                title: 'Sponsor an Charity',
                desc: 'Support the complete clinical costs of one rural mobile camp. Your funds go directly to purchasing dental materials, truck fuel, and medical supplies.',
                actionText: 'Sponsor a Camp Now',
                action: onDonateClick,
                icon: <VolunteerActivismIcon />
              },
              {
                title: 'Volunteer Your Skills',
                desc: 'Are you a licensed dentist, hygienist, or nurse? Register to join our mobile team on our upcoming rural charity sessions across East Africa.',
                actionText: 'Join the Medical Team',
                action: () => navigate('/'),
                icon: <GroupsIcon />
              },
              {
                title: 'Donate Dental Equipment',
                desc: 'We are always in need of examination chairs, pediatric dental tools, and consumable supplies. Help us equip our mobile units with the best tools.',
                actionText: 'Equipment Donation',
                action: () => navigate('/contact'),
                icon: <LocalHospitalIcon />
              }
            ].map((item, idx) => (
              <Grid size={{ xs: 12, md: 4 }} key={idx}>
                <Box
                  sx={{
                    p: 4,
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
                    bgcolor: 'white',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    transition: 'all 0.2s ease',
                    borderRadius: 2,
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 32px rgba(2,132,199,0.15)',
                      borderColor: '#0284c7'
                    }
                  }}
                >
                  {/* Icon Box */}
                  <Box 
                    sx={{ 
                      width: 80, 
                      height: 80, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      bgcolor: '#f0f9ff',
                      border: '1px solid #bae6fd',
                      borderRadius: 2,
                      boxShadow: '0 2px 8px rgba(2,132,199,0.15)',
                      color: '#0284c7',
                      mb: 4,
                      '& .MuiSvgIcon-root': { fontSize: '2rem' }
                    }}
                  >
                    {item.icon}
                  </Box>

                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontWeight: '900', 
                      textTransform: 'uppercase', 
                      mb: 2, 
                      color: '#1e293b', 
                      letterSpacing: '-0.5px' 
                    }}
                  >
                    {item.title}
                  </Typography>

                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#475569', 
                      fontWeight: 500, 
                      lineHeight: 1.8, 
                      textAlign: 'justify',
                      mb: 4,
                      flexGrow: 1
                    }}
                  >
                    {item.desc}
                  </Typography>

                  <Button 
                    variant="contained" 
                    onClick={item.action}
                    fullWidth
                    sx={{ 
                      ...neoButtonStyle, 
                      bgcolor: '#0284c7', 
                      color: 'white',
                      py: 1.8,
                      fontSize: '0.95rem',
                      '&:hover': { bgcolor: '#0369a1' }
                    }}
                  >
                    {item.actionText}
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

      </Container>
    </Box>
  );
}
