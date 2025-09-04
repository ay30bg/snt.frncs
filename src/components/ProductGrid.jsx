import React from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products, addToCart, setQuickView, addToWishlist }) {
  return (
    <div className="product-grid">
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
            addToWishlist={addToWishlist}
            setQuickView={setQuickView}
          />
        ))
      )}
    </div>
  );
}
