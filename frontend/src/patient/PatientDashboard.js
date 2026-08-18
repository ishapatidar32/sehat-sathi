import React from "react";
import {
  Brain,
  Video,
  Leaf,
  Ambulance,
  Phone,
  MessageCircle,
  UserRound,
  Calendar,
  Lightbulb,
  Moon,
  FileText,
  HeartPulse,
  Pill,
  ClipboardEdit,
  Sun,
  Scale,
  Droplet,
  CupSoda,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Small reusable bits
// ---------------------------------------------------------------------------

const Pillbadge = ({ children, tone = "green" }) => {
  const tones = {
    green: "bg-green-50 text-green-700 border border-green-200",
    blue: "bg-blue-50 text-blue-700 border border-blue-200",
  };
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${tones[tone]}`}>
      {children}
    </span>
  );
};

const SectionHeading = ({ icon, title, right }) => (
  <div className="flex items-center justify-between mb-6">
    <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
      {icon}
      {title}
    </h2>
    {right}
  </div>
);

// ---------------------------------------------------------------------------
// Top quick-action cards
// ---------------------------------------------------------------------------

const quickActions = [
  {
    icon: <Brain className="w-7 h-7 text-white" />,
    iconBg: "bg-purple-600",
    border: "border-purple-200",
    title: "AI Health Check",
    subtitle: "Instant symptom analysis",
    button: "Start Analysis",
    buttonClass: "bg-purple-600 hover:bg-purple-700 text-white",
  },
  {
    icon: <Video className="w-7 h-7 text-white" />,
    iconBg: "bg-blue-600",
    border: "border-blue-200",
    title: "Video Consultation",
    subtitle: "Consult with certified doctors",
    button: "Book Appointment",
    buttonClass: "bg-blue-600 hover:bg-blue-700 text-white",
  },
  {
    icon: <Leaf className="w-7 h-7 text-white" />,
    iconBg: "bg-green-600",
    border: "border-green-200",
    title: "Ayurveda Consultation",
    subtitle: "AYUSH certified practitioners",
    button: "Explore Ayurveda",
    buttonClass: "bg-green-50 text-green-700 border border-green-300 hover:bg-green-100",
  },
  {
    icon: <Ambulance className="w-7 h-7 text-white" />,
    iconBg: "bg-red-600",
    border: "border-red-200",
    title: "Emergency Consultation",
    subtitle: "24/7 immediate medical help",
    button: "Connect Now",
    buttonClass: "bg-red-600 hover:bg-red-700 text-white",
  },
];

const QuickActions = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {quickActions.map((card) => (
      <div
        key={card.title}
        className={`group bg-white rounded-2xl border-2 ${card.border} shadow-sm p-7 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer`}
      >
        <div
          className={`w-16 h-16 rounded-full ${card.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md`}
        >
          {card.icon}
        </div>
        <h3 className="font-bold text-gray-900 text-lg mb-1">{card.title}</h3>
        <p className="text-sm text-gray-500 mb-5">{card.subtitle}</p>
        <button
          className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors duration-200 ${card.buttonClass}`}
        >
          {card.button}
        </button>
      </div>
    ))}
  </div>
);

// ---------------------------------------------------------------------------
// Telemedicine Services
// ---------------------------------------------------------------------------

const telemedicineServices = [
  {
    icon: <Video className="w-6 h-6 text-white" />,
    iconBg: "bg-blue-600",
    title: "Video Consultation",
    desc: "Face-to-face consultation with doctors via video call",
    points: ["HD Video Quality", "Screen Sharing", "Multi-language Support"],
    button: "Book Now",
    buttonClass: "border border-blue-500 text-blue-600 hover:bg-blue-50",
  },
  {
    icon: <Phone className="w-6 h-6 text-white" />,
    iconBg: "bg-green-600",
    title: "Audio Consultation",
    desc: "Voice-based consultation for privacy and convenience",
    points: ["Crystal Clear Audio", "Lower Data Usage", "Rural Connectivity Friendly"],
    button: "Call Doctor",
    buttonClass: "border border-green-500 text-green-600 hover:bg-green-50",
  },
  {
    icon: <MessageCircle className="w-6 h-6 text-white" />,
    iconBg: "bg-teal-600",
    title: "Text Consultation",
    desc: "Chat-based consultation with medical professionals",
    points: ["Instant Messaging"],
    button: "Start Chat",
    buttonClass: "border border-teal-500 text-teal-600 hover:bg-teal-50",
  },
  {
    icon: <UserRound className="w-6 h-6 text-white" />,
    iconBg: "bg-purple-600",
    title: "Specialist Consultation",
    desc: "Connect with specialists for complex conditions",
    points: ["Cardiology"],
    button: "Find Specialist",
    buttonClass: "border border-purple-500 text-purple-600 hover:bg-purple-50",
  },
];

const TelemedicineServices = () => (
  <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-7">
    <SectionHeading
      icon={<HeartPulse className="w-5 h-5 text-gray-700" />}
      title="Telemedicine Services"
      right={<Pillbadge tone="green">Available 24/7</Pillbadge>}
    />
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {telemedicineServices.map((s) => (
        <div
          key={s.title}
          className="group border border-gray-100 rounded-xl p-6 hover:shadow-lg hover:border-transparent hover:-translate-y-0.5 transition-all duration-300"
        >
          <div
            className={`w-12 h-12 rounded-full ${s.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm`}
          >
            {s.icon}
          </div>
          <h3 className="font-bold text-gray-900 text-base mb-1">{s.title}</h3>
          <p className="text-sm text-gray-500 mb-3">{s.desc}</p>
          <ul className="space-y-1.5 mb-4">
            {s.points.map((p) => (
              <li key={p} className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-green-500">✓</span> {p}
              </li>
            ))}
          </ul>
          <button className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors duration-200 ${s.buttonClass}`}>
            {s.button}
          </button>
        </div>
      ))}
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// Ayurveda section
// ---------------------------------------------------------------------------

const ayurvedaCards = [
  {
    icon: <Leaf className="w-6 h-6 text-white" />,
    title: "Herbal Medicines",
    desc: "Certified Ayurvedic medicines from AYUSH approved manufacturers",
    tags: ["GMP Certified", "Lab Tested", "Organic"],
  },
  {
    icon: <Droplet className="w-6 h-6 text-white" />,
    title: "Panchakarma Therapy",
    desc: "Traditional detoxification and rejuvenation treatments",
    tags: ["Authentic", "Personalized", "Holistic"],
  },
  {
    icon: <Scale className="w-6 h-6 text-white" />,
    title: "Dosha Analysis",
    desc: "Personalized constitution analysis by qualified Ayurveda doctors",
    tags: ["Vata", "Pitta", "Kapha"],
  },
  {
    icon: <CupSoda className="w-6 h-6 text-white" />,
    title: "Traditional Remedies",
    desc: "Time-tested home remedies and lifestyle recommendations",
    tags: ["Natural", "Safe", "Effective"],
  },
];

const AyurvedaSection = () => (
  <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-7">
    <SectionHeading
      icon={<Leaf className="w-5 h-5 text-green-600" />}
      title="AYUSH Certified Ayurveda"
      right={
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-orange-500 text-white">
          AYUSH Certified
        </span>
      }
    />
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {ayurvedaCards.map((c) => (
        <div
          key={c.title}
          className="group bg-green-50/50 border border-green-100 rounded-xl p-6 hover:shadow-lg hover:bg-green-50 hover:-translate-y-0.5 transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm">
            {c.icon}
          </div>
          <h3 className="font-bold text-gray-900 text-base mb-1">{c.title}</h3>
          <p className="text-sm text-gray-600 mb-3">{c.desc}</p>
          <div className="flex flex-wrap gap-2">
            {c.tags.map((t) => (
              <Pillbadge key={t}>{t}</Pillbadge>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// AYUSH Ministry banner
// ---------------------------------------------------------------------------

const AyushBanner = () => (
  <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-6 flex items-start gap-4">
    <div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center shrink-0">
      <Sun className="w-5 h-5 text-white" />
    </div>
    <div>
      <h3 className="font-bold text-gray-900">AYUSH Ministry Certified</h3>
      <p className="text-sm text-gray-600 mt-1">
        All practitioners and medicines are certified by Ministry of AYUSH, Government of India
      </p>
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// Health Records
// ---------------------------------------------------------------------------

const healthRecords = [
  {
    icon: <HeartPulse className="w-5 h-5 text-white" />,
    iconBg: "bg-green-600",
    title: "Last Consultation",
    desc: "Dr. Rajesh Kumar - General Medicine",
    meta: "2 days ago",
  },
  {
    icon: <Pill className="w-5 h-5 text-white" />,
    iconBg: "bg-teal-600",
    title: "Current Medications",
    desc: "Ashwagandha, Triphala, Amla",
    meta: "Active",
  },
  {
    icon: <ClipboardEdit className="w-5 h-5 text-white" />,
    iconBg: "bg-orange-500",
    title: "Lab Reports",
    desc: "Blood Test, Urine Analysis",
    meta: "1 week ago",
  },
];

const HealthRecords = () => (
  <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-7">
    <SectionHeading
      icon={<FileText className="w-5 h-5 text-gray-700" />}
      title="Health Records"
      right={
        <button className="text-sm font-semibold text-green-600 hover:underline">View All</button>
      }
    />
    <div className="space-y-4">
      {healthRecords.map((r) => (
        <div
          key={r.title}
          className="flex items-center gap-4 border border-gray-100 rounded-xl p-4 hover:shadow-md hover:border-transparent transition-all duration-300"
        >
          <div className={`w-11 h-11 rounded-full ${r.iconBg} flex items-center justify-center shrink-0 shadow-sm`}>
            {r.icon}
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900">{r.title}</p>
            <p className="text-sm text-gray-500">{r.desc}</p>
          </div>
          <span className="text-sm font-medium text-green-600 shrink-0">{r.meta}</span>
        </div>
      ))}
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// Sidebar: Upcoming Appointments
// ---------------------------------------------------------------------------

const appointments = [
  {
    time: "2:30 PM",
    when: "Today",
    doctor: "Dr. Priya Sharma",
    type: "Ayurveda Consultation",
    tag: "Video Call",
    tagTone: "blue",
  },
  {
    time: "10:00 AM",
    when: "Tomorrow",
    doctor: "Dr. Amit Patel",
    type: "Follow-up Consultation",
    tag: "Audio Call",
    tagTone: "green",
  },
];

const UpcomingAppointments = () => (
  <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-7">
    <SectionHeading
      icon={<Calendar className="w-5 h-5 text-gray-700" />}
      title="Upcoming Appointments"
    />
    <div className="space-y-4 mb-4">
      {appointments.map((a) => (
        <div
          key={a.doctor}
          className="border-l-4 border-green-500 bg-gray-50 rounded-r-xl p-4 hover:bg-gray-100 hover:shadow-sm transition-all duration-300"
        >
          <p className="text-lg font-bold text-green-600">{a.time}</p>
          <p className="text-xs text-gray-400 mb-2">{a.when}</p>
          <p className="font-semibold text-gray-900">{a.doctor}</p>
          <p className="text-sm text-gray-500 mb-2">{a.type}</p>
          <Pillbadge tone={a.tagTone}>{a.tag}</Pillbadge>
        </div>
      ))}
    </div>
    <button className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold">
      Book New Appointment
    </button>
  </div>
);

// ---------------------------------------------------------------------------
// Sidebar: Daily Health Tips
// ---------------------------------------------------------------------------

const healthTips = [
  {
    icon: <Sun className="w-5 h-5 text-white" />,
    iconBg: "bg-orange-500",
    title: "Morning Routine",
    desc: "Start your day with warm lemon water and light stretching",
  },
  {
    icon: <Moon className="w-5 h-5 text-white" />,
    iconBg: "bg-indigo-500",
    title: "Better Sleep",
    desc: "Practice meditation before bed and avoid screens 1 hour before sleeping",
  },
];

const DailyHealthTips = () => (
  <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-7">
    <SectionHeading
      icon={<Lightbulb className="w-5 h-5 text-gray-700" />}
      title="Daily Health Tips"
    />
    <div className="space-y-4">
      {healthTips.map((t) => (
        <div key={t.title} className="flex gap-3">
          <div className={`w-9 h-9 rounded-full ${t.iconBg} flex items-center justify-center shrink-0`}>
            {t.icon}
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{t.title}</p>
            <p className="text-sm text-gray-500">{t.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// Sidebar: Emergency Contacts
// ---------------------------------------------------------------------------

const emergencyContacts = [
  {
    icon: <Ambulance className="w-5 h-5 text-white" />,
    iconBg: "bg-red-600",
    title: "Emergency Ambulance",
    number: "108",
    buttonClass: "bg-red-600 hover:bg-red-700 text-white",
  },
  {
    icon: <UserRound className="w-5 h-5 text-white" />,
    iconBg: "bg-blue-600",
    title: "24/7 Doctor Helpline",
    number: "+91 98765 43210",
    buttonClass: "bg-blue-600 hover:bg-blue-700 text-white",
  },
];

const EmergencyContacts = () => (
  <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-7">
    <SectionHeading
      icon={<Phone className="w-5 h-5 text-gray-700" />}
      title="Emergency Contacts"
    />
    <div className="space-y-4">
      {emergencyContacts.map((c) => (
        <div key={c.title} className="flex items-center gap-3 border border-gray-100 rounded-xl p-3">
          <div className={`w-10 h-10 rounded-full ${c.iconBg} flex items-center justify-center shrink-0`}>
            {c.icon}
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900 text-sm">{c.title}</p>
            <p className="text-sm font-bold text-green-600">{c.number}</p>
          </div>
          <button className={`px-4 py-1.5 rounded-lg text-sm font-semibold ${c.buttonClass}`}>
            Call
          </button>
        </div>
      ))}
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// Main dashboard page
// ---------------------------------------------------------------------------

const PatientDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
      <QuickActions />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-8">
          <TelemedicineServices />
          <AyurvedaSection />
          <AyushBanner />
          <HealthRecords />
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <UpcomingAppointments />
          <DailyHealthTips />
          <EmergencyContacts />
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;