import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
} from '@mui/material';
import { ToothIcon, HeartIcon, UsersIcon, FlagIcon, MilestoneIcon, ToothShieldIcon, DentalMirrorIcon, ToothbrushAndPasteIcon } from '../components/DentalIcons';
import { useNavigate } from 'react-router-dom';
import { getStoredJourney } from '../utils/mockData';
import type { JourneyEvent } from '../utils/mockData';

interface WhyWeStartedProps {
  onDonateClick: () => void;
}

export default function WhyWeStarted({ onDonateClick }: WhyWeStartedProps) {
  const navigate = useNavigate();
  const [timelineEvents, setTimelineEvents] = useState<JourneyEvent[]>([]);

  useEffect(() => {
    getStoredJourney().then(setTimelineEvents);
  }, []);

  const neoButtonStyle = {
    px: 4,
    py: 1.8,
    borderRadius: 2,
    fontWeight: '900',
    fontSize: '1rem',
    textTransform: 'none',
    boxShadow: '0 2px 8px rgba(190, 24, 93,0.3)',
    transition: 'all 0.2s ease',
    '&:hover': {
      boxShadow: '0 4px 16px rgba(190, 24, 93,0.4)',
    },
  };

  return (
    <Box 
      sx={{ 
        backgroundImage: 'linear-gradient(180deg, rgba(255, 255, 255, 0.975) 0%, rgba(255, 255, 255, 0.975) 100%), url("/favicon.png")',
        backgroundRepeat: 'no-repeat, repeat',
        backgroundSize: 'auto, 120px 120px',
        backgroundAttachment: 'scroll, fixed',
        overflow: 'hidden' 
      }}
    >
      <Helmet>
        <title>Why We Started | Smile with Doctor Rome Dental Clinic</title>
        <meta name="description" content="Read the backstory of how a volunteer outreach trip by Dr. Melkisedeck Robert inspired a pediatric oral prevention revolution for Tanzanian children." />
      </Helmet>
      
      {/* HEADER SECTION */}
      <Box 
        sx={{ 
          pt: { xs: 6, md: 7 }, 
          pb: { xs: 4, md: 5 }, 
          backgroundImage: 'linear-gradient(180deg, rgba(253, 242, 248, 0.97) 0%, rgba(253, 242, 248, 0.97) 100%), url("/favicon.png")',
          backgroundRepeat: 'no-repeat, repeat',
          backgroundSize: 'auto, 120px 120px',
          backgroundAttachment: 'scroll, fixed',
          borderBottom: '1px solid #e2e8f0' 
        }}
      >
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
              Why We <Box component="span" sx={{ color: '#be185d' }}>Started</Box>
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
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            display: 'flex',
            flexDirection: { xs: 'column-reverse', md: 'row' },
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
              <FlagIcon sx={{ fontSize: '2.8rem', color: '#be185d' }} /> The Turning Point
            </Typography>
            <Typography variant="body1" sx={{ color: '#1e293b', mb: 3, lineHeight: 1.7, fontWeight: 700, fontSize: '1.2rem' }}>
              "A single volunteer trip that changed everything."
            </Typography>
            <Typography variant="body1" sx={{ color: '#475569', mb: 4, lineHeight: 1.8, fontWeight: 500, textAlign: 'justify' }}>
              In his third year as a dental student Dr. Melkisedeck Robert had to an opportunity to
              guide Letricia (late) and her mother through different departments at Muhimbili National
              Hospital where she was running various investigations. Born with a neurological
              disorder that kept her back curved and loss of coordination, Dr. Melkisedeck Robert
              noticed something unfair with her oral hygiene.
            </Typography>
            <Typography variant="body1" sx={{ color: '#475569', mb: 4, lineHeight: 1.8, fontWeight: 500, textAlign: 'justify' }}>
              A few weeks later he teamed up with Jody Holmes, Shawn Dunn and Andrew Dunn in
              Mwanza who were funding Letricia’s treatment. Together, they focused on helping
              children with special healthcare needs in schools, orphanages, and remote areas. As a
              dental student, he became increasingly concerned during outreach programs after
              noticing that many children had poor oral hygiene and untreated tooth decay. These
              communities reflected a much larger problem affecting millions of children across
              Tanzania and Africa.
            </Typography>
            <Typography variant="body1" sx={{ color: '#475569', mb: 5, lineHeight: 1.8, fontWeight: 500, textAlign: 'justify' }}>
              Knowing that dental services are expensive for them to afford, knowing they had no
              access to dental services easily, knowing such communities knew little or nothing about
              oral health – He found reasons beyond doubt as to why oral health services should
              move from institutions to communities especially to children with special healthcare
              needs. These children didn’t need a dentist in the city office, they needed one who
              could drive to them -That is why we started. SWDR was founded to ensure that
              geography, education and poverty are no longer death sentences for a child's smile.
            </Typography>
            
            <Box>
              <Button
                variant="contained"
                onClick={onDonateClick}
                startIcon={<HeartIcon />}
                sx={{ 
                  ...neoButtonStyle,
                  bgcolor: '#be185d',
                  color: 'white',
                  '&:hover': { bgcolor: '#9d174d' }
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
              borderBottom: { xs: '1px solid #e2e8f0', md: 'none' },
              overflow: 'hidden',
              minHeight: { xs: 300, md: 'auto' }
            }}
          >
            <Box 
              component="img"
              src="/images/Dr_Melkizedek.webp"
              alt="Dr Melkizedek Robert"
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

        {/* WHY FOCUS ON PRIMARY PREVENTION AND HEALTH PROMOTION */}
        <Box sx={{ mb: 12 }}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" sx={{ fontWeight: '900', mb: 3, textTransform: 'uppercase', letterSpacing: '-1px', fontSize: { xs: '2rem', md: '2.5rem' } }}>
              Why Focus on Primary Prevention &amp; Health Promotion
            </Typography>
            <Box sx={{ width: 64, height: 5, bgcolor: '#be185d', mx: 'auto', mt: 3, borderRadius: 2 }} />
          </Box>

          <Grid container spacing={4}>
            {[
              {
                title: 'Avoid occurrence',
                desc: 'We prioritize preventive care for children with special healthcare needs by reducing the risk of dental problems before they develop. Through tailored oral health education for children and caregivers, along with regular screenings, we help prevent cavities, gum disease, and other oral problems. Our proactive approach promotes healthier smiles and improved overall well-being.',
                icon: <ToothShieldIcon />
              },
              {
                title: 'Arrest progression',
                desc: 'Early detection and timely intervention are essential in caring for children with special healthcare needs. When dental problems are identified early, we provide tailored treatment and follow-up care to stop their progression. Our team works closely with caregivers and communities to monitor oral health and ensure children receive the support needed to prevent more serious complications.',
                icon: <DentalMirrorIcon />
              },
              {
                title: 'Reduce consequences / rehabilitate',
                desc: 'Dental problems in children with special healthcare needs can significantly affect overall health and quality of life. We focus on timely treatment and rehabilitation to reduce pain, prevent complications, and restore oral function. Through caregiver education and accessible care, we help manage the wider health impacts of untreated dental conditions.',
                icon: <ToothbrushAndPasteIcon />
              },
              {
                title: 'Enable community control over their health',
                desc: 'We empower children with special healthcare needs and their caregivers through education, support, and accessible dental care. By promoting awareness and preventive practices, we help families take an active role in managing their oral health and improving outcomes.',
                icon: <UsersIcon />
              }
            ].map((item, idx) => (
              <Grid size={{ xs: 12, md: 6 }} key={idx}>
                <Box
                  sx={{
                    p: 4,
                    border: '1px solid #e2e8f0',
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                    height: '100%',
                    borderRadius: 2,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                      borderColor: '#be185d'
                    }
                  }}
                >
                  {/* Icon Box */}
                  <Box 
                    sx={{ 
                      width: 48, 
                      height: 48, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      bgcolor: '#fdf2f8',
                      border: '1px solid #fce7f3',
                      borderRadius: 2,
                      color: '#be185d',
                      mb: 2.5,
                      '& .MuiSvgIcon-root': { fontSize: '1.5rem' }
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: '900', color: '#be185d', textTransform: 'uppercase', mb: 2, letterSpacing: '-0.5px', fontSize: '1.25rem' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.8, fontSize: '0.98rem', fontWeight: 500, textAlign: 'justify' }}>
                    {item.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* TIMELINE JOURNEY */}
        <Box 
          sx={{ 
            py: 10, 
            backgroundImage: 'linear-gradient(180deg, rgba(248, 250, 252, 0.97) 0%, rgba(248, 250, 252, 0.97) 100%), url("/favicon.png")',
            backgroundRepeat: 'no-repeat, repeat',
            backgroundSize: 'auto, 120px 120px',
            backgroundAttachment: 'scroll, fixed',
            border: '1px solid #e2e8f0', 
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)', 
            mb: 12, 
            px: { xs: 3, md: 8 }, 
            borderRadius: 2 
          }}
        >
          <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: '900', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 8, textTransform: 'uppercase', letterSpacing: '-1px' }}>
            <MilestoneIcon sx={{ fontSize: '3rem', color: '#be185d' }} /> Our Journey So Far
          </Typography>

          <Box sx={{ position: 'relative', pl: { xs: 4, sm: 8 }, borderLeft: '3px solid #be185d' }}>
            {timelineEvents.map((item, idx) => (
              <Box key={idx} sx={{ position: 'relative', mb: 8, '&:last-child': { mb: 0 } }}>
                {/* Square Node */}
                <Box 
                  sx={{
                    position: 'absolute',
                    left: { xs: -47, sm: -79 },
                    top: { xs: 20, md: 32 },
                    width: 30,
                    height: 30,
                    bgcolor: '#be185d',
                    border: '3px solid #fce7f3',
                    borderRadius: '50%',
                    boxShadow: '0 2px 8px rgba(190, 24, 93,0.3)',
                    zIndex: 2
                  }}
                />
                
                <Box 
                  sx={{ 
                    display: 'flex',
                    flexDirection: { xs: 'column', md: idx % 2 === 0 ? 'row' : 'row-reverse' },
                    border: '1px solid #e2e8f0', 
                    boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
                    borderRadius: 2,
                    overflow: 'hidden',
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                    transition: 'all 0.2s ease',
                    '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }
                  }}
                >
                  {/* Photo Container */}
                  <Box 
                    sx={{
                      width: { xs: '100%', md: '32%' },
                      minHeight: { xs: 220, md: 'auto' },
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <Box 
                      component="img"
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                  </Box>

                  {/* Content Details */}
                  <Box sx={{ p: 4, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant="h5" color="#be185d" gutterBottom sx={{ fontWeight: '900', textTransform: 'uppercase', fontSize: '1.2rem', letterSpacing: '-0.3px' }}>
                      {item.year} — {item.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.7, fontWeight: 500, fontSize: '0.98rem', textAlign: 'justify' }}>
                      {item.desc}
                    </Typography>
                  </Box>
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
              Smile with Doctor Rome is more than a clinic; it's a collective mission to restore oral health to the most vulnerable. Join us in making dental pain a thing of the past for African children.
            </Typography>
            <Box sx={{ width: 64, height: 5, bgcolor: '#be185d', mx: 'auto', mt: 3, borderRadius: 2 }} />
          </Box>

          <Grid container spacing={4}>
            {[
              {
                title: 'Sponsor a Charity',
                desc: 'Support the complete clinical costs of one rural mobile camp. Your funds go directly to purchasing dental materials, truck fuel, and medical supplies.',
                actionText: 'Sponsor a Camp Now',
                action: onDonateClick,
                icon: <HeartIcon />
              },
              {
                title: 'Volunteer Your Skills',
                desc: 'Are you a licensed dentist, hygienist, or nurse? Register to join our mobile team on our upcoming rural charity sessions across East Africa.',
                actionText: 'Join the Medical Team',
                action: () => navigate('/'),
                icon: <UsersIcon />
              },
              {
                title: 'Donate Dental Equipment',
                desc: 'We are always in need of examination chairs, pediatric dental tools, and consumable supplies. Help us equip our mobile units with the best tools.',
                actionText: 'Equipment Donation',
                action: () => navigate('/contact'),
                icon: <ToothIcon />
              }
            ].map((item, idx) => (
              <Grid size={{ xs: 12, md: 4 }} key={idx}>
                <Box
                  sx={{
                    p: 4,
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    transition: 'all 0.2s ease',
                    borderRadius: 2,
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 32px rgba(190, 24, 93,0.15)',
                      borderColor: '#be185d'
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
                      bgcolor: '#fdf2f8',
                      border: '1px solid #fce7f3',
                      borderRadius: 2,
                      boxShadow: '0 2px 8px rgba(190, 24, 93,0.15)',
                      color: '#be185d',
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
                      bgcolor: '#be185d', 
                      color: 'white',
                      py: 1.8,
                      fontSize: '0.95rem',
                      '&:hover': { bgcolor: '#9d174d' }
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
