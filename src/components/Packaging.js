import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Optional: for breadcrumbs
import { api } from "../api";

function Packaging() {
  const [packagings, setPackagings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch packaging data
  useEffect(() => {
    const fetchPackagings = async () => {
      try {
        const response = await api.get('/dashboard/packagings/list');
        setPackagings(response.data || []);
      } catch (err) {
        console.error("Failed to fetch packagings:", err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPackagings();
  }, []);

  return (
    <div className="container" style={{ paddingTop: "40px", paddingBottom: "80px" }}>
      
      {/* --- PAGE HEADER --- */}
      <div className="section-title">
        <p className="subtitle">OUR PACKAGING</p>
        <h2>Durable & Safe Packaging Solutions</h2>
        <p style={{ color: "#666", maxWidth: "600px", margin: "10px auto" }}>
          Explore our range of high-quality containers, drums, and bulk packaging designed to protect your chemicals during storage and transit.
        </p>
      </div>

      {/* --- LOADING STATE --- */}
      {isLoading && (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <i className="fas fa-spinner fa-spin" style={{ color: "#002D5A", fontSize: "2rem" }}></i>
          <p style={{ marginTop: "15px", color: "#555" }}>Loading packaging options...</p>
        </div>
      )}

      {/* --- EMPTY STATE --- */}
      {!isLoading && packagings.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#888" }}>
          <h3>No packaging options available yet.</h3>
          <p>Please check back later.</p>
        </div>
      )}

      {/* --- PACKAGING GRID (Reuses existing product-grid/card classes) --- */}
      {!isLoading && packagings.length > 0 && (
        <div className="product-grid">
          {packagings.map((item) => (
            <div className="product-card" key={item._id}>
              <div className="icon-wrapper">
                {item.imageUrl ? (
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    style={{ width: '50px', height: '50px', objectFit: 'contain' }} 
                  />
                ) : (
                  <i className="fas fa-box-open"></i>
                )}
              </div>
              <h3>{item.name}</h3>
              <p style={{ fontSize: "0.85rem", color: "#002D5A", fontWeight: "600" }}>
                {item.type || "General"} | {item.capacity || "N/A"}
              </p>
              <p>{item.material ? `Material: ${item.material}` : "High-quality packaging material"}</p>
              {/* Optional: Add an enquiry link if you want */}
              <Link to="/contact" className="view-link">
                ENQUIRE NOW <i className="fas fa-arrow-right" style={{ fontSize: "0.8rem", marginLeft: "5px" }}></i>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Packaging;