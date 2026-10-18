import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { api } from "../api";
import "../styles/ProductTemplates.css";

const getPayload = (response) =>
  response?.data?.data ?? response?.data ?? response;

const getCategoryName = (product) =>
  typeof product?.primaryCategory === "object"
    ? (product.primaryCategory?.name ?? "N/A")
    : "N/A";

const getSubCategoryName = (product) =>
  typeof product?.secondaryCategory === "object"
    ? (product.secondaryCategory?.name ?? "N/A")
    : "N/A";

const getStartingPrice = (product) => {
  const prices = (product?.variants ?? [])
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

  // Server-side pagination: fetch 10 products for the selected page.
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 50,
    totalProducts: 0,
    totalPages: 0,
  });
  const itemsPerPage = 50;

  // Load categories once.
  useEffect(() => {
    let cancelled = false;

    const fetchCategories = async () => {
      try {
        const response = await api.get("/dashboard/categories/list");
        const data = getPayload(response);

        if (!cancelled) {
          setCategories(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Failed to load categories:", error);
        if (!cancelled) setCategories([]);
      }
    };

    fetchCategories();
    return () => {
      cancelled = true;
    };
  }, []);

  // Support category links from the Home page and URL changes.
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");

    if (!categoryFromUrl) {
      setCategoryId("All");
      setCurrentPage(1);
      return;
    }

    const matchedCategory = categories.find(
      (category) =>
        category._id === categoryFromUrl ||
        category.name === categoryFromUrl ||
        category.slug === categoryFromUrl,
    );

    setCategoryId(matchedCategory?._id ?? categoryFromUrl);
    setCurrentPage(1);
  }, [categories, searchParams]);

  
  // Fetch products whenever page, search, category, or subcategory changes
  useEffect(() => {
    let cancelled = false;

    const fetchProducts = async () => {
      setIsLoading(true);

      try {
        // Build the URL with ALL active filters
        const queryParams = new URLSearchParams({
          page: currentPage,
          limit: itemsPerPage,
          search: searchTerm.trim(),
        });

        // Only append if a specific category is selected
        if (categoryId !== "All") {
          queryParams.append("categoryId", categoryId);
        }
        
        // Only append if a specific subcategory is selected
        if (subCategoryId !== "All") {
          queryParams.append("subCategoryId", subCategoryId);
        }

        const response = await api.get(
          `/dashboard/products/list?${queryParams.toString()}`
        );
        
        const payload = getPayload(response);

        // Handle the { products, pagination } structure returned by your backend
        const productList = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.products)
            ? payload.products
            : [];

        setProducts(productList);

        setPagination(
          payload?.pagination ?? {
            currentPage,
            limit: itemsPerPage,
            totalProducts: productList.length,
            totalPages: 1,
          }
        );
      } catch (error) {
        console.error("Failed to load products:", error);
        if (!cancelled) {
          setProducts([]);
          setPagination({
            currentPage: 1,
            limit: itemsPerPage,
            totalProducts: 0,
            totalPages: 0,
          });
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchProducts();

    return () => {
      cancelled = true;
    };
  }, [currentPage, itemsPerPage, searchTerm, categoryId, subCategoryId]); // 👈 ADDED category and subcategory dependencies

  // Load subcategories when the category changes.
  useEffect(() => {
    let cancelled = false;

    const fetchSubCategories = async () => {
      setSubCategoryId("All");
      setSubCategories([]);

      if (categoryId === "All") {
        setIsSubCategoryLoading(false);
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
        if (!cancelled) setSubCategories([]);
      } finally {
        if (!cancelled) setIsSubCategoryLoading(false);
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

  // These filters currently apply to the 10 products on the loaded API page.
  // For global search/filtering, the backend list API must accept these filters.
  // const filteredProducts = products.filter((product) => {
  //   const productCategoryId =
  //     typeof product.primaryCategory === "object"
  //       ? product.primaryCategory?._id
  //       : product.primaryCategory;

  //   const productSubCategoryId =
  //     typeof product.secondaryCategory === "object"
  //       ? product.secondaryCategory?._id
  //       : product.secondaryCategory;

  //   const matchesCategory =
  //     categoryId === "All" || productCategoryId === categoryId;

  //   const matchesSubCategory =
  //     subCategoryId === "All" || productSubCategoryId === subCategoryId;

  //   const search = searchTerm.trim().toLowerCase();
  //   const matchesSearch =
  //     !search ||
  //     product.productName?.toLowerCase().includes(search) ||
  //     product.catNo?.toLowerCase().includes(search) ||
  //     product.cas?.toLowerCase().includes(search) ||
  //     getCategoryName(product).toLowerCase().includes(search) ||
  //     getSubCategoryName(product).toLowerCase().includes(search);

  //     const filteredProducts = products;
  //   return matchesCategory && matchesSubCategory && matchesSearch;
  // });

    // Backend already filters and paginates, so we just use the products directly
  const filteredProducts = products;
  
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

      {/* Search and filters */}
      <div className="product-filter-bar">
        <input
          type="text"
          className="product-search-input"
          placeholder="Search by product name, Cat No, or CAS..."
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
            setCurrentPage(1);
          }}
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
          onChange={(event) => {
            setSubCategoryId(event.target.value);
            setCurrentPage(1);
          }}
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

      {!isLoading && (
        <p style={{ margin: "12px 0" }}>
          Showing {filteredProducts.length} products on this page out of{" "}
          {pagination.totalProducts} total products
        </p>
      )}

      {isLoading && (
        <div className="empty-state">
          <p>Loading products...</p>
        </div>
      )}

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
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <tr key={product._id}>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td>{product.catNo || "N/A"}</td>
                    <td className="product-name-cell">
                      {product.productName || "N/A"}
                    </td>
                    <td className="cas-no-cell">{product.cas || "N/A"}</td>
                    <td className="category-cell">
                      {getCategoryName(product)}
                    </td>
                    <td>{getSubCategoryName(product)}</td>
                    <td>
                      {(product.variants ?? [])
                        .map((variant) => variant.pack)
                        .join(", ") || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination driven by the backend response */}
          {/* Simple pagination: Previous, page count, Next */}
          {pagination.totalPages > 0 && (
            <div className="pagination">
              <button
                type="button"
                className="page-btn"
                disabled={currentPage <= 1 || isLoading}
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              >
                Previous
              </button>

              <span className="pagination-info">
                Page {currentPage} of {pagination.totalPages}
              </span>

              <button
                type="button"
                className="page-btn"
                disabled={currentPage >= pagination.totalPages || isLoading}
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.min(pagination.totalPages, page + 1),
                  )
                }
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
                            </tr>
                          </thead>
                          <tbody>
                            {selectedProduct.variants.map((variant) => (
                              <tr key={variant._id || variant.pack}>
                                <td>{variant.pack || "N/A"}</td>
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
                      <strong>Classification: </strong>
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
