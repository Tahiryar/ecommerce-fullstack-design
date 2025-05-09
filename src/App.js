// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Header from './components/pages/Header';

function App() {
  return (
    <Router>
      {/* Put Header outside Routes so it shows on all pages */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Uncomment below routes when ready */}
        {/* <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
