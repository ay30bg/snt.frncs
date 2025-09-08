// // // src/pages/Shipping.jsx
// // import React, { useState, useEffect } from "react";
// // import { useCart } from "../App";
// // import { useNavigate, useLocation } from "react-router-dom";
// // import { useAuth } from "../App";
// // import "../styles/checkout.css";

// // // Paystack Pop.js (Ensure this is included in your index.html or via npm)
// // import PaystackPop from "@paystack/inline-js";

// // export default function ShippingPage() {
// //   const { clearCart } = useCart();
// //   const { user } = useAuth();
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   const { cart: cartFromCheckout, total } = location.state || { cart: [], total: 0 };

// //   const [loading, setLoading] = useState(false);
// //   const [address, setAddress] = useState({
// //     fullName: "",
// //     phone: "",
// //     street: "",
// //     city: "",
// //     state: "",
// //     postalCode: "",
// //   });
// //   const [errors, setErrors] = useState({});

// //   // Load pending checkout if it exists
// //   const [checkoutData, setCheckoutData] = useState({ cart: cartFromCheckout, total });

// //   useEffect(() => {
// //     const pending = JSON.parse(localStorage.getItem("pendingCheckout"));
// //     if (pending) {
// //       setCheckoutData(pending);
// //     }
// //   }, []);

// //   const validateForm = () => {
// //     const newErrors = {};
// //     if (!address.fullName) newErrors.fullName = "Full Name is required";
// //     if (!address.phone) newErrors.phone = "Phone Number is required";
// //     if (!address.street) newErrors.street = "Street Address is required";
// //     if (!address.city) newErrors.city = "City is required";
// //     if (!address.state) newErrors.state = "State is required";
// //     if (!address.postalCode) newErrors.postalCode = "Postal Code is required";
// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handlePlaceOrder = (finalAddress) => {
// //     // If not logged in, save checkout state and redirect to auth
// //     if (!user) {
// //       localStorage.setItem(
// //         "pendingCheckout",
// //         JSON.stringify({ cart: cartFromCheckout, total })
// //       );
// //       navigate("/auth", { state: { from: "/shipping" } });
// //       return;
// //     }

// //     if (!validateForm()) {
// //       setLoading(false);
// //       return;
// //     }

// //     setLoading(true);

// //     // Initialize Paystack payment
// //     const paystack = new PaystackPop();
// //     paystack.newTransaction({
// //       key: "pk_test_8fa5dfa8fbd19d1ef103d0a0a000c4456f3bc1bf", // Replace with your Paystack public key
// //       email: user.email || "customer@example.com", // Use authenticated user's email
// //       amount: checkoutData.total * 100, // Paystack expects amount in kobo (multiply by 100 for Naira)
// //       currency: "NGN", // Adjust based on your needs
// //       metadata: {
// //         fullName: finalAddress.fullName,
// //         phone: finalAddress.phone,
// //       },
// //       onSuccess: (transaction) => {
// //         // Payment successful
// //         const pending = JSON.parse(localStorage.getItem("pendingCheckout"));
// //         const orderCart = pending?.cart || checkoutData.cart;
// //         const orderTotal = pending?.total || checkoutData.total;

// //         clearCart();
// //         setLoading(false);

// //         const order = {
// //           address: finalAddress,
// //           cart: orderCart,
// //           total: orderTotal,
// //           paymentReference: transaction.reference, // Save payment reference
// //         };

// //         localStorage.removeItem("pendingCheckout"); // Clear temp
// //         localStorage.setItem("lastOrder", JSON.stringify(order));

// //         // Redirect to confirmation page
// //         navigate("/confirmation", { state: order });
// //       },
// //       onCancel: () => {
// //         // User cancelled the payment
// //         setLoading(false);
// //         alert("Payment was cancelled. Please try again.");
// //       },
// //       onError: (error) => {
// //         // Handle payment error
// //         setLoading(false);
// //         alert(`Payment failed: ${error.message}`);
// //       },
// //     });
// //   };

// //   return (
// //     <div className="order-summary-container">
// //       <div className="order-summary">
// //         <h2>Shipping Address</h2>
// //         <form
// //           onSubmit={(e) => {
// //             e.preventDefault();
// //             handlePlaceOrder(address);
// //           }}
// //           className="address-form"
// //         >
// //           {/* Full Name */}
// //           <div>
// //             <label className="first-label">Full Name</label>
// //             <input
// //               type="text"
// //               placeholder="Enter your full name"
// //               value={address.fullName}
// //               onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
// //               required
// //             />
// //             {errors.fullName && <p className="error">{errors.fullName}</p>}
// //           </div>

// //           {/* Phone */}
// //           <div>
// //             <label>Phone Number</label>
// //             <input
// //               type="tel"
// //               placeholder="Enter your phone number"
// //               value={address.phone}
// //               onChange={(e) => setAddress({ ...address, phone: e.target.value })}
// //               required
// //             />
// //             {errors.phone && <p className="error">{errors.phone}</p>}
// //           </div>

// //           {/* Street */}
// //           <div>
// //             <label>Street Address</label>
// //             <input
// //               type="text"
// //               placeholder="Enter street address"
// //               value={address.street}
// //               onChange={(e) => setAddress({ ...address, street: e.target.value })}
// //               required
// //             />
// //             {errors.street && <p className="error">{errors.street}</p>}
// //           </div>

// //           {/* City */}
// //           <div>
// //             <label>City</label>
// //             <input
// //               type="text"
// //               placeholder="Enter your city"
// //               value={address.city}
// //               onChange={(e) => setAddress({ ...address, city: e.target.value })}
// //               required
// //             />
// //             {errors.city && <p className="error">{errors.city}</p>}
// //           </div>

// //           {/* State */}
// //           <div>
// //             <label>State</label>
// //             <input
// //               type="text"
// //               placeholder="Enter your state"
// //               value={address.state}
// //               onChange={(e) => setAddress({ ...address, state: e.target.value })}
// //               required
// //             />
// //             {errors.state && <p className="error">{errors.state}</p>}
// //           </div>

// //           {/* Postal Code */}
// //           <div>
// //             <label>Postal Code</label>
// //             <input
// //               type="text"
// //               placeholder="Enter postal code"
// //               value={address.postalCode}
// //               onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
// //               required
// //             />
// //             {errors.postalCode && <p className="error">{errors.postalCode}</p>}
// //           </div>

// //           <button type="submit" className="place-order-btn" disabled={loading}>
// //             {loading ? <span className="spinner"></span> : "Proceed to Payment"}
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// // src/pages/Shipping.jsx
// import React, { useState, useEffect } from 'react';
// import { useCart } from '../App';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../App';
// import '../styles/checkout.css';
// import PaystackPop from '@paystack/inline-js';

// export default function ShippingPage() {
//   const { clearCart } = useCart();
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const { cart: cartFromCheckout, total } = location.state || { cart: [], total: 0 };

//   const [loading, setLoading] = useState(false);
//   const [address, setAddress] = useState({
//     fullName: '',
//     phone: '',
//     street: '',
//     city: '',
//     state: '',
//     postalCode: '',
//   });
//   const [errors, setErrors] = useState({});

//   // Load pending checkout if it exists
//   const [checkoutData, setCheckoutData] = useState({ cart: cartFromCheckout, total });

//   useEffect(() => {
//     const pending = JSON.parse(localStorage.getItem('pendingCheckout'));
//     if (pending) {
//       setCheckoutData(pending);
//     }
//   }, []);

//   const validateForm = () => {
//     const newErrors = {};
//     if (!address.fullName) newErrors.fullName = 'Full Name is required';
//     if (!address.phone) newErrors.phone = 'Phone Number is required';
//     if (!address.street) newErrors.street = 'Street Address is required';
//     if (!address.city) newErrors.city = 'City is required';
//     if (!address.state) newErrors.state = 'State is required';
//     if (!address.postalCode) newErrors.postalCode = 'Postal Code is required';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handlePlaceOrder = async (finalAddress) => {
//     if (!user) {
//       localStorage.setItem(
//         'pendingCheckout',
//         JSON.stringify({ cart: cartFromCheckout, total })
//       );
//       navigate('/auth', { state: { from: '/shipping' } });
//       return;
//     }

//     if (!validateForm()) {
//       setLoading(false);
//       return;
//     }

//     setLoading(true);

//     try {
//       // Call backend to initialize transaction
//       const response = await fetch(`${process.env.REACT_APP_API_URL}/payment/initialize`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           // Add Authorization header if your auth system uses JWT
//         },
//         body: JSON.stringify({
//           email: user.email,
//           amount: checkoutData.total,
//           cart: checkoutData.cart,
//           address: finalAddress,
//           userId: user.id, // Ensure user.id exists in useAuth
//         }),
//       });

//       const data = await response.json();
//       if (data.error) {
//         throw new Error(data.error);
//       }

//       // Initialize Paystack payment
//       const paystack = new PaystackPop();
//       paystack.resumeTransaction({
//         access_code: data.access_code,
//         onSuccess: async (transaction) => {
//           // Verify payment on backend
//           const verifyResponse = await fetch(
//             `${process.env.REACT_APP_API_URL}/payment/verify/${transaction.reference}`
//           );
//           const verifyData = await verifyResponse.json();

//           if (verifyData.status === 'success') {
//             clearCart();
//             localStorage.removeItem('pendingCheckout');
//             localStorage.setItem(
//               'lastOrder',
//               JSON.stringify({
//                 address: finalAddress,
//                 cart: checkoutData.cart,
//                 total: checkoutData.total,
//                 paymentReference: transaction.reference,
//               })
//             );
//             navigate('/confirmation', {
//               state: {
//                 address: finalAddress,
//                 cart: checkoutData.cart,
//                 total: checkoutData.total,
//                 paymentReference: transaction.reference,
//               },
//             });
//           } else {
//             alert('Payment verification failed. Please contact support.');
//           }
//           setLoading(false);
//         },
//         onCancel: () => {
//           setLoading(false);
//           alert('Payment was cancelled. Please try again.');
//         },
//         onError: (error) => {
//           setLoading(false);
//           alert(`Payment failed: ${error.message}`);
//         },
//       });
//     } catch (error) {
//       setLoading(false);
//       alert(`Error: ${error.message}`);
//     }
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
//             {loading ? <span className="spinner"></span> : 'Proceed to Payment'}
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
import PaystackPop from '@paystack/inline-js';

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
    // Log user for debugging
    console.log('User object:', user);
  }, [user]);

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

  const handlePlaceOrder = async (finalAddress) => {
    // Validate user and email
    if (!user || !user.email || !user.email.includes('@')) {
      localStorage.setItem(
        'pendingCheckout',
        JSON.stringify({ cart: cartFromCheckout, total })
      );
      navigate('/auth', { state: { from: '/shipping' } });
      alert('Please log in with a valid email to proceed with payment.');
      return;
    }

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    setLoading(true);

    // Log payload for debugging
    const payload = {
      email: user.email,
      amount: checkoutData.total,
      cart: checkoutData.cart,
      address: finalAddress,
      userId: user.id,
    };
    console.log('Payload sent to backend:', payload);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/payment/initialize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add Authorization header if your auth system uses JWT
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (data.status === false) {
        throw new Error(data.message || 'Failed to initialize transaction');
      }

      // Initialize Paystack payment
      const paystack = new PaystackPop();
      paystack.resumeTransaction({
        access_code: data.access_code,
        onSuccess: async (transaction) => {
          // Verify payment on backend
          const verifyResponse = await fetch(
            `${process.env.REACT_APP_API_URL}/payment/verify/${transaction.reference}`
          );
          const verifyData = await verifyResponse.json();

          if (verifyData.status === 'success') {
            clearCart();
            localStorage.removeItem('pendingCheckout');
            localStorage.setItem(
              'lastOrder',
              JSON.stringify({
                address: finalAddress,
                cart: checkoutData.cart,
                total: checkoutData.total,
                paymentReference: transaction.reference,
              })
            );
            navigate('/confirmation', {
              state: {
                address: finalAddress,
                cart: checkoutData.cart,
                total: checkoutData.total,
                paymentReference: transaction.reference,
              },
            });
          } else {
            alert('Payment verification failed. Please contact support.');
          }
          setLoading(false);
        },
        onCancel: () => {
          setLoading(false);
          alert('Payment was cancelled. Please try again.');
        },
        onError: (error) => {
          setLoading(false);
          alert(`Payment failed: ${error.message}`);
        },
      });
    } catch (error) {
      setLoading(false);
      alert(`Error: ${error.message || 'Failed to initialize payment. Please try again.'}`);
    }
  };

  return (
    <div className="order-summary-container">
      <div className="order-summary">
        <h2>Shipping Address</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handlePlaceOrder(address);
          }}
          className="address-form"
        >
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
