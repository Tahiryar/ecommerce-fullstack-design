import React from 'react';

import Header from "../../components/Header"
import DealsAndOffers from './components/DealsAndOffers';
import HomeOutdoorItems from './components/HomeOutdoorItems';  
import SupplierInquiry from './components/SupplierInquiry';    
import ExtraServices from './components/ExtraServices';
import IntroSection from './components/IntroSection';
import NewProductsSection from './components/NewProductsSection';
import NewsletterSection from './components/NewsletterSection';
import ElectronicsItems from './components/ElectronicsItems';
import SuppliersByRegion from './components/SuppliersByRegion';
import Footer from '../../components/Footer';


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
