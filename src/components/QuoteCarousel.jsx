import React, { useState, useEffect } from "react";
import logo from "../assets/snt-frncs-new-logo.png";

const quotes = [
  "All the darkness in the world cannot extinguish the light of a single candle.",
  "The only thing that matters is to love and to be loved in return.",
  "A single sunbeam is enough to drive away many shadows.",
  "True progress quietly and persistently moves along without notice.",
  "For it is in giving that we receive."
];

export default function QuoteCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 4000); // change quote every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel-container">
        <img src={logo} alt="logo" />
      <div className="quote">
        {quotes[currentIndex]}
      </div>
      <div className="dots">
        {quotes.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
    
  );
}
