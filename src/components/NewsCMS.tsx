import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
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
import type { ClinicEvent, NewsArticle } from '../utils/mockData';
import {
  getStoredEvents,
  saveStoredEvents,
  getStoredNews,
  saveStoredNews
} from '../utils/mockData';

export default function NewsCMS() {
  const [tabIndex, setTabIndex] = useState(0); // 0 = Events, 1 = News
  const [events, setEvents] = useState<ClinicEvent[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  
  // Dialog form state
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
  const [imagePreset, setImagePreset] = useState('/images/swdr_hero.png');
  const [customImage, setCustomImage] = useState('');
  
  // Categories
  const [eventCategory, setEventCategory] = useState<'Outreach' | 'Surgery' | 'Fundraiser' | 'Workshop'>('Outreach');
  const [newsCategory, setNewsCategory] = useState<'Success Story' | 'Health Advice' | 'Clinic News'>('Clinic News');
  
  // Slots
  const [slotsTotal, setSlotsTotal] = useState(100);
  const [slotsRegistered, setSlotsRegistered] = useState(0);

  const [alertMsg, setAlertMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    setEvents(getStoredEvents());
    setNews(getStoredNews());
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
    setAlertMsg(null);
  };

  const handleOpenAdd = () => {
    setDialogMode('add');
    setEditId(null);
    
    // Reset fields
    setTitle('');
    setDate(new Date().toISOString().split('T')[0]);
    setTime('09:00 AM - 04:00 PM');
    setLocation('');
    setDescription('');
    setSummary('');
    setContent('');
    setAuthor('Dr. Jerome Rome');
    setImagePreset('/images/swdr_hero.png');
    setCustomImage('');
    setEventCategory('Outreach');
    setNewsCategory('Clinic News');
    setSlotsTotal(100);
    setSlotsRegistered(0);

    setOpenDialog(true);
  };

  const handleOpenEdit = (item: ClinicEvent | NewsArticle) => {
    setDialogMode('edit');
    setEditId(item.id);
    setTitle(item.title);
    setDate(item.date);
    
    const imgUrl = item.image;
    if (imgUrl.startsWith('/images/')) {
      setImagePreset(imgUrl);
      setCustomImage('');
    } else {
      setImagePreset('custom');
      setCustomImage(imgUrl);
    }

    if (tabIndex === 0) {
      // Event fields
      const ev = item as ClinicEvent;
      setTime(ev.time);
      setLocation(ev.location);
      setDescription(ev.description);
      setEventCategory(ev.category);
      setSlotsTotal(ev.slotsTotal);
      setSlotsRegistered(ev.slotsRegistered);
    } else {
      // News fields
      const nw = item as NewsArticle;
      setAuthor(nw.author);
      setSummary(nw.summary);
      setContent(nw.content);
      setNewsCategory(nw.category);
    }
    
    setOpenDialog(true);
  };

  const handleDelete = (id: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    if (tabIndex === 0) {
      const updated = events.filter(e => e.id !== id);
      setEvents(updated);
      saveStoredEvents(updated);
      setAlertMsg({ type: 'success', text: 'Event successfully deleted!' });
    } else {
      const updated = news.filter(n => n.id !== id);
      setNews(updated);
      saveStoredNews(updated);
      setAlertMsg({ type: 'success', text: 'News article successfully deleted!' });
    }
  };

  const handleSave = () => {
    if (!title || !date) {
      alert('Please fill out the Title and Date.');
      return;
    }

    const finalImage = imagePreset === 'custom' ? customImage || '/images/swdr_hero.png' : imagePreset;

    if (tabIndex === 0) {
      // Manage Event
      if (dialogMode === 'add') {
        const newEvent: ClinicEvent = {
          id: 'evt-' + Date.now(),
          title,
          date,
          time,
          location,
          description,
          category: eventCategory,
          image: finalImage,
          slotsTotal: Number(slotsTotal) || 100,
          slotsRegistered: Number(slotsRegistered) || 0
        };
        const updated = [newEvent, ...events];
        setEvents(updated);
        saveStoredEvents(updated);
        setAlertMsg({ type: 'success', text: 'New event added!' });
      } else {
        const updated = events.map(ev => {
          if (ev.id === editId) {
            return {
              ...ev,
              title,
              date,
              time,
              location,
              description,
              category: eventCategory,
              image: finalImage,
              slotsTotal: Number(slotsTotal) || 100,
              slotsRegistered: Number(slotsRegistered) || 0
            };
          }
          return ev;
        });
        setEvents(updated);
        saveStoredEvents(updated);
        setAlertMsg({ type: 'success', text: 'Event updated successfully!' });
      }
    } else {
      // Manage News
      if (dialogMode === 'add') {
        const newArt: NewsArticle = {
          id: 'news-' + Date.now(),
          title,
          date,
          author,
          summary,
          content,
          category: newsCategory,
          image: finalImage
        };
        const updated = [newArt, ...news];
        setNews(updated);
        saveStoredNews(updated);
        setAlertMsg({ type: 'success', text: 'New news article added!' });
      } else {
        const updated = news.map(nw => {
          if (nw.id === editId) {
            return {
              ...nw,
              title,
              date,
              author,
              summary,
              content,
              category: newsCategory,
              image: finalImage
            };
          }
          return nw;
        });
        setNews(updated);
        saveStoredNews(updated);
        setAlertMsg({ type: 'success', text: 'News article updated successfully!' });
      }
    }

    setOpenDialog(false);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h5" fontWeight="bold">Website Content Management System (CMS)</Typography>
          <Typography variant="body2" color="text.secondary">
            Perform administrative edits to dynamic components. Changes synchronize instantly onto home and about pages.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenAdd}
          sx={{ borderRadius: 2, px: 3, py: 1 }}
        >
          {tabIndex === 0 ? 'Create Event' : 'Create Article'}
        </Button>
      </Box>

      {alertMsg && (
        <Alert severity={alertMsg.type} onClose={() => setAlertMsg(null)} sx={{ mb: 3, borderRadius: 2 }}>
          {alertMsg.text}
        </Alert>
      )}

      {/* Tabs Switcher */}
      <Tabs 
        value={tabIndex} 
        onChange={handleTabChange} 
        variant="fullWidth" 
        sx={{ 
          borderBottom: 1, 
          borderColor: 'divider', 
          mb: 4, 
          '& .MuiTab-root': { py: 2, fontSize: '1rem', fontWeight: 'bold' } 
        }}
      >
        <Tab icon={<CalendarMonthIcon sx={{ mr: 1 }} />} iconPosition="start" label="Upcoming Events Calendar" />
        <Tab icon={<NewspaperIcon sx={{ mr: 1 }} />} iconPosition="start" label="Latest News & Success Stories" />
      </Tabs>

      {/* EVENTS MANAGEMENT CONTAINER */}
      {tabIndex === 0 && (
        <Grid container spacing={3}>
          {events.map((ev) => (
            <Grid item xs={12} sm={6} md={4} key={ev.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <CardMedia
                  component="img"
                  height="160"
                  image={ev.image}
                  alt={ev.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Chip label={ev.category} size="small" color="primary" sx={{ fontWeight: 'bold' }} />
                    <Typography variant="caption" color="text.secondary" fontWeight="medium">
                      📅 {ev.date}
                    </Typography>
                  </Box>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ minHeight: 48, lineHeight: 1.3 }}>
                    {ev.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                    📍 {ev.location}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                    🕒 {ev.time}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineClamp: 3, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden', mb: 2, height: 60 }}>
                    {ev.description}
                  </Typography>
                  
                  <Box sx={{ mt: 'auto' }}>
                    <Divider sx={{ mb: 2 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="caption" color="text.primary" fontWeight="bold">
                        Slots: {ev.slotsRegistered}/{ev.slotsTotal}
                      </Typography>
                      <Box>
                        <IconButton size="small" color="primary" onClick={() => handleOpenEdit(ev)} sx={{ mr: 0.5 }}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="error" onClick={() => handleDelete(ev.id)}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* NEWS MANAGEMENT CONTAINER */}
      {tabIndex === 1 && (
        <Grid container spacing={3}>
          {news.map((nw) => (
            <Grid item xs={12} sm={6} md={4} key={nw.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <CardMedia
                  component="img"
                  height="160"
                  image={nw.image}
                  alt={nw.title}
                />
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Chip label={nw.category} size="small" color="secondary" sx={{ fontWeight: 'bold' }} />
                    <Typography variant="caption" color="text.secondary" fontWeight="medium">
                      ✍️ {nw.date}
                    </Typography>
                  </Box>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ minHeight: 48, lineHeight: 1.3 }}>
                    {nw.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                    By {nw.author}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineClamp: 3, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden', mb: 2, height: 60 }}>
                    {nw.summary}
                  </Typography>
                  
                  <Box sx={{ mt: 'auto' }}>
                    <Divider sx={{ mb: 2 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                      <IconButton size="small" color="primary" onClick={() => handleOpenEdit(nw)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" color="error" onClick={() => handleDelete(nw.id)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* --- ADD/EDIT ITEM DIALOG FORM --- */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth scroll="body">
        <DialogTitle sx={{ fontWeight: 'bold', borderBottom: '1px solid', borderColor: 'divider' }}>
          {dialogMode === 'add' ? `Add New ${tabIndex === 0 ? 'Calendar Event' : 'News Article'}` : `Edit ${tabIndex === 0 ? 'Event' : 'Article'}`}
        </DialogTitle>
        
        <DialogContent sx={{ mt: 2 }}>
          <Grid container spacing={2.5}>
            {/* Common Title */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Grid>

            {/* Category Select */}
            <Grid item xs={6}>
              {tabIndex === 0 ? (
                <FormControl fullWidth>
                  <InputLabel>Event Category</InputLabel>
                  <Select
                    value={eventCategory}
                    label="Event Category"
                    onChange={(e) => setEventCategory(e.target.value as any)}
                  >
                    <MenuItem value="Outreach">Outreach Program</MenuItem>
                    <MenuItem value="Surgery">Surgery Camp</MenuItem>
                    <MenuItem value="Fundraiser">Charity Fundraiser</MenuItem>
                    <MenuItem value="Workshop">Hygiene Workshop</MenuItem>
                  </Select>
                </FormControl>
              ) : (
                <FormControl fullWidth>
                  <InputLabel>Article Category</InputLabel>
                  <Select
                    value={newsCategory}
                    label="Article Category"
                    onChange={(e) => setNewsCategory(e.target.value as any)}
                  >
                    <MenuItem value="Success Story">Success Story</MenuItem>
                    <MenuItem value="Health Advice">Health Advice</MenuItem>
                    <MenuItem value="Clinic News">Clinic News</MenuItem>
                  </Select>
                </FormControl>
              )}
            </Grid>

            {/* Date Field */}
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>

            {/* EVENT SPECIFIC FIELDS */}
            {tabIndex === 0 && (
              <>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Outreach Timing"
                    placeholder="e.g. 08:00 AM - 05:00 PM"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Outreach Location"
                    placeholder="e.g. Kisarawe Clinic, Pwani"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Total Slots (Capacity)"
                    type="number"
                    value={slotsTotal}
                    onChange={(e) => setSlotsTotal(Number(e.target.value))}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Registered Attendees"
                    type="number"
                    value={slotsRegistered}
                    onChange={(e) => setSlotsRegistered(Number(e.target.value))}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Short Description"
                    placeholder="Provide a summary of the upcoming calendar event..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Grid>
              </>
            )}

            {/* NEWS SPECIFIC FIELDS */}
            {tabIndex === 1 && (
              <>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Author / Writer Name"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    label="Brief Summary"
                    placeholder="Provide a 1-2 sentence hook for the homepage feed..."
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Full Article Content"
                    placeholder="Write the full body content here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </Grid>
              </>
            )}

            {/* IMAGE CONFIGURATION PANEL */}
            <Grid item xs={12}>
              <Divider sx={{ my: 1 }} />
              <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1.5 }}>
                Choose Cover Photo
              </Typography>
              <FormControl fullWidth sx={{ mb: 1.5 }}>
                <InputLabel>Image Preset Asset</InputLabel>
                <Select
                  value={imagePreset}
                  label="Image Preset Asset"
                  onChange={(e) => setImagePreset(e.target.value)}
                >
                  <MenuItem value="/images/swdr_hero.png">🌅 Outreach Camp (swdr_hero.png)</MenuItem>
                  <MenuItem value="/images/swdr_doctor_rome.png">👨‍⚕️ Dr. Rome Portrait (swdr_doctor_rome.png)</MenuItem>
                  <MenuItem value="/images/swdr_happy_children.png">🧒 Joyful Schoolchildren (swdr_happy_children.png)</MenuItem>
                  <MenuItem value="custom">🌐 Custom Web Image URL</MenuItem>
                </Select>
              </FormControl>
              {imagePreset === 'custom' && (
                <TextField
                  fullWidth
                  label="Web Image URL"
                  placeholder="https://example.com/image.jpg"
                  value={customImage}
                  onChange={(e) => setCustomImage(e.target.value)}
                />
              )}
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 2.5, borderTop: '1px solid', borderColor: 'divider' }}>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            sx={{ px: 3, borderRadius: 2 }}
          >
            Save Updates
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
