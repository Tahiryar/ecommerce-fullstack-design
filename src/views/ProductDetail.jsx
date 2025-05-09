// MainPage.js
import React from 'react';
import SidebarFilter from './SidebarFilter';
import ProductCard from './ProductCard';

const MainPage = () => {
  const products = [
    {
      image: 'https://via.placeholder.com/150',
      title: 'Armchair for Home and Office, Yellow color',
      price: 990.99,
      originalPrice: 1299,
      rating: 4.5,
      orders: 154,
      shipping: 'Free Shipping',
      description: 'It is a long established fact that a reader will be distracted by the readable content...'
    },
    {
      image: 'https://via.placeholder.com/150',
      title: 'Great product name here as new model',
      price: 138.50,
      rating: 4.5,
      orders: 154,
      shipping: 'Free Shipping',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...'
    }
  ];

  return (
    <div className="d-flex">
      <SidebarFilter />
      <div className="p-4 flex-grow-1">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
};

export default MainPage;