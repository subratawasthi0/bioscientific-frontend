import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { api } from "../api";
import "../styles/ProductTemplates.css";

function Products() {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(
    categoryFromUrl || "All",
  );

  // --- Modal State ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);

  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Update category when URL changes (from navbar)
  useEffect(() => {
    setCategoryFilter(categoryFromUrl || "All");
    setCurrentPage(1);
  }, [categoryFromUrl]);

  // Fetch product list
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true); // Show skeleton on new fetch
      try {
        const response = await api.get("/dashboard/products/list");
        setProducts(response.data || []);
      } catch (err) {
        console.error("Failed to fetch products:", err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleViewDetails = async (id) => {
    setIsDetailLoading(true);
    setIsModalOpen(true);
    try {
      const response = await api.get(`/dashboard/products/${id}`);
      setSelectedProduct(response.data);
    } catch (err) {
      alert("Failed to load product details: " + err.message);
      setIsModalOpen(false);
    } finally {
      setIsDetailLoading(false);
    }
  };

  // --- FILTERING ---
  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      categoryFilter === "All" || p.category === categoryFilter;
    const matchesSearch =
      p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // --- PAGINATION ---
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentItems = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);

  return (
    <div className="product-page-container">
      {/* --- BANNER IMAGE --- */}
      <div
        className="product-page-banner"
        style={{
          backgroundImage: "url('/image16.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
        }}
      >
        <div className="banner-text">
          <h1>{categoryFilter === "All" ? "All Products" : categoryFilter}</h1>
          <p>
            High quality laboratory chemicals and glassware for safe and
            reliable performance.
          </p>
        </div>
      </div>

      {/* --- BREADCRUMB --- */}
      <div className="breadcrumb">
        <Link to="/">Home</Link> <span>/</span> <span>Products</span>
      </div>

      {/* --- FILTER BAR --- */}
      <div className="product-filter-bar">
        <input
          type="text"
          className="product-search-input"
          placeholder="Search by product name or category..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <select
          className="product-filter-select"
          value={categoryFilter}
          onChange={(e) => {
            setCategoryFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="All">All Categories</option>
          <option value="Laboratory Chemicals">Laboratory Chemicals</option>
          <option value="Laboratory Glasswares">Laboratory Glasswares</option>
        </select>
      </div>

      {/* --- SKELETON LOADING STATE --- */}
      {isLoading && (
        <div className="modern-table-wrap">
          <table className="modern-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((n) => (
                <tr key={n}>
                  <td className="skeleton-row"></td>
                  <td className="skeleton-row"></td>
                  <td className="skeleton-row"></td>
                  <td className="skeleton-row"></td>
                  <td className="skeleton-row"></td>
                  <td className="skeleton-row"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* --- EMPTY STATE --- */}
      {!isLoading && filteredProducts.length === 0 && (
        <div className="empty-state">
          <h3>No products found.</h3>
          <p>Try adjusting your search or filter.</p>
        </div>
      )}

      {/* --- MODERN TABLE VIEW --- */}
      {!isLoading && filteredProducts.length > 0 && (
        <>
          <div className="modern-table-wrap">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((product, index) => (
                  <tr
                    key={product._id}
                    onClick={() => handleViewDetails(product._id)}
                  >
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td className="product-name-cell">{product.name}</td>
                    <td className="category-cell">{product.category}</td>
                    <td className="price-cell">${product.price}</td>
                    <td className="stock-cell">{product.stockQuantity || 0}</td>
                    <td>
                      <button
                        className="view-btn-table"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click from firing twice
                          handleViewDetails(product._id);
                        }}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* --- PAGINATION --- */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="page-btn"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <div className="pagination-numbers">
                {pageNumbers.map((num) => (
                  <button
                    key={num}
                    className={`page-btn ${currentPage === num ? "active" : ""}`}
                    onClick={() => setCurrentPage(num)}
                  >
                    {num}
                  </button>
                ))}
              </div>
              <button
                className="page-btn"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* --- PREMIUM DETAILS MODAL --- */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Gradient Header */}
            <div className="modal-header">
              <h3
                className="modal-title"
                style={{ color: "#fff", borderBottom: "none" }}
              >
                {isDetailLoading ? "Loading..." : selectedProduct?.name}
              </h3>
              <button
                className="modal-close-btn"
                onClick={() => setIsModalOpen(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            {/* Body Content */}
            <div className="modal-body">
              {isDetailLoading ? (
                <div style={{ textAlign: "center", padding: "30px" }}>
                  <i
                    className="fas fa-spinner fa-spin fa-2x"
                    style={{ color: "#0AA5AD" }}
                  ></i>
                </div>
              ) : (
                selectedProduct && (
                  <div>
                    {/* Specs Grid */}
                    <div className="detail-grid">
                      <div className="detail-item">
                        <div className="detail-label">
                          <i className="fas fa-tag"></i> Category
                        </div>
                        <div className="detail-value">
                          {selectedProduct.category || "N/A"}
                        </div>
                      </div>

                      <div className="detail-item">
                        <div className="detail-label">
                          <i className="fas fa-hashtag"></i> CAS Number
                        </div>
                        <div className="detail-value">
                          {selectedProduct.casNumber || "N/A"}
                        </div>
                      </div>

                      <div className="detail-item">
                        <div className="detail-label">
                          <i className="fas fa-flask"></i> Formula
                        </div>
                        <div className="detail-value">
                          {selectedProduct.chemicalFormula || "N/A"}
                        </div>
                      </div>

                      <div className="detail-item">
                        <div className="detail-label">
                          <i className="fas fa-dollar-sign"></i> Price
                        </div>
                        <div className="detail-value">
                          ${selectedProduct.price || "N/A"}
                        </div>
                      </div>
                    </div>

                    {/* Description Section */}
                    {selectedProduct.description && (
                      <div className="description-section">
                        <h4>
                          <i className="fas fa-align-left"></i> Description
                        </h4>
                        <p>{selectedProduct.description}</p>
                      </div>
                    )}
                  </div>
                )
              )}
            </div>

            {/* Footer */}
            <div className="modal-footer">
              {/* <button type="button" className="btn-close-modal" onClick={() => setIsModalOpen(false)}>
                Close
              </button> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
