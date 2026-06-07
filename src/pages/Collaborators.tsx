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
      image: '/images/collaborator_dorcas_group.webp',
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
      image: '/images/hygiene_campaign.webp',
      location: 'Dar es Salaam, Tanzania',
      founded: 'Medical Nutrition Center',
      author: 'Clinical Dietitian Network',
      mission: 'Serunt Nutrition is an established medical nutrition organization in Tanzania. They focus on preventing and managing chronic non-communicable diseases (such as juvenile diabetes, childhood obesity, and severe dental caries) by designing evidence-based nutrition guides, school health plans, and localized dietary education programs.',
      collaboration: 'Our collaboration with Serunt Nutrition targets the dietary roots of early childhood tooth decay in rural and coastal communities. By combining dental camps with professional nutritional coaching, we distribute specialized hygiene kits alongside nutrition counseling. This dual-focus program teaches families how to build healthy, low-sugar diets to protect children\'s teeth.',
      ctaText: 'Visit Nutrition Portal',
      link: 'http://www.seruntnutrition.co.tz'
    },
    {
      name: 'AGENT OF SMILE',
      tagline: 'Tanzanian Youth Oral Hygiene Ambassadors & Advocacy Network',
      image: '/images/event_hygiene_workshop.webp',
      location: 'Tanzania Outreach Hubs',
      founded: 'Established: Feb 2024',
      author: 'Led by Youth Health Advocates',
      mission: 'Agent Of Smile is a community-driven movement focused on spreading daily joy, positivity, and inspiration. As an organization, it has set its eye on the underserved communities - spreading smiles through supportive aids.',
      collaboration: 'SWDR partners with Agent of Smile to deploy student dental hygiene mentors during school outreaches. Their trained youth ambassadors lead fun, interactive teeth-brushing tutorials, coordinate peer-to-peer training sessions, and help manage the distribution of dental care kits. This peer advocacy makes oral hygiene education engaging and highly effective for children.',
      ctaText: 'Connect with Ambassadors',
      link: '#'
    },
    {
      name: 'WALIMWENGU FOUNDATION',
      tagline: 'Holistic Child Welfare, Nutrition & Education Center',
      image: '/images/event_community_seminar.webp',
      location: 'Tanzania',
      founded: 'Established: Nov 2023',
      author: 'Founded by Dr. Grace Walimwengu',
      mission: 'Walimwengu Foundation works to break the cycle of poverty by providing disadvantaged children with healthcare access, micro-nutritional support, and quality primary education resources. The foundation operates community hubs that offer safe study spaces, clean water access, and nutritional porridge programs to combat developmental stunting.',
      collaboration: 'SWDR partners with Walimwengu Foundation to host mobile dental checkup clinics at their community welfare hubs. We perform comprehensive dental screenings, treat painful abscesses, and work together on nutritional assessments. Since diet directly affects tooth decay, we coordinate with their nutritional staff to limit refined sugars in the meals provided to children at the hubs.',
      ctaText: 'Visit Welfare Foundation',
      link: '#'
    },
    {
      name: 'JUST FOR ME FOUNDATION',
      tagline: 'Grassroots Community Health Mobilization',
      image: '/images/mobile_clinic.webp',
      location: 'Coastal & Pwani Districts, Tanzania',
      founded: 'Outreach Operations Partner',
      author: 'Community Liaison Team',
      mission: 'Just For Me Foundation is a dedicated community-driven non-governmental organization that provides holistic, on-the-ground resources for vulnerable groups in Tanzania. They transform lives by delivering essential aid, mentorship, and empowerment programs, uniting volunteers and donors into a powerful network that addresses the root causes of hardship to the most vulnerable groups.',
      collaboration: 'JUST FOR ME FOUNDATION serves as our lead operational coordinator for mobile dental clinics in underserved regions. Their field officers handle community entry, schedule outreach camps with ward offices, and manage local logistics. This allows our clinical team to immediately set up mobile chairs and begin treating children upon arrival.',
      ctaText: 'Inquire Partnership',
      link: '#'
    }
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
      
      {/* HEADER HERO SECTION */}
      <Box 
        sx={{ 
          pt: { xs: 4, md: 5.5 }, 
          pb: { xs: 3, md: 4 }, 
          backgroundImage: 'linear-gradient(180deg, rgba(253, 242, 248, 0.97) 0%, rgba(253, 242, 248, 0.97) 100%), url("/favicon.png")',
          backgroundRepeat: 'no-repeat, repeat',
          backgroundSize: 'auto, 120px 120px',
          backgroundAttachment: 'scroll, fixed',
          borderBottom: '1px solid #fce7f3',
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
              color: '#be185d',
              px: 2.5,
              py: 0.8,
              borderRadius: 2,
              border: '1px solid #fce7f3',
              boxShadow: '0 2px 6px rgba(190, 24, 93, 0.08)',
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
          <Box sx={{ width: 64, height: 4, bgcolor: '#be185d', mx: 'auto', mt: 3, borderRadius: 2 }} />
        </Container>
      </Box>

      {/* PARTNERS CONTENT SECTION */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Grid container spacing={6}>
          {partners.map((partner, index) => (
            <Grid size={{ xs: 12 }} key={index}>
              <Card 
                elevation={0}
                sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', md: index % 2 === 0 ? 'row' : 'row-reverse' },
                  border: BORDER,
                  boxShadow: SHADOW,
                  borderRadius: 3,
                  overflow: 'hidden',
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                    borderColor: '#be185d'
                  }
                }}
              >
                {/* Image Section (Alternating Side-by-Side) */}
                <CardMedia
                  component="img"
                  image={partner.image}
                  alt={partner.name}
                  sx={{ 
                    width: { xs: '100%', md: '45%' },
                    height: { xs: 260, sm: 340, md: 'auto' },
                    minHeight: { md: 450 },
                    objectFit: 'cover'
                  }}
                />

                {/* Content Details */}
                <CardContent sx={{ p: { xs: 3, sm: 4, md: 5 }, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  
                  {/* Title & Tagline */}
                  <Box sx={{ mb: 2.5 }}>
                    <Typography variant="h4" sx={{ fontWeight: '900', color: '#1e293b', fontSize: { xs: '1.4rem', sm: '1.75rem' }, mb: 0.5 }}>
                      {partner.name}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: '#475569', fontWeight: 600, fontStyle: 'italic', fontSize: '0.95rem' }}>
                      {partner.tagline}
                    </Typography>
                  </Box>

                  {/* Meta Tags (No Emojis, Clean Badges) */}
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.2, mb: 3 }}>
                    <Box sx={{ px: 1.5, py: 0.5, bgcolor: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: 1.5 }}>
                      <Typography variant="caption" sx={{ fontWeight: '800', color: '#475569', textTransform: 'uppercase', fontSize: '0.72rem', letterSpacing: '0.5px' }}>
                        Location: {partner.location}
                      </Typography>
                    </Box>
                    <Box sx={{ px: 1.5, py: 0.5, bgcolor: '#fdf2f8', border: '1px solid #fce7f3', borderRadius: 1.5 }}>
                      <Typography variant="caption" sx={{ fontWeight: '800', color: '#9d174d', textTransform: 'uppercase', fontSize: '0.72rem', letterSpacing: '0.5px' }}>
                        {partner.founded}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Core Mission */}
                  <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.7, mb: 3, fontSize: '0.95rem', textAlign: 'justify' }}>
                    {partner.mission}
                  </Typography>

                  {/* Partnership Highlight Box (No Emojis) */}
                  <Box 
                    sx={{ 
                      p: 3, 
                      bgcolor: 'rgba(253, 242, 248, 0.85)', 
                      borderLeft: '4px solid #be185d', 
                      borderRadius: '0 8px 8px 0',
                      mb: 3,
                      boxShadow: '0 2px 8px rgba(190, 24, 93, 0.02)'
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ fontWeight: '900', color: '#be185d', textTransform: 'uppercase', mb: 1, letterSpacing: '0.5px', fontSize: '0.8rem' }}>
                      Our Collaboration
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.6, fontSize: '0.92rem', textAlign: 'justify' }}>
                      {partner.collaboration}
                    </Typography>
                  </Box>

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
                            bgcolor: '#fdf2f8'
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
                bgcolor: '#be185d',
                color: 'white',
                boxShadow: '0 4px 16px rgba(190, 24, 93, 0.3)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: '#9d174d',
                  boxShadow: '0 8px 24px rgba(190, 24, 93, 0.45)',
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
