import {
  Box,
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
      title: 'Sponsor an Charity',
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
    <Box sx={{ mb: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h3" sx={{ fontWeight: '900', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 3, textTransform: 'uppercase', letterSpacing: '-1.5px', fontSize: { xs: '2rem', md: '2.8rem' } }}>
          Be Part of the Movement
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 800, mx: 'auto', fontWeight: 500, color: '#475569', lineHeight: 1.85, fontSize: '1.1rem' }}>
          Smile with Doctor Rome is more than a clinic; it's a collective mission to restore health to the most vulnerable. Join us in making dental pain a thing of the past for Tanzania's children.
        </Typography>
        <Box sx={{ width: 64, height: 5, bgcolor: '#0284c7', border: '2px solid #1e293b', mx: 'auto', mt: 3 }} />
      </Box>

      <Grid container spacing={4}>
        {actions.map((item, idx) => (
          <Grid size={{ xs: 12, md: 4 }} key={idx}>
            <Box
              sx={{
                p: 4,
                border: '4px solid #1e293b',
                boxShadow: '10px 10px 0px #1e293b',
                bgcolor: 'white',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'all 0.15s ease',
                '&:hover': {
                  transform: 'translate(-3px, -3px)',
                  boxShadow: '14px 14px 0px #0284c7',
                  borderColor: '#0284c7'
                }
              }}
            >
              <Box 
                sx={{ 
                  width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  bgcolor: '#f0f9ff', border: '3px solid #1e293b', boxShadow: '4px 4px 0px #1e293b',
                  color: '#0284c7', mb: 4, '& .MuiSvgIcon-root': { fontSize: '2rem' }
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
                  py: 1.8, borderRadius: 0, fontWeight: '900', textTransform: 'uppercase',
                  letterSpacing: '1px', fontSize: '0.95rem', bgcolor: '#0284c7', color: 'white',
                  border: '3px solid #1e293b', boxShadow: '4px 4px 0px #1e293b',
                  '&:hover': { bgcolor: '#0369a1', transform: 'translate(-3px, -3px)', boxShadow: '6px 6px 0px #1e293b' }
                }}
              >
                {item.actionText}
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
