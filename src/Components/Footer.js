import React from 'react';
import './Component.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <FooterSection title="MediConnect">
                    <p>Your trusted partner in advanced medical care and regenerative medicine since 2017.</p>
                </FooterSection>
                <FooterSection title="Quick Links">
                    <ul className="footer-links">
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#services">Our Services</a></li>
                        <li><a href="#why-us">Why Choose Us</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </FooterSection>
                <FooterSection title="Services">
                    <ul className="footer-links">
                        <li><a href="#">Stem Cell Therapy</a></li>
                        <li><a href="#">Medical Tourism</a></li>
                        <li><a href="#">Consultations</a></li>
                        <li><a href="#">Wellness Programs</a></li>
                    </ul>
                </FooterSection>
                <FooterSection title="Contact Info">
                    <p>📧 info@MediConnect.health</p>
                    <p>📱 +1 (555) 123-4567</p>
                    <p>📍 Medical District, Healthcare City</p>
                </FooterSection>
            </div>
            <div className="copyright">
                <p>&copy; 2025 MediConnect. All rights reserved. | Privacy Policy | Terms of Service</p>
            </div>
        </footer>
    );
};

const FooterSection = ({ title, children }) => (
  <div className="footer-section">
    <h3>{title}</h3>
    {children}
  </div>
);

export default Footer;