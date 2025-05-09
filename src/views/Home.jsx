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


function Home() {
    return (
        <div className="home-page bg-gray-100">
                <Header/>
                <IntroSection/>
                <DealsAndOffers />
                <HomeOutdoorItems/>
                <ElectronicsItems/>
                <SupplierInquiry />
                <NewProductsSection />
                <ExtraServices />
                <SuppliersByRegion />
                <NewsletterSection />
                <Footer />
        </div>
    );
}

export default Home;
