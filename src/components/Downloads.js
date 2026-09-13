import React, { useState, useEffect } from "react";
import { api } from "../api";
import "../styles/Downloads.css";

function Downloads() {
  const [catalogues, setCatalogues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCatalogues = async () => {
      try {
        const response = await api.get('/dashboard/catalogues/list');
        setCatalogues(response.data || []);
      } catch (err) {
        console.error("Failed to fetch catalogues:", err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCatalogues();
  }, []);

  const filteredCatalogues = catalogues.filter((item) => {
    return item.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
           item.productCategory?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="downloads-page">
      
      <div className="downloads-header">
        <h1>Product Catalogues & Resources</h1>
        <p>Download our latest product catalogues and useful resources.</p>
        <div className="downloads-header-image">
          <img src="/image18.jpg" alt="Laboratory Glassware" />
        </div>
      </div>

      {/* <div className="downloads-search-bar">
        <input 
          type="text" 
          placeholder="Search by catalogue name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button aria-label="Search"><i className="fas fa-search"></i></button>
      </div> */}

      {isLoading && (
        <div className="downloads-loading">
          <i className="fas fa-spinner fa-spin" style={{ color: "#002D5A" }}></i>
          <p>Loading catalogues...</p>
        </div>
      )}

      {!isLoading && catalogues.length === 0 && (
        <div className="downloads-empty">
          <i className="fas fa-file-pdf" style={{ fontSize: "3rem", color: "#ddd", marginBottom: "15px" }}></i>
          <h3>No catalogues available yet.</h3>
          <p>Please check back later for new resources.</p>
        </div>
      )}

      {!isLoading && catalogues.length > 0 && filteredCatalogues.length === 0 && (
        <div className="downloads-empty">
          <h4>No catalogues found matching your search.</h4>
        </div>
      )}

      {!isLoading && filteredCatalogues.length > 0 && (
        <div className="downloads-grid">
          {filteredCatalogues.map((catalogue) => (
            <div className="download-card" key={catalogue._id}>
              
              <div className="download-icon-box">
                <i className="fas fa-file-pdf"></i>
              </div>
              
              <div className="download-content">
                <h3>{catalogue.title}</h3>
                <p>{catalogue.description || "Comprehensive guide to our industrial products."}</p>
                <span className="download-tag">{catalogue.productCategory || "General"}</span>
              </div>
              
              <div className="download-card-footer">
                <div className="download-stats">
                  <div className="download-stat">
                    <span className="download-stat-label">Type</span>
                    <span className="download-stat-value">PDF</span>
                  </div>
                  <div className="download-stat">
                    <span className="download-stat-label">Size</span>
                    <span className="download-stat-value">2.4 MB</span>
                  </div>
                </div>
                
                <a 
                  href={catalogue.fileUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="download-btn"
                >
                  <i className="fas fa-download"></i> PDF
                </a>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Downloads;