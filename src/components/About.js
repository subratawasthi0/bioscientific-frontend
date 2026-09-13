import React from "react";
import "../styles/About.css";

function About() {
  return (
    <div className="about-page-wrapper">
      
      <div className="about-page-header">
        <h1>About Us</h1>
        <p>Leading the way in chemical innovation since 1998</p>
      </div>

      <div className="about-page-container">
        
        <div className="about-page-hero">
          <div className="about-page-image">
            <img src="/image7.jpg" alt="Our Factory" />
          </div>

          <div className="about-page-text">
            <p className="about-page-subtitle">Our Story</p>
            <h2>Reliable Partner. Superior Solutions.</h2>
            <p>Name Chemicals was founded with a vision to provide high-quality chemical solutions to industries worldwide. With state-of-the-art manufacturing facilities and a dedicated R&D team, we ensure that every product meets international standards.</p>
            <p>Our commitment to sustainability and innovation drives us to develop eco-friendly solutions without compromising on performance.</p>

            <div className="about-page-stats">
              <div className="about-page-stat-box">
                <i className="fas fa-award about-page-stat-icon"></i>
                <div>
                  <div className="about-page-stat-number">25+</div>
                  <div className="about-page-stat-label">Years of Excellence</div>
                </div>
              </div>
              <div className="about-page-stat-box">
                <i className="fas fa-users about-page-stat-icon"></i>
                <div>
                  <div className="about-page-stat-number">500+</div>
                  <div className="about-page-stat-label">Global Clients</div>
                </div>
              </div>
              <div className="about-page-stat-box">
                <i className="fas fa-globe about-page-stat-icon"></i>
                <div>
                  <div className="about-page-stat-number">10+</div>
                  <div className="about-page-stat-label">Countries Served</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* THE PERFECT WHITE BOX */}
        <div className="about-page-cards-grid">
          <div className="about-page-card-item">
            <div className="about-page-card-icon">
              <i className="fa-regular fa-bullseye"></i> 
            </div>
            <h3>Our Mission</h3>
            <p>To deliver innovative and sustainable chemical solutions that empower industries and improve lives.</p>
          </div>
          
          <div className="about-page-card-item">
            <div className="about-page-card-icon">
              <i className="fa-regular fa-eye"></i>
            </div>
            <h3>Our Vision</h3>
            <p>To become a global leader in specialty chemicals, recognized for quality, innovation, and sustainability.</p>
          </div>
          
          <div className="about-page-card-item">
            <div className="about-page-card-icon">
              <i className="fa-regular fa-handshake"></i>
            </div>
            <h3>Our Values</h3>
            <p>Integrity, excellence, environmental stewardship, and customer-centricity in everything we do.</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default About;