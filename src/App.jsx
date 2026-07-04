import React, { useState, useMemo, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ProductCard from "./components/ProductCard";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import ContactUs from "./components/ContactUs";
import OrderTracker from "./components/OrderTracker";
import { categories, products } from "./data/products";
import * as Icons from "lucide-react";

export default function App() {
  // Navigation & View States
  const [currentView, setCurrentView] = useState("shop"); // 'shop', 'contact', 'tracker'
  const [activeCategory, setActiveCategory] = useState("printers");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Cart States
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  
  // Checkout & Order States
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);

  // Digital Prints Calculator States
  const [calcPages, setCalcPages] = useState(50);
  const [calcPrintType, setCalcPrintType] = useState("bw"); // 'bw', 'color'
  const [calcBinding, setCalcBinding] = useState("spiral"); // 'none', 'spiral', 'soft', 'hard'
  const [calcLamination, setCalcLamination] = useState(false);

  // Estimated Cost calculation
  const estimatedPrintCost = useMemo(() => {
    const pages = Number(calcPages) || 0;
    const pageRate = calcPrintType === "bw" ? 1 : 5;
    const bindingCost = calcBinding === "none" ? 0 : calcBinding === "spiral" ? 20 : calcBinding === "soft" ? 50 : 150;
    const laminationCost = calcLamination ? 15 : 0;
    return (pages * pageRate) + bindingCost + laminationCost;
  }, [calcPages, calcPrintType, calcBinding, calcLamination]);

  // Sync scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentView, activeCategory]);

  // Cart operations
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId);
      if (existingItem.quantity === 1) {
        return prevCart.filter((item) => item.id !== productId);
      }
      return prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Cart Calculations
  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  // Filtered Products based on Category & Search
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        !activeCategory || product.category === activeCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Handle successful checkout placement
  const handleOrderConfirm = (orderData) => {
    setActiveOrder(orderData);
    setCart([]); // clear cart
    setCurrentView("tracker"); // redirect to order status timeline
  };

  // Find dynamic cart quantity for a specific product
  const getProductCartQty = (productId) => {
    const item = cart.find((c) => c.id === productId);
    return item ? item.quantity : 0;
  };

  // Mobile categories list element rendering
  const renderMobilePills = () => {
    return (
      <div className="mobile-categories-bar">
        {categories.map((category) => {
          const isActive = activeCategory === category.id;
          return (
            <button
              key={category.id}
              className={`mobile-category-pill ${isActive ? "active" : ""} ${category.id === 'printers' ? 'mobile-printers-pill' : ''}`}
              onClick={() => {
                setActiveCategory(category.id);
                setSearchQuery(""); // Clear search to show category
              }}
            >
              <span>{isActive ? "✓ " : ""}</span>
              {category.name}
              {category.id === "printers" && (
                <span className="mobile-hot-badge"> ⚡</span>
              )}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {/* Header */}
      <Header
        cart={cart}
        cartTotal={cartTotal}
        cartCount={cartCount}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onCartOpen={() => setIsCartOpen(true)}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      {/* Main Layout Area */}
      {currentView === "shop" && (
        <>
          {/* Mobile Category Pinned Bar */}
          {renderMobilePills()}

          <div className="app-layout">
            {/* Desktop Left Sidebar */}
            <Sidebar
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={(catId) => {
                setActiveCategory(catId);
                setSearchQuery(""); // Clear search on category click
              }}
            />

            {/* Right Scrollable Product List */}
            <main className="content-area">
              {/* Educational Promo Banner */}
              <div className="promo-banner animate-fade">
                <div className="promo-content">
                  <span className="promo-badge" style={{ backgroundColor: "var(--blinkit-yellow)", color: "var(--text-main)" }}>MPMM Differentiator</span>
                  <h2 className="promo-title">Custom Science Models & Laminated Charts</h2>
                  <p className="promo-desc" style={{ marginBottom: "12px" }}>
                    Our Strength: High-quality bespoke models and charts tailored to school requirements at highly competitive prices with the fastest turnaround time!
                  </p>
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "11px", backgroundColor: "rgba(255,255,255,0.8)", color: "var(--blinkit-green)", padding: "4px 8px", borderRadius: "var(--radius-sm)", fontWeight: "700" }}>
                      🛠️ Custom Models & Charts
                    </span>
                    <span style={{ fontSize: "11px", backgroundColor: "rgba(255,255,255,0.8)", color: "var(--blinkit-green)", padding: "4px 8px", borderRadius: "var(--radius-sm)", fontWeight: "700" }}>
                      ⚡ Fast Turnaround Time
                    </span>
                    <span style={{ fontSize: "11px", backgroundColor: "rgba(255,255,255,0.8)", color: "var(--blinkit-green)", padding: "4px 8px", borderRadius: "var(--radius-sm)", fontWeight: "700" }}>
                      🏷️ Competitive Pricing
                    </span>
                    <a 
                      href="https://printers.madanprojects.com" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ 
                        fontSize: "11px", 
                        backgroundColor: "var(--blinkit-yellow)", 
                        color: "var(--text-main)", 
                        padding: "4px 8px", 
                        borderRadius: "var(--radius-sm)", 
                        fontWeight: "800",
                        textDecoration: "none",
                        boxShadow: "0 1px 4px rgba(245, 187, 27, 0.2)"
                      }}
                    >
                      🖨️ Document Prints @ ₹1/pg ➔
                    </a>
                  </div>
                </div>
                <div className="promo-image-section" style={{ width: "110px", height: "110px", overflow: "hidden", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "4px solid rgba(255,255,255,0.25)", backgroundColor: "#ffffff", padding: "0", boxShadow: "var(--shadow-md)" }}>
                  <img src={`${import.meta.env.BASE_URL || '/'}logo.jpg`} alt="MPMM Logo" style={{ width: "100%", height: "100%", transform: "scale(1.45)", objectFit: "cover" }} />
                </div>
              </div>

              {/* Grid Section */}
              <div className="section-header">
                <div className="section-title-wrapper">
                  <h2 className="section-title">
                    {searchQuery ? `Search Results for "${searchQuery}"` : categories.find(c => c.id === activeCategory)?.name}
                  </h2>
                  <span className="section-subtitle">
                    {searchQuery 
                      ? `${filteredProducts.length} items found` 
                      : categories.find(c => c.id === activeCategory)?.description
                    }
                  </span>
                </div>
              </div>

              {activeCategory === "printers" && !searchQuery ? (
                /* Beautiful Madan Printers Landing Layout */
                <div className="animate-fade" style={{ display: "flex", flexDirection: "column", gap: "28px", marginTop: "10px" }}>
                  
                  {/* Hero Header Card */}
                  <div style={{ 
                    background: "linear-gradient(135deg, var(--blinkit-green) 0%, #0d797c 100%)", 
                    borderRadius: "16px", 
                    padding: "40px 32px", 
                    textAlign: "left", 
                    position: "relative",
                    overflow: "hidden",
                    color: "#ffffff",
                    boxShadow: "var(--shadow-md)"
                  }}>
                    {/* Background faint details */}
                    <div style={{ position: "absolute", right: "-20px", bottom: "-30px", opacity: 0.12, fontSize: "160px", pointerEvents: "none" }}>🖨️</div>
                    <div style={{ position: "absolute", right: "10%", top: "10%", opacity: 0.08, fontSize: "60px", pointerEvents: "none" }}>📄</div>
                    
                    <div style={{ maxWidth: "600px", zIndex: 1, position: "relative" }}>
                      <span style={{ 
                        backgroundColor: "var(--blinkit-yellow)", 
                        color: "var(--text-main)", 
                        fontSize: "11px", 
                        fontWeight: "800", 
                        padding: "4px 10px", 
                        borderRadius: "20px",
                        display: "inline-block",
                        marginBottom: "16px",
                        textTransform: "uppercase"
                      }}>
                        ⚡ Instant Printing Division
                      </span>
                      <h3 style={{ fontSize: "28px", fontWeight: "800", color: "#ffffff", fontFamily: "var(--font-heading)", marginBottom: "12px", lineHeight: "1.2" }}>
                        Madan Printers & Copy Center
                      </h3>
                      <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.9)", lineHeight: "1.6", marginBottom: "24px" }}>
                        Save hours of lab preparation! We offer lightning-fast, high-resolution document printing, colored science diagrams, spiral binder compilations, and submission-ready IGNOU project folders with self-pickup.
                      </p>
                      
                      <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                        <a 
                          href="https://printers.madanprojects.com" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          style={{ 
                            backgroundColor: "var(--blinkit-yellow)",
                            color: "var(--text-main)",
                            padding: "12px 24px",
                            borderRadius: "var(--radius-md)",
                            textDecoration: "none",
                            fontWeight: "800",
                            fontSize: "14px",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            boxShadow: "0 4px 14px rgba(245, 187, 27, 0.4)",
                            transition: "transform 0.15s ease"
                          }}
                        >
                          <span>Go to printers.madanprojects.com</span> ➔
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Estimation Tool & Printing Specs Split */}
                  <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "24px", alignItems: "stretch" }} className="print-split-section">
                    
                    {/* Left Panel: Cost Estimator */}
                    <div style={{ 
                      backgroundColor: "#ffffff", 
                      border: "1px solid var(--border-color)", 
                      borderRadius: "12px", 
                      padding: "24px",
                      boxShadow: "var(--shadow-sm)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "18px"
                    }}>
                      <div style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "10px" }}>
                        <h4 style={{ fontSize: "16.5px", fontWeight: "800", color: "var(--text-main)" }}>
                          🖨️ Instant Print Cost Calculator
                        </h4>
                        <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>Customize your practical sheets and binder requirements below</p>
                      </div>

                      {/* Control 1: Pages */}
                      <div className="form-group">
                        <label className="form-label" style={{ display: "flex", justifyContent: "space-between" }}>
                          <span>Number of Pages</span>
                          <span style={{ color: "var(--blinkit-green)", fontWeight: "700" }}>{calcPages} Pages</span>
                        </label>
                        <input 
                          type="range" 
                          min="5" 
                          max="500" 
                          step="5"
                          value={calcPages}
                          onChange={(e) => setCalcPages(e.target.value)}
                          style={{ 
                            accentColor: "var(--blinkit-green)", 
                            width: "100%", 
                            cursor: "pointer", 
                            height: "6px",
                            borderRadius: "3px" 
                          }}
                        />
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "var(--text-light)", marginTop: "2px" }}>
                          <span>5 Pages</span>
                          <span>250 Pages</span>
                          <span>500 Pages</span>
                        </div>
                      </div>

                      {/* Control 2: Color / BW */}
                      <div className="form-group">
                        <label className="form-label">Print Type</label>
                        <div style={{ display: "flex", gap: "10px" }}>
                          <button 
                            style={{
                              flex: 1,
                              padding: "10px",
                              borderRadius: "8px",
                              border: calcPrintType === "bw" ? "2px solid var(--blinkit-green)" : "1px solid var(--border-color)",
                              backgroundColor: calcPrintType === "bw" ? "var(--blinkit-green-soft)" : "#ffffff",
                              color: calcPrintType === "bw" ? "var(--blinkit-green)" : "var(--text-muted)",
                              fontWeight: "700",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "6px",
                              fontSize: "13px"
                            }}
                            onClick={() => setCalcPrintType("bw")}
                          >
                            <span>⚫ Black & White</span>
                            <span style={{ fontSize: "10px", opacity: 0.8 }}>(₹1/pg)</span>
                          </button>
                          
                          <button 
                            style={{
                              flex: 1,
                              padding: "10px",
                              borderRadius: "8px",
                              border: calcPrintType === "color" ? "2px solid var(--blinkit-green)" : "1px solid var(--border-color)",
                              backgroundColor: calcPrintType === "color" ? "var(--blinkit-green-soft)" : "#ffffff",
                              color: calcPrintType === "color" ? "var(--blinkit-green)" : "var(--text-muted)",
                              fontWeight: "700",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "6px",
                              fontSize: "13px"
                            }}
                            onClick={() => setCalcPrintType("color")}
                          >
                            <span>🌈 Full Color</span>
                            <span style={{ fontSize: "10px", opacity: 0.8 }}>(₹5/pg)</span>
                          </button>
                        </div>
                      </div>

                      {/* Control 3: Binding type */}
                      <div className="form-group">
                        <label className="form-label">Binding Preference</label>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px" }}>
                          {[
                            { id: "none", name: "No Binding", desc: "Loose Pages", price: "₹0" },
                            { id: "spiral", name: "Spiral Binding", desc: "Plastic Comb", price: "+₹20" },
                            { id: "soft", name: "Soft Book Binding", desc: "Glue Bound", price: "+₹50" },
                            { id: "hard", name: "Hard Bound Golden", desc: "Thesis Style", price: "+₹150" }
                          ].map((item) => (
                            <button
                              key={item.id}
                              style={{
                                padding: "8px 10px",
                                borderRadius: "8px",
                                border: calcBinding === item.id ? "2px solid var(--blinkit-green)" : "1px solid var(--border-color)",
                                backgroundColor: calcBinding === item.id ? "var(--blinkit-green-soft)" : "#ffffff",
                                color: calcBinding === item.id ? "var(--blinkit-green)" : "var(--text-main)",
                                textAlign: "left",
                                cursor: "pointer",
                                transition: "all 0.1s ease"
                              }}
                              onClick={() => setCalcBinding(item.id)}
                            >
                              <div style={{ fontSize: "12.5px", fontWeight: "700" }}>{item.name}</div>
                              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "var(--text-muted)", marginTop: "2px" }}>
                                <span>{item.desc}</span>
                                <span style={{ fontWeight: "700", color: "var(--blinkit-green)" }}>{item.price}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Control 4: Lamination Checkbox */}
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", backgroundColor: "#f9fafb", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--border-color)", cursor: "pointer" }} onClick={() => setCalcLamination(!calcLamination)}>
                        <input 
                          type="checkbox" 
                          checked={calcLamination}
                          onChange={() => {}} // handled by div click
                          style={{ accentColor: "var(--blinkit-green)", cursor: "pointer", width: "16px", height: "16px" }}
                        />
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <span style={{ fontSize: "12.5px", fontWeight: "700" }}>Add Front Cover Lamination (+₹15)</span>
                          <span style={{ fontSize: "10px", color: "var(--text-muted)" }}>Protects cover page from dust, water and tears</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Panel: Estimated Bill & Link */}
                    <div style={{ 
                      backgroundColor: "#fcfcfd", 
                      border: "2px dashed #e8e8e8", 
                      borderRadius: "12px", 
                      padding: "24px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      gap: "20px"
                    }}>
                      <div>
                        <h4 style={{ fontSize: "11px", fontWeight: "800", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "14px", letterSpacing: "0.5px" }}>
                          Estimated Invoice
                        </h4>
                        
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13.5px" }}>
                            <span style={{ color: "var(--text-muted)" }}>
                              {calcPages} pages × {calcPrintType === "bw" ? "₹1 (B&W)" : "₹5 (Color)"}
                            </span>
                            <span style={{ fontWeight: "600" }}>₹{calcPages * (calcPrintType === "bw" ? 1 : 5)}</span>
                          </div>

                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13.5px" }}>
                            <span style={{ color: "var(--text-muted)" }}>
                              Binding ({calcBinding === "none" ? "None" : calcBinding === "spiral" ? "Spiral" : calcBinding === "soft" ? "Soft Cover" : "Hard Bound"})
                            </span>
                            <span style={{ fontWeight: "600" }}>
                              ₹{calcBinding === "none" ? 0 : calcBinding === "spiral" ? 20 : calcBinding === "soft" ? 50 : 150}
                            </span>
                          </div>

                          {calcLamination && (
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13.5px" }}>
                              <span style={{ color: "var(--text-muted)" }}>Front Cover Lamination</span>
                              <span style={{ fontWeight: "600" }}>₹15</span>
                            </div>
                          )}

                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13.5px" }}>
                            <span style={{ color: "var(--text-muted)" }}>Self-Pickup Handling</span>
                            <span style={{ fontWeight: "700", color: "var(--blinkit-green)" }}>FREE</span>
                          </div>
                        </div>

                        <div style={{ borderTop: "2px solid #eaeaea", marginTop: "16px", paddingTop: "14px", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                          <span style={{ fontSize: "16px", fontWeight: "800", color: "var(--text-main)" }}>Estimated Total:</span>
                          <span style={{ fontSize: "28px", fontWeight: "900", color: "var(--blinkit-green)" }}>₹{estimatedPrintCost}</span>
                        </div>
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <a 
                          href={`https://printers.madanprojects.com?pages=${calcPages}&type=${calcPrintType}&binding=${calcBinding}&lamination=${calcLamination ? 1 : 0}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="checkout-action-btn"
                          style={{ padding: "14px 20px", textDecoration: "none", gap: "10px", fontSize: "15px", fontWeight: "700", textAlign: "center", justifyContent: "center" }}
                        >
                          <span>Order on Madan Printers</span> ➔
                        </a>
                        <span style={{ fontSize: "10.5px", color: "var(--text-light)", textAlign: "center" }}>
                          You will be redirected to the secure files upload system at Madan Printers.
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* 3 Step Ordering Pipeline */}
                  <div style={{ backgroundColor: "var(--blinkit-green-soft)", padding: "24px", borderRadius: "12px", border: "1px solid rgba(10, 100, 102, 0.1)" }}>
                    <h4 style={{ fontSize: "16px", fontWeight: "800", textAlign: "center", marginBottom: "18px", color: "var(--blinkit-green)" }}>
                      Simple 3-Step Online Print Order
                    </h4>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
                      <div style={{ display: "flex", gap: "12px" }}>
                        <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "var(--blinkit-green)", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", flexShrink: 0 }}>1</div>
                        <div>
                          <h5 style={{ fontSize: "13.5px", fontWeight: "700", marginBottom: "3px" }}>Upload Files</h5>
                          <p style={{ fontSize: "11.5px", color: "var(--text-muted)", lineHeight: "1.4" }}>Click the button to access our portal and upload PDF, Word or Image files.</p>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: "12px" }}>
                        <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "var(--blinkit-green)", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", flexShrink: 0 }}>2</div>
                        <div>
                          <h5 style={{ fontSize: "13.5px", fontWeight: "700", marginBottom: "3px" }}>Customize Options</h5>
                          <p style={{ fontSize: "11.5px", color: "var(--text-muted)", lineHeight: "1.4" }}>Choose colored figures, spiral pages size, or heavy-duty book binding covers.</p>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: "12px" }}>
                        <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "var(--blinkit-green)", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", flexShrink: 0 }}>3</div>
                        <div>
                          <h5 style={{ fontSize: "13.5px", fontWeight: "700", marginBottom: "3px" }}>Self-Pickup</h5>
                          <p style={{ fontSize: "11.5px", color: "var(--text-muted)", lineHeight: "1.4" }}>Pay online & pick up at our Sector 7 shop in Gurugram, ready in 30 minutes!</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Printing Services Grid */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
                    <div style={{ backgroundColor: "#ffffff", border: "1px solid var(--border-color)", borderRadius: "10px", padding: "16px", display: "flex", flexDirection: "column", gap: "6px" }}>
                      <span style={{ fontSize: "24px" }}>📄</span>
                      <h4 style={{ fontSize: "14.5px", fontWeight: "700" }}>Color & B/W Prints</h4>
                      <p style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: "1.4" }}>High-resolution laser printing for school reports, curriculum guides, and layouts.</p>
                      <span style={{ fontSize: "12px", fontWeight: "700", color: "var(--blinkit-green)", marginTop: "auto" }}>B/W at ₹1 • Color at ₹5</span>
                    </div>

                    <div style={{ backgroundColor: "#ffffff", border: "1px solid var(--border-color)", borderRadius: "10px", padding: "16px", display: "flex", flexDirection: "column", gap: "6px" }}>
                      <span style={{ fontSize: "24px" }}>📔</span>
                      <h4 style={{ fontSize: "14.5px", fontWeight: "700" }}>Spiral & Hard Binding</h4>
                      <p style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: "1.4" }}>Professional thesis bindings, practical file assemblies, and spiral bindings with transparent covers.</p>
                      <span style={{ fontSize: "12px", fontWeight: "700", color: "var(--blinkit-green)", marginTop: "auto" }}>Starts at ₹20 per book</span>
                    </div>

                    <div style={{ backgroundColor: "#ffffff", border: "1px solid var(--border-color)", borderRadius: "10px", padding: "16px", display: "flex", flexDirection: "column", gap: "6px" }}>
                      <span style={{ fontSize: "24px" }}>📊</span>
                      <h4 style={{ fontSize: "14.5px", fontWeight: "700" }}>Custom Chart Printing</h4>
                      <p style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: "1.4" }}>Bespoke large format academic charts, school maps, and diagrams custom printed and laminated.</p>
                      <span style={{ fontSize: "12px", fontWeight: "700", color: "var(--blinkit-green)", marginTop: "auto" }}>Available in all sizes (A4-A0)</span>
                    </div>

                    <div style={{ backgroundColor: "#ffffff", border: "1px solid var(--border-color)", borderRadius: "10px", padding: "16px", display: "flex", flexDirection: "column", gap: "6px" }}>
                      <span style={{ fontSize: "24px" }}>✍️</span>
                      <h4 style={{ fontSize: "14.5px", fontWeight: "700" }}>IGNOU Assignments</h4>
                      <p style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: "1.4" }}>Specialized print packages for IGNOU practical reports, homework submissions, and spiral bindings.</p>
                      <span style={{ fontSize: "12px", fontWeight: "700", color: "var(--blinkit-green)", marginTop: "auto" }}>100% Submission Ready</span>
                    </div>
                  </div>
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="products-grid">
                  {/* Prepend Digital Prints Promo Card for all other categories */}
                  {activeCategory !== "printers" && (
                    <a 
                      href="https://printers.madanprojects.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="product-card printers-promo-ad-card animate-pulse-border"
                      style={{ textDecoration: "none" }}
                    >
                      <div className="product-discount-tag" style={{ backgroundColor: "var(--blinkit-yellow)", color: "var(--text-main)", fontWeight: "800" }}>₹1 / PG</div>
                      <div className="product-image-container" style={{ fontSize: "32px", background: "linear-gradient(135deg, var(--blinkit-green-soft) 0%, #e2efef 100%)", height: "120px" }}>
                        🖨️
                      </div>
                      <div className="product-info" style={{ justifyContent: "space-between", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                        <div>
                          <span className="product-unit" style={{ color: "var(--blinkit-green)", fontWeight: "800", fontSize: "10.5px" }}>Madan Printers Division</span>
                          <h3 className="product-name" style={{ color: "var(--text-main)", fontSize: "13.5px", fontWeight: "700", marginTop: "2px" }}>Document Printing & Spiral Book Binding</h3>
                          <p style={{ fontSize: "11px", color: "var(--text-muted)", lineHeight: "1.35", margin: "4px 0 8px 0" }}>
                            Need printouts for practical files? Get high-quality laser prints & spiral binding instantly.
                          </p>
                        </div>
                        <div className="product-footer" style={{ borderTop: "1px dashed var(--border-color)", paddingTop: "8px", marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: "13px", fontWeight: "800", color: "#1a1a1a" }}>B/W: ₹1 • Color: ₹5</span>
                          <span style={{ 
                            backgroundColor: "var(--blinkit-green)", 
                            color: "#ffffff", 
                            fontSize: "11px", 
                            fontWeight: "800", 
                            padding: "6px 10px", 
                            borderRadius: "6px",
                            boxShadow: "0 1px 4px rgba(12, 131, 70, 0.25)"
                          }}>
                            ORDER ➔
                          </span>
                        </div>
                      </div>
                    </a>
                  )}

                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      cartQty={getProductCartQty(product.id)}
                      onAdd={handleAddToCart}
                      onRemove={handleRemoveFromCart}
                    />
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--text-muted)" }}>
                  <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
                  <h3 style={{ fontSize: "16px", color: "var(--text-main)", marginBottom: "8px" }}>No Products Found</h3>
                  <p style={{ fontSize: "13px" }}>Try searching for a different item or select another category from the sidebar.</p>
                </div>
              )}
            </main>
          </div>
        </>
      )}

      {currentView === "contact" && (
        <main className="content-area" style={{ height: "calc(100vh - 71px)", overflowY: "auto" }}>
          <ContactUs />
        </main>
      )}

      {currentView === "tracker" && activeOrder && (
        <main className="content-area" style={{ height: "calc(100vh - 71px)", overflowY: "auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <OrderTracker
            order={activeOrder}
            onBackToShop={() => {
              setActiveOrder(null);
              setCurrentView("shop");
            }}
          />
        </main>
      )}

      {/* Cart Slider Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onAdd={handleAddToCart}
        onRemove={handleRemoveFromCart}
        onClear={handleClearCart}
        cartTotal={cartTotal}
        cartCount={cartCount}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal Form */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        cartTotal={cartTotal}
        cartCount={cartCount}
        paymentMethod={paymentMethod}
        onOrderConfirm={handleOrderConfirm}
      />
    </>
  );
}
