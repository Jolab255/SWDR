import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import type { ClinicEvent, NewsArticle, ImpactStory } from '../utils/mockData';
import { getStoredEvents, getStoredNews, getStoredImpact } from '../utils/mockData';

// Modular Components
import Hero from '../components/home/Hero';
import Programs from '../components/home/Programs';
import MissionCTA from '../components/home/MissionCTA';
import EventsCalendar from '../components/home/EventsCalendar';
import ImpactGlimpses from '../components/home/ImpactGlimpses';
import NewsSuccess from '../components/home/NewsSuccess';
import Movement from '../components/home/Movement';
import EventDetails from '../components/home/EventDetails';
import HomeDialogs from '../components/home/HomeDialogs';

interface HomeProps {
  onDonateClick: () => void;
}

export default function Home({ onDonateClick }: HomeProps) {
  const [events, setEvents] = useState<ClinicEvent[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [impactStories, setImpactStories] = useState<ImpactStory[]>([]);
  
  // State for specific views/dialogs
  const [selectedEvent, setSelectedEvent] = useState<ClinicEvent | null>(null);
  const [showFullDetails, setShowFullDetails] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [openRegSuccess, setOpenRegSuccess] = useState(false);

  // Form State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regProfession, setRegProfession] = useState('Dentist');

  useEffect(() => {
    setEvents(getStoredEvents());
    setNews(getStoredNews());
    setImpactStories(getStoredImpact());
  }, []);

  const handleReadMore = (ev: ClinicEvent) => {
    setSelectedEvent(ev);
    setShowFullDetails(true);
    window.scrollTo(0, 0);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPhone || !selectedEvent) return;

    const updatedEvents = events.map(item => {
      if (item.id === selectedEvent.id) {
        return {
          ...item,
          slotsRegistered: Math.min(item.slotsRegistered + 1, item.slotsTotal)
        };
      }
      return item;
    });
    
    setEvents(updatedEvents);
    localStorage.setItem('swdr_events', JSON.stringify(updatedEvents));
    setOpenRegister(false);
    setOpenRegSuccess(true);
    setRegName('');
    setRegEmail('');
    setRegPhone('');
  };

  // If viewing full details of an event
  if (showFullDetails && selectedEvent) {
    return (
      <>
        <EventDetails 
          event={selectedEvent} 
          onBack={() => setShowFullDetails(false)}
          onDonateClick={onDonateClick}
          onRegisterClick={() => setOpenRegister(true)}
        />
        <HomeDialogs 
          openRegister={openRegister}
          onCloseRegister={() => setOpenRegister(false)}
          openRegSuccess={openRegSuccess}
          onCloseRegSuccess={() => setOpenRegSuccess(false)}
          selectedEvent={selectedEvent}
          regName={regName} setRegName={setRegName}
          regEmail={regEmail} setRegEmail={setRegEmail}
          regPhone={regPhone} setRegPhone={setRegPhone}
          regProfession={regProfession} setRegProfession={setRegProfession}
          onSubmitRegister={handleRegisterSubmit}
          onDonateClick={onDonateClick}
        />
      </>
    );
  }

  return (
    <Box sx={{ overflow: 'hidden' }}>
      <Hero onDonateClick={onDonateClick} />
      <Programs />
      <MissionCTA onDonateClick={onDonateClick} />
      <EventsCalendar events={events} onReadMoreClick={handleReadMore} />
      <ImpactGlimpses impactStories={impactStories} />
      <NewsSuccess news={news} />
      <Movement onDonateClick={onDonateClick} />
      
      {/* Invisible Dialogs for Home Context */}
      <HomeDialogs 
        openRegister={openRegister}
        onCloseRegister={() => setOpenRegister(false)}
        openRegSuccess={openRegSuccess}
        onCloseRegSuccess={() => setOpenRegSuccess(false)}
        selectedEvent={selectedEvent}
        regName={regName} setRegName={setRegName}
        regEmail={regEmail} setRegEmail={setRegEmail}
        regPhone={regPhone} setRegPhone={setRegPhone}
        regProfession={regProfession} setRegProfession={setRegProfession}
        onSubmitRegister={handleRegisterSubmit}
        onDonateClick={onDonateClick}
      />
    </Box>
  );
}
