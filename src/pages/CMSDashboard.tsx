import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  IconButton,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LogoutIcon from '@mui/icons-material/Logout';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import ContentManager from '../components/ContentManager';

const BORDER_COLOR = '#e2e8f0';
const ACCENT_COLOR = '#be185d';
const SHADOW = '0 10px 30px rgba(0, 0, 0, 0.05)';
const SECURE_HASH = '497be1999611f310a4c36a3ac3a5ccaf5853277413ac7c7c659972bea8a32a58'; // SHA-256 of "SmileDrRomeSecure2026!"

export default function CMSDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Lockout States
  const [attempts, setAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState(0);

  // Initialize Auth & Lockout states
  useEffect(() => {
    // 1. Check existing session
    const token = sessionStorage.getItem('swdr_auth_token');
    const start = sessionStorage.getItem('swdr_session_start');
    if (token && start) {
      // Session exists
      setIsAuthenticated(true);
    }

    // 2. Check Lockout State
    const storedAttempts = localStorage.getItem('swdr_login_attempts');
    if (storedAttempts) {
      setAttempts(parseInt(storedAttempts, 10));
    }

    const storedUntil = localStorage.getItem('swdr_lockout_until');
    if (storedUntil) {
      const until = parseInt(storedUntil, 10);
      if (until > Date.now()) {
        setLockoutTime(until);
        setRemainingTime(Math.ceil((until - Date.now()) / 1000));
      } else {
        localStorage.removeItem('swdr_lockout_until');
        localStorage.removeItem('swdr_login_attempts');
        setAttempts(0);
      }
    }
  }, []);

  // Lockout Timer countdown
  useEffect(() => {
    if (!lockoutTime) return;
    const timer = setInterval(() => {
      const diff = lockoutTime - Date.now();
      if (diff <= 0) {
        setLockoutTime(null);
        setRemainingTime(0);
        localStorage.removeItem('swdr_lockout_until');
        localStorage.removeItem('swdr_login_attempts');
        setAttempts(0);
        setErrorMessage('');
        clearInterval(timer);
      } else {
        setRemainingTime(Math.ceil(diff / 1000));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [lockoutTime]);

  // Activity monitoring for automatic inactivity logout
  useEffect(() => {
    if (!isAuthenticated) return;

    const resetTimer = () => {
      sessionStorage.setItem('swdr_last_activity', Date.now().toString());
    };

    resetTimer();

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach((name) => document.addEventListener(name, resetTimer));

    const interval = setInterval(() => {
      const lastActivity = parseInt(sessionStorage.getItem('swdr_last_activity') || '0', 10);
      const now = Date.now();

      // 15 minutes inactivity limit (900,000 ms)
      if (now - lastActivity > 15 * 60 * 1000) {
        handleLogout();
        alert('Session expired due to inactivity. For your security, you have been logged out.');
      }
    }, 10000); // Check every 10 seconds

    return () => {
      events.forEach((name) => document.removeEventListener(name, resetTimer));
      clearInterval(interval);
    };
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutTime && lockoutTime > Date.now()) return;

    setLoading(true);
    setErrorMessage('');

    // Mitigation against timing attacks and bot brute-force
    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 400));

    try {
      // Web Crypto API SHA-256 hashing
      const msgBuffer = new TextEncoder().encode(password);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const inputHash = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

      if (inputHash === SECURE_HASH) {
        // Generate secure temporary session token
        const array = new Uint32Array(8);
        crypto.getRandomValues(array);
        const token = Array.from(array, (dec) => dec.toString(16).padStart(8, '0')).join('');

        sessionStorage.setItem('swdr_auth_token', token);
        sessionStorage.setItem('swdr_auth_hash', inputHash);
        sessionStorage.setItem('swdr_session_start', Date.now().toString());
        sessionStorage.setItem('swdr_last_activity', Date.now().toString());

        setIsAuthenticated(true);
        setAttempts(0);
        setPassword('');
        localStorage.removeItem('swdr_login_attempts');
        localStorage.removeItem('swdr_lockout_until');
      } else {
        const nextAttempts = attempts + 1;
        setAttempts(nextAttempts);
        localStorage.setItem('swdr_login_attempts', nextAttempts.toString());

        if (nextAttempts >= 5) {
          const lockUntil = Date.now() + 15 * 60 * 1000;
          setLockoutTime(lockUntil);
          setRemainingTime(15 * 60);
          localStorage.setItem('swdr_lockout_until', lockUntil.toString());
          setErrorMessage('Intrusion defense triggered. Too many failed attempts. Access locked for 15 minutes.');
        } else {
          setErrorMessage(`Access Denied. Invalid credentials. (${5 - nextAttempts} attempts remaining)`);
        }
      }
    } catch (err) {
      setErrorMessage('Verification error. Cryptographic engine failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('swdr_auth_token');
    sessionStorage.removeItem('swdr_auth_hash');
    sessionStorage.removeItem('swdr_session_start');
    sessionStorage.removeItem('swdr_last_activity');
    setIsAuthenticated(false);
    setPassword('');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Secure Guard: Render absolutely nothing of the content manager if not authenticated
  if (!isAuthenticated) {
    return (
      <Box
        sx={{
          minHeight: '85vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: 'linear-gradient(135deg, #fdf2f8 0%, #f1f5f9 100%), url("/favicon.png")',
          backgroundRepeat: 'no-repeat, repeat',
          backgroundSize: 'auto, 120px 120px',
          backgroundAttachment: 'scroll, fixed',
          px: 2,
          py: 8,
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, md: 5 },
              border: `1px solid ${BORDER_COLOR}`,
              borderRadius: 4,
              boxShadow: SHADOW,
              bgcolor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              textAlign: 'center',
            }}
          >
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                bgcolor: '#fdf2f8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3,
                color: ACCENT_COLOR,
                border: '1px solid #fce7f3',
              }}
            >
              <LockOutlinedIcon sx={{ fontSize: '1.8rem' }} />
            </Box>

            <Typography variant="h4" sx={{ fontWeight: '900', color: '#1e293b', mb: 1, textTransform: 'uppercase', letterSpacing: '-1px' }}>
              Security Clearance
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b', mb: 4, fontWeight: 500 }}>
              Access restricted to clinical administrators only.
            </Typography>

            {errorMessage && (
              <Alert severity="error" sx={{ mb: 3, textAlign: 'left', borderRadius: 2 }}>
                {errorMessage}
              </Alert>
            )}

            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                type={showPassword ? 'text' : 'password'}
                label="Clearance Key"
                variant="outlined"
                disabled={!!lockoutTime || loading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 3, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          disabled={!!lockoutTime || loading}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }
                }}
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={!!lockoutTime || loading || !password}
                sx={{
                  py: 1.6,
                  borderRadius: 2,
                  fontWeight: '900',
                  textTransform: 'uppercase',
                  bgcolor: lockoutTime ? '#94a3b8' : ACCENT_COLOR,
                  '&:hover': { bgcolor: '#9d174d' },
                  boxShadow: '0 4px 14px rgba(190, 24, 93, 0.2)',
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : lockoutTime ? (
                  `LOCKED OUT (${formatTime(remainingTime)})`
                ) : (
                  'Verify Authentication'
                )}
              </Button>
            </form>

            <Box sx={{ mt: 4, pt: 3, borderTop: `1px solid ${BORDER_COLOR}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, color: '#94a3b8' }}>
              <ShieldOutlinedIcon sx={{ fontSize: '1.2rem' }} />
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                Intrusion Prevention & Cryptographic Verification Active
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
    );
  }

  // Admin Dashboard for authenticated session
  return (
    <Box
      sx={{
        py: { xs: 6, md: 8 },
        backgroundImage: 'linear-gradient(180deg, rgba(255, 255, 255, 0.975) 0%, rgba(255, 255, 255, 0.975) 100%), url("/favicon.png")',
        backgroundRepeat: 'no-repeat, repeat',
        backgroundSize: 'auto, 120px 120px',
        backgroundAttachment: 'scroll, fixed',
        minHeight: '90vh',
      }}
    >
      <Container maxWidth="xl">
        {/* Dashboard Header Container */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            border: `1px solid ${BORDER_COLOR}`,
            boxShadow: SHADOW,
            borderRadius: 3,
            bgcolor: 'white',
            mb: 4,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 3,
          }}
        >
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Box
              sx={{
                display: 'inline-flex',
                bgcolor: '#fdf2f8',
                border: '1px solid #fce7f3',
                px: 2,
                py: 0.5,
                borderRadius: 1.5,
                mb: 1.5,
              }}
            >
              <Typography variant="overline" sx={{ fontWeight: '900', color: ACCENT_COLOR, letterSpacing: '1px' }}>
                Secure Clinical Administration
              </Typography>
            </Box>
            <Typography
              variant="h3"
              sx={{
                fontWeight: '900',
                color: '#1e293b',
                textTransform: 'uppercase',
                letterSpacing: '-1.5px',
                fontSize: { xs: '2rem', md: '2.5rem' },
                lineHeight: 1.1,
              }}
            >
              CMS <Box component="span" sx={{ color: ACCENT_COLOR }}>Dashboard</Box>
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              variant="outlined"
              color="error"
              onClick={handleLogout}
              startIcon={<LogoutIcon />}
              sx={{
                py: 1.2,
                px: 2.5,
                borderRadius: 2,
                fontWeight: '900',
                textTransform: 'uppercase',
                borderWidth: '1.5px',
                '&:hover': { borderWidth: '1.5px' },
              }}
            >
              Log Out
            </Button>
          </Box>
        </Paper>

        {/* Content Manager Container */}
        <Paper
          elevation={0}
          sx={{
            bgcolor: 'white',
            border: `1px solid ${BORDER_COLOR}`,
            boxShadow: SHADOW,
            borderRadius: 3,
            p: { xs: 3, md: 4 },
            minHeight: '60vh',
          }}
        >
          <ContentManager />
        </Paper>
      </Container>
    </Box>
  );
}
