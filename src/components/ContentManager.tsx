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
  Divider,
  Paper
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
  const [author, setAuthor] = useState('Dr. Melkisedeck Robert');
  const [image, setImage] = useState('');
  
  // New Fields for Team & Impact
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [tag, setTag] = useState('');
  const [linkedin, setLinkedin] = useState('#');
  const [instagram, setInstagram] = useState('#');

  // Categories
  const [eventCategory, setEventCategory] = useState<string>('Charity Campaign');
  const [customEventCategory, setCustomEventCategory] = useState('');
  const [newsCategory, setNewsCategory] = useState<string>('Clinic News');
  const [customNewsCategory, setCustomNewsCategory] = useState('');
  
  const [slotsTotal, setSlotsTotal] = useState(100);
  const [slotsRegistered, setSlotsRegistered] = useState(0);

  const [alertMsg, setAlertMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const BORDER = '1px solid #e2e8f0';

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
    setAuthor('Dr. Melkisedeck Robert');
    setImage(tabIndex === 3 ? '/images/Dorcas_19.webp' : '/images/swdr_hero.webp');
    setEventCategory('Charity Campaign');
    setCustomEventCategory('');
    setNewsCategory('Clinic News');
    setCustomNewsCategory('');
    setSlotsTotal(100);
    setSlotsRegistered(0);
    setName('');
    setRole('');
    setTag('');
    setLinkedin('#');
    setInstagram('#');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 600;
          const MAX_HEIGHT = 450;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
          setImage(dataUrl);
        };
      };
      reader.readAsDataURL(file);
    }
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
    setImage(item.image || '');

    const categoriesList = [
      'Charity Campaign',
      'Mobile Dental Camp',
      'Marathon & Fundraising',
      'Surgical & Restorative Camp',
      'School Visit & Education',
      'Oral Hygiene Workshop',
      'Community Engagement',
      'Pediatric Screening'
    ];
    const newsCategoriesList = ['Success Story', 'Health Advice', 'Clinic News'];

    if (tabIndex === 0) {
      const ev = item as ClinicEvent;
      setTime(ev.time);
      setLocation(ev.location);
      setDescription(ev.description);
      setSlotsTotal(ev.slotsTotal);
      setSlotsRegistered(ev.slotsRegistered);

      let cat = ev.category || '';
      if (cat === 'Charity') cat = 'Charity Campaign';
      else if (cat === 'Surgery') cat = 'Surgical & Restorative Camp';
      else if (cat === 'Fundraiser') cat = 'Marathon & Fundraising';
      else if (cat === 'Workshop') cat = 'Oral Hygiene Workshop';

      if (categoriesList.includes(cat)) {
        setEventCategory(cat);
        setCustomEventCategory('');
      } else {
        setEventCategory('Other');
        setCustomEventCategory(cat);
      }
    } else if (tabIndex === 1) {
      const nw = item as NewsArticle;
      setAuthor(nw.author);
      setSummary(nw.summary);
      setContent(nw.content);

      let cat = nw.category || '';
      if (newsCategoriesList.includes(cat)) {
        setNewsCategory(cat);
        setCustomNewsCategory('');
      } else {
        setNewsCategory('Other');
        setCustomNewsCategory(cat);
      }
    } else if (tabIndex === 2) {
      const im = item as ImpactStory;
      setLocation(im.location || '');
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
    const finalImage = image || (tabIndex === 3 ? '/images/Dorcas_19.webp' : '/images/swdr_hero.webp');
    const finalEventCategory = eventCategory === 'Other' ? (customEventCategory || 'Other') : eventCategory;
    const finalNewsCategory = newsCategory === 'Other' ? (customNewsCategory || 'Other') : newsCategory;

    if (tabIndex === 0) {
      const updated = dialogMode === 'add' 
        ? [{ id: 'evt-' + Date.now(), title, date, time, location, description, category: finalEventCategory, image: finalImage, slotsTotal, slotsRegistered }, ...events]
        : events.map(ev => ev.id === editId ? { ...ev, title, date, time, location, description, category: finalEventCategory, image: finalImage, slotsTotal, slotsRegistered } : ev);
      setEvents(updated);
      saveStoredEvents(updated);
    } else if (tabIndex === 1) {
      const updated = dialogMode === 'add'
        ? [{ id: 'news-' + Date.now(), title, date, author, summary, content, category: finalNewsCategory, image: finalImage }, ...news]
        : news.map(nw => nw.id === editId ? { ...nw, title, date, author, summary, content, category: finalNewsCategory, image: finalImage } : nw);
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
          borderRadius: 3,
          bgcolor: 'white',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 32px rgba(190, 24, 93, 0.12)',
            borderColor: '#be185d',
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
              sx={{ fontWeight: '900', borderRadius: 1.5, border: '1px solid #fce7f3', bgcolor: '#fdf2f8', color: '#be185d' }} 
            />
            {item.date && <Typography variant="caption" sx={{ fontWeight: 700 }}>📅 {item.date}</Typography>}
          </Box>
          <Typography variant="subtitle1" sx={{ fontWeight: '900', textTransform: 'uppercase', mb: 1, color: '#1e293b', minHeight: 40, lineHeight: 1.2 }}>
            {item.title || item.name}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#475569', 
              mb: 2, 
              maxHeight: 120, 
              overflowY: 'auto', 
              textAlign: 'justify',
              pr: 0.5,
              '&::-webkit-scrollbar': { width: '4px' },
              '&::-webkit-scrollbar-thumb': { bgcolor: '#cbd5e1', borderRadius: '4px' }
            }}
          >
            {item.description || item.content || item.summary || item.desc}
          </Typography>
          
          <Divider sx={{ mb: 2, borderColor: '#e2e8f0' }} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <IconButton 
              size="small" 
              onClick={() => handleOpenEdit(item)}
              sx={{ border: '1px solid #fce7f3', borderRadius: 2, bgcolor: '#fdf2f8', color: '#be185d', '&:hover': { bgcolor: '#fbcfe8' } }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton 
              size="small" 
              onClick={() => handleDelete(item.id)}
              sx={{ border: '1px solid #ffe4e6', borderRadius: 2, bgcolor: '#fff1f2', color: '#e11d48', '&:hover': { bgcolor: '#fecdd3' } }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Grid>
  );

  const renderLivePreview = () => {
    const previewItem: any = {};
    
    if (tabIndex === 0) {
      previewItem.title = title || 'Event Title Placeholder';
      previewItem.date = date || 'YYYY-MM-DD';
      previewItem.category = eventCategory === 'Other' ? (customEventCategory || 'Other') : eventCategory;
      previewItem.image = image || '/images/swdr_hero.webp';
      previewItem.description = description || 'This is where your event description will go. Start typing below to see it live!';
    } else if (tabIndex === 1) {
      previewItem.title = title || 'Article Title Placeholder';
      previewItem.date = date || 'YYYY-MM-DD';
      previewItem.category = newsCategory === 'Other' ? (customNewsCategory || 'Other') : newsCategory;
      previewItem.image = image || '/images/swdr_hero.webp';
      previewItem.description = summary || content || 'This is where your article summary or content will go. Start typing below to see it live!';
    } else if (tabIndex === 2) {
      previewItem.title = title || 'Impact Glimpse Title';
      previewItem.date = date || 'YYYY-MM-DD';
      previewItem.location = location || 'Location';
      previewItem.category = 'Impact Story';
      previewItem.image = image || '/images/swdr_hero.webp';
      previewItem.description = description || 'This is where your impact story description will go. Start typing below to see it live!';
    } else if (tabIndex === 3) {
      previewItem.name = name || 'Team Member Name';
      previewItem.title = name || 'Team Member Name';
      previewItem.role = role || 'Role / Position';
      previewItem.tag = tag || 'Specialization Tag';
      previewItem.category = 'Team Member';
      previewItem.image = image || '/images/Dorcas_19.webp';
      previewItem.description = description || 'This is where the team member biography will go. Start typing below to see it live!';
    }

    return (
      <Box sx={{ maxWidth: 360, mx: 'auto', width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            border: BORDER,
            borderRadius: 3,
            bgcolor: 'white',
            overflow: 'hidden',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
            borderColor: '#be185d',
            position: 'relative'
          }}
        >
          <Box sx={{ position: 'absolute', top: 12, right: 12, zIndex: 10 }}>
            <Chip 
              label="PREVIEW" 
              size="small" 
              sx={{ fontWeight: 900, bgcolor: '#be185d', color: 'white', fontSize: '0.65rem' }} 
            />
          </Box>
          <Box 
            component="img" 
            src={previewItem.image} 
            sx={{ height: 160, width: '100%', objectFit: 'cover', borderBottom: BORDER }} 
          />
          <Box sx={{ p: 2.5, flexGrow: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5, alignItems: 'center' }}>
              <Chip 
                label={previewItem.category} 
                size="small" 
                sx={{ fontWeight: '900', borderRadius: 1.5, border: '1px solid #fce7f3', bgcolor: '#fdf2f8', color: '#be185d' }} 
              />
              {previewItem.date && (
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b' }}>
                  📅 {previewItem.date}
                </Typography>
              )}
            </Box>
            <Typography variant="subtitle1" sx={{ fontWeight: '900', textTransform: 'uppercase', mb: 1, color: '#1e293b', minHeight: 40, lineHeight: 1.2 }}>
              {previewItem.title || previewItem.name}
            </Typography>
            
            {tabIndex === 3 && (
              <Box sx={{ mb: 1.5 }}>
                <Typography variant="caption" sx={{ fontWeight: 800, color: '#be185d', display: 'block' }}>
                  {previewItem.role}
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 600, color: '#64748b' }}>
                  {previewItem.tag}
                </Typography>
              </Box>
            )}

            {tabIndex === 0 && (
              <Box sx={{ mb: 1.5, display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                {location && (
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b' }}>
                    📍 {location}
                  </Typography>
                )}
                {time && (
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b' }}>
                    🕒 {time}
                  </Typography>
                )}
              </Box>
            )}

            {tabIndex === 2 && location && (
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b', display: 'block', mb: 1.5 }}>
                📍 {location}
              </Typography>
            )}

            <Typography 
              variant="body2" 
              sx={{ 
                color: '#475569', 
                mb: 2, 
                maxHeight: 120, 
                overflowY: 'auto', 
                textAlign: 'justify',
                pr: 0.5,
                '&::-webkit-scrollbar': { width: '4px' },
                '&::-webkit-scrollbar-thumb': { bgcolor: '#cbd5e1', borderRadius: '4px' }
              }}
            >
              {previewItem.description}
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  };

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
            borderRadius: 2, px: 3, py: 1.2, 
            fontWeight: '900', bgcolor: '#be185d',
            boxShadow: '0 4px 12px rgba(190, 24, 93, 0.2)',
            '&:hover': { bgcolor: '#9d174d', transform: 'translateY(-2px)', boxShadow: '0 6px 20px rgba(190, 24, 93, 0.35)' }
          }}
        >
          Add {tabIndex === 0 ? 'Event' : tabIndex === 1 ? 'Article' : tabIndex === 2 ? 'Impact' : 'Member'}
        </Button>
      </Box>

      {alertMsg && (
        <Alert 
          severity={alertMsg.type} 
          onClose={() => setAlertMsg(null)} 
          sx={{ mb: 4, borderRadius: 2, border: '1px solid #fbcfe8', fontWeight: 'bold' }}
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
          '& .MuiTabs-indicator': { height: 4, bgcolor: '#be185d', borderRadius: '4px 4px 0 0' },
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
        {tabIndex === 0 && events.length === 0 && (
          <Grid size={{ xs: 12 }}>
            <Paper variant="outlined" sx={{ p: 6, textAlign: 'center', borderRadius: 3, bgcolor: '#f8fafc', borderStyle: 'dashed', borderColor: '#cbd5e1' }}>
              <Typography variant="h6" color="text.primary" sx={{ fontWeight: 900, mb: 1, textTransform: 'uppercase' }}>
                No scheduled events found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Click the "Add Event" button above to publish your first clinical event or outreach camp.
              </Typography>
            </Paper>
          </Grid>
        )}
        {tabIndex === 0 && events.map(ev => renderCard(ev, 'event'))}

        {tabIndex === 1 && news.length === 0 && (
          <Grid size={{ xs: 12 }}>
            <Paper variant="outlined" sx={{ p: 6, textAlign: 'center', borderRadius: 3, bgcolor: '#f8fafc', borderStyle: 'dashed', borderColor: '#cbd5e1' }}>
              <Typography variant="h6" color="text.primary" sx={{ fontWeight: 900, mb: 1, textTransform: 'uppercase' }}>
                No news articles found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Click the "Add Article" button above to publish stories, health advice, or clinic news.
              </Typography>
            </Paper>
          </Grid>
        )}
        {tabIndex === 1 && news.map(nw => renderCard(nw, 'news'))}

        {tabIndex === 2 && impact.length === 0 && (
          <Grid size={{ xs: 12 }}>
            <Paper variant="outlined" sx={{ p: 6, textAlign: 'center', borderRadius: 3, bgcolor: '#f8fafc', borderStyle: 'dashed', borderColor: '#cbd5e1' }}>
              <Typography variant="h6" color="text.primary" sx={{ fontWeight: 900, mb: 1, textTransform: 'uppercase' }}>
                No impact glimpses found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Click the "Add Impact" button above to share pictures and stories of transformation.
              </Typography>
            </Paper>
          </Grid>
        )}
        {tabIndex === 2 && impact.map(im => renderCard(im, 'impact'))}

        {tabIndex === 3 && team.length === 0 && (
          <Grid size={{ xs: 12 }}>
            <Paper variant="outlined" sx={{ p: 6, textAlign: 'center', borderRadius: 3, bgcolor: '#f8fafc', borderStyle: 'dashed', borderColor: '#cbd5e1' }}>
              <Typography variant="h6" color="text.primary" sx={{ fontWeight: 900, mb: 1, textTransform: 'uppercase' }}>
                No team members found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Click the "Add Member" button above to list medical coordinators, dentists, and charity leads.
              </Typography>
            </Paper>
          </Grid>
        )}
        {tabIndex === 3 && team.map(tm => renderCard(tm, 'team'))}
      </Grid>

      {/* --- ADD/EDIT ITEM DIALOG FORM --- */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)} 
        maxWidth="lg" 
        fullWidth 
        scroll="body"
        slotProps={{ paper: { sx: { borderRadius: 3, border: '1px solid #e2e8f0', boxShadow: '0 20px 48px rgba(0, 0, 0, 0.12)' } } }}
      >
        <DialogTitle sx={{ fontWeight: '900', textTransform: 'uppercase', borderBottom: BORDER, bgcolor: '#fdf2f8' }}>
          {dialogMode === 'add' ? 'Create New Entry' : 'Update Existing Entry'}
        </DialogTitle>
        
        <DialogContent sx={{ p: 4, mt: 2 }}>
          <Grid container spacing={4}>
            {/* Left Side: Form Fields */}
            <Grid size={{ xs: 12, md: 7.5 }}>
              <Grid container spacing={3}>
                {/* Title / Name Field */}
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label={tabIndex === 3 ? "Full Name" : "Title"}
                    value={tabIndex === 3 ? name : title}
                    onChange={(e) => tabIndex === 3 ? setName(e.target.value) : setTitle(e.target.value)}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                  />
                </Grid>

                {/* High Visibility Category / Event Type & Image Selector */}
                <Grid size={{ xs: 12 }}>
                  <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2, bgcolor: '#fdf2f8', border: '1px solid #fce7f3' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: '900', mb: 2, textTransform: 'uppercase', color: '#be185d', display: 'flex', alignItems: 'center', gap: 1 }}>
                      🖼️ {tabIndex === 0 ? 'Event Type & Cover Photo' : tabIndex === 1 ? 'News Category & Cover Photo' : 'Cover Photo'}
                    </Typography>
                    
                    <Grid container spacing={2}>
                      {/* Category Dropdown (Events and News only) */}
                      {tabIndex === 0 && (
                        <>
                          <Grid size={{ xs: 12, md: eventCategory === 'Other' ? 6 : 12 }}>
                            <FormControl fullWidth sx={{ bgcolor: 'white', '& .MuiOutlinedInput-root': { borderRadius: 2 } }}>
                              <InputLabel>Event Type</InputLabel>
                              <Select
                                value={eventCategory} 
                                label="Event Type" 
                                onChange={(e) => {
                                  setEventCategory(e.target.value);
                                  if (e.target.value !== 'Other') {
                                    setCustomEventCategory('');
                                  }
                                }}
                              >
                                <MenuItem value="Charity Campaign">Charity Campaign</MenuItem>
                                <MenuItem value="Mobile Dental Camp">Mobile Dental Camp</MenuItem>
                                <MenuItem value="Marathon & Fundraising">Marathon & Fundraising</MenuItem>
                                <MenuItem value="Surgical & Restorative Camp">Surgical & Restorative Camp</MenuItem>
                                <MenuItem value="School Visit & Education">School Visit & Education</MenuItem>
                                <MenuItem value="Oral Hygiene Workshop">Oral Hygiene Workshop</MenuItem>
                                <MenuItem value="Community Engagement">Community Engagement</MenuItem>
                                <MenuItem value="Pediatric Screening">Pediatric Screening</MenuItem>
                                <MenuItem value="Other">Other (Custom Type)</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          {eventCategory === 'Other' && (
                            <Grid size={{ xs: 12, md: 6 }}>
                              <TextField
                                fullWidth 
                                label="Custom Event Type" 
                                value={customEventCategory} 
                                onChange={(e) => setCustomEventCategory(e.target.value)}
                                sx={{ bgcolor: 'white', '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                              />
                            </Grid>
                          )}
                        </>
                      )}

                      {tabIndex === 1 && (
                        <>
                          <Grid size={{ xs: 12, md: newsCategory === 'Other' ? 6 : 12 }}>
                            <FormControl fullWidth sx={{ bgcolor: 'white', '& .MuiOutlinedInput-root': { borderRadius: 2 } }}>
                              <InputLabel>News Category</InputLabel>
                              <Select
                                value={newsCategory} 
                                label="News Category" 
                                onChange={(e) => {
                                  setNewsCategory(e.target.value);
                                  if (e.target.value !== 'Other') {
                                    setCustomNewsCategory('');
                                  }
                                }}
                              >
                                <MenuItem value="Success Story">Success Story</MenuItem>
                                <MenuItem value="Health Advice">Health Advice</MenuItem>
                                <MenuItem value="Clinic News">Clinic News</MenuItem>
                                <MenuItem value="Other">Other (Custom Category)</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          {newsCategory === 'Other' && (
                            <Grid size={{ xs: 12, md: 6 }}>
                              <TextField
                                fullWidth 
                                label="Custom News Category" 
                                value={customNewsCategory} 
                                onChange={(e) => setCustomNewsCategory(e.target.value)}
                                sx={{ bgcolor: 'white', '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                              />
                            </Grid>
                          )}
                        </>
                      )}

                      {/* Always-visible Local Image Uploader */}
                      <Grid size={{ xs: 12 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                            <Button
                              variant="contained"
                              component="label"
                              sx={{ 
                                py: 1.5, px: 3, borderRadius: 2, 
                                textTransform: 'uppercase', fontWeight: 900, 
                                bgcolor: '#be185d', '&:hover': { bgcolor: '#9d174d' } 
                              }}
                            >
                              Choose Image from Local Folder
                              <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleFileChange}
                              />
                            </Button>
                            {image ? (
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Box 
                                  component="img" 
                                  src={image} 
                                  sx={{ 
                                    width: 60, height: 60, objectFit: 'cover', 
                                    borderRadius: 2, border: '1px solid #cbd5e1',
                                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                                  }} 
                                />
                                <Box>
                                  <Typography variant="caption" sx={{ fontWeight: 800, color: '#1e293b', display: 'block' }}>
                                    Image Selected
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                                    {image.startsWith('data:') ? `Local File (${Math.round(image.length / 1024)} KB)` : 'External URL / Default'}
                                  </Typography>
                                </Box>
                              </Box>
                            ) : (
                              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                                No image selected (will use default)
                              </Typography>
                            )}
                          </Box>
                          <TextField
                            fullWidth 
                            label="Or enter Image URL" 
                            placeholder="https://example.com/image.jpg"
                            value={image.startsWith('data:') ? '' : image} 
                            onChange={(e) => setImage(e.target.value)}
                            sx={{ bgcolor: 'white', '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>

                {/* News Specific Fields - Date / Author */}
                {tabIndex === 1 && (
                  <>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth label="Author" value={author} onChange={(e) => setAuthor(e.target.value)}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)}
                        slotProps={{ inputLabel: { shrink: true } }}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                      />
                    </Grid>
                  </>
                )}

                {/* Event Specific Fields */}
                {tabIndex === 0 && (
                  <>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)}
                        slotProps={{ inputLabel: { shrink: true } }}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth label="Time" value={time} onChange={(e) => setTime(e.target.value)}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth label="Location" value={location} onChange={(e) => setLocation(e.target.value)}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                      <TextField
                        fullWidth label="Total Slots" type="number" value={slotsTotal} onChange={(e) => setSlotsTotal(Number(e.target.value))}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                      <TextField
                        fullWidth label="Registered Slots" type="number" value={slotsRegistered} onChange={(e) => setSlotsRegistered(Number(e.target.value))}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                      />
                    </Grid>
                  </>
                )}

                {/* Impact Specific Fields */}
                {tabIndex === 2 && (
                  <>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth label="Location" value={location} onChange={(e) => setLocation(e.target.value)}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)}
                        slotProps={{ inputLabel: { shrink: true } }}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                      />
                    </Grid>
                  </>
                )}

                {/* Team Specific Fields */}
                {tabIndex === 3 && (
                  <>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        label="Role / Position"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        label="Specialization Tag"
                        placeholder="e.g. MUHAS · UCSF"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        label="LinkedIn"
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        label="Instagram"
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                      />
                    </Grid>
                  </>
                )}

                {/* News Summary Field */}
                {tabIndex === 1 && (
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth multiline rows={2}
                      label="Short Summary Excerpt"
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Grid>
                )}

                {/* Description / Content */}
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth multiline rows={tabIndex === 1 ? 6 : 4}
                    label={tabIndex === 1 ? "Full Article Content" : "Description"}
                    value={tabIndex === 1 ? content : description}
                    onChange={(e) => tabIndex === 1 ? setContent(e.target.value) : setDescription(e.target.value)}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Right Side: Live Card Preview */}
            <Grid size={{ xs: 12, md: 4.5 }} sx={{ borderLeft: { md: BORDER }, pl: { md: 4 }, display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ position: 'sticky', top: 24 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: '900', mb: 3, textTransform: 'uppercase', color: '#be185d', display: 'flex', alignItems: 'center', gap: 1 }}>
                  👁️ Real-time Card Preview
                </Typography>
                {renderLivePreview()}
                <Typography variant="caption" sx={{ display: 'block', mt: 3, color: '#64748b', fontStyle: 'italic', textAlign: 'center' }}>
                  This card preview updates instantly as you make changes to the form.
                </Typography>
              </Box>
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
              borderRadius: 2, px: 4, py: 1.5, 
              fontWeight: '900', bgcolor: '#be185d',
              boxShadow: '0 4px 12px rgba(190, 24, 93, 0.2)',
              '&:hover': { bgcolor: '#9d174d', transform: 'translateY(-2px)', boxShadow: '0 6px 20px rgba(190, 24, 93, 0.35)' }
            }}
          >
            Commit Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
