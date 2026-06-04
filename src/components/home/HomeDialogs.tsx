import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import type { ClinicEvent } from '../../utils/mockData';

interface HomeDialogsProps {
  openRegister: boolean;
  onCloseRegister: () => void;
  openRegSuccess: boolean;
  onCloseRegSuccess: () => void;
  selectedEvent: ClinicEvent | null;
  regName: string;
  setRegName: (val: string) => void;
  regEmail: string;
  setRegEmail: (val: string) => void;
  regPhone: string;
  setRegPhone: (val: string) => void;
  regProfession: string;
  setRegProfession: (val: string) => void;
  onSubmitRegister: (e: React.FormEvent) => void;
  onDonateClick: () => void;
}

export default function HomeDialogs({
  openRegister, onCloseRegister,
  openRegSuccess, onCloseRegSuccess,
  selectedEvent,
  regName, setRegName,
  regEmail, setRegEmail,
  regPhone, setRegPhone,
  regProfession, setRegProfession,
  onSubmitRegister,
  onDonateClick
}: HomeDialogsProps) {
  if (!selectedEvent) return null;

  return (
    <>
      <Dialog 
        open={openRegister} 
        onClose={onCloseRegister} 
        maxWidth="xs" 
        fullWidth 
        slotProps={{ paper: { sx: { borderRadius: 2, border: '1px solid #e2e8f0', boxShadow: '0 20px 50px rgba(0,0,0,0.12)' } } }}
      >
        <form onSubmit={onSubmitRegister}>
          <DialogTitle sx={{ fontWeight: "900", pt: 3.5, px: 3, fontSize: "1.4rem", borderBottom: '1px solid #e2e8f0', mb: 2 }}> 
            Volunteer for Charity 
          </DialogTitle>
          <DialogContent sx={{ px: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.6 }}>
              Register to assist Dr. Rome's team during the <strong>{selectedEvent.title}</strong> on <strong>{selectedEvent.date}</strong>. 
            </Typography>

            <Grid container spacing={2.5}>
              <Grid size={{ xs: 12 }}>
                <TextField 
                  fullWidth label="Full Name" required value={regName} onChange={(e) => setRegName(e.target.value)} 
                  slotProps={{ input: { sx: { borderRadius: 0 } } }} 
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField 
                  fullWidth label="Email Address" type="email" required value={regEmail} onChange={(e) => setRegEmail(e.target.value)} 
                  slotProps={{ input: { sx: { borderRadius: 0 } } }} 
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField 
                  fullWidth label="Phone Number" required value={regPhone} onChange={(e) => setRegPhone(e.target.value)} 
                  slotProps={{ input: { sx: { borderRadius: 0 } } }} 
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <FormControl fullWidth>
                  <InputLabel>Your Skill/Role</InputLabel>
                  <Select 
                    value={['Dentist', 'Hygienist', 'Nurse', 'General'].includes(regProfession) ? regProfession : 'Other'} 
                    label="Your Skill/Role" 
                    onChange={(e) => {
                      const val = e.target.value as string;
                      if (val === 'Other') {
                        setRegProfession('');
                      } else {
                        setRegProfession(val);
                      }
                    }} 
                    sx={{ borderRadius: 1 }}
                  >
                    <MenuItem value="Dentist">Licensed Dentist</MenuItem>
                    <MenuItem value="Hygienist">Dental Hygienist</MenuItem>
                    <MenuItem value="Nurse">Medical Nurse / Assistant</MenuItem>
                    <MenuItem value="General">General Coordinator / Helper</MenuItem>
                    <MenuItem value="Other">Other / Custom Skill</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {!['Dentist', 'Hygienist', 'Nurse', 'General'].includes(regProfession) && (
                <Grid size={{ xs: 12 }}>
                  <TextField 
                    fullWidth 
                    label="Specify Skill / Profession" 
                    required 
                    value={regProfession} 
                    onChange={(e) => setRegProfession(e.target.value)} 
                    slotProps={{ input: { sx: { borderRadius: 1 } } }} 
                  />
                </Grid>
              )}
            </Grid>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3.5, pt: 1.5, display: "flex", gap: 1.5 }}> 
            <Button onClick={onCloseRegister} sx={{ borderRadius: 2, fontWeight: "900", textTransform: "none", px: 3, py: 1, border: "1px solid #e2e8f0", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", color: "#1e293b", bgcolor: "white", "&:hover": { bgcolor: "#f0f9ff", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" } }}>Cancel</Button> 
            <Button type="submit" variant="contained" sx={{ borderRadius: 2, fontWeight: "900", textTransform: "none", px: 3, py: 1, boxShadow: "0 2px 8px rgba(2,132,199,0.3)", background: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)", color: "#ffffff", "&:hover": { background: "linear-gradient(135deg, #0369a1 0%, #0284c7 100%)", boxShadow: "0 4px 14px rgba(2,132,199,0.4)" } }}>Confirm Registration</Button> 
          </DialogActions> 
        </form> 
      </Dialog>

      <Dialog 
        open={openRegSuccess} 
        onClose={onCloseRegSuccess} 
        maxWidth="xs" 
        fullWidth 
        slotProps={{ paper: { sx: { borderRadius: 2, border: '1px solid #e2e8f0', boxShadow: '0 20px 50px rgba(0,0,0,0.12)' } } }}
      >
        <DialogContent sx={{ p: 4, textAlign: 'center' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Box sx={{ width: 70, height: 70, bgcolor: 'success.light', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'success.dark', border: '2px solid', borderColor: 'success.dark' }}>
              <CheckCircleIcon sx={{ fontSize: 40 }} />
            </Box>
          </Box>
          <Typography variant="h5" sx={{ fontWeight: "900", color: 'text.primary', mb: 2 }}>You're Registered!</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3.5, lineHeight: 1.6 }}>
            Thank you for volunteering! Your registration for <strong>{selectedEvent.title}</strong> is confirmed.
          </Typography>
          <Paper elevation={0} sx={{ p: 2.5, bgcolor: "#f0f9ff", border: "1px solid #bae6fd", boxShadow: "0 2px 8px rgba(2,132,199,0.1)", borderRadius: 2, mb: 4, textAlign: "left" }}>
            <Typography variant="subtitle2" sx={{ fontWeight: "800", color: "secondary.dark", mb: 1 }}>Consider Making a Donation</Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', lineHeight: 1.5 }}>Your support on the ground is invaluable. If you are able, a small donation will go a long way in purchasing essential clinical supplies.</Typography>
          </Paper>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}> 
            <Button fullWidth variant="contained" onClick={() => { onCloseRegSuccess(); onDonateClick(); }} startIcon={<FavoriteIcon />} sx={{ py: 1.6, borderRadius: 2, fontWeight: "900", textTransform: "uppercase", letterSpacing: "1px", fontSize: "0.95rem", boxShadow: "0 2px 8px rgba(2,132,199,0.3)", bgcolor: "#0284c7", color: "white", "&:hover": { bgcolor: "#0369a1", boxShadow: "0 4px 14px rgba(2,132,199,0.4)" } }}>Donate Now</Button> 
            <Button fullWidth variant="outlined" onClick={onCloseRegSuccess} sx={{ py: 1.4, borderRadius: 2, fontWeight: "900", textTransform: "none", fontSize: "0.9rem", border: "1px solid #e2e8f0", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", color: "#1e293b", bgcolor: "white", "&:hover": { bgcolor: "#f0f9ff", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" } }}>Close</Button> 
          </Box> 
        </DialogContent> 
      </Dialog>
    </>
  );
}
