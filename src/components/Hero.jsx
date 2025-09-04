import React from "react";

export default function Hero() {
  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Sacred style, Bold Faith</h1>
        <p>Shop the latest hoodies, tees, and caps</p>
        <button className="hero-btn" onClick={scrollToProducts}>
          SHOP NOW
        </button>
      </div>
    </section>
  );
}
