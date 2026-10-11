
import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { api } from "../api";
import "../styles/ProductTemplates.css";

const getPayload = (response) =>
  response?.data?.data ?? response?.data ?? response;

const getCategoryName = (product) =>
  typeof product.primaryCategory === "object"
    ? (product.primaryCategory?.name ?? "N/A")
    : "N/A";

const getSubCategoryName = (product) =>
  typeof product.secondaryCategory === "object"
    ? (product.secondaryCategory?.name ?? "N/A")
    : "N/A";

const getStartingPrice = (product) => {
  const prices = (product.variants ?? [])
    .map((variant) => Number(variant.price))
    .filter((price) => Number.isFinite(price));

  return prices.length ? Math.min(...prices) : null;
};

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [categoryId, setCategoryId] = useState(
    searchParams.get("category") || "All",
  );
  const [subCategoryId, setSubCategoryId] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSubCategoryLoading, setIsSubCategoryLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  // Load categories and all products.
  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);

      try {
        const [categoryResponse, productResponse] = await Promise.all([
          api.get("/dashboard/categories/list"),
          api.get("/dashboard/products/list"),
        ]);

        const categoryData = getPayload(categoryResponse);
        const productData = getPayload(productResponse);

        setCategories(Array.isArray(categoryData) ? categoryData : []);

        setProducts(Array.isArray(productData) ? productData : []);
      } catch (error) {
        console.error("Failed to load products:", error);
        setCategories([]);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Support category links from Home page and URL changes.
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");

    if (!categoryFromUrl) {
      setCategoryId("All");
      return;
    }

    const matchedCategory = categories.find(
      (category) =>
        category._id === categoryFromUrl ||
        category.name === categoryFromUrl ||
        category.slug === categoryFromUrl,
    );

    setCategoryId(matchedCategory?._id ?? categoryFromUrl);
  }, [categories, searchParams]);

  // Load subcategories whenever the selected category changes.
  useEffect(() => {
    let cancelled = false;

    const fetchSubCategories = async () => {
      setSubCategoryId("All");
      setSubCategories([]);

      if (categoryId === "All") {
        return;
      }

      setIsSubCategoryLoading(true);

      try {
        const response = await api.get(
          `/dashboard/subcategories/list?categoryId=${encodeURIComponent(categoryId)}`,
        );

        const data = getPayload(response);

        if (!cancelled) {
          setSubCategories(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Failed to load subcategories:", error);

        if (!cancelled) {
          setSubCategories([]);
        }
      } finally {
        if (!cancelled) {
          setIsSubCategoryLoading(false);
        }
      }
    };

    fetchSubCategories();

    return () => {
      cancelled = true;
    };
  }, [categoryId]);

  const handleCategoryChange = (value) => {
    setCategoryId(value);
    setSubCategoryId("All");
    setCurrentPage(1);

    if (value === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category: value });
    }
  };

  const handleViewDetails = async (id) => {
    setIsModalOpen(true);
    setIsDetailLoading(true);
    setSelectedProduct(null);

    try {
      const response = await api.get(`/dashboard/products/${id}`);

      setSelectedProduct(getPayload(response));
    } catch (error) {
      console.error("Failed to load product details:", error);
      setIsModalOpen(false);
      alert("Failed to load product details.");
    } finally {
      setIsDetailLoading(false);
    }
  };

  // Filter all products by category, subcategory, and search.
  const filteredProducts = products.filter((product) => {
    const productCategoryId =
      typeof product.primaryCategory === "object"
        ? product.primaryCategory?._id
        : product.primaryCategory;

    const productSubCategoryId =
      typeof product.secondaryCategory === "object"
        ? product.secondaryCategory?._id
        : product.secondaryCategory;

    const matchesCategory =
      categoryId === "All" || productCategoryId === categoryId;

    const matchesSubCategory =
      subCategoryId === "All" || productSubCategoryId === subCategoryId;

    const search = searchTerm.trim().toLowerCase();

    const matchesSearch =
      !search ||
      product.productName?.toLowerCase().includes(search) ||
      product.catNo?.toLowerCase().includes(search) ||
      product.cas?.toLowerCase().includes(search) ||
      getCategoryName(product).toLowerCase().includes(search) ||
      getSubCategoryName(product).toLowerCase().includes(search);

    return matchesCategory && matchesSubCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const currentItems = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [categoryId, subCategoryId, searchTerm]);

  const clearFilters = () => {
    setSearchTerm("");
    setCategoryId("All");
    setSubCategoryId("All");
    setCurrentPage(1);
    setSearchParams({});
  };

  const activeCategory = categories.find(
    (category) => category._id === categoryId,
  );

  const activeSubCategory = subCategories.find(
    (subCategory) => subCategory._id === subCategoryId,
  );

  return (
    <div className="product-page-container">
      {/* Banner */}
      <div
        className="product-page-banner"
        style={{
          backgroundImage: "url('/image16.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
        }}
      >
        <div className="banner-text">
          <h1>
            {activeSubCategory?.name || activeCategory?.name || "All Products"}
          </h1>

          <p>
            Explore our range of high-quality laboratory chemicals, reagents,
            and specialty products.
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <span>Products</span>

        {activeCategory && (
          <>
            <span>/</span>
            <span>{activeCategory.name}</span>
          </>
        )}

        {activeSubCategory && (
          <>
            <span>/</span>
            <span>{activeSubCategory.name}</span>
          </>
        )}
      </div>

      {/* Category and subcategory filters */}
      <div className="product-filter-bar">
        <input
          type="text"
          className="product-search-input"
          placeholder="Search by product name, Cat No, or CAS..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <select
          className="product-filter-select"
          value={categoryId}
          onChange={(event) => handleCategoryChange(event.target.value)}
        >
          <option value="All">All Categories</option>

          {categories
            .filter((category) => category.isActive !== false)
            .map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>

        <select
          className="product-filter-select"
          value={subCategoryId}
          disabled={categoryId === "All" || isSubCategoryLoading}
          onChange={(event) => setSubCategoryId(event.target.value)}
        >
          <option value="All">
            {isSubCategoryLoading
              ? "Loading subcategories..."
              : "All Subcategories"}
          </option>

          {subCategories
            .filter((subCategory) => subCategory.isActive !== false)
            .map((subCategory) => (
              <option key={subCategory._id} value={subCategory._id}>
                {subCategory.name}
              </option>
            ))}
        </select>

        <button type="button" className="view-btn-table" onClick={clearFilters}>
          All Products
        </button>
      </div>

      {/* Results count */}
      {!isLoading && (
        <p style={{ margin: "12px 0" }}>
          Showing {filteredProducts.length} product(s)
        </p>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="empty-state">
          <p>Loading products...</p>
        </div>
      )}

      {/* Empty results */}
      {!isLoading && filteredProducts.length === 0 && (
        <div className="empty-state">
          <h3>No products found.</h3>
          <p>Try another category or search term.</p>

          <button
            type="button"
            className="view-btn-table"
            onClick={clearFilters}
          >
            View All Products
          </button>
        </div>
      )}

      {/* Products table */}
      {!isLoading && filteredProducts.length > 0 && (
        <>
          <div className="modern-table-wrap">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Cat No</th>
                  <th>Product Name</th>
                  <th>CAS</th>
                  <th>Category</th>
                  <th>Subcategory</th>
                  <th>Available Packs</th>
                  {/* <th>Starting Price</th> */}
                  {/* <th>Actions</th> */}
                </tr>
              </thead>

              <tbody>
                {currentItems.map((product, index) => (
                  <tr key={product._id}>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>

                    <td>{product.catNo}</td>

                    <td className="product-name-cell">{product.productName}</td>
                     
                    <td className="cas-no-cell">{product.cas}</td>
                    <td className="category-cell">
                      {getCategoryName(product)}
                    </td>

                    <td>{getSubCategoryName(product)}</td>

                    <td>
                      {(product.variants ?? [])
                        .map((variant) => variant.pack)
                        .join(", ") || "N/A"}
                    </td>

                    {/* <td className="price-cell">
                      {getStartingPrice(product) !== null
                        ? `₹${getStartingPrice(product).toLocaleString("en-IN")}`
                        : "Contact for price"}
                    </td> */}


                    {/* <td>
                      <button
                        type="button"
                        className="view-btn-table"
                        onClick={() =>
                          handleViewDetails(product._id)
                        }
                      >
                        View Details
                      </button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                type="button"
                className="page-btn"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((page) => page - 1)}
              >
                Previous
              </button>

              <div className="pagination-numbers">
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1,
                ).map((page) => (
                  <button
                    type="button"
                    key={page}
                    className={`page-btn ${
                      currentPage === page ? "active" : ""
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="page-btn"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((page) => page + 1)}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* Product details modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div
            className="modal-content"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-header">
              <h3 className="modal-title">
                {isDetailLoading
                  ? "Loading..."
                  : selectedProduct?.productName || "Product Details"}
              </h3>

              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setIsModalOpen(false)}
              >
                <i className="fas fa-times" />
              </button>
            </div>

            <div className="modal-body">
              {isDetailLoading ? (
                <p>Loading product details...</p>
              ) : selectedProduct ? (
                <>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <div className="detail-label">Cat No</div>
                      <div className="detail-value">
                        {selectedProduct.catNo || "N/A"}
                      </div>
                    </div>

                    <div className="detail-item">
                      <div className="detail-label">CAS Number</div>
                      <div className="detail-value">
                        {selectedProduct.cas || "N/A"}
                      </div>
                    </div>

                    <div className="detail-item">
                      <div className="detail-label">HSN</div>
                      <div className="detail-value">
                        {selectedProduct.hsn || "N/A"}
                      </div>
                    </div>

                    {/* <div className="detail-item">
                      <div className="detail-label">
                        GST
                      </div>
                      <div className="detail-value">
                        {selectedProduct.gst ?? 0}%
                      </div>
                    </div> */}

                    <div className="detail-item">
                      <div className="detail-label">Category</div>
                      <div className="detail-value">
                        {getCategoryName(selectedProduct)}
                      </div>
                    </div>

                    <div className="detail-item">
                      <div className="detail-label">Subcategory</div>
                      <div className="detail-value">
                        {getSubCategoryName(selectedProduct)}
                      </div>
                    </div>
                  </div>

                  <div className="description-section">
                    <h4>Pack Sizes</h4>

                    {(selectedProduct.variants ?? []).length > 0 ? (
                      <div className="modern-table-wrap">
                        <table className="modern-table">
                          <thead>
                            <tr>
                              <th>Pack</th>
                              {/* <th>Old Price</th>
                              <th>Price</th> */}
                            </tr>
                          </thead>

                          <tbody>
                            {selectedProduct.variants.map((variant) => (
                              <tr key={variant._id || variant.pack}>
                                <td>{variant.pack}</td>
                                {/* <td>
                                    {variant.oldPrice != null
                                      ? `₹${Number(variant.oldPrice).toLocaleString("en-IN")}`
                                      : "N/A"}
                                  </td> */}
                                {/* <td>
                                    {variant.price != null
                                      ? `₹${Number(variant.price).toLocaleString("en-IN")}`
                                      : "Contact for price"}
                                  </td> */}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p>No pack variants available.</p>
                    )}
                  </div>

                  {selectedProduct.classification && (
                    <p>
                      <strong>Classification:</strong>{" "}
                      {selectedProduct.classification}
                    </p>
                  )}
                </>
              ) : (
                <p>Product details could not be loaded.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
