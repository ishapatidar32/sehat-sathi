import React from "react";
import { Link } from "react-router-dom";
//import "../style/home.css"; // Imports matching styles

const Home = () => {
  return (
    <div className="sehatsathi-home">
      {/* Hero Section */}
      <section className="hero-container">
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">SehatSathi</h1>
            <p className="hero-subtitle">
              Your Digital Healthcare Companion — Connecting Rural Communities to Quality Healthcare
            </p>
            <div className="hero-buttons">
              <Link to="/login" className="hero-btn hero-btn-primary">
                Login
              </Link>
              <Link to="/signup" className="hero-btn hero-btn-secondary">
                Register
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section py-5">
        <div className="container">
          <div className="row text-center mb-5">
            <div className="col-12">
              <h2 className="section-title">Revolutionizing Rural Healthcare</h2>
              <p className="section-subtitle">
                Bridging the gap between patients and quality healthcare through technology
              </p>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-video"></i>
                </div>
                <h4>Telemedicine Consultations</h4>
                <p>
                  Connect with certified doctors through video, audio, or text consultations from the comfort of your home.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-robot"></i>
                </div>
                <h4>AI-Powered Diagnosis</h4>
                <p>
                  Advanced AI processes symptoms and provides preliminary diagnosis with triage recommendations.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-language"></i>
                </div>
                <h4>Multi-Language Support</h4>
                <p>
                  Available in Punjabi, Hindi, and English to serve diverse rural communities effectively.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-pills"></i>
                </div>
                <h4>Digital Prescription</h4>
                <p>
                  Receive digital prescriptions and access to verified traditional remedies library.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-calendar-check"></i>
                </div>
                <h4>Appointment Management</h4>
                <p>
                  Easy scheduling and management of appointments with healthcare providers.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-mobile-alt"></i>
                </div>
                <h4>Mobile Accessibility</h4>
                <p>
                  Access healthcare services through phone, ABHA ID, or any mobile device.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="workflow-section py-5 bg-light">
        <div className="container">
          <div className="row text-center mb-5">
            <div className="col-12">
              <h2 className="section-title">How SehatSathi Works</h2>
              <p className="section-subtitle">
                Our comprehensive telemedicine platform workflow
              </p>
            </div>
          </div>

          {/* Patient Journey */}
          <div className="workflow-container mb-5">
            <h3 className="workflow-title text-center mb-4">Patient Journey</h3>
            <div className="workflow-steps">
              <div className="workflow-step">
                <div className="step-icon patient-step">
                  <i className="fas fa-user-plus"></i>
                </div>
                <div className="step-content">
                  <h5>Registration</h5>
                  <p>Patient logs in or registers via phone or ABHA ID</p>
                </div>
              </div>
              <div className="workflow-arrow">&rarr;</div>
              <div className="workflow-step">
                <div className="step-icon ai-step">
                  <i className="fas fa-brain"></i>
                </div>
                <div className="step-content">
                  <h5>AI Processing</h5>
                  <p>AI processes symptoms through language AI, symptom checker, and triage AI</p>
                </div>
              </div>
              <div className="workflow-arrow">&rarr;</div>
              <div className="workflow-step">
                <div className="step-icon symptoms-step">
                  <i className="fas fa-notes-medical"></i>
                </div>
                <div className="step-content">
                  <h5>Symptom Entry</h5>
                  <p>Patient enters symptoms in Punjabi, Hindi, or English</p>
                </div>
              </div>
              <div className="workflow-arrow">&rarr;</div>
              <div className="workflow-step">
                <div className="step-icon consultation-step">
                  <i className="fas fa-video"></i>
                </div>
                <div className="step-content">
                  <h5>Teleconsultation</h5>
                  <p>Patient books appointment and consults with doctor via video, audio, or text</p>
                </div>
              </div>
            </div>
          </div>

          {/* Doctor Journey */}
          <div className="workflow-container">
            <h3 className="workflow-title text-center mb-4">Doctor Journey</h3>
            <div className="workflow-steps">
              <div className="workflow-step">
                <div className="step-icon doctor-step">
                  <i className="fas fa-user-md"></i>
                </div>
                <div className="step-content">
                  <h5>Doctor Login</h5>
                  <p>Doctor logs in or registers to the platform</p>
                </div>
              </div>
              <div className="workflow-arrow">&rarr;</div>
              <div className="workflow-step">
                <div className="step-icon appointment-step">
                  <i className="fas fa-calendar"></i>
                </div>
                <div className="step-content">
                  <h5>Manage Appointments</h5>
                  <p>Doctor views and manages appointments</p>
                </div>
              </div>
              <div className="workflow-arrow">&rarr;</div>
              <div className="workflow-step">
                <div className="step-icon consult-step">
                  <i className="fas fa-stethoscope"></i>
                </div>
                <div className="step-content">
                  <h5>Patient Consultation</h5>
                  <p>Doctor consults with patients via video, audio, or text</p>
                </div>
              </div>
              <div className="workflow-arrow">&rarr;</div>
              <div className="workflow-step">
                <div className="step-icon treatment-step">
                  <i className="fas fa-prescription"></i>
                </div>
                <div className="step-content">
                  <h5>Treatment &amp; Records</h5>
                  <p>Doctor suggests treatments, adds remedies to library, and updates patient records</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2 className="section-title">About SehatSathi</h2>
              <p className="about-text">
                SehatSathi is a revolutionary telemedicine platform designed specifically for rural communities.
                We leverage cutting-edge AI technology and multilingual support to bridge the healthcare gap
                between urban and rural areas.
              </p>
              <p className="about-text">
                Our platform combines traditional remedies with modern medical practices, ensuring culturally
                sensitive healthcare delivery that resonates with rural populations while maintaining the
                highest medical standards.
              </p>
              <div className="about-features">
                <div className="about-feature">
                  <i className="fas fa-check-circle"></i>
                  <span>AI-Powered Symptom Analysis</span>
                </div>
                <div className="about-feature">
                  <i className="fas fa-check-circle"></i>
                  <span>Multi-Language Support</span>
                </div>
                <div className="about-feature">
                  <i className="fas fa-check-circle"></i>
                  <span>Traditional &amp; Modern Medicine</span>
                </div>
                <div className="about-feature">
                  <i className="fas fa-check-circle"></i>
                  <span>24/7 Healthcare Access</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <div className="about-image">
                <i className="fas fa-heartbeat about-icon"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-5">
        <div className="container text-center">
          <h2 className="cta-title">Ready to Transform Rural Healthcare?</h2>
          <p className="cta-subtitle">Join thousands of patients and doctors already using SehatSathi</p>
          <div className="cta-buttons">
            <Link to="/signup" className="btn cta-btn-primary">
              Get Started Today
            </Link>
            <Link to="/about" className="btn cta-btn-secondary">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;