import React from "react";
import { BsTwitterX, BsGeoAlt, BsTelephone, BsEnvelope, BsSnapchat } from "react-icons/bs";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import "../styles/contact.css";

export default function Contact() {
    return (
        <section className="contact">
            <div className="contact-container">
                <h1 className="contact-title">Get In Touch</h1>
                <p className="contact-intro">
                    Have a question, collab idea, or just want to say what’s up?
                    We’d love to hear from you.
                </p>

                <div className="contact-grid">
                    {/* Contact Form */}
                    <form className="contact-form">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" placeholder="Your name" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" placeholder="Your email" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea id="message" placeholder="Type your message..." required></textarea>
                        </div>

                        <button type="submit" className="send-btn">Send Message</button>
                    </form>

                    {/* Contact Info */}
                    <div className="contact-info">
                        <h3>Email</h3>
                        <p><BsEnvelope className="contact-icon" /> support@sntfrncs.com</p>

                        <h3>Phone</h3>
                        <p><BsTelephone className="contact-icon" /> +2348001234567</p>

                        <h3>Address</h3>
                        <p><BsGeoAlt className="contact-icon" /> Ikotun, Alimosho LGA, Lagos State</p>

                        <h3>Follow Us</h3>
                        <p>
                            <a href="https://www.instagram.com/sntfrncs.ww?igsh=dHFwdHgzb3Fmem5y&utm_source=qr" className="icon-link"><FaInstagram className="contact-social-icon" /></a>
                            <a href="https://snapchat.com/t/e55xAlB3" className="icon-link"><BsSnapchat className="contact-social-icon" /></a>
                            <a href="https://x.com/sntfrncs?s=21" className="icon-link"><BsTwitterX className="contact-social-icon" /></a>
                            <a href="https://www.tiktok.com/@sntfrncsww?_t=ZS-8zVQEfyN0uG&_r=1" className="icon-link"><FaTiktok className="contact-social-icon" /></a>
                        </p>
                    </div>
                </div>

                {/* Google Map */}
                <div className="contact-map">
                    <h3>Our Location</h3>
                    <iframe
                        title="Our Location"
                        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCOMQkM6SVXsI1bCntxRH684mqapDFbXRw&q=Ikotun+Alimosho,Lagos,Nigeria"
                        width="100%"
                        height="300"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </section>
    );
}
