// // src/pages/Shipping.jsx
// import React, { useState, useEffect } from "react";
// import { useCart } from "../App";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../App";
// import "../styles/checkout.css";

// // Paystack Pop.js (Ensure this is included in your index.html or via npm)
// import PaystackPop from "@paystack/inline-js";

// export default function ShippingPage() {
//   const { clearCart } = useCart();
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const { cart: cartFromCheckout, total } = location.state || { cart: [], total: 0 };

//   const [loading, setLoading] = useState(false);
//   const [address, setAddress] = useState({
//     fullName: "",
//     phone: "",
//     street: "",
//     city: "",
//     state: "",
//     postalCode: "",
//   });
//   const [errors, setErrors] = useState({});

//   // Load pending checkout if it exists
//   const [checkoutData, setCheckoutData] = useState({ cart: cartFromCheckout, total });

//   useEffect(() => {
//     const pending = JSON.parse(localStorage.getItem("pendingCheckout"));
//     if (pending) {
//       setCheckoutData(pending);
//     }
//   }, []);

//   const validateForm = () => {
//     const newErrors = {};
//     if (!address.fullName) newErrors.fullName = "Full Name is required";
//     if (!address.phone) newErrors.phone = "Phone Number is required";
//     if (!address.street) newErrors.street = "Street Address is required";
//     if (!address.city) newErrors.city = "City is required";
//     if (!address.state) newErrors.state = "State is required";
//     if (!address.postalCode) newErrors.postalCode = "Postal Code is required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handlePlaceOrder = (finalAddress) => {
//     // If not logged in, save checkout state and redirect to auth
//     if (!user) {
//       localStorage.setItem(
//         "pendingCheckout",
//         JSON.stringify({ cart: cartFromCheckout, total })
//       );
//       navigate("/auth", { state: { from: "/shipping" } });
//       return;
//     }

//     if (!validateForm()) {
//       setLoading(false);
//       return;
//     }

//     setLoading(true);

//     // Initialize Paystack payment
//     const paystack = new PaystackPop();
//     paystack.newTransaction({
//       key: "pk_test_8fa5dfa8fbd19d1ef103d0a0a000c4456f3bc1bf", // Replace with your Paystack public key
//       email: user.email || "customer@example.com", // Use authenticated user's email
//       amount: checkoutData.total * 100, // Paystack expects amount in kobo (multiply by 100 for Naira)
//       currency: "NGN", // Adjust based on your needs
//       metadata: {
//         fullName: finalAddress.fullName,
//         phone: finalAddress.phone,
//       },
//       onSuccess: (transaction) => {
//         // Payment successful
//         const pending = JSON.parse(localStorage.getItem("pendingCheckout"));
//         const orderCart = pending?.cart || checkoutData.cart;
//         const orderTotal = pending?.total || checkoutData.total;

//         clearCart();
//         setLoading(false);

//         const order = {
//           address: finalAddress,
//           cart: orderCart,
//           total: orderTotal,
//           paymentReference: transaction.reference, // Save payment reference
//         };

//         localStorage.removeItem("pendingCheckout"); // Clear temp
//         localStorage.setItem("lastOrder", JSON.stringify(order));

//         // Redirect to confirmation page
//         navigate("/confirmation", { state: order });
//       },
//       onCancel: () => {
//         // User cancelled the payment
//         setLoading(false);
//         alert("Payment was cancelled. Please try again.");
//       },
//       onError: (error) => {
//         // Handle payment error
//         setLoading(false);
//         alert(`Payment failed: ${error.message}`);
//       },
//     });
//   };

//   return (
//     <div className="order-summary-container">
//       <div className="order-summary">
//         <h2>Shipping Address</h2>
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             handlePlaceOrder(address);
//           }}
//           className="address-form"
//         >
//           {/* Full Name */}
//           <div>
//             <label className="first-label">Full Name</label>
//             <input
//               type="text"
//               placeholder="Enter your full name"
//               value={address.fullName}
//               onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
//               required
//             />
//             {errors.fullName && <p className="error">{errors.fullName}</p>}
//           </div>

//           {/* Phone */}
//           <div>
//             <label>Phone Number</label>
//             <input
//               type="tel"
//               placeholder="Enter your phone number"
//               value={address.phone}
//               onChange={(e) => setAddress({ ...address, phone: e.target.value })}
//               required
//             />
//             {errors.phone && <p className="error">{errors.phone}</p>}
//           </div>

//           {/* Street */}
//           <div>
//             <label>Street Address</label>
//             <input
//               type="text"
//               placeholder="Enter street address"
//               value={address.street}
//               onChange={(e) => setAddress({ ...address, street: e.target.value })}
//               required
//             />
//             {errors.street && <p className="error">{errors.street}</p>}
//           </div>

//           {/* City */}
//           <div>
//             <label>City</label>
//             <input
//               type="text"
//               placeholder="Enter your city"
//               value={address.city}
//               onChange={(e) => setAddress({ ...address, city: e.target.value })}
//               required
//             />
//             {errors.city && <p className="error">{errors.city}</p>}
//           </div>

//           {/* State */}
//           <div>
//             <label>State</label>
//             <input
//               type="text"
//               placeholder="Enter your state"
//               value={address.state}
//               onChange={(e) => setAddress({ ...address, state: e.target.value })}
//               required
//             />
//             {errors.state && <p className="error">{errors.state}</p>}
//           </div>

//           {/* Postal Code */}
//           <div>
//             <label>Postal Code</label>
//             <input
//               type="text"
//               placeholder="Enter postal code"
//               value={address.postalCode}
//               onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
//               required
//             />
//             {errors.postalCode && <p className="error">{errors.postalCode}</p>}
//           </div>

//           <button type="submit" className="place-order-btn" disabled={loading}>
//             {loading ? <span className="spinner"></span> : "Proceed to Payment"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { useCart } from '../App';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../App';
import '../styles/checkout.css';

export default function ShippingPage() {
  const { clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const { cart: cartFromCheckout, total } = location.state || { cart: [], total: 0 };

  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
  });
  const [errors, setErrors] = useState({});

  // Load pending checkout if it exists
  const [checkoutData, setCheckoutData] = useState({ cart: cartFromCheckout, total });

  useEffect(() => {
    const pending = JSON.parse(localStorage.getItem('pendingCheckout'));
    if (pending) {
      setCheckoutData(pending);
    }

    // Handle redirect back from Paystack
    const urlParams = new URLSearchParams(window.location.search);
    const reference = urlParams.get('reference');
    if (reference) {
      verifyPayment(reference);
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!address.fullName) newErrors.fullName = 'Full Name is required';
    if (!address.phone) newErrors.phone = 'Phone Number is required';
    if (!address.street) newErrors.street = 'Street Address is required';
    if (!address.city) newErrors.city = 'City is required';
    if (!address.state) newErrors.state = 'State is required';
    if (!address.postalCode) newErrors.postalCode = 'Postal Code is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const verifyPayment = async (reference) => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/paystack/verify/${reference}`);
      const verifyData = await response.json();

      if (verifyData.status === 'success') {
        const pending = JSON.parse(localStorage.getItem('pendingCheckout'));
        const orderCart = pending?.cart || checkoutData.cart;
        const orderTotal = pending?.total || checkoutData.total;

        clearCart();
        localStorage.removeItem('pendingCheckout');
        localStorage.setItem(
          'lastOrder',
          JSON.stringify({
            address,
            cart: orderCart,
            total: orderTotal,
            paymentReference: reference,
          })
        );

        navigate('/confirmation', {
          state: {
            address,
            cart: orderCart,
            total: orderTotal,
            paymentReference: reference,
          },
        });
      } else {
        alert('Payment verification failed');
      }
    } catch (error) {
      console.error('Verification error:', error);
      alert('Failed to verify payment. Please contact support.');
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!user) {
      localStorage.setItem(
        'pendingCheckout',
        JSON.stringify({ cart: cartFromCheckout, total, address })
      );
      navigate('/auth', { state: { from: '/shipping' } });
      return;
    }

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/paystack/initialize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email || 'customer@example.com',
          amount: checkoutData.total,
          metadata: {
            fullName: address.fullName,
            phone: address.phone,
            address, // Include full address
            cart: checkoutData.cart, // Include cart for webhook
          },
        }),
      });

      const { authorization_url } = await response.json();

      if (!authorization_url) {
        throw new Error('Failed to initialize transaction');
      }

      // Redirect to Paystack payment page
      window.location.href = authorization_url;
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment initiation failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="order-summary-container">
      <div className="order-summary">
        <h2>Shipping Address</h2>
        <form onSubmit={handlePlaceOrder} className="address-form">
          {/* Full Name */}
          <div>
            <label className="first-label">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={address.fullName}
              onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
              required
            />
            {errors.fullName && <p className="error">{errors.fullName}</p>}
          </div>

          {/* Phone */}
          <div>
            <label>Phone Number</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={address.phone}
              onChange={(e) => setAddress({ ...address, phone: e.target.value })}
              required
            />
            {errors.phone && <p className="error">{errors.phone}</p>}
          </div>

          {/* Street */}
          <div>
            <label>Street Address</label>
            <input
              type="text"
              placeholder="Enter street address"
              value={address.street}
              onChange={(e) => setAddress({ ...address, street: e.target.value })}
              required
            />
            {errors.street && <p className="error">{errors.street}</p>}
          </div>

          {/* City */}
          <div>
            <label>City</label>
            <input
              type="text"
              placeholder="Enter your city"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
              required
            />
            {errors.city && <p className="error">{errors.city}</p>}
          </div>

          {/* State */}
          <div>
            <label>State</label>
            <input
              type="text"
              placeholder="Enter your state"
              value={address.state}
              onChange={(e) => setAddress({ ...address, state: e.target.value })}
              required
            />
            {errors.state && <p className="error">{errors.state}</p>}
          </div>

          {/* Postal Code */}
          <div>
            <label>Postal Code</label>
            <input
              type="text"
              placeholder="Enter postal code"
              value={address.postalCode}
              onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
              required
            />
            {errors.postalCode && <p className="error">{errors.postalCode}</p>}
          </div>

          <button type="submit" className="place-order-btn" disabled={loading}>
            {loading ? <span className="spinner"></span> : 'Proceed to Payment'}
          </button>
        </form>
      </div>
    </div>
  );
}

