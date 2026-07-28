export type TripRoute = {
  slug: string;
  city: string;
  km: number;
  hours: string;
  tagline: string;
  intro: string;
  via: string[];
  highlights: { icon: string; label: string; desc: string }[];
  stops: { title: string; desc: string }[];
  bestFor: string[];
  vehicles: string[];
  faqs: { q: string; a: string }[];
  seo: { title: string; desc: string };
};

const V = {
  sedan: "Honda City / Amaze (Sedan, 4+1)",
  ertiga: "Maruti Ertiga (MUV, 6+1)",
  crysta: "Toyota Innova Crysta (Premium SUV, 6+1)",
  hycross: "Toyota Innova Hycross (Premium SUV, 6+1)",
  fortuner: "Toyota Fortuner / Kia Carnival (Luxury)",
  tempo: "Tempo Traveller (12+1)",
};

export const TRIP_ROUTES: Record<string, TripRoute> = {
  "hyderabad-to-vijayawada": {
    slug: "hyderabad-to-vijayawada",
    city: "Vijayawada",
    km: 275,
    hours: "4.5 – 5 hrs",
    tagline: "Non-stop cabs on NH-65 to Vijayawada, Amaravati and Machilipatnam",
    intro:
      "The Hyderabad to Vijayawada run is our single most-booked outstation route. The entire stretch is four-lane NH-65 via Suryapet, so a comfortable Crysta covers it in under five hours with one meal halt. We handle early-morning business departures, same-day return trips to Amaravati and late-night drops after Vijayawada railway station arrivals.",
    via: ["Ramoji Film City Junction", "Choutuppal", "Suryapet", "Nandigama", "Kanchikacherla"],
    highlights: [
      { icon: "🛣️", label: "Full four-lane NH-65", desc: "Smooth expressway-grade highway the whole way — no diversions or ghat sections." },
      { icon: "🌅", label: "Same-day return possible", desc: "Leave Hyderabad at 5 AM, finish meetings and be back by night in one booking." },
      { icon: "🏛️", label: "Amaravati & Guntur add-on", desc: "Extend to Amaravati, Undavalli Caves or Guntur for a small extra distance charge." },
      { icon: "🍽️", label: "Trusted food halts", desc: "Drivers stop only at clean, well-lit highway restaurants near Suryapet." },
    ],
    stops: [
      { title: "Suryapet", desc: "The classic halfway break at 140 km — tiffin, restrooms and fuel." },
      { title: "Kodad", desc: "Popular for South Indian meals; ideal if you started late." },
      { title: "Nandigama", desc: "Last major halt before entering the Krishna district." },
      { title: "Kanaka Durga Temple", desc: "Most passengers add a darshan stop on Indrakeeladri hill on arrival." },
    ],
    bestFor: ["Business day trips", "Weekend family travel", "Temple visits", "Railway station transfers"],
    vehicles: [V.sedan, V.ertiga, V.crysta, V.hycross, V.fortuner],
    faqs: [
      { q: "How long does a Hyderabad to Vijayawada cab take?", a: "Around 4.5 to 5 hours for the 275 km on NH-65, including one short break. Heavy festival traffic can add 45 minutes." },
      { q: "Do you offer one-way drop to Vijayawada?", a: "Yes. One-way drops are available on all vehicle types with no return-fare obligation for the customer." },
      { q: "Can the cab wait and return the same day?", a: "Yes — a same-day round trip with waiting time is our most common booking on this route." },
      { q: "Are tolls included?", a: "We share a single all-inclusive quote on WhatsApp covering fuel, driver allowance and tolls, so there are no surprises at the end of the trip." },
    ],
    seo: {
      title: "Hyderabad to Vijayawada Cab | One Way & Round Trip Taxi — GM Cabs",
      desc: "Book a Hyderabad to Vijayawada taxi — 275 km on NH-65 in about 5 hours. Innova Crysta, Hycross & sedans, one-way drops, 24×7 booking on WhatsApp.",
    },
  },

  "hyderabad-to-srisailam": {
    slug: "hyderabad-to-srisailam",
    city: "Srisailam",
    km: 215,
    hours: "4.5 – 5 hrs",
    tagline: "Temple cabs to Srisailam Mallikarjuna Jyotirlinga through the Nallamala forest",
    intro:
      "Srisailam is a pilgrimage route, not an ordinary highway drive. The last 60 km climbs through the Nallamala tiger reserve with tight ghat curves and a forest checkpost that closes at night. We deploy only drivers who know this stretch, start early so you clear the forest gate in daylight, and plan the day around darshan timings rather than the clock.",
    via: ["Shadnagar", "Amangal", "Kalwakurthy", "Mannanur forest checkpost", "Sunnipenta"],
    highlights: [
      { icon: "🛕", label: "Darshan-timed departure", desc: "We plan a 4 AM start so you reach for morning Mallikarjuna darshan." },
      { icon: "🌄", label: "Ghat-experienced drivers", desc: "Chauffeurs who regularly drive the Nallamala curves — safe, steady and unhurried." },
      { icon: "🐅", label: "Forest gate timing handled", desc: "The Mannanur checkpost restricts night movement; we schedule around it." },
      { icon: "🚙", label: "Higher-clearance vehicles", desc: "Crysta and Hycross recommended over sedans for the hill section." },
    ],
    stops: [
      { title: "Kalwakurthy", desc: "Breakfast halt before entering the forest belt." },
      { title: "Mannanur", desc: "Forest entry checkpost and the start of the ghat climb." },
      { title: "Srisailam Dam viewpoint", desc: "A short photo halt over the Krishna reservoir." },
      { title: "Sakshi Ganapati & Paladhara Panchadhara", desc: "Nearby shrines most pilgrims cover after darshan." },
    ],
    bestFor: ["Jyotirlinga pilgrimage", "Family temple trips", "Weekend getaways", "Group bookings"],
    vehicles: [V.ertiga, V.crysta, V.hycross, V.fortuner, V.tempo],
    faqs: [
      { q: "What is the best time to start for Srisailam?", a: "Between 3:30 and 4:30 AM. You reach by 9 AM, complete darshan comfortably and are back out of the forest well before dark." },
      { q: "Is the Nallamala forest road safe at night?", a: "The forest stretch has movement restrictions after dark and wildlife crossings. We strongly recommend daylight travel and plan your return accordingly." },
      { q: "Which vehicle is best for Srisailam?", a: "Innova Crysta or Hycross. The extra ground clearance and stability make the ghat section far more comfortable than a sedan." },
      { q: "Can we cover Srisailam and Mahanandi together?", a: "Yes, this is a popular two-day combination. Tell us on WhatsApp and we will plan the itinerary and vehicle accordingly." },
    ],
    seo: {
      title: "Hyderabad to Srisailam Cab | Temple Taxi via Nallamala — GM Cabs",
      desc: "Book a Hyderabad to Srisailam taxi for Mallikarjuna Jyotirlinga darshan — 215 km, ghat-experienced drivers, early-morning starts, Innova Crysta & Hycross.",
    },
  },

  "hyderabad-to-warangal": {
    slug: "hyderabad-to-warangal",
    city: "Warangal",
    km: 150,
    hours: "2.5 – 3 hrs",
    tagline: "Quick heritage runs to Warangal Fort, Thousand Pillar Temple and Ramappa",
    intro:
      "Warangal is the easiest full-day outing from Hyderabad — 150 km of good highway and back before dinner. Most of our passengers combine Warangal Fort, the Thousand Pillar Temple and the UNESCO-listed Ramappa Temple in a single day, which needs a car at your disposal rather than a point-to-point drop.",
    via: ["Ghatkesar", "Bhongir Fort", "Jangaon", "Ghanpur"],
    highlights: [
      { icon: "🏰", label: "Kakatiya heritage circuit", desc: "Fort, Thousand Pillar Temple and Bhadrakali Temple in one comfortable loop." },
      { icon: "🕒", label: "Easy day trip", desc: "Leave at 7 AM, see everything, return the same evening." },
      { icon: "🗿", label: "Ramappa UNESCO add-on", desc: "70 km beyond Warangal — we build it into the day plan." },
      { icon: "🧭", label: "Car stays with you", desc: "Full-day disposal so you are never waiting for another ride between sites." },
    ],
    stops: [
      { title: "Bhongir Fort", desc: "A dramatic monolithic rock fort, 50 km out — worth a 30-minute stop." },
      { title: "Thousand Pillar Temple", desc: "12th-century Kakatiya architecture in Hanamkonda." },
      { title: "Warangal Fort & Kush Mahal", desc: "The iconic carved stone gateways." },
      { title: "Ramappa Temple & Lake", desc: "UNESCO World Heritage site at Palampet." },
    ],
    bestFor: ["Heritage day trips", "School & college groups", "Family outings", "Business visits"],
    vehicles: [V.sedan, V.ertiga, V.crysta, V.hycross, V.tempo],
    faqs: [
      { q: "Can Warangal be done as a one-day trip from Hyderabad?", a: "Comfortably. A 7 AM start covers Bhongir, the Thousand Pillar Temple, Warangal Fort and Ramappa with a return by 9 PM." },
      { q: "Do you provide full-day disposal in Warangal?", a: "Yes — the cab and driver stay with you for the whole day rather than dropping and leaving." },
      { q: "Is Ramappa Temple worth adding?", a: "Yes. It is India's UNESCO-listed Kakatiya masterpiece and adds roughly 140 km round trip from Warangal city." },
    ],
    seo: {
      title: "Hyderabad to Warangal Cab | Fort & Ramappa Day Trip Taxi — GM Cabs",
      desc: "Hyderabad to Warangal taxi — 150 km, under 3 hours. Full-day disposal covering Warangal Fort, Thousand Pillar Temple and Ramappa. Book 24×7 on WhatsApp.",
    },
  },

  "hyderabad-to-tirupati": {
    slug: "hyderabad-to-tirupati",
    city: "Tirupati",
    km: 560,
    hours: "9 – 10 hrs",
    tagline: "Overnight temple cabs to Tirumala Balaji with darshan-friendly scheduling",
    intro:
      "Tirupati is a long-haul route that we run as an overnight drive so families arrive fresh for morning darshan. The 560 km stretch runs down NH-44 through Kurnool and Kadapa district. We assign a rested driver, plan two safe halts and drop you either at your Tirupati hotel or directly at the Alipiri foot of the hills.",
    via: ["Shadnagar", "Kurnool", "Nandyal / Kadapa", "Rayachoti", "Pileru"],
    highlights: [
      { icon: "🌙", label: "Overnight departure", desc: "A 9 PM start puts you in Tirupati by early morning for darshan." },
      { icon: "😴", label: "Rest-first driver policy", desc: "Long-haul drivers are rostered fresh — never back-to-back after another trip." },
      { icon: "⛰️", label: "Ghat road to Tirumala", desc: "We can drive up the Alipiri ghat road or drop you for the TTD bus, as you prefer." },
      { icon: "🧳", label: "Multi-day packages", desc: "Tirupati with Kanipakam, Srikalahasti or Kanchipuram over 2–3 days." },
    ],
    stops: [
      { title: "Kurnool", desc: "Dinner or late-night halt at 210 km." },
      { title: "Kadapa / Rayachoti", desc: "Pre-dawn tea break and driver rest point." },
      { title: "Srikalahasti", desc: "Often added on the way in or out — 35 km from Tirupati." },
      { title: "Alipiri", desc: "Foot of the Tirumala hills, the starting point for the ghat climb." },
    ],
    bestFor: ["Balaji darshan trips", "Family pilgrimages", "Multi-temple tours", "Senior-citizen travel"],
    vehicles: [V.ertiga, V.crysta, V.hycross, V.fortuner, V.tempo],
    faqs: [
      { q: "How long is the Hyderabad to Tirupati cab journey?", a: "About 9 to 10 hours for 560 km. Most families travel overnight and reach in time for morning darshan." },
      { q: "Can the cab go up to Tirumala?", a: "Yes, private vehicles can use the Alipiri ghat road subject to TTD checks. Many passengers prefer we drop at Alipiri and take the TTD bus up." },
      { q: "Do you help with darshan tickets?", a: "We do not book TTD tickets, but our drivers know the timings and queue points and will plan your day around your darshan slot." },
      { q: "Is a 2-day round trip cheaper than one-way both times?", a: "Usually yes. Share your dates on WhatsApp and we will quote both options so you can compare." },
    ],
    seo: {
      title: "Hyderabad to Tirupati Cab | Overnight Balaji Darshan Taxi — GM Cabs",
      desc: "Book a Hyderabad to Tirupati taxi for Tirumala Balaji darshan — 560 km overnight, rested drivers, Innova Crysta, Hycross & Tempo Traveller. 24×7 WhatsApp booking.",
    },
  },

  "hyderabad-to-bangalore": {
    slug: "hyderabad-to-bangalore",
    city: "Bangalore",
    km: 570,
    hours: "8.5 – 9.5 hrs",
    tagline: "Door-to-door intercity cabs on NH-44 — relocation, corporate and family travel",
    intro:
      "The Hyderabad to Bangalore corridor is almost entirely six-lane NH-44, which makes it one of the fastest long routes in South India. We run it for corporate transfers, family relocations with luggage, and passengers who would rather not deal with flight check-in and two airport commutes for a 570 km trip.",
    via: ["Shadnagar", "Kurnool", "Anantapur", "Chikkaballapur", "Yelahanka"],
    highlights: [
      { icon: "🛣️", label: "Six-lane highway throughout", desc: "NH-44 is one of India's best-maintained corridors — consistent, predictable timing." },
      { icon: "🏢", label: "Corporate-ready", desc: "GST invoice, on-time pickup and professional chauffeurs for company travel." },
      { icon: "📦", label: "Relocation friendly", desc: "Crysta and Carnival options with genuine luggage space for shifting households." },
      { icon: "📍", label: "Door-to-door", desc: "Home to home — no airport transfers, security lines or baggage limits." },
    ],
    stops: [
      { title: "Kurnool", desc: "First major halt at 210 km, good breakfast options." },
      { title: "Anantapur", desc: "Midpoint break, fuel and restrooms." },
      { title: "Lepakshi", desc: "A worthwhile 15 km detour for the Veerabhadra Temple and Nandi monolith." },
      { title: "Chikkaballapur", desc: "Final halt before Bangalore city traffic." },
    ],
    bestFor: ["Corporate transfers", "Family relocation", "Airport-free intercity travel", "Group trips"],
    vehicles: [V.sedan, V.crysta, V.hycross, V.fortuner, V.tempo],
    faqs: [
      { q: "How many hours is Hyderabad to Bangalore by cab?", a: "Around 8.5 to 9.5 hours for 570 km on NH-44, depending on Bangalore city traffic at the end." },
      { q: "Is one-way drop available to Bangalore?", a: "Yes, one-way drops are available on all vehicles. Round trips are more economical if you are returning within two or three days." },
      { q: "Can you provide a GST invoice for company travel?", a: "Yes. Mention it when booking on WhatsApp and we will issue a proper invoice with your company details." },
      { q: "Do two drivers travel on long routes?", a: "For back-to-back long-haul or overnight schedules we assign a second driver on request so no one drives fatigued." },
    ],
    seo: {
      title: "Hyderabad to Bangalore Cab | One Way Intercity Taxi — GM Cabs",
      desc: "Hyderabad to Bangalore taxi on NH-44 — 570 km door-to-door in about 9 hours. Innova Crysta, Fortuner & Tempo Traveller, GST invoice, one-way drops available.",
    },
  },

  "hyderabad-to-visakhapatnam": {
    slug: "hyderabad-to-visakhapatnam",
    city: "Visakhapatnam",
    km: 620,
    hours: "10 – 11 hrs",
    tagline: "Long-distance cabs to Vizag beaches, Araku and the Vizag port belt",
    intro:
      "Vizag is our longest coastal route and one that rewards travelling by road. Beyond the city you have Araku Valley, Borra Caves and the Rushikonda coastline — all of which need a car anyway. We usually plan a night departure or an early start, with a driver who continues with you for the local Vizag and Araku sightseeing.",
    via: ["Suryapet", "Vijayawada", "Rajahmundry", "Tuni", "Anakapalle"],
    highlights: [
      { icon: "🌊", label: "Coastal highway drive", desc: "NH-16 along the Andhra coast — flat, fast and scenic." },
      { icon: "⛰️", label: "Araku extension", desc: "Add Araku Valley and Borra Caves as a second-day hill circuit." },
      { icon: "🚗", label: "Driver stays with you", desc: "Multi-day packages keep the same car and chauffeur for local sightseeing." },
      { icon: "🌉", label: "Godavari bridge crossing", desc: "The Rajahmundry road bridge is a highlight of the drive." },
    ],
    stops: [
      { title: "Vijayawada", desc: "Natural halfway point at 275 km — meals and a Kanaka Durga stop." },
      { title: "Rajahmundry", desc: "Godavari river crossing and a good lunch break." },
      { title: "Annavaram", desc: "Satyanarayana Swamy Temple, a popular pilgrimage halt." },
      { title: "Anakapalle", desc: "Last stretch before entering Visakhapatnam." },
    ],
    bestFor: ["Beach holidays", "Araku Valley tours", "Family vacations", "Business travel to the port belt"],
    vehicles: [V.ertiga, V.crysta, V.hycross, V.fortuner, V.tempo],
    faqs: [
      { q: "How long does Hyderabad to Vizag take by road?", a: "Roughly 10 to 11 hours for 620 km. Many passengers break the journey overnight at Vijayawada or Rajahmundry." },
      { q: "Can you cover Araku Valley too?", a: "Yes. A 3-day package — Vizag city, Araku and Borra Caves — with the same vehicle and driver is our most popular Vizag booking." },
      { q: "Which vehicle suits this distance?", a: "Innova Crysta or Hycross. On a 10-hour drive the seat comfort and suspension make a real difference." },
    ],
    seo: {
      title: "Hyderabad to Visakhapatnam Cab | Vizag & Araku Taxi — GM Cabs",
      desc: "Book a Hyderabad to Vizag taxi — 620 km coastal drive via Vijayawada and Rajahmundry. Araku Valley and Borra Caves packages, Innova Crysta & Tempo Traveller.",
    },
  },

  "hyderabad-to-rajahmundry": {
    slug: "hyderabad-to-rajahmundry",
    city: "Rajahmundry",
    km: 445,
    hours: "7.5 – 8 hrs",
    tagline: "Godavari-belt cabs to Rajahmundry, Kovvur and Papikondalu departures",
    intro:
      "Rajahmundry sits on the Godavari and is the gateway to the Konaseema and Papikondalu boat trips. The drive follows NH-65 to Vijayawada and then NH-16 along the delta. We handle a lot of family function travel on this route — weddings, ceremonies and Godavari pushkaralu season bookings.",
    via: ["Suryapet", "Vijayawada", "Eluru", "Tadepalligudem", "Kovvur"],
    highlights: [
      { icon: "🌉", label: "Godavari arch bridge", desc: "One of the most striking river crossings in the country." },
      { icon: "⛵", label: "Papikondalu connection", desc: "We time arrivals for the morning boat departures from Pattiseema or Rajahmundry." },
      { icon: "🎉", label: "Function & wedding travel", desc: "Multi-car bookings for family events in the Godavari districts." },
      { icon: "🌾", label: "Konaseema detours", desc: "Extend to Amalapuram, Dindi or Antarvedi on the same booking." },
    ],
    stops: [
      { title: "Suryapet", desc: "Standard breakfast halt on NH-65." },
      { title: "Vijayawada", desc: "Meal break and route change onto NH-16." },
      { title: "Eluru", desc: "Short break in West Godavari district." },
      { title: "Kovvur", desc: "Just across the Godavari from Rajahmundry." },
    ],
    bestFor: ["Family functions", "Papikondalu boat trips", "Konaseema tours", "Pushkaralu travel"],
    vehicles: [V.sedan, V.ertiga, V.crysta, V.hycross, V.tempo],
    faqs: [
      { q: "How far is Rajahmundry from Hyderabad by cab?", a: "About 445 km, roughly 7.5 to 8 hours via Vijayawada on NH-65 and NH-16." },
      { q: "Can you arrange multiple cabs for a wedding?", a: "Yes. We regularly run multi-vehicle convoys for functions in the Godavari districts — share the guest count and we will plan it." },
      { q: "Do you cover Konaseema and Antarvedi?", a: "Yes, as an extension package with the same car and driver staying with you." },
    ],
    seo: {
      title: "Hyderabad to Rajahmundry Cab | Godavari Taxi Service — GM Cabs",
      desc: "Hyderabad to Rajahmundry taxi — 445 km via Vijayawada in about 8 hours. Papikondalu and Konaseema packages, wedding convoys, Innova Crysta & Tempo Traveller.",
    },
  },

  "hyderabad-to-guntur": {
    slug: "hyderabad-to-guntur",
    city: "Guntur",
    km: 290,
    hours: "5 – 5.5 hrs",
    tagline: "Business and family cabs to Guntur, Amaravati and Tenali",
    intro:
      "Guntur travel is usually purposeful — the chilli and cotton trade, Amaravati government offices, or family visits. The route mirrors the Vijayawada highway and then branches south. Because most trips involve multiple stops around the Guntur–Amaravati–Tenali triangle, we recommend keeping the cab on full-day disposal rather than booking separate drops.",
    via: ["Choutuppal", "Suryapet", "Nandigama", "Vijayawada bypass"],
    highlights: [
      { icon: "💼", label: "Business day trips", desc: "Early departure, meetings across Guntur and Amaravati, same-night return." },
      { icon: "🏛️", label: "Amaravati circuit", desc: "Amaravati Stupa, Undavalli Caves and the capital region on one booking." },
      { icon: "🧭", label: "Multi-stop disposal", desc: "The car stays with you through the day instead of drop-and-go." },
      { icon: "🛣️", label: "Fast NH-65 approach", desc: "Highway all the way to the Vijayawada bypass before the Guntur branch." },
    ],
    stops: [
      { title: "Suryapet", desc: "The regular halfway break." },
      { title: "Undavalli Caves", desc: "Rock-cut monuments just before Guntur, worth 30 minutes." },
      { title: "Amaravati", desc: "Stupa, Amareswara Temple and the capital region." },
      { title: "Tenali", desc: "20 km further for family visits or the local markets." },
    ],
    bestFor: ["Business travel", "Amaravati visits", "Family functions", "Airport connections via Gannavaram"],
    vehicles: [V.sedan, V.ertiga, V.crysta, V.hycross],
    faqs: [
      { q: "How long is the Hyderabad to Guntur drive?", a: "About 5 to 5.5 hours for 290 km, mostly on NH-65 before branching past Vijayawada." },
      { q: "Can we cover Guntur, Amaravati and Tenali in one day?", a: "Yes, with an early start and the cab on full-day disposal all three are comfortable in one day." },
      { q: "Do you drop at Gannavaram airport?", a: "Yes, Gannavaram (Vijayawada airport) drops and pickups are available on this route." },
    ],
    seo: {
      title: "Hyderabad to Guntur Cab | Amaravati & Tenali Taxi — GM Cabs",
      desc: "Book a Hyderabad to Guntur taxi — 290 km in about 5 hours. Amaravati, Undavalli and Tenali day packages with full-day disposal. 24×7 WhatsApp booking.",
    },
  },

  "hyderabad-to-nellore": {
    slug: "hyderabad-to-nellore",
    city: "Nellore",
    km: 460,
    hours: "8 – 8.5 hrs",
    tagline: "Cabs to Nellore, Mypadu beach and the Sri Ranganatha temple town",
    intro:
      "Nellore sits on the Chennai corridor and is a common stop for families heading further south. The drive runs down NH-44 to Kurnool territory before cutting across to the coast. Passengers frequently combine Nellore with Tirupati or Srikalahasti, which we plan as a single multi-day itinerary rather than separate bookings.",
    via: ["Shadnagar", "Kurnool", "Giddalur", "Kandukur", "Kavali"],
    highlights: [
      { icon: "🛕", label: "Temple combinations", desc: "Nellore with Tirupati, Srikalahasti or Penchalakona in one plan." },
      { icon: "🏖️", label: "Mypadu beach", desc: "A quiet coastal add-on 25 km from Nellore city." },
      { icon: "🧳", label: "Long-haul comfort", desc: "Crysta or Hycross recommended for the 8-hour run." },
      { icon: "🕐", label: "Flexible timing", desc: "Overnight or early-morning starts to suit temple and family schedules." },
    ],
    stops: [
      { title: "Kurnool", desc: "Main breakfast or dinner halt." },
      { title: "Giddalur", desc: "Scenic pass through the eastern hills." },
      { title: "Kandukur", desc: "Break before the coastal stretch." },
      { title: "Kavali", desc: "Last major town before Nellore." },
    ],
    bestFor: ["Temple circuits", "Family visits", "Beach getaways", "Onward travel to Chennai"],
    vehicles: [V.sedan, V.ertiga, V.crysta, V.hycross, V.tempo],
    faqs: [
      { q: "How long does Hyderabad to Nellore take?", a: "Around 8 to 8.5 hours for 460 km depending on the route taken and halts." },
      { q: "Can we combine Nellore with Tirupati?", a: "Yes — Nellore to Tirupati is only about 140 km, so a combined 2-day package is very common." },
      { q: "Is a sedan enough for this distance?", a: "It works for two or three passengers with light luggage, but for families we recommend a Crysta or Hycross." },
    ],
    seo: {
      title: "Hyderabad to Nellore Cab | One Way & Round Trip Taxi — GM Cabs",
      desc: "Hyderabad to Nellore taxi — 460 km in about 8 hours. Combine with Tirupati or Srikalahasti, Mypadu beach add-on. Innova Crysta & Hycross, 24×7 booking.",
    },
  },

  "hyderabad-to-ramoji-film-city": {
    slug: "hyderabad-to-ramoji-film-city",
    city: "Ramoji Film City",
    km: 30,
    hours: "45 – 60 mins",
    tagline: "Full-day cabs to Ramoji Film City with waiting included",
    intro:
      "Ramoji Film City is a full-day outing, not a drop. Cab aggregators will happily drive you there but finding a return ride at 7 PM from Hayathnagar is a familiar problem. We book this as a full-day package: the driver waits in the visitor parking all day and takes you home whenever you finish.",
    via: ["LB Nagar", "Hayathnagar", "Abdullapurmet"],
    highlights: [
      { icon: "🎬", label: "Driver waits all day", desc: "No scrambling for a return cab after the evening shows." },
      { icon: "👨‍👩‍👧", label: "Family-sized vehicles", desc: "Ertiga, Crysta and Tempo Traveller for larger groups." },
      { icon: "⏰", label: "Early gate arrival", desc: "We aim for the 9 AM opening so you get the full day inside." },
      { icon: "🎒", label: "Luggage stays in the car", desc: "Leave bags and shopping safely in the vehicle." },
    ],
    stops: [
      { title: "Morning pickup", desc: "Doorstep pickup anywhere in Hyderabad by 7:30–8 AM." },
      { title: "Ramoji main gate", desc: "Drop at the entrance; driver parks in visitor parking." },
      { title: "Evening pickup", desc: "Call the driver when you exit — no waiting on the road." },
      { title: "Optional dinner halt", desc: "Stop on the way back at LB Nagar or your preference." },
    ],
    bestFor: ["Family day out", "Corporate outings", "School groups", "Out-of-town visitors"],
    vehicles: [V.sedan, V.ertiga, V.crysta, V.hycross, V.tempo],
    faqs: [
      { q: "Does the driver wait at Ramoji Film City?", a: "Yes. Our Ramoji booking is a full-day package with waiting included — the driver stays in the visitor parking until you are done." },
      { q: "What time should we leave Hyderabad?", a: "Around 7:30 AM. Gates open at 9 AM and arriving early means shorter entry queues and a fuller day." },
      { q: "Is parking charged separately?", a: "Parking and tolls are folded into the single quote we share on WhatsApp." },
    ],
    seo: {
      title: "Hyderabad to Ramoji Film City Cab | Full Day Taxi — GM Cabs",
      desc: "Book a full-day Ramoji Film City cab from Hyderabad — driver waits all day, doorstep pickup and drop, Ertiga, Innova Crysta & Tempo Traveller. 24×7 booking.",
    },
  },

  "hyderabad-to-yadagirigutta": {
    slug: "hyderabad-to-yadagirigutta",
    city: "Yadagirigutta",
    km: 60,
    hours: "1.5 hrs",
    tagline: "Half-day temple cabs to Yadadri Lakshmi Narasimha Swamy",
    intro:
      "Yadadri is the easiest temple trip from Hyderabad — an hour and a half each way on the Warangal highway. Because darshan itself is quick, most families book it as a half-day round trip with the cab waiting, often adding Bhongir Fort or Kolanupaka Jain Temple on the way back.",
    via: ["Uppal", "Ghatkesar", "Bhongir", "Raigiri"],
    highlights: [
      { icon: "🛕", label: "Half-day round trip", desc: "Leave at 6 AM, darshan done, back home before lunch." },
      { icon: "🚗", label: "Cab waits at the temple", desc: "No return-ride hunting from the hill parking." },
      { icon: "🏰", label: "Bhongir Fort add-on", desc: "A 20-minute detour to the monolithic rock fort." },
      { icon: "🙏", label: "Kolanupaka option", desc: "The ancient Jain temple at Aleru, 20 km further." },
    ],
    stops: [
      { title: "Bhongir Fort", desc: "Rock fort visible from the highway — a popular quick stop." },
      { title: "Yadadri temple hill", desc: "Drop at the hill-top parking near the main entrance." },
      { title: "Kolanupaka Jain Temple", desc: "Optional add-on 20 km beyond Yadadri." },
      { title: "Breakfast halt", desc: "Highway tiffin centres near Ghatkesar on the way back." },
    ],
    bestFor: ["Weekly darshan", "Senior citizens", "Half-day family trips", "First-time visitors"],
    vehicles: [V.sedan, V.ertiga, V.crysta, V.hycross, V.tempo],
    faqs: [
      { q: "How long does a Yadagirigutta trip take?", a: "About 5 to 6 hours door to door including darshan — an easy half-day booking." },
      { q: "Will the cab wait during darshan?", a: "Yes, waiting is included in the round-trip package." },
      { q: "Can we add Bhongir Fort?", a: "Yes, it is directly on the route and adds very little time." },
    ],
    seo: {
      title: "Hyderabad to Yadagirigutta Cab | Yadadri Temple Taxi — GM Cabs",
      desc: "Book a Hyderabad to Yadagirigutta (Yadadri) temple cab — 60 km, half-day round trip with waiting included. Bhongir Fort add-on. 24×7 WhatsApp booking.",
    },
  },

  "hyderabad-to-ongole": {
    slug: "hyderabad-to-ongole",
    city: "Ongole",
    km: 370,
    hours: "6.5 – 7 hrs",
    tagline: "Comfortable cabs to Ongole, Chirala and the Prakasam coast",
    intro:
      "Ongole travel is mostly family and business movement through the Prakasam district, with Chirala and Vodarevu beach as the leisure add-ons. The route runs through Vijayawada on NH-65 before heading south on NH-16, so the road quality is consistently good the whole way.",
    via: ["Suryapet", "Vijayawada", "Guntur bypass", "Chirala"],
    highlights: [
      { icon: "🏖️", label: "Chirala & Vodarevu", desc: "Quiet beach stretches 25 km from Ongole." },
      { icon: "🛣️", label: "Good highway throughout", desc: "NH-65 and NH-16 — no rough sections on this route." },
      { icon: "👪", label: "Family function travel", desc: "Multi-car bookings for weddings across Prakasam district." },
      { icon: "🔁", label: "One-way or round trip", desc: "Both options quoted so you can pick what suits." },
    ],
    stops: [
      { title: "Suryapet", desc: "Breakfast halt on NH-65." },
      { title: "Vijayawada", desc: "Meal break and route change." },
      { title: "Chilakaluripet", desc: "Junction town before the Ongole stretch." },
      { title: "Chirala", desc: "Handloom town and beach access point." },
    ],
    bestFor: ["Family visits", "Beach trips", "Weddings", "Business travel"],
    vehicles: [V.sedan, V.ertiga, V.crysta, V.hycross, V.tempo],
    faqs: [
      { q: "How far is Ongole from Hyderabad?", a: "About 370 km, roughly 6.5 to 7 hours via Vijayawada." },
      { q: "Can we add Chirala beach?", a: "Yes, Chirala and Vodarevu are common add-ons and only add a short detour." },
      { q: "Do you offer one-way drops to Ongole?", a: "Yes, one-way drops are available on all vehicle types." },
    ],
    seo: {
      title: "Hyderabad to Ongole Cab | Prakasam & Chirala Taxi — GM Cabs",
      desc: "Hyderabad to Ongole taxi — 370 km via Vijayawada in about 7 hours. Chirala and Vodarevu beach add-ons, one-way drops, Innova Crysta & Hycross.",
    },
  },
};

export const TRIP_ROUTE_SLUGS = Object.keys(TRIP_ROUTES);

export const TRIP_ROUTE_LIST = TRIP_ROUTE_SLUGS.map((slug) => TRIP_ROUTES[slug]!);
