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
  regProfession, setRegProfession,
  onSubmitRegister,
  onDonateClick
}: HomeDialogsProps) {
  if (!selectedEvent) return null;

  const BORDER = "3px solid #1e293b";
  const SHADOW = "10px 10px 0px #1e293b";

  return (
    <>
      <Dialog 
        open={openRegister} 
        onClose={onCloseRegister} 
        maxWidth="xs" 
        fullWidth 
        slotProps={{ paper: { sx: { borderRadius: 0, border: BORDER, boxShadow: SHADOW } } }}
      >
        <form onSubmit={onSubmitRegister}>
          <DialogTitle sx={{ fontWeight: "900", pt: 3.5, px: 3, fontSize: "1.4rem", borderBottom: BORDER, mb: 2 }}> 
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
                <FormControl fullWidth>
                  <InputLabel>Your Skill/Role</InputLabel>
                  <Select value={regProfession} label="Your Skill/Role" onChange={(e) => setRegProfession(e.target.value as string)} sx={{ borderRadius: 0 }}>
                    <MenuItem value="Dentist">Licensed Dentist</MenuItem>
                    <MenuItem value="Hygienist">Dental Hygienist</MenuItem>
                    <MenuItem value="Nurse">Medical Nurse / Assistant</MenuItem>
                    <MenuItem value="General">General Coordinator / Helper</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3.5, pt: 1.5, display: "flex", gap: 1.5 }}> 
            <Button onClick={onCloseRegister} sx={{ borderRadius: 0, fontWeight: "900", textTransform: "none", px: 3, py: 1, border: "2px solid #1e293b", boxShadow: "4px 4px 0px #1e293b", color: "#1e293b", bgcolor: "white", "&:hover": { bgcolor: "#f0f9ff", transform: "translate(-2px, -2px)", boxShadow: "6px 6px 0px #1e293b" } }}>Cancel</Button> 
            <Button type="submit" variant="contained" sx={{ borderRadius: 0, fontWeight: "900", textTransform: "none", px: 3, py: 1, border: "2px solid #1e293b", boxShadow: "4px 4px 0px #1e293b", background: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)", color: "#ffffff", "&:hover": { background: "linear-gradient(135deg, #0369a1 0%, #0284c7 100%)", transform: "translate(-2px, -2px)", boxShadow: "6px 6px 0px #1e293b" } }}>Confirm Registration</Button> 
          </DialogActions> 
        </form> 
      </Dialog>

      <Dialog 
        open={openRegSuccess} 
        onClose={onCloseRegSuccess} 
        maxWidth="xs" 
        fullWidth 
        slotProps={{ paper: { sx: { borderRadius: 0, border: BORDER, boxShadow: SHADOW } } }}
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
          <Paper elevation={0} sx={{ p: 2.5, bgcolor: "#f0f9ff", border: "2px solid #1e293b", boxShadow: "4px 4px 0px #1e293b", borderRadius: 0, mb: 4, textAlign: "left" }}>
            <Typography variant="subtitle2" sx={{ fontWeight: "800", color: "secondary.dark", mb: 1 }}>Consider Making a Donation</Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', lineHeight: 1.5 }}>Your support on the ground is invaluable. If you are able, a small donation will go a long way in purchasing essential clinical supplies.</Typography>
          </Paper>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}> 
            <Button fullWidth variant="contained" onClick={() => { onCloseRegSuccess(); onDonateClick(); }} startIcon={<FavoriteIcon />} sx={{ py: 1.6, borderRadius: 0, fontWeight: "900", textTransform: "uppercase", letterSpacing: "1px", fontSize: "0.95rem", boxShadow: "4px 4px 0px #1e293b", border: "3px solid #1e293b", bgcolor: "#0284c7", color: "white", "&:hover": { bgcolor: "#0369a1", transform: "translate(-2px, -2px)", boxShadow: "6px 6px 0px #1e293b" } }}>Donate Now</Button> 
            <Button fullWidth variant="outlined" onClick={onCloseRegSuccess} sx={{ py: 1.4, borderRadius: 0, fontWeight: "900", textTransform: "none", fontSize: "0.9rem", border: "2px solid #1e293b", boxShadow: "2px 2px 0px #1e293b", color: "#1e293b", bgcolor: "white", "&:hover": { bgcolor: "#f0f9ff", transform: "translate(-1px, -1px)", boxShadow: "3px 3px 0px #1e293b" } }}>Close</Button> 
          </Box> 
        </DialogContent> 
      </Dialog>
    </>
  );
}
