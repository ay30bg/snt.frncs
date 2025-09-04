import React from "react";
import { useWishlist } from "../App";
import WishlistGrid from "../components/WishlistGrid";
import "../styles/wishlist.css";

export default function Wishlist({ addToCart }) {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-page">
        <h2>Your Wishlist</h2>
        <p>No items saved yet. Click the heart on products to add them.</p>
         <a href="/" className="return-btn">Return to Shop</a>
      </div>
    );
  }

  return (
    <div className="wishlist">
      <div className="wishlist-header">
        <h2>My Wishlist</h2>
        <button onClick={clearWishlist} className="clear-btn">
          Clear All
        </button>
      </div>

      <WishlistGrid
        wishlist={wishlist}
        removeFromWishlist={removeFromWishlist}
        addToCart={addToCart}
      />
    </div>
  );
}
