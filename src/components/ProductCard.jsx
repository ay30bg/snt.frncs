import React, { useState } from "react";
import { FaShoppingCart, FaHeart, FaEye } from "react-icons/fa";

export default function ProductCard({ product, addToCart, addToWishlist, setQuickView }) {
  const [loadingCart, setLoadingCart] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [quickViewLoading, setQuickViewLoading] = useState(false);
  const [hoverImage, setHoverImage] = useState(
    product.images ? product.images[0] : product.image
  );

  const handleAddToCart = () => {
    setLoadingCart(true);
    addToCart(product);
    setTimeout(() => setLoadingCart(false), 1000);
  };

  const handleAddToWishlist = () => {
    setWishlistLoading(true);
    addToWishlist(product);
    setTimeout(() => setWishlistLoading(false), 1000);
  };

  const handleImageClick = () => {
    setQuickViewLoading(true);
    setTimeout(() => {
      setQuickView(product);
      setQuickViewLoading(false);
    }, 1000);
  };

  return (
    <div className="product-card">
      <div
        className="image-wrapper"
        style={{ position: "relative" }}
        onMouseEnter={() => {
          if (product.images && product.images.length > 1) {
            setHoverImage(product.images[1]); // show 2nd image on hover
          }
        }}
        onMouseLeave={() => {
          if (product.images && product.images.length > 0) {
            setHoverImage(product.images[0]); // revert back to 1st image
          } else {
            setHoverImage(product.image);
          }
        }}
      >
        {hoverImage ? (
          <img
            src={hoverImage}
            alt={product.name}
            className="product-img"
            loading="lazy"
          />
        ) : (
          <div className="skeleton" />
        )}

        {product.discount && (
          <span className="badge discount">-{product.discount}%</span>
        )}

        <button
          className="quick-view-btn"
          onClick={handleImageClick}
          disabled={quickViewLoading}
        >
          {quickViewLoading ? (
            <span className="quick-view-spinner"></span>
          ) : (
            <FaEye className="quick-view-icon" />
          )}
        </button>
      </div>

      <h3 className="product-name-header">{product.name}</h3>

      <p className="price">
        ₦{product.price - (product.discountAmount || 0)} 
        {product.discountAmount && (
          <span className="original-price">₦{product.price}</span>
        )}
      </p>

      {product.inStock > 0 ? (
        <p className={product.inStock < 5 ? "low-stock" : "in-stock"}>
          {product.inStock < 5 ? `Only ${product.inStock} left!` : "In Stock"}
        </p>
      ) : (
        <p className="out-of-stock">Out of Stock</p>
      )}

      <div className="actions">
        {/* Cart button */}
        <button
          onClick={handleAddToCart}
          disabled={loadingCart || product.inStock === 0}
          className={`cart-btn ${loadingCart ? "loading" : ""}`}
        >
          {loadingCart ? (
            <span className="spinner"></span>
          ) : (
            <FaShoppingCart className="add-cart-icon" />
          )}
        </button>

        {/* Wishlist button */}
        <button
          onClick={handleAddToWishlist}
          disabled={wishlistLoading}
          className={`wishlist-btn ${wishlistLoading ? "loading" : ""}`}
        >
          {wishlistLoading ? (
            <span className="wishlist-spinner"></span>
          ) : (
            <FaHeart />
          )}
        </button>
      </div>
    </div>
  );
}

