// // src/pages/Home.jsx
// import React, { useState } from "react";
// import Hero from "../components/Hero";
// import ProductGrid from "../components/ProductGrid";
// import QuoteCarousel from "../components/QuoteCarousel";
// import QuickViewModal from "../components/QuickViewModal";
// import productsData from "../data/products";
// import "../styles/styles.css";

// export default function Home({ addToCart, addToWishlist }) {
//   const [quickView, setQuickView] = useState(null);

//   const filteredProducts = productsData.sort((a, b) => a.price - b.price);

//   return (
//     <>
//       <Hero />
//       <section id="products" className="products-section">
//         <ProductGrid
//           products={filteredProducts}
//           addToCart={addToCart}
//           addToWishlist={addToWishlist}
//           setQuickView={setQuickView}
//         />
//       </section>
//       <QuoteCarousel />

//       {quickView && (
//         <QuickViewModal
//           product={quickView}
//           onClose={() => setQuickView(null)}
//           addToCart={addToCart}
//         />
//       )}
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";
import QuoteCarousel from "../components/QuoteCarousel";
import QuickViewModal from "../components/QuickViewModal";
import "../styles/styles.css";

export default function Home({ addToCart, addToWishlist }) {
  const [products, setProducts] = useState([]);
  const [quickView, setQuickView] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const baseUrl =
          process.env.REACT_APP_API_URL || "http://localhost:5000";

        const res = await fetch(`${baseUrl}/api/products`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        const sorted = data.sort((a, b) => a.price - b.price);
        setProducts(sorted);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Hero />

      <section id="products" className="products-section">
        {loading ? (
          <p className="loading-text">Loading products...</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : (
          <ProductGrid
            products={products}
            addToCart={addToCart}
            addToWishlist={addToWishlist}
            setQuickView={setQuickView}
          />
        )}
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
