import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ReactStars from "react-rating-stars-component";
import ProductCard from "../components/ProductCard";
import Color from "../components/Color";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/products/productSlilce";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";

const OurStore = () => {
  const navigate = useNavigate();
  const [grid, setGrid] = useState(4);
  const productState = useSelector((state) => state?.product?.product);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const [tags, setTags] = useState([]);
  const [allBrands, setAllBrands] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [allTags, setAllTags] = useState([]);

  //filter state
  const [tag, setTag] = useState(null);
  const [category, setCategory] = useState(null);
  const [brand, setBrand] = useState(null);
  const [minPrice, setminPrice] = useState(null);
  const [maxPrice, setmaxPrice] = useState(null);
  const [sort, setSort] = useState(null);

  const dispatch = useDispatch();

  // Extract filter options from products - this runs on every product state change
  useEffect(() => {
    let newBrands = [];
    let categoryList = [];
    let newtags = [];

    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      if (element.brand) newBrands.push(element.brand);
      if (element.category) categoryList.push(element.category);
      if (element.tags) newtags.push(element.tags);
    }
    
    const uniqueBrands = [...new Set(newBrands.map(b => b?.trim()))].filter(Boolean);
    const uniqueCategories = [...new Set(categoryList.map(c => c?.trim()))].filter(Boolean);
    const uniqueTags = [...new Set(newtags.map(t => t?.trim()))].filter(Boolean);
    
    // Update all filters with complete list
    setAllBrands(uniqueBrands);
    setAllCategories(uniqueCategories);
    setAllTags(uniqueTags);
    
    // Only update display brands if this is initial load (no filters applied)
    if (!brand && !category && !tag && !minPrice && !maxPrice) {
      setBrands(uniqueBrands);
      setCategories(uniqueCategories);
      setTags(uniqueTags);
    }
  }, [productState]);

  // Update display lists when filters change
  useEffect(() => {
    setBrands(allBrands);
    setCategories(allCategories);
    setTags(allTags);
  }, [allBrands, allCategories, allTags]);

  useEffect(() => {
    getProducts();
  }, [sort, tag, brand, category, minPrice, maxPrice]);

  const getProducts = () => {
    dispatch(
      getAllProducts({ sort, tag, brand, category, minPrice, maxPrice })
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setTag(null);
    setCategory(null);
    setBrand(null);
    setminPrice(null);
    setmaxPrice(null);
    setSort(null);
    dispatch(getAllProducts({}));
  };

  // Toggle filters (click to select, click again to deselect)
  const handleCategoryToggle = (categoryItem) => {
    setCategory(category === categoryItem ? null : categoryItem);
  };

  const handleBrandToggle = (brandItem) => {
    setBrand(brand === brandItem ? null : brandItem);
  };

  const handleTagToggle = (tagItem) => {
    setTag(tag === tagItem ? null : tagItem);
  };

  return (
    <>
      <Meta title={"Our Store"} />
      <div style={{ backgroundColor: "#f5f5f5", padding: "15px 0" }}>
        <Container class1="py-2">
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              onClick={() => navigate(-1)}
              style={{
                background: "#ffd700",
                border: "none",
                borderRadius: "8px",
                padding: "10px 16px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontWeight: "600",
                color: "#131921",
                fontSize: "14px",
                transition: "all 0.3s ease"
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#ffed4e")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#ffd700")}
            >
              <IoArrowBackOutline size={18} />
              Back
            </button>
            <h1 style={{ margin: "0", fontSize: "24px", fontWeight: "600", color: "#131921" }}>
              Our Store
            </h1>
          </div>
        </Container>
      </div>
      <Container class1="store-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-3">
            <div className="filter-card mb-3">
              <h3 className="filter-title" style={{ marginBottom: "16px", fontSize: "16px", fontWeight: "700", color: "#1c1c1b" }}>Find By Categories</h3>
              <div style={{ marginBottom: "12px" }}>
                <button 
                  onClick={clearFilters}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    backgroundColor: "#ffd700",
                    color: "#131921",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: "600",
                    cursor: "pointer",
                    fontSize: "13px",
                    transition: "all 0.3s ease",
                    marginBottom: "10px"
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#ffed4e")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#ffd700")}
                >
                  Clear All Filters
                </button>
              </div>
              <div>
                <ul className="ps-0" style={{ listStyle: "none" }}>
                  <li 
                    onClick={clearFilters}
                    style={{
                      color: category === null ? "#ffd700" : "#999",
                      cursor: "pointer",
                      padding: "10px 12px",
                      margin: "4px 0",
                      fontWeight: category === null ? "600" : "500",
                      fontSize: "14px",
                      backgroundColor: category === null ? "rgba(255, 215, 0, 0.1)" : "transparent",
                      borderRadius: "6px",
                      transition: "all 0.2s ease",
                      borderLeft: category === null ? "3px solid #ffd700" : "3px solid transparent"
                    }}
                    onMouseOver={(e) => {
                      if (category !== null) {
                        e.target.style.backgroundColor = "#f5f5f5";
                      }
                    }}
                    onMouseOut={(e) => {
                      if (category !== null) {
                        e.target.style.backgroundColor = "transparent";
                      }
                    }}
                  >
                    All
                  </li>

                  {categories &&
                    categories.map((item, index) => {
                      const isActive = category === item;
                      return (
                        <li 
                          key={index} 
                          onClick={() => handleCategoryToggle(item)}
                          style={{
                            color: isActive ? "#ffd700" : "#999",
                            fontWeight: isActive ? "600" : "500",
                            backgroundColor: isActive ? "rgba(255, 215, 0, 0.1)" : "transparent",
                            padding: "10px 12px",
                            margin: "4px 0",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontSize: "14px",
                            transition: "all 0.2s ease",
                            borderLeft: isActive ? "3px solid #ffd700" : "3px solid transparent"
                          }}
                          onMouseOver={(e) => {
                            if (!isActive) {
                              e.target.style.backgroundColor = "#f5f5f5";
                            }
                          }}
                          onMouseOut={(e) => {
                            if (!isActive) {
                              e.target.style.backgroundColor = "transparent";
                            }
                          }}
                        >
                          {item}
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Filter By</h3>
              <div>
                <h5 className="sub-title">Price</h5>
                <div className="d-flex align-items-center gap-10">
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput"
                      placeholder="From"
                      onChange={(e) => setminPrice(e.target.value)}
                    />
                    <label htmlFor="floatingInput">From</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput1"
                      placeholder="To"
                      onChange={(e) => setmaxPrice(e.target.value)}
                    />
                    <label htmlFor="floatingInput1">To</label>
                  </div>
                </div>
                {/* <h5 className="sub-title">Colors</h5>
                <div>
                  <Color />
                </div> */}
              </div>
              <div className="mt-4 mb-3">
                <h3 className="sub-title" style={{ marginBottom: "12px", fontSize: "14px", fontWeight: "700", color: "#1c1c1b" }}>Product Tags</h3>
                <div>
                  <div className="product-tags d-flex flex-wrap align-items-center" style={{ gap: "8px" }}>
                    {tags &&
                      tags.map((item, index) => {
                        const isActive = tag === item;
                        return (
                          <span
                            key={index}
                            onClick={() => handleTagToggle(item)}
                            className="text-capitalize"
                            style={{
                              backgroundColor: isActive ? "#ffd700" : "#e9ecef",
                              color: isActive ? "#131921" : "#6c757d",
                              fontWeight: isActive ? "600" : "500",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                              padding: "8px 14px",
                              borderRadius: "20px",
                              fontSize: "13px",
                              display: "inline-block",
                              border: isActive ? "2px solid #ffd700" : "2px solid #e9ecef"
                            }}
                            onMouseOver={(e) => {
                              if (!isActive) {
                                e.target.style.backgroundColor = "#f0f0f0";
                                e.target.style.borderColor = "#f0f0f0";
                              }
                            }}
                            onMouseOut={(e) => {
                              if (!isActive) {
                                e.target.style.backgroundColor = "#e9ecef";
                                e.target.style.borderColor = "#e9ecef";
                              }
                            }}
                          >
                            {item}
                          </span>
                        );
                      })}
                  </div>
                </div>
              </div>
              <div className="mt-4 mb-3">
                <h3 className="sub-title" style={{ marginBottom: "12px", fontSize: "14px", fontWeight: "700", color: "#1c1c1b" }}>Product Brands</h3>
                <div>
                  <div className="product-tags d-flex flex-wrap align-items-center" style={{ gap: "8px" }}>
                    {brands &&
                      brands.map((item, index) => {
                        const isActive = brand === item;
                        return (
                          <span
                            key={index}
                            onClick={() => handleBrandToggle(item)}
                            className="text-capitalize"
                            style={{
                              backgroundColor: isActive ? "#ffd700" : "#e9ecef",
                              color: isActive ? "#131921" : "#6c757d",
                              fontWeight: isActive ? "600" : "500",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                              padding: "8px 14px",
                              borderRadius: "20px",
                              fontSize: "13px",
                              display: "inline-block",
                              border: isActive ? "2px solid #ffd700" : "2px solid #e9ecef"
                            }}
                            onMouseOver={(e) => {
                              if (!isActive) {
                                e.target.style.backgroundColor = "#f0f0f0";
                                e.target.style.borderColor = "#f0f0f0";
                              }
                            }}
                            onMouseOut={(e) => {
                              if (!isActive) {
                                e.target.style.backgroundColor = "#e9ecef";
                                e.target.style.borderColor = "#e9ecef";
                              }
                            }}
                          >
                            {item}
                          </span>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="filter-sort-grid mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-10">
                  <p className="mb-0 d-block" style={{ width: "100px" }}>
                    Sort By:
                  </p>
                  <select
                    name=""
                    defaultValue={"manula"}
                    className="form-control form-select"
                    id=""
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <option value="title">Alphabetically, A-Z</option>
                    <option value="-title">Alphabetically, Z-A</option>
                    <option value="price">Price, low to high</option>
                    <option value="-price">Price, high to low</option>
                    <option value="createdAt">Date, old to new</option>
                    <option value="-createdAt">Date, new to old</option>
                  </select>
                </div>
                <div className="d-flex align-items-center gap-10">
                  <p className="totalproducts mb-0">
                    {productState?.length} Products
                  </p>
                  <div className="d-flex gap-10 align-items-center grid">
                    <img
                      onClick={() => {
                        setGrid(3);
                      }}
                      src="images/gr4.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                    <img
                      onClick={() => {
                        setGrid(4);
                      }}
                      src="images/gr3.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                    <img
                      src="images/gr2.svg"
                      className="d-block img-fluid"
                      alt="grid"
                      onClick={() => {
                        setGrid(6);
                      }}
                    />

                    <img
                      onClick={() => {
                        setGrid(12);
                      }}
                      src="images/gr.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="products-list pb-5">
              <div className="d-flex gap-10 flex-wrap">
                <ProductCard
                  data={productState ? productState : []}
                  grid={grid}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default OurStore;
