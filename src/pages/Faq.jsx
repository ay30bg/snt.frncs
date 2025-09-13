import React, { useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";
import "../styles/faq.css";

const faqs = [
  {
    question: "What sizes do you offer?",
    answer:
      "We carry sizes ranging from XS to XXL. Some limited edition drops may vary — check the product page for size availability.",
  },
  {
    question: "Do you restock sold-out items?",
    answer:
      "Our streetwear pieces are mostly limited runs. Once it’s gone, it’s gone. Follow us on Instagram or sign up for our newsletter to stay updated on restocks.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Local orders usually arrive within 3-5 business days. International orders can take 7-14 business days depending on your location.",
  },
  {
    question: "What is your return policy?",
    answer:
      "You can return unworn items within 14 days of delivery. Items must be in original packaging with tags attached.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship worldwide. Shipping fees will be calculated at checkout.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order ships, you’ll receive a confirmation email with a tracking link to follow your package.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq">
      <div className="faq-container">
        <h1 className="faq-title">FAQ</h1>
        <p className="faq-subtitle">Got questions? We’ve got the answers.</p>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${activeIndex === index ? "active" : ""}`}
            >
              <div
                className="faq-header"
                onClick={() => toggleFAQ(index)}
              >
                <span className="faq-question">{faq.question}</span>
                <span className="faq-icon">
                  {activeIndex === index ? <FiX /> : <FiPlus />}
                </span>
              </div>
              <div className="faq-answer">{faq.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
