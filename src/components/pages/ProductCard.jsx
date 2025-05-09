// ProductCard.js
import React from 'react';

const ProductCard = ({ image, title, price, originalPrice, rating, orders, shipping, description }) => {
  return (
    <div className="d-flex border p-3 mb-3 rounded bg-white">
      <img src={image} alt="Product" style={{ width: '150px', height: '150px', objectFit: 'cover' }} className="me-3" />
      <div>
        <h5>{title}</h5>
        <div>
          <span className="text-danger fw-bold">${price}</span>
          {originalPrice && <span className="text-muted text-decoration-line-through ms-2">${originalPrice}</span>}
        </div>
        <div>
          <span className="text-warning">★</span> {rating} • {orders} orders • <span className="text-success">{shipping}</span>
        </div>
        <p className="text-muted mb-1">{description}</p>
        <a href="#">Details</a>
      </div>
    </div>
  );
};

export default ProductCard;