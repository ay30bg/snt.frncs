import React, { useState, useEffect } from "react";
import { FiX, FiHeart, FiAlertTriangle } from "react-icons/fi";

export default function QuickViewModal({
  product,
  onClose,
  addToCart,
  addToWishlist,
  relatedProducts = []
}) {
  const hasVariations = product.variations && product.variations.length > 0;

  // Default image handling (variations or images)
  const [selectedVariation, setSelectedVariation] = useState(
    hasVariations ? product.variations[0] : null
  );
  const [selectedImage, setSelectedImage] = useState(
    hasVariations
      ? product.variations[0].image
      : product.images
      ? product.images[0]
      : product.image
  );

  const [quantity, setQuantity] = useState(1);
  const [loadingId, setLoadingId] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  // Close modal on ESC key
  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleAddToCart = (p, qty) => {
    setLoadingId(p.id);
    setTimeout(() => {
      addToCart(
        {
          ...p,
          selectedSize,
          selectedVariation,
          cartId: `${p.id}-${selectedSize || "default"}-${
            selectedVariation ? selectedVariation.color : "default"
          }`
        },
        qty
      );
      setLoadingId(null);
    }, 1200);
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal">
        {/* Close Button */}
        <button className="close-btn" onClick={onClose}>
          <FiX />
        </button>

        <div className="product-images">
          <div
            className="zoom-container"
            onMouseMove={(e) => {
              const { left, top, width, height } =
                e.currentTarget.getBoundingClientRect();
              const x = ((e.clientX - left) / width) * 100;
              const y = ((e.clientY - top) / height) * 100;
              e.currentTarget.style.setProperty("--x", `${x}%`);
              e.currentTarget.style.setProperty("--y", `${y}%`);
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.setProperty("--x", "center");
              e.currentTarget.style.setProperty("--y", "center");
            }}
          >
            <img
              src={selectedImage}
              alt={product.name}
              className="main-image zoom-image"
            />
          </div>

          {!hasVariations && product.images && (
            <div className="thumbnails">
              {product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  onClick={() => setSelectedImage(img)}
                  className={selectedImage === img ? "active" : ""}
                />
              ))}
            </div>
          )}
        </div>

        <div className="product-info">
          <h2>{product.name}</h2>

          <p className="price-section">
            {product.oldPrice && (
              <span className="old-price">₦{product.oldPrice}</span>
            )}
            <span className="price">₦{product.price}</span>
            {product.discount && (
              <span className="badge">-{product.discount}%</span>
            )}
          </p>

          {/* Stock info */}
          <p>
            {hasVariations
              ? `${selectedVariation.inStock} in stock`
              : product.inStock
              ? "In Stock"
              : "Out of Stock"}
          </p>

          {product.description && (
            <p className="product-info-description">{product.description}</p>
          )}

          {/* Variation Selector (ASOS style color swatches) */}
          {hasVariations && (
            <div className="variation-selector">
              <p>Choose Color:</p>
              <div className="variations">
                {product.variations.map((variation, idx) => (
                  <button
                    key={idx}
                    className={`variation-btn ${
                      selectedVariation?.color === variation.color ? "active" : ""
                    }`}
                    onClick={() => {
                      setSelectedVariation(variation);
                      setSelectedImage(variation.image);
                    }}
                  >
                    {/* Show swatch if available, else text */}
                    <span
                      className="color-swatch"
                      style={{
                        backgroundImage: `url(${variation.image})`,
                        backgroundSize: "cover"
                      }}
                      title={variation.color}
                    ></span>
                    <span>{variation.color}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="size-selector">
              <p>Choose Size:</p>
              <div className="sizes">
                {product.sizes.map((size, idx) => (
                  <button
                    key={idx}
                    className={`size-btn ${
                      selectedSize === size ? "active" : ""
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <p className="size-helper">
                  <FiAlertTriangle className="inline-icon" /> Please select a
                  size before adding to cart
                </p>
              )}
            </div>
          )}

          {/* Quantity Selector */}
          <div className="quantity-selector">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
              -
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>

          {/* Action Buttons */}
          <div className="actions">
            <button
              onClick={() => handleAddToCart(product, quantity)}
              disabled={
                (!hasVariations && !product.inStock) ||
                (product.sizes && !selectedSize) ||
                (hasVariations && selectedVariation.inStock <= 0) ||
                loadingId === product.id
              }
            >
              {loadingId === product.id ? (
                <span className="spinner"></span>
              ) : (
                "Add to Cart"
              )}
            </button>

            {addToWishlist && (
              <button onClick={() => addToWishlist(product)}>
                <FiHeart /> Add to Wishlist
              </button>
            )}

            <button
              onClick={() =>
                navigator.share
                  ? navigator.share({
                      title: product.name,
                      url: window.location.href
                    })
                  : alert("Share not supported")
              }
            >
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
