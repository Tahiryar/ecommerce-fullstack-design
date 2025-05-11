// MainPage.js
import React from 'react';

import Header from "../../components/Header"  
import NewsletterSection from './components/NewsletterSection';
import SidebarFilter from './components/SidebarFilter';
import ProductCard from './components/ProductCard';
import BreadcrumbNav from './components/BreadcrumbNav';
import ProductHeaderBar from './components/ProductHeaderBar';
import Footer from '../../components/Footer';
 
import img10 from '../../assets/images/electronics/10.jpg';
import img1 from '../../assets/images/home/h1.jpg';


const MainPage = () => {
  const products = [
    {
      image: img1,
      title: 'Armchair for Home and Office, Yellow color',
      price: 990.99,
      originalPrice: 1299,
      rating: 4.5,
      orders: 154,
      shipping: 'Free Shipping',
      description: 'It is a long established fact that a reader will be distracted by the readable content...'
    },
    {
      image: img10,
      title: 'Great product name here as new model',
      price: 138.50,
      rating: 4.5,
      orders: 154,
      shipping: 'Free Shipping',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...'
    }
  ];

  return (
    <>
    <Header/>
    <BreadcrumbNav title="Products" />
    

    <div className="d-flex bg-light">
      <SidebarFilter />
      <div className="p-4 flex-grow-1">
        <ProductHeaderBar title="Products" />

        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
    <NewsletterSection/>
    <Footer/>
    </>
  );
};

export default MainPage;