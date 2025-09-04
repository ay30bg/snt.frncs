import React, { useState } from "react";
import "../styles/authPage.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../App"; // ✅ import from your context

export default function AuthPage() {
  const { login } = useAuth(); // ✅ from AuthContext
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("Login with:", { email, password });

    // Simulate API call
    setTimeout(() => {
      setLoading(false);

      // ✅ Fake user data (replace with real API result later)
      const fakeUser = { email, name: "Demo User" };

      // ✅ Save user to context + localStorage
      login(fakeUser);

      // ✅ Redirect back to where user came from or home
      const redirectTo = location.state?.from || "/";
      navigate(redirectTo, { replace: true });
    }, 2000);
  };

  const handleGoogleLogin = () => {
    console.log("Continue with Google clicked");
    // TODO: integrate Google OAuth
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Login</h1>

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
            />
          </div>

          {/* Password */}
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

          {/* Remember Me + Forgot Password */}
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

          {/* Submit */}
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? <span className="spinner"></span> : "Log in"}
          </button>
        </form>

        {/* Google Login */}
        <div className="social-login">
          <button className="google-btn" onClick={handleGoogleLogin}>
            <FcGoogle size={20} style={{ marginRight: "10px" }} />
            Continue with Google
          </button>
        </div>

        <div className="auth-links">
          <p>
            Not a Member? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
