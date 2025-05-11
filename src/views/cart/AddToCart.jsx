import React from 'react';

import Header from '../../components/Header';
import PromoBanner from './components/PromoBanner'; 
import Cart from './components/Cart';
import CouponForm from './components/CouponForm';
import Summary from './components/Summary';
import Features from './components/features'; 
import SavedItems from './components/SavedItems';
import Footer from '../../components/Footer';

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

  const productData = [
    {
      image: 'https://via.placeholder.com/200',
      title: 'Cool Shirt',
      price: '$20.00'
    },
    {
      image: 'https://via.placeholder.com/200',
      title: 'Blue Jeans',
      price: '$35.00'
    },
    {
      image: 'https://via.placeholder.com/200',
      title: 'White Sneakers',
      price: '$50.00'
    },
    {
      image: 'https://via.placeholder.com/200',
      title: 'Leather Jacket',
      price: '$90.00'
    }
  ];

  return (
    <>
      <Header />

      <section className="py-4">
        <div className="container">
          <div className="row">
            <main className="col-lg-9">
              <Cart />
            </main>
            <aside className="col-lg-3">
              <CouponForm />
              <Summary />
            </aside>
          </div>

          <Features />

          {/* Product Cards Section */}
         
        </div>
      </section>
      
      <SavedItems />
      <PromoBanner />
      <Footer />
    </>
  );
};

export default AddToCart;
