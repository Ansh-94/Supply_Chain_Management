import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
const SpecialProduct = (props) => {
  const { title, brand, totalrating, price, sold, quantity, id, img } = props;

  const progressPercent = quantity && quantity > 0 ? Math.min((sold / quantity) * 100, 100) : 0;

  return (
    <>
      <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
        <div className="special-product-card">
          <div className="special-product-wrapper">
            <div className="special-product-image-wrapper">
              <img
                src={img || "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg"}
                className="special-product-image"
                alt="product"
              />
            </div>
            <div className="special-product-content">
              <div className="sp-brand">{brand}</div>
              <h6 className="sp-title">{title?.substr(0, 28) + (title?.length > 28 ? "..." : "")}</h6>
              <div className="sp-rating">
                <ReactStars
                  count={5}
                  size={20}
                  value={totalrating}
                  edit={false}
                  activeColor="#ffd700"
                />
              </div>
              <div className="sp-price-section">
                <p className="sp-price">Rs {price}</p>
              </div>
              <div className="sp-prod-count">
                <div className="sp-count-label">Products: {quantity}</div>
                <div className="sp-progress-wrapper">
                  <div className="sp-progress">
                    <div
                      className="sp-progress-bar"
                      style={{ width: Math.min((sold / quantity) * 100, 100) + "%" }}
                    ></div>
                  </div>
                </div>
              </div>
              <Link className="sp-view-btn" to={"/product/" + id}>
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(SpecialProduct);
