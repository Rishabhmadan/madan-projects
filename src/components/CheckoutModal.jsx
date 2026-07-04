import React, { useState } from "react";
import { X, Send, CreditCard, ShoppingBag, Store } from "lucide-react";

export default function CheckoutModal({ 
  isOpen, 
  onClose, 
  cart, 
  cartTotal, 
  cartCount, 
  paymentMethod, 
  onOrderConfirm 
}) {
  if (!isOpen) return null;

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const grandTotal = cartTotal;

  // Generate WhatsApp order message string for Self-Pickup
  const getWhatsAppMessage = () => {
    let itemsText = cart
      .map((item, idx) => `*${idx + 1}.* ${item.name} (${item.unit}) × ${item.quantity} = *₹${item.price * item.quantity}*`)
      .join("\n");

    const message = 
`📦 *NEW PICKUP ORDER - MADAN PROJECTS & MODEL MAKERS (MPMM)* 
---------------------------------------------
*Customer Details:*
• *Name:* ${customerName}
• *Phone:* ${customerPhone}
• *School/College:* ${schoolName || "N/A"}
• *City/Area:* ${billingAddress || "Gurugram"}

*Ordered Items (Self-Pickup):*
${itemsText}

*Bill Summary:*
• *Items Total:* ₹${cartTotal}
• *Pickup Type:* Store Self-Pickup (FREE)
• *Grand Total:* *₹${grandTotal}*
---------------------------------------------
• *Payment Mode:* ${paymentMethod === "UPI" ? "UPI QR Scan (Pending Verification)" : "Pay at Store on Pickup (Cash/UPI)"}

_I will pick up this order in 30 minutes from your Sector 7, Gurugram store. Please keep it ready!_`;

    return encodeURIComponent(message);
  };

  const handleWhatsAppOrder = (e) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      alert("Please fill in Name and Phone Number.");
      return;
    }

    setIsLoading(true);
    const waUrl = `https://wa.me/919711132558?text=${getWhatsAppMessage()}`;
    
    // Redirect to WhatsApp
    window.open(waUrl, "_blank");

    // Advance to next step (simulated order tracking)
    setTimeout(() => {
      onOrderConfirm({
        id: `MPMM-${Math.floor(100000 + Math.random() * 900000)}`,
        name: customerName,
        phone: customerPhone,
        address: "Self-Pickup from Sector 7, Gurugram Store (Plot No. 389/9, Sector 7)",
        total: grandTotal,
        paymentMethod: paymentMethod,
        items: [...cart],
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  const handleNormalCheckout = (e) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      alert("Please fill in Name and Phone Number.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      onOrderConfirm({
        id: `MPMM-${Math.floor(100000 + Math.random() * 900000)}`,
        name: customerName,
        phone: customerPhone,
        address: "Self-Pickup from Sector 7, Gurugram Store (Plot No. 389/9, Sector 7)",
        total: grandTotal,
        paymentMethod: paymentMethod,
        items: [...cart],
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      setIsLoading(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container animate-fade">
        <div className="modal-header">
          <h3 className="modal-title" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "30px", height: "30px", overflow: "hidden", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid var(--border-color)", backgroundColor: "#ffffff" }}>
              <img src="/logo.jpg" alt="Logo" style={{ width: "100%", height: "100%", transform: "scale(1.45)", objectFit: "cover" }} />
            </div>
            Confirm Pickup Order
          </h3>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* WhatsApp Redirect Recommendation Card */}
          <div className="whatsapp-redirect-card">
            <div className="whatsapp-icon-wrapper" style={{ backgroundColor: "#25d366" }}>💬</div>
            <div className="whatsapp-card-content">
              <span className="whatsapp-card-title" style={{ color: "#075e54" }}>Send Order to WhatsApp Manager</span>
              <span className="whatsapp-card-desc" style={{ color: "#128c7e" }}>
                Fill details below and click "Send Order via WhatsApp" to instantly request your pickup box. Store manager will keep it ready at Old Railway Road, Gurugram.
              </span>
            </div>
          </div>

          <form onSubmit={paymentMethod === "UPI" ? handleNormalCheckout : handleWhatsAppOrder}>
            <div className="form-group" style={{ marginBottom: "12px" }}>
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter your name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: "12px" }}>
              <label className="form-label">Mobile Number *</label>
              <input
                type="tel"
                className="form-input"
                placeholder="10-digit mobile number"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                pattern="[0-9]{10}"
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: "12px" }}>
              <label className="form-label">School / Institution Name (Optional)</label>
              <input
                type="text"
                className="form-input"
                placeholder="School, college or tuition center name"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
              />
            </div>

            <div className="form-group" style={{ marginBottom: "16px" }}>
              <label className="form-label">City / Area (Optional - for billing records)</label>
              <input
                type="text"
                className="form-input"
                placeholder="E.g. Sector 7, Gurugram"
                value={billingAddress}
                onChange={(e) => setBillingAddress(e.target.value)}
              />
            </div>

            {/* Self-Pickup Info Tag */}
            <div style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "8px", padding: "12px", display: "flex", gap: "8px", alignItems: "center", marginBottom: "16px" }}>
              <Store size={20} style={{ color: "var(--blinkit-green)" }} />
              <span style={{ fontSize: "12px", color: "#166534", fontWeight: "600", lineHeight: "1.4" }}>
                <b>Store Pickup</b>: You are placing a pickup order. Please visit our store in Sector 7, Gurugram to pay/collect your package.
              </span>
            </div>

            {/* UPI QR Display if payment method is UPI */}
            {paymentMethod === "UPI" && (
              <div className="upi-checkout-section animate-fade" style={{ marginTop: "0", marginBottom: "16px" }}>
                <span className="payment-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <CreditCard size={16} /> Scan & Pay Instantly
                </span>
                
                <div className="qr-code-placeholder">
                  <div className="qr-scan-line"></div>
                  {/* Generated clean mock QR code layout */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "4px", width: "100%", height: "100%" }}>
                    {Array.from({ length: 25 }).map((_, i) => (
                      <div 
                        key={i} 
                        style={{ 
                          backgroundColor: (i % 2 === 0 || i % 3 === 0 || i === 0 || i === 4 || i === 20 || i === 24) ? "var(--blinkit-green)" : "#ffffff",
                          borderRadius: "2px"
                        }}
                      ></div>
                    ))}
                  </div>
                </div>

                <p className="upi-instruction">
                  Scan QR code above with Google Pay, PhonePe, or Paytm. 
                  <br />
                  Payable Amount: <span>₹{grandTotal}</span>
                  <br />
                  UPI ID: <span>madanprojects@upi</span>
                </p>
              </div>
            )}

            {/* Form Actions */}
            <div style={{ display: "flex", gap: "12px" }}>
              <button 
                type="button" 
                className="tracker-btn-secondary" 
                style={{ flex: 1 }}
                onClick={onClose}
              >
                Cancel
              </button>
              
              {paymentMethod === "UPI" ? (
                <button 
                  type="submit" 
                  className="checkout-action-btn" 
                  style={{ flex: 2, padding: "12px", backgroundColor: "var(--blinkit-green)", color: "#ffffff" }}
                  disabled={isLoading}
                >
                  {isLoading ? "Verifying..." : `Verify & Place Order • ₹${grandTotal}`}
                </button>
              ) : (
                <button 
                  type="submit" 
                  className="checkout-action-btn" 
                  style={{ flex: 2, padding: "12px", backgroundColor: "#25d366", color: "#ffffff", boxShadow: "0 4px 12px rgba(37, 211, 102, 0.2)" }}
                  disabled={isLoading}
                >
                  <Send size={16} /> {isLoading ? "Redirecting..." : "Send Order via WhatsApp"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
