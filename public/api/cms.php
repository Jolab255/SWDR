<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Fallback for environments where getallheaders() is not natively defined (e.g. some Nginx configurations)
if (!function_exists('getallheaders')) {
    function getallheaders() {
        $headers = array();
        foreach ($_SERVER as $name => $value) {
            if (substr($name, 0, 5) == 'HTTP_') {
                $headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value;
            }
        }
        return $headers;
    }
}

// Path to the data file
define('DATA_FILE', __DIR__ . '/../data/cms_data.json');

// SHA-256 of "SmileDrRomeSecure2026!"
define('SECURE_HASH', '497be1999611f310a4c36a3ac3a5ccaf5853277413ac7c7c659972bea8a32a58');

// Default initial data to initialize the system if the file does not exist
$initial_data = [
    "events" => [
        [
            "id" => "evt-1",
            "title" => "Rural Pediatric Dental Charity",
            "date" => "2026-06-15",
            "time" => "08:00 AM - 05:00 PM",
            "location" => "Kisarawe Community Clinic, Pwani",
            "description" => "Our upcoming full-day pediatric dental charity camp is heading to the Kisarawe district in Pwani, an area where over 80% of children have never had access to a professional dentist. The nearest dental facility is over 60 kilometers away, leaving hundreds of children with untreated cavities, chronic infections, and toothaches that disrupt their education. We aim to screen and treat over 150 children in a single day, setting up five fully-functional mobile dental clinics inside the Kisarawe Community Centre. Our volunteer clinical team will provide comprehensive screenings, restorative composite fillings, emergency extractions to relieve chronic pain, and specialized fluoride treatments to prevent future decay. Simultaneously, our education team will conduct small-group workshops demonstrating proper brushing techniques, distributing 200+ pediatric hygiene kits (comprising bamboo toothbrushes, fluoride toothpaste, and educational storybooks). Volunteers are needed to assist with clinical setup, patient triage, instruments sterilization, and hosting the hygiene workshops. Donations are highly vital here: every $15 directly sponsors one child's comprehensive checkup, treatment, and hygiene kit. Our goal is to eradicate preventable oral infections in this community and establish a strong foundation for lifelong hygiene.",
            "category" => "Charity Campaign",
            "image" => "/images/mobile_clinic.webp",
            "slotsTotal" => 150,
            "slotsRegistered" => 112
        ],
        [
            "id" => "evt-2",
            "title" => "Reconstructive Smile Surgery Camp",
            "date" => "2026-07-02",
            "time" => "07:30 AM - 06:00 PM",
            "location" => "SWDR Dental Clinic HQ, Dar es Salaam",
            "description" => "Led by Dr. Melkisedeck Robert and a dedicated team of visiting maxillofacial surgeons, our quarterly Reconstructive Smile Surgery Camp will take place at our main headquarters clinic in Dar es Salaam. This high-impact surgical camp focuses on providing life-changing cleft lip, cleft palate, and severe congenital reconstructive dental surgeries for 12 vulnerable children selected from remote rural regions across Tanzania. Many of these children suffer from severe social stigma, difficulties eating or speaking, and chronic respiratory issues due to their untreated conditions. Because cleft surgeries cost upwards of $2,000 in private hospitals, most rural families are forced to live without hope. Our clinic covers 100% of the surgical, hospital stay, post-operative therapy, and family travel costs through donor support. During this intensive camp, volunteers will support non-surgical clinical tasks, coordinate patient registration, manage family support lounges, and assist in setting up recovery wards. Medical practitioners can volunteer to assist in post-operative nursing care. 100% of donations raised during this event go directly toward purchasing surgical sutures, anesthesia, antibiotics, and post-op nutritional supplements. Help us restore not just a smile, but a future full of hope and dignity.",
            "category" => "Surgical & Restorative Camp",
            "image" => "/images/surgical_camp.webp",
            "slotsTotal" => 12,
            "slotsRegistered" => 9
        ],
        [
            "id" => "evt-3",
            "title" => "Annual charity \"Miles for Smiles\" Run",
            "date" => "2026-06-28",
            "time" => "06:00 AM - 11:00 AM",
            "location" => "Coco Beach, Dar es Salaam",
            "description" => "Join hundreds of passionate runners, advocates, and health professionals for our annual charity 'Miles for Smiles' 5K and 10K Run at Coco Beach, Dar es Salaam! This vibrant community fundraiser raises critical awareness and direct financial contributions to support our rural dental charities and reconstructive surgery camps. The event starts at sunrise along the scenic Indian Ocean coastline. In addition to the run, the day features free public dental checkups at our mobile charity booths, live hygiene demonstrations for families, and fun interactive activities for children. All proceeds from registration fees, corporate sponsorships, and individual run donations will go directly toward funding our mobile charity vans, purchasing portable dental drills, and sponsoring cleft lip surgeries for children in remote areas who have no other options. Volunteers will play a crucial role in managing the course hydration stations, distributing finisher medals, managing registration desks, directing beach crowds, and assisting in our dental screening tents. Every step you run and every shilling you donate helps us cross the finish line to reach children who are living in pain.",
            "category" => "Marathon & Fundraising",
            "image" => "/images/swdr_happy_children.webp",
            "slotsTotal" => 500,
            "slotsRegistered" => 342
        ],
        [
            "id" => "evt-4",
            "title" => "Children's Oral Hygiene Workshop",
            "date" => "2026-08-10",
            "time" => "10:00 AM - 01:00 PM",
            "location" => "Arusha Orphanage Centre, Arusha",
            "description" => "Our specialized pediatric team is hosting an interactive, high-energy Oral Hygiene Workshop for the children at the Arusha Orphanage Centre. Chronic tooth decay is a silent epidemic in orphanage centers due to lack of specialized dental care, lack of individual hygiene supplies, and nutritional gaps. We are bringing a team of dental hygienists and general volunteers to teach over 80 children the fundamentals of oral health through interactive games, giant teeth brushing models, and storytelling. Each child will receive a personalized dental checkup, professional fluoride treatment, and a 'Smile Kit' containing a 6-month supply of toothbrushes, toothpaste, and dental floss. We will also be training orphanage caretakers on how to spot early signs of infection and maintain daily oral care schedules. Volunteers will work in small groups with the children, assisting them during the brushing practice sessions, coordinating the educational games, and distributing the Smile Kits. Donations of any amount will go directly toward replenishing our clinical fluoride stocks and purchasing high-quality soft-bristle toothbrushes and educational materials. Let's make learning about health an exciting and empowering experience for these beautiful children!",
            "category" => "Oral Hygiene Workshop",
            "image" => "/images/event_hygiene_workshop.webp",
            "slotsTotal" => 80,
            "slotsRegistered" => 65
        ],
        [
            "id" => "evt-5",
            "title" => "Community Dental Health & Hygiene Seminar",
            "date" => "2026-07-18",
            "time" => "09:00 AM - 03:00 PM",
            "location" => "Morogoro Town Hall, Morogoro",
            "description" => "Our major educational seminar at the Morogoro Town Hall aims to create sustainable health outcomes by training community leaders, primary school teachers, and parents on the importance of pediatric dental hygiene. In many rural communities, dental decay is misunderstood, and children suffer in silence until infections become severe. This full-day seminar features lectures by Dr. Melkisedeck Robert and local public health specialists on nutrition, preventing early childhood caries, and identifying tooth decay before it requires extraction. We will also provide hands-on training to 50 primary school teachers, equipping them with the curriculum and dental kits to run weekly hygiene checks in their classrooms, protecting over 2,000 rural students. Volunteers will assist with participant registration, seminar room setup, distributing health booklets, and coordinating the lunch service. Donations to this seminar are highly impactful: just $50 allows us to fully train and equip a local school teacher, ensuring a whole classroom of children has access to daily hygiene monitoring and early referral programs. Education is the ultimate prevention.",
            "category" => "Charity Campaign",
            "image" => "/images/event_community_seminar.webp",
            "slotsTotal" => 100,
            "slotsRegistered" => 45
        ]
    ],
    "news" => [
        [
            "id" => "news-1",
            "title" => "Restoring Aisha's Smile: A Journey of Hope",
            "date" => "2026-05-20",
            "author" => "Dr. Melkisedeck Robert",
            "summary" => "How a simple 2-hour surgery transformed the life of 8-year-old Aisha, who suffered from severe dental infections that prevented her from going to school.",
            "content" => "Aisha, an energetic 8-year-old from a remote village in Shinyanga, had been suffering from chronic tooth decay and abscesses for over two years. The pain was so intense that she could barely eat and had to drop out of school. Her family, surviving on less than $1.50 a day, could not afford dental care. Thanks to our monthly Charity Program funded by your generous donations, we met Aisha. She was brought to our clinic in Dar es Salaam where Dr. Melkisedeck Robert performed successful restorative dental surgery, clearing the infection and rebuilding her teeth. Today, Aisha is back in school, pain-free, and showing off her gorgeous new smile to everyone!",
            "category" => "Success Story",
            "image" => "/images/swdr_happy_children.webp"
        ],
        [
            "id" => "news-2",
            "title" => "Critical Link Between Children's Oral Health & Nutrition",
            "date" => "2026-05-10",
            "author" => "Dr. Melkisedeck Robert",
            "summary" => "Read our latest pediatric clinical article outlining how dental decay affects physical development and academic attendance in growing children.",
            "content" => "Oral health is often overlooked, but it is a critical component of a child's overall physical and cognitive development. When children suffer from untreated cavities and chronic dental pain, their ability to chew food properly decreases, leading to nutritional deficiencies and stunted growth. Furthermore, severe toothaches are the leading cause of health-related school absenteeism in low-income areas in East Africa. Our clinic's mission is not just cosmetic; it is a fundamental intervention in child health, nutrition, and education. Regular brushing, fluoride applications, and early intervention can prevent over 90% of these cases.",
            "category" => "Health Advice",
            "image" => "/images/swdr_hero.webp"
        ],
        [
            "id" => "news-3",
            "title" => "Selcom & Tanzania Mobile Money Partnership Launched",
            "date" => "2026-05-02",
            "author" => "SWDR Board",
            "summary" => "We have successfully integrated a unified payment checkout system, allowing seamless global card and Tanzanian local mobile money donations.",
            "content" => "To make donating simple and secure for our local and international supporters, Smile with Doctor Rome Dental Clinic has collaborated with Tanzanian payment operators, integrating our donation page with Selcom. This integration enables supporters to donate using Vodacom M-Pesa, Tigo Pesa, Airtel Money, and Halopesa instantly via USSD Push. International donors can now also donate securely using Visa, MasterCard, and direct bank transfers. Every single Shilling or Dollar donated goes directly to funding our medical supplies, transport, and surgical equipment for children in hard-to-reach environments.",
            "category" => "Clinic News",
            "image" => "/images/swdr_doctor_rome.webp"
        ]
    ],
    "impact" => [
        [
            "id" => "impact-1",
            "title" => "Rural Hygiene Campaign",
            "location" => "Morogoro Rural",
            "date" => "2026-05-15",
            "description" => "Our team visited rural schools, teaching oral health and gifting brushing kits to 500+ pupils.",
            "image" => "/images/impact_hygiene_campaign.webp",
            "gallery" => [
                "/images/impact_hygiene_campaign.webp",
                "/images/mobile_clinic.webp",
                "/images/impact_caregiver_workshop.webp",
                "/images/impact_specialized_care.webp",
                "/images/restorative_surgery.webp"
            ]
        ],
        [
            "id" => "impact-2",
            "title" => "Mobile Clinic Deployment",
            "location" => "Kisarawe District",
            "date" => "2026-04-20",
            "description" => "Reaching out to isolated villagers who have not seen a dental practitioner in their entire lifetime.",
            "image" => "/images/mobile_clinic.webp",
            "gallery" => [
                "/images/mobile_clinic.webp",
                "/images/impact_team_outreach.webp",
                "/images/surgical_camp.webp",
                "/images/restorative_surgery.webp"
            ]
        ],
        [
            "id" => "impact-3",
            "title" => "Restorative Surgery Success",
            "location" => "Dar es Salaam HQ",
            "date" => "2026-03-12",
            "description" => "Performing life-altering tooth reconstruction for a child overcoming severe congenital problems.",
            "image" => "/images/restorative_surgery.webp",
            "gallery" => [
                "/images/restorative_surgery.webp",
                "/images/impact_specialized_care.webp",
                "/images/surgical_camp.webp"
            ]
        ],
        [
            "id" => "impact-4",
            "title" => "Community Surgical Camp",
            "location" => "Arusha Outskirts",
            "date" => "2026-02-05",
            "description" => "Families gathered in expectation for our free reconstructive surgical outreach in the north.",
            "image" => "/images/surgical_camp.webp",
            "gallery" => [
                "/images/surgical_camp.webp",
                "/images/mobile_clinic.webp",
                "/images/impact_team_outreach.webp"
            ]
        ],
        [
            "id" => "impact-5",
            "title" => "Specialized Care Integration",
            "location" => "Dorcas Homecare, Madale",
            "date" => "2026-03-20",
            "description" => "Integrating dental screening routines and mobility therapy for lovely kids at Dorcas Home.",
            "image" => "/images/impact_specialized_care.webp",
            "gallery" => [
                "/images/impact_specialized_care.webp",
                "/images/impact_hygiene_campaign.webp",
                "/images/restorative_surgery.webp"
            ]
        ],
        [
            "id" => "impact-6",
            "title" => "Clinical Outreach Team",
            "location" => "Dar es Salaam HQ",
            "date" => "2026-01-10",
            "description" => "Our dentists, coordinators, and local volunteers joining forces before launching into the field.",
            "image" => "/images/impact_team_outreach.webp",
            "gallery" => [
                "/images/impact_team_outreach.webp",
                "/images/mobile_clinic.webp",
                "/images/surgical_camp.webp"
            ]
        ],
        [
            "id" => "impact-7",
            "title" => "Caregiver Education Workshops",
            "location" => "Community Centres",
            "date" => "2026-04-05",
            "description" => "Providing local mothers and primary guardians with foundational child hygiene knowledge.",
            "image" => "/images/impact_caregiver_workshop.webp",
            "gallery" => [
                "/images/impact_caregiver_workshop.webp",
                "/images/impact_hygiene_campaign.webp",
                "/images/impact_specialized_care.webp"
            ]
        ]
    ],
    "team" => [
        [
            "id" => "team-1",
            "name" => "Dr. Melkisedeck Robert, DDS",
            "role" => "Founder & Lead Pediatric Dentist",
            "tag" => "MUHAS · UCSF Pediatric Specialist",
            "desc" => "With over 12 years of clinical experience, Dr. Melkisedeck Robert graduated from Muhimbili University of Health and Allied Sciences and holds a Pediatric Dental Specialization from UCSF. He established SWDR to bridge the gap in rural child dental health.",
            "image" => "/images/Dorcas_19.webp",
            "socials" => ["linkedin" => "#", "instagram" => "#"]
        ],
        [
            "id" => "team-2",
            "name" => "Dr. Michael, DDS",
            "role" => "Charity Coordinator & Orthodontist",
            "tag" => "Rural Deployment Lead",
            "desc" => "Dr. Michael oversees the logistics and clinical execution of all rural charity camps. His passion is bringing modern clinical standards out of Dar es Salaam straight to remote Tanzanian schools.",
            "image" => "/images/MICHAEL.jpg",
            "socials" => ["linkedin" => "#", "instagram" => "#"]
        ],
        [
            "id" => "team-3",
            "name" => "Dr. Sylvia, DDS",
            "role" => "Pediatric Dentist & Reconstructive Surgeon",
            "tag" => "Clinical Operations Lead",
            "desc" => "Dr. Sylvia specializes in advanced pediatric dental care and reconstructive surgery. Her gentle approach and comforting presence help children feel safe and at ease during complex procedures.",
            "image" => "/images/SYLVIA.jpg",
            "socials" => ["linkedin" => "#", "instagram" => "#"]
        ]
    ]
];

// 1. Ensure directory exists
$dir = dirname(DATA_FILE);
if (!file_exists($dir)) {
    mkdir($dir, 0755, true);
}

// 2. Initialize file if it doesn't exist
if (!file_exists(DATA_FILE)) {
    file_put_contents(DATA_FILE, json_encode($initial_data, JSON_PRETTY_PRINT));
}

// Read current data helper function
function load_data() {
    $content = file_get_contents(DATA_FILE);
    if ($content === false) {
        return [];
    }
    return json_decode($content, true);
}

// Save current data helper function
function save_data($data) {
    return file_put_contents(DATA_FILE, json_encode($data, JSON_PRETTY_PRINT), LOCK_EX) !== false;
}

// 3. Handle operations
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $action = isset($_GET['action']) ? $_GET['action'] : 'get_all';
    
    if ($action === 'get_all') {
        $data = load_data();
        echo json_encode(["status" => "SUCCESS", "data" => $data]);
        exit;
    } else {
        http_response_code(400);
        echo json_encode(["status" => "ERROR", "message" => "Invalid action"]);
        exit;
    }
} 

if ($method === 'POST') {
    // Read POST body
    $raw_input = file_get_contents("php://input");
    $input = json_decode($raw_input, true);
    
    if (!$input) {
        http_response_code(400);
        echo json_encode(["status" => "ERROR", "message" => "Invalid JSON payload"]);
        exit;
    }
    
    $action = isset($input['action']) ? $input['action'] : '';
    
    // Public action: register_event
    if ($action === 'register_event') {
        $eventId = isset($input['eventId']) ? $input['eventId'] : '';
        if (empty($eventId)) {
            http_response_code(400);
            echo json_encode(["status" => "ERROR", "message" => "Missing eventId"]);
            exit;
        }
        
        $data = load_data();
        $found = false;
        if (isset($data['events']) && is_array($data['events'])) {
            foreach ($data['events'] as &$event) {
                if ($event['id'] === $eventId) {
                    $event['slotsRegistered'] = min($event['slotsRegistered'] + 1, $event['slotsTotal']);
                    $found = true;
                    break;
                }
            }
        }
        
        if ($found) {
            if (save_data($data)) {
                echo json_encode(["status" => "SUCCESS", "message" => "Registered successfully", "events" => $data['events']]);
            } else {
                http_response_code(500);
                echo json_encode(["status" => "ERROR", "message" => "Failed to save registration data"]);
            }
        } else {
            http_response_code(404);
            echo json_encode(["status" => "ERROR", "message" => "Event not found"]);
        }
        exit;
    }
    
    // Auth protected actions: save_section
    $headers = getallheaders();
    $auth = '';
    
    // Check Authorization header (case insensitive check)
    foreach ($headers as $header_name => $header_val) {
        if (strtolower($header_name) === 'authorization') {
            $auth = trim($header_val);
            break;
        }
    }
    
    // Remove "Bearer " prefix if present
    if (stripos($auth, 'bearer ') === 0) {
        $auth = substr($auth, 7);
    }
    
    if ($auth !== SECURE_HASH) {
        http_response_code(401);
        echo json_encode(["status" => "ERROR", "message" => "Unauthorized: Invalid token"]);
        exit;
    }
    
    if ($action === 'save_section') {
        $section = isset($input['section']) ? $input['section'] : ''; // events, news, impact, team
        $section_data = isset($input['data']) ? $input['data'] : null;
        
        if (!in_array($section, ['events', 'news', 'impact', 'team']) || !is_array($section_data)) {
            http_response_code(400);
            echo json_encode(["status" => "ERROR", "message" => "Invalid section or data format"]);
            exit;
        }
        
        $data = load_data();
        $data[$section] = $section_data;
        
        if (save_data($data)) {
            echo json_encode(["status" => "SUCCESS", "message" => "Section updated successfully", "data" => $data[$section]]);
        } else {
            http_response_code(500);
            echo json_encode(["status" => "ERROR", "message" => "Failed to write data to file"]);
        }
        exit;
    }
    
    http_response_code(400);
    echo json_encode(["status" => "ERROR", "message" => "Invalid POST action"]);
    exit;
}

http_response_code(405);
echo json_encode(["status" => "ERROR", "message" => "Method not allowed"]);
