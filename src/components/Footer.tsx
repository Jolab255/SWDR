import React, { useState } from 'react';
// Force Vite HMR cache invalidation
import {
  Box,
  Container,
  Typography,
  IconButton,
  TextField,
  Button,
  Snackbar,
  Alert,
  SvgIcon,
} from '@mui/material';

const TikTokIcon = (props: any) => (
  <SvgIcon {...props} viewBox="0 0 448 512">
    <path d="M448 209.91a210.06 210.06 0 0 1-122.77-39.25v178.72A162.55 162.55 0 1 1 185 188.31v89.89a74.62 74.62 0 1 0 52.23 71.18V0h88a121.18 121.18 0 0 0 1.86 22.17A122.18 122.18 0 0 0 381 102.39a121.43 121.43 0 0 0 67 20.14z"/>
  </SvgIcon>
);
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setOpenSnackbar(true);
    setEmail('');
  };

  const navLinks = [
    { id: '/', label: 'Homepage' },
    { id: '/about', label: 'About Us' },
    { id: '/why-we-started', label: 'Why We Started' },
    { id: '/collaborators', label: 'Collaborators' },
    { id: '/contact', label: 'Contact Us' },
  ];

  const socials = [
    { icon: <FacebookIcon fontSize="small" />, href: 'https://www.facebook.com/share/1Dfmwv6KYi/?mibextid=wwXIfr', label: 'Facebook' },
    { icon: <InstagramIcon fontSize="small" />, href: 'https://www.instagram.com/smilewith_dr_rome?igsh=MWJ3a28xZWNnOHQwdw%3D%3D&utm_source=qr', label: 'Instagram' },
    { icon: <TikTokIcon fontSize="small" />, href: 'https://www.tiktok.com/@smilewith_dr_rome?_r=1&_t=ZS-96zbkazUNY9', label: 'TikTok' },
    { icon: <TwitterIcon fontSize="small" />, href: 'https://twitter.com', label: 'Twitter' },
    { icon: <WhatsAppIcon fontSize="small" />, href: 'https://wa.me/255784766373', label: 'WhatsApp' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundImage: 'linear-gradient(180deg, rgba(255, 255, 255, 0.975) 0%, rgba(255, 255, 255, 0.975) 100%), url("/favicon.png")',
        backgroundRepeat: 'no-repeat, repeat',
        backgroundSize: 'auto, 120px 120px',
        backgroundAttachment: 'scroll, fixed',
        color: '#1e293b',
        borderTop: '1px solid #e2e8f0',
        boxShadow: '0 -1px 8px rgba(0,0,0,0.04)',
        mt: 'auto',
      }}
    >

      <Container maxWidth="xl">

        {/* ── 4-column CSS grid ── */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 1fr',
              md: '2fr 1fr 1.5fr 1.5fr',
            },
            borderBottom: '1px solid #e2e8f0',
          }}
        >

          {/* Col 1 — Brand */}
          <Box
            sx={{
              py: { xs: 5, md: 7 },
              pr: { md: 5 },
              borderRight: { md: '1px solid #e2e8f0' },
              borderBottom: { xs: '1px solid #e2e8f0', md: 'none' },
            }}
          >
            {/* Brand name/logo */}
            <Box sx={{ mb: 2.5 }}>
              <Box 
                component="img"
                src="/logo.png"
                alt="Smile with Doctor Rome"
                sx={{ 
                  height: 60,
                  width: 'auto',
                  display: 'block',
                  objectFit: 'contain'
                }}
              />
            </Box>

            <Typography 
              variant="body2" 
              sx={{ 
                color: '#475569', 
                lineHeight: 1.8, 
                mb: 4, 
                maxWidth: { xs: '100%', md: 320 },
                px: { xs: 1, md: 0 }
              }}
            >
              Smile With Dr Rome Dental Clinic is a community-based dental practice in Tanzania - providing
              no-cost oral healthcare services to children with special health needs in Tanzanian communities.
              <Box component="span" sx={{ display: 'block', mt: 1.5, fontWeight: '900', color: '#be185d' }}>
                #untileveryonesmiles
              </Box>
            </Typography>

            {/* Social icons — neo-brutalism squares */}
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              {socials.map((s) => (
                <IconButton
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  aria-label={s.label}
                  sx={{
                    width: 40, height: 40,
                    borderRadius: 1,
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                    bgcolor: 'white',
                    color: '#1e293b',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: '#be185d',
                      color: 'white',
                      borderColor: '#be185d',
                      boxShadow: '0 4px 10px rgba(190, 24, 93,0.3)',
                    },
                  }}
                >
                  {s.icon}
                </IconButton>
              ))}
            </Box>
          </Box>

          {/* Col 2 — Navigation */}
          <Box
            sx={{
              py: { xs: 5, md: 7 },
              px: { sm: 4, md: 4 },
              borderRight: { md: '1px solid #e2e8f0' },
              borderBottom: { xs: '1px solid #e2e8f0', sm: '1px solid #e2e8f0', md: 'none' },
            }}
          >
            <Typography
              variant="overline"
              sx={{
                fontWeight: '900',
                color: '#be185d',
                letterSpacing: '2px',
                fontSize: '0.68rem',
                display: 'block',
                mb: 2.5,
              }}
            >
              Quick Navigation
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {navLinks.map((item) => (
                <Box
                  key={item.id}
                  component={Link}
                  to={item.id}
                  sx={{
                    background: 'none',
                    border: 'none',
                    borderBottom: '1.5px solid #e2e8f0',
                    textAlign: 'left',
                    cursor: 'pointer',
                    py: 1.1,
                    px: 0,
                    fontFamily: 'inherit',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    color: '#1e293b',
                    display: 'block',
                    textDecoration: 'none',
                    transition: 'all 0.15s',
                    '&:hover': {
                      color: '#be185d',
                      pl: 1,
                    },
                    '&:last-child': { borderBottom: 'none' },
                  }}
                >
                  → {item.label}
                </Box>
              ))}
            </Box>
          </Box>

          {/* Col 3 — Contact */}
          <Box
            sx={{
              py: { xs: 5, md: 7 },
              px: { sm: 0, md: 4 },
              borderRight: { md: '1px solid #e2e8f0' },
              borderBottom: { xs: '1px solid #e2e8f0', md: 'none' },
            }}
          >
            <Typography
              variant="overline"
              sx={{ fontWeight: '900', color: '#be185d', letterSpacing: '2px', fontSize: '0.68rem', display: 'block', mb: 2.5 }}
            >
              Clinic &amp; Charity HQ
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                {
                  label: 'Address',
                  value: <>Plot 100, Block A, House 100,<br />Mfaume Street, Mazengo Road,<br />Upanga Magharibi, Ilala CBD,<br />Dar Es Salaam, 11103, Tanzania</>,
                },
                {
                  label: 'Phone / WhatsApp',
                  value: <>+255 784 766 373<br />+255 22 270 0981</>,
                },
                {
                  label: 'Email',
                  value: 'donations@smilewithdrrome.org',
                },
              ].map((row) => (
                <Box key={row.label} sx={{ borderLeft: '3px solid #be185d', pl: 1.5 }}>
                  <Typography variant="caption" sx={{ fontWeight: '900', color: '#1e293b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {row.label}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#475569', mt: 0.3, lineHeight: 1.7 }}>
                    {row.value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Col 4 — Newsletter */}
          <Box
            sx={{
              py: { xs: 5, md: 7 },
              pl: { sm: 0, md: 4 },
            }}
          >
            <Typography
              variant="overline"
              sx={{ fontWeight: '900', color: '#be185d', letterSpacing: '2px', fontSize: '0.68rem', display: 'block', mb: 2.5 }}
            >
              Join the Movement
            </Typography>
            <Typography variant="body2" sx={{ color: '#475569', mb: 3, lineHeight: 1.7 }}>
              Subscribe for updates on our upcoming rural charity dates, calendar events, and smile
              success stories.
            </Typography>
            <form onSubmit={handleSubscribe}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <TextField
                  placeholder="Your Email Address"
                  type="email"
                  size="small"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1,
                      bgcolor: 'white',
                      '& fieldset': { border: '1px solid #cbd5e1' },
                      '&:hover fieldset': { borderColor: '#be185d' },
                      '&.Mui-focused fieldset': { borderColor: '#be185d', borderWidth: '2px' },
                    },
                    input: { color: '#1e293b', fontWeight: 600, fontSize: '0.9rem' },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    borderRadius: 1,
                    fontWeight: '900',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    fontSize: '0.82rem',
                    py: 1.4,
                    bgcolor: '#be185d',
                    color: 'white',
                    boxShadow: '0 2px 8px rgba(190, 24, 93,0.3)',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: '#9d174d',
                      boxShadow: '0 4px 14px rgba(190, 24, 93,0.4)',
                    },
                  }}
                >
                  Subscribe
                </Button>
              </Box>
            </form>
          </Box>

        </Box>
        {/* ── end grid ── */}

        {/* Bottom bar */}
        <Box
          sx={{
            py: 2.5,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
            <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700 }}>
              © {new Date().getFullYear()} SWDR. Developed by <Box component="span" sx={{ color: '#be185d' }}>Jolab</Box> | <Box component="a" href="mailto:yonahmatete@gmail.com" sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { color: '#be185d' } }}>yonahmatete@gmail.com</Box> | <Box component="a" href="https://wa.me/255765929374" sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { color: '#be185d' } }}>+255 765 929 374</Box>
            </Typography>
          </Box>
          <Typography
            variant="caption"
            sx={{ color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 0.5 }}
          >
            Made with <FavoriteIcon sx={{ fontSize: 13, color: '#e11d48' }} /> for children's health in Tanzania
          </Typography>
        </Box>

      </Container>

      {/* Subscription toast */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{
            borderRadius: 1,
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            fontWeight: 700,
          }}
        >
          🎉 Subscribed! You'll receive monthly charity &amp; calendar updates.
        </Alert>
      </Snackbar>
    </Box>
  );
}
