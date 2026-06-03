import {
  Box,
  Container,
  Typography,
} from '@mui/material';

export default function Programs() {
  return (
    <Box sx={{ py: 10, bgcolor: 'white', borderTop: '4px solid #1e293b' }}>
      <Container maxWidth="xl">
        <Box sx={{ maxWidth: { xs: '100%', md: '60%' }, mx: 'auto', textAlign: 'center' }}>
          {/* Section Header */}
          <Box sx={{ mb: 6 }}>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: '900',
                color: '#1e293b', 
                fontSize: { xs: '2.2rem', md: '2.8rem' },
                textTransform: 'uppercase',
                letterSpacing: '-1px',
                mb: 2,
                textAlign: 'center'
              }}
            >
              What We Do
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                fontSize: '1.175rem', 
                lineHeight: 1.85, 
                textAlign: 'center',
                fontStyle: 'italic',
                color: '#64748b',
                fontWeight: 400,
                letterSpacing: '0.01em',
                mt: 1
              }}
            >
              Smile with Doctor Rome Clinic delivers professional dental services and reconstructive oral surgery through four core humanitarian programs.
            </Typography>
          </Box>

          {/* Programs Stack */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4.5 }}>
            
            {/* Program 1: Mobile Clinics */}
            <Box>
              <Typography variant="h5" sx={{ fontWeight: '900', color: '#1e293b', mb: 1, fontSize: '1.4rem', textAlign: 'left' }}>
                Mobile Clinics
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.025rem', lineHeight: 1.7, color: '#475569', fontWeight: '500', textAlign: 'justify' }}>
                We deploy equipped mobile units to remote rural villages where dental services are non-existent, performing critical emergency checkups and relief extractions for school pupils.
              </Typography>
            </Box>

            {/* Program 2: Restorative Surgery */}
            <Box>
              <Typography variant="h5" sx={{ fontWeight: '900', color: '#1e293b', mb: 1, fontSize: '1.4rem', textAlign: 'left' }}>
                Restorative Surgery
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.025rem', lineHeight: 1.7, color: '#475569', fontWeight: '500', textAlign: 'justify' }}>
                At our permanent center in Dar es Salaam, we provide advanced endodontic treatment, dental restoration, and emergency oral surgeries to children referred from our rural mobile campaigns.
              </Typography>
            </Box>

            {/* Program 3: Hygiene Campaigns */}
            <Box>
              <Typography variant="h5" sx={{ fontWeight: '900', color: '#1e293b', mb: 1, fontSize: '1.4rem', textAlign: 'left' }}>
                Hygiene Campaigns
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.025rem', lineHeight: 1.7, color: '#475569', fontWeight: '500', textAlign: 'justify' }}>
                We host dynamic preventative hygiene checkups and educational workshops in primary schools, distributing dental health kits (toothbrushes and pastes) to foster lasting positive habits.
              </Typography>
            </Box>

            {/* Program 4: Surgical Camps */}
            <Box>
              <Typography variant="h5" sx={{ fontWeight: '900', color: '#1e293b', mb: 1, fontSize: '1.4rem', textAlign: 'left' }}>
                Surgical Camps
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.025rem', lineHeight: 1.7, color: '#475569', fontWeight: '500', textAlign: 'justify' }}>
                We coordinate cleft lip and palate reconstruction camps, collaborating with local municipal hospitals to execute complex pediatric oral and maxillofacial surgeries completely free of charge.
              </Typography>
            </Box>

          </Box>
        </Box>
      </Container>
    </Box>
  );
}
