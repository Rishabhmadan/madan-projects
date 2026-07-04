import React from "react";

export default function ProductCard({ product, cartQty, onAdd, onRemove }) {
  const { id, name, price, originalPrice, unit, rating, reviewsCount, image, inStock } = product;

  // Calculate discount percentage
  const discount = Math.round(((originalPrice - price) / originalPrice) * 100);

  return (
    <div className="product-card">

      {discount > 0 && (
        <span className="product-discount-tag">{discount}% OFF</span>
      )}
      
      <div className="product-image-container">
        {typeof image === "string" && (image.startsWith("/") || image.startsWith("http")) ? (
          <img src={image.startsWith("/") ? `${import.meta.env.BASE_URL || '/'}${image.substring(1)}` : image} alt={name} style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "var(--radius-sm)" }} />
        ) : (
          image
        )}
      </div>

      <div className="product-info">
        <span className="product-unit">{unit}</span>
        <h3 className="product-name" title={name}>{name}</h3>
        
        <div className="product-rating">
          <span className="product-rating-star">★</span>
          <span>{rating} ({reviewsCount})</span>
        </div>

        <div className="product-footer">
          <div className="product-price-section">
            <span className="product-price">₹{price}</span>
            {originalPrice > price && (
              <span className="product-original-price">₹{originalPrice}</span>
            )}
          </div>

          <div className="add-btn-wrapper">
            {cartQty === 0 ? (
              <button 
                className="add-btn-empty" 
                onClick={(e) => {
                  e.stopPropagation();
                  onAdd(product);
                }}
                disabled={!inStock}
              >
                {inStock ? "ADD" : "OUT OF STOCK"}
              </button>
            ) : (
              <div className="add-btn-filled" onClick={(e) => e.stopPropagation()}>
                <button 
                  className="add-btn-control" 
                  onClick={() => onRemove(product.id)}
                >
                  -
                </button>
                <span className="add-btn-qty">{cartQty}</span>
                <button 
                  className="add-btn-control" 
                  onClick={() => onAdd(product)}
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
