// // src/pages/Shipping.jsx
// import React, { useState, useEffect } from "react";
// import { useCart } from "../App";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../App"; 
// import "../styles/checkout.css";

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

//   // ✅ Load pending checkout if it exists
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
//     // ✅ if not logged in, save checkout state then redirect
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

//     setTimeout(() => {
//       // ✅ Use saved checkout if available
//       const pending = JSON.parse(localStorage.getItem("pendingCheckout"));
//       const orderCart = pending?.cart || checkoutData.cart;
//       const orderTotal = pending?.total || checkoutData.total;

//       clearCart();
//       setLoading(false);

//       const order = { address: finalAddress, cart: orderCart, total: orderTotal };

//       localStorage.removeItem("pendingCheckout"); // clear temp
//       localStorage.setItem("lastOrder", JSON.stringify(order));

//       navigate("/confirmation", { state: order });
//     }, 2000);
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
//             {loading ? <span className="spinner"></span> : "Place Order"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// src/pages/Shipping.jsx
import React, { useState, useEffect } from "react";
import { useCart } from "../App";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../App";
import { PaystackButton } from "react-paystack"; // ✅ Paystack integration
import "../styles/checkout.css";

export default function ShippingPage() {
  const { clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const { cart: cartFromCheckout, total } = location.state || { cart: [], total: 0 };

  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
  });
  const [errors, setErrors] = useState({});

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
    if (!address.phone) newErrors.phone = "Phone Number is required";
    if (!address.street) newErrors.street = "Street Address is required";
    if (!address.city) newErrors.city = "City is required";
    if (!address.state) newErrors.state = "State is required";
    if (!address.postalCode) newErrors.postalCode = "Postal Code is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Paystack Config
  const publicKey = "pk_test_xxxxxxxxxxxxxxxxxxxxx"; // Replace with your Paystack Public Key
  const amount = checkoutData.total * 100; // Convert to Kobo
  const email = user?.email || "guest@example.com";

  const componentProps = {
    email,
    amount,
    publicKey,
    text: loading ? "Processing..." : "Place Order & Pay",
    onSuccess: () => {
      // ✅ When payment succeeds
      clearCart();

      const order = { address, cart: checkoutData.cart, total: checkoutData.total };
      localStorage.removeItem("pendingCheckout");
      localStorage.setItem("lastOrder", JSON.stringify(order));

      navigate("/confirmation", { state: order });
    },
    onClose: () => alert("Payment window closed."),
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
  };

  return (
    <div className="order-summary-container">
      <div className="order-summary">
        <h2>Shipping Address</h2>
        <form onSubmit={handleFormSubmit} className="address-form">
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

          {/* ✅ Paystack Button */}
          <PaystackButton className="place-order-btn" {...componentProps} />
        </form>
      </div>
    </div>
  );
}
