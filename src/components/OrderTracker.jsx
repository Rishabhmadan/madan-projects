import React, { useState, useEffect } from "react";
import { Check, ClipboardList, Package, CheckCircle2, Store, ArrowLeft, PhoneCall, MapPin, ExternalLink } from "lucide-react";

export default function OrderTracker({ order, onBackToShop }) {
  const [currentStep, setCurrentStep] = useState(1);

  // Auto-advance timeline steps to simulate pack progress!
  useEffect(() => {
    if (currentStep >= 4) return;

    const timer = setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, 4500);

    return () => clearTimeout(timer);
  }, [currentStep]);

  const steps = [
    {
      id: 1,
      title: "Order Placed & Confirmed",
      desc: `Acknowleged at ${order.date}. Store manager is verifying item checklist.`,
      icon: <ClipboardList size={14} />,
    },
    {
      id: 2,
      title: "Preparing school items",
      desc: "Models and materials are being gathered and bubble-wrapped for safe transit.",
      icon: <Package size={14} />,
    },
    {
      id: 3,
      title: "Quality seal verified",
      desc: "CBSE guidelines and sensor test checks completed. Box sealed.",
      icon: <CheckCircle2 size={14} />,
    },
    {
      id: 4,
      title: "Ready for Store Pickup!",
      desc: "Please visit our Sector 7, Gurugram store to collect your package.",
      icon: <Store size={14} />,
    },
  ];

  return (
    <div className="tracker-container animate-fade" style={{ maxWidth: "520px" }}>
      {/* Arriving Time Card */}
      <div style={{ backgroundColor: "var(--blinkit-green)", color: "#ffffff", borderRadius: "10px", padding: "18px", display: "flex", flexDirection: "column", gap: "6px", boxShadow: "var(--shadow-md)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px", opacity: "0.9" }}>
            Store Self-Pickup Tracker
          </span>
          <span style={{ fontSize: "11px", backgroundColor: "rgba(255,255,255,0.2)", padding: "2px 8px", borderRadius: "4px", fontWeight: "700" }}>
            ID: {order.id}
          </span>
        </div>
        <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#ffffff", fontFamily: "var(--font-heading)" }}>
          {currentStep === 4 ? "Ready for Pickup!" : "Packing: Ready in 15 mins"}
        </h2>
        <div style={{ width: "100%", height: "4px", backgroundColor: "rgba(255,255,255,0.2)", borderRadius: "2px", overflow: "hidden", marginTop: "4px" }}>
          <div 
            style={{ 
              height: "100%", 
              backgroundColor: "var(--blinkit-yellow)", 
              width: `${(currentStep / 4) * 100}%`,
              transition: "width 0.5s ease" 
            }}
          ></div>
        </div>
      </div>

      {/* Store Location Map & Navigation Card */}
      <div style={{ border: "1px solid var(--border-color)", borderRadius: "10px", padding: "14px", background: "#f8fafc", display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "var(--blinkit-green-soft)", color: "var(--blinkit-green)", display: "flex", alignItems: "center", justifyCenter: "center", flexShrink: 0, marginTop: "2px", paddingLeft: "10px" }}>
            <MapPin size={18} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <span style={{ fontSize: "11px", fontWeight: "800", color: "var(--text-light)", textTransform: "uppercase" }}>Pick up from store</span>
            <span style={{ fontSize: "13.5px", fontWeight: "800", color: "var(--text-main)" }}>Madan Projects & Model Makers</span>
            <span style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: "1.4" }}>
              Plot No. 389/9, Sector 7, Near Harish Bakery, Old Railway Road, Gurugram, Haryana - 122001
            </span>
          </div>
        </div>

        <button 
          className="tracker-btn-primary"
          onClick={() => window.open("https://maps.google.com/maps?cid=17305000816231253176", "_blank")}
          style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "10px" }}
        >
          <ExternalLink size={14} /> Navigate via Google Maps
        </button>
      </div>

      {/* Timeline tracker */}
      <div className="tracker-steps" style={{ paddingLeft: "30px", marginTop: "4px" }}>
        <style dangerouslySetInnerHTML={{__html: `
          .tracker-steps::before { left: 9px !important; }
          .tracker-step-node { left: -30px !important; width: 20px !important; height: 20px !important; font-size: 10px !important; }
        `}} />
        {steps.map((step) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;

          return (
            <div 
              key={step.id} 
              className={`tracker-step-item ${isCompleted ? "completed" : ""} ${isActive ? "active" : ""}`}
              style={{ paddingBottom: "22px" }}
            >
              <div 
                className="tracker-step-node"
                style={{ 
                  backgroundColor: isCompleted ? "var(--blinkit-green)" : isActive ? "#ffffff" : "#ffffff",
                  borderColor: isCompleted ? "var(--blinkit-green)" : isActive ? "var(--blinkit-green)" : "var(--border-color)",
                }}
              >
                {isCompleted ? <Check size={10} style={{ color: "#ffffff" }} /> : step.icon}
              </div>
              <div className="tracker-step-details">
                <span className="tracker-step-title" style={{ fontSize: "13.5px" }}>{step.title}</span>
                <span className="tracker-step-desc" style={{ fontSize: "11.5px" }}>{step.desc}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pickup Details Card */}
      <div style={{ backgroundColor: "#fafafa", borderRadius: "10px", padding: "14px", border: "1px solid var(--border-color)", fontSize: "12px", display: "flex", flexDirection: "column", gap: "4px" }}>
        <span style={{ fontSize: "10px", fontWeight: "800", color: "var(--text-light)", textTransform: "uppercase" }}>Order details:</span>
        <span style={{ fontWeight: "700" }}>{order.name} ({order.phone})</span>
        <span style={{ color: "var(--text-muted)" }}>{order.address}</span>
        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--border-color)", paddingTop: "8px", marginTop: "6px", fontWeight: "700" }}>
          <span>Total Payable:</span>
          <span>₹{order.total} ({order.paymentMethod === "UPI" ? "Paid Online" : "Pay at Store on Pickup"})</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="tracker-footer-actions">
        <button 
          className="tracker-btn-secondary"
          onClick={() => window.open("tel:+919711132558", "_self")}
          style={{ padding: "12px" }}
        >
          <PhoneCall size={15} /> Contact Store
        </button>
        <button 
          className="tracker-btn-primary"
          onClick={onBackToShop}
          style={{ padding: "12px" }}
        >
          <ArrowLeft size={16} /> Continue Shopping
        </button>
      </div>
    </div>
  );
}
