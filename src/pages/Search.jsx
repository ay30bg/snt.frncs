// src/pages/SearchPage.jsx
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import productsData from "../data/products"; 
import ProductGrid from "../components/ProductGrid";
import QuickViewModal from "../components/QuickViewModal";
import "../styles/search.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchPage({ addToCart, addToWishlist }) {
  const query = useQuery();
  const searchTerm = query.get("q")?.toLowerCase() || "";
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Filter products
  const filteredProducts = productsData.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description?.toLowerCase().includes(searchTerm) ||
      product.category?.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="search-results">
      <h2>
        Search Results for:{" "}
        <span className="highlight">"{searchTerm}"</span>
      </h2>

      <ProductGrid
        products={filteredProducts}
        addToCart={addToCart}
        addToWishlist={addToWishlist}
        setQuickView={setQuickViewProduct}
      />

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          addToCart={addToCart}
          addToWishlist={addToWishlist}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
}
