import React from "react";
import { X, ShoppingBag, Trash2, Clock, Sparkles, CreditCard, Banknote, Store } from "lucide-react";

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cart, 
  onAdd, 
  onRemove, 
  onClear,
  cartTotal,
  cartCount,
  paymentMethod,
  setPaymentMethod,
  onCheckout
}) {
  if (!isOpen) return null;

  // Since it's self-pickup, there are no delivery charges or packaging fees!
  const grandTotal = cartTotal;

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="drawer-header">
          <h3 className="drawer-title">My Cart</h3>
          <button className="drawer-close" onClick={onClose} style={{ display: "flex", alignItems: "center" }}>
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="drawer-content">
          {cartCount === 0 ? (
            <div className="empty-cart-container">
              <div className="empty-cart-icon">🛒</div>
              <h4 className="empty-cart-title">You don't have any items in your cart</h4>
              <p className="empty-cart-desc">
                Your favorite school projects, laboratory equipment, and custom model components are waiting for you!
              </p>
              <button className="shop-now-btn" onClick={onClose}>
                Start Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Store Pickup Info Header Card */}
              <div className="cart-schedule-card">
                <div className="cart-schedule-icon" style={{ backgroundColor: "var(--blinkit-green-soft)", color: "var(--blinkit-green)" }}>
                  <Store size={20} />
                </div>
                <div className="cart-schedule-info">
                  <span className="cart-schedule-title">Store Self-Pickup</span>
                  <span className="cart-schedule-desc">Ready for pickup in 30 mins at Sector 7, Gurugram</span>
                </div>
              </div>

              {/* Self-Pickup Notification Banner */}
              <div style={{ backgroundColor: "var(--blinkit-green-soft)", border: "1px dashed rgba(10, 100, 102, 0.2)", borderRadius: "8px", padding: "10px 12px", fontSize: "11px", color: "var(--blinkit-green)", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" }}>
                <Clock size={14} />
                <span>
                  Save time & skip delivery fees! Place order online, pickup from store.
                </span>
              </div>

              {/* Cross-Sell Printing Banner */}
              <a 
                href="https://printers.madanprojects.com" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  backgroundColor: "#fffbeb", 
                  border: "1px solid #fde68a", 
                  borderRadius: "8px", 
                  padding: "10px 12px", 
                  fontSize: "11.5px", 
                  color: "var(--text-main)", 
                  fontWeight: "700", 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "8px",
                  textDecoration: "none",
                  boxShadow: "var(--shadow-sm)",
                  transition: "all 0.15s ease",
                }}
                className="cart-prints-promo"
              >
                <span style={{ fontSize: "16px" }}>🖨️</span>
                <div style={{ flexGrow: 1 }}>
                  <div>Need practical printouts or spiral binding?</div>
                  <span style={{ fontSize: "10px", color: "var(--blinkit-green)", fontWeight: "800" }}>Get them printed at ₹1/pg ➔</span>
                </div>
              </a>

              {/* Items List */}
              <div className="cart-items-box">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span style={{ fontSize: "11px", fontWeight: "800", textTransform: "uppercase", color: "var(--text-muted)", letterSpacing: "0.5px" }}>Items List</span>
                  <button 
                    onClick={onClear}
                    style={{ background: "none", border: "none", color: "#e03e3e", fontSize: "11px", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", gap: "2px" }}
                  >
                    <Trash2 size={12} /> Clear All
                  </button>
                </div>

                {cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-image">
                      {typeof item.image === "string" && (item.image.startsWith("/") || item.image.startsWith("http")) ? (
                        <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "var(--radius-sm)" }} />
                      ) : (
                        item.image
                      )}
                    </div>
                    
                    <div className="cart-item-details">
                      <span className="cart-item-name">{item.name}</span>
                      <span className="cart-item-unit">{item.unit}</span>
                      <span className="cart-item-price">₹{item.price * item.quantity}</span>
                    </div>

                    {/* Quantity Selector */}
                    <div className="add-btn-wrapper" style={{ width: "68px", height: "28px" }}>
                      <div className="add-btn-filled" style={{ padding: "0 6px" }}>
                        <button 
                          className="add-btn-control" 
                          onClick={() => onRemove(item.id)}
                        >
                          -
                        </button>
                        <span className="add-btn-qty">{item.quantity}</span>
                        <button 
                          className="add-btn-control" 
                          onClick={() => onAdd(item)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bill Details */}
              <div className="bill-details-card">
                <h4 className="bill-title">Bill Details</h4>
                <div className="bill-row">
                  <span>Item Total</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="bill-row">
                  <span>Pickup Type</span>
                  <span className="bill-free-tag">Store Self-Pickup (FREE)</span>
                </div>
                <div className="bill-row total">
                  <span>Grand Total</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {cartCount > 0 && (
          <div className="drawer-footer">
            {/* Payment Method Option */}
            <div className="payment-method-selector">
              <span className="payment-label">Choose Payment Method</span>
              <div className="payment-options-row">
                <button 
                  className={`payment-option-btn ${paymentMethod === "UPI" ? "selected" : ""}`}
                  onClick={() => setPaymentMethod("UPI")}
                >
                  <CreditCard size={14} /> Scan UPI QR
                </button>
                <button 
                  className={`payment-option-btn ${paymentMethod === "COD" ? "selected" : ""}`}
                  onClick={() => setPaymentMethod("COD")}
                >
                  <Banknote size={14} /> Pay at Store on Pickup
                </button>
              </div>
            </div>

            {/* Place Order Trigger */}
            <button className="checkout-action-btn" onClick={onCheckout}>
              <span>Confirm Order</span>
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                ₹{grandTotal} ➔
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
