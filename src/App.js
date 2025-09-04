// src/App.jsx
import React, { useState, useEffect, createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";
import CheckoutPage from "./pages/Checkout";
import AuthPage from "./pages/AuthPage";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Wishlist from "./pages/Wishlist";
import ShippingPage from "./pages/Shipping";
import ConfirmationPage from "./pages/Confirmation";
import SearchPage from "./pages/Search";
import "./styles/styles.css";

// ---- Cart Context ----
const CartContext = createContext();
export const useCart = () => useContext(CartContext);

// ---- Wishlist Context ----
const WishlistContext = createContext();
export const useWishlist = () => useContext(WishlistContext);

// ---- Auth Context ----
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default function App() {
  // 🛒 CART STATE
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });
  const [cartOpen, setCartOpen] = useState(false);

  // ❤️ WISHLIST STATE
  const [wishlist, setWishlist] = useState(() => {
    const stored = localStorage.getItem("wishlist");
    return stored ? JSON.parse(stored) : [];
  });

  // ---- Persist Cart & Wishlist ----
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // ---- Cart Functions ----
  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const cartId =
        product.cartId || `${product.id}-${product.selectedSize || "default"}`;

      const exists = prev.find((item) => item.cartId === cartId);

      if (exists) {
        return prev.map((item) =>
          item.cartId === cartId ? { ...item, qty: item.qty + qty } : item
        );
      } else {
        return [...prev, { ...product, qty, cartId }];
      }
    });
  };

  const removeFromCart = (cartId) =>
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));

  const updateQty = (cartId, qty) =>
    setCart((prev) =>
      prev.map((item) =>
        item.cartId === cartId ? { ...item, qty: Math.max(1, qty) } : item
      )
    );

  const clearCart = () => setCart([]);

  // ---- Wishlist Functions ----
  const addToWishlist = (product) => {
    setWishlist((prev) => {
      if (prev.find((item) => item.id === product.id)) {
        return prev; // prevent duplicates
      }
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id) =>
    setWishlist((prev) => prev.filter((item) => item.id !== id));

  const clearWishlist = () => setWishlist([]);

  const cartValue = { cart, addToCart, removeFromCart, updateQty, clearCart };
  const wishlistValue = { wishlist, addToWishlist, removeFromWishlist, clearWishlist };

  return (
    <AuthProvider>
      <CartContext.Provider value={cartValue}>
        <WishlistContext.Provider value={wishlistValue}>
          <Router>
            <div className="app">
              <Navbar
                cartCount={cart.length}
                wishlistCount={wishlist.length}
                onCartToggle={() => setCartOpen(true)}
              />

              <Routes>
                <Route path="/" element={<Home addToCart={addToCart} addToWishlist={addToWishlist} />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/shipping" element={<ShippingPage />} />
                <Route path="/confirmation" element={<ConfirmationPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/wishlist" element={<Wishlist addToCart={addToCart} />} /> 
                <Route path="/search" element={<SearchPage addToCart={addToCart} />} />
              </Routes>

              <CartDrawer open={cartOpen} setOpen={setCartOpen} />
              <Footer />
            </div>
          </Router>
        </WishlistContext.Provider>
      </CartContext.Provider>
    </AuthProvider>
  );
}
