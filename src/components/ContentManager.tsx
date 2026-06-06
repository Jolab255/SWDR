import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Chip,
  Alert,
  Divider
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import GroupsIcon from '@mui/icons-material/Groups';

import {
  getStoredEvents,
  saveStoredEvents,
  getStoredNews,
  saveStoredNews,
  getStoredImpact,
  saveStoredImpact,
  getStoredTeam,
  saveStoredTeam,
} from '../utils/mockData';
import type {
  ClinicEvent,
  NewsArticle,
  ImpactStory,
  TeamMember
} from '../utils/mockData';

export default function ContentManager() {
  const [tabIndex, setTabIndex] = useState(0); // 0=Events, 1=News, 2=Impact, 3=Team
  const [events, setEvents] = useState<ClinicEvent[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [impact, setImpact] = useState<ImpactStory[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');
  const [editId, setEditId] = useState<string | null>(null);

  // Unified Form Fields
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('Dr. Jerome Rome');
  const [imagePreset, setImagePreset] = useState('/images/swdr_hero.webp');
  const [customImage, setCustomImage] = useState('');
  
  // New Fields for Team & Impact
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [tag, setTag] = useState('');
  const [linkedin, setLinkedin] = useState('#');
  const [instagram, setInstagram] = useState('#');

  // Categories
  const [eventCategory, setEventCategory] = useState<'Charity' | 'Surgery' | 'Fundraiser' | 'Workshop'>('Charity');
  const [newsCategory, setNewsCategory] = useState<'Success Story' | 'Health Advice' | 'Clinic News'>('Clinic News');
  
  const [slotsTotal, setSlotsTotal] = useState(100);
  const [slotsRegistered, setSlotsRegistered] = useState(0);

  const [alertMsg, setAlertMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const BORDER = '3px solid #1e293b';

  useEffect(() => {
    setEvents(getStoredEvents());
    setNews(getStoredNews());
    setImpact(getStoredImpact());
    setTeam(getStoredTeam());
  }, []);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
    setAlertMsg(null);
  };

  const resetForm = () => {
    setTitle('');
    setDate(new Date().toISOString().split('T')[0]);
    setTime('09:00 AM - 04:00 PM');
    setLocation('');
    setDescription('');
    setSummary('');
    setContent('');
    setAuthor('Dr. Jerome Rome');
    setImagePreset('/images/swdr_hero.webp');
    setCustomImage('');
    setEventCategory('Charity');
    setNewsCategory('Clinic News');
    setSlotsTotal(100);
    setSlotsRegistered(0);
    setName('');
    setRole('');
    setTag('');
    setLinkedin('#');
    setInstagram('#');
  };

  const handleOpenAdd = () => {
    setDialogMode('add');
    setEditId(null);
    resetForm();
    setOpenDialog(true);
  };

  const handleOpenEdit = (item: any) => {
    setDialogMode('edit');
    setEditId(item.id);
    
    // Base fields
    setTitle(item.title || '');
    setDate(item.date || '');
    
    const imgUrl = item.image || '';
    if (imgUrl.startsWith('/images/')) {
      setImagePreset(imgUrl);
      setCustomImage('');
    } else {
      setImagePreset('custom');
      setCustomImage(imgUrl);
    }

    if (tabIndex === 0) {
      const ev = item as ClinicEvent;
      setTime(ev.time);
      setLocation(ev.location);
      setDescription(ev.description);
      setEventCategory(ev.category);
      setSlotsTotal(ev.slotsTotal);
      setSlotsRegistered(ev.slotsRegistered);
    } else if (tabIndex === 1) {
      const nw = item as NewsArticle;
      setAuthor(nw.author);
      setSummary(nw.summary);
      setContent(nw.content);
      setNewsCategory(nw.category);
    } else if (tabIndex === 2) {
      const im = item as ImpactStory;
      setDescription(im.description);
    } else if (tabIndex === 3) {
      const tm = item as TeamMember;
      setName(tm.name);
      setRole(tm.role);
      setTag(tm.tag);
      setDescription(tm.desc);
      setLinkedin(tm.socials.linkedin);
      setInstagram(tm.socials.instagram);
    }
    
    setOpenDialog(true);
  };

  const handleDelete = (id: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    if (tabIndex === 0) {
      const updated = events.filter(e => e.id !== id);
      setEvents(updated);
      saveStoredEvents(updated);
    } else if (tabIndex === 1) {
      const updated = news.filter(n => n.id !== id);
      setNews(updated);
      saveStoredNews(updated);
    } else if (tabIndex === 2) {
      const updated = impact.filter(i => i.id !== id);
      setImpact(updated);
      saveStoredImpact(updated);
    } else {
      const updated = team.filter(t => t.id !== id);
      setTeam(updated);
      saveStoredTeam(updated);
    }
    setAlertMsg({ type: 'success', text: 'Item successfully deleted!' });
  };

  const handleSave = () => {
    const finalImage = imagePreset === 'custom' ? customImage || '/images/swdr_hero.webp' : imagePreset;

    if (tabIndex === 0) {
      const updated = dialogMode === 'add' 
        ? [{ id: 'evt-' + Date.now(), title, date, time, location, description, category: eventCategory, image: finalImage, slotsTotal, slotsRegistered }, ...events]
        : events.map(ev => ev.id === editId ? { ...ev, title, date, time, location, description, category: eventCategory, image: finalImage, slotsTotal, slotsRegistered } : ev);
      setEvents(updated);
      saveStoredEvents(updated);
    } else if (tabIndex === 1) {
      const updated = dialogMode === 'add'
        ? [{ id: 'news-' + Date.now(), title, date, author, summary, content, category: newsCategory, image: finalImage }, ...news]
        : news.map(nw => nw.id === editId ? { ...nw, title, date, author, summary, content, category: newsCategory, image: finalImage } : nw);
      setNews(updated);
      saveStoredNews(updated);
    } else if (tabIndex === 2) {
      const updated = dialogMode === 'add'
        ? [{ id: 'impact-' + Date.now(), title, location, date, description, image: finalImage }, ...impact]
        : impact.map(im => im.id === editId ? { ...im, title, location, date, description, image: finalImage } : im);
      setImpact(updated);
      saveStoredImpact(updated);
    } else {
      const updated = dialogMode === 'add'
        ? [{ id: 'team-' + Date.now(), name, role, tag, desc: description, image: finalImage, socials: { linkedin, instagram } }, ...team]
        : team.map(tm => tm.id === editId ? { ...tm, name, role, tag, desc: description, image: finalImage, socials: { linkedin, instagram } } : tm);
      setTeam(updated);
      saveStoredTeam(updated);
    }

    setAlertMsg({ type: 'success', text: 'Changes saved successfully!' });
    setOpenDialog(false);
  };

  const renderCard = (item: any, type: string) => (
    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          border: BORDER,
          boxShadow: '6px 6px 0px #1e293b',
          bgcolor: 'white',
          overflow: 'hidden',
          transition: 'all 0.1s ease',
          '&:hover': {
            transform: 'translate(-2px, -2px)',
            boxShadow: '8px 8px 0px #be185d',
          }
        }}
      >
        <Box 
          component="img" 
          src={item.image} 
          sx={{ height: 160, width: '100%', objectFit: 'cover', borderBottom: BORDER }} 
        />
        <Box sx={{ p: 2.5, flexGrow: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
            <Chip 
              label={item.category || (type === 'team' ? 'Team' : 'Impact')} 
              size="small" 
              sx={{ fontWeight: '900', borderRadius: 0, border: '2px solid #1e293b', bgcolor: '#fdf2f8' }} 
            />
            {item.date && <Typography variant="caption" sx={{ fontWeight: 700 }}>📅 {item.date}</Typography>}
          </Box>
          <Typography variant="subtitle1" sx={{ fontWeight: '900', textTransform: 'uppercase', mb: 1, color: '#1e293b', minHeight: 40, lineHeight: 1.2 }}>
            {item.title || item.name}
          </Typography>
          <Typography variant="body2" sx={{ color: '#475569', mb: 2, height: 60, overflow: 'hidden', textAlign: 'justify' }}>
            {item.description || item.summary || item.desc}
          </Typography>
          
          <Divider sx={{ mb: 2, borderBottomWidth: 2, borderColor: '#e2e8f0' }} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <IconButton 
              size="small" 
              onClick={() => handleOpenEdit(item)}
              sx={{ border: '2px solid #1e293b', borderRadius: 0, bgcolor: '#fdf2f8', color: '#be185d' }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton 
              size="small" 
              onClick={() => handleDelete(item.id)}
              sx={{ border: '2px solid #1e293b', borderRadius: 0, bgcolor: '#fff1f2', color: '#e11d48' }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Grid>
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: '900', textTransform: 'uppercase', color: '#1e293b' }}>
            Content Management
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
            Manage events, news, impact glimpses, and team members.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenAdd}
          sx={{ 
            borderRadius: 0, px: 3, py: 1.2, 
            fontWeight: '900', bgcolor: '#be185d',
            border: BORDER, boxShadow: '4px 4px 0px #1e293b',
            '&:hover': { bgcolor: '#9d174d', transform: 'translate(-2px, -2px)', boxShadow: '6px 6px 0px #1e293b' }
          }}
        >
          Add {tabIndex === 0 ? 'Event' : tabIndex === 1 ? 'Article' : tabIndex === 2 ? 'Impact' : 'Member'}
        </Button>
      </Box>

      {alertMsg && (
        <Alert 
          severity={alertMsg.type} 
          onClose={() => setAlertMsg(null)} 
          sx={{ mb: 4, borderRadius: 0, border: BORDER, boxShadow: '4px 4px 0px #1e293b', fontWeight: 'bold' }}
        >
          {alertMsg.text}
        </Alert>
      )}

      <Tabs 
        value={tabIndex} 
        onChange={handleTabChange} 
        variant="scrollable"
        scrollButtons="auto"
        sx={{ 
          mb: 5, 
          '& .MuiTabs-indicator': { height: 4, bgcolor: '#be185d' },
          '& .MuiTab-root': { 
            py: 2, fontSize: '0.85rem', fontWeight: '900', textTransform: 'uppercase', color: '#64748b',
            '&.Mui-selected': { color: '#1e293b' }
          } 
        }}
      >
        <Tab icon={<CalendarMonthIcon />} iconPosition="start" label="Events" />
        <Tab icon={<NewspaperIcon />} iconPosition="start" label="News" />
        <Tab icon={<AutoGraphIcon />} iconPosition="start" label="Impact" />
        <Tab icon={<GroupsIcon />} iconPosition="start" label="Team" />
      </Tabs>

      <Grid container spacing={3}>
        {tabIndex === 0 && events.map(ev => renderCard(ev, 'event'))}
        {tabIndex === 1 && news.map(nw => renderCard(nw, 'news'))}
        {tabIndex === 2 && impact.map(im => renderCard(im, 'impact'))}
        {tabIndex === 3 && team.map(tm => renderCard(tm, 'team'))}
      </Grid>

      {/* --- ADD/EDIT ITEM DIALOG FORM --- */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)} 
        maxWidth="md" 
        fullWidth 
        scroll="body"
        slotProps={{ paper: { sx: { borderRadius: 0, border: BORDER, boxShadow: '15px 15px 0px #1e293b' } } }}
      >
        <DialogTitle sx={{ fontWeight: '900', textTransform: 'uppercase', borderBottom: BORDER, bgcolor: '#fdf2f8' }}>
          {dialogMode === 'add' ? 'Create New Entry' : 'Update Existing Entry'}
        </DialogTitle>
        
        <DialogContent sx={{ p: 4, mt: 2 }}>
          <Grid container spacing={3}>
            {/* Title / Name Field */}
            <Grid size={{ xs: 12, md: tabIndex === 3 ? 6 : 12 }}>
              <TextField
                fullWidth
                label={tabIndex === 3 ? "Full Name" : "Title"}
                value={tabIndex === 3 ? name : title}
                onChange={(e) => tabIndex === 3 ? setName(e.target.value) : setTitle(e.target.value)}
                slotProps={{ input: { sx: { borderRadius: 0, border: BORDER, '& .MuiOutlinedInput-notchedOutline': { border: 'none' } } } }}
              />
            </Grid>

            {/* Team Specific Fields */}
            {tabIndex === 3 && (
              <>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Role / Position"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    slotProps={{ input: { sx: { borderRadius: 0, border: BORDER, '& .MuiOutlinedInput-notchedOutline': { border: 'none' } } } }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Specialization Tag"
                    placeholder="e.g. MUHAS · UCSF"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    slotProps={{ input: { sx: { borderRadius: 0, border: BORDER, '& .MuiOutlinedInput-notchedOutline': { border: 'none' } } } }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                  <TextField
                    fullWidth
                    label="LinkedIn"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    slotProps={{ input: { sx: { borderRadius: 0, border: BORDER, '& .MuiOutlinedInput-notchedOutline': { border: 'none' } } } }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                  <TextField
                    fullWidth
                    label="Instagram"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    slotProps={{ input: { sx: { borderRadius: 0, border: BORDER, '& .MuiOutlinedInput-notchedOutline': { border: 'none' } } } }}
                  />
                </Grid>
              </>
            )}

            {/* Event Specific Fields */}
            {tabIndex === 0 && (
              <>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    fullWidth label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)}
                    slotProps={{ 
                      inputLabel: { shrink: true },
                      input: { sx: { borderRadius: 0, border: BORDER, '& .MuiOutlinedInput-notchedOutline': { border: 'none' } } }
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    fullWidth label="Time" value={time} onChange={(e) => setTime(e.target.value)}
                    slotProps={{ input: { sx: { borderRadius: 0, border: BORDER, '& .MuiOutlinedInput-notchedOutline': { border: 'none' } } } }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={eventCategory} label="Category" onChange={(e) => setEventCategory(e.target.value as any)}
                      sx={{ borderRadius: 0, border: BORDER, '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
                    >
                      <MenuItem value="Charity">Charity</MenuItem>
                      <MenuItem value="Surgery">Surgery</MenuItem>
                      <MenuItem value="Fundraiser">Fundraiser</MenuItem>
                      <MenuItem value="Workshop">Workshop</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </>
            )}

            {/* Description / Content */}
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth multiline rows={4}
                label={tabIndex === 1 ? "Full Article Content" : "Description"}
                value={description || content}
                onChange={(e) => tabIndex === 1 ? setContent(e.target.value) : setDescription(e.target.value)}
                slotProps={{ input: { sx: { borderRadius: 0, border: BORDER, '& .MuiOutlinedInput-notchedOutline': { border: 'none' } } } }}
              />
            </Grid>

            {/* Image Selection */}
            <Grid size={{ xs: 12 }}>
              <Divider sx={{ mb: 2, borderBottomWidth: 2 }} />
              <Typography variant="subtitle2" sx={{ fontWeight: '900', mb: 2, textTransform: 'uppercase' }}>Select Asset</Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel>Image Preset</InputLabel>
                    <Select
                      value={imagePreset} label="Image Preset" onChange={(e) => setImagePreset(e.target.value)}
                      sx={{ borderRadius: 0, border: BORDER, '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
                    >
                      <MenuItem value="/images/swdr_hero.webp">🌅 Charity</MenuItem>
                      <MenuItem value="/images/swdr_doctor_rome.webp">👨‍⚕️ Dr. Rome</MenuItem>
                      <MenuItem value="/images/swdr_happy_children.webp">🧒 Children</MenuItem>
                      <MenuItem value="/images/hygiene_campaign.webp">🧼 Hygiene</MenuItem>
                      <MenuItem value="/images/mobile_clinic.webp">🚐 Mobile Clinic</MenuItem>
                      <MenuItem value="custom">🌐 Custom URL</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {imagePreset === 'custom' && (
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth label="Custom Image URL" value={customImage} onChange={(e) => setCustomImage(e.target.value)}
                      slotProps={{ input: { sx: { borderRadius: 0, border: BORDER, '& .MuiOutlinedInput-notchedOutline': { border: 'none' } } } }}
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 3, borderTop: BORDER, bgcolor: '#f8fafc' }}>
          <Button 
            onClick={() => setOpenDialog(false)}
            sx={{ fontWeight: '900', color: '#64748b' }}
          >
            Discard
          </Button>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            sx={{ 
              borderRadius: 0, px: 4, py: 1.5, 
              fontWeight: '900', bgcolor: '#be185d',
              border: BORDER, boxShadow: '4px 4px 0px #1e293b',
              '&:hover': { bgcolor: '#9d174d', transform: 'translate(-2px, -2px)', boxShadow: '6px 6px 0px #1e293b' }
            }}
          >
            Commit Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
