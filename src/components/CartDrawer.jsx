import React from "react";
import { FaTimes, FaMinus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../App";

export default function CartDrawer({ open, setOpen }) {
  const { cart, updateQty, removeFromCart, clearCart } = useCart();
  const total = cart.reduce((a, c) => a + c.price * c.qty, 0);

  return (
    <div className={`cart-drawer ${open ? "open" : ""}`}>
      <div className="cart-header">
        <h2>Your Cart</h2>
        <button onClick={() => setOpen(false)}>
          <FaTimes />
        </button>
      </div>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul className="cart-items">
            {cart.map((item) => (
              <li key={item.cartId}>
                <img src={item.image ?? item.images?.[0]} alt={item.name} />

                <div>
                  <h4>
                    {item.name} {item.selectedSize ? `(Size: ${item.selectedSize})` : ""} × {item.qty}
                  </h4>
                  <p>₦{item.price}</p>
                  <input
                    type="number"
                    value={item.qty}
                    onChange={(e) => updateQty(item.cartId, +e.target.value)} // 👈 use cartId
                  />
                </div>
                <button onClick={() => removeFromCart(item.cartId)}>
                  <FaMinus />
                </button>
              </li>
            ))}
          </ul>

          <div className="cart-footer">
            <p>Total: ₦{total.toFixed(2)}</p>
            <button onClick={clearCart}>Clear Cart</button>
            <Link to="/checkout" className="checkout-btn" onClick={() => setOpen(false)}>
              Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
