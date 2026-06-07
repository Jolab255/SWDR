export interface ClinicEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: string;
  image: string;
  slotsTotal: number;
  slotsRegistered: number;
}

export interface NewsArticle {
  id: string;
  title: string;
  date: string;
  author: string;
  summary: string;
  content: string;
  category: string;
  image: string;
}

export interface ImpactStory {
  id: string;
  title: string;
  location: string;
  date: string;
  description: string;
  image: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  tag: string;
  desc: string;
  image: string;
  socials: {
    linkedin: string;
    instagram: string;
  };
}

export const INITIAL_EVENTS: ClinicEvent[] = [
  {
    id: 'evt-1',
    title: 'Rural Pediatric Dental Charity',
    date: '2026-06-15',
    time: '08:00 AM - 05:00 PM',
    location: 'Kisarawe Community Clinic, Pwani',
    description: 'Our upcoming full-day pediatric dental charity camp is heading to the Kisarawe district in Pwani, an area where over 80% of children have never had access to a professional dentist. The nearest dental facility is over 60 kilometers away, leaving hundreds of children with untreated cavities, chronic infections, and toothaches that disrupt their education. We aim to screen and treat over 150 children in a single day, setting up five fully-functional mobile dental clinics inside the Kisarawe Community Centre. Our volunteer clinical team will provide comprehensive screenings, restorative composite fillings, emergency extractions to relieve chronic pain, and specialized fluoride treatments to prevent future decay. Simultaneously, our education team will conduct small-group workshops demonstrating proper brushing techniques, distributing 200+ pediatric hygiene kits (comprising bamboo toothbrushes, fluoride toothpaste, and educational storybooks). Volunteers are needed to assist with clinical setup, patient triage, instruments sterilization, and hosting the hygiene workshops. Donations are highly vital here: every $15 directly sponsors one child\'s comprehensive checkup, treatment, and hygiene kit. Our goal is to eradicate preventable oral infections in this community and establish a strong foundation for lifelong hygiene.',
    category: 'Charity Campaign',
    image: '/images/mobile_clinic.webp',
    slotsTotal: 150,
    slotsRegistered: 112
  },
  {
    id: 'evt-2',
    title: 'Reconstructive Smile Surgery Camp',
    date: '2026-07-02',
    time: '07:30 AM - 06:00 PM',
    location: 'SWDR Dental Clinic HQ, Dar es Salaam',
    description: 'Led by Dr. Melkisedeck Robert and a dedicated team of visiting maxillofacial surgeons, our quarterly Reconstructive Smile Surgery Camp will take place at our main headquarters clinic in Dar es Salaam. This high-impact surgical camp focuses on providing life-changing cleft lip, cleft palate, and severe congenital reconstructive dental surgeries for 12 vulnerable children selected from remote rural regions across Tanzania. Many of these children suffer from severe social stigma, difficulties eating or speaking, and chronic respiratory issues due to their untreated conditions. Because cleft surgeries cost upwards of $2,000 in private hospitals, most rural families are forced to live without hope. Our clinic covers 100% of the surgical, hospital stay, post-operative therapy, and family travel costs through donor support. During this intensive camp, volunteers will support non-surgical clinical tasks, coordinate patient registration, manage family support lounges, and assist in setting up recovery wards. Medical practitioners can volunteer to assist in post-operative nursing care. 100% of donations raised during this event go directly toward purchasing surgical sutures, anesthesia, antibiotics, and post-op nutritional supplements. Help us restore not just a smile, but a future full of hope and dignity.',
    category: 'Surgical & Restorative Camp',
    image: '/images/surgical_camp.webp',
    slotsTotal: 12,
    slotsRegistered: 9
  },
  {
    id: 'evt-3',
    title: 'Annual charity "Miles for Smiles" Run',
    date: '2026-06-28',
    time: '06:00 AM - 11:00 AM',
    location: 'Coco Beach, Dar es Salaam',
    description: 'Join hundreds of passionate runners, advocates, and health professionals for our annual charity \'Miles for Smiles\' 5K and 10K Run at Coco Beach, Dar es Salaam! This vibrant community fundraiser raises critical awareness and direct financial contributions to support our rural dental charities and reconstructive surgery camps. The event starts at sunrise along the scenic Indian Ocean coastline. In addition to the run, the day features free public dental checkups at our mobile charity booths, live hygiene demonstrations for families, and fun interactive activities for children. All proceeds from registration fees, corporate sponsorships, and individual run donations will go directly toward funding our mobile charity vans, purchasing portable dental drills, and sponsoring cleft lip surgeries for children in remote areas who have no other options. Volunteers will play a crucial role in managing the course hydration stations, distributing finisher medals, managing registration desks, directing beach crowds, and assisting in our dental screening tents. Every step you run and every shilling you donate helps us cross the finish line to reach children who are living in pain.',
    category: 'Marathon & Fundraising',
    image: '/images/swdr_happy_children.webp',
    slotsTotal: 500,
    slotsRegistered: 342
  },
  {
    id: 'evt-4',
    title: 'Children\'s Oral Hygiene Workshop',
    date: '2026-08-10',
    time: '10:00 AM - 01:00 PM',
    location: 'Arusha Orphanage Centre, Arusha',
    description: 'Our specialized pediatric team is hosting an interactive, high-energy Oral Hygiene Workshop for the children at the Arusha Orphanage Centre. Chronic tooth decay is a silent epidemic in orphanage centers due to lack of specialized dental care, lack of individual hygiene supplies, and nutritional gaps. We are bringing a team of dental hygienists and general volunteers to teach over 80 children the fundamentals of oral health through interactive games, giant teeth brushing models, and storytelling. Each child will receive a personalized dental checkup, professional fluoride treatment, and a \'Smile Kit\' containing a 6-month supply of toothbrushes, toothpaste, and dental floss. We will also be training orphanage caretakers on how to spot early signs of infection and maintain daily oral care schedules. Volunteers will work in small groups with the children, assisting them during the brushing practice sessions, coordinating the educational games, and distributing the Smile Kits. Donations of any amount will go directly toward replenishing our clinical fluoride stocks and purchasing high-quality soft-bristle toothbrushes and educational materials. Let\'s make learning about health an exciting and empowering experience for these beautiful children!',
    category: 'Oral Hygiene Workshop',
    image: '/images/event_hygiene_workshop.webp',
    slotsTotal: 80,
    slotsRegistered: 65
  },
  {
    id: 'evt-5',
    title: 'Community Dental Health & Hygiene Seminar',
    date: '2026-07-18',
    time: '09:00 AM - 03:00 PM',
    location: 'Morogoro Town Hall, Morogoro',
    description: 'Our major educational seminar at the Morogoro Town Hall aims to create sustainable health outcomes by training community leaders, primary school teachers, and parents on the importance of pediatric dental hygiene. In many rural communities, dental decay is misunderstood, and children suffer in silence until infections become severe. This full-day seminar features lectures by Dr. Melkisedeck Robert and local public health specialists on nutrition, preventing early childhood caries, and identifying tooth decay before it requires extraction. We will also provide hands-on training to 50 primary school teachers, equipping them with the curriculum and dental kits to run weekly hygiene checks in their classrooms, protecting over 2,000 rural students. Volunteers will assist with participant registration, seminar room setup, distributing health booklets, and coordinating the lunch service. Donations to this seminar are highly impactful: just $50 allows us to fully train and equip a local school teacher, ensuring a whole classroom of children has access to daily hygiene monitoring and early referral programs. Education is the ultimate prevention.',
    category: 'Charity Campaign',
    image: '/images/event_community_seminar.webp',
    slotsTotal: 100,
    slotsRegistered: 45
  }
];

export const INITIAL_NEWS: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'Restoring Aisha\'s Smile: A Journey of Hope',
    date: '2026-05-20',
    author: 'Dr. Melkisedeck Robert',
    summary: 'How a simple 2-hour surgery transformed the life of 8-year-old Aisha, who suffered from severe dental infections that prevented her from going to school.',
    content: 'Aisha, an energetic 8-year-old from a remote village in Shinyanga, had been suffering from chronic tooth decay and abscesses for over two years. The pain was so intense that she could barely eat and had to drop out of school. Her family, surviving on less than $1.50 a day, could not afford dental care. Thanks to our monthly Charity Program funded by your generous donations, we met Aisha. She was brought to our clinic in Dar es Salaam where Dr. Melkisedeck Robert performed successful restorative dental surgery, clearing the infection and rebuilding her teeth. Today, Aisha is back in school, pain-free, and showing off her gorgeous new smile to everyone!',
    category: 'Success Story',
    image: '/images/swdr_happy_children.webp'
  },
  {
    id: 'news-2',
    title: 'Critical Link Between Children\'s Oral Health & Nutrition',
    date: '2026-05-10',
    author: 'Dr. Melkisedeck Robert',
    summary: 'Read our latest pediatric clinical article outlining how dental decay affects physical development and academic attendance in growing children.',
    content: 'Oral health is often overlooked, but it is a critical component of a child\'s overall physical and cognitive development. When children suffer from untreated cavities and chronic dental pain, their ability to chew food properly decreases, leading to nutritional deficiencies and stunted growth. Furthermore, severe toothaches are the leading cause of health-related school absenteeism in low-income areas in East Africa. Our clinic\'s mission is not just cosmetic; it is a fundamental intervention in child health, nutrition, and education. Regular brushing, fluoride applications, and early intervention can prevent over 90% of these cases.',
    category: 'Health Advice',
    image: '/images/swdr_hero.webp'
  },
  {
    id: 'news-3',
    title: 'Selcom & Tanzania Mobile Money Partnership Launched',
    date: '2026-05-02',
    author: 'SWDR Board',
    summary: 'We have successfully integrated a unified payment checkout system, allowing seamless global card and Tanzanian local mobile money donations.',
    content: 'To make donating simple and secure for our local and international supporters, Smile with Doctor Rome Dental Clinic has collaborated with Tanzanian payment operators, integrating our donation page with Selcom. This integration enables supporters to donate using Vodacom M-Pesa, Tigo Pesa, Airtel Money, and Halopesa instantly via USSD Push. International donors can now also donate securely using Visa, MasterCard, and direct bank transfers. Every single Shilling or Dollar donated goes directly to funding our medical supplies, transport, and surgical equipment for children in hard-to-reach environments.',
    category: 'Clinic News',
    image: '/images/swdr_doctor_rome.webp'
  }
];

export const INITIAL_IMPACT: ImpactStory[] = [
  {
    id: 'impact-1',
    title: 'Rural Hygiene Campaign',
    location: 'Morogoro Rural',
    date: '2026-05-15',
    description: 'Our team visited rural primary schools, providing hygiene kits and teaching effective brushing habits to over 500 children.',
    image: '/images/impact_hygiene_campaign.webp'
  },
  {
    id: 'impact-2',
    title: 'Mobile Clinic Deployment',
    location: 'Kisarawe District',
    date: '2026-04-20',
    description: 'The SWDR Mobile Dental Unit reaching remote villages that have never seen a dentist in decades.',
    image: '/images/mobile_clinic.webp'
  },
  {
    id: 'impact-3',
    title: 'Restorative Surgery Success',
    location: 'Dar es Salaam HQ',
    date: '2026-03-12',
    description: 'Dr. Melkisedeck Robert performing a life-changing restorative dental surgery for a child with severe congenital issues.',
    image: '/images/restorative_surgery.webp'
  },
  {
    id: 'impact-4',
    title: 'Community Surgical Camp',
    location: 'Arusha Outskirts',
    date: '2026-02-05',
    description: 'Gathering families for our quarterly free surgical camp in the Morogoro region.',
    image: '/images/surgical_camp.webp'
  },
  {
    id: 'impact-5',
    title: 'Specialized Care Integration',
    location: 'Dorcas Homecare, Madale',
    date: '2026-03-20',
    description: 'SWDR team integrating regular specialized dental screenings and mobility assistance for kids with cerebral palsy.',
    image: '/images/impact_specialized_care.webp'
  },
  {
    id: 'impact-6',
    title: 'Clinical Outreach Team',
    location: 'Dar es Salaam HQ',
    date: '2026-01-10',
    description: 'Our clinical and volunteer team collaborating on field deployments to reach underserved communities.',
    image: '/images/impact_team_outreach.webp'
  },
  {
    id: 'impact-7',
    title: 'Caregiver Education Workshops',
    location: 'Community Centres',
    date: '2026-04-05',
    description: 'Empowering mothers and caretakers with specialized oral care knowledge for their families.',
    image: '/images/impact_caregiver_workshop.webp'
  }
];

export const INITIAL_TEAM: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Dr. Melkisedeck Robert, DDS',
    role: 'Founder & Lead Pediatric Dentist',
    tag: 'MUHAS · UCSF Pediatric Specialist',
    desc: 'With over 12 years of clinical experience, Dr. Melkisedeck Robert graduated from Muhimbili University of Health and Allied Sciences and holds a Pediatric Dental Specialization from UCSF. He established SWDR to bridge the gap in rural child dental health.',
    image: '/images/Dorcas_19.webp',
    socials: { linkedin: '#', instagram: '#' },
  },
  {
    id: 'team-2',
    name: 'Dr. Michael, DDS',
    role: 'Charity Coordinator & Orthodontist',
    tag: 'Rural Deployment Lead',
    desc: 'Dr. Michael oversees the logistics and clinical execution of all rural charity camps. His passion is bringing modern clinical standards out of Dar es Salaam straight to remote Tanzanian schools.',
    image: '/images/MICHAEL.jpg',
    socials: { linkedin: '#', instagram: '#' },
  },
  {
    id: 'team-3',
    name: 'Dr. Sylvia, DDS',
    role: 'Pediatric Dentist & Reconstructive Surgeon',
    tag: 'Clinical Operations Lead',
    desc: 'Dr. Sylvia specializes in advanced pediatric dental care and reconstructive surgery. Her gentle approach and comforting presence help children feel safe and at ease during complex procedures.',
    image: '/images/SYLVIA.jpg',
    socials: { linkedin: '#', instagram: '#' },
  },
];

// Helper functions to manage localStorage data with fail-safe error handling
export const getStoredEvents = (): ClinicEvent[] => {
  try {
    const data = localStorage.getItem('swdr_events');
    if (!data) {
      localStorage.setItem('swdr_events', JSON.stringify(INITIAL_EVENTS));
      return INITIAL_EVENTS;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to parse stored events, resetting data:', error);
    localStorage.setItem('swdr_events', JSON.stringify(INITIAL_EVENTS));
    return INITIAL_EVENTS;
  }
};

export const saveStoredEvents = (events: ClinicEvent[]) => {
  try {
    localStorage.setItem('swdr_events', JSON.stringify(events));
  } catch (error) {
    console.error('Failed to save events to localStorage:', error);
  }
};

export const getStoredNews = (): NewsArticle[] => {
  try {
    const data = localStorage.getItem('swdr_news');
    if (!data) {
      localStorage.setItem('swdr_news', JSON.stringify(INITIAL_NEWS));
      return INITIAL_NEWS;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to parse stored news, resetting data:', error);
    localStorage.setItem('swdr_news', JSON.stringify(INITIAL_NEWS));
    return INITIAL_NEWS;
  }
};

export const saveStoredNews = (news: NewsArticle[]) => {
  try {
    localStorage.setItem('swdr_news', JSON.stringify(news));
  } catch (error) {
    console.error('Failed to save news to localStorage:', error);
  }
};

export const getStoredImpact = (): ImpactStory[] => {
  try {
    const data = localStorage.getItem('swdr_impact');
    if (!data) {
      localStorage.setItem('swdr_impact', JSON.stringify(INITIAL_IMPACT));
      return INITIAL_IMPACT;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to parse stored impact, resetting data:', error);
    localStorage.setItem('swdr_impact', JSON.stringify(INITIAL_IMPACT));
    return INITIAL_IMPACT;
  }
};

export const saveStoredImpact = (impact: ImpactStory[]) => {
  try {
    localStorage.setItem('swdr_impact', JSON.stringify(impact));
  } catch (error) {
    console.error('Failed to save impact to localStorage:', error);
  }
};

export const getStoredTeam = (): TeamMember[] => {
  try {
    const data = localStorage.getItem('swdr_team');
    if (!data) {
      localStorage.setItem('swdr_team', JSON.stringify(INITIAL_TEAM));
      return INITIAL_TEAM;
    }
    let parsed = JSON.parse(data) as TeamMember[];
    let migrated = false;
    parsed = parsed.map(m => {
      if (m.id === 'team-1') {
        const targetDesc = 'With over 12 years of clinical experience, Dr. Melkisedeck Robert graduated from Muhimbili University of Health and Allied Sciences and holds a Pediatric Dental Specialization from UCSF. He established SWDR to bridge the gap in rural child dental health.';
        if (
          m.name !== 'Dr. Melkisedeck Robert, DDS' ||
          m.image !== '/images/Dorcas_19.webp' ||
          m.desc !== targetDesc
        ) {
          migrated = true;
          return {
            ...m,
            name: 'Dr. Melkisedeck Robert, DDS',
            image: '/images/Dorcas_19.webp',
            desc: targetDesc
          };
        }
      }
      if (m.id === 'team-2') {
        const targetDesc = 'Dr. Michael oversees the logistics and clinical execution of all rural charity camps. His passion is bringing modern clinical standards out of Dar es Salaam straight to remote Tanzanian schools.';
        if (
          m.name !== 'Dr. Michael, DDS' ||
          m.image !== '/images/MICHAEL.jpg' ||
          m.desc !== targetDesc
        ) {
          migrated = true;
          return {
            ...m,
            name: 'Dr. Michael, DDS',
            image: '/images/MICHAEL.jpg',
            desc: targetDesc
          };
        }
      }
      if (m.id === 'team-3') {
        const targetDesc = 'Dr. Sylvia specializes in advanced pediatric dental care and reconstructive surgery. Her gentle approach and comforting presence help children feel safe and at ease during complex procedures.';
        if (
          m.name !== 'Dr. Sylvia, DDS' ||
          m.image !== '/images/SYLVIA.jpg' ||
          m.desc !== targetDesc ||
          m.role !== 'Pediatric Dentist & Reconstructive Surgeon' ||
          m.tag !== 'Clinical Operations Lead'
        ) {
          migrated = true;
          return {
            ...m,
            name: 'Dr. Sylvia, DDS',
            image: '/images/SYLVIA.jpg',
            role: 'Pediatric Dentist & Reconstructive Surgeon',
            tag: 'Clinical Operations Lead',
            desc: targetDesc
          };
        }
      }
      return m;
    });
    if (migrated) {
      localStorage.setItem('swdr_team', JSON.stringify(parsed));
    }
    return parsed;
  } catch (error) {
    console.error('Failed to parse stored team, resetting data:', error);
    localStorage.setItem('swdr_team', JSON.stringify(INITIAL_TEAM));
    return INITIAL_TEAM;
  }
};

export const saveStoredTeam = (team: TeamMember[]) => {
  try {
    localStorage.setItem('swdr_team', JSON.stringify(team));
  } catch (error) {
    console.error('Failed to save team to localStorage:', error);
  }
};
