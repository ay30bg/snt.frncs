import React from "react";
import WishlistCard from "./WishlistCard";

export default function WishlistGrid({ wishlist, removeFromWishlist, addToCart }) {
  return (
    <div className="product-grid">
      {wishlist.length === 0 ? (
        <p>No items in your wishlist.</p>
      ) : (
        wishlist.map((item) => (
          <WishlistCard
            key={item.id}
            item={item}
            removeFromWishlist={removeFromWishlist}
            addToCart={addToCart}
          />
        ))
      )}
    </div>
  );
}
