// ProductCard.js
import React from 'react';

const ProductCard = ({ image, title, price, originalPrice, rating, orders, shipping, description }) => {
  return (
    <div className="row g-0 bg-white rounded shadow-sm align-items-center mb-4">
      <aside className="col-xl-3 col-md-4">
        <a href="#" className="img-wrap" onClick={(e) => e.preventDefault()}>
          <img src={image} alt="Product" className="img-fluid" />
        </a>
      </aside> 
      <div className="col-xl-9 col-md-8">
        <div className="card-body py-lg-4">
          <a href="#" className="btn btn-light btn-icon float-end" onClick={(e) => e.preventDefault()}>
            <i className="fa fa-heart"></i>
          </a>
          <a href="#" className="title h5 mb-2" onClick={(e) => e.preventDefault()}>
            {title}
          </a>

          <div className="price-wrap mb-2">
            <span className="price fw-medium">${price}</span>
            {originalPrice && (
              <del className="price-old ms-2">${originalPrice}</del>
            )}
          </div> 

          <div className="rating-wrap mb-2">
            <ul className="rating-stars">
              <li className="stars-active" style={{ width: `${(rating / 5) * 100}%` }}>
                <img src="images/misc/stars-active.svg" alt="rating stars" />
              </li>
              <li>
                <img src="images/misc/starts-disable.svg" alt="rating stars" />
              </li>
            </ul>
            <span className="label-rating text-warning">{rating}</span>
            <i className="dot"></i>
            <span className="label-rating text-muted">{orders} orders</span>
            <i className="dot"></i>
            <span className="label-rating text-success">{shipping}</span>
          </div> 

          <p className="text-muted">{description}</p>
          <a href="#" onClick={(e) => e.preventDefault()}>Details</a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;