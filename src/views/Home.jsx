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



function Home() {
    return (
        <div className="home-page">
                <Header/>
                <IntroSection/>
                <DealsAndOffers />
                <HomeOutdoorItems/>
                <SupplierInquiry />
                <NewProductsSection />
                <ExtraServices />
                <NewsletterSection />
                <Footer />
        </div>
    );
}

export default Home;
