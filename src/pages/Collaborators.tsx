import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HandshakeIcon from '@mui/icons-material/Handshake';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import ChildCareIcon from '@mui/icons-material/ChildCare';
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
      tagline: 'Empowering children with Cerebral Palsy & special needs',
      icon: <ChildCareIcon sx={{ fontSize: 32, color: '#1b4f93' }} />,
      image: '/images/swdr_happy_children.png',
      location: 'Madale, Wazo — Dar es Salaam, Tanzania',
      founded: 'Founded by Rehema Simfukwe in January 2025',
      mission: 'Dorcas Homecare Initiative is dedicated to providing specialized therapy, physiotherapy equipment, and essential resources to children living with cerebral palsy and other neurological conditions. The center actively combats the social stigma surrounding physical disabilities in local communities while providing a safe, supportive environment for families.',
      collaboration: 'SWDR collaborates with Dorcas Homecare to integrate specialized oral healthcare into their developmental therapies. Since children with cerebral palsy face unique oral hygiene and muscular coordination challenges, we provide direct on-site dental screenings, specialized treatments, and training for caregivers to ensure healthy smiles alongside motor rehabilitation.',
      ctaText: 'Visit Dorcas Homecare',
      link: 'https://dorcashomecareinitiative.or.tz'
    },
    {
      name: 'Serunt Nutrition',
      tagline: 'Clinical nutrition & preventive lifestyle coaching',
      icon: <HealthAndSafetyIcon sx={{ fontSize: 32, color: '#1b4f93' }} />,
      image: '/images/hygiene_campaign.png',
      location: 'Dar es Salaam, Tanzania',
      founded: 'Medical Nutrition Firm & Wellness Clinic',
      mission: 'Serunt Nutrition is a premier medical nutrition firm focused on enabling individuals and communities to adopt healthier lifestyles. They specialize in clinical nutrition therapy, meal planning, and preventive care programs targeting non-communicable diseases (NCDs) such as diabetes, hypertension, and childhood malnutrition.',
      collaboration: 'SWDR partners with Serunt Nutrition to combine dental health with general nutritional support. Dietary hygiene is a major driver of early childhood cavities and tooth decay. Together, we conduct combined educational workshops at our outreach camps, distributing hygiene kits while teaching rural families about low-sugar, nutrient-dense diets that protect both their bodies and their teeth.',
      ctaText: 'Visit Serunt Nutrition',
      link: 'http://www.seruntnutrition.co.tz'
    },
    {
      name: 'FOFR ME Foundation',
      tagline: 'Grassroots community healthcare & village outreach',
      icon: <HandshakeIcon sx={{ fontSize: 32, color: '#1b4f93' }} />,
      image: '/images/mobile_clinic.png',
      location: 'Dar es Salaam & Coastal Regions, Tanzania',
      founded: 'Grassroots Health Advocacy Partner',
      mission: 'FOFR ME Foundation works at the community level to mobilize volunteer networks, deliver healthcare advocacy, and coordinate medical camps for underprivileged children. They specialize in local community entry, mapping remote villages in need of support, and handling ground logistics for specialized medical teams.',
      collaboration: 'FOFR ME Foundation is our primary ground logistics and mobilization partner for rural outreach campaigns. Their team identifies communities with critical dental care gaps, schedules clinical dates with local ward leaders, and prepares village logistics so that our mobile dental units can set up and treat hundreds of children safely and efficiently.',
      ctaText: 'Contact FOFR ME',
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
            Restoring children's smiles requires a holistic approach. We proudly partner with local Tanzanian foundations, clinics, and advocacy groups to integrate dental care, nutrition, and special needs therapy.
          </Typography>
          <Box sx={{ width: 64, height: 4, bgcolor: '#1b4f93', mx: 'auto', mt: 3, borderRadius: 2 }} />
        </Container>
      </Box>

      {/* PARTNERS CONTENT SECTION */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Grid container spacing={5}>
          {partners.map((partner, index) => (
            <Grid item xs={12} key={index}>
              <Card 
                elevation={0}
                sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', md: index % 2 === 0 ? 'row' : 'row-reverse' },
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
                {/* Image Section */}
                <CardMedia
                  component="img"
                  image={partner.image}
                  alt={partner.name}
                  sx={{ 
                    width: { xs: '100%', md: '45%' },
                    height: { xs: 260, sm: 340, md: 'auto' },
                    minHeight: { md: 420 },
                    objectFit: 'cover'
                  }}
                />

                {/* Content Section */}
                <CardContent sx={{ p: { xs: 3, sm: 4, md: 5 }, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                    {partner.icon}
                    <Typography variant="caption" sx={{ color: '#1b4f93', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {partner.founded}
                    </Typography>
                  </Box>

                  <Typography variant="h4" sx={{ fontWeight: '900', color: '#1e293b', fontSize: { xs: '1.4rem', sm: '1.75rem' }, mb: 0.5 }}>
                    {partner.name}
                  </Typography>

                  <Typography variant="subtitle1" sx={{ color: '#475569', fontWeight: 600, fontStyle: 'italic', mb: 2.5, fontSize: '0.95rem' }}>
                    {partner.tagline}
                  </Typography>

                  <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: '700', fontSize: '0.8rem', mb: 2, display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    📍 Location: {partner.location}
                  </Typography>

                  <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.7, mb: 3, fontSize: '0.95rem' }}>
                    {partner.mission}
                  </Typography>

                  <Divider sx={{ my: 2.5 }} />

                  <Typography variant="subtitle2" sx={{ fontWeight: '900', color: '#1b4f93', mb: 1, textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '0.8rem' }}>
                    🤝 Our Collaboration:
                  </Typography>

                  <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.6, mb: 3.5 }}>
                    {partner.collaboration}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 2 }}>
                    {partner.link !== '#' && (
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
                          '&:hover': {
                            border: '1.5px solid',
                            bgcolor: '#f0f9ff'
                          }
                        }}
                      >
                        {partner.ctaText}
                      </Button>
                    )}
                  </Box>
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
