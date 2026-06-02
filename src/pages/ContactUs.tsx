import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  Divider,
  MenuItem,
  Snackbar,
  Alert,
  IconButton
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    
    // Simulate API request send
    setShowSuccess(true);
    setName('');
    setEmail('');
    setSubject('general');
    setMessage('');
  };

  return (
    <Box sx={{ py: 6, bgcolor: '#f8fafc' }}>
      <Container maxWidth="lg" sx={{ mt: 2, mb: 6 }}>
        
        {/* HEADER */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="caption" 
            sx={{ 
              fontWeight: 'bold', 
              color: 'primary.main', 
              textTransform: 'uppercase', 
              letterSpacing: '1.5px',
              fontSize: '0.8rem' 
            }}
          >
            GET IN TOUCH
          </Typography>
          <Typography variant="h3" fontWeight="900" sx={{ color: '#1e293b', mt: 1, letterSpacing: '-1px' }}>
            Contact Us
          </Typography>
          <Divider sx={{ width: 80, mx: 'auto', mt: 2, height: 4, bgcolor: 'primary.main', borderRadius: 0 }} />
        </Box>

        <Grid container spacing={5}>
          {/* LEFT COLUMN: CONTACT DETAILS */}
          <Grid item xs={12} md={5}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
              <Typography variant="h5" fontWeight="bold" sx={{ color: '#1e293b' }}>
                Clinic Headquarters
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                Have questions regarding direct wire bank donations, corporate partnerships, clinical volunteer options, or tax-deductible receipts? Our administrative team in Dar es Salaam is ready to assist.
              </Typography>
              
              <Divider />

              {/* Contacts */}
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Box sx={{ p: 1.5, bgcolor: '#f0f9ff', color: 'primary.main', borderRadius: 0, display: 'flex' }}>
                  <LocationOnIcon />
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight="bold">Physical Clinic HQ</Typography>
                  <Typography variant="body2" fontWeight="medium">
                    Mikocheni B, Plot 23, Mwai Kibaki Road, Dar es Salaam, Tanzania
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Box sx={{ p: 1.5, bgcolor: '#f0f9ff', color: 'primary.main', borderRadius: 0, display: 'flex' }}>
                  <PhoneIcon />
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight="bold">Office Call Lines</Typography>
                  <Typography variant="body2" fontWeight="medium">
                    +255 22 270 0981 / +255 784 766 373
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Box sx={{ p: 1.5, bgcolor: '#f0fdf4', color: 'success.main', borderRadius: 0, display: 'flex' }}>
                  <WhatsAppIcon />
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight="bold">Outreach Coordinator WhatsApp</Typography>
                  <Typography variant="body2" fontWeight="medium" color="success.dark">
                    +255 784 766 373
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Box sx={{ p: 1.5, bgcolor: '#f0f9ff', color: 'primary.main', borderRadius: 0, display: 'flex' }}>
                  <EmailIcon />
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight="bold">Charity Email Coordinates</Typography>
                  <Typography variant="body2" fontWeight="medium">
                    donations@smiledrrome.org / info@swdrclinic.org
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Box sx={{ p: 1.5, bgcolor: '#f8fafc', color: 'text.secondary', borderRadius: 0, display: 'flex' }}>
                  <AccessTimeIcon />
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight="bold">HQ Operating Hours</Typography>
                  <Typography variant="body2" fontWeight="medium">
                    Monday - Friday: 08:00 AM - 05:00 PM<br />
                    Saturday: 09:00 AM - 01:00 PM (Emergency & Outreaches Only)
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* RIGHT COLUMN: CONTACT FORM */}
          <Grid item xs={12} md={7}>
            <Paper 
              elevation={0}
              sx={{
                p: { xs: 4, md: 5 },
                borderRadius: 0,
                border: '1px solid',
                borderColor: 'grey.200',
                bgcolor: 'white',
                boxShadow: '0 4px 20px rgba(0,0,0,0.01)'
              }}
            >
              <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: '#1e293b' }}>
                Send SWDR a Message
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Fill out the secure form below. Your request will be filtered and dispatched straight to Dr. Rome's pediatric support desks.
              </Typography>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      select
                      label="Subject Inquiry"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    >
                      <MenuItem value="general">General NGO Inquiry</MenuItem>
                      <MenuItem value="volunteer">Volunteer Practitioner Registration</MenuItem>
                      <MenuItem value="partnership">Corporate Sponsorship / Partnerships</MenuItem>
                      <MenuItem value="donation">Donation Receipt / Selcom Issue</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={5}
                      label="Your Detailed Message"
                      required
                      value={message}
                      placeholder="Write details of your question or support proposition here..."
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      endIcon={<SendIcon />}
                      size="large"
                      sx={{ px: 4, py: 1.5, borderRadius: 0, fontWeight: 'bold', textTransform: 'none' }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Success submit message popup */}
      <Snackbar open={showSuccess} autoHideDuration={5000} onClose={() => setShowSuccess(false)}>
        <Alert onClose={() => setShowSuccess(false)} severity="success" sx={{ borderRadius: 0 }}>
          🎉 Message successfully sent! Dr. Rome's support office will reach out to you within 24 hours.
        </Alert>
      </Snackbar>

    </Box>
  );
}
