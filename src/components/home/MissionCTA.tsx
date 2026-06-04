import {
  Box,
  Container,
  Typography,
  Button,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface MissionCTAProps {
  onDonateClick: () => void;
}

export default function MissionCTA({ onDonateClick }: MissionCTAProps) {
  return (
    <Box 
      sx={{ 
        pt: { xs: 6, md: 7.5 }, 
        pb: { xs: 4, md: 5 }, 
        bgcolor: '#f0f9ff', 
        borderTop: '1px solid #bae6fd', 
        borderBottom: '1px solid #bae6fd',
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
          Every donation goes directly to clinical supplies, surgical materials, and charity — no overhead, no middlemen.
        </Typography>

        {/* Trust Badges - Row */}
        <Box sx={{ display: 'flex', gap: { xs: 3, sm: 5 }, justifyContent: 'center', flexWrap: 'wrap', mb: 3.5 }}>
          {[
            { label: '✓ 100% Direct Impact', desc: 'Zero administrative cuts' },
            { label: '✓ Transparent Operations', desc: 'Direct supply funding' },
            { label: '✓ Secure Checkout', desc: 'Encrypted via Selcom Gateway' },
          ].map((badge, index) => (
            <Box key={index} sx={{ textAlign: 'center' }}>
              <Typography sx={{ fontWeight: '900', color: '#1b4f93', textTransform: 'uppercase', display: 'block', fontSize: { xs: '0.85rem', sm: '0.95rem' }, letterSpacing: '0.5px' }}>
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
            startIcon={<FavoriteIcon />}
            sx={{
              px: 6,
              py: 1.6,
              borderRadius: 2,
              fontWeight: '900',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontSize: '0.95rem',
              bgcolor: '#1b4f93',
              color: 'white',
              boxShadow: '0 4px 16px rgba(27, 79, 147,0.35)',
              transition: 'all 0.2s ease',
              width: { xs: '100%', sm: 'auto' },
              '&:hover': {
                bgcolor: '#113a70',
                boxShadow: '0 8px 24px rgba(27, 79, 147,0.45)',
              },
            }}
          >
            Donate Now
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
