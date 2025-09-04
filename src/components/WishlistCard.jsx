import React, { useState } from "react";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import "../styles/wishlist.css"; 

export default function WishlistCard({ item, removeFromWishlist, addToCart }) {
  const [loadingCart, setLoadingCart] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [hoverImage, setHoverImage] = useState(
    item.images ? item.images[0] : item.image
  );

  const handleAddToCart = () => {
    setLoadingCart(true);
    addToCart(item);
    setTimeout(() => setLoadingCart(false), 1000);
  };

  const handleRemove = () => {
    setRemoving(true);
    setTimeout(() => {
      removeFromWishlist(item.id);
      setRemoving(false);
    }, 800);
  };

  return (
    <div className="product-card"> {/* 🔥 same class as ProductCard */}
      <div
        className="image-wrapper"
        onMouseEnter={() => {
          if (item.images && item.images.length > 1) {
            setHoverImage(item.images[1]);
          }
        }}
        onMouseLeave={() => {
          if (item.images && item.images.length > 0) {
            setHoverImage(item.images[0]);
          } else {
            setHoverImage(item.image);
          }
        }}
      >
        {hoverImage ? (
          <img
            src={hoverImage}
            alt={item.name}
            className="product-img"
            loading="lazy"
          />
        ) : (
          <div className="skeleton" />
        )}

        {item.discount && (
          <span className="badge discount">-{item.discount}%</span>
        )}
      </div>

      <h3 className="product-name-header">{item.name}</h3>

      <p className="price">
        ₦{item.price - (item.discountAmount || 0)}
        {item.discountAmount && (
          <span className="original-price">₦{item.price}</span>
        )}
      </p>

      {item.inStock > 0 ? (
        <p className={item.inStock < 5 ? "low-stock" : "in-stock"}>
          {item.inStock < 5 ? `Only ${item.inStock} left!` : "In Stock"}
        </p>
      ) : (
        <p className="out-of-stock">Out of Stock</p>
      )}

      <div className="actions">
        {/* Remove from wishlist */}
        <button
          className={`remove-btn ${removing ? "loading" : ""}`}
          onClick={handleRemove}
          disabled={removing}
        >
          {removing ? <span className="spinner"></span> : <FaTrash />}
        </button>

        {/* Add to cart */}
        <button
          className={`cart-btn ${loadingCart ? "loading" : ""}`}
          onClick={handleAddToCart}
          disabled={loadingCart || item.inStock === 0}
        >
          {loadingCart ? <span className="spinner"></span> : <FaShoppingCart />}
        </button>
      </div>
    </div>
  );
}
