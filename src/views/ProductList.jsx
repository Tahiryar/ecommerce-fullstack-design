// MainPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import Header from "../components/pages/Header"
import DealsAndOffers from '../components/pages/DealsAndOffers';
import HomeOutdoorItems from '../components/pages/HomeOutdoorItems';  
import SupplierInquiry from '../components/pages/SupplierInquiry';    
import Footer from '../components/pages/Footer';
import ExtraServices from '../components/pages/ExtraServices';
import IntroSection from '../components/pages/IntroSection';
import NewProductsSection from '../components/pages/NewProductsSection';
import NewsletterSection from '../components/pages/NewsletterSection';
import ElectronicsItems from '../components/pages/ElectronicsItems';
import SuppliersByRegion from '../components/pages/SuppliersByRegion';
import SidebarFilter from '../components/pages/SidebarFilter';
import ProductCard from '../components/pages/ProductCard';
import BreadcrumbNav from '../components/pages/BreadcrumbNav';
import ProductHeaderBar from '../components/pages/ProductHeaderBar';


const MainPage = () => {
  const products = [
    {
      image: 'https://ecommerce-ui.com/uikit/images/items/interior/1.jpg',
      title: 'Armchair for Home and Office, Yellow color',
      price: 990.99,
      originalPrice: 1299,
      rating: 4.5,
      orders: 154,
      shipping: 'Free Shipping',
      description: 'It is a long established fact that a reader will be distracted by the readable content...'
    },
    {
      image: 'https://ecommerce-ui.com/uikit/images/items/interior/8.jpg',
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