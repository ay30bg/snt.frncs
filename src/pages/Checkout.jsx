import React from "react";
import { useCart } from "../App";
import { useNavigate } from "react-router-dom";
import "../styles/checkout.css";

export default function CheckoutPage() {
  const { cart } = useCart();
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shipping = cart.length > 0 ? 10000 : 0;
  const total = subtotal + shipping;

  const handleContinueToShipping = () => {
    // ✅ Pass cart and total to ShippingPage
    navigate("/shipping", { state: { cart, total } });
  };

  return (
    <div className="order-summary-container">
      <div className="order-summary">
        <h2>Order Summary</h2>

        <div className="summary-items">
          {cart.map((item) => (
            <div key={item.cartId || item.id} className="summary-item">
              <img src={item.image ?? item.images?.[0]} alt={item.name} />
              <div>
                <p className="item-name">
                  {item.name}{" "}
                  {item.selectedSize && (
                    <span className="item-size">(Size: {item.selectedSize})</span>
                  )}
                </p>
                <p className="item-price">
                  {item.qty} × ₦{item.price.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="summary-totals">
          <p>Subtotal <span>₦{subtotal.toLocaleString()}</span></p>
          <p>Shipping <span>₦{shipping.toLocaleString()}</span></p>
          <p className="summary-total">Total <span>₦{total.toLocaleString()}</span></p>
        </div>

        <button className="place-order-btn" onClick={handleContinueToShipping}>
          Continue to Shipping
        </button>
      </div>
    </div>
  );
}



