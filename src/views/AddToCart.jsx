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
const AddToCart = () => {
  return (
    <>
    <Header/>
    <RelatedProducts/>
    <PromoBanner/>
    <Footer/>
    </>
  );
};

export default AddToCart;