import React from "react";
import "../styles/aboutUs.css";

export default function About() {
  return (
    <section className="about">
      <div className="about-container">
        <h1 className="about-title">𝗦𝗡𝗧 𝗙𝗥𝗡𝗖𝗦: Streetwear With Soul</h1>
        <p className="about-intro">
          𝗦𝗡𝗧 𝗙𝗥𝗡𝗖𝗦 isn’t just fashion, it’s purpose stitched into every fit.
          Inspired by Saint Francis, the original rebel for love and charity,
          we’re building streetwear that speaks louder than hype.
        </p>

        <div className="about-section">
          <h2>𝗧HE CLOTHES</h2>
          <p>
            Clean, simple, bold. Every tee, hoodie, and cap is built to last
            with quality fabrics, sharp fits, and everyday comfort, offering
            style that turns heads without trying too hard.
          </p>
        </div>

        <div className="about-section">
          <h2>𝗧HE MISSION</h2>
          <p>
            Every drop gives back. When you cop 𝗦𝗡𝗧 𝗙𝗥𝗡𝗖𝗦, you’re fueling
            shelters, feeding communities, and protecting the planet St. Francis
            cherished. This isn’t drip that just looks good, it does good.
          </p>
        </div>

        <div className="about-section">
          <h2>𝗧HE MOVEMENT</h2>
          <p>
            Rep 𝗦𝗡𝗧 𝗙𝗥𝗡𝗖𝗦 and carry a mission into the streets: love louder,
            give realer. One fit, one act, one heart at a time.
          </p>
        </div>

        <div className="about-cta">
          <p className="about-closing">
            𝗦𝗡𝗧 𝗙𝗥𝗡𝗖𝗦. Wear the love. Live the legacy.
          </p>
          <button className="shop-btn"><a href="/" className="shop-btn-link">Shop Now</a></button>
        </div>
      </div>
    </section>
  );
}
