// import React, { createContext, useState, useContext } from "react";

// const CartContext = createContext();

// export function CartProvider({ children }) {
//   const [cart, setCart] = useState([]);

//   const addToCart = (item) => {
//     setCart((prev) => {
//       const exist = prev.find((p) => p.id === item.id);
//       if (exist) {
//         return prev.map((p) =>
//           p.id === item.id ? { ...p, qty: p.qty + 1 } : p
//         );
//       }
//       return [...prev, { ...item, qty: 1 }];
//     });
//   };

//   const updateQty = (id, qty) =>
//     setCart((prev) => prev.map((p) => (p.id === id ? { ...p, qty } : p)));

//   const removeFromCart = (id) =>
//     setCart((prev) => prev.filter((p) => p.id !== id));

//   const clearCart = () => setCart([]);

//   return (
//     <CartContext.Provider
//       value={{ cart, addToCart, updateQty, removeFromCart, clearCart }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// export const useCart = () => useContext(CartContext);


import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  // Update token when user logs in/out
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token') || null);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Fetch cart for authenticated user
  useEffect(() => {
    if (token) {
      fetchCart();
    } else {
      // Load local cart for unauthenticated users
      const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCart(localCart);
    }
  }, [token]);

  const fetchCart = async () => {
    try {
      const response = await axios.get('/api/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (item) => {
    const cartId = `${item.id}-${item.selectedSize || 'default'}`;
    const itemWithCartId = { ...item, cartId };
    if (!token) {
      setCart((prev) => {
        const exist = prev.find((p) => p.cartId === cartId);
        let newCart;
        if (exist) {
          newCart = prev.map((p) =>
            p.cartId === cartId ? { ...p, qty: p.qty + 1 } : p
          );
        } else {
          newCart = [...prev, { ...itemWithCartId, qty: 1 }];
        }
        localStorage.setItem('cart', JSON.stringify(newCart));
        return newCart;
      });
      return;
    }
    try {
      const response = await axios.post('/api/cart', itemWithCartId, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(response.data);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const updateQty = async (cartId, qty) => {
    if (!token) {
      setCart((prev) => {
        const newCart = prev.map((p) => (p.cartId === cartId ? { ...p, qty } : p));
        localStorage.setItem('cart', JSON.stringify(newCart));
        return newCart;
      });
      return;
    }
    try {
      const response = await axios.put('/api/cart', { cartId, qty }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(response.data);
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const removeFromCart = async (cartId) => {
    if (!token) {
      setCart((prev) => {
        const newCart = prev.filter((p) => p.cartId !== cartId);
        localStorage.setItem('cart', JSON.stringify(newCart));
        return newCart;
      });
      return;
    }
    try {
      const response = await axios.delete(`/api/cart/${cartId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(response.data);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const clearCart = async () => {
    if (!token) {
      setCart([]);
      localStorage.setItem('cart', '[]');
      return;
    }
    try {
      await axios.delete('/api/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  // Sync local cart to backend on login
  const syncLocalCart = async () => {
    if (token) {
      const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
      if (localCart.length > 0) {
        for (const item of localCart) {
          await addToCart(item);
        }
        localStorage.setItem('cart', '[]');
      }
    }
  };

  useEffect(() => {
    if (token) {
      syncLocalCart();
    }
  }, [token]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQty, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

