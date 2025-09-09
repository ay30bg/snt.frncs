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

// src/context/CartContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(null); // Set after login

  // Axios config with JWT token
  const getAxiosConfig = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });

  // Fetch cart when userId changes
  useEffect(() => {
    if (userId) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/cart/${userId}`, getAxiosConfig())
        .then((response) => {
          setCart(response.data);
        })
        .catch((error) => console.error('Error fetching cart:', error));
    } else {
      // Load from localStorage for guests
      const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCart(localCart);
    }
  }, [userId]);

  // Sync local cart to server when user logs in
  useEffect(() => {
    if (userId && localStorage.getItem('cart')) {
      const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
      localCart.forEach(async (item) => {
        try {
          await axios.post(
            `${process.env.REACT_APP_API_URL}/api/cart`,
            {
              userId,
              id: item.id,
              name: item.name,
              price: item.price,
              qty: item.qty,
              image: item.image,
              selectedSize: item.selectedSize,
            },
            getAxiosConfig()
          );
        } catch (error) {
          console.error('Error syncing cart:', error);
        }
      });
      localStorage.removeItem('cart');
      // Refresh cart from server
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/cart/${userId}`, getAxiosConfig())
        .then((response) => setCart(response.data))
        .catch((error) => console.error('Error refreshing cart:', error));
    }
  }, [userId]);

  // Add item to cart
  const addToCart = async (item) => {
    if (!userId) {
      // Store in localStorage for guests
      setCart((prev) => {
        const exist = prev.find((p) => p.id === item.id);
        if (exist) {
          const newCart = prev.map((p) =>
            p.id === item.id ? { ...p, qty: p.qty + 1 } : p
          );
          localStorage.setItem('cart', JSON.stringify(newCart));
          return newCart;
        }
        const newCart = [...prev, { ...item, qty: 1 }];
        localStorage.setItem('cart', JSON.stringify(newCart));
        return newCart;
      });
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/cart`,
        {
          userId,
          id: item.id,
          name: item.name,
          price: item.price,
          qty: 1,
          image: item.image,
          selectedSize: item.selectedSize,
        },
        getAxiosConfig()
      );
      setCart((prev) => {
        const exist = prev.find((p) => p.id === item.id);
        if (exist) {
          return prev.map((p) =>
            p.id === item.id ? { ...response.data } : p
          );
        }
        return [...prev, response.data];
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // Update quantity
  const updateQty = async (id, qty) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }

    if (userId) {
      try {
        const cartItem = cart.find((p) => p.id === id);
        if (cartItem) {
          await axios.put(
            `${process.env.REACT_APP_API_URL}/api/cart/${cartItem._id}`,
            { qty },
            getAxiosConfig()
          );
        }
      } catch (error) {
        console.error('Error updating quantity:', error);
      }
    }

    setCart((prev) => {
      const newCart = prev.map((p) => (p.id === id ? { ...p, qty } : p));
      if (!userId) {
        localStorage.setItem('cart', JSON.stringify(newCart));
      }
      return newCart;
    });
  };

  // Remove item from cart
  const removeFromCart = async (id) => {
    if (userId) {
      try {
        const cartItem = cart.find((p) => p.id === id);
        if (cartItem) {
          await axios.delete(
            `${process.env.REACT_APP_API_URL}/api/cart/${cartItem._id}`,
            getAxiosConfig()
          );
        }
      } catch (error) {
        console.error('Error removing item:', error);
      }
    }

    setCart((prev) => {
      const newCart = prev.filter((p) => p.id !== id);
      if (!userId) {
        localStorage.setItem('cart', JSON.stringify(newCart));
      }
      return newCart;
    });
  };

  // Clear cart
  const clearCart = async () => {
    if (userId) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_API_URL}/api/cart/user/${userId}`,
          getAxiosConfig()
        );
      } catch (error) {
        console.error('Error clearing cart:', error);
      }
    }
    setCart([]);
    if (!userId) {
      localStorage.setItem('cart', JSON.stringify([]));
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQty, removeFromCart, clearCart, setUserId }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
