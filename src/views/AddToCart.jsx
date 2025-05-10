import React from 'react';

import ProductCard from '../components/pages/ProductCard';
import Header from '../components/pages/Header';
import BreadcrumbNav from '../components/pages/BreadcrumbNav';
import ProductHeaderBar from '../components/pages/ProductHeaderBar';
import ProductTabs from '../components/pages/ProductTabs';
import YouMayLike from '../components/pages/YouMayLike';
import RelatedProducts from '../components/pages/RelatedProducts';
import PromoBanner from '../components/pages/PromoBanner'; 
import Footer from '../components/pages/Footer';
import Checkout from '../components/pages/Checkout';    

const AddToCart = () => {
    

    
  const cartItems = [
    {
      id: 1,
      image: 'https://via.placeholder.com/80',
      title: 'T-shirts with multiple colors, for men and lady',
      price: 78.99,
      size: 'medium',
      color: 'blue',
      material: 'Plastic',
      seller: 'Artel Market',
      quantity: 9,
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/80',
      title: 'T-shirts with multiple colors, for men and lady',
      price: 39.0,
      size: 'medium',
      color: 'blue',
      material: 'Plastic',
      seller: 'Best factory LLC',
      quantity: 3,
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/80',
      title: 'T-shirts with multiple colors, for men and lady',
      price: 170.5,
      size: 'medium',
      color: 'blue',
      material: 'Plastic',
      seller: 'Artel Market',
      quantity: 1,
    },
  ];

  return (
    <>
    <Header />
      <div className="container my-4 border rounded p-3 bg-white">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="d-flex border-bottom py-3 align-items-start justify-content-between flex-wrap"
          >
            <div className="d-flex">
              <img
                src={item.image}
                alt={item.title}
                width="80"
                height="80"
                className="me-3 rounded"
              />
              <div>
                <h6 className="mb-1">{item.title}</h6>
                <p className="mb-1 text-muted" style={{ fontSize: '0.875rem' }}>
                  Size: {item.size}, Color: {item.color}, Material: {item.material}
                </p>
                <p className="mb-1 text-muted" style={{ fontSize: '0.875rem' }}>
                  Seller: {item.seller}
                </p>
                <div>
                  <button className="btn btn-outline-danger btn-sm me-2">Remove</button>
                  <button className="btn btn-outline-primary btn-sm">Save for later</button>
                </div>
              </div>
            </div>

            <div className="text-end">
              <p className="fw-bold">${item.price.toFixed(2)}</p>
              <select className="form-select form-select-sm w-auto">
                {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num} selected={num === item.quantity}>
                    Qty: {num}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}

        <div className="d-flex justify-content-between align-items-center mt-3">
          <button className="btn btn-primary">← Back to shop</button>
          <button className="btn btn-outline-danger">Remove all</button>
        </div>
      </div>

      {/* Other Sections */}
      
      <Checkout />
      <RelatedProducts />
      <PromoBanner />
      <Footer />
    </>
    
  );
  
};

export default AddToCart;
