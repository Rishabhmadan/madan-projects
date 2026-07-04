import React, { useState, useRef } from "react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  MessageSquare, 
  ExternalLink,
  Atom, 
  Cpu, 
  BookOpen, 
  FlaskConical, 
  Check 
} from "lucide-react";

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("school-project");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone || !message) {
      alert("Please fill in Name, Phone, and Message.");
      return;
    }
    setIsSubmitted(true);
    setTimeout(() => {
      // Clear form
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    }, 4000);
  };

  const handleSelectSpecialization = (subjectValue, templateMessage) => {
    setSubject(subjectValue);
    setMessage(templateMessage);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const specializations = [
    {
      id: "school-project",
      title: "Science exhibition & Working Models",
      icon: <Atom size={20} />,
      description: "Custom-made working & static science exhibition models tailored to CBSE, ICSE, and state syllabus requirements.",
      popular: [
        "Motorised Brushing Teeth Model",
        "3D Respiratory/Excretory System",
        "Hydraulic Bridge/Crane Model",
        "Rain Water Harvesting System"
      ],
      template: "Hi, I am looking for a custom science exhibition model. I'd like to inquire about [specify model, e.g., Motorised Brushing Teeth / Hydraulic Bridge] for Class [specify class]. My requirements are..."
    },
    {
      id: "robotics",
      title: "STEM & DIY Robotics Kits",
      icon: <Cpu size={20} />,
      description: "Arduino microcontrollers, sensors, IoT setups, and electronic components for engineering and STEM school projects.",
      popular: [
        "Speed Breaker Power Generator",
        "Line Follower & Obstacle Avoidance Robots",
        "Smart Blind Stick / Solar Trackers",
        "DIY Electronics & STEM Kits"
      ],
      template: "Hi, I am interested in STEM/Robotics kits. I want to inquire about [specify kit, e.g., Speed Breaker Generator / Line Follower Robot]. Please share prices and component details..."
    },
    {
      id: "custom-charts",
      title: "Educational Charts & Stationery",
      icon: <BookOpen size={20} />,
      description: "High-quality laminated educational wall charts, practical files, customized notebooks, and core school stationery.",
      popular: [
        "CBSE Laminated Human Anatomy Charts",
        "Chemistry Periodic Table Wall Charts",
        "School Lab & Practical Log Files",
        "Special Craft & Model-making Materials"
      ],
      template: "Hi, I want to order educational wall charts or practical stationery. I need details about [specify items, e.g., Anatomy Charts / Practical Files] in bulk/retail..."
    },
    {
      id: "bulk-supplies",
      title: "Lab Equipment & Supplies",
      icon: <FlaskConical size={20} />,
      description: "Complete laboratory apparatus, quality glassware (Borosilicate), test-tubes, and chemical reagents for school lab setups.",
      popular: [
        "Physics Optics & Mechanics Kits",
        "Chemistry Glassware & Reagent Kits",
        "High-precision Biological Microscopes",
        "Prepared Slides & Specimen Jars"
      ],
      template: "Hi, I want to inquire about lab equipment supplies. We are looking to purchase [specify items, e.g., Microscopes / Glassware / Physics kits] for our school lab..."
    }
  ];

  return (
    <div className="contact-container animate-fade">
      {/* Contact Hero banner */}
      <div className="contact-hero">
        <div className="contact-hero-icon" style={{ width: "100px", height: "100px", overflow: "hidden", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid var(--border-color)", backgroundColor: "#ffffff", marginBottom: "8px", boxShadow: "var(--shadow-md)" }}>
          <img src="/logo.jpg" alt="MPMM Logo" style={{ width: "100%", height: "100%", transform: "scale(1.45)", objectFit: "cover" }} />
        </div>
        <h2>Madan Projects & Model Makers (MPMM)</h2>
        <p>
          Gurugram's trusted educational supply and model-making partner. We specialize in custom science exhibition models, school projects, STEM robotics kits, and complete school lab setups.
        </p>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginTop: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--blinkit-green)", backgroundColor: "var(--blinkit-green-soft)", padding: "6px 12px", borderRadius: "var(--radius-full)", border: "1px solid rgba(10,100,102,0.15)", fontWeight: "600" }}>
            <Award size={14} /> Gurgaon's Premier Model Maker
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--blinkit-green)", backgroundColor: "var(--blinkit-green-soft)", padding: "6px 12px", borderRadius: "var(--radius-full)", border: "1px solid rgba(10,100,102,0.15)", fontWeight: "600" }}>
            <ShieldCheck size={14} /> CBSE & ICSE Standard Specifications
          </div>
        </div>
      </div>

      <div className="contact-grid">
        {/* Contact Info Card */}
        <div className="contact-info-card">
          <h3 style={{ fontSize: "17px", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px", color: "var(--blinkit-green)" }}>Store & Contact Details</h3>
          
          <div className="contact-info-item">
            <div className="contact-info-icon-wrapper">
              <Phone size={18} />
            </div>
            <div className="contact-info-details">
              <span className="contact-info-label">Call / WhatsApp</span>
              <span className="contact-info-value" style={{ fontSize: "15px", fontWeight: "700" }}>
                +91 97111 32558
              </span>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-info-icon-wrapper">
              <MapPin size={18} />
            </div>
            <div className="contact-info-details">
              <span className="contact-info-label">Store Location</span>
              <span className="contact-info-value">
                Shop No. 1, Baldev Nagar,
                <br />
                Street No. 14, Near Kutia Mandir,
                <br />
                Parmar College, Jyoti Park,
                <br />
                Gurgaon, Haryana - 122001
              </span>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-info-icon-wrapper">
              <Clock size={18} />
            </div>
            <div className="contact-info-details">
              <span className="contact-info-label">Store Hours</span>
              <span className="contact-info-value">
                09:00 AM - 09:00 PM
                <br />
                <span style={{ color: "var(--blinkit-green)", fontWeight: "700" }}>Open All 7 Days</span>
              </span>
            </div>
          </div>

          {/* Quick Communication Actions */}
          <div className="contact-action-buttons">
            <a 
              href="https://wa.me/919711132558?text=Hello%20Madan%20Projects,%20I'm%20inquiring%20about%20school%20models/projects." 
              className="contact-btn-whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageSquare size={16} /> WhatsApp Chat
            </a>
            <a 
              href="tel:+919711132558" 
              className="contact-btn-call"
            >
              <Phone size={16} /> Call Store
            </a>
          </div>

          {/* Interactive Google Map Embed */}
          <div className="contact-map-container">
            <iframe 
              src="https://maps.google.com/maps?q=Madan%20Projects%20and%20Model%20Makers,%20Gurgaon&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Madan Projects Location Map"
            ></iframe>
          </div>
        </div>

        {/* Contact Form Card */}
        <div className="contact-form-card" ref={formRef}>
          {isSubmitted ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", textAlign: "center", gap: "16px", padding: "20px 0" }} className="animate-fade">
              <CheckCircle2 size={54} style={{ color: "var(--blinkit-green)" }} />
              <h4 style={{ fontSize: "18px", fontWeight: "700", color: "var(--blinkit-green)" }}>Inquiry Submitted Successfully!</h4>
              <p style={{ fontSize: "13.5px", color: "var(--text-muted)", maxWidth: "320px", lineHeight: "1.5" }}>
                Thank you for contacting Madan Projects & Model Makers (MPMM). Our educational project consultant will review your requirements and call you shortly.
              </p>
              <button 
                className="tracker-btn-secondary" 
                style={{ padding: "10px 20px", marginTop: "8px", fontWeight: "700" }}
                onClick={() => setIsSubmitted(false)}
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <>
              <h3 style={{ fontSize: "17px", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px", color: "var(--blinkit-green)" }}>Send Custom Inquiry</h3>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="Enter 10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    pattern="[0-9]{10}"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Subject / Category</label>
                  <select
                    className="form-input"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  >
                    <option value="school-project">Custom Science Working Model (Bespoke Build)</option>
                    <option value="robotics">STEM & DIY Robotics Project Kits</option>
                    <option value="custom-charts">Custom Educational Charts & Wall Diagrams</option>
                    <option value="bulk-supplies">Bulk School Lab Supplies & Laboratory Glassware</option>
                    <option value="general-query">General Query / Store Visit Inquiry</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Your Message & Model Requirements *</label>
                  <textarea
                    className="form-input form-textarea"
                    style={{ height: "130px", resize: "none" }}
                    placeholder="Describe what science models, charts, or lab items you need. Tell us about your topic/syllabus, school grade level, required turnaround time, and target budget..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="submit-btn" style={{ marginTop: "6px", backgroundColor: "var(--blinkit-green)", color: "white", padding: "12px", borderRadius: "8px", fontWeight: "700", border: "none", cursor: "pointer" }}>
                  Submit Inquiry Details
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      {/* Model Details Showcase (Extracted from Google Search) */}
      <div className="models-specialization-section">
        <div className="models-specs-title-wrapper">
          <h3>Model Maker Specialties & Details</h3>
          <p>Click on any specialization to pre-fill the inquiry form above with a template.</p>
        </div>

        <div className="models-specs-grid">
          {specializations.map((spec) => (
            <div key={spec.id} className="model-spec-card">
              <div className="model-spec-header">
                <div className="model-spec-icon-wrapper">
                  {spec.icon}
                </div>
                <h4>{spec.title}</h4>
              </div>
              <p className="model-spec-desc">{spec.description}</p>
              <ul className="model-spec-list">
                {spec.popular.map((item, idx) => (
                  <li key={idx} className="model-spec-list-item">
                    <Check size={14} />
                    {item}
                  </li>
                ))}
              </ul>
              <button 
                className="model-spec-action-btn"
                onClick={() => handleSelectSpecialization(spec.id, spec.template)}
              >
                Inquire For This Category →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
