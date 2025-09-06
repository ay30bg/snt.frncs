// // import React, { useState } from "react";
// // import "../styles/authPage.css";
// // import { FaEye, FaEyeSlash } from "react-icons/fa";
// // import { FcGoogle } from "react-icons/fc";
// // import { useNavigate, useLocation, Link } from "react-router-dom";
// // import { useAuth } from "../App"; // ✅ import from your context

// // export default function AuthPage() {
// //   const { login } = useAuth(); // ✅ from AuthContext
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [rememberMe, setRememberMe] = useState(false);
// //   const [loading, setLoading] = useState(false);

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     setLoading(true);

// //     console.log("Login with:", { email, password });

// //     // Simulate API call
// //     setTimeout(() => {
// //       setLoading(false);

// //       // ✅ Fake user data (replace with real API result later)
// //       const fakeUser = { email, name: "Demo User" };

// //       // ✅ Save user to context + localStorage
// //       login(fakeUser);

// //       // ✅ Redirect back to where user came from or home
// //       const redirectTo = location.state?.from || "/";
// //       navigate(redirectTo, { replace: true });
// //     }, 2000);
// //   };

// //   const handleGoogleLogin = () => {
// //     console.log("Continue with Google clicked");
// //     // TODO: integrate Google OAuth
// //   };

// //   return (
// //     <div className="auth-page">
// //       <div className="auth-container">
// //         <h1>Login</h1>

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

// //           {/* Remember Me + Forgot Password */}
// //           <div className="remember-forgot">
// //             <div className="remember-me">
// //               <input
// //                 type="checkbox"
// //                 id="rememberMe"
// //                 checked={rememberMe}
// //                 onChange={() => setRememberMe(!rememberMe)}
// //               />
// //               <label htmlFor="rememberMe">Remember me</label>
// //             </div>
// //             <Link to="/forgot-password" className="forgot-link">
// //               Forgot Password?
// //             </Link>
// //           </div>

// //           {/* Submit */}
// //           <button type="submit" className="auth-btn" disabled={loading}>
// //             {loading ? <span className="spinner"></span> : "Log in"}
// //           </button>
// //         </form>

// //         {/* Google Login */}
// //         <div className="social-login">
// //           <button className="google-btn" onClick={handleGoogleLogin}>
// //             <FcGoogle size={20} style={{ marginRight: "10px" }} />
// //             Continue with Google
// //           </button>
// //         </div>

// //         <div className="auth-links">
// //           <p>
// //             Not a Member? <Link to="/register">Register</Link>
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import React, { useState } from "react";
// import "../styles/authPage.css";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { FcGoogle } from "react-icons/fc";
// import { useNavigate, useLocation, Link } from "react-router-dom";
// import { useAuth } from "../App";

// export default function AuthPage() {
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       // Use environment variable for API URL
//       const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Login failed");
//       }

//       const { user, token } = data;

//       // Save user and token to context
//       login({ user, token });

//       // Store token in localStorage if rememberMe is checked
//       if (rememberMe) {
//         localStorage.setItem("authToken", token);
//       }

//       // Redirect to previous page or home
//       const redirectTo = location.state?.from || "/";
//       navigate(redirectTo, { replace: true });
//     } catch (err) {
//       setError(err.message || "Something went wrong. Please try again.");
//       setLoading(false);
//     }
//   };

//   const handleGoogleLogin = () => {
//     console.log("Continue with Google clicked");
//     // TODO: Integrate Google OAuth
//   };

//   return (
//     <div className="auth-page">
//       <div className="auth-container">
//         <h1>Login</h1>

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
//                 type={showPassword ? "text" : "password"}
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

//           {/* Remember Me + Forgot Password */}
//           <div className="remember-forgot">
//             <div className="remember-me">
//               <input
//                 type="checkbox"
//                 id="rememberMe"
//                 checked={rememberMe}
//                 onChange={() => setRememberMe(!rememberMe)}
//               />
//               <label htmlFor="rememberMe">Remember me</label>
//             </div>
//             <Link to="/forgot-password" className="forgot-link">
//               Forgot Password?
//             </Link>
//           </div>

//           {/* Submit */}
//           <button type="submit" className="auth-btn" disabled={loading}>
//             {loading ? <span className="spinner"></span> : "Log in"}
//           </button>
//         </form>

//         {/* Google Login */}
//         <div className="social-login">
//           <button className="google-btn" onClick={handleGoogleLogin}>
//             <FcGoogle size={20} style={{ marginRight: "10px" }} />
//             Continue with Google
//           </button>
//         </div>

//         <div className="auth-links">
//           <p>
//             Not a Member? <Link to="/register">Register</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import "../styles/authPage.css"; // Your CSS file for styling
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Icons for password visibility toggle
import { FcGoogle } from "react-icons/fc"; // Google icon for custom button
import { useNavigate, useLocation, Link } from "react-router-dom"; // For navigation and routing
import { useAuth } from "../App"; // Your auth context to manage user login
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google"; // Google OAuth components

export default function AuthPage() {
  const { login } = useAuth(); // Get login function from your auth context
  const navigate = useNavigate(); // For redirecting after login
  const location = useLocation(); // To check where the user came from

  // State variables for form inputs and UI
  const [email, setEmail] = useState(""); // Store email input
  const [password, setPassword] = useState(""); // Store password input
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [rememberMe, setRememberMe] = useState(false); // Remember me checkbox
  const [loading, setLoading] = useState(false); // Show loading spinner during API calls
  const [error, setError] = useState(""); // Display error messages

  // Handle email/password login form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh on form submit
    setLoading(true); // Show spinner
    setError(""); // Clear previous errors

    try {
      // Send login request to backend API
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      // Check if the API request failed
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Extract user and token from API response
      const { user, token } = data;
      login({ user, token }); // Save user and token to auth context

      // Save token to localStorage if "Remember me" is checked
      if (rememberMe) {
        localStorage.setItem("authToken", token);
      }

      // Redirect to the previous page (or home if none specified)
      const redirectTo = location.state?.from || "/";
      navigate(redirectTo, { replace: true });
    } catch (err) {
      // Show error message to user
      setError(err.message || "Something went wrong. Please try again.");
      setLoading(false); // Hide spinner
    }
  };

  // Handle Google OAuth login
  const handleGoogleLogin = async (credentialResponse) => {
    setLoading(true); // Show spinner
    setError(""); // Clear previous errors

    try {
      // Send Google ID token to backend for verification
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/google-auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });

      const data = await response.json();

      // Check if the API request failed
      if (!response.ok) {
        throw new Error(data.error || "Google login failed");
      }

      // Extract user and token from API response
      const { user, token } = data;
      login({ user, token }); // Save to auth context

      // Save token to localStorage if "Remember me" is checked
      if (rememberMe) {
        localStorage.setItem("authToken", token);
      }

      // Redirect to the previous page (or home)
      const redirectTo = location.state?.from || "/";
      navigate(redirectTo, { replace: true });
    } catch (err) {
      // Show error message to user
      setError(err.message || "Google login failed. Please try again.");
      setLoading(false); // Hide spinner
    }
  };

  return (
    // Wrap component in GoogleOAuthProvider with Google Client ID
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div className="auth-page">
        <div className="auth-container">
          <h1>Login</h1>

          {/* Display error message if login fails */}
          {error && <div className="error-message">{error}</div>}

          {/* Email/Password Login Form */}
          <form onSubmit={handleSubmit} className="auth-form">
            {/* Email Input */}
            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Input with Toggle */}
            <div className="form-group password-group">
              <label>Password *</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="remember-forgot">
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
              <Link to="/forgot-password" className="forgot-link">
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? <span className="spinner"></span> : "Log in"}
            </button>
          </form>

          {/* Custom Google Login Button */}
          <div className="social-login">
            <GoogleLogin
              onSuccess={handleGoogleLogin} // Called when Google login succeeds
              onError={() => {
                setError("Google login failed. Please try again.");
                setLoading(false);
              }}
              render={(renderProps) => (
                <button
                  className="google-btn"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled || loading}
                >
                  <FcGoogle size={20} style={{ marginRight: "10px" }} />
                  Continue with Google
                </button>
              )}
            />
          </div>

          {/* Register Link */}
          <div className="auth-links">
            <p>
              Not a Member? <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
