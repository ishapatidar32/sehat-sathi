import React from "react";
import {
  Video,
  Calendar,
  Pill,
  FolderOpen,
  Clock,
  Users,
  Star,
  IndianRupee,
  CheckCircle2,
  XCircle,
  FileText,
  ToggleRight,
  Phone,
  MessageCircle,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Small reusable bits
// ---------------------------------------------------------------------------

const Pillbadge = ({ children, tone = "blue" }) => {
  const tones = {
    blue: "bg-blue-50 text-blue-700 border border-blue-200",
    green: "bg-green-50 text-green-700 border border-green-200",
    orange: "bg-orange-50 text-orange-700 border border-orange-200",
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
    icon: <Video className="w-7 h-7 text-white" />,
    iconBg: "bg-blue-600",
    border: "border-blue-200",
    title: "Start Consultation",
    subtitle: "Jump into your next call",
    button: "Go Live",
    buttonClass: "bg-blue-600 hover:bg-blue-700 text-white",
  },
  {
    icon: <Calendar className="w-7 h-7 text-white" />,
    iconBg: "bg-green-600",
    border: "border-green-200",
    title: "Today's Appointments",
    subtitle: "6 scheduled for today",
    button: "View Schedule",
    buttonClass: "bg-green-600 hover:bg-green-700 text-white",
  },
  {
    icon: <Pill className="w-7 h-7 text-white" />,
    iconBg: "bg-purple-600",
    border: "border-purple-200",
    title: "Write Prescription",
    subtitle: "For a recent consultation",
    button: "New Prescription",
    buttonClass: "bg-purple-50 text-purple-700 border border-purple-300 hover:bg-purple-100",
  },
  {
    icon: <FolderOpen className="w-7 h-7 text-white" />,
    iconBg: "bg-orange-500",
    border: "border-orange-200",
    title: "Patient Records",
    subtitle: "Search & view history",
    button: "Open Records",
    buttonClass: "bg-orange-50 text-orange-700 border border-orange-300 hover:bg-orange-100",
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
// Today's schedule
// ---------------------------------------------------------------------------

const todaySchedule = [
  {
    time: "10:00 AM",
    patient: "Ramesh Yadav",
    reason: "Follow-up — Diabetes management",
    type: "Video",
    typeIcon: <Video className="w-4 h-4" />,
    status: "Upcoming",
  },
  {
    time: "10:30 AM",
    patient: "Sunita Devi",
    reason: "First consultation — Fever & body ache",
    type: "Audio",
    typeIcon: <Phone className="w-4 h-4" />,
    status: "Upcoming",
  },
  {
    time: "11:15 AM",
    patient: "Arjun Mehta",
    reason: "Prescription refill",
    type: "Chat",
    typeIcon: <MessageCircle className="w-4 h-4" />,
    status: "Upcoming",
  },
  {
    time: "9:00 AM",
    patient: "Kavita Sharma",
    reason: "Post-surgery check-in",
    type: "Video",
    typeIcon: <Video className="w-4 h-4" />,
    status: "Completed",
  },
];

const TodaySchedule = () => (
  <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-7">
    <SectionHeading
      icon={<Clock className="w-5 h-5 text-gray-700" />}
      title="Today's Schedule"
      right={<Pillbadge tone="green">4 appointments</Pillbadge>}
    />
    <div className="space-y-3">
      {todaySchedule.map((a) => (
        <div
          key={a.patient + a.time}
          className={`flex items-center gap-4 border rounded-xl p-4 transition-all duration-300 ${
            a.status === "Completed"
              ? "border-gray-100 bg-gray-50"
              : "border-blue-100 hover:shadow-md hover:border-transparent"
          }`}
        >
          <div className="w-16 shrink-0 text-center">
            <p className={`text-sm font-bold ${a.status === "Completed" ? "text-gray-400" : "text-blue-600"}`}>
              {a.time}
            </p>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900">{a.patient}</p>
            <p className="text-sm text-gray-500">{a.reason}</p>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            {a.typeIcon} {a.type}
          </div>
          {a.status === "Completed" ? (
            <Pillbadge tone="green">Completed</Pillbadge>
          ) : (
            <button className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold">
              Join
            </button>
          )}
        </div>
      ))}
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// Consultation requests (pending bookings to accept/decline)
// ---------------------------------------------------------------------------

const consultationRequests = [
  {
    patient: "Meena Kumari",
    reason: "Persistent headache, 3 days",
    requestedFor: "Tomorrow, 4:00 PM",
  },
  {
    patient: "Deepak Rathore",
    reason: "Skin rash — needs specialist opinion",
    requestedFor: "Thu, 11:30 AM",
  },
];

const ConsultationRequests = () => (
  <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-7">
    <SectionHeading
      icon={<Users className="w-5 h-5 text-gray-700" />}
      title="Consultation Requests"
      right={<Pillbadge tone="orange">{consultationRequests.length} pending</Pillbadge>}
    />
    <div className="space-y-4">
      {consultationRequests.map((r) => (
        <div
          key={r.patient}
          className="border border-gray-100 rounded-xl p-4 flex items-center justify-between flex-wrap gap-3 hover:shadow-md hover:border-transparent transition-all duration-300"
        >
          <div>
            <p className="font-semibold text-gray-900">{r.patient}</p>
            <p className="text-sm text-gray-500">{r.reason}</p>
            <p className="text-xs text-gray-400 mt-1">Requested for {r.requestedFor}</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1 px-4 py-1.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-semibold">
              <CheckCircle2 className="w-4 h-4" /> Accept
            </button>
            <button className="flex items-center gap-1 px-4 py-1.5 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 text-sm font-semibold">
              <XCircle className="w-4 h-4" /> Decline
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// Recent patients
// ---------------------------------------------------------------------------

const recentPatients = [
  { name: "Ramesh Yadav", meta: "45 yrs, Male", condition: "Type 2 Diabetes", lastVisit: "Today" },
  { name: "Sunita Devi", meta: "32 yrs, Female", condition: "Viral Fever", lastVisit: "Today" },
  { name: "Kavita Sharma", meta: "58 yrs, Female", condition: "Post-op recovery", lastVisit: "Yesterday" },
  { name: "Arjun Mehta", meta: "27 yrs, Male", condition: "Chronic migraine", lastVisit: "2 days ago" },
];

const RecentPatients = () => (
  <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-7">
    <SectionHeading
      icon={<FileText className="w-5 h-5 text-gray-700" />}
      title="Recent Patients"
      right={<button className="text-sm font-semibold text-blue-600 hover:underline">View All</button>}
    />
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {recentPatients.map((p) => (
        <div
          key={p.name}
          className="group border border-gray-100 rounded-xl p-4 hover:shadow-md hover:border-transparent hover:-translate-y-0.5 transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold shrink-0 group-hover:scale-110 transition-transform duration-300">
              {p.name.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{p.name}</p>
              <p className="text-xs text-gray-400">{p.meta}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">{p.condition}</p>
          <p className="text-xs text-gray-400 mt-1">Last visit: {p.lastVisit}</p>
        </div>
      ))}
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// Sidebar: Availability toggle
// ---------------------------------------------------------------------------

const AvailabilityCard = () => (
  <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-7">
    <SectionHeading icon={<ToggleRight className="w-5 h-5 text-gray-700" />} title="Availability" />
    <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl p-4">
      <div>
        <p className="font-semibold text-gray-900">You're Online</p>
        <p className="text-xs text-gray-500">Accepting new consultation requests</p>
      </div>
      <button className="w-12 h-7 rounded-full bg-green-500 relative">
        <span className="absolute right-1 top-1 w-5 h-5 rounded-full bg-white" />
      </button>
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// Sidebar: Stats snapshot
// ---------------------------------------------------------------------------

const stats = [
  { icon: <Users className="w-5 h-5 text-white" />, iconBg: "bg-blue-600", label: "Patients Treated", value: "312" },
  { icon: <Star className="w-5 h-5 text-white" />, iconBg: "bg-amber-500", label: "Rating", value: "4.8 / 5" },
  { icon: <IndianRupee className="w-5 h-5 text-white" />, iconBg: "bg-green-600", label: "This Month", value: "₹42,300" },
];

const StatsSnapshot = () => (
  <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-7">
    <SectionHeading icon={<FileText className="w-5 h-5 text-gray-700" />} title="Your Snapshot" />
    <div className="space-y-4">
      {stats.map((s) => (
        <div key={s.label} className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full ${s.iconBg} flex items-center justify-center shrink-0`}>
            {s.icon}
          </div>
          <div>
            <p className="text-sm text-gray-500">{s.label}</p>
            <p className="font-bold text-gray-900">{s.value}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// Sidebar: Quick reminders
// ---------------------------------------------------------------------------

const reminders = [
  "3 patients waiting for follow-up notes",
  "1 prescription pending your signature",
  "Update your consultation fee for next month",
];

const Reminders = () => (
  <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-7">
    <SectionHeading icon={<Clock className="w-5 h-5 text-gray-700" />} title="Reminders" />
    <ul className="space-y-3">
      {reminders.map((r) => (
        <li key={r} className="flex items-start gap-2 text-sm text-gray-600">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
          {r}
        </li>
      ))}
    </ul>
  </div>
);

// ---------------------------------------------------------------------------
// Main dashboard page
// ---------------------------------------------------------------------------

const DoctorDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
      <QuickActions />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-8">
          <TodaySchedule />
          <ConsultationRequests />
          <RecentPatients />
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <AvailabilityCard />
          <StatsSnapshot />
          <Reminders />
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;