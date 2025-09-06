// // import React, { useState } from "react";
// // import "../styles/authPage.css";
// // import { FaEye, FaEyeSlash } from "react-icons/fa";
// // import { useNavigate, useLocation, Link } from "react-router-dom";
// // import { useAuth } from "../App"; // ✅ import auth context

// // export default function SignupPage() {
// //   const { login } = useAuth(); // ✅ from AuthContext
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [confirmPassword, setConfirmPassword] = useState("");
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
// //   const [loading, setLoading] = useState(false);

// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     if (password !== confirmPassword) {
// //       alert("Passwords do not match!");
// //       return;
// //     }

// //     setLoading(true);
// //     console.log("Signup with:", { email, password });

// //     // Simulate API call
// //     setTimeout(() => {
// //       setLoading(false);

// //       // ✅ Fake user object (replace with API result)
// //       const newUser = { email, name: "New User" };

// //       // ✅ Log them in immediately
// //       login(newUser);

// //       // ✅ Redirect back to where they came from or home
// //       const redirectTo = location.state?.from || "/";
// //       navigate(redirectTo, { replace: true });
// //     }, 2000);
// //   };

// //   return (
// //     <div className="auth-page">
// //       <div className="auth-container">
// //         <h1>Register</h1>

// //         <form onSubmit={handleSubmit} className="auth-form">
// //           {/* Email */}
// //           <div className="form-group">
// //             <label>Email Address *</label>
// //             <input
// //               type="email"
// //               placeholder="Enter your email"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               required
// //             />
// //           </div>

// //           {/* Password */}
// //           <div className="form-group password-group">
// //             <label>Password *</label>
// //             <div className="password-wrapper">
// //               <input
// //                 type={showPassword ? "text" : "password"}
// //                 placeholder="Enter your password"
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //                 required
// //               />
// //               <button
// //                 type="button"
// //                 className="toggle-password"
// //                 onClick={() => setShowPassword(!showPassword)}
// //               >
// //                 {showPassword ? <FaEyeSlash /> : <FaEye />}
// //               </button>
// //             </div>
// //           </div>

// //           {/* Confirm Password */}
// //           <div className="form-group password-group">
// //             <label>Confirm Password *</label>
// //             <div className="password-wrapper">
// //               <input
// //                 type={showConfirmPassword ? "text" : "password"}
// //                 placeholder="Confirm your password"
// //                 value={confirmPassword}
// //                 onChange={(e) => setConfirmPassword(e.target.value)}
// //                 required
// //               />
// //               <button
// //                 type="button"
// //                 className="toggle-password"
// //                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
// //               >
// //                 {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
// //               </button>
// //             </div>
// //           </div>

// //           {/* Submit */}
// //           <button type="submit" className="auth-btn" disabled={loading}>
// //             {loading ? <span className="spinner"></span> : "Sign Up"}
// //           </button>
// //         </form>

// //         <div className="auth-links">
// //           <p>
// //             Already a member? <Link to="/auth">Login</Link>
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import React, { useState } from 'react';
// import '../styles/authPage.css';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import { useNavigate, useLocation, Link } from 'react-router-dom';
// import { useAuth } from '../App';
// import axios from 'axios';

// export default function SignupPage() {
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (password !== confirmPassword) {
//       setError('Passwords do not match!');
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL}/signup`,
//         { email, password }
//       );

//       const { token, user } = response.data;
//       login(user, token); // Store user and token in context

//       // Redirect to the previous page or home
//       const redirectTo = location.state?.from || '/';
//       navigate(redirectTo, { replace: true });
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to sign up. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-page">
//       <div className="auth-container">
//         <h1>Register</h1>

//         {error && <div className="error-message">{error}</div>}

//         <form onSubmit={handleSubmit} className="auth-form">
//           {/* Email */}
//           <div className="form-group">
//             <label>Email Address *</label>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           {/* Password */}
//           <div className="form-group password-group">
//             <label>Password *</label>
//             <div className="password-wrapper">
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <button
//                 type="button"
//                 className="toggle-password"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>
//           </div>

//           {/* Confirm Password */}
//           <div className="form-group password-group">
//             <label>Confirm Password *</label>
//             <div className="password-wrapper">
//               <input
//                 type={showConfirmPassword ? 'text' : 'password'}
//                 placeholder="Confirm your password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//               />
//               <button
//                 type="button"
//                 className="toggle-password"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               >
//                 {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>
//           </div>

//           {/* Submit */}
//           <button type="submit" className="auth-btn" disabled={loading}>
//             {loading ? <span className="spinner"></span> : 'Sign Up'}
//           </button>
//         </form>

//         <div className="auth-links">
//           <p>
//             Already a member? <Link to="/auth">Login</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import '../styles/authPage.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../App';
import axios from 'axios';

export default function SignupPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Client-side validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/signup`,
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const { token, user } = response.data;
      console.log('Signup response:', response.data); // Log for debugging
      login(user, token); // Store user and token in context

      // Reset form fields
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      // Redirect to the previous page or home
      const redirectTo = location.state?.from || '/';
      navigate(redirectTo, { replace: true });
    } catch (err) {
      console.error('Signup error:', err.response || err); // Detailed error logging
      const errorMessage = err.response?.data?.message;
      if (errorMessage === 'Email already exists') {
        setError('This email is already registered. Please use a different email.');
      } else if (errorMessage === 'Invalid email format') {
        setError('Please enter a valid email address.');
      } else if (errorMessage === 'Password too weak') {
        setError('Password is too weak. Use at least 8 characters with numbers and symbols.');
      } else {
        setError(err.response?.data?.message || 'Failed to sign up. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Register</h1>

        {error && <div className="error-message" style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          {/* Email */}
          <div className="form-group">
            <label>Email Address *</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          {/* Password */}
          <div className="form-group password-group">
            <label>Password *</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="form-group password-group">
            <label>Confirm Password *</label>
            <div className="password-wrapper">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={loading}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Submit */}
         {/* Submit */}
//           <button type="submit" className="auth-btn" disabled={loading}>
//             {loading ? <span className="spinner"></span> : 'Register'}
//           </button>

        <div className="auth-links">
          <p>
            Already a member? <Link to="/auth">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

