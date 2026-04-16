import React, { useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { useLocation, useNavigate } from "react-router-dom";

import wish from "../images/wish.svg";
// import wishlist from "../images/wishlist.svg";
// import watch from "../images/watch.jpg";
// import watch2 from "../images/watch-1.avif";
// import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../features/products/productSlilce";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useState } from "react";

const ProductCard = (props) => {
  const navigate = useNavigate();
  const { grid, data } = props;
  const dispatch = useDispatch();
  const location = useLocation();

  const wishlistState = useSelector((state) => state?.auth?.wishlist?.wishlist);
  const [wishlist, setWishlist] = useState(wishlistState || []);

  useEffect(() => {
    setWishlist(wishlistState || []);
  }, [wishlistState]);

  const isProductInWishlist = (productId) => {
    return wishlist?.some((item) => item._id === productId);
  };

  const addToWish = (productId) => {
    if (isProductInWishlist(productId)) {
      dispatch(addToWishlist(productId));
      const updatedWishlist = wishlist.filter((item) => item._id !== productId);
      setWishlist(updatedWishlist);
    } else {
      dispatch(addToWishlist(productId));
      const product = data.find((item) => item._id === productId);
      setWishlist([...wishlist, product]);
    }
  };

  return (
    <>
      {Array.isArray(data) && data?.map((item, index) => {
        const isWishlist = isProductInWishlist(item._id);
        return (
          <div
            key={index}
            className={` ${
              location.pathname == "/product" ? `gr-${grid}` : "col-3"
            } mb-4`}
          >
            <div className="product-card position-relative shadow-sm border-0 d-flex flex-column h-100 bg-white rounded-3 overflow-hidden">
              <div 
                className="product-image position-relative" 
                onClick={() => navigate("/product/" + item?._id)}
                style={{ cursor: "pointer", overflow: "hidden", height: "200px" }}
              >
                <img
                  src={item?.images[0]?.url || "https://images.pexels.com/photos/1037992/pexels-photo-1037992.jpeg"}
                  className="img-fluid w-100 h-100"
                  alt="product image"
                  style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                />
                <div className="image-overlay position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: "rgba(0,0,0,0.05)", opacity: 0, transition: "0.3s" }}></div>
                
                <div className="wishlist-icon position-absolute" style={{ 
                  zIndex: 10, 
                  top: "12px", 
                  right: "12px",
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  transition: "all 0.3s ease"
                }}>
                  <button
                    className="border-0 bg-transparent"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToWish(item?._id);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      padding: "0",
                      transition: "transform 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    {isWishlist ? (
                      <AiFillHeart className="text-danger" size={22} />
                    ) : (
                      <AiOutlineHeart className="text-secondary" size={22} />
                    )}
                  </button>
                </div>
              </div>

              <div className="product-details p-3 d-flex flex-column flex-grow-1">
                <h6 className="brand text-primary mb-1" style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>{item?.brand}</h6>
                <h5 className="product-title" style={{ minHeight: "2.8rem", fontSize: "15px", fontWeight: "600", color: "#1c1c1b" }}>
                  {item?.title?.substr(0, 45) + (item?.title?.length > 45 ? "..." : "")}
                </h5>
                <div className="mb-2">
                  <ReactStars
                    count={5}
                    size={20}
                    value={Number(item?.totalrating)}
                    edit={false}
                    activeColor="#ffd700"
                  />
                </div>

                <div className="mt-auto">
                    <p className="price mb-3 fw-bold fs-5 text-dark">Rs. {item?.price}</p>
                    <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                      <button 
                        className="border-0 py-2 rounded-2" 
                        onClick={() => {
                          alert("Added to cart: " + item?.title);
                          // TODO: Integrate with cart state management
                        }}
                        style={{ 
                          flex: 1,
                          backgroundColor: "#ffd700", 
                          color: "#131921", 
                          transition: "0.3s",
                          fontWeight: "600",
                          fontSize: "14px",
                          border: "2px solid #ffd700",
                          cursor: "pointer"
                        }}
                        onMouseOver={(e) => (e.target.style.backgroundColor = "#ffed4e")}
                        onMouseOut={(e) => (e.target.style.backgroundColor = "#ffd700")}
                      >
                        Add To Cart
                      </button>
                      <button 
                        className="border-0 py-2 rounded-2" 
                        onClick={() => navigate("/product/" + item?._id)}
                        style={{ 
                          flex: 1,
                          backgroundColor: "#131921", 
                          color: "white", 
                          transition: "0.3s",
                          fontWeight: "600",
                          fontSize: "14px",
                          border: "2px solid #131921",
                          cursor: "pointer"
                        }}
                        onMouseOver={(e) => (e.target.style.backgroundColor = "#1a1f26")}
                        onMouseOut={(e) => (e.target.style.backgroundColor = "#131921")}
                      >
                        View Product
                      </button>
                    </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default React.memo(ProductCard);
