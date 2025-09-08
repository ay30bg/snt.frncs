import React from "react";
import { FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <hr className="horizontal-rule" />
        {/* Brand Info */}
        <div className="footer-brand">
          <h2>SNT.FRNCS</h2>
          <p>Sacred style, Bold Faith</p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h3>SHOP</h3>
          <ul>
            <li><a href="/new-arrivals">NEW COLLECTION</a></li>
            <li><a href="/hoodies">HOODIES</a></li>
            <li><a href="/tees">TEES</a></li>
            <li><a href="/caps">CAPS</a></li>
          </ul>
        </div>

        <div className="footer-links">
          <h3>COMPANY</h3>
          <ul>
            <li><a href="/about">ABOUT US</a></li>
            <li><a href="/contact">CONTACT</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/shipping">SHIPPING</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-newsletter">
          <h3>JOIN THE VIBE</h3>
          <p>SIGN UP FOR EXCLUSIVE DROPS & BRAND NEWS</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Your email" className="newsletter-email"/>
            <button type="submit">SUBSCRIBE</button>
          </form>
        </div>
      </div>

      {/* Social Media & Copyright */}
      <div className="footer-bottom">
        <div className="social-icons">
          <a href="https://www.instagram.com/sntfrncs.ww?igsh=dHFwdHgzb3Fmem5y&utm_source=qr"><FaInstagram /></a>
          <a href="https://facebook.com"><FaFacebookF /></a>
          <a href="https://x.com/sntfrncs?s=21"><BsTwitterX /></a>
          <a href="https://www.tiktok.com/@sntfrncsww?_t=ZS-8zVQEfyN0uG&_r=1"><FaTiktok /></a>
        </div>
        <p>© {new Date().getFullYear()} Snt.Frncs Worldwide. All rights reserved.</p>
      </div>
    </footer>
  );
}
