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
    <Box sx={{ pt: 1, pb: 10, bgcolor: 'white', borderBottom: '1px solid #e2e8f0' }}>
      <Container maxWidth="md">
        {/* CTA Container */}
        <Box
          sx={{
            border: '3px solid #1e293b',
            boxShadow: '8px 8px 0px #1e293b',
            p: { xs: 2.5, md: 4 },
            textAlign: 'center',
            bgcolor: 'white',
          }}
        >
          {/* Headline */}
          <Typography
            variant="h2"
            sx={{
              fontWeight: '900',
              color: '#1e293b',
              fontSize: { xs: '2.4rem', md: '3.6rem' },
              textTransform: 'uppercase',
              letterSpacing: '-2px',
              lineHeight: 1.1,
              mb: 3,
            }}
          >
            Support Our Mission
          </Typography>

          {/* Divider bar */}
          <Box sx={{ width: 64, height: 5, bgcolor: '#0284c7', border: '2px solid #1e293b', mx: 'auto', mb: 3 }} />

          {/* Supporting text */}
          <Typography
            sx={{
              fontSize: '1.2rem',
              color: '#475569',
              fontWeight: 500,
              lineHeight: 1.85,
              maxWidth: '540px',
              mx: 'auto',
              mb: 5,
            }}
          >
            Every donation goes directly to clinical supplies, surgical materials, and charity — no overhead, no middlemen.
          </Typography>

          {/* CTA Button */}
          <Button
            variant="contained"
            onClick={onDonateClick}
            startIcon={<FavoriteIcon />}
            sx={{
              px: 6,
              py: 2,
              borderRadius: 0,
              fontWeight: '900',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontSize: '1rem',
              boxShadow: '6px 6px 0px #1e293b',
              border: '3px solid #1e293b',
              bgcolor: '#0284c7',
              color: 'white',
              transition: 'all 0.15s ease',
              '&:hover': {
                bgcolor: '#0369a1',
                transform: 'translate(-3px, -3px)',
                boxShadow: '9px 9px 0px #1e293b',
              },
              '&:active': {
                transform: 'translate(2px, 2px)',
                boxShadow: '3px 3px 0px #1e293b',
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
