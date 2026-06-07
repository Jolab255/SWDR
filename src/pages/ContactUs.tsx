import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  MenuItem,
  Snackbar,
  Alert,
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SendIcon from '@mui/icons-material/Send';

export default function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('general');
  const [message, setMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const BORDER = '1px solid #e2e8f0';
  const SHADOW = '0 4px 20px rgba(0,0,0,0.08)';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg('Please fill in all required fields (Name, Email, and Message).');
      setShowError(true);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg('Please enter a valid email address (e.g. name@example.com).');
      setShowError(true);
      return;
    }

    // Simulate API request send
    setShowSuccess(true);
    setShowError(false);
    setName('');
    setEmail('');
    setSubject('general');
    setMessage('');
  };

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
      
      {/* HEADER SECTION */}
      <Box 
        sx={{ 
          pt: { xs: 3.5, md: 4.5 }, 
          pb: { xs: 2.5, md: 3.5 }, 
          backgroundImage: 'linear-gradient(180deg, rgba(253, 242, 248, 0.97) 0%, rgba(253, 242, 248, 0.97) 100%), url("/favicon.png")',
          backgroundRepeat: 'no-repeat, repeat',
          backgroundSize: 'auto, 120px 120px',
          backgroundAttachment: 'scroll, fixed',
          borderBottom: '1px solid #e2e8f0' 
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box 
              sx={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: 1.5, 
                mb: 3, 
                bgcolor: '#ffffff',
                color: '#1e293b',
                px: 2.5,
                py: 1,
                borderRadius: 2,
                border: '1px solid #fce7f3',
                boxShadow: '0 2px 6px rgba(190, 24, 93,0.12)',
                fontWeight: '900',
                textTransform: 'uppercase',
                fontSize: '0.85rem',
                letterSpacing: '1px'
              }}
            >
              Get in Touch
            </Box>
            <Typography 
              variant="h1" 
              sx={{ 
                fontWeight: '900',
                color: '#1e293b', 
                fontSize: { xs: '2.5rem', md: '4rem' },
                textTransform: 'uppercase',
                letterSpacing: '-2px',
                lineHeight: 1.1
              }}
            >
              Contact <Box component="span" sx={{ color: '#be185d' }}>Us</Box>
            </Typography>
            <Box sx={{ width: 64, height: 5, bgcolor: '#be185d', mx: 'auto', mt: 3, borderRadius: 2 }} />
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={6}>
          {/* LEFT COLUMN: CONTACT DETAILS */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <Box 
                sx={{ 
                  p: { xs: 4, md: 5 }, 
                  border: BORDER, 
                  boxShadow: SHADOW,
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: 2,
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: '900', color: '#1e293b', textTransform: 'uppercase', letterSpacing: '-1px', mb: 2 }}>
                  Clinic Headquarters
                </Typography>
                <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.8, fontWeight: 500, textAlign: 'justify', mb: 4 }}>
                  Have questions regarding direct wire bank donations, corporate partnerships, clinical volunteer options, or tax-deductible receipts? Our administrative team in Dar es Salaam is ready to assist.
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {[
                    { icon: <LocationOnIcon />, label: 'Physical Clinic HQ', value: 'Plot 100, Block A, House 100, Mfaume Street, Mazengo Road, Upanga Magharibi, Ilala CBD, Dar Es Salaam, 11103, Tanzania' },
                    { icon: <PhoneIcon />, label: 'Office Call Lines', value: '+255 22 270 0981 / +255 784 766 373', link: 'tel:+255222700981' },
                    { icon: <WhatsAppIcon />, label: 'Charity Coordinator WhatsApp', value: '+255 784 766 373', color: 'success.dark', link: 'https://wa.me/255784766373' },
                    { icon: <EmailIcon />, label: 'Charity Email Coordinates', value: 'donations@smilewithdrrome.org / info@swdrclinic.org', link: 'mailto:donations@smilewithdrrome.org' },
                    { icon: <AccessTimeIcon />, label: 'HQ Operating Hours', value: 'Mon - Fri: 08:00 AM - 05:00 PM | Sat: 09:00 AM - 01:00 PM (Emergency & Charities Only)' },
                  ].map((item, idx) => (
                    <Box key={idx} sx={{ display: 'flex', gap: 2.5, alignItems: 'flex-start' }}>
                      <Box sx={{ p: 1.2, bgcolor: '#fdf2f8', color: '#be185d', border: '1px solid #fce7f3', borderRadius: 1, boxShadow: '0 1px 4px rgba(190, 24, 93,0.1)', display: 'flex', flexShrink: 0 }}>
                        {item.icon}
                      </Box>
                      <Box>
                        <Typography variant="caption" sx={{ color: '#be185d', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          {item.label}
                        </Typography>
                        {item.link ? (
                          <Box 
                            component="a" 
                            href={item.link} 
                            sx={{ 
                              display: 'block',
                              color: item.color || '#1e293b', 
                              fontWeight: 600, 
                              lineHeight: 1.5,
                              textDecoration: 'none',
                              fontSize: '0.875rem',
                              '&:hover': { color: '#be185d' }
                            }}
                          >
                            {item.value}
                          </Box>
                        ) : (
                          <Typography variant="body2" sx={{ color: item.color || '#1e293b', fontWeight: 600, lineHeight: 1.5 }}>
                            {item.value}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* RIGHT COLUMN: CONTACT FORM */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box 
              sx={{
                p: { xs: 4, md: 6 },
                border: BORDER,
                boxShadow: SHADOW,
                bgcolor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: 2,
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: '900', color: '#1e293b', textTransform: 'uppercase', letterSpacing: '-1px', mb: 2 }}>
                Send SWDR a Message
              </Typography>
              <Typography variant="body1" sx={{ color: '#475569', fontWeight: 500, lineHeight: 1.7, mb: 5, textAlign: 'justify' }}>
                Fill out the secure form below. Your request will be filtered and dispatched straight to our pediatric support desks.
              </Typography>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      variant="outlined"
                      slotProps={{ 
                        input: { 
                          sx: { 
                            borderRadius: 1, 
                            fontWeight: 600,
                          } 
                        } 
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      slotProps={{ 
                        input: { 
                          sx: { 
                            borderRadius: 1, 
                            fontWeight: 600,
                          } 
                        } 
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      select
                      label="Subject Inquiry"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      slotProps={{ 
                        input: { 
                          sx: { 
                            borderRadius: 1, 
                            fontWeight: 600,
                          } 
                        } 
                      }}
                    >
                      <MenuItem value="general">General NGO Inquiry</MenuItem>
                      <MenuItem value="volunteer">Volunteer Practitioner Registration</MenuItem>
                      <MenuItem value="partnership">Corporate Sponsorship / Partnerships</MenuItem>
                      <MenuItem value="donation">Donation Receipt / Selcom Issue</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      multiline
                      rows={5}
                      label="Your Detailed Message"
                      required
                      value={message}
                      placeholder="Write details of your question or support proposition here..."
                      onChange={(e) => setMessage(e.target.value)}
                      slotProps={{ 
                        input: { 
                          sx: { 
                            borderRadius: 1, 
                            fontWeight: 600,
                          } 
                        } 
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      endIcon={<SendIcon />}
                      fullWidth
                      sx={{ 
                        px: 4, py: 2, 
                        borderRadius: 2, 
                        fontWeight: '900', 
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        fontSize: '1rem',
                        bgcolor: '#be185d',
                        color: 'white',
                        boxShadow: '0 4px 14px rgba(190, 24, 93,0.35)',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          bgcolor: '#9d174d',
                          boxShadow: '0 6px 20px rgba(190, 24, 93,0.45)',
                        },
                      }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Success submit message popup */}
      <Snackbar open={showSuccess} autoHideDuration={5000} onClose={() => setShowSuccess(false)}>
        <Alert 
          onClose={() => setShowSuccess(false)} 
          severity="success" 
          sx={{ 
            borderRadius: 1.5, 
            border: '1px solid #bcf0da', 
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
            fontWeight: 'bold',
            bgcolor: '#f3faf7',
            color: '#03543f'
          }}
        >
          🎉 Message successfully sent! Our support office will reach out to you within 24 hours.
        </Alert>
      </Snackbar>

      {/* Error message popup */}
      <Snackbar open={showError} autoHideDuration={5000} onClose={() => setShowError(false)}>
        <Alert 
          onClose={() => setShowError(false)} 
          severity="error" 
          sx={{ 
            borderRadius: 1.5, 
            border: '1px solid #fde8e8', 
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
            fontWeight: 'bold',
            bgcolor: '#fdf2f2',
            color: '#9b1c1c'
          }}
        >
          ⚠️ {errorMsg}
        </Alert>
      </Snackbar>

    </Box>
  );
}
