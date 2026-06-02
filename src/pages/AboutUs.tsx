import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Divider,
  Button
} from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SchoolIcon from '@mui/icons-material/School';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface AboutUsProps {
  onDonateClick: () => void;
}

export default function AboutUs({ onDonateClick }: AboutUsProps) {
  const team = [
    {
      name: 'Dr. Jerome Rome, DDS',
      role: 'Founder & Lead Pediatric Dentist',
      desc: 'With over 12 years of clinical experience, Dr. Rome graduated from Muhimbili University of Health and Allied Sciences (MUHAS) and holds a Pediatric Dental Specialization from UCSF. He established SWDR to bridge the gap in rural child dental health.',
      image: '/images/swdr_doctor_rome.png'
    },
    {
      name: 'Dr. Sarah Mrosso, DDS',
      role: 'Outreach Coordinator & Orthodontist',
      desc: 'Dr. Sarah oversees the logistics and clinical execution of all rural outreach camps. Her passion is bringing modern clinical standards out of Dar es Salaam and straight to rural Tanzanian schools.',
      image: '/images/swdr_hero.png' // Utilizing our beautiful outreach setting
    },
    {
      name: 'Sister Neema Lema, RN',
      role: 'Senior Surgical Nurse',
      desc: 'Sister Neema handles child patient coordination, operating room sanitation, and postoperative recovery care. She is renowned for her comforting, warm presence that keeps kids completely calm.',
      image: '/images/swdr_happy_children.png' // Joyful children backup
    }
  ];

  return (
    <Box sx={{ py: 6, bgcolor: '#f8fafc' }}>
      
      {/* HEADER STATEMENT */}
      <Container maxWidth="lg" sx={{ mb: 8, mt: 2 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="caption" 
            sx={{ 
              fontWeight: 'bold', 
              color: 'primary.main', 
              textTransform: 'uppercase', 
              letterSpacing: '1.5px',
              fontSize: '0.8rem' 
            }}
          >
            WHO WE ARE
          </Typography>
          <Typography variant="h3" fontWeight="900" sx={{ color: '#1e293b', mt: 1, letterSpacing: '-1px' }}>
            About Our Charity & Clinic
          </Typography>
          <Divider sx={{ width: 80, mx: 'auto', mt: 2, height: 4, bgcolor: 'primary.main', borderRadius: 0 }} />
        </Box>

        {/* PROFILE STATEMENT */}
        <Paper 
          elevation={0}
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: 0,
            border: '1px solid',
            borderColor: 'grey.200',
            background: 'white',
            boxShadow: '0 4px 20px rgba(0,0,0,0.01)'
          }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box 
                component="img"
                src="/images/swdr_hero.png"
                alt="Clinic outreach"
                sx={{
                  width: '100%',
                  height: 380,
                  objectFit: 'cover',
                  borderRadius: 0,
                  boxShadow: '0 12px 32px rgba(2, 132, 199, 0.12)'
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h5" fontWeight="bold" color="primary.main" gutterBottom>
                Profile Statement
              </Typography>
              <Typography variant="body1" sx={{ color: '#334155', mb: 3, lineHeight: 1.7, fontWeight: 500 }}>
                Smile with Doctor Rome Dental Clinic (SWDR) was established in Dar es Salaam as a leading private pediatric dental center. 
                However, our identity changed when Doctor Rome visited rural communities in Morogoro and saw the devastating state of children's oral hygiene.
              </Typography>
              <Typography variant="body2" sx={{ color: '#475569', mb: 4, lineHeight: 1.7 }}>
                In low-income rural households across East Africa, dental healthcare is practically non-existent. 
                Untreated tooth rot leads to chronic facial abscesses, severe pain, school absenteeism, and malnutrition in growing children. 
                We decided to act. Today, SWDR is a hybrid social enterprise: our city clinic funds core operations, while 100% of donations are poured directly into providing free, high-quality, mobile dental outreach and reconstructive cleft surgeries for children living in severe environmental conditions.
              </Typography>
              
              <Button
                variant="contained"
                onClick={onDonateClick}
                startIcon={<FavoriteIcon />}
                className="pulse-button"
                sx={{ px: 4, py: 1.5, borderRadius: 0, fontWeight: 'bold', textTransform: 'none' }}
              >
                Help Fund Our Outreaches
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {/* MISSION & VISION */}
      <Box sx={{ bgcolor: 'white', py: 10, borderTop: '1px solid', borderBottom: '1px solid', borderColor: 'grey.100' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Paper 
                elevation={0}
                sx={{
                  p: 4.5,
                  borderRadius: 0,
                  height: '100%',
                  background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
                  borderLeft: '6px solid',
                  borderLeftColor: 'success.main'
                }}
              >
                <Typography variant="h5" fontWeight="bold" color="success.main" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  🎯 Our Mission
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mt: 2, lineHeight: 1.7 }}>
                  To restore pediatric health, cure chronic infections, and reconstruct congenital dental issues for underprivileged children in Tanzania's hardest environments, by delivering 100% free professional dental treatments, surgeries, and continuous oral hygiene education.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper 
                elevation={0}
                sx={{
                  p: 4.5,
                  borderRadius: 0,
                  height: '100%',
                  background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                  borderLeft: '6px solid',
                  borderLeftColor: 'primary.main'
                }}
              >
                <Typography variant="h5" fontWeight="bold" color="primary.main" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  👁️ Our Vision
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mt: 2, lineHeight: 1.7 }}>
                  A healthy, pain-free smile and complete dental wellbeing for every child in East Africa, ensuring they grow up with confidence and without health barriers, regardless of their economic or geographical background.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* WHAT WE DO */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="caption" sx={{ fontWeight: 'bold', color: 'primary.main', textTransform: 'uppercase', letterSpacing: '1px' }}>
            ACTIVITIES & PROGRAMS
          </Typography>
          <Typography variant="h4" fontWeight="bold" sx={{ color: '#1e293b', mt: 1 }}>
            What We Do: Core Initiatives
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {[
            {
              icon: <LocalHospitalIcon color="primary" sx={{ fontSize: 32 }} />,
              title: 'Pediatric Restorative Dental Care',
              desc: 'We perform deep hygiene treatments, fillings, cleanups, and pain-free extractions inside our mobile trucks and clinics, removing chronic toothaches that prevent kids from sleeping and eating.'
            },
            {
              icon: <GroupsIcon color="primary" sx={{ fontSize: 32 }} />,
              title: 'Cleft Lip & Reconstructive Surgeries',
              desc: 'For children born with cleft palates or dental traumatic injuries in tough settings, we host surgical camps. Dr. Rome and dental surgical specialists perform completely free reconstructive surgeries.'
            },
            {
              icon: <SchoolIcon color="primary" sx={{ fontSize: 32 }} />,
              title: 'Rural Hygiene School Outreaches',
              desc: 'Our teams load mobile trucks with supplies, driving to deep rural regions. We construct temporary clinic bases inside orphanages, schools, and villages, screening and treating hundreds in days.'
            },
            {
              icon: <AssignmentIcon color="primary" sx={{ fontSize: 32 }} />,
              title: 'Oral Hygiene Kit Distribution',
              desc: 'We purchase and distribute pediatric dental hygiene packs. Each child treated receives a high-quality toothbrush, pediatric fluoride paste, hygiene tracking calendar, and dental health brochures.'
            }
          ].map((item, idx) => (
            <Grid item xs={12} sm={6} key={idx}>
              <Paper 
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 0,
                  bgcolor: 'white',
                  border: '1px solid',
                  borderColor: 'grey.200',
                  height: '100%'
                }}
              >
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <Box sx={{ p: 1.5, bgcolor: '#f0f9ff', borderRadius: 0, display: 'flex' }}>
                    {item.icon}
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {item.desc}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* OUR TEAM */}
      <Box sx={{ bgcolor: 'white', py: 10 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="caption" sx={{ fontWeight: 'bold', color: 'primary.main', textTransform: 'uppercase', letterSpacing: '1px' }}>
              OUR TEAM
            </Typography>
            <Typography variant="h4" fontWeight="bold" sx={{ color: '#1e293b', mt: 1 }}>
              The Compassionate Experts
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Meet the licensed dentists, nursing professionals, and logistics drivers that make these outreaches possible.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {team.map((member, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Card 
                  sx={{ 
                    borderRadius: 0, 
                    border: '1px solid', 
                    borderColor: 'grey.200', 
                    boxShadow: 'none',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <CardMedia
                    component="img"
                    height="280"
                    image={member.image}
                    alt={member.name}
                    sx={{ objectPosition: 'center top' }}
                  />
                  <CardContent sx={{ p: 3, flexGrow: 1 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {member.name}
                    </Typography>
                    <Typography variant="caption" color="primary.main" fontWeight="bold" display="block" sx={{ mb: 2 }}>
                      {member.role}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {member.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

    </Box>
  );
}
