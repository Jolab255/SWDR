import { Helmet } from 'react-helmet-async';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
} from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useState, useEffect } from 'react';
import type { TeamMember } from '../utils/mockData';
import { getStoredTeam } from '../utils/mockData';
import { ToothShieldIcon, ToothInsideHeartIcon, DentalMirrorAndProbeIcon, ToothWithCrownIcon, HeartIcon } from '../components/DentalIcons';

interface AboutUsProps {
  onDonateClick: () => void;
}

// ─── Shared clean token ───────────────────────────────────────────────────────
const BORDER = '1px solid #be185d';
const SHADOW = '0 4px 20px rgba(0,0,0,0.08)';
const SHADOW_HOVER = '0 12px 32px rgba(190, 24, 93,0.15)';

export default function AboutUs({ onDonateClick }: AboutUsProps) {
  const [team, setTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    getStoredTeam().then((storedTeam) => {
      if (storedTeam.length > 0) {
        setTeam(storedTeam);
      }
    });
  }, []);

  const values = [
    { label: 'Community', body: 'We partner with local schools, ward offices, and volunteer networks to build lasting oral health culture.', icon: <ToothShieldIcon sx={{ fontSize: '2.4rem', mb: 2, color: '#be185d' }} /> },
    { label: 'Compassion', body: 'Every child deserves dignity, pain relief, and a healthy smile — regardless of where they were born.', icon: <ToothInsideHeartIcon sx={{ fontSize: '2.4rem', mb: 2, color: '#be185d' }} /> },
    { label: 'Transparency', body: '100% of donor funds flow directly to clinical materials, travel, and surgical supplies. Zero overhead waste.', icon: <DentalMirrorAndProbeIcon sx={{ fontSize: '2.4rem', mb: 2, color: '#be185d' }} /> },
    { label: 'Excellence', body: 'We uphold the highest clinical standards as far as community oral health is concerned.', icon: <ToothWithCrownIcon sx={{ fontSize: '2.4rem', mb: 2, color: '#be185d' }} /> },
  ];

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
        <title>About Us | Smile with Doctor Rome Dental Clinic</title>
        <meta name="description" content="Learn about our mission, core values, and meet our founders Sylvia Shilinde, Michael Nyaruga, and lead pediatric dentist Dr. Melkisedeck Robert in Tanzania." />
      </Helmet>
      
      {/* ── HERO / INTRO ────────────────────────────────────────────────────── */}
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
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h1"
              sx={{
                fontWeight: '900',
                color: '#1e293b',
                fontSize: { xs: '2.5rem', md: '4rem' },
                textTransform: 'uppercase',
                letterSpacing: '-2px',
                lineHeight: 1.1,
              }}
            >
              Who <Box component="span" sx={{ color: '#be185d' }}>We Are</Box>
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* ── PROFILE STATEMENT ───────────────────────────────────────────────── */}
      <Box 
        sx={{ 
          py: { xs: 6, md: 8 }, 
          borderBottom: '1px solid #e2e8f0', 
          backgroundImage: 'linear-gradient(180deg, rgba(248, 250, 252, 0.97) 0%, rgba(248, 250, 252, 0.97) 100%), url("/favicon.png")',
          backgroundRepeat: 'no-repeat, repeat',
          backgroundSize: 'auto, 120px 120px',
          backgroundAttachment: 'scroll, fixed',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 7 }}>
              <Box sx={{ border: BORDER, boxShadow: SHADOW, bgcolor: 'white', p: { xs: 4, md: 5 }, borderRadius: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: '900', color: '#1e293b', textTransform: 'uppercase', letterSpacing: '-1px', mb: 1.5, fontSize: { xs: '1.6rem', md: '2.1rem' } }}>
                  The Smile Mission
                </Typography>
                <Box sx={{ width: 48, height: 4, bgcolor: '#be185d', mb: 3, borderRadius: 2 }} />
                <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.75, fontSize: '1.025rem', fontWeight: 500, mb: 4 }}>
                  Smile with Doctor Rome Dental Clinic (SWDR) was founded with a singular and
                  transformative vision: to move paediatric dental care from institutions into the
                  community for easy and quick accessibility. In Tanzania, untreated dental decay causes
                  severe pain, infections, school absenteeism, and malnutrition. SWDR addresses this by
                  delivering mobile dental services that are flexible, accessible, and reach children with
                  special healthcare needs wherever they are.
                </Typography>
                <Box>
                  <Button onClick={onDonateClick} variant="contained" color="primary" startIcon={<HeartIcon />} sx={{ px: 5, py: 1.6, borderRadius: 2, fontWeight: '900', boxShadow: '0 2px 8px rgba(190, 24, 93,0.3)', '&:hover': { bgcolor: '#9d174d', boxShadow: '0 4px 16px rgba(190, 24, 93,0.4)' } }}>
                    Sponsor a Smile
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <Box 
                component="img"
                src="/images/who_we_are.jpeg"
                alt="Who We Are - Smile with Dr Rome"
                loading="lazy"
                sx={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: 450,
                  objectFit: 'cover',
                  borderRadius: 2,
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                  display: 'block'
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ── MISSION & VISION ────────────────────────────────────────────────── */}
      <Box sx={{ borderBottom: '1px solid #e2e8f0' }}>
        <Container maxWidth="xl" disableGutters>
          <Grid container>
            <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
              <Box 
                sx={{ 
                  p: { xs: 5, md: 7 }, 
                  borderRight: { sm: '1px solid #e2e8f0' }, 
                  borderBottom: { xs: '1px solid #e2e8f0', sm: 'none' }, 
                  backgroundImage: 'linear-gradient(180deg, rgba(251, 207, 232, 0.97) 0%, rgba(251, 207, 232, 0.97) 100%), url("/favicon.png")',
                  backgroundRepeat: 'no-repeat, repeat',
                  backgroundSize: 'auto, 120px 120px',
                  backgroundAttachment: 'scroll, fixed',
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  width: '100%', 
                  height: '100%', 
                  flexGrow: 1 
                }}
              >
                <Box sx={{ display: 'inline-flex', alignItems: 'center', border: '1px solid #fce7f3', boxShadow: '0 2px 8px rgba(190, 24, 93,0.2)', px: 3, py: 1, mb: 4, bgcolor: '#be185d', borderRadius: 1 }}>
                  <Typography sx={{ fontWeight: "900", color: '#fff', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.9rem' }}>Our Mission</Typography>
                </Box>
                <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.85, fontSize: '1.025rem', fontWeight: 500, textAlign: 'justify' }}>
                  At Smile with Dr Rome, our mission is to provide comprehensive, compassionate dental
                  care to children with special healthcare needs, especially those in underserved
                  communities. We prioritize oral health promotion and preventive care by empowering
                  children, caregivers, and communities with the knowledge and support needed to
                  maintain healthy smiles and improve quality of life of every child we serve.
                </Typography>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
              <Box 
                sx={{ 
                  p: { xs: 5, md: 7 }, 
                  backgroundImage: 'linear-gradient(180deg, rgba(251, 207, 232, 0.97) 0%, rgba(251, 207, 232, 0.97) 100%), url("/favicon.png")',
                  backgroundRepeat: 'no-repeat, repeat',
                  backgroundSize: 'auto, 120px 120px',
                  backgroundAttachment: 'scroll, fixed',
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  width: '100%', 
                  height: '100%', 
                  flexGrow: 1 
                }}
              >
                <Box sx={{ display: 'inline-flex', alignItems: 'center', border: '1px solid #fce7f3', boxShadow: '0 2px 8px rgba(190, 24, 93,0.2)', px: 3, py: 1, mb: 4, bgcolor: '#be185d', borderRadius: 1 }}>
                  <Typography sx={{ fontWeight: "900", color: '#fff', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.9rem' }}>Our Vision</Typography>
                </Box>
                <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.85, fontSize: '1.025rem', fontWeight: 500, textAlign: 'justify' }}>
                  Our vision is to create a community where every child with special healthcare needs
                  enjoys lifelong oral health, supported by accessible care, prevention, and the knowledge
                  to make informed oral health decisions.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ── OUR CORE VALUES ──────────────────────────────────────────────────── */}
      <Box 
        sx={{ 
          py: { xs: 8, md: 10 }, 
          borderBottom: '1px solid #e2e8f0', 
          backgroundImage: 'linear-gradient(180deg, rgba(248, 250, 252, 0.97) 0%, rgba(248, 250, 252, 0.97) 100%), url("/favicon.png")',
          backgroundRepeat: 'no-repeat, repeat',
          backgroundSize: 'auto, 120px 120px',
          backgroundAttachment: 'scroll, fixed',
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: 7, textAlign: 'center' }}>
            <Typography variant="h3" sx={{ fontWeight: "900", color: '#1e293b', textTransform: 'uppercase', letterSpacing: '-1.5px', fontSize: { xs: '2rem', md: '2.8rem' }, mt: 0.5, mb: 1.5 }}>
              Our Core Values
            </Typography>
            <Box sx={{ width: 56, height: 4, bgcolor: '#be185d', mx: 'auto', borderRadius: 2 }} />
          </Box>

          <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {values.map((v, i) => (
              <Grid size={{ xs: 12, sm: 6 }} key={i}>
                <Box 
                  sx={{ 
                    p: { xs: 4, md: 5 }, 
                    border: BORDER, 
                    boxShadow: SHADOW, 
                    bgcolor: 'white', 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'flex-start',
                    transition: 'all 0.2s ease', 
                    borderRadius: 2, 
                    '&:hover': { 
                      transform: 'translateY(-4px)', 
                      boxShadow: SHADOW_HOVER 
                    } 
                  }}
                >
                  {v.icon}
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontWeight: "900", 
                      color: '#be185d', 
                      textTransform: 'uppercase', 
                      letterSpacing: '-0.5px', 
                      fontSize: '1.25rem',
                      mb: 1.5
                    }}
                  >
                    {v.label}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: '#475569', 
                      lineHeight: 1.7, 
                      fontSize: '0.975rem', 
                      fontWeight: 500, 
                      textAlign: 'left' 
                    }}
                  >
                    {v.body}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── OUR TEAM ────────────────────────────────────────────────────────── */}
      <Box 
        sx={{ 
          py: { xs: 7, md: 9 }, 
          backgroundImage: 'linear-gradient(180deg, rgba(255, 255, 255, 0.975) 0%, rgba(255, 255, 255, 0.975) 100%), url("/favicon.png")',
          backgroundRepeat: 'no-repeat, repeat',
          backgroundSize: 'auto, 120px 120px',
          backgroundAttachment: 'scroll, fixed',
          borderTop: '1px solid #e2e8f0', 
          overflow: 'hidden' 
        }}
      >
        <Container maxWidth="xl" sx={{ px: 0 }}>
          <Box sx={{ mb: 10, textAlign: 'center', px: 2 }}>
            <Typography variant="h3" sx={{ fontWeight: "900", color: '#1e293b', textTransform: 'uppercase', letterSpacing: '-1.5px', fontSize: { xs: '2rem', md: '2.8rem' }, mb: 1.5 }}>
              The Compassionate Experts
            </Typography>
            <Box sx={{ width: 56, height: 4, bgcolor: '#be185d', mx: 'auto', borderRadius: 2 }} />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {team.map((member, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <Box key={idx} sx={{ width: { xs: '95%', md: '75%' }, minHeight: { md: '25vh' }, alignSelf: isEven ? 'flex-start' : 'flex-end', display: 'flex', flexDirection: { xs: 'column', md: isEven ? 'row' : 'row-reverse' }, border: BORDER, borderRadius: 2, boxShadow: SHADOW, bgcolor: 'white', transition: 'all 0.2s ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: SHADOW_HOVER } }}>
                  <Box sx={{ width: { xs: '100%', md: '70%' }, p: { xs: 4, md: 6 }, display: 'flex', flexDirection: 'column', justifyContent: 'center', bgcolor: isEven ? 'rgba(255, 255, 255, 0.9)' : 'rgba(248, 250, 252, 0.9)' }}>
                    <Typography variant="h5" sx={{ fontWeight: "900", color: '#1e293b', textTransform: 'uppercase', letterSpacing: '-0.5px', mb: 1 }}>{member.name}</Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: "800", color: '#be185d', textTransform: 'uppercase', letterSpacing: '1.5px', mb: 3, fontSize: '0.85rem' }}>
                      {member.role} — <Box component="span" sx={{ color: '#64748b', fontWeight: 600 }}>{member.tag}</Box>
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.8, textAlign: 'justify', fontSize: '1rem', fontWeight: 500, mb: 4, whiteSpace: 'pre-line' }}>{member.desc}</Typography>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                      {member.socials.linkedin && member.socials.linkedin !== '#' && (
                        <Box component="a" href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 42, height: 42, bgcolor: 'white', border: '1px solid #e2e8f0', borderRadius: 1, boxShadow: '0 1px 4px rgba(0,0,0,0.06)', color: '#1e293b', transition: 'all 0.15s ease', '&:hover': { boxShadow: '0 4px 12px rgba(190, 24, 93,0.2)', color: '#be185d', borderColor: '#be185d' } }}>
                          <LinkedInIcon sx={{ fontSize: 20 }} />
                        </Box>
                      )}
                      {member.socials.instagram && member.socials.instagram !== '#' && (
                        <Box component="a" href={member.socials.instagram} target="_blank" rel="noopener noreferrer" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 42, height: 42, bgcolor: 'white', border: '1px solid #e2e8f0', borderRadius: 1, boxShadow: '0 1px 4px rgba(0,0,0,0.06)', color: '#1e293b', transition: 'all 0.15s ease', '&:hover': { boxShadow: '0 4px 12px rgba(190, 24, 93,0.2)', color: '#be185d', borderColor: '#be185d' } }}>
                          <InstagramIcon sx={{ fontSize: 20 }} />
                        </Box>
                      )}
                      {member.socials.twitter && member.socials.twitter !== '#' && (
                        <Box component="a" href={member.socials.twitter} target="_blank" rel="noopener noreferrer" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 42, height: 42, bgcolor: 'white', border: '1px solid #e2e8f0', borderRadius: 1, boxShadow: '0 1px 4px rgba(0,0,0,0.06)', color: '#1e293b', transition: 'all 0.15s ease', '&:hover': { boxShadow: '0 4px 12px rgba(190, 24, 93,0.2)', color: '#be185d', borderColor: '#be185d' } }}>
                          <TwitterIcon sx={{ fontSize: 20 }} />
                        </Box>
                      )}
                    </Box>
                  </Box>
                  <Box sx={{ width: { xs: '100%', md: '30%' }, borderLeft: { md: isEven ? BORDER : 'none' }, borderRight: { md: isEven ? 'none' : BORDER }, borderTop: { xs: BORDER, md: 'none' }, overflow: 'hidden', position: 'relative', minHeight: { xs: 300, md: 'auto' }, borderRadius: { xs: '0 0 8px 8px', md: 0 } }}>
                    <Box component="img" src={member.image} alt={member.name} loading="lazy" sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Container>
      </Box>

      {/* ── SUPPORT OUR MISSION CTA ─────────────────────────────────────────── */}
      <Box 
        sx={{ 
          pt: { xs: 6, md: 7.5 }, 
          pb: { xs: 4, md: 5 }, 
          backgroundImage: 'linear-gradient(180deg, rgba(253, 242, 248, 0.97) 0%, rgba(253, 242, 248, 0.97) 100%), url("/favicon.png")',
          backgroundRepeat: 'no-repeat, repeat',
          backgroundSize: 'auto, 120px 120px',
          backgroundAttachment: 'scroll, fixed',
          borderTop: '1px solid #fce7f3', 
          borderBottom: '1px solid #fce7f3',
          width: '100%',
        }}
      >
        <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          {/* Title */}
          <Typography
            variant="h3"
            sx={{
              fontWeight: '900',
              color: '#1e293b',
              fontSize: { xs: '1.6rem', md: '2.2rem' },
              textTransform: 'uppercase',
              letterSpacing: '-1.5px',
              lineHeight: 1.1,
              mb: 1.5,
            }}
          >
            Support Our Mission
          </Typography>

          {/* Subtitle */}
          <Typography
            sx={{
              fontSize: '1.025rem',
              color: '#475569',
              fontWeight: 500,
              lineHeight: 1.55,
              maxWidth: '720px',
              mb: 2.5,
            }}
          >
            Every donation goes directly to clinical supplies, surgical materials, and charity — no overhead, no middlemen. Join us in bringing smiles to East Africa.
          </Typography>

          {/* Trust Badges - Row */}
          <Box sx={{ display: 'flex', gap: { xs: 3, sm: 5 }, justifyContent: 'center', flexWrap: 'wrap', mb: 3.5 }}>
            {[
              { label: '✓ 100% Direct Impact', desc: 'Zero administrative cuts' },
              { label: '✓ Transparent Operations', desc: 'Direct supply funding' },
              { label: '✓ Secure Checkout', desc: 'Encrypted via Selcom Gateway' },
            ].map((badge, index) => (
              <Box key={index} sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontWeight: '900', color: '#be185d', textTransform: 'uppercase', display: 'block', fontSize: { xs: '0.85rem', sm: '0.95rem' }, letterSpacing: '0.5px' }}>
                  {badge.label}
                </Typography>
                <Typography color="text.secondary" sx={{ fontWeight: '600', fontSize: { xs: '0.75rem', sm: '0.825rem' }, display: 'block' }}>
                  {badge.desc}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Button at the bottom */}
          <Box>
            <Button
              variant="contained"
              onClick={onDonateClick}
              startIcon={<HeartIcon />}
              sx={{
                px: 6,
                py: 1.6,
                borderRadius: 2,
                fontWeight: '900',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontSize: '0.95rem',
                bgcolor: '#be185d',
                color: 'white',
                boxShadow: '0 4px 16px rgba(190, 24, 93,0.35)',
                transition: 'all 0.2s ease',
                width: { xs: '100%', sm: 'auto' },
                '&:hover': {
                  bgcolor: '#9d174d',
                  boxShadow: '0 8px 24px rgba(190, 24, 93,0.45)',
                },
              }}
            >
              Donate Now
            </Button>
          </Box>
        </Container>
      </Box>

    </Box>
  );
}
