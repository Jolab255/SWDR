import { Box, Container, Typography } from '@mui/material';
import ContentManager from '../components/ContentManager';

export default function CMSDashboard() {
  const BORDER = '3px solid #1e293b';
  const SHADOW = '10px 10px 0px #1e293b';

  return (
    <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: '#fdf2f8', minHeight: '90vh' }}>
      <Container maxWidth="xl">
        
        {/* Dashboard Header */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Box 
            sx={{ 
              display: 'inline-flex', 
              bgcolor: 'white', 
              border: BORDER, 
              boxShadow: '4px 4px 0px #1e293b',
              px: 3, py: 1, 
              mb: 2 
            }}
          >
            <Typography variant="overline" sx={{ fontWeight: '900', color: '#be185d', letterSpacing: '2px' }}>
              Administrative Command Center
            </Typography>
          </Box>
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: '900', 
              color: '#1e293b', 
              textTransform: 'uppercase', 
              letterSpacing: '-2px',
              fontSize: { xs: '2.5rem', md: '3.5rem' }
            }}
          >
            CMS <Box component="span" sx={{ color: '#be185d' }}>Dashboard</Box>
          </Typography>
          <Box sx={{ width: 80, height: 6, bgcolor: '#be185d', border: BORDER, mx: 'auto', mt: 2 }} />
        </Box>

        {/* Content Manager Container */}
        <Box
          sx={{
            bgcolor: 'white',
            border: BORDER,
            boxShadow: SHADOW,
            p: { xs: 2, md: 4 },
            minHeight: '60vh'
          }}
        >
          <ContentManager />
        </Box>
      </Container>
    </Box>
  );
}
