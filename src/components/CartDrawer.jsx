// src/components/CartDrawer.jsx
import React from "react";
import { FiX, FiMinus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useCart } from "../App";

export default function CartDrawer({ open, setOpen }) {
  const { cart, updateQty, removeFromCart, clearCart } = useCart();
  const total = cart.reduce((a, c) => a + c.price * c.qty, 0);

  return (
    <>
      {/* Overlay */}
      {open && <div className="cart-overlay" onClick={() => setOpen(false)} />}

      <div className={`cart-drawer ${open ? "open" : ""}`}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button onClick={() => setOpen(false)}>
            <FiX />
          </button>
        </div>

        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty</p>
        ) : (
          <>
            <ul className="cart-items">
              {cart.map((item) => (
                <li key={item.cartId} className="cart-item">
                  {/* Item Image */}
                  <img
                    src={
                      item.image ??
                      item.selectedVariation?.image ??
                      item.images?.[0]
                    }
                    alt={item.name}
                  />

                  <div className="cart-item-info">
                    <h4>
                      {item.name}
                      {item.selectedVariation
                        ? ` (Color: ${item.selectedVariation.color})`
                        : ""}
                      {item.selectedSize ? ` (Size: ${item.selectedSize})` : ""}
                    </h4>

                    <p>₦{item.price}</p>

                    <div className="cart-item-qty">
                      <input
                        type="number"
                        min="1"
                        value={item.qty}
                        onChange={(e) =>
                          updateQty(item.cartId, +e.target.value)
                        }
                      />
                      <button onClick={() => removeFromCart(item.cartId)}>
                        <FiMinus />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Footer */}
            <div className="cart-footer">
              <p className="cart-total">Total: ₦{total.toFixed(2)}</p>
              <button className="clear-btn" onClick={clearCart}>
                Clear Cart
              </button>
              <Link
                to="/checkout"
                className="checkout-btn"
                onClick={() => setOpen(false)}
              >
                Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
