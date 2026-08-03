export const MOCK_STUDENT_PROFILE = {
  id: "user-101",
  name: "Parth Sharma",
  rollNo: "23BCE0941",
  headline: "Full-Stack Developer | 3x Hackathon Winner | Computer Science '27 @ VJTI",
  institution: "Veermata Jijabai Technological Institute (VJTI), Mumbai",
  department: "Computer Science & Engineering",
  batch: "2023 - 2027",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
  banner: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
  bio: "Organized 10+ technical workshops and managed a community of 500+ students. Passionate about building distributed cloud tools, real-time web engines, and AI web applications.",
  location: "Mumbai, Maharashtra, India",
  totalCertificates: 14,
  verifiedCount: 11,
  verifiedThisWeek: "+2 this week",
  connectionsCount: 342,
  rank: "#48 Top Performer",
  percentile: "Top 5% Performer",
  completionScore: 92,
  socials: {
    github: "https://github.com/parthsharma",
    linkedin: "https://linkedin.com/in/parthsharma",
    portfolio: "https://parthsharma.dev",
    email: "parth.sharma@student.vjti.ac.in"
  }
};

export const MOCK_PINNED_ACHIEVEMENTS = [
  {
    id: "pin-1",
    title: "1st Place National Hackathon",
    issuer: "DevFolio",
    category: "HACKATHON",
    icon: "emoji_events",
    verified: true
  },
  {
    id: "pin-2",
    title: "AWS Certified Practitioner",
    issuer: "Amazon Web Services",
    category: "CLOUD",
    icon: "cloud",
    verified: true
  },
  {
    id: "pin-3",
    title: "University Rank #1",
    issuer: "VJTI Mumbai",
    category: "ACADEMIC",
    icon: "school",
    verified: true
  }
];

export const MOCK_CERTIFICATES = [
  {
    id: "cert-001",
    title: "AWS Certified Developer - Associate",
    category: "CLOUD",
    issuerName: "Amazon Web Services / IIT Bombay Node",
    issuerLogo: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=120",
    issueDate: "Sept 2023",
    credentialId: "AWS-DEV-99412-X",
    verificationStatus: "VERIFIED",
    verificationDate: "2023-09-12",
    verifiedBy: "IIT Bombay Verification Desk",
    fileUrl: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&q=80&w=800",
    skills: ["AWS Lambda", "DynamoDB", "Docker", "S3"],
    pinned: true,
    description: "Verified expertise in building scalable serverless cloud microservices on AWS."
  },
  {
    id: "cert-002",
    title: "National Coding Contest Winner",
    category: "HACKATHON",
    issuerName: "ACM Student Chapter",
    issuerLogo: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=120",
    issueDate: "Aug 2023",
    credentialId: "ACM-NCC-2023-48",
    verificationStatus: "PENDING_APPROVAL",
    verificationDate: null,
    verifiedBy: null,
    fileUrl: "https://images.unsplash.com/photo-1589330694653-aded6f78655b?auto=format&fit=crop&q=80&w=800",
    skills: ["Data Structures", "Algorithms", "C++"],
    pinned: false,
    description: "Ranked 1st among 800+ participants in algorithmic speed coding battle."
  },
  {
    id: "cert-003",
    title: "Full-Stack Web Engineering Certification",
    category: "ACADEMIC",
    issuerName: "Meta Learning Systems",
    issuerLogo: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=120",
    issueDate: "July 2023",
    credentialId: "META-FS-881249",
    verificationStatus: "VERIFIED",
    verificationDate: "2023-07-20",
    verifiedBy: "Academic Board Desk",
    fileUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
    skills: ["React.js", "Node.js", "Express", "MongoDB"],
    pinned: true,
    description: "Certified proficiency in responsive web layout, REST API design, and database normalization."
  }
];

export const MOCK_EVENTS_PASSPORT = [
  {
    id: "evt-101",
    title: "Smart India Hackathon (SIH) 2026",
    category: "HACKATHON",
    organizer: "Ministry of Education & VJTI Node",
    date: "Oct 12 - Oct 14, 2026",
    teamName: "Team NeuralNet",
    badge: "Grand Finalist",
    position: "Top 5 Nationally",
    projectSubmitted: "AI-driven Student Credential Verification Engine",
    skills: ["Python", "FastAPI", "React", "PostgreSQL"],
    members: ["Parth Sharma (Lead)", "Ananya Deshmukh", "Devansh Rao", "Rohan Mehta"],
    stages: [
      { name: "Idea Submission & Campus Screening", status: "COMPLETED", date: "Aug 15, 2026" },
      { name: "Internal Prototype Evaluation", status: "COMPLETED", date: "Sept 02, 2026" },
      { name: "Grand Finale (National 36-Hr Hack)", status: "IN_PROGRESS", date: "Oct 12, 2026" },
      { name: "Jury Verdict & Prize Distribution", status: "UPCOMING", date: "Oct 14, 2026" }
    ]
  },
  {
    id: "evt-102",
    title: "AWS Cloud Innovation Quest",
    category: "CLOUD CHALLENGE",
    organizer: "AWS Academic Alliance",
    date: "Nov 01 - Nov 05, 2026",
    teamName: "CloudCrafters",
    badge: "Registration Open",
    position: "Round 1 Screening",
    projectSubmitted: "Serverless Event-Driven Notification System",
    skills: ["AWS Lambda", "DynamoDB", "CloudWatch"],
    members: ["Parth Sharma", "Sanya Malhotra"],
    stages: [
      { name: "Registration & Team Formation", status: "COMPLETED", date: "Sept 20, 2026" },
      { name: "Architecture Diagram Submission", status: "IN_PROGRESS", date: "Nov 01, 2026" },
      { name: "Live Prototype Demo", status: "UPCOMING", date: "Nov 05, 2026" }
    ]
  },
  {
    id: "evt-103",
    title: "VJTI Annual Inter-College Coding Battle",
    category: "COMPETITION",
    organizer: "ACM VJTI Chapter",
    date: "Sept 28, 2026",
    teamName: "Solo Competitive",
    badge: "1st Place Winner",
    position: "Gold Medalist",
    projectSubmitted: "Speed Algorithmic Solving",
    skills: ["C++20", "Data Structures", "Dynamic Programming"],
    members: ["Parth Sharma"],
    stages: [
      { name: "Qualifier Round", status: "COMPLETED", date: "Sept 28 10:00 AM" },
      { name: "Speed Coding Round", status: "COMPLETED", date: "Sept 28 02:00 PM" },
      { name: "Final 1v1 Battle", status: "COMPLETED", date: "Sept 28 05:00 PM" }
    ]
  }
];

export const MOCK_VERIFICATION_QUEUE = [
  {
    requestId: "req-901",
    studentName: "Ananya Deshmukh",
    studentRoll: "23BCE0882",
    studentAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120",
    certTitle: "Google Cloud Professional Data Engineer",
    category: "CLOUD",
    issuerClaimed: "Google Cloud / Coursera",
    ocrConfidence: "98% Match",
    submittedDate: "Today, 10:45 AM",
    documentUrl: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&q=80&w=800"
  },
  {
    requestId: "req-902",
    studentName: "Rohan Mehta",
    studentRoll: "23BME0412",
    studentAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
    certTitle: "National Robotics Championship 2nd Runner Up",
    category: "CO_CURRICULAR",
    issuerClaimed: "IIT Bombay Techfest",
    ocrConfidence: "92% Match",
    submittedDate: "Yesterday, 04:20 PM",
    documentUrl: "https://images.unsplash.com/photo-1589330694653-aded6f78655b?auto=format&fit=crop&q=80&w=800"
  },
  {
    requestId: "req-903",
    studentName: "Sanya Malhotra",
    studentRoll: "23BCE0911",
    studentAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=120",
    certTitle: "Advanced Deep Learning Specialization",
    category: "ACADEMIC",
    issuerClaimed: "DeepLearning.AI",
    ocrConfidence: "95% Match",
    submittedDate: "Oct 01, 2026",
    documentUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800"
  }
];

export const MOCK_DASHBOARD_STATS = [
  { label: "Profile Views", value: "1,284", change: "+18% this week", isPositive: true },
  { label: "Connections", value: "342", change: "+12 new", isPositive: true },
  { label: "Verified Credentials", value: "11", change: "100% Authenticated", isPositive: true },
  { label: "Job Applications", value: "6 Active", change: "2 Interview Calls", isPositive: true }
];

export const MOCK_FEED_POSTS = [
  {
    id: "post-1",
    author: {
      name: "Veermata Jijabai Technological Institute (VJTI)",
      avatar: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=120",
      role: "Official Institution Node",
      time: "2 hours ago",
      verified: true
    },
    content: "🎉 Congratulations to Team NeuralNet led by Parth Sharma for advancing to the Grand Finale of Smart India Hackathon 2026! We are proud to verify and support their submission.",
    likes: 142,
    comments: 24,
    shares: 8,
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "post-2",
    author: {
      name: "Ananya Deshmukh",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120",
      role: "CS Senior @ VJTI",
      time: "5 hours ago",
      verified: true
    },
    content: "Just received my official verification seal for the Google Cloud Data Engineer certification on Yashas! Seamless verification process through the campus portal.",
    likes: 89,
    comments: 11,
    shares: 3
  }
];

export const MOCK_JOBS = [
  {
    id: "job-1",
    title: "Graduate Software Engineer (Backend)",
    company: "Razorpay",
    logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=120",
    location: "Bengaluru (Hybrid)",
    salary: "₹18 LPA - ₹24 LPA",
    type: "FULL_TIME",
    experience: "0-1 Years / Batch of 2027",
    postedDate: "2 days ago",
    deadline: "Oct 25, 2026",
    skills: ["Node.js", "Go", "PostgreSQL", "System Design"],
    description: "Build robust payment APIs handling millions of transactions daily across distributed microservices.",
    status: "APPLIED"
  },
  {
    id: "job-2",
    title: "AI Research Intern",
    company: "Microsoft Research India",
    logo: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=120",
    location: "Bengaluru / Remote",
    salary: "₹80,000 / month",
    type: "INTERNSHIP",
    experience: "Students (Pre-final year)",
    postedDate: "1 day ago",
    deadline: "Oct 30, 2026",
    skills: ["PyTorch", "LLMs", "Python", "Transformers"],
    description: "Collaborate with world-class researchers on efficient fine-tuning of open-source language models.",
    status: "INTERVIEW"
  },
  {
    id: "job-3",
    title: "Frontend Development Engineer",
    company: "Cred",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=120",
    location: "Bengaluru",
    salary: "₹16 LPA - ₹20 LPA",
    type: "FULL_TIME",
    experience: "Batch of 2026/2027",
    postedDate: "3 days ago",
    deadline: "Nov 05, 2026",
    skills: ["React.js", "TypeScript", "Tailwind CSS", "Redux"],
    description: "Craft high-precision, pixel-perfect user interfaces with micro-animations and glassmorphism design.",
    status: "SAVED"
  }
];

export const MOCK_MESSAGES = [
  {
    id: "conv-1",
    user: {
      name: "Ananya Deshmukh",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120",
      role: "CS '26 @ VJTI",
      online: true
    },
    lastMessage: "Hey Parth! Are we meeting at 4 PM for the SIH prototype demo?",
    time: "10:42 AM",
    unread: 2,
    messages: [
      { id: 1, sender: "them", text: "Hey Parth! Did you review the API schema for the hackathon?", time: "10:30 AM" },
      { id: 2, sender: "me", text: "Yes! The PostgreSQL schema with Drizzle ORM looks solid. I pushed the changes.", time: "10:35 AM" },
      { id: 3, sender: "them", text: "Awesome! Are we meeting at 4 PM for the SIH prototype demo?", time: "10:42 AM" }
    ]
  },
  {
    id: "conv-2",
    user: {
      name: "Devansh Rao",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120",
      role: "UI/UX Designer",
      online: false
    },
    lastMessage: "I uploaded the updated Figma components in the shared drive.",
    time: "Yesterday",
    unread: 0,
    messages: [
      { id: 1, sender: "them", text: "I uploaded the updated Figma components in the shared drive.", time: "Yesterday" }
    ]
  }
];

export const MOCK_NOTIFICATIONS = [
  {
    id: "notif-1",
    type: "VERIFICATION",
    actor: "IIT Bombay Verification Desk",
    avatar: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=120",
    text: "granted official institutional seal for your AWS Certified Developer credential.",
    time: "15 mins ago",
    unread: true
  },
  {
    id: "notif-2",
    type: "CONNECTION",
    actor: "Sanya Malhotra",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=120",
    text: "sent you a connection request.",
    time: "1 hour ago",
    unread: true,
    actionable: true
  },
  {
    id: "notif-3",
    type: "JOB",
    actor: "Microsoft Research",
    avatar: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=120",
    text: "shortlisted your profile for Round 1 Technical Interview.",
    time: "3 hours ago",
    unread: false
  }
];

export const MOCK_CONNECTIONS = [
  {
    id: "conn-1",
    name: "Sanya Malhotra",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=120",
    headline: "Backend & Cloud Engineer @ VJTI",
    mutual: 18,
    status: "PENDING_RECEIVED"
  },
  {
    id: "conn-2",
    name: "Devansh Rao",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120",
    headline: "UI/UX Designer | 2x Hackathon Winner",
    mutual: 24,
    status: "CONNECTED"
  },
  {
    id: "conn-3",
    name: "Rohan Mehta",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
    headline: "Robotics Team Lead | Mechanical '26",
    mutual: 12,
    status: "SUGGESTED"
  }
];

export const MOCK_INSTITUTIONS = [
  {
    id: "inst-1",
    name: "Veermata Jijabai Technological Institute (VJTI)",
    logo: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=120",
    type: "COLLEGE",
    location: "Mumbai, Maharashtra",
    membersCount: 4200,
    verified: true,
    description: "Premier engineering institute established in 1887. Pioneer in tech education and campus innovation."
  },
  {
    id: "inst-2",
    name: "IIT Bombay Incubation Cell",
    logo: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=120",
    type: "INCUBATOR",
    location: "Powai, Mumbai",
    membersCount: 1850,
    verified: true,
    description: "Leading deep-tech startup incubator backing student-led research and spin-offs."
  }
];

export const MOCK_CO_CURRICULAR_TIMELINE = [
  {
    role: "President @ CS Club",
    period: "2023 - Present",
    desc: "Organized 10+ technical workshops and managed a community of 500+ students."
  },
  {
    role: "Robotics Team Lead",
    period: "2022 - 2023",
    desc: "Led a team of 15 to build an autonomous rover for the national robotics competition."
  }
];

export const MOCK_VERIFIED_SKILLS = [
  { name: "React.js", level: "Expert", verified: true },
  { name: "Node.js", level: "Advanced", verified: true },
  { name: "Python", level: "Advanced", verified: true },
  { name: "Cloud Architecture", level: "Proficient", verified: true }
];

export const MOCK_DOCUMENTS = [
  { name: "Official Transcript", type: "PDF", verified: true },
  { name: "College ID Card", type: "PNG", verified: true }
];
