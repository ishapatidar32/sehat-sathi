import React from "react";
import { Link } from "react-router-dom";
import "../style/home.css";

const features = [
  { icon: "fa-video", title: "Telemedicine Consultations", text: "Connect with certified doctors through video, audio, or text consultations from the comfort of your home." },
  { icon: "fa-robot", title: "AI-Powered Diagnosis", text: "Advanced AI processes symptoms and provides preliminary diagnosis with triage recommendations." },
  { icon: "fa-language", title: "Multi-Language Support", text: "Available in Punjabi, Hindi, and English to serve diverse rural communities effectively." },
  { icon: "fa-pills", title: "Digital Prescription", text: "Receive digital prescriptions and access to verified traditional remedies library." },
  { icon: "fa-calendar-check", title: "Appointment Management", text: "Easy scheduling and management of appointments with healthcare providers." },
  { icon: "fa-mobile-alt", title: "Mobile Accessibility", text: "Access healthcare services through phone, ABHA ID, or any mobile device." },
];

const stepColors = ["bg-red-500", "bg-cyan-600", "bg-amber-500", "bg-purple-500"];
const patientSteps = [
  { icon: "fa-user-plus", title: "Registration", text: "Patient logs in or registers via phone or ABHA ID" },
  { icon: "fa-microchip", title: "AI Processing", text: "AI processes symptoms through language AI, symptom checker, and triage AI" },
  { icon: "fa-notes-medical", title: "Symptom Entry", text: "Patient enters symptoms in Punjabi, Hindi, or English" },
  { icon: "fa-video", title: "Teleconsultation", text: "Patient books appointment and consults with doctor via video, audio, or text" },
];

const doctorSteps = [
  { icon: "fa-user-md", title: "Doctor Login", text: "Doctor logs in or registers to the platform" },
  { icon: "fa-calendar-check", title: "Manage Appointments", text: "Doctor views and manages appointments" },
  { icon: "fa-stethoscope", title: "Patient Consultation", text: "Doctor consults with patients via video, audio, or text" },
  { icon: "fa-prescription", title: "Treatment & Records", text: "Doctor suggests treatments, adds remedies to library, and updates patient records" },
];

const WorkflowRow = ({ title, steps }) => (
  <div className="bg-white rounded-2xl shadow-lg p-8 mb-10">
    <h3 className="text-center text-dark font-semibold text-2xl mb-8 relative after:content-[''] after:block after:w-14 after:h-1 after:bg-primary after:rounded-full after:mx-auto after:mt-3">
      {title}
    </h3>
    <div className="flex flex-wrap items-center justify-between gap-4">
      {steps.map((step, i) => (
        <React.Fragment key={step.title}>
          <div className="flex-1 min-w-[200px] text-center p-4">
            <div
              className={`w-20 h-20 mx-auto mb-4 rounded-full ${stepColors[i % stepColors.length]} text-white text-3xl flex items-center justify-center shadow-md`}
            >
              <i className={`fas ${step.icon}`}></i>
            </div>
            <h5 className="font-semibold text-dark mb-1">{step.title}</h5>
            <p className="text-muted text-sm">{step.text}</p>
          </div>
          {i < steps.length - 1 && (
            <div className="text-3xl text-primary font-bold hidden md:block">&rarr;</div>
          )}
        </React.Fragment>
      ))}
    </div>
  </div>
);

const Home = () => {
  return (
    <div className="sehatsathi-home">
      {/* Hero Section */}
      <section
        className="min-h-screen flex items-center justify-center relative bg-cover bg-center px-4"
        style={{ backgroundImage: "url('/healthcare-bg.jpg.png')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white max-w-2xl">
          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">SehatSathi</h1>
          <p className="text-2xl mb-8 drop-shadow-md">
            Your Digital Healthcare Companion — Connecting Rural Communities to Quality Healthcare
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/login" className="btn-primary">
              Login
            </Link>
            <Link
              to="/signup"
              className="btn-outline !border-white !text-white hover:!bg-white hover:!text-dark"
            >
              Register
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-soft to-[#e9ecef]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Revolutionizing Rural Healthcare</h2>
            <p className="section-subtitle">
              Bridging the gap between patients and quality healthcare through technology
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="card-hover text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-teal text-white text-3xl flex items-center justify-center">
                  <i className={`fas ${f.icon}`}></i>
                </div>
                <h4 className="text-dark font-semibold mb-2">{f.title}</h4>
                <p className="text-muted leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-20 bg-soft">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">How SehatSathi Works</h2>
            <p className="section-subtitle">Our comprehensive telemedicine platform workflow</p>
          </div>
          <WorkflowRow title="Patient Journey" steps={patientSteps} />
          <WorkflowRow title="Doctor Journey" steps={doctorSteps} />
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="section-title">About SehatSathi</h2>
            <p className="text-muted leading-relaxed mb-4">
              SehatSathi is a revolutionary telemedicine platform designed specifically for rural
              communities. We leverage cutting-edge AI technology and multilingual support to bridge
              the healthcare gap between urban and rural areas.
            </p>
            <p className="text-muted leading-relaxed mb-6">
              Our platform combines traditional remedies with modern medical practices, ensuring
              culturally sensitive healthcare delivery that resonates with rural populations while
              maintaining the highest medical standards.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "AI-Powered Symptom Analysis",
                "Multi-Language Support",
                "Traditional & Modern Medicine",
                "24/7 Healthcare Access",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-dark font-medium">
                  <i className="fas fa-check-circle text-primary"></i>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center">
            <i className="fas fa-heartbeat text-primary text-[10rem] animate-heartbeat"></i>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-teal text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Rural Healthcare?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of patients and doctors already using SehatSathi
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/signup" className="btn-primary !bg-white !text-primary hover:!bg-soft">
              Get Started Today
            </Link>
            <Link
              to="/about"
              className="btn-outline !border-white !text-white hover:!bg-white hover:!text-dark"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;