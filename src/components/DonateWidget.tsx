import { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Alert,
  Paper,
  Select,
  MenuItem,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SecurityIcon from '@mui/icons-material/Security';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import PaymentsIcon from '@mui/icons-material/Payments';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface DonateWidgetProps {
  open: boolean;
  onClose: () => void;
}

const steps = ['Amount', 'Personal', 'Payment', 'Verify'];

const currencies = [
  { code: 'TZS', symbol: 'TSh', label: 'Tanzanian Shilling', presets: ['25000', '50000', '100000', '250000', '500000'], locale: 'en-TZ' },
  { code: 'USD', symbol: '$', label: 'US Dollar', presets: ['10', '25', '50', '100', '250'], locale: 'en-US' },
  { code: 'KES', symbol: 'KSh', label: 'Kenyan Shilling', presets: ['1000', '2500', '5000', '10000', '25000'], locale: 'en-KE' },
  { code: 'EUR', symbol: '€', label: 'Euro', presets: ['10', '25', '50', '100', '250'], locale: 'de-DE' },
  { code: 'GBP', symbol: '£', label: 'British Pound', presets: ['10', '25', '50', '100', '250'], locale: 'en-GB' },
];

const CarrierLogo = ({ carrier }: { carrier: string }) => {
  switch (carrier) {
    case 'mpesa':
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <svg viewBox="0 0 120 40" width="100%" height="32" style={{ display: 'block' }}>
            <rect width="120" height="40" rx="6" fill="#e11d48" />
            <circle cx="25" cy="20" r="10" fill="#ffffff" />
            <path d="M27 23 C27 17, 22 17, 22 21 C22 25, 27 25, 27 23" stroke="#e11d48" strokeWidth="2.5" fill="none" />
            <text x="75" y="25" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="15" fill="#ffffff" textAnchor="middle">
              m-pesa
            </text>
            <circle cx="104" cy="20" r="4" fill="#22c55e" />
          </svg>
        </Box>
      );
    case 'tigopesa':
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <svg viewBox="0 0 120 40" width="100%" height="32" style={{ display: 'block' }}>
            <rect width="120" height="40" rx="6" fill="#00249c" />
            <text x="60" y="25" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="14" textAnchor="middle">
              <tspan fill="#ffffff">tigo</tspan>
              <tspan fill="#facc15"> pesa</tspan>
            </text>
          </svg>
        </Box>
      );
    case 'airtelmoney':
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <svg viewBox="0 0 120 40" width="100%" height="32" style={{ display: 'block' }}>
            <rect width="120" height="40" rx="6" fill="#ff0000" />
            <path d="M22 20 C22 15, 28 15, 28 20 C28 25, 24 25, 24 20" stroke="#ffffff" strokeWidth="2.5" fill="none" />
            <text x="72" y="20" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="12" fill="#ffffff" textAnchor="middle">
              airtel
            </text>
            <text x="72" y="30" fontFamily="'Inter', sans-serif" fontWeight="800" fontSize="8" fill="#ffffff" textAnchor="middle" letterSpacing="1px">
              MONEY
            </text>
          </svg>
        </Box>
      );
    case 'halopesa':
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <svg viewBox="0 0 120 40" width="100%" height="32" style={{ display: 'block' }}>
            <rect width="120" height="40" rx="6" fill="#ff6600" />
            <text x="60" y="25" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="13" textAnchor="middle">
              <tspan fill="#ffffff">halo</tspan>
              <tspan fill="#ffeb3b">pesa</tspan>
            </text>
          </svg>
        </Box>
      );
    default:
      return null;
  }
};



const PaymentSupportInfo = () => (
  <Typography 
    variant="caption" 
    color="text.secondary" 
    sx={{ 
      display: 'block', 
      textAlign: 'center', 
      mt: 2.5, 
      fontWeight: '600',
      lineHeight: 1.4
    }}
  >
    Payment issues? Contact support: <strong style={{ color: '#be185d' }}>+255 712 345 678</strong> (WhatsApp) or <strong style={{ color: '#be185d' }}>support@smilewithdrrome.org</strong>
  </Typography>
);

export default function DonateWidget({ open, onClose }: DonateWidgetProps) {
  const [activeStep, setActiveSlide] = useState(0);
  const [currency, setCurrency] = useState(currencies[0]);
  const [amount, setAmount] = useState('50000');
  const [paymentMethod, setPaymentMethod] = useState('mobile');
  const [mobileCarrier, setMobileCarrier] = useState('mpesa');
  const [loading, setLoading] = useState(false);
  const [transactionRef, setTransactionRef] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [success, setSuccess] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  const BORDER = "1px solid #e2e8f0";
  const SHADOW = "0 8px 32px rgba(0,0,0,0.12)";

  const resetWidget = () => {
    setActiveSlide(0);
    setCurrency(currencies[0]);
    setAmount('50000');
    setLoading(false);
    setSuccess(false);
    setTransactionRef('');
    setOtpCode('');
    setCustomAmount('');
    setName('');
    setEmail('');
    setPhone('');
    setCardNumber('');
    setCardExpiry('');
    setCardCvv('');
  };

  const handleCloseWrapper = () => {
    resetWidget();
    onClose();
  };

  const handleNext = () => {
    if (activeStep === 0 && amount === 'custom' && !customAmount) return;
    if (activeStep === 1 && (!name || !email || !phone)) return;
    
    if (activeStep === 2) {
      setLoading(true);
      // Simulate API call to Selcom Gateway
      setTimeout(() => {
        setLoading(false);
        setTransactionRef('SWDR-' + Math.random().toString(36).substr(2, 9).toUpperCase());
        setActiveSlide(3);
      }, 2000);
    } else {
      setActiveSlide((prev) => prev + 1);
    }
  };

  const handleVerify = () => {
    if (otpCode.length < 6) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  const handleBack = () => setActiveSlide((prev) => prev - 1);

  const formatCurrency = (val: string) => {
    const num = amount === 'custom' ? parseInt(customAmount) : parseInt(val);
    return new Intl.NumberFormat(currency.locale, { style: 'currency', currency: currency.code, maximumFractionDigits: 0 }).format(num || 0);
  };

  const formatPreset = (val: string) => {
    if (val === 'custom') return 'Other';
    const num = parseInt(val);
    if (currency.code === 'TZS') {
      return val.slice(0, -3) + 'k';
    }
    if (currency.code === 'KES') {
      return num >= 1000 ? `${num / 1000}k` : num.toString();
    }
    return `${currency.symbol}${val}`;
  };

  const getTzsEquivalent = () => {
    const val = amount === 'custom' ? parseInt(customAmount || '0') : parseInt(amount);
    if (!val) return 0;
    if (currency.code === 'TZS') return val;
    if (currency.code === 'USD') return val * 2600;
    if (currency.code === 'KES') return val * 20;
    if (currency.code === 'EUR') return val * 2800;
    if (currency.code === 'GBP') return val * 3300;
    return val;
  };

  const getImpactText = () => {
    const tzs = getTzsEquivalent();
    if (tzs <= 0) return 'Please enter an amount to see your impact.';
    if (tzs < 25000) {
      return `This buys pediatric dental supplies for underprivileged children.`;
    }
    if (tzs < 50000) {
      return 'This buys 1 pediatric dental hygiene kit (Brush, Paste, Floss).';
    }
    if (tzs < 100000) {
      return 'This funds 1 complete rural clinical screening for a child.';
    }
    if (tzs < 250000) {
      return 'This covers 2 restorative fillings for a child in pain.';
    }
    if (tzs < 500000) {
      return 'This sponsors clinical travel for our rural mobile unit.';
    }
    const pct = Math.floor((tzs / 1000000) * 100);
    if (pct >= 100) {
      return `This fully funds ${Math.floor(tzs / 1000000)} cleft-lip reconstructive surgery!`;
    }
    return `This funds ${pct}% of a cleft-lip reconstructive surgery.`;
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleCloseWrapper} 
      maxWidth="sm" 
      fullWidth 
      scroll="body"
      slotProps={{
        paper: {
          sx: {
            borderRadius: 2,
            border: BORDER,
            boxShadow: SHADOW,
            m: { xs: 2, sm: 3 }
          }
        }
      }}
    >
      <DialogTitle sx={{ borderBottom: BORDER, bgcolor: '#fdf2f8', display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <VolunteerActivismIcon sx={{ color: '#be185d' }} />
          <Typography variant="h5" sx={{ fontWeight: "900", textTransform: 'uppercase', letterSpacing: '-0.5px' }}>
            Sponsor a Smile
          </Typography>
        </Box>
        <IconButton onClick={handleCloseWrapper} size="small" sx={{ border: '1px solid #e2e8f0', borderRadius: 1, bgcolor: 'white' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: { xs: 2.5, md: 3 } }}>
        {!success ? (
          <>
            <Stepper activeStep={activeStep} sx={{ mb: 3, '& .MuiStepIcon-root': { borderRadius: 0, width: 28, height: 28 }, '& .MuiStepIcon-root.Mui-active, & .MuiStepIcon-root.Mui-completed': { color: '#be185d' } }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel 
                    slotProps={{
                      stepIcon: {
                        sx: {
                          '&.Mui-active, &.Mui-completed': { color: '#be185d' },
                          borderRadius: 0
                        }
                      }
                    }}
                  >
                    <Typography variant="caption" sx={{ fontWeight: '900', textTransform: 'uppercase', fontSize: '0.65rem', display: { xs: 'none', sm: 'block' } }}>{label}</Typography>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>

            {/* STEP 0: AMOUNT SELECTION */}
            {activeStep === 0 && (
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle2" color="#1e293b" sx={{ fontWeight: "900", textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Choose Donation Amount
                  </Typography>
                  <Select
                    size="small"
                    value={currency.code}
                    onChange={(e) => {
                      const curr = currencies.find(c => c.code === e.target.value) || currencies[0];
                      setCurrency(curr);
                      setAmount(curr.presets[1]);
                    }}
                    sx={{
                      width: 120,
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      '& .MuiSelect-select': { py: 0.75 }
                    }}
                  >
                    {currencies.map((curr) => (
                      <MenuItem key={curr.code} value={curr.code} sx={{ fontSize: '0.8rem', fontWeight: 'bold' }}>
                        {curr.code} ({curr.symbol})
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
                <Grid container spacing={2}>
                  {[...currency.presets, 'custom'].map((preset) => (
                    <Grid size={{ xs: 4 }} key={preset}>
                      <Button
                        fullWidth
                        variant={amount === preset ? 'contained' : 'outlined'}
                        onClick={() => setAmount(preset)}
                        sx={{
                          py: 1.25,
                          borderRadius: 0,
                          fontWeight: '900',
                          border: amount === preset ? '1px solid #be185d' : '1px solid #e2e8f0',
                          boxShadow: 'none',
                          bgcolor: amount === preset ? '#be185d' : 'white',
                          color: amount === preset ? 'white' : '#1e293b',
                          '&:hover': { bgcolor: amount === preset ? '#9d174d' : '#fdf2f8', borderColor: '#be185d' }
                        }}
                      >
                        {formatPreset(preset)}
                      </Button>
                    </Grid>
                  ))}
                </Grid>

                {amount === 'custom' && (
                  <TextField
                    fullWidth
                    label={`Enter Amount (${currency.code})`}
                    type="number"
                    sx={{ mt: 2 }}
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    slotProps={{ input: { sx: { borderRadius: 1.5, fontWeight: 'bold' } } }}
                  />
                )}

                <Paper elevation={0} sx={{ p: 2, mt: 2.5, bgcolor: '#fdf2f8', border: '1px solid #fce7f3', boxShadow: '0 2px 8px rgba(190, 24, 93,0.1)', borderRadius: 2 }}>
                  <Typography variant="caption" sx={{ fontWeight: "900", color: '#be185d', textTransform: 'uppercase', display: 'block', mb: 0.5 }}>Your Impact:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b', fontStyle: 'italic', fontSize: '0.825rem' }}>
                    {getImpactText()}
                  </Typography>
                </Paper>
              </Box>
            )}

            {/* STEP 1: PERSONAL INFO */}
            {activeStep === 1 && (
              <Box>
                <Typography variant="subtitle2" color="#1e293b" sx={{ fontWeight: "900", textTransform: 'uppercase', mb: 1.5, display: 'block', letterSpacing: '0.5px' }}>
                  Donor Information
                </Typography>
                <Grid container spacing={2.5}>
                  <Grid size={{ xs: 12 }}><TextField fullWidth label="Full Name" value={name} onChange={(e) => setName(e.target.value)} slotProps={{ input: { sx: { borderRadius: 1.5 } } }} /></Grid>
                  <Grid size={{ xs: 12 }}><TextField fullWidth label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} slotProps={{ input: { sx: { borderRadius: 1.5 } } }} /></Grid>
                  <Grid size={{ xs: 12 }}><TextField fullWidth label="Phone (for Mobile Money)" value={phone} onChange={(e) => setPhone(e.target.value)} slotProps={{ input: { sx: { borderRadius: 1.5 } } }} /></Grid>
                </Grid>
              </Box>
            )}

            {/* STEP 2: PAYMENT METHOD */}
            {activeStep === 2 && (
              <Box>
                <Typography variant="subtitle2" color="#1e293b" sx={{ fontWeight: "900", textTransform: 'uppercase', mb: 1.5, display: 'block', letterSpacing: '0.5px' }}>
                  Select Payment Method
                </Typography>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid size={{ xs: 6 }}>
                    <Button
                      fullWidth variant={paymentMethod === 'mobile' ? 'contained' : 'outlined'}
                      startIcon={<IconButton size="small" sx={{ p: 0.5, color: paymentMethod === 'mobile' ? 'white' : 'inherit' }}><PaymentsIcon /></IconButton>}
                      onClick={() => setPaymentMethod('mobile')}
                      sx={{ py: 1.5, borderRadius: 1.5, fontWeight: '900', border: '1px solid #e2e8f0', boxShadow: paymentMethod === 'mobile' ? '0 0 0 2px #be185d' : '0 1px 4px rgba(0,0,0,0.06)', bgcolor: paymentMethod === 'mobile' ? '#be185d' : 'white', color: paymentMethod === 'mobile' ? 'white' : '#1e293b' }}
                    >
                      Mobile Money
                    </Button>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Button
                      fullWidth variant={paymentMethod === 'card' ? 'contained' : 'outlined'}
                      startIcon={<IconButton size="small" sx={{ p: 0.5, color: paymentMethod === 'card' ? 'white' : 'inherit' }}><SecurityIcon /></IconButton>}
                      onClick={() => setPaymentMethod('card')}
                      sx={{ py: 1.5, borderRadius: 1.5, fontWeight: '900', border: '1px solid #e2e8f0', boxShadow: paymentMethod === 'card' ? '0 0 0 2px #be185d' : '0 1px 4px rgba(0,0,0,0.06)', bgcolor: paymentMethod === 'card' ? '#be185d' : 'white', color: paymentMethod === 'card' ? 'white' : '#1e293b' }}
                    >
                      Credit Card
                    </Button>
                  </Grid>
                </Grid>

                {paymentMethod === 'mobile' ? (
                  <Box sx={{ p: 2, border: '1px solid #e2e8f0', bgcolor: '#f8fafc', borderRadius: 2 }}>
                    <Typography variant="caption" sx={{ fontWeight: "900", textTransform: 'uppercase', mb: 1.5, display: 'block' }}>Network Provider (Tanzania)</Typography>
                    <Grid container spacing={1.5}>
                      {['mpesa', 'tigopesa', 'airtelmoney', 'halopesa'].map((carrier) => (
                        <Grid size={{ xs: 6, sm: 3 }} key={carrier}>
                          <Box
                            onClick={() => setMobileCarrier(carrier)}
                            sx={{
                              p: 0.75,
                              border: '2px solid',
                              borderColor: mobileCarrier === carrier ? '#be185d' : '#e2e8f0',
                              borderRadius: 2,
                              cursor: 'pointer',
                              bgcolor: 'white',
                              boxShadow: mobileCarrier === carrier ? '0 4px 12px rgba(190, 24, 93,0.15)' : 'none',
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                borderColor: '#be185d',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                              }
                            }}
                          >
                            <CarrierLogo carrier={carrier} />
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                ) : (
                  <Box sx={{ p: 2, border: '1px solid #e2e8f0', bgcolor: '#f8fafc', borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                      <Typography variant="caption" sx={{ fontWeight: "900", textTransform: 'uppercase' }}>Card Details (Mock)</Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <svg viewBox="0 0 45 15" width="30" height="12">
                          <rect width="45" height="15" fill="#1a1f71" rx="2" />
                          <text x="22.5" y="11.5" fontFamily="'Inter', sans-serif" fontWeight="bold" fontSize="10" fill="#f7b614" textAnchor="middle" fontStyle="italic">VISA</text>
                        </svg>
                        <svg viewBox="0 0 45 15" width="30" height="12">
                          <rect width="45" height="15" fill="#222" rx="2" />
                          <circle cx="18" cy="7.5" r="5.5" fill="#eb001b" />
                          <circle cx="27" cy="7.5" r="5.5" fill="#ff5f00" opacity="0.85" />
                        </svg>
                      </Box>
                    </Box>
                    <Grid container spacing={1.5}>
                      <Grid size={{ xs: 12 }}>
                        <TextField 
                          fullWidth size="small" label="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value.replace(/[^0-9]/g, ''))} 
                          slotProps={{ input: { sx: { borderRadius: 1.5 } } }} 
                        />
                      </Grid>
                      <Grid size={{ xs: 6 }}>
                        <TextField 
                          fullWidth size="small" label="MM/YY" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} 
                          slotProps={{ input: { sx: { borderRadius: 1.5 } } }} 
                        />
                      </Grid>
                      <Grid size={{ xs: 6 }}>
                        <TextField 
                          fullWidth size="small" label="CVV" type="password" value={cardCvv} onChange={(e) => setCardCvv(e.target.value.replace(/[^0-9]/g, ''))} 
                          slotProps={{ input: { sx: { borderRadius: 1.5 } } }} 
                        />
                      </Grid>
                    </Grid>
                  </Box>
                )}
                
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', fontWeight: "700", mt: 2 }}>
                  Secured by Selcom Gateway Tanzania 🔒
                </Typography>
                <PaymentSupportInfo />
              </Box>
            )}

            {/* STEP 3: VERIFICATION */}
            {activeStep === 3 && (
              <Box sx={{ textAlign: 'center' }}>
                {!loading ? (
                  <>
                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: "900", textAlign: 'center' }}>📲 CHECK YOUR PHONE</Typography>
                    <Typography variant="body2" sx={{ textAlign: 'center', fontWeight: "700", fontSize: '0.85rem' }}>
                      We sent a prompt to <strong>{phone}</strong>. Enter the OTP code or transaction ID to confirm your <strong>{formatCurrency(amount)}</strong> donation.
                    </Typography>
                    <TextField 
                      fullWidth size="small" label="6-Digit OTP" value={otpCode} onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ''))} 
                      slotProps={{ htmlInput: { maxLength: 6, style: { textAlign: 'center', letterSpacing: '8px', fontWeight: '900', fontSize: '1.25rem' } } }} 
                      sx={{ mb: 2, mt: 2 }} 
                    />
                    <Alert severity="info" sx={{ py: 0.5, borderRadius: 1.5, border: '1px solid #e2e8f0', fontWeight: 'bold', fontSize: '0.75rem' }}>Reference: {transactionRef}</Alert>
                    <PaymentSupportInfo />
                  </>
                ) : (
                  <Box sx={{ py: 3 }}>
                    <CircularProgress size={45} thickness={5} sx={{ color: '#be185d', mb: 2 }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: "900", textTransform: 'uppercase' }}>Connecting...</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: "700", mt: 0.5, display: 'block' }}>Selcom API is validating your request.</Typography>
                  </Box>
                )}
              </Box>
            )}

          </>
        ) : (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
              <Box sx={{ width: 100, height: 100, bgcolor: 'success.light', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'success.dark', border: '2px solid', borderColor: 'success.dark', borderRadius: 2, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
                <CheckCircleIcon sx={{ fontSize: 60 }} />
              </Box>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: "900", textTransform: 'uppercase', mb: 1 }}>Awesome!</Typography>
            <Typography variant="body1" sx={{ fontWeight: "800", mb: 3 }}>Thank you, {name || 'supporter'}! Your donation of {formatCurrency(amount)} was received.</Typography>
            <Box sx={{ p: 3, bgcolor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 2, textAlign: 'left', mb: 4 }}>
              <Typography variant="caption" sx={{ fontWeight: "900", display: 'block', textTransform: 'uppercase', mb: 1, color: 'grey.600' }}>Transaction Receipt</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}><Typography variant="caption" sx={{ fontWeight: "700" }}>Reference:</Typography><Typography variant="caption" sx={{ fontWeight: "900" }}>{transactionRef}</Typography></Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}><Typography variant="caption" sx={{ fontWeight: "700" }}>Date:</Typography><Typography variant="caption" sx={{ fontWeight: "900" }}>{new Date().toLocaleDateString()}</Typography></Box>
            </Box>
            <Button fullWidth variant="contained" onClick={handleCloseWrapper} sx={{ py: 2, borderRadius: 1.5, fontWeight: '900', bgcolor: 'secondary.dark' }}>Close Window</Button>
          </Box>
        )}
      </DialogContent>

      {!success && (
        <DialogActions sx={{ borderTop: BORDER, p: 3, bgcolor: '#f8fafc', justifyContent: 'space-between' }}>
          <Button 
            onClick={activeStep === 0 ? handleCloseWrapper : handleBack} 
            sx={{ fontWeight: '900', textTransform: 'none', color: '#64748b' }}
          >
            {activeStep === 0 ? 'Cancel' : 'Back'}
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: '900', color: '#1e293b' }}>{formatCurrency(amount)}</Typography>
            <Button
              variant="contained"
              onClick={activeStep === 3 ? handleVerify : handleNext}
              disabled={loading}
              sx={{ 
                px: 5, py: 1.5, borderRadius: 2, fontWeight: '900', bgcolor: '#be185d', 
                boxShadow: '0 2px 8px rgba(190, 24, 93,0.3)',
                '&:hover': { bgcolor: '#9d174d', boxShadow: '0 4px 14px rgba(190, 24, 93,0.4)' }
              }}
            >
              {activeStep === 3 ? 'Confirm' : activeStep === 2 ? 'Pay Now' : 'Continue'}
            </Button>
          </Box>
        </DialogActions>
      )}
    </Dialog>
  );
}
