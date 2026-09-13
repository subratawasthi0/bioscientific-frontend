import React from "react";
import { Link } from "react-router-dom"; // 👈 Import Link

function Events() {
  const upcoming = [
    { src: "/idmwbSRRx4_logos.png", alt: "ICC", date: "26 - 28 November 2024", title: "ICC Annual Conference 2024", location: "India Expo Centre, Greater Noida" },
    { src: "/chemspec-europe-logo-vector.png", alt: "Chemspec", date: "05 - 06 June 2024", title: "Chemspec Europe 2024", location: "Koelnmesse, Cologne, Germany" },
    { src: "/iduBzsPe-8_1785830344236.png", alt: "CPM", date: "04 - 06 December 2024", title: "CPM India 2024", location: "Bombay Exhibition Centre, Mumbai" }
  ];

  const pastEvents = [
    { title: "Chemical Expo 2023", date: "15-17 Oct 2023", location: "Mumbai" },
    { title: "Green Chemistry Summit", date: "20-22 Aug 2023", location: "Delhi" },
    { title: "Industrial Solvents Forum", date: "10-12 May 2023", location: "Chennai" }
  ];

  return (
    <div className="page-container">
      <div className="page-header" style={{ background: "#1A3C8F", color: "white", padding: "60px 0", textAlign: "center" }}>
        <h1>Events</h1>
        <p>Where innovation meets industry – join us at our upcoming events</p>
      </div>

      <div className="container" style={{ padding: "60px 0" }}>
        <h2 style={{ color: "#1A3C8F", marginBottom: "40px" }}>Upcoming Events</h2>
        <div className="events-grid" style={{ marginBottom: "60px" }}>
          {upcoming.map((event, index) => (
            <div className="event-card" key={index}>
              <div className="event-logo-area"><img src={event.src} alt={event.alt} /></div>
              <div className="event-details">
                <div className="event-meta"><i className="fas fa-calendar-alt"></i><span>{event.date}</span></div>
                <h4>{event.title}</h4>
                <div className="event-location"><i className="fas fa-map-marker-alt"></i><span>{event.location}</span></div>
                <Link to="/contact" className="btn-primary" style={{ marginTop: "15px", textAlign: "center", justifyContent: "center", fontSize: "0.8rem", padding: "8px 15px" }}>Register Now</Link> {/* Fixed */}
              </div>
            </div>
          ))}
        </div>

        <hr style={{ margin: "40px 0", borderColor: "#eee" }} />

        <h2 style={{ color: "#1A3C8F", marginBottom: "30px" }}>Past Events</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
          {pastEvents.map((event, idx) => (
            <div key={idx} style={{ background: "#f8fafc", padding: "25px", borderRadius: "12px", borderLeft: "4px solid #1A3C8F" }}>
              <h4>{event.title}</h4>
              <p><i className="fas fa-calendar-alt" style={{ color: "#1A3C8F", marginRight: "10px" }}></i>{event.date}</p>
              <p><i className="fas fa-map-marker-alt" style={{ color: "#1A3C8F", marginRight: "10px" }}></i>{event.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Events;