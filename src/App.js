// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import ProductList from './views/ProductList';
import AddToCart from './views/AddToCart';
import ProductDetail from './views/ProductDetail';
import './App.css'; // Import your CSS file here
import '@fortawesome/fontawesome-free/css/all.min.css';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ProductList" element={<ProductList/>} />
        <Route path="/ProductDetail" element={<ProductDetail/>} />
        <Route path="/AddToCart" element={<AddToCart/>} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
