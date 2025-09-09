// import React from "react";
// import { useLocation, Link } from "react-router-dom";
// import { FaShippingFast, FaShoppingCart, FaDownload } from "react-icons/fa";
// import jsPDF from "jspdf";
// import "../styles/checkout.css";
// import logo from "../assets/snt.francis_logo.png"; 

// export default function ConfirmationPage() {
//   const location = useLocation();

//   const savedOrder = JSON.parse(localStorage.getItem("lastOrder") || "null");
//   const { address, cart, total, orderId: savedOrderId } = location.state || savedOrder || {};

//   if (!cart || cart.length === 0) {
//     return (
//       <div className="order-summary-container">
//         <div className="order-summary">
//           <h2>No order found.</h2>
//           <Link to="/" className="place-order-btn">Go Back Home</Link>
//         </div>
//       </div>
//     );
//   }

//   // ✅ Generate Order ID if not provided
//   const orderId = savedOrderId || Math.floor(Math.random() * 1000000);

// //   // ✅ Estimated Delivery Date (5 days from now)
// //   const deliveryDate = new Date();
// //   deliveryDate.setDate(deliveryDate.getDate() + 5);

//   // ✅ Generate PDF Receipt
//   const handleDownloadReceipt = () => {
//     const doc = new jsPDF();

//     // --- Store Logo ---
//     const imgWidth = 40;
//     const imgHeight = 20;
//     doc.addImage(logo, "PNG", 14, 10, imgWidth, imgHeight);

//     // --- Store Name ---
//     doc.setFontSize(16);
//     doc.text("Snt.Francis Store", 60, 20);

//     // --- Title ---
//     doc.setFontSize(18);
//     doc.text("Order Receipt", 14, 40);

//     doc.setFontSize(12);
//     doc.text(`Order ID: #${orderId}`, 14, 55);
//     // doc.text(`Estimated Delivery: ${deliveryDate.toDateString()}`, 14, 65);

//     doc.text("Shipping To:", 14, 80);
//     doc.text(`${address.fullName}`, 14, 90);
//     doc.text(`${address.street}, ${address.city}, ${address.state}`, 14, 100);
//     doc.text(`${address.postalCode}`, 14, 110);
//     doc.text(`${address.phone}`, 14, 120);

//     doc.text("Items Ordered:", 14, 140);
//     cart.forEach((item, idx) => {
//       doc.text(
//         `${idx + 1}. ${item.name} (${item.qty} × ₦${item.price.toLocaleString()})`,
//         14,
//         150 + idx * 10
//       );
//     });

//     doc.text(`Total: ₦${total.toLocaleString()}`, 14, 170 + cart.length * 10);

//     // ✅ Save file
//     doc.save(`receipt-${orderId}.pdf`);
//   };

//   return (
//     <div className="order-summary-container">
//       <div className="order-summary confirmation-page">
//         <h2 className="confirmation-title">Thank you for your order!</h2>
//         <p className="confirmation-subtitle">Your order has been placed successfully.</p>

//         {/* ✅ Order ID + Delivery */}
//         <section className="confirmation-section">
//           <p className="order-id"><strong>Order ID:</strong> #{orderId}</p>
//           {/* <p className="delivery-date"><strong>Estimated Delivery:</strong> {deliveryDate.toDateString()}</p> */}
//         </section>

//         {/* ✅ Shipping Info */}
//         <section className="confirmation-section">
//           <h3><FaShippingFast className="shipping-icon" /> Shipping To</h3>
//           <p>{address.fullName}</p>
//           <p>{address.street}, {address.city}, {address.state}</p>
//           <p>{address.postalCode}</p>
//           <br />
//           <p>{address.phone}</p>
//         </section>

//         {/* ✅ Items Ordered */}
//         <section className="confirmation-section">
//           <h3><FaShoppingCart className="cart-icon" /> Items Ordered</h3>
//           <div className="confirmation-items">
//             {cart.map((item, idx) => (
//               <div key={idx} className="confirmation-item">
//                 <img src={item.image ?? item.images?.[0]} alt={item.name} />
//                 <div>
//                   <p className="item-name">
//                     {item.name}{" "}
//                     {item.selectedSize && (
//                       <span className="item-size">(Size: {item.selectedSize})</span>
//                     )}
//                   </p>
//                   <p className="item-price">{item.qty} × ₦{item.price.toLocaleString()}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* ✅ Totals */}
//         <div className="summary-totals confirmation-total">
//           <p>Total: ₦{total.toLocaleString()}</p>
//         </div>

//         {/* ✅ Download Button Below Totals */}
//         <div className="download-receipt">
//           <button onClick={handleDownloadReceipt} className="download-btn">
//             <FaDownload /> Download Receipt
//           </button>
//         </div>

//         {/* ✅ Continue Shopping Link */}
//         <Link to="/" className="place-order-btn">Continue Shopping</Link>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useCart } from "../App";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/checkout.css";
import PaystackPop from "@paystack/inline-js";

export default function ShippingPage() {
  const { clearCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const { cart: cartFromCheckout, total } = location.state || { cart: [], total: 0 };

  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    fullName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
  });
  const [errors, setErrors] = useState({});

  // Load pending checkout if it exists
  const [checkoutData, setCheckoutData] = useState({ cart: cartFromCheckout, total });

  useEffect(() => {
    const pending = JSON.parse(localStorage.getItem("pendingCheckout"));
    if (pending) {
      setCheckoutData(pending);
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!address.fullName) newErrors.fullName = "Full Name is required";
    if (!address.email) newErrors.email = "Email is required";
    if (!address.phone) newErrors.phone = "Phone Number is required";
    if (!address.street) newErrors.street = "Street Address is required";
    if (!address.city) newErrors.city = "City is required";
    if (!address.state) newErrors.state = "State is required";
    if (!address.postalCode) newErrors.postalCode = "Postal Code is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async (finalAddress) => {
    if (!validateForm()) {
      setLoading(false);
      return;
    }

    setLoading(true);

    // Initialize Paystack payment
    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: "pk_test_8fa5dfa8fbd19d1ef103d0a0a000c4456f3bc1bf", // Replace with your Paystack public key
      email: finalAddress.email,
      amount: checkoutData.total * 100, // Paystack expects amount in kobo
      currency: "NGN",
      metadata: {
        fullName: finalAddress.fullName,
        phone: finalAddress.phone,
      },
      onSuccess: async (transaction) => {
        try {
          // Verify payment with backend using REACT_APP_API_URL
          const response = await fetch(`${process.env.REACT_APP_API_URL}/paystack/verify/${transaction.reference}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              cart: checkoutData.cart,
              total: checkoutData.total,
              address: finalAddress,
              email: finalAddress.email,
            }),
          });

          const result = await response.json();

          if (response.ok) {
            clearCart();
            localStorage.removeItem('pendingCheckout');
            localStorage.setItem('lastOrder', JSON.stringify(result.order));
            navigate('/confirmation', { state: result.order });
          } else {
            throw new Error(result.error || 'Payment verification failed');
          }
        } catch (error) {
          console.error('Error verifying payment:', error);
          alert(`Payment verification failed: ${error.message}`);
        } finally {
          setLoading(false);
        }
      },
      onCancel: () => {
        setLoading(false);
        alert("Payment was cancelled. Please try again.");
      },
      onError: (error) => {
        setLoading(false);
        alert(`Payment failed: ${error.message}`);
      },
    });
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

          {/* Email */}
          <div>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={address.email}
              onChange={(e) => setAddress({ ...address, email: e.target.value })}
              required
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label>Phone Number</label>
            <input
              type="tel"
              placeholder="Enter your phone number
