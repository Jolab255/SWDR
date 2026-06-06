import {
  Box,
  Container,
  Typography,
  Grid,
} from '@mui/material';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const programs = [
  {
    num: '01',
    title: 'Oral Health Education & Awareness',
    desc: 'We provide tailored education programs to children, caregivers, and communities on proper oral hygiene, prevention of dental diseases, and the importance of regular dental care.',
    icon: <HealthAndSafetyIcon sx={{ fontSize: '1.6rem' }} />,
  },
  {
    num: '02',
    title: 'Dental Screening & Consultation',
    desc: 'We conduct outreach screenings and professional consultations to assess oral health conditions, identify urgent needs, and guide patients toward appropriate care.',
    icon: <MedicalServicesIcon sx={{ fontSize: '1.6rem' }} />,
  },
  {
    num: '03',
    title: 'Free Dental Treatment Services',
    desc: 'We deliver comprehensive, no-cost dental treatments including preventive care, basic restorative procedures, pain management, and referrals for advanced care when needed.',
    icon: <LocalHospitalIcon sx={{ fontSize: '1.6rem' }} />,
  },
  {
    num: '04',
    title: 'Community Outreach & Mobile Dental Services',
    desc: 'We reach underserved and remote populations through mobile clinics and field programs, ensuring access to dental care for vulnerable children who cannot visit health facilities.',
    icon: <DirectionsBusIcon sx={{ fontSize: '1.6rem' }} />,
  },
];

export default function Programs() {
  return (
    <Box 
      sx={{ 
        backgroundImage: 'linear-gradient(180deg, rgba(248, 250, 252, 0.97) 0%, rgba(248, 250, 252, 0.97) 100%), url("/favicon.png")',
        backgroundRepeat: 'no-repeat, repeat',
        backgroundSize: 'auto, 120px 120px',
        backgroundAttachment: 'scroll, fixed',
        borderTop: '1px solid #e2e8f0' 
      }}
    >
      <Container maxWidth="xl" disableGutters>
        <Grid container>

          {/* ── LEFT PANEL: Image with blue overlay ── */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                height: '100%',
                minHeight: { md: '520px' },
                position: 'relative',
                backgroundImage: 'url(/images/swdr_happy_children.webp)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRight: { md: '1px solid #fce7f3' },
                borderBottom: { xs: '1px solid #fce7f3', md: 'none' },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                p: { xs: 6, md: 10 },
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  bgcolor: 'rgba(190, 24, 93, 0.65)', // Softer blue overlay (65% opacity)
                  zIndex: 1,
                }
              }}
            >
              <Box sx={{ position: 'relative', zIndex: 2 }}>
                <Box sx={{
                  display: 'inline-flex', alignItems: 'center',
                  bgcolor: 'white', border: '1px solid #fce7f3',
                  borderRadius: 10, px: 2, py: 0.7, mb: 4, width: 'fit-content',
                }}>
                  <Typography sx={{ fontSize: '0.72rem', fontWeight: '800', color: '#be185d', textTransform: 'uppercase', letterSpacing: '2px' }}>
                    What We Do
                  </Typography>
                </Box>

                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: '900',
                    color: 'white',
                    fontSize: { xs: '2.4rem', md: '3rem' },
                    textTransform: 'uppercase',
                    letterSpacing: '-2px',
                    lineHeight: 1.05,
                    mb: 3,
                  }}
                >
                  Four Core Programs
                </Typography>

                <Box sx={{ width: 48, height: 4, borderRadius: 2, bgcolor: 'white', mb: 4 }} />

                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '1.05rem',
                    lineHeight: 1.85,
                    color: '#fdf2f8',
                    fontWeight: 500,
                    maxWidth: 380,
                  }}
                >
                  Smile With Dr Rome Dental Clinic which delivers mobile professional dental services through four core humanitarian programs.
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* ── RIGHT PANEL: Program list on white ── */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              {programs.map((p, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: 'flex',
                    gap: 3,
                    p: { xs: 4, md: 5 },
                    borderBottom: idx < programs.length - 1 ? '1px solid #fdf2f8' : 'none',
                    bgcolor: 'transparent',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: 'rgba(253, 242, 248, 0.55)',
                      '& .prog-num': { color: '#be185d' },
                      '& .prog-icon-box': { bgcolor: '#be185d', color: 'white' },
                    },
                  }}
                >
                  {/* Number */}
                  <Typography
                    className="prog-num"
                    sx={{
                      fontSize: '3rem',
                      fontWeight: '900',
                      lineHeight: 1,
                      color: '#fce7f3',
                      minWidth: 56,
                      transition: 'color 0.2s',
                      userSelect: 'none',
                    }}
                  >
                    {p.num}
                  </Typography>

                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
                      <Box
                        className="prog-icon-box"
                        sx={{
                          width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center',
                          bgcolor: '#fdf2f8', color: '#be185d', borderRadius: 1.5,
                          border: '1px solid #fce7f3',
                          transition: 'all 0.2s ease',
                          flexShrink: 0,
                        }}
                      >
                        {p.icon}
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: '900', color: '#1e293b', textTransform: 'uppercase', letterSpacing: '-0.3px', fontSize: '1.05rem' }}>
                        {p.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ fontSize: '0.98rem', lineHeight: 1.75, color: '#64748b', fontWeight: 500 }}>
                      {p.desc}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}
