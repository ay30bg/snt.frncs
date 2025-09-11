import React, { useState } from "react";
import {
  FiShoppingCart,
  FiMenu,
  FiUser,
  FiSearch,
  FiX,
  FiHeart,
  FiLogOut,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import logo from "../assets/snt-frncs-new-logo.png";

function Navbar({ cartCount, wishlistCount, onCartToggle }) {
  const [showSearch, setShowSearch] = useState(false);
  const [closing, setClosing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = Boolean(localStorage.getItem("user"));

  const handleProfileClick = () => navigate("/auth");
  const handleLogoClick = () => navigate("/");
  const handleWishlistClick = () => navigate("/wishlist");

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
      setSearchQuery("");
    }
  };

  const handleCloseSearch = () => {
    setClosing(true);
    setTimeout(() => {
      setShowSearch(false);
      setClosing(false);
    }, 300);
  };

  return (
    <>
      <nav className="navbar">
        {/* Left: Logo */}
        <div className="logo" onClick={handleLogoClick}>
          <img src={logo} alt="SNT.FRNCS Logo" className="logo-img" />
        </div>

        {/* Center: Search (desktop) */}
        <form className="search-bar" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">
            <FiSearch />
          </button>
        </form>

        {/* Right: Icons */}
        <div className="nav-actions">
          {/* Mobile: Cart + Bars */}
          <div className="mobile-only">
            {/* Mobile Cart */}
            <button className="cart-btn mobile-cart-btn" onClick={onCartToggle}>
              <FiShoppingCart className="nav-icons mobile-cart" />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>

            {/* Mobile Sidebar Toggle */}
            <button
              className="icon-btn"
              onClick={() => setSidebarOpen(true)}
            >
              <FiMenu className="nav-icons sidebar-bars" />
            </button>
          </div>

          {/* Wishlist (desktop only) */}
          <button
            className="wishlist-btn desktop-only"
            onClick={handleWishlistClick}
          >
            <FiHeart className="nav-icons" />
            {wishlistCount > 0 && (
              <span className="wishlist-count">{wishlistCount}</span>
            )}
          </button>

          {/* Cart (desktop only) */}
          <button className="cart-btn desktop-only" onClick={onCartToggle}>
            <FiShoppingCart className="nav-icons" />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>

          {/* Profile / Logout */}
          {!isLoggedIn ? (
            <button className="icon-btn desktop-only" onClick={handleProfileClick}>
              <FiUser className="nav-icons" />
            </button>
          ) : (
            <button className="icon-btn desktop-only" onClick={handleLogout}>
              <FiLogOut className="nav-icons" />
            </button>
          )}
        </div>
      </nav>

      {/* Sidebar (Mobile) */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}>
          <div
            className="sidebar"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={() => setSidebarOpen(false)}>
              <FiX />
            </button>

            {/* Profile Section */}
            <div className="sidebar-profile">
              {!isLoggedIn ? (
                <button
                  onClick={() => {
                    handleProfileClick();
                    setSidebarOpen(false);
                  }}
                  className="profile-btn"
                >
                  <FiUser className="nav-icons" />
                  <span>Sign in / Join</span>
                </button>
              ) : (
                <div className="profile-info">
                  <FiUser className="nav-icons" />
                  <span>Welcome back!</span>
                </div>
              )}
            </div>

            <hr className="sidebar-divider" />

            {/* Shop Section */}
            <div className="sidebar-section">
              <h4>Shop</h4>
              <ul>
                <li
                  onClick={() => {
                    handleWishlistClick();
                    setSidebarOpen(false);
                  }}
                >
                  <FiHeart className="nav-icons" />
                  <span>Wishlist</span>
                  {wishlistCount > 0 && (
                    <span className="count-badge">{wishlistCount}</span>
                  )}
                </li>
                <li
                  onClick={() => {
                    onCartToggle();
                    setSidebarOpen(false);
                  }}
                >
                  <FiShoppingCart className="nav-icons" />
                  <span>Cart</span>
                  {cartCount > 0 && (
                    <span className="count-badge">{cartCount}</span>
                  )}
                </li>
              </ul>
            </div>

            <hr className="sidebar-divider" />

            {/* Account Section */}
            <div className="sidebar-section">
              <h4>Account</h4>
              <ul>
                {!isLoggedIn ? (
                  <li
                    onClick={() => {
                      handleProfileClick();
                      setSidebarOpen(false);
                    }}
                  >
                    <FiUser className="nav-icons" />
                    <span>Login</span>
                  </li>
                ) : (
                  <li
                    onClick={() => {
                      handleLogout();
                      setSidebarOpen(false);
                    }}
                  >
                    <FiLogOut className="nav-icons" />
                    <span>Logout</span>
                  </li>
                )}
              </ul>
            </div>

            <hr className="sidebar-divider" />

            {/* Help Section */}
            <div className="sidebar-section">
              <h4>Help</h4>
              <ul>
                <li>
                  <span>Contact Us</span>
                </li>
                <li>
                  <span>FAQs</span>
                </li>
                <li>
                  <span>Returns</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Search (Mobile only) */}
      {showSearch && (
        <div className={`search-overlay ${closing ? "closing" : "opening"}`}>
          <form className="search-box" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search products..."
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="button"
              className="close-btn"
              onClick={handleCloseSearch}
            >
              <FiX />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default Navbar;


