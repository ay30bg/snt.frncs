// src/pages/Home.jsx
import React, { useState } from "react";
import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";
import QuoteCarousel from "../components/QuoteCarousel";
import QuickViewModal from "../components/QuickViewModal";
import productsData from "../data/products";
import "../styles/styles.css";

export default function Home({ addToCart, addToWishlist }) {
  const [quickView, setQuickView] = useState(null);

  const filteredProducts = productsData.sort((a, b) => a.price - b.price);

  return (
    <>
      <Hero />
      <section id="products" className="products-section">
        <ProductGrid
          products={filteredProducts}
          addToCart={addToCart}
          addToWishlist={addToWishlist}
          setQuickView={setQuickView}
        />
      </section>
      <QuoteCarousel />

      {quickView && (
        <QuickViewModal
          product={quickView}
          onClose={() => setQuickView(null)}
          addToCart={addToCart}
        />
      )}
    </>
  );
}
