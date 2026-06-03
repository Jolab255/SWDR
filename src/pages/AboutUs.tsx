import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useState, useEffect } from 'react';
import type { TeamMember } from '../utils/mockData';
import { getStoredTeam } from '../utils/mockData';

interface AboutUsProps {
  onDonateClick: () => void;
}

// ─── Shared neo-brutalism token ───────────────────────────────────────────────
const BORDER = '3px solid #1e293b';
const SHADOW = '6px 6px 0px #1e293b';
const SHADOW_HOVER = '9px 9px 0px #0284c7';

export default function AboutUs({ onDonateClick }: AboutUsProps) {
  const [team, setTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    // Only fetch if data is available to avoid hydration/render loops
    const storedTeam = getStoredTeam();
    if (storedTeam.length > 0) {
      setTeam(storedTeam);
    }
  }, []);

  const values = [
    { label: 'Compassion', body: 'Every child deserves dignity, pain relief, and a healthy smile — regardless of where they were born.' },
    { label: 'Transparency', body: '100% of donor funds flow directly to clinical materials, travel, and surgical supplies. Zero overhead waste.' },
    { label: 'Excellence', body: 'We uphold the highest clinical standards whether we are in Dar es Salaam or a remote Morogoro village.' },
    { label: 'Community', body: 'We partner with local schools, ward offices, and volunteer networks to build lasting oral health culture.' },
  ];

  return (
    <Box sx={{ bgcolor: '#ffffff', overflow: 'hidden' }}>
      
      {/* ── HERO / INTRO ────────────────────────────────────────────────────── */}
      <Box sx={{ pt: { xs: 6, md: 7 }, pb: { xs: 4, md: 5 }, bgcolor: '#f0f9ff', borderBottom: BORDER }}>
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
              Who <Box component="span" sx={{ color: '#0284c7' }}>We Are</Box>
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* ── PROFILE STATEMENT ───────────────────────────────────────────────── */}
      <Box sx={{ py: { xs: 4, md: 6 }, borderBottom: BORDER, bgcolor: '#f8fafc' }}>
        <Container maxWidth="md">
          <Box sx={{ border: BORDER, boxShadow: SHADOW, bgcolor: 'white', p: { xs: 4, md: 7 }, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: '900', color: '#1e293b', textTransform: 'uppercase', letterSpacing: '-1px', mb: 1, fontSize: { xs: '1.6rem', md: '2rem' } }}>
              The Smile Mission
            </Typography>
            <Box sx={{ width: 48, height: 4, bgcolor: '#0284c7', mx: 'auto', mb: 3, border: '1.5px solid #1e293b' }} />
            <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.85, textAlign: 'justify' }}>
              Smile with Doctor Rome Dental Clinic (SWDR) was founded with a singular, radical focus: that professional
              pediatric dental care should never be a luxury. In Tanzania, untreated dental decay often leads to chronic
              facial abscesses, severe pain, school absenteeism, and malnutrition. Today, SWDR is a hybrid social enterprise —
              our city clinic funds core operations while 100% of donations are poured directly into our rural charities
              and free reconstructive surgeries for the most vulnerable.
            </Typography>
            <Box sx={{ mt: 5 }}>
              <Button onClick={onDonateClick} variant="contained" color="primary" startIcon={<FavoriteIcon />} sx={{ px: 4, py: 1.5, borderRadius: 0, fontWeight: '900', boxShadow: '3px 3px 0px #1e293b', border: BORDER, '&:hover': { bgcolor: '#0369a1', transform: 'translate(-2px, -2px)', boxShadow: '5px 5px 0px #1e293b' } }}>
                Sponsor a Smile
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ── MISSION & VISION ────────────────────────────────────────────────── */}
      <Box sx={{ borderBottom: BORDER }}>
        <Container maxWidth="xl" disableGutters>
          <Grid container>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Box sx={{ p: { xs: 5, md: 7 }, borderRight: { sm: BORDER }, borderBottom: { xs: BORDER, sm: 'none' }, bgcolor: '#e0f2fe', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ display: 'inline-flex', alignItems: 'center', border: BORDER, boxShadow: '4px 4px 0px #1e293b', px: 3, py: 1, mb: 4, bgcolor: '#0284c7' }}>
                  <Typography sx={{ fontWeight: "900", color: '#fff', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.9rem' }}>Our Mission</Typography>
                </Box>
                <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.85, fontSize: '1.025rem', fontWeight: 500, textAlign: 'justify' }}>
                  To restore pediatric health, cure chronic infections, and reconstruct congenital dental issues for underprivileged children in Tanzania's hardest environments — by delivering 100% free professional dental treatments, surgeries, and continuous oral hygiene education.
                </Typography>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Box sx={{ p: { xs: 5, md: 7 }, bgcolor: '#e0f2fe', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ display: 'inline-flex', alignItems: 'center', border: BORDER, boxShadow: '4px 4px 0px #1e293b', px: 3, py: 1, mb: 4, bgcolor: '#0284c7' }}>
                  <Typography sx={{ fontWeight: "900", color: '#fff', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.9rem' }}>Our Vision</Typography>
                </Box>
                <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.85, fontSize: '1.025rem', fontWeight: 500, textAlign: 'justify' }}>
                  A healthy, pain-free smile and complete dental wellbeing for every child in East Africa — ensuring they grow up with confidence and without health barriers, regardless of their economic or geographical background.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ── OUR CORE VALUES ──────────────────────────────────────────────────── */}
      <Box sx={{ py: { xs: 8, md: 10 }, borderBottom: BORDER, bgcolor: '#f8fafc' }}>
        <Container maxWidth="xl">
          <Box sx={{ mb: 7, textAlign: 'center' }}>
            <Typography variant="h3" sx={{ fontWeight: "900", color: '#1e293b', textTransform: 'uppercase', letterSpacing: '-1.5px', fontSize: { xs: '2rem', md: '2.8rem' }, mt: 0.5, mb: 1.5 }}>
              Our Core Values
            </Typography>
            <Box sx={{ width: 56, height: 4, bgcolor: '#0284c7', border: '2px solid #1e293b', mx: 'auto' }} />
          </Box>

          <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {values.map((v, i) => (
              <Grid size={{ xs: 12, sm: 6 }} key={i}>
                <Box sx={{ p: { xs: 4, md: 5 }, border: BORDER, boxShadow: SHADOW, bgcolor: 'white', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'all 0.15s ease', '&:hover': { transform: 'translate(-3px,-3px)', boxShadow: SHADOW_HOVER, borderColor: '#0284c7' } }}>
                  <Box sx={{ display: 'inline-flex', alignItems: 'center', border: BORDER, boxShadow: '4px 4px 0px #1e293b', px: 3, py: 1, mb: 4, bgcolor: '#0284c7' }}>
                    <Typography sx={{ fontWeight: "900", color: '#fff', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.9rem' }}>{v.label}</Typography>
                  </Box>
                  <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.85, fontSize: '1.025rem', fontWeight: 500, textAlign: 'justify' }}>{v.body}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── OUR TEAM ────────────────────────────────────────────────────────── */}
      <Box sx={{ py: { xs: 7, md: 9 }, bgcolor: 'white', borderTop: BORDER, overflow: 'hidden' }}>
        <Container maxWidth="xl" sx={{ px: 0 }}>
          <Box sx={{ mb: 10, textAlign: 'center', px: 2 }}>
            <Typography variant="h3" sx={{ fontWeight: "900", color: '#1e293b', textTransform: 'uppercase', letterSpacing: '-1.5px', fontSize: { xs: '2rem', md: '2.8rem' }, mb: 1.5 }}>
              The Compassionate Experts
            </Typography>
            <Box sx={{ width: 56, height: 4, bgcolor: '#0284c7', border: '2px solid #1e293b', mx: 'auto' }} />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {team.map((member, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <Box key={idx} sx={{ width: { xs: '95%', md: '75%' }, minHeight: { md: '25vh' }, alignSelf: isEven ? 'flex-start' : 'flex-end', display: 'flex', flexDirection: { xs: 'column', md: isEven ? 'row' : 'row-reverse' }, border: BORDER, borderLeft: isEven ? 'none' : BORDER, borderRight: isEven ? BORDER : 'none', boxShadow: isEven ? '8px 8px 0px #1e293b' : '-8px 8px 0px #1e293b', bgcolor: 'white', transition: 'all 0.2s ease', '&:hover': { transform: isEven ? 'translate(4px, -4px)' : 'translate(-4px, -4px)', boxShadow: isEven ? '12px 12px 0px #0284c7' : '-12px 12px 0px #0284c7' } }}>
                  <Box sx={{ width: { xs: '100%', md: '70%' }, p: { xs: 4, md: 6 }, display: 'flex', flexDirection: 'column', justifyContent: 'center', bgcolor: isEven ? 'white' : '#f8fafc' }}>
                    <Typography variant="h5" sx={{ fontWeight: "900", color: '#1e293b', textTransform: 'uppercase', letterSpacing: '-0.5px', mb: 1 }}>{member.name}</Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: "800", color: '#0284c7', textTransform: 'uppercase', letterSpacing: '1.5px', mb: 3, fontSize: '0.85rem' }}>
                      {member.role} — <Box component="span" sx={{ color: '#64748b', fontWeight: 600 }}>{member.tag}</Box>
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.8, textAlign: 'justify', fontSize: '1rem', fontWeight: 500, mb: 4 }}>{member.desc}</Typography>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                      <Box component="a" href={member.socials.linkedin} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 42, height: 42, bgcolor: 'white', border: BORDER, boxShadow: '3px 3px 0px #1e293b', color: '#1e293b', transition: 'all 0.1s ease', '&:hover': { transform: 'translate(-2px, -2px)', boxShadow: '5px 5px 0px #0284c7', color: '#0284c7' } }}>
                        <LinkedInIcon sx={{ fontSize: 20 }} />
                      </Box>
                      <Box component="a" href={member.socials.instagram} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 42, height: 42, bgcolor: 'white', border: BORDER, boxShadow: '3px 3px 0px #1e293b', color: '#1e293b', transition: 'all 0.1s ease', '&:hover': { transform: 'translate(-2px, -2px)', boxShadow: '5px 5px 0px #0284c7', color: '#0284c7' } }}>
                        <InstagramIcon sx={{ fontSize: 20 }} />
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ width: { xs: '100%', md: '30%' }, borderLeft: { md: isEven ? BORDER : 'none' }, borderRight: { md: isEven ? 'none' : BORDER }, borderTop: { xs: BORDER, md: 'none' }, overflow: 'hidden', position: 'relative', minHeight: { xs: 300, md: 'auto' } }}>
                    <Box component="img" src={member.image} alt={member.name} loading="lazy" sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Container>
      </Box>

      {/* ── SUPPORT OUR MISSION CTA ─────────────────────────────────────────── */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#f0f9ff', borderTop: BORDER }}>
        <Container maxWidth="md">
          <Box sx={{ border: BORDER, boxShadow: SHADOW, p: { xs: 4, md: 7 }, textAlign: 'center', bgcolor: 'white' }}>
            <Typography variant="h2" sx={{ fontWeight: "900", color: '#1e293b', fontSize: { xs: '2.4rem', md: '3.6rem' }, textTransform: 'uppercase', letterSpacing: '-2px', lineHeight: 1.1, mb: 3 }}>Support Our Mission</Typography>
            <Box sx={{ width: 64, height: 5, bgcolor: '#0284c7', border: '2px solid #1e293b', mx: 'auto', mb: 3 }} />
            <Typography sx={{ fontSize: '1.15rem', color: '#475569', fontWeight: 500, lineHeight: 1.85, maxWidth: '540px', mx: 'auto', mb: 5, textAlign: 'justify' }}>
              Every donation goes directly to clinical supplies, surgical materials, and charity — no overhead, no middlemen. Join us in bringing smiles to East Africa.
            </Typography>
            <Button onClick={onDonateClick} variant="contained" startIcon={<FavoriteIcon />} sx={{ px: 5, py: 2, borderRadius: 0, fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '1.1rem', bgcolor: '#0284c7', color: 'white', border: BORDER, boxShadow: SHADOW, transition: 'all 0.1s ease', '&:hover': { bgcolor: '#0284c7', transform: 'translate(-3px,-3px)', boxShadow: SHADOW_HOVER } }}>
              Donate Now
            </Button>
          </Box>
        </Container>
      </Box>

    </Box>
  );
}
