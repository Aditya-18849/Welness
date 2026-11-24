export const LINKS = {
  book: "https://app.livehonor.co/",
  packages: "https://app.livehonor.co/packages/",
  site: "https://www.livehonor.co/",
  clients: "https://www.livehonor.co/for-clients/",
  trainers: "https://www.livehonor.co/for-trainers/",
  instagram: "https://www.instagram.com/live.honor/",
  founder: "https://www.instagram.com/sadiq.mvp/",
  marathon: "https://www.instagram.com/sadiq.mvp/reel/DfYIWgoRaQO/",
  linkedin: "https://www.linkedin.com/in/sadiq-a-bb65545a",
  story:
    "https://www.linkedin.com/posts/sadiq-a-bb65545a_personaltraining-fitness-founders-activity-7439283092437024768-Vs2e",
  email: "mailto:sadiq@livehonor.co",
  phone: "tel:+16314058513",
};

/** WhatsApp number in international format, digits only. HONOR's published business line. */
export const WHATSAPP_NUMBER: string = "16314058513";
/** Text already typed into the chat when a visitor opens it. */
export const WHATSAPP_MESSAGE = "Hi HONOR, I'd like to know more about wellness coaching.";
/** Null when no number is set, so a button can never open the wrong chat. */
export const WHATSAPP_URL = WHATSAPP_NUMBER
  ? `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
  : null;

export const img = (name: string) => `${import.meta.env.BASE_URL}img/${name}.webp`;

/* ---------- HONOR, the business ---------- */

export const SERVICES = [
  {
    name: "Strength classes",
    price: "From $23.50 a class",
    text: "Small instructor-led groups on a fresh program each month. Your coach guides you on which weights to choose.",
  },
  {
    name: "Personal coaching",
    price: "From $200 a session",
    text: "One-to-one sessions in Montauk and the Hamptons, planned around your body, goals and schedule.",
  },
  {
    name: "Mind practice",
    price: "Ask what is running",
    text: "Meditation and visualization, the quiet half of how Sadiq coaches. Message us for current options.",
  },
  {
    name: "Wellness check-ins",
    price: "Complimentary",
    text: "Regular fitness assessments that show where you are, with recommendations for what to do next.",
  },
];

export const MOVEMENTS = [
  { src: img("pose-class"), label: "Kneeling press", subtitle: "Posture and shoulders" },
  { src: img("pose-floor"), label: "Floor bridge", subtitle: "Hips and lower back" },
  { src: img("pose-plank"), label: "Stability warm-up", subtitle: "Core and shoulder control" },
  { src: img("pose-kettlebell"), label: "Kettlebell deadlift", subtitle: "Lifting with ease" },
  { src: img("pose-hamptons"), label: "Group conditioning", subtitle: "Energy, together" },
  { src: img("pose-pulldown"), label: "Seated lateral pull", subtitle: "Upper back and posture" },
  { src: img("pose-squat"), label: "Heel-elevated squat", subtitle: "Healthier knees" },
  { src: img("pose-copenhagen"), label: "Modified Copenhagen", subtitle: "Hip strength and balance" },
  { src: img("pose-landmine"), label: "Landmine row to press", subtitle: "Joint-friendly strength" },
  { src: img("pose-deadlift"), label: "Med-ball squat", subtitle: "Everyday power" },
].map((m) => ({ ...m, alt: `${m.label}, HONOR class` }));

export const MILESTONES = [
  {
    label: "Giants of Africa Pitch",
    sublabel: "2024",
    image: img("row-pitch"),
    imageAlt: "On stage at the Giants of Africa Pitch Competition",
    description: "A mission to honor mind, body and soul",
  },
  {
    label: "Montauk Playhouse",
    sublabel: "2026",
    image: img("row-class"),
    imageAlt: "Members pressing dumbbells overhead in an HONOR class",
    description: "Founding Week opens the East End home",
  },
  {
    label: "HONOR in the Hamptons",
    sublabel: "2026",
    image: img("row-hamptons"),
    imageAlt: "An HONOR group class under way in a red gym",
    description: "Group wellness moves out east",
  },
];

export const RESULTS: {
  title: string;
  rows: { figure: string; name: string; note?: string; lead?: boolean }[];
}[] = [
  {
    title: "Delivered",
    rows: [
      { figure: "2,500", name: "Training sessions", note: "Approximate, since the MVP", lead: true },
      { figure: "$500K+", name: "Client spending", note: "Over about 20 months" },
      { figure: "$0", name: "Paid advertising", note: "Clients came by referral" },
    ],
  },
  {
    title: "Kept going",
    rows: [
      { figure: "95%", name: "Trained with more than one coach", note: "And kept going" },
      { figure: "One", name: "Plan across every format", note: "Gym, home, office, hotel, online" },
      { figure: "All", name: "Levels welcome", note: "Beginners and regulars alike" },
    ],
  },
  {
    title: "This season",
    rows: [
      { figure: "Tue", name: "Strength & Conditioning", note: "10 AM, Montauk Playhouse" },
      { figure: "Thu", name: "Strength & Conditioning", note: "10 AM, Montauk Playhouse" },
      { figure: "Free", name: "First session", note: "For new HONOR clients" },
    ],
  },
];

export type Audience = "clients" | "trainers";

export const SOLUTIONS: Record<
  Audience,
  { tab: string; intro: string; rows: { problem: string; answer: string }[]; cta: string; href: string }
> = {
  clients: {
    tab: "For clients",
    intro: "You buy continuity, not just sessions.",
    rows: [
      {
        problem: "Your trainer is away and the week falls apart",
        answer: "A vetted teammate covers the session and works from the same plan.",
      },
      {
        problem: "Travel breaks your routine",
        answer: "Train at home, in the gym, at the office, in a hotel or online.",
      },
      {
        problem: "Every new coach starts you over",
        answer: "One program, with progress tracked across coaches and locations.",
      },
      {
        problem: "Booking becomes your second job",
        answer: "Reminders, rescheduling and coverage are handled for you.",
      },
    ],
    cta: "Build your team",
    href: LINKS.clients,
  },
  trainers: {
    tab: "For trainers",
    intro: "You care for clients. We run the business side.",
    rows: [
      {
        problem: "Evenings lost to admin",
        answer: "Matching, scheduling and reminders run in the background.",
      },
      {
        problem: "Chasing payments",
        answer: "Billing and session follow-through sit in one managed flow.",
      },
      {
        problem: "Income capped by your own calendar",
        answer: "Overflow demand and team routing add coached sessions.",
      },
      {
        problem: "A day off can cost you a client",
        answer: "Teammates cover while you are out, and the client stays active.",
      },
    ],
    cta: "Join as a trainer",
    href: LINKS.trainers,
  },
};

export const STEPS = [
  { name: "Get matched", text: "Share your goals and schedule. We pair you with a lead coach and a support team." },
  { name: "Train your way", text: "Group, one to one or digital, on one program that moves with you." },
  { name: "Stay consistent", text: "We manage coverage and accountability when your schedule shifts." },
];

export const FAQ = [
  {
    question: "Is it only strength training?",
    answer:
      "No. Strength is where most people start, and HONOR was founded to honor the mind, body and soul. Ask us about meditation and visualization.",
  },
  {
    question: "Do I need any experience?",
    answer: "No. Classes are for all levels, and your instructor helps you choose the right weights.",
  },
  {
    question: "Where and when are classes held?",
    answer:
      "At the Montauk Playhouse, 240 Edgemere Street, Montauk. Strength & Conditioning currently runs Tuesday and Thursday at 10 AM. The booking app has the live timetable.",
  },
  {
    question: "Is the first session free?",
    answer:
      "Yes, for new HONOR clients with no previous bookings. It is a one-time class with no payment or subscription.",
  },
  {
    question: "How do group packs work?",
    answer:
      "You pay once and use credits to book. Off-season classes take five credits each; peak-season classes use more. Packs never renew automatically.",
  },
  {
    question: "What if I am travelling?",
    answer:
      "Group package clients can do an at-home digital version of a missed class, at no additional cost.",
  },
  {
    question: "Can I cancel a class?",
    answer:
      "Cancel more than 24 hours before class and your credits come back, with their original expiry date.",
  },
  {
    question: "Who is behind HONOR?",
    answer:
      "HONOR was founded by Sadiq Abubakar, a fitness and wellness coach who trained clients at Dogpound after a finance career at Deutsche Bank. It began in New York City.",
  },
];

export const RATES: {
  group: string;
  note: string;
  rows: { name: string; note: string; price: string; href: string }[];
}[] = [
  {
    group: "Group classes",
    note: "Off-season rates. Peak-season classes use more credits.",
    rows: [
      { name: "Single class", note: "5 credits, valid 30 days", price: "$25", href: LINKS.packages },
      { name: "5-class pack", note: "$24 a class, valid 90 days", price: "$120", href: LINKS.packages },
      { name: "10-class pack", note: "$23.50 a class, valid 90 days", price: "$235", href: LINKS.packages },
    ],
  },
  {
    group: "Personal coaching",
    note: "Private packages are valid for 12 months.",
    rows: [
      { name: "Single session", note: "One to one", price: "$225", href: LINKS.book },
      { name: "12 sessions", note: "$200 a session", price: "$2,400", href: LINKS.book },
    ],
  },
];

export const PLATFORM = [
  "Client matching", "Scheduling", "Reminders", "Rescheduling", "Coach coverage",
  "Payments", "Workout planning", "Progress tracking", "Retention signals",
];
