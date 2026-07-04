import React from "react";
import * as Icons from "lucide-react";

export default function Sidebar({ categories, activeCategory, onCategoryChange }) {
  // Safe helper to render Lucide icons dynamically
  const renderIcon = (iconName) => {
    const IconComponent = Icons[iconName];
    if (IconComponent) {
      return <IconComponent size={18} />;
    }
    return <Icons.HelpCircle size={18} />;
  };

  return (
    <aside className="sidebar">
      {categories.map((category) => (
        <div
          key={category.id}
          className={`category-item ${activeCategory === category.id ? "active" : ""} ${category.id === 'printers' ? 'sidebar-printers-item' : ''}`}
          onClick={() => onCategoryChange(category.id)}
        >
          <div className="category-icon-wrapper">
            {renderIcon(category.icon)}
          </div>
          <div className="category-details">
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span className="category-name">{category.name}</span>
              {category.id === "printers" && (
                <span className="sidebar-hot-badge">⚡ FAST</span>
              )}
            </div>
            <span className="category-desc" title={category.description}>
              {category.description}
            </span>
          </div>
        </div>
      ))}
    </aside>
  );
}
