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

export default function DonateWidget({ open, onClose }: DonateWidgetProps) {
  const [activeStep, setActiveSlide] = useState(0);
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

  const BORDER = "3px solid #1e293b";
  const SHADOW = "8px 8px 0px #1e293b";

  const resetWidget = () => {
    setActiveSlide(0);
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
    return new Intl.NumberFormat('en-TZ', { style: 'currency', currency: 'TZS', maximumFractionDigits: 0 }).format(num || 0);
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
            borderRadius: 0,
            border: BORDER,
            boxShadow: SHADOW,
            m: { xs: 2, sm: 3 }
          }
        }
      }}
    >
      <DialogTitle sx={{ borderBottom: BORDER, bgcolor: '#f0f9ff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <VolunteerActivismIcon sx={{ color: '#0284c7' }} />
          <Typography variant="h5" sx={{ fontWeight: "900", textTransform: 'uppercase', letterSpacing: '-0.5px' }}>
            Sponsor a Smile
          </Typography>
        </Box>
        <IconButton onClick={handleCloseWrapper} size="small" sx={{ border: '2px solid #1e293b', borderRadius: 0, bgcolor: 'white' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: { xs: 3, md: 5 } }}>
        {!success ? (
          <>
            <Stepper activeStep={activeStep} sx={{ mb: 6, '& .MuiStepIcon-root': { borderRadius: 0, width: 28, height: 28 }, '& .MuiStepIcon-root.Mui-active, & .MuiStepIcon-root.Mui-completed': { color: '#0284c7' } }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel 
                    slotProps={{
                      stepIcon: {
                        sx: {
                          '&.Mui-active, &.Mui-completed': { color: '#0284c7' },
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
                <Typography variant="subtitle2" color="#1e293b" sx={{ fontWeight: "900", textTransform: 'uppercase', mb: 1.5, display: 'block', letterSpacing: '0.5px' }}>
                  Choose Donation Amount
                </Typography>
                <Grid container spacing={2}>
                  {['25000', '50000', '100000', '250000', '500000', 'custom'].map((preset) => (
                    <Grid size={{ xs: 4 }} key={preset}>
                      <Button
                        fullWidth
                        variant={amount === preset ? 'contained' : 'outlined'}
                        onClick={() => setAmount(preset)}
                        sx={{
                          py: 1.5,
                          borderRadius: 0,
                          fontWeight: '900',
                          border: '2px solid #1e293b',
                          boxShadow: amount === preset ? '3px 3px 0px #0284c7' : '2px 2px 0px #1e293b',
                          bgcolor: amount === preset ? '#0284c7' : 'white',
                          color: amount === preset ? 'white' : '#1e293b',
                          '&:hover': { bgcolor: amount === preset ? '#0369a1' : '#f0f9ff', borderColor: '#1e293b' }
                        }}
                      >
                        {preset === 'custom' ? 'Other' : preset.slice(0, -3) + 'k'}
                      </Button>
                    </Grid>
                  ))}
                </Grid>

                {amount === 'custom' && (
                  <TextField
                    fullWidth label="Enter Amount (TZS)" type="number" sx={{ mt: 3 }}
                    value={customAmount} onChange={(e) => setCustomAmount(e.target.value)}
                    slotProps={{ input: { sx: { borderRadius: 0, fontWeight: 'bold' } } }}
                  />
                )}

                <Paper elevation={0} sx={{ p: 2.5, mt: 4, bgcolor: '#f0f9ff', border: '2px solid #1e293b', boxShadow: '4px 4px 0px #0284c7', borderRadius: 0 }}>
                  <Typography variant="caption" sx={{ fontWeight: "900", color: '#0284c7', textTransform: 'uppercase', display: 'block', mb: 0.5 }}>Your Impact:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b', fontStyle: 'italic' }}>
                    {amount === '25000' ? 'This buys 1 pediatric dental hygiene kit (Brush, Paste, Floss).' 
                      : amount === '50000' ? 'This funds 1 complete rural clinical screening for a child.'
                      : amount === '100000' ? 'This covers 2 restorative fillings for a child in pain.'
                      : amount === '250000' ? 'This sponsors clinical travel for our rural mobile unit.'
                      : amount === '500000' ? 'This funds 50% of a cleft-lip reconstructive surgery.'
                      : `This buys ${Math.floor(parseInt(customAmount || '0')/10000)} pediatric dental kits for underprivileged children.`}
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
                  <Grid size={{ xs: 12 }}><TextField fullWidth label="Full Name" value={name} onChange={(e) => setName(e.target.value)} slotProps={{ input: { sx: { borderRadius: 0 } } }} /></Grid>
                  <Grid size={{ xs: 12 }}><TextField fullWidth label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} slotProps={{ input: { sx: { borderRadius: 0 } } }} /></Grid>
                  <Grid size={{ xs: 12 }}><TextField fullWidth label="Phone (for M-Pesa / Tigo Pesa)" value={phone} onChange={(e) => setPhone(e.target.value)} slotProps={{ input: { sx: { borderRadius: 0 } } }} /></Grid>
                </Grid>
              </Box>
            )}

            {/* STEP 2: PAYMENT METHOD */}
            {activeStep === 2 && (
              <Box>
                <Typography variant="subtitle2" color="#1e293b" sx={{ fontWeight: "900", textTransform: 'uppercase', mb: 1.5, display: 'block', letterSpacing: '0.5px' }}>
                  Select Payment Method
                </Typography>
                <Grid container spacing={2} sx={{ mb: 4 }}>
                  <Grid size={{ xs: 6 }}>
                    <Button
                      fullWidth variant={paymentMethod === 'mobile' ? 'contained' : 'outlined'}
                      startIcon={<IconButton size="small"><PaymentsIcon /></IconButton>}
                      onClick={() => setPaymentMethod('mobile')}
                      sx={{ py: 2, borderRadius: 0, fontWeight: '900', border: '2px solid #1e293b', boxShadow: paymentMethod === 'mobile' ? '4px 4px 0px #0284c7' : '2px 2px 0px #1e293b', bgcolor: paymentMethod === 'mobile' ? '#0284c7' : 'white', color: paymentMethod === 'mobile' ? 'white' : '#1e293b' }}
                    >
                      Mobile Money
                    </Button>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Button
                      fullWidth variant={paymentMethod === 'card' ? 'contained' : 'outlined'}
                      startIcon={<IconButton size="small"><SecurityIcon /></IconButton>}
                      onClick={() => setPaymentMethod('card')}
                      sx={{ py: 2, borderRadius: 0, fontWeight: '900', border: '2px solid #1e293b', boxShadow: paymentMethod === 'card' ? '4px 4px 0px #0284c7' : '2px 2px 0px #1e293b', bgcolor: paymentMethod === 'card' ? '#0284c7' : 'white', color: paymentMethod === 'card' ? 'white' : '#1e293b' }}
                    >
                      Credit Card
                    </Button>
                  </Grid>
                </Grid>

                {paymentMethod === 'mobile' ? (
                  <Box sx={{ p: 3, border: '2.5px solid #1e293b', bgcolor: '#f8fafc' }}>
                    <Typography variant="caption" sx={{ fontWeight: "900", textTransform: 'uppercase', mb: 1, display: 'block' }}>Network Provider (Tanzania)</Typography>
                    <Grid container spacing={1}>
                      {['mpesa', 'tigopesa', 'airtelmoney', 'halopesa'].map((carrier) => (
                        <Grid size={{ xs: 3 }} key={carrier}>
                          <Box
                            onClick={() => setMobileCarrier(carrier)}
                            sx={{
                              p: 1, border: '2px solid #1e293b', textAlign: 'center', cursor: 'pointer',
                              bgcolor: mobileCarrier === carrier ? '#0284c7' : 'white',
                              color: mobileCarrier === carrier ? 'white' : '#1e293b',
                              fontWeight: 'bold', fontSize: '0.75rem', textTransform: 'uppercase'
                            }}
                          >
                            {carrier}
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                ) : (
                  <Box sx={{ p: 3, border: '2.5px solid #1e293b', bgcolor: '#f8fafc' }}>
                    <Typography variant="caption" sx={{ fontWeight: "900", textTransform: 'uppercase', mb: 1, display: 'block' }}>Card Details (Mock)</Typography>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12 }}>
                        <TextField 
                          fullWidth size="small" label="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value.replace(/[^0-9]/g, ''))} 
                          slotProps={{ input: { sx: { borderRadius: 0 } } }} 
                        />
                      </Grid>
                      <Grid size={{ xs: 6 }}>
                        <TextField 
                          fullWidth size="small" label="MM/YY" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} 
                          slotProps={{ input: { sx: { borderRadius: 0 } } }} 
                        />
                      </Grid>
                      <Grid size={{ xs: 6 }}>
                        <TextField 
                          fullWidth size="small" label="CVV" type="password" value={cardCvv} onChange={(e) => setCardCvv(e.target.value.replace(/[^0-9]/g, ''))} 
                          slotProps={{ input: { sx: { borderRadius: 0 } } }} 
                        />
                      </Grid>
                    </Grid>
                  </Box>
                )}
                
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', fontWeight: "700", mt: 3 }}>
                  Secured by Selcom Gateway Tanzania 🔒
                </Typography>
              </Box>
            )}

            {/* STEP 3: VERIFICATION */}
            {activeStep === 3 && (
              <Box sx={{ textAlign: 'center' }}>
                {!loading ? (
                  <>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: "900", textAlign: 'center' }}>📲 CHECK YOUR PHONE</Typography>
                    <Typography variant="body2" sx={{ textAlign: 'center', fontWeight: "700" }}>
                      We sent a prompt to <strong>{phone}</strong>. Enter the OTP code or the transaction ID to confirm your <strong>{formatCurrency(amount)}</strong> donation.
                    </Typography>
                    <TextField 
                      fullWidth label="6-Digit OTP" value={otpCode} onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ''))} 
                      slotProps={{ htmlInput: { maxLength: 6, style: { textAlign: 'center', letterSpacing: '8px', fontWeight: '900', fontSize: '1.5rem' } } }} 
                      sx={{ mb: 3, mt: 4 }} 
                    />
                    <Alert severity="info" sx={{ borderRadius: 0, border: '2px solid #1e293b', fontWeight: 'bold' }}>Reference: {transactionRef}</Alert>
                  </>
                ) : (
                  <Box sx={{ py: 4 }}>
                    <CircularProgress size={60} thickness={5} sx={{ color: '#0284c7', mb: 3 }} />
                    <Typography variant="h6" sx={{ fontWeight: "900", textTransform: 'uppercase' }}>Connecting...</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: "700", mt: 1 }}>Selcom API is validating your request.</Typography>
                  </Box>
                )}
              </Box>
            )}
          </>
        ) : (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
              <Box sx={{ width: 100, height: 100, bgcolor: 'success.light', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'success.dark', border: '4px solid', borderColor: 'success.dark', borderRadius: 0, boxShadow: '6px 6px 0px #1e293b' }}>
                <CheckCircleIcon sx={{ fontSize: 60 }} />
              </Box>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: "900", textTransform: 'uppercase', mb: 1 }}>Awesome!</Typography>
            <Typography variant="body1" sx={{ fontWeight: "800", mb: 3 }}>Thank you, {name || 'supporter'}! Your donation of {formatCurrency(amount)} was received.</Typography>
            <Box sx={{ p: 3, bgcolor: '#f0fdf4', border: '2.5px solid #166534', borderRadius: 0, textAlign: 'left', mb: 4 }}>
              <Typography variant="caption" sx={{ fontWeight: "900", display: 'block', textTransform: 'uppercase', mb: 1, color: 'grey.600' }}>Transaction Receipt</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}><Typography variant="caption" sx={{ fontWeight: "700" }}>Reference:</Typography><Typography variant="caption" sx={{ fontWeight: "900" }}>{transactionRef}</Typography></Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}><Typography variant="caption" sx={{ fontWeight: "700" }}>Date:</Typography><Typography variant="caption" sx={{ fontWeight: "900" }}>{new Date().toLocaleDateString()}</Typography></Box>
            </Box>
            <Button fullWidth variant="contained" onClick={handleCloseWrapper} sx={{ py: 2, borderRadius: 0, fontWeight: '900', bgcolor: 'secondary.dark' }}>Close Window</Button>
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
                px: 5, py: 1.5, borderRadius: 0, fontWeight: '900', bgcolor: '#0284c7', 
                border: BORDER, boxShadow: '4px 4px 0px #1e293b',
                '&:hover': { bgcolor: '#0369a1', transform: 'translate(-2px, -2px)', boxShadow: '6px 6px 0px #1e293b' }
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
