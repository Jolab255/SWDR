import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
} from '@mui/material';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import GroupsIcon from '@mui/icons-material/Groups';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { useNavigate } from 'react-router-dom';

interface MovementProps {
  onDonateClick: () => void;
}

export default function Movement({ onDonateClick }: MovementProps) {
  const navigate = useNavigate();
  
  const actions = [
    {
      title: 'Sponsor a Charity',
      desc: 'Support the complete clinical costs of one rural mobile camp. Your funds go directly to purchasing dental materials, truck fuel, and medical supplies.',
      actionText: 'Sponsor a Camp Now',
      action: onDonateClick,
      icon: <VolunteerActivismIcon />
    },
    {
      title: 'Volunteer Your Skills',
      desc: 'Are you a licensed dentist, hygienist, or nurse? Register to join our mobile team on our upcoming rural charity sessions across East Africa.',
      actionText: 'Join the Medical Team',
      action: () => navigate('/'),
      icon: <GroupsIcon />
    },
    {
      title: 'Donate Dental Equipment',
      desc: 'We are always in need of examination chairs, pediatric dental tools, and consumable supplies. Help us equip our mobile units with the best tools.',
      actionText: 'Equipment Donation',
      action: () => navigate('/contact'),
      icon: <LocalHospitalIcon />
    }
  ];

  return (
    <Box
      sx={{
        py: { xs: 6, md: 8 },
        backgroundImage: 'linear-gradient(180deg, rgba(253, 242, 248, 0.97) 0%, rgba(253, 242, 248, 0.97) 100%), url("/favicon.png")',
        backgroundRepeat: 'no-repeat, repeat',
        backgroundSize: 'auto, 120px 120px',
        backgroundAttachment: 'scroll, fixed',
        borderTop: '1px solid #fce7f3',
        borderBottom: '1px solid #fce7f3',
      }}
    >
      <Container maxWidth="xl">
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h3" sx={{ fontWeight: '900', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 3, textTransform: 'uppercase', letterSpacing: '-1.5px', fontSize: { xs: '2rem', md: '2.8rem' } }}>
          Be Part of the Movement
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 800, mx: 'auto', fontWeight: 500, color: '#475569', lineHeight: 1.85, fontSize: '1.1rem' }}>
          Smile with Doctor Rome is more than a clinic; it's a collective mission to restore oral health to the most vulnerable. Join us in making dental pain a thing of the past for African children.
        </Typography>
        <Box sx={{ width: 64, height: 5, bgcolor: '#be185d', mx: 'auto', mt: 3, borderRadius: 2 }} />
      </Box>

      <Grid container spacing={4}>
        {actions.map((item, idx) => (
          <Grid size={{ xs: 12, md: 4 }} key={idx}>
            <Box
              sx={{
                p: 4,
                border: '1px solid rgba(255,255,255,0.9)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(190, 24, 93,0.08)',
                bgcolor: '#ffffff',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'all 0.25s ease',
                borderRadius: 3,
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: '0 20px 48px rgba(190, 24, 93,0.18), 0 4px 12px rgba(0,0,0,0.08)',
                  borderColor: '#fce7f3'
                }
              }}
            >
              <Box 
                sx={{ 
                  width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  bgcolor: '#fdf2f8', border: '1px solid #fce7f3', borderRadius: 2,
                  boxShadow: '0 2px 8px rgba(190, 24, 93,0.15)',
                  color: '#be185d', mb: 4, '& .MuiSvgIcon-root': { fontSize: '2rem' }
                }}
              >
                {item.icon}
              </Box>

              <Typography variant="h5" sx={{ fontWeight: '900', textTransform: 'uppercase', mb: 2, color: '#1e293b', letterSpacing: '-0.5px' }}>
                {item.title}
              </Typography>

              <Typography variant="body2" sx={{ color: '#475569', fontWeight: 500, lineHeight: 1.8, textAlign: 'justify', mb: 4, flexGrow: 1 }}>
                {item.desc}
              </Typography>

              <Button 
                variant="contained" 
                onClick={item.action}
                fullWidth
                sx={{ 
                  py: 1.8, borderRadius: 2, fontWeight: '900', textTransform: 'uppercase',
                  letterSpacing: '1px', fontSize: '0.95rem', bgcolor: '#be185d', color: 'white',
                  boxShadow: '0 2px 8px rgba(190, 24, 93,0.3)',
                  '&:hover': { bgcolor: '#9d174d', boxShadow: '0 4px 14px rgba(190, 24, 93,0.4)' }
                }}
              >
                {item.actionText}
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
      </Container>
    </Box>
  );
}
