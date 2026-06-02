import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Button,
  TextField,
  Typography,
  Grid,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  CircularProgress,
  InputAdornment,
  Divider,
  Card,
  CardActionArea,
  CardContent,
  Stepper,
  Step,
  StepLabel, Paper
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface DonateWidgetProps {
  open: boolean;
  onClose: () => void;
  defaultAmount?: string;
}

const PRESETS_TZS = ['10000', '25000', '50000', '100000', '250000'];
const PRESETS_USD = ['10', '25', '50', '100', '250'];

const STEPS = ['Amount', 'Payment Method', 'Details', 'Checkout'];

export default function DonateWidget({ open, onClose, defaultAmount }: DonateWidgetProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [currency, setCurrency] = useState<'TZS' | 'USD'>('TZS');
  const [amount, setAmount] = useState(defaultAmount || (currency === 'TZS' ? '50000' : '25'));
  const [customAmount, setCustomAmount] = useState('');
  const [paymentType, setPaymentType] = useState<'mobile' | 'bank' | 'selcom'>('mobile');
  const [mobileNetwork, setMobileNetwork] = useState('mpesa');
  const [bankName, setBankName] = useState('crdb');
  
  // Donor details
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  // Card details
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Checkout states
  const [checkoutState, setCheckoutState] = useState<'idle' | 'processing' | 'ussd_sent' | 'otp_sent' | 'success'>('idle');
  const [transactionRef, setTransactionRef] = useState('');
  const [otpCode, setOtpCode] = useState('');

  const handleCurrencyChange = (newCurrency: 'TZS' | 'USD') => {
    setCurrency(newCurrency);
    setAmount(newCurrency === 'TZS' ? '50000' : '25');
    setCustomAmount('');
  };

  const handlePresetSelect = (val: string) => {
    setAmount(val);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setCustomAmount(val);
    if (val) setAmount(val);
  };

  const getPresetList = () => {
    return currency === 'TZS' ? PRESETS_TZS : PRESETS_USD;
  };

  const formatCurrency = (val: string) => {
    const num = parseInt(val) || 0;
    if (currency === 'TZS') {
      return new Intl.NumberFormat('en-TZ', { style: 'currency', currency: 'TZS', maximumFractionDigits: 0 }).format(num);
    } else {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
    }
  };

  const handleNext = () => {
    if (activeStep < STEPS.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const handleStartCheckout = () => {
    setCheckoutState('processing');
    const ref = 'SWDR-' + Math.floor(10000000 + Math.random() * 90000000);
    setTransactionRef(ref);

    setTimeout(() => {
      if (paymentType === 'mobile') {
        setCheckoutState('ussd_sent');
      } else if (paymentType === 'bank') {
        setCheckoutState('otp_sent');
      } else {
        setCheckoutState('success');
      }
    }, 2000);
  };

  const handleSimulateUSSDConfirm = () => {
    setCheckoutState('processing');
    setTimeout(() => {
      setCheckoutState('success');
    }, 2000);
  };

  const handleVerifyOTP = () => {
    if (!otpCode) return;
    setCheckoutState('processing');
    setTimeout(() => {
      setCheckoutState('success');
    }, 2000);
  };

  const handleDownloadReceipt = () => {
    const receiptContent = `
=========================================
      SMILE WITH DR ROME CLINIC
            DONATION RECEIPT
=========================================
Date: ${new Date().toLocaleDateString()}
Transaction Ref: ${transactionRef}
Donor Name: ${name || 'Anonymous Supporters'}
Donor Email: ${email || 'N/A'}
Donor Phone: ${phone || 'N/A'}
-----------------------------------------
Donation Amount: ${formatCurrency(amount)}
Currency: ${currency}
Payment Gateway: Selcom Integrated API
Payment Channel: ${
      paymentType === 'mobile'
        ? `Mobile Money (${mobileNetwork.toUpperCase()})`
        : paymentType === 'bank'
        ? `Bank Payment (TZ Card Gateway)`
        : 'Selcom Pay QR / USSD'
    }
-----------------------------------------
Thank you for your warm heart! Your donation
directly supports dental treatments, surgeries,
and health education for children in need in
hard environments across Tanzania.
=========================================
Smile with Doctor Rome Dental Clinic.
"Restoring Health, Restoring Smiles."
    `;

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SWDR-Donation-Receipt-${transactionRef}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetWidget = () => {
    setActiveStep(0);
    setCheckoutState('idle');
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

  const neoButtonStyle = {
    borderRadius: 0,
    border: '2px solid #1e293b',
    boxShadow: '4px 4px 0px #1e293b',
    fontWeight: '900',
    transition: 'all 0.15s ease-in-out',
    '&:hover': {
      transform: 'translate(-2px, -2px)',
      boxShadow: '6px 6px 0px #1e293b',
    },
    '&:active': {
      transform: 'translate(1px, 1px)',
      boxShadow: '2px 2px 0px #1e293b',
    },
    '&.Mui-disabled': {
      borderColor: 'grey.300',
      boxShadow: 'none',
      bgcolor: 'grey.50'
    }
  };

  const neoCardStyle = (isActive: boolean) => ({
    borderRadius: 0,
    border: isActive ? '3px solid #0284c7' : '2px solid #1e293b',
    boxShadow: isActive ? '6px 6px 0px #0284c7' : '4px 4px 0px #1e293b',
    transition: 'all 0.2s ease',
    bgcolor: 'white',
    '&:hover': {
      borderColor: '#0284c7',
      boxShadow: '6px 6px 0px #0284c7',
    }
  });

  return (
    <Dialog 
      open={open} 
      onClose={handleCloseWrapper} 
      maxWidth="sm" 
      fullWidth 
      scroll="body"
      PaperProps={{
        sx: {
          borderRadius: 0,
          border: '3px solid #1e293b',
          boxShadow: '15px 15px 0px #1e293b',
          m: { xs: 1, sm: 3 }
        }
      }}
    >
      <DialogTitle sx={{ 
        m: 0, 
        p: 3, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        bgcolor: '#f0f9ff', 
        color: '#1e293b',
        borderBottom: '3px solid #1e293b'
      }}>
        <Typography variant="h5" fontWeight="900" sx={{ textTransform: 'uppercase', letterSpacing: '-0.5px' }}>
          Support Our Mission
        </Typography>
        <IconButton aria-label="close" onClick={handleCloseWrapper} sx={{ 
          color: '#1e293b',
          border: '2px solid #1e293b',
          borderRadius: 0,
          p: 0.5,
          '&:hover': { bgcolor: '#e0f2fe' }
        }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ p: { xs: 3, sm: 4 }, minHeight: 350 }}>
        <Box sx={{ width: '100%', mb: 4, mt: 1 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {STEPS.map((label) => (
              <Step key={label} sx={{ '& .MuiStepLabel-label': { fontWeight: '900', fontSize: '0.75rem', textTransform: 'uppercase' } }}>
                <StepLabel StepIconProps={{ 
                  sx: { 
                    '&.Mui-active, &.Mui-completed': { color: '#0284c7' },
                    borderRadius: 0
                  } 
                }}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {checkoutState === 'idle' && (
          <Box>
            {/* STEP 0: Select Amount */}
            {activeStep === 0 && (
              <Box>
                <Typography variant="subtitle2" fontWeight="900" color="#1e293b" sx={{ textTransform: 'uppercase', mb: 1.5, display: 'block', letterSpacing: '0.5px' }}>
                  1. Choose Currency
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                  <Button
                    variant={currency === 'TZS' ? 'contained' : 'outlined'}
                    onClick={() => handleCurrencyChange('TZS')}
                    fullWidth
                    sx={{ 
                      ...neoButtonStyle,
                      bgcolor: currency === 'TZS' ? '#0284c7' : 'white',
                      color: currency === 'TZS' ? 'white' : '#1e293b',
                      py: 1.5
                    }}
                  >
                    TZS (Tanzanian Shilling)
                  </Button>
                  <Button
                    variant={currency === 'USD' ? 'contained' : 'outlined'}
                    onClick={() => handleCurrencyChange('USD')}
                    fullWidth
                    sx={{ 
                      ...neoButtonStyle,
                      bgcolor: currency === 'USD' ? '#0284c7' : 'white',
                      color: currency === 'USD' ? 'white' : '#1e293b',
                      py: 1.5
                    }}
                  >
                    USD (US Dollar)
                  </Button>
                </Box>

                <Typography variant="subtitle2" fontWeight="900" color="#1e293b" sx={{ textTransform: 'uppercase', mb: 1.5, display: 'block', letterSpacing: '0.5px' }}>
                  2. Select Amount
                </Typography>
                <Grid container spacing={2} sx={{ mb: 4 }}>
                  {getPresetList().map((preset) => (
                    <Grid item xs={4} key={preset}>
                      <Button
                        onClick={() => handlePresetSelect(preset)}
                        fullWidth
                        sx={{
                          ...neoButtonStyle,
                          py: 1.5,
                          bgcolor: amount === preset && !customAmount ? '#e0f2fe' : 'white',
                          color: '#1e293b',
                          border: amount === preset && !customAmount ? '3px solid #0284c7' : '2px solid #1e293b',
                          boxShadow: amount === preset && !customAmount ? '4px 4px 0px #0284c7' : '4px 4px 0px #1e293b',
                        }}
                      >
                        {currency === 'TZS' ? `${parseInt(preset).toLocaleString()}` : `$${preset}`}
                      </Button>
                    </Grid>
                  ))}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Custom Donation Amount"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      InputProps={{
                        startAdornment: <InputAdornment position="start" sx={{ '& p': { fontWeight: '900', color: '#1e293b' } }}>{currency === 'TZS' ? 'TZS' : '$'}</InputAdornment>,
                        sx: { borderRadius: 0, fontWeight: '900' }
                      }}
                      sx={{ '& .MuiOutlinedInput-root': { border: '2px solid #1e293b', '& fieldset': { border: 'none' } } }}
                    />
                  </Grid>
                </Grid>

                <Paper elevation={0} sx={{ 
                  p: 2.5, 
                  bgcolor: '#f0f9ff', 
                  border: '2px solid #1e293b', 
                  boxShadow: '4px 4px 0px #0284c7',
                  borderRadius: 0
                }}>
                  <Typography variant="body2" fontWeight="700" sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, color: '#1e293b' }}>
                    <span style={{ fontSize: '1.2rem' }}>💡</span>
                    <span>
                      <strong>Impact:</strong> {currency === 'TZS' 
                        ? (parseInt(amount) >= 100000 
                          ? `This funds surgical materials for a child's facial or dental surgery!` 
                          : parseInt(amount) >= 50000 
                          ? `This covers the clinical treatment fees for 2 children.` 
                          : `This buys ${Math.floor(parseInt(amount)/10000)} pediatric dental hygiene outreach kits.`)
                        : (parseInt(amount) >= 50 
                          ? `This funds surgical materials for a child's dental surgery!` 
                          : parseInt(amount) >= 20 
                          ? `This covers clinical treatment fees for 2 children.` 
                          : `This buys ${Math.floor(parseInt(amount)/5)} pediatric dental hygiene outreach kits.`)
                      }
                    </span>
                  </Typography>
                </Paper>
              </Box>
            )}

            {/* STEP 1: Payment Method */}
            {activeStep === 1 && (
              <Box>
                <Typography variant="subtitle2" fontWeight="900" color="#1e293b" sx={{ textTransform: 'uppercase', mb: 2, display: 'block', letterSpacing: '0.5px' }}>
                  Choose Payment Channel
                </Typography>
                
                <Grid container spacing={2} sx={{ mb: 4 }}>
                  <Grid item xs={4}>
                    <Card sx={neoCardStyle(paymentType === 'mobile')}>
                      <CardActionArea onClick={() => setPaymentType('mobile')} sx={{ p: 2, textAlign: 'center' }}>
                        <PhoneAndroidIcon sx={{ fontSize: 32, mb: 1, color: '#1e293b' }} />
                        <Typography variant="caption" fontWeight="900" sx={{ display: 'block', textTransform: 'uppercase' }}>Mobile</Typography>
                      </CardActionArea>
                    </Card>
                  </Grid>

                  <Grid item xs={4}>
                    <Card sx={neoCardStyle(paymentType === 'bank')}>
                      <CardActionArea onClick={() => setPaymentType('bank')} sx={{ p: 2, textAlign: 'center' }}>
                        <CreditCardIcon sx={{ fontSize: 32, mb: 1, color: '#1e293b' }} />
                        <Typography variant="caption" fontWeight="900" sx={{ display: 'block', textTransform: 'uppercase' }}>Cards</Typography>
                      </CardActionArea>
                    </Card>
                  </Grid>

                  <Grid item xs={4}>
                    <Card sx={neoCardStyle(paymentType === 'selcom')}>
                      <CardActionArea onClick={() => setPaymentType('selcom')} sx={{ p: 2, textAlign: 'center' }}>
                        <QrCode2Icon sx={{ fontSize: 32, mb: 1, color: '#1e293b' }} />
                        <Typography variant="caption" fontWeight="900" sx={{ display: 'block', textTransform: 'uppercase' }}>Selcom</Typography>
                      </CardActionArea>
                    </Card>
                  </Grid>
                </Grid>

                {paymentType === 'mobile' && (
                  <FormControl component="fieldset" sx={{ width: '100%' }}>
                    <FormLabel component="legend" sx={{ fontWeight: '900', mb: 2, color: '#1e293b', fontSize: '0.85rem', textTransform: 'uppercase' }}>Select Network</FormLabel>
                    <RadioGroup 
                      value={mobileNetwork} 
                      onChange={(e) => setMobileNetwork(e.target.value)}
                      sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
                    >
                      {[
                        { val: 'mpesa', label: 'Vodacom M-Pesa', color: '#e11d48' },
                        { val: 'tigopesa', label: 'Tigo Pesa', color: '#2563eb' },
                        { val: 'airtelmoney', label: 'Airtel Money', color: '#dc2626' },
                        { val: 'halopesa', label: 'Halopesa', color: '#ea580c' }
                      ].map((net) => (
                        <FormControlLabel 
                          key={net.val}
                          value={net.val} 
                          control={<Radio sx={{ color: '#1e293b', '&.Mui-checked': { color: '#0284c7' } }} />} 
                          label={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 1, border: '1px solid #e2e8f0', width: '100%', minWidth: 200 }}>
                              <Box sx={{ width: 14, height: 14, borderRadius: 0, bgcolor: net.color, border: '1px solid #1e293b' }} />
                              <Typography variant="body2" fontWeight="700">{net.label}</Typography>
                            </Box>
                          } 
                          sx={{ m: 0, mb: 1 }}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                )}

                {paymentType === 'bank' && (
                  <FormControl component="fieldset" sx={{ width: '100%' }}>
                    <FormLabel component="legend" sx={{ fontWeight: '900', mb: 2, color: '#1e293b', fontSize: '0.85rem', textTransform: 'uppercase' }}>Select Gateway</FormLabel>
                    <RadioGroup 
                      value={bankName} 
                      onChange={(e) => setBankName(e.target.value)}
                      sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
                    >
                      {['crdb', 'nmb', 'international'].map((bank) => (
                        <FormControlLabel 
                          key={bank}
                          value={bank} 
                          control={<Radio sx={{ color: '#1e293b', '&.Mui-checked': { color: '#0284c7' } }} />} 
                          label={
                            <Box sx={{ p: 1.5, border: '1px solid #e2e8f0', width: '100%', minWidth: 240 }}>
                              <Typography variant="body2" fontWeight="700">
                                {bank === 'international' ? 'Visa / MasterCard Gateway' : `${bank.toUpperCase()} Bank Gateway`}
                              </Typography>
                            </Box>
                          }
                          sx={{ m: 0, mb: 1 }}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                )}

                {paymentType === 'selcom' && (
                  <Box sx={{ p: 2.5, bgcolor: '#f0fdf4', border: '2px solid #1e293b', boxShadow: '4px 4px 0px #22c55e', borderRadius: 0 }}>
                    <Typography variant="body2" fontWeight="700" color="#1e293b">
                      ✅ <strong>Selcom Pay Enabled:</strong> Securely pay via any card or local USSD/QR channel through a unified portal.
                    </Typography>
                  </Box>
                )}
              </Box>
            )}

            {/* STEP 2: Donor Details */}
            {activeStep === 2 && (
              <Box>
                <Typography variant="subtitle2" fontWeight="900" color="#1e293b" sx={{ textTransform: 'uppercase', mb: 2.5, display: 'block', letterSpacing: '0.5px' }}>
                  Enter Information
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      placeholder="e.g. John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      InputProps={{ sx: { borderRadius: 0, fontWeight: '700' } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      InputProps={{ sx: { borderRadius: 0, fontWeight: '700' } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label={paymentType === 'mobile' ? 'Mobile Number' : 'Phone Number'}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      InputProps={{
                        startAdornment: paymentType === 'mobile' ? (
                          <InputAdornment position="start" sx={{ '& p': { fontWeight: '900', color: '#1e293b' } }}>+255</InputAdornment>
                        ) : null,
                        sx: { borderRadius: 0, fontWeight: '700' }
                      }}
                      required={paymentType === 'mobile'}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}

            {/* STEP 3: Checkout Details Confirmation */}
            {activeStep === 3 && (
              <Box>
                <Typography variant="subtitle2" fontWeight="900" color="#1e293b" sx={{ textTransform: 'uppercase', mb: 2, display: 'block', letterSpacing: '0.5px' }}>
                  Summary
                </Typography>

                <Box sx={{ bgcolor: '#f8fafc', p: 3, borderRadius: 0, border: '2px solid #1e293b', boxShadow: '4px 4px 0px #1e293b', mb: 4 }}>
                  <Grid container spacing={2}>
                    {[
                      { label: 'Amount:', val: formatCurrency(amount), highlight: true },
                      { label: 'Gateway:', val: paymentType === 'mobile' ? `Mobile (${mobileNetwork.toUpperCase()})` : paymentType === 'bank' ? `Bank (${bankName.toUpperCase()})` : 'Selcom Unified' },
                      { label: 'Donor:', val: name || 'Anonymous' },
                      { label: 'Contact:', val: paymentType === 'mobile' ? `+255 ${phone}` : phone || 'N/A' }
                    ].map((row) => (
                      <React.Fragment key={row.label}>
                        <Grid item xs={5}>
                          <Typography fontWeight="900" variant="caption" sx={{ textTransform: 'uppercase', color: 'grey.600' }}>{row.label}</Typography>
                        </Grid>
                        <Grid item xs={7} sx={{ textAlign: 'right' }}>
                          <Typography variant="body2" fontWeight="900" color={row.highlight ? '#0284c7' : '#1e293b'}>{row.val}</Typography>
                        </Grid>
                      </React.Fragment>
                    ))}
                  </Grid>
                </Box>

                {paymentType === 'bank' && ( activeStep === 3 && (
                  <Box sx={{ mb: 3, p: 2, border: '1px solid #1e293b' }}>
                    <Typography variant="caption" fontWeight="900" sx={{ textTransform: 'uppercase', mb: 1, display: 'block' }}>Card Details (Mock)</Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField fullWidth size="small" label="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value.replace(/[^0-9]/g, ''))} InputProps={{ sx: { borderRadius: 0 } }} />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField fullWidth size="small" label="MM/YY" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} InputProps={{ sx: { borderRadius: 0 } }} />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField fullWidth size="small" label="CVV" type="password" value={cardCvv} onChange={(e) => setCardCvv(e.target.value.replace(/[^0-9]/g, ''))} InputProps={{ sx: { borderRadius: 0 } }} />
                      </Grid>
                    </Grid>
                  </Box>
                ))}

                <Typography variant="caption" color="text.secondary" display="block" align="center" fontWeight="700">
                  🔐 Secure 256-bit SSL Encrypted Transaction
                </Typography>
              </Box>
            )}

            {/* Navigation buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 5, gap: 2 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ ...neoButtonStyle, flex: 1, bgcolor: 'white', color: '#1e293b' }}
              >
                Back
              </Button>
              {activeStep < STEPS.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={activeStep === 2 && paymentType === 'mobile' && !phone}
                  sx={{ ...neoButtonStyle, flex: 2, bgcolor: '#1e293b', color: 'white', '&:hover': { bgcolor: '#0f172a' } }}
                >
                  Continue
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleStartCheckout}
                  sx={{ ...neoButtonStyle, flex: 2, bgcolor: '#0284c7', color: 'white' }}
                >
                  Confirm & Donate
                </Button>
              )}
            </Box>
          </Box>
        )}

        {/* --- PROCESS SIMULATION STAGES --- */}
        
        {checkoutState === 'processing' && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 8 }}>
            <CircularProgress size={64} thickness={5} sx={{ mb: 4, color: '#1e293b' }} />
            <Typography variant="h6" fontWeight="900" sx={{ textTransform: 'uppercase' }}>Connecting...</Typography>
            <Typography variant="body2" color="text.secondary" fontWeight="700" sx={{ mt: 1 }}>Selcom API is validating your request.</Typography>
          </Box>
        )}

        {checkoutState === 'ussd_sent' && (
          <Box sx={{ py: 2 }}>
            <Box sx={{ p: 4, bgcolor: '#fefce8', border: '3px solid #1e293b', boxShadow: '6px 6px 0px #ca8a04', mb: 4 }}>
              <Typography variant="h6" fontWeight="900" gutterBottom align="center">📲 CHECK YOUR PHONE</Typography>
              <Typography variant="body2" align="center" fontWeight="700">
                A USSD Push has been sent to <strong>+255 {phone}</strong>. Enter your Mobile Money PIN now.
              </Typography>
            </Box>
            <Button fullWidth variant="contained" onClick={handleSimulateUSSDConfirm} sx={{ ...neoButtonStyle, bgcolor: '#0284c7', color: 'white', py: 1.5 }}>
              I have entered my PIN
            </Button>
          </Box>
        )}

        {checkoutState === 'otp_sent' && (
          <Box sx={{ py: 2 }}>
            <Box sx={{ p: 3, border: '3px solid #1e293b', boxShadow: '6px 6px 0px #1e293b', mb: 3 }}>
              <Typography variant="h6" fontWeight="900" align="center" gutterBottom>🔒 VERIFICATION</Typography>
              <Typography variant="body2" align="center" fontWeight="700" color="text.secondary" sx={{ mb: 3 }}>Enter the OTP code sent to your device.</Typography>
              <TextField fullWidth label="6-Digit OTP" value={otpCode} onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ''))} inputProps={{ maxLength: 6, style: { textAlign: 'center', letterSpacing: '8px', fontWeight: '900', fontSize: '1.5rem' } }} sx={{ mb: 3 }} />
              <Button fullWidth onClick={handleVerifyOTP} disabled={otpCode.length < 4} sx={{ ...neoButtonStyle, bgcolor: '#0284c7', color: 'white', py: 1.5 }}>Verify & Authorize</Button>
            </Box>
          </Box>
        )}

        {checkoutState === 'success' && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 2, textAlign: 'center' }}>
            <Box sx={{ width: 80, height: 80, bgcolor: '#f0fdf4', border: '3px solid #1e293b', boxShadow: '6px 6px 0px #22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
              <CheckCircleIcon sx={{ fontSize: 48, color: '#16a34a' }} />
            </Box>
            <Typography variant="h4" fontWeight="900" sx={{ textTransform: 'uppercase', mb: 1 }}>Awesome!</Typography>
            <Typography variant="body1" fontWeight="800" sx={{ mb: 3 }}>Thank you, {name || 'supporter'}! Your donation of {formatCurrency(amount)} was received.</Typography>
            
            <Box sx={{ bgcolor: 'white', p: 2.5, border: '2px solid #1e293b', boxShadow: '4px 4px 0px #1e293b', width: '100%', mb: 4, textAlign: 'left' }}>
              <Typography variant="caption" fontWeight="900" sx={{ display: 'block', textTransform: 'uppercase', mb: 1, color: 'grey.600' }}>Transaction Receipt</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}><Typography variant="caption" fontWeight="700">Reference:</Typography><Typography variant="caption" fontWeight="900">{transactionRef}</Typography></Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}><Typography variant="caption" fontWeight="700">Date:</Typography><Typography variant="caption" fontWeight="900">{new Date().toLocaleDateString()}</Typography></Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
              <Button fullWidth onClick={handleDownloadReceipt} sx={{ ...neoButtonStyle, bgcolor: 'white', color: '#1e293b', py: 1.5 }}>Receipt</Button>
              <Button fullWidth onClick={handleCloseWrapper} sx={{ ...neoButtonStyle, bgcolor: '#1e293b', color: 'white', py: 1.5 }}>Finish</Button>
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}
