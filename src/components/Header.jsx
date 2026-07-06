import React from "react";
import { Search, ShoppingBag, PhoneCall, Printer } from "lucide-react";

export default function Header({ 
  cart, 
  cartTotal, 
  cartCount, 
  searchQuery, 
  setSearchQuery, 
  onCartOpen, 
  currentView, 
  setCurrentView
}) {
  return (
    <header className="header">
      <div className="header-container">
        {/* Left: Brand Logo */}
        <div className="header-left">
          <div className="logo-container" onClick={() => setCurrentView("shop")} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "48px", height: "48px", overflow: "hidden", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "1.5px solid var(--border-color)", backgroundColor: "#ffffff", boxShadow: "var(--shadow-sm)" }}>
              <img src={`${import.meta.env.BASE_URL || '/'}logo.jpg`} alt="MPMM Logo" style={{ width: "100%", height: "100%", transform: "scale(1.45)", objectFit: "cover" }} />
            </div>
            <div>
              <div className="logo-main">
                MADAN <span>PROJECTS</span>
              </div>
              <div className="logo-sub">Model Makers (MPMM)</div>
            </div>
          </div>
        </div>

        {/* Redirect to Madan Printers Sub-URL */}
        <a 
          href="https://printers.madanprojects.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="digital-prints-link"
        >
          <Printer size={15} />
          <span>Digital Prints & Binding</span>
        </a>

        {/* Center: Search Bar */}
        <div className="header-center">
          <div className="search-container">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              className="search-input"
              placeholder='Search for "microscope", "beaker", "robotics", "charts", "clay"...'
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (currentView !== "shop") setCurrentView("shop");
              }}
            />
          </div>
        </div>

        {/* Right: Contact Us Link + Cart Button */}
        <div className="header-right">
          <button 
            className={`contact-nav-btn ${currentView === "contact" ? "active" : ""}`}
            onClick={() => setCurrentView(currentView === "contact" ? "shop" : "contact")}
          >
            <PhoneCall size={16} />
            <span>Contact Us</span>
          </button>

          <button className="cart-button" onClick={onCartOpen}>
            <div className="cart-icon-container">
              <ShoppingBag size={20} />
              {cartCount > 0 && <span className="cart-badge animate-pop">{cartCount}</span>}
            </div>
            <div className="cart-divider"></div>
            <div className="cart-value">
              <span className="cart-value-qty">
                {cartCount === 0 ? "My Cart" : `${cartCount} items`}
              </span>
              {cartCount > 0 && (
                <span className="cart-value-price">₹{cartTotal}</span>
              )}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
