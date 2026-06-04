import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface CollaboratorsProps {
  onDonateClick: () => void;
}

const BORDER = '1px solid #e2e8f0';
const SHADOW = '0 4px 20px rgba(0,0,0,0.06)';

export default function Collaborators({ onDonateClick }: CollaboratorsProps) {
  const partners = [
    {
      name: 'Dorcas Homecare Initiatives',
      tagline: 'Cerebral Palsy Care & Rehabilitation Center',
      image: '/images/swdr_happy_children.png',
      location: 'Madale, Wazo — Dar es Salaam, Tanzania',
      founded: 'Established: Jan 2025',
      author: 'Founded by Rehema Simfukwe',
      mission: 'Dorcas Homecare Initiative provides specialized care, physical therapies, and essential adaptive equipment (including wheelchairs and standing frames) to Tanzanian children living with cerebral palsy. The center acts as a safe sanctuary for development while actively educating communities to eliminate the deep-rooted social stigma surrounding childhood neurological conditions.',
      collaboration: 'SWDR collaborates closely with Dorcas Homecare to integrate clinical oral health into their therapy schedules. Children with neurological motor difficulties face severe dental health challenges due to restricted chewing muscles and cleaning limitations. We conduct regular, direct on-site specialized dental cleanings, screening campaigns, and caregiver oral hygiene training.',
      ctaText: 'Visit Center Profile',
      link: 'https://dorcashomecareinitiative.or.tz'
    },
    {
      name: 'Serunt Nutrition',
      tagline: 'Clinical Medical Nutrition & Lifestyle Therapy',
      image: '/images/hygiene_campaign.png',
      location: 'Dar es Salaam, Tanzania',
      founded: 'Medical Nutrition Center',
      author: 'Clinical Dietitian Network',
      mission: 'Serunt Nutrition is an established medical nutrition organization in Tanzania. They focus on preventing and managing chronic non-communicable diseases (such as juvenile diabetes, childhood obesity, and severe dental caries) by designing evidence-based nutrition guides, school health plans, and localized dietary education programs.',
      collaboration: 'Our collaboration with Serunt Nutrition targets the dietary roots of early childhood tooth decay in rural and coastal communities. By combining dental camps with professional nutritional coaching, we distribute specialized hygiene kits alongside nutrition counseling. This dual-focus program teaches families how to build healthy, low-sugar diets to protect children\'s teeth.',
      ctaText: 'Visit Nutrition Portal',
      link: 'http://www.seruntnutrition.co.tz'
    },
    {
      name: 'FOFR ME Foundation',
      tagline: 'Grassroots Community Health Mobilization',
      image: '/images/mobile_clinic.png',
      location: 'Coastal & Pwani Districts, Tanzania',
      founded: 'Outreach Operations Partner',
      author: 'Community Liaison Team',
      mission: 'FOFR ME Foundation operates as a grassroots health advocacy network across coastal regions of Tanzania. They map communities lacking basic medical services, organize rural healthcare camps, coordinate volunteer medical teams, and manage ground logistics with local authorities to ensure safe, legal, and high-impact operations.',
      collaboration: 'FOFR ME Foundation serves as our lead operational coordinator for mobile dental clinics in underserved regions. Their field officers handle community entry, schedule outreach camps with ward offices, and manage local logistics. This allows our clinical team to immediately set up mobile chairs and begin treating children upon arrival.',
      ctaText: 'Inquire Partnership',
      link: '#'
    }
  ];

  return (
    <Box sx={{ bgcolor: '#ffffff', overflow: 'hidden' }}>
      
      {/* HEADER HERO SECTION */}
      <Box 
        sx={{ 
          pt: { xs: 4, md: 5.5 }, 
          pb: { xs: 3, md: 4 }, 
          bgcolor: '#f0f9ff', 
          borderBottom: '1px solid #bae6fd',
          textAlign: 'center'
        }}
      >
        <Container maxWidth="lg">
          <Box 
            sx={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: 1.5, 
              mb: 2, 
              bgcolor: '#ffffff',
              color: '#1b4f93',
              px: 2.5,
              py: 0.8,
              borderRadius: 2,
              border: '1px solid #bae6fd',
              boxShadow: '0 2px 6px rgba(27, 79, 147, 0.08)',
              fontWeight: '900',
              textTransform: 'uppercase',
              fontSize: '0.8rem',
              letterSpacing: '1px'
            }}
          >
            Synergy in Action
          </Box>
          <Typography 
            variant="h1" 
            sx={{ 
              fontWeight: '900',
              color: '#1e293b', 
              fontSize: { xs: '2rem', sm: '3rem', md: '3.4rem' },
              textTransform: 'uppercase',
              letterSpacing: '-1.5px',
              lineHeight: 1.15,
              mb: 2
            }}
          >
            OUR COLLABORATORS
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#475569', 
              fontSize: '1.1rem', 
              lineHeight: 1.6, 
              maxWidth: 700, 
              mx: 'auto',
              fontWeight: 500
            }}
          >
            Restoring children's smiles requires a holistic approach. We partner with local Tanzanian foundations, clinics, and advocacy groups to integrate dental care, nutrition, and special needs therapy.
          </Typography>
          <Box sx={{ width: 64, height: 4, bgcolor: '#1b4f93', mx: 'auto', mt: 3, borderRadius: 2 }} />
        </Container>
      </Box>

      {/* PARTNERS CONTENT SECTION */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Grid container spacing={6}>
          {partners.map((partner, index) => (
            <Grid item xs={12} key={index}>
              <Card 
                elevation={0}
                sx={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  border: BORDER,
                  boxShadow: SHADOW,
                  borderRadius: 3,
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                    borderColor: '#1b4f93'
                  }
                }}
              >
                {/* Image Banner */}
                <CardMedia
                  component="img"
                  image={partner.image}
                  alt={partner.name}
                  sx={{ 
                    width: '100%',
                    height: { xs: 200, sm: 280, md: 360 },
                    objectFit: 'cover'
                  }}
                />

                {/* Content Details (Redesigned into structured columns) */}
                <CardContent sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
                  
                  {/* Top Meta Header */}
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2, mb: 3 }}>
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: '900', color: '#1e293b', fontSize: { xs: '1.5rem', sm: '1.8rem' }, mb: 0.5 }}>
                        {partner.name}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ color: '#475569', fontWeight: 600, fontStyle: 'italic', fontSize: '0.95rem' }}>
                        {partner.tagline}
                      </Typography>
                    </Box>
                    
                    {/* Meta Tags */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.2 }}>
                      <Box sx={{ px: 1.8, py: 0.6, bgcolor: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: 1.5 }}>
                        <Typography variant="caption" sx={{ fontWeight: '800', color: '#475569', textTransform: 'uppercase', fontSize: '0.72rem', tracking: '0.5px' }}>
                          Location: {partner.location}
                        </Typography>
                      </Box>
                      <Box sx={{ px: 1.8, py: 0.6, bgcolor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 1.5 }}>
                        <Typography variant="caption" sx={{ fontWeight: '800', color: '#166534', textTransform: 'uppercase', fontSize: '0.72rem', tracking: '0.5px' }}>
                          {partner.founded}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* Clean Description Columns */}
                  <Grid container spacing={4} sx={{ mb: 4 }}>
                    {/* Column 1: Core Mission (Left) */}
                    <Grid item xs={12} md={6}>
                      <Box sx={{ pr: { md: 2 } }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: '900', color: '#1e293b', textTransform: 'uppercase', mb: 1.5, letterSpacing: '0.5px', fontSize: '0.8rem' }}>
                          Core Mission & Focus
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.7, fontSize: '0.92rem', textAlign: 'justify' }}>
                          {partner.mission}
                        </Typography>
                      </Box>
                    </Grid>

                    {/* Column 2: Collaboration Highlight (Right Side Container) */}
                    <Grid item xs={12} md={6}>
                      <Box 
                        sx={{ 
                          p: 3, 
                          bgcolor: '#f0f9ff', 
                          borderLeft: '4px solid #1b4f93', 
                          borderRadius: '0 8px 8px 0',
                          height: '100%',
                          boxShadow: '0 2px 8px rgba(27,79,147,0.03)'
                        }}
                      >
                        <Typography variant="subtitle2" sx={{ fontWeight: '900', color: '#1b4f93', textTransform: 'uppercase', mb: 1.5, letterSpacing: '0.5px', fontSize: '0.8rem' }}>
                          Joint SWDR Partnership Impact
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.6, fontSize: '0.92rem', textAlign: 'justify' }}>
                          {partner.collaboration}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  {/* CTA Buttons */}
                  {partner.link !== '#' && (
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        href={partner.link}
                        target="_blank"
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                          borderRadius: 2,
                          fontWeight: '800',
                          textTransform: 'none',
                          border: '1.5px solid',
                          px: 3.5,
                          py: 1.2,
                          fontSize: '0.88rem',
                          '&:hover': {
                            border: '1.5px solid',
                            bgcolor: '#f0f9ff'
                          }
                        }}
                      >
                        {partner.ctaText}
                      </Button>
                    </Box>
                  )}

                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* SUPPORT OUR MISSION CTA */}
      <Box 
        sx={{ 
          pt: { xs: 5, md: 6 }, 
          pb: { xs: 4, md: 5 }, 
          bgcolor: '#f0f9ff', 
          borderTop: '1px solid #bae6fd', 
          borderBottom: '1px solid #bae6fd',
          width: '100%',
        }}
      >
        <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: '900',
              color: '#1e293b',
              fontSize: { xs: '1.5rem', md: '2rem' },
              textTransform: 'uppercase',
              letterSpacing: '-1px',
              lineHeight: 1.1,
              mb: 1.5,
            }}
          >
            Support Our Collective Efforts
          </Typography>

          <Typography
            sx={{
              fontSize: '1rem',
              color: '#475569',
              fontWeight: 500,
              lineHeight: 1.5,
              maxWidth: '720px',
              mb: 3,
            }}
          >
            Every single donation directly funds treatments, nutritional supplements, and clinical outreach materials used in coordination with our partners.
          </Typography>

          <Box>
            <Button
              variant="contained"
              onClick={onDonateClick}
              startIcon={<FavoriteIcon />}
              sx={{
                px: 5,
                py: 1.4,
                borderRadius: 2,
                fontWeight: '900',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontSize: '0.9rem',
                bgcolor: '#1b4f93',
                color: 'white',
                boxShadow: '0 4px 16px rgba(27, 79, 147, 0.3)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: '#113a70',
                  boxShadow: '0 8px 24px rgba(27, 79, 147, 0.45)',
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
