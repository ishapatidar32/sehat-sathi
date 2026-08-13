import React from "react";

const Footer = () => {
  return (
    <footer className="footer-shell">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <i className="fas fa-heartbeat text-red-500 text-2xl"></i>
            <span className="text-xl font-bold">SehatSathi</span>
          </div>
          <p className="text-gray-300 mb-4">
            Revolutionizing rural healthcare through AI-powered telemedicine, connecting patients
            with quality healthcare services in their native languages.
          </p>
          <div className="flex gap-3">
            {["facebook-f", "twitter", "linkedin-in", "instagram"].map((icon) => (
              <a
                key={icon}
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <i className={`fab fa-${icon}`}></i>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h5 className="text-primary font-semibold mb-4">Quick Links</h5>
          <ul className="space-y-2 text-gray-300">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="/features" className="hover:text-white">Features</a></li>
            <li><a href="/how-it-works" className="hover:text-white">How It Works</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        <div>
          <h5 className="text-primary font-semibold mb-4">Services</h5>
          <ul className="space-y-2 text-gray-300">
            <li><a href="/telemedicine" className="hover:text-white">Telemedicine</a></li>
            <li><a href="/ai-diagnosis" className="hover:text-white">AI Diagnosis</a></li>
            <li><a href="/appointments" className="hover:text-white">Appointments</a></li>
            <li><a href="/prescriptions" className="hover:text-white">Digital Prescription</a></li>
            <li><a href="/records" className="hover:text-white">Health Records</a></li>
          </ul>
        </div>

        <div>
          <h5 className="text-primary font-semibold mb-4">Support</h5>
          <ul className="space-y-2 text-gray-300">
            <li><a href="/help" className="hover:text-white">Help Center</a></li>
            <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-white">Terms of Service</a></li>
            <li><a href="/faq" className="hover:text-white">FAQ</a></li>
            <li><a href="/support" className="hover:text-white">Support</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-10 pt-6 border-t border-white/10 text-gray-400 text-sm flex flex-col md:flex-row justify-between gap-2">
        <span>&copy; {new Date().getFullYear()} SehatSathi. All rights reserved.</span>
        <span className="flex items-center gap-2 flex-wrap">
          <i className="fas fa-phone"></i> +91 6350391200
          <span className="mx-1">|</span>
          <i className="fas fa-envelope"></i> sehatsathiquery@gmail.com
        </span>
      </div>
    </footer>
  );
};

export default Footer;